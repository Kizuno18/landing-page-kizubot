import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { Video } from "@/lib/videos"
import type { SiteLocale } from "@/lib/seo"
import heroStyles from "@/components/hero.module.css"

// Fetch in the async route and render synchronously: compatible with the pinned compiler.
export function VideoGallery({ videos, locale = "pt-BR", all = false }: { videos: Video[]; locale?: SiteLocale; all?: boolean }) {
  const en = locale === "en"
  return <section id="video-gallery" className={`${heroStyles.gallery} section bg-secondary-pattern py-16`} aria-labelledby="video-gallery-heading"><div className="container-responsive">
    <div className="text-center mb-12"><p className="section-tag">{"> "} VIDEO_GALLERY</p><h2 id="video-gallery-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">{en ? "Video demonstrations" : "Galeria de vídeos"}</h2><p className="text-lg text-muted-foreground max-w-2xl mx-auto">{en ? "Watch KizuBot in action. Original videos and watch pages are in Portuguese." : "Veja o KizuBot em ação e acesse a página de cada demonstração."}</p></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">{videos.map((video, index) => <Link href={`/videos/${video.id}`} hrefLang="pt-BR" key={video.id} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-secondary focus-visible:outline focus-visible:outline-secondary">
      <div className="aspect-video relative"><Image src={video.thumbnail} alt={video.verifiedTitle ? video.title : `${en ? "KizuBot demonstration" : "Demonstração do KizuBot"} ${index + 1}`} fill sizes="(max-width: 639px) 95vw, (max-width: 1023px) 45vw, 300px" className="object-cover" priority={all && index === 0} loading={all && index > 0 && index < 4 ? "eager" : undefined} /><span className="absolute inset-0 flex items-center justify-center bg-black/20"><Play className="w-10 h-10 text-white" aria-hidden="true" /></span></div>
      <div className="p-4"><h3 lang={video.verifiedTitle ? "pt-BR" : locale} className="font-semibold text-foreground">{video.verifiedTitle ? video.title : `${en ? "KizuBot demonstration" : "Demonstração do KizuBot"} ${index + 1}`}</h3><p className="text-sm text-primary mt-2">{en ? "Watch video (Portuguese) →" : "Assistir à demonstração →"}</p></div>
    </Link>)}</div>
    {!all && <p className="text-center mt-10"><Link href={en ? "/en/videos" : "/videos"} className="btn-secondary inline-block px-6 py-3">{en ? "Browse all videos" : "Ver todos os vídeos"}</Link></p>}
  </div></section>
}
