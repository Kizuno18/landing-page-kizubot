import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoGallery } from "@/components/video-gallery"
import { getVideoCatalog } from "@/lib/videos"
import { pageMetadata } from "@/lib/seo"
export const revalidate = 86400
export const metadata = pageMetadata("KizuBot video demonstrations", "Explore KizuBot demonstrations for PokeXGames. Watch the original Portuguese videos and visit their dedicated pages for details and available transcripts.", "/en/videos", "en", { pt: "/videos", en: "/en/videos" })
export default async function VideosPage() { const videos = await getVideoCatalog(); return <><Header /><main id="main-content" className="pt-28 min-h-screen"><h1 className="text-4xl font-bold text-center px-4">KizuBot video demonstrations</h1><VideoGallery videos={videos} locale="en" all /></main><Footer locale="en" /></> }
