"use client"
import Image from "next/image"
import { Clock, Users, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { billingCopy, type BillingLocale } from "@/lib/billing-copy"
import { AnniversaryCelebration } from "@/components/anniversary-celebration"
import styles from "@/components/hero.module.css"

export function HeroSection({ locale }: { locale: BillingLocale }) {
  const copy = billingCopy[locale].hero
  const en = locale === "en"
  return <section className={`${styles.hero} relative flex flex-col items-center pt-20 pb-8 md:pb-10`} aria-labelledby="hero-heading">
    {/* The background is the LCP element: an <Image> is preloaded and resized, a CSS url() is found late. */}
    <Image src="/images/bg-hero-gears.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover object-center" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" /><AnniversaryCelebration locale={locale} />
    <div className="relative z-10 container-responsive text-center">
      <div className={`${styles.intro} mb-4`}>
        <div className={`${styles.logo} mb-3`}><Image src="/images/logo-principal-kizubot.png" alt={copy.logoAlt} className="w-28 sm:w-32 md:w-36 mx-auto h-auto" priority sizes="(max-width: 639px) 112px, (max-width: 767px) 128px, 144px" width={320} height={320} /></div>
        <p className={`${styles.tag} section-tag !mb-2`}>{"> "} KIZUBOT_SYSTEM.init()</p>
        <h1 id="hero-heading" className={`${styles.heading} text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 max-w-4xl mx-auto text-balance`}><span className="text-secondary">{copy.titleBrand}</span>{copy.titleRest}</h1>
        <p className={`${styles.subtitle} text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed`}>{copy.subtitle}</p>
      </div>
      <div className={`${styles.badges} mb-4`} aria-label={copy.offerAriaLabel}><div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center justify-center gap-2 text-red-400 text-xs sm:text-sm font-semibold bg-red-500/10 px-3 py-2 rounded-full border border-red-500/20"><Clock className="w-4 h-4 shrink-0" aria-hidden="true" />{copy.offerBadge}</div>
        <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm bg-muted/20 px-3 py-2 rounded-full border border-muted/30" aria-label={copy.activeUsersAriaLabel}><Users className="w-4 h-4" aria-hidden="true" />{copy.activeUsers}</div>
      </div></div>
      <div className="space-y-4"><div className={`${styles.buttons} flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto`}>
        <Button asChild size="lg" className="btn-primary !text-base !px-6 !py-3 min-h-11 h-auto animate-pulse-glow focus-ring w-full sm:w-auto"><a href="#pricing"><Zap className="w-5 h-5 mr-2" aria-hidden="true" />{copy.ctaPrimary}</a></Button>
        <Button variant="outline" size="lg" className="text-base px-6 py-3 min-h-11 h-auto border border-primary text-primary hover:bg-primary/10 hover:text-primary focus-ring bg-transparent rounded-md w-full sm:w-auto" asChild><a href="#video-gallery" aria-label={copy.ctaDemoAriaLabel}><Shield className="w-5 h-5 mr-2" aria-hidden="true" />{copy.ctaDemo}</a></Button>
      </div><ul className={`${styles.trust} flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground`} aria-label={en ? "Service features" : "Recursos do serviço"}><li>{en ? "Web control panel" : "Painel de controle web"}</li><li>{en ? "Configuration guides" : "Guias de configuração"}</li><li>{en ? "Community support" : "Suporte da comunidade"}</li></ul></div>
      <div className={`${styles.testimonial} mt-4 max-w-[240px] mx-auto hidden md:block`}><Image src="/media/testimonials/loxas-esperando-vagas.jpg" alt={copy.waitingAlt} className="w-full h-auto rounded-lg border border-primary/30 shadow-lg shadow-primary/10" sizes="240px" width={452} height={95} /></div>
    </div>
  </section>
}
export function Hero() { return <HeroSection locale="pt-BR" /> }
