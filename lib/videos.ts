import fs from "node:fs"
import path from "node:path"
import { cache } from "react"

export type TranscriptCue = { seconds: number; text: string }
export type Video = { id: string; title: string; description: string; thumbnail: string; uploadDate?: string; duration?: string; transcript: TranscriptCue[]; transcriptLanguage?: string; autoCaptions?: boolean; verifiedTitle: boolean }
const text = (value: unknown) => typeof value === "string" ? value.trim() : ""
const record = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}
const array = (value: unknown): unknown[] => Array.isArray(value) ? value : []

export function getVideoIds(): string[] {
  const file = path.join(process.cwd(), "public", "video-urls.txt")
  if (!fs.existsSync(file)) return []
  const ids = fs.readFileSync(file, "utf8").split(/\r?\n/).flatMap((line) => {
    try { const url = new URL(line.trim()); const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : ["youtube.com", "www.youtube.com"].includes(url.hostname) ? url.searchParams.get("v") ?? url.pathname.split("/").pop() ?? "" : ""; return /^[\w-]{11}$/.test(id) ? [id] : [] } catch { return [] }
  })
  return [...new Set(ids)]
}

// Parse the public player JSON without evaluating JavaScript from a third party.
function playerData(html: string): Record<string, unknown> {
  const match = /(?:var\s+)?ytInitialPlayerResponse\s*=\s*\{/.exec(html)
  if (!match) return {}
  const start = match.index + match[0].lastIndexOf("{")
  let depth = 0, quoted = false, escaped = false
  for (let i = start; i < html.length; i++) {
    const c = html[i]
    if (quoted) { if (escaped) escaped = false; else if (c === "\\") escaped = true; else if (c === '"') quoted = false; continue }
    if (c === '"') quoted = true
    else if (c === "{") depth++
    else if (c === "}" && --depth === 0) { try { return record(JSON.parse(html.slice(start, i + 1))) } catch { return {} } }
  }
  return {}
}
async function request(url: string): Promise<Response | null> {
  try { return await fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(3500) }) } catch { return null }
}
function cues(value: unknown): TranscriptCue[] {
  return array(value).flatMap((item) => { const row = record(item); return typeof row.seconds === "number" && Number.isFinite(row.seconds) && row.seconds >= 0 && text(row.text) ? [{ seconds: row.seconds, text: text(row.text) }] : [] })
}
function curatedVideo(id: string): Record<string, unknown> {
  const file = path.join(process.cwd(), "content", "videos", `${id}.json`)
  try { return record(JSON.parse(fs.readFileSync(file, "utf8"))) } catch { return {} }
}

export const getVideo = cache(async (id: string): Promise<Video | null> => {
  if (!getVideoIds().includes(id)) return null
  const curated = curatedVideo(id)
  const [watch, embed] = await Promise.all([
    request(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`),
    request(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`),
  ])
  let player: Record<string, unknown> = {}, oembed: Record<string, unknown> = {}
  try { if (watch?.ok) player = playerData(await watch.text()) } catch { /* Public metadata may be unavailable. */ }
  try { if (embed?.ok) oembed = record(await embed.json()) } catch { /* Do not invent metadata. */ }
  const details = record(player.videoDetails)
  const micro = record(record(player.microformat).playerMicroformatRenderer)
  const title = text(curated.title) || text(details.title) || text(oembed.title)
  const published = text(curated.uploadDate) || text(micro.uploadDate) || text(micro.publishDate)
  const seconds = Number(details.lengthSeconds)
  let transcript = cues(curated.transcript)
  let transcriptLanguage = text(curated.transcriptLanguage) || undefined
  let autoCaptions = false
  if (!transcript.length) {
    const tracks = array(record(record(player.captions).playerCaptionsTracklistRenderer).captionTracks).map(record)
    const track = tracks.find((track) => text(track.languageCode).startsWith("pt") && track.kind !== "asr") ?? tracks.find((track) => text(track.languageCode).startsWith("pt")) ?? tracks[0]
    if (track) {
      try {
        const url = new URL(text(track.baseUrl))
        // Never follow arbitrary URLs returned by remote metadata.
        if (url.protocol === "https:" && ["www.youtube.com", "youtube.com"].includes(url.hostname) && url.pathname === "/api/timedtext") {
          url.searchParams.set("fmt", "json3")
          const response = await request(url.toString())
          if (response?.ok) {
            const data = record(await response.json())
            transcript = array(data.events).flatMap((event) => { const row = record(event); const value = array(row.segs).map((segment) => text(record(segment).utf8)).join(" ").replace(/\s+/g, " ").trim(); return value && typeof row.tStartMs === "number" && row.tStartMs >= 0 ? [{ seconds: row.tStartMs / 1000, text: value }] : [] })
            transcriptLanguage = text(track.languageCode) || undefined
            autoCaptions = track.kind === "asr"
          }
        }
      } catch { /* Missing captions remain explicitly unavailable, never synthesized. */ }
    }
  }
  return {
    id, title: title || `Demonstração KizuBot (${id})`,
    description: text(curated.description) || text(details.shortDescription) || (title ? `Assista à demonstração “${title}” e consulte a documentação do KizuBot para conhecer as configurações.` : "Vídeo demonstrativo do KizuBot."),
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    ...(published && /^\d{4}-\d{2}-\d{2}/.test(published) && Number.isFinite(Date.parse(published)) ? { uploadDate: published } : {}),
    ...(Number.isFinite(seconds) && seconds > 0 ? { duration: `PT${Math.floor(seconds)}S` } : {}),
    transcript, transcriptLanguage, autoCaptions, verifiedTitle: Boolean(title),
  }
})

export async function getVideoCatalog(limit?: number): Promise<Video[]> {
  const ids = getVideoIds().slice(0, limit)
  const videos: Video[] = []
  // Bound parallel requests to avoid overwhelming the upstream provider.
  for (let offset = 0; offset < ids.length; offset += 12) {
    const batch = await Promise.all(ids.slice(offset, offset + 12).map(getVideo))
    videos.push(...batch.filter((video): video is Video => video !== null))
  }
  return videos
}
