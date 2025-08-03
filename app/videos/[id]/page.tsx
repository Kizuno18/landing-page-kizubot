import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { RelatedDocs } from "@/components/changelog/related-docs"
import { getVideo, getVideoIds } from "@/lib/videos"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

type Props = { params: Promise<{ id: string }> }
export const revalidate = 86400
export const dynamicParams = false
export function generateStaticParams() { return getVideoIds().map((id) => ({ id })) }
export async function generateMetadata({ params }: Props) {
  const video = await getVideo((await params).id)
  if (!video) notFound()
  const description = video.description.replace(/\s+/g, " ").slice(0, 180)
  const metadata = pageMetadata(video.title, description, `/videos/${video.id}`)
  return { ...metadata, robots: { index: video.verifiedTitle, follow: true }, openGraph: { ...metadata.openGraph, images: [{ url: video.thumbnail, width: 480, height: 360, alt: video.title }] }, twitter: { card: "summary_large_image" as const, title: video.title, description, images: [video.thumbnail] } }
}
export default async function WatchPage({ params }: Props) {
  const video = await getVideo((await params).id)
  if (!video) notFound()
  const url = absoluteUrl(`/videos/${video.id}`)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}`
  return <><Header /><main id="main-content" className="pt-28 pb-16 px-4 min-h-screen"><article className="max-w-5xl mx-auto">
    <nav aria-label="Caminho de navegação" className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/videos">Vídeos</Link><span aria-hidden="true">/</span><span aria-current="page">{video.title}</span></nav>
    <h1 className="text-3xl md:text-4xl font-bold mb-6">{video.title}</h1>
    <div className="aspect-video relative mb-8"><iframe src={embedUrl} title={video.title} width="1280" height="720" loading="eager" className="w-full h-full rounded-xl" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{video.description}</p>
    {video.uploadDate && <p className="text-sm text-muted-foreground mt-4">Publicado em <time dateTime={video.uploadDate}>{new Date(video.uploadDate).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</time>.</p>}
    <p className="mt-4"><a href={`https://www.youtube.com/watch?v=${video.id}`} className="text-primary underline" target="_blank" rel="noopener noreferrer">Assistir também no YouTube</a></p>
    <section aria-labelledby="transcript-heading" className="mt-10"><h2 id="transcript-heading" className="text-2xl font-bold mb-4">Transcrição do vídeo</h2>
      {video.transcript.length ? <><p className="text-sm text-muted-foreground mb-4">{video.autoCaptions ? "Legendas automáticas fornecidas pelo YouTube; podem conter erros." : "Transcrição baseada nas legendas fornecidas para este vídeo."}</p><ol lang={video.transcriptLanguage} className="space-y-3">{video.transcript.map((cue, index) => <li key={`${cue.seconds}-${index}`} className="flex gap-4"><a href={`https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(cue.seconds)}s`} className="text-primary shrink-0 font-mono text-sm" aria-label={`Assistir em ${Math.floor(cue.seconds)} segundos`}>{Math.floor(cue.seconds / 60)}:{String(Math.floor(cue.seconds % 60)).padStart(2, "0")}</a><span>{cue.text}</span></li>)}</ol></> : <p className="text-muted-foreground">Ainda não há uma transcrição disponível para este vídeo. As legendas, quando fornecidas pelo autor, também podem ser consultadas no player do YouTube.</p>}
    </section>
    <RelatedDocs text={`${video.title} ${video.description}`} locale="pt" />
    <p className="mt-10"><Link href="/videos" className="text-primary underline">← Voltar à galeria de vídeos</Link></p>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Vídeos", item: absoluteUrl("/videos") }, { "@type": "ListItem", position: 3, name: video.title, item: url }] }} />
    {video.verifiedTitle && video.uploadDate && <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: video.title, description: video.description, thumbnailUrl: video.thumbnail, uploadDate: video.uploadDate, embedUrl, url, ...(video.duration ? { duration: video.duration } : {}), ...(video.transcript.length ? { transcript: video.transcript.map((cue) => cue.text).join(" "), inLanguage: video.transcriptLanguage } : {}) }} />}
  </article></main><Footer /></>
}
