import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Results } from "@/components/results"
import { VideoGallery } from "@/components/video-gallery"
import { FaqSection } from "@/components/faq"
import { HeroSection } from "@/components/hero"
import { PricingSection } from "@/components/pricing"
import { HomeStructuredData } from "@/components/home-structured-data"
import { getLandingProducts, getUsdRate } from "@/lib/pricing-server"
import { getVideoCatalog } from "@/lib/videos"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 60
export const metadata = pageMetadata("KizuBot: cloud PokeXGames (PXG) bot, your PC can stay off", "PokeXGames (PXG) bot that runs in the cloud while your PC is off: cavebot, combat, healing, shiny catching, farming, fishing and WhatsApp alarms. See plans and guides.", "/en", "en", { pt: "/", en: "/en" })
export default async function EnglishHome() {
  const [products, usdRate, videos] = await Promise.all([getLandingProducts(), getUsdRate(), getVideoCatalog(12)])
  return <>
    <HomeStructuredData locale="en" products={products} /><Header />
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <HeroSection locale="en" /><VideoGallery locale="en" videos={videos} /><Results locale="en" />
      <section id="pricing" aria-labelledby="pricing-heading"><PricingSection locale="en" initialProducts={products} initialUsdRate={usdRate} /></section><FaqSection locale="en" />
    </main><Footer locale="en" />
  </>
}
