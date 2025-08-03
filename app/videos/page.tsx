import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoGallery } from "@/components/video-gallery"
import { getVideoCatalog } from "@/lib/videos"
import { pageMetadata } from "@/lib/seo"
export const revalidate = 86400
export const metadata = pageMetadata("Vídeos do KizuBot", "Assista às demonstrações do KizuBot para PokeXGames. Explore vídeos, configurações e transcrições quando disponíveis.", "/videos", "pt-BR", { pt: "/videos", en: "/en/videos" })
export default async function VideosPage() { const videos = await getVideoCatalog(); return <><Header /><main id="main-content" className="pt-28 min-h-screen"><h1 className="text-4xl font-bold text-center px-4">Vídeos do KizuBot</h1><VideoGallery videos={videos} all /></main><Footer /></> }
