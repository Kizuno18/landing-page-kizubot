import { Faq } from "@/components/faq"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { FunGallery } from "@/components/fun-gallery"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Modules } from "@/components/modules"
import { Pricing } from "@/components/pricing"
import { Results } from "@/components/results"
import { Testimonials } from "@/components/testimonials"
import { VideoGallery } from "@/components/video-gallery"
import { HomeStructuredData } from "@/components/home-structured-data"
import { getLandingProducts } from "@/lib/pricing-server"
import { getVideoCatalog } from "@/lib/videos"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 60
export const metadata = pageMetadata("KizuBot: bot de PXG na nuvem para PokeXGames, com o PC desligado", "Bot para PokeXGames (PXG) que roda na nuvem com o seu PC desligado: cavebot, combate, cura, captura de shiny, farming, pesca e alarmes no WhatsApp. Veja planos e guias.", "/", "pt-BR", { pt: "/", en: "/en" })
export default async function Home() {
  const [products, videos] = await Promise.all([getLandingProducts(), getVideoCatalog(12)])
  return <>
    <HomeStructuredData locale="pt-BR" products={products} /><Header />
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <Hero /><VideoGallery videos={videos} />
      <section id="fun-gallery" aria-labelledby="fun-gallery-heading"><FunGallery /></section>
      <Testimonials /><Features /><HowItWorks /><Modules /><Results />
      <section id="pricing" aria-labelledby="pricing-heading"><Pricing initialProducts={products} /></section><Faq />
    </main><Footer />
  </>
}
