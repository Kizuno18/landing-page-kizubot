import type { MetadataRoute } from "next"
import { getAllChangelogs } from "@/lib/changelog"
import { docModules } from "@/lib/docs"
import { absoluteUrl } from "@/lib/seo"
import { contentModifiedAt } from "@/lib/content-dates"
import { getVideoCatalog } from "@/lib/videos"

export const revalidate = 86400
const alternates = (pt: string, en: string) => ({ languages: { "pt-BR": absoluteUrl(pt), en: absoluteUrl(en), "x-default": absoluteUrl(pt) } })
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pt = getAllChangelogs("pt")
  const english = new Set(getAllChangelogs("en").map((entry) => entry.slug))
  const urls: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), alternates: alternates("/", "/en") },
    { url: absoluteUrl("/en"), alternates: alternates("/", "/en") },
    { url: absoluteUrl("/docs") },
    ...docModules.map((doc) => { const modified = contentModifiedAt(`app/docs/sections/${doc.section}.tsx`); return { url: absoluteUrl(`/docs/${doc.id}`), ...(modified ? { lastModified: modified } : {}) } }),
    ...["tips", "privacy-policy", "terms-of-service", "refunds", "data-deletion"].map((route) => { const modified = contentModifiedAt(`app/${route}/page.tsx`); return { url: absoluteUrl(`/${route}`), ...(modified ? { lastModified: modified } : {}) } }),
    { url: absoluteUrl("/changelog"), ...(pt[0]?.date ? { lastModified: pt[0].date } : {}), alternates: alternates("/changelog", "/en/changelog") },
    { url: absoluteUrl("/en/changelog"), ...(getAllChangelogs("en")[0]?.date ? { lastModified: getAllChangelogs("en")[0].date } : {}), alternates: alternates("/changelog", "/en/changelog") },
    { url: absoluteUrl("/videos"), alternates: alternates("/videos", "/en/videos") },
    { url: absoluteUrl("/en/videos"), alternates: alternates("/videos", "/en/videos") },
  ]
  for (const entry of pt) {
    const ptPath = `/changelog/${entry.slug}`
    const enPath = `/en/changelog/${entry.slug}`
    const dates = entry.date && Number.isFinite(Date.parse(entry.date)) ? { lastModified: entry.date } : {}
    urls.push({ url: absoluteUrl(ptPath), ...dates, ...(english.has(entry.slug) ? { alternates: alternates(ptPath, enPath) } : {}) })
    if (english.has(entry.slug)) urls.push({ url: absoluteUrl(enPath), ...dates, alternates: alternates(ptPath, enPath) })
  }
  // Omit fallback/noindex watch pages until their titles can be verified.
  for (const video of await getVideoCatalog()) if (video.verifiedTitle) urls.push({ url: absoluteUrl(`/videos/${video.id}`) })
  return urls
}
