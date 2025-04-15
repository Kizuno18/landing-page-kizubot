"use client"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { PaymentMethods } from "@/components/payment-methods"
import { PricingCard } from "@/components/ui/pricing-card"
import { Section } from "@/components/ui/section"
import { MotionConfig } from "framer-motion"
import { useCampaignTime } from "@/hooks/use-campaign-time"
import { CAMPAIGN_END } from "@/lib/anniversary"
import { scheduleCampaignBoundary } from "@/lib/campaign-timer"
import { billingCopy, cardFeatures, CHECKOUT_URL, type BillingLocale } from "@/lib/billing-copy"
import { fillAmount, usdApprox, EXCHANGE_RATES_URL, FALLBACK_USD_RATE, formatBrl, parseProducts, parseUsdRate, activePromotion, expiredPromotion, pricedCards, PRODUCTS_URL, type LandingProduct } from "@/lib/pricing"

type PricingProps = { locale: BillingLocale; initialProducts?: LandingProduct[]; initialUsdRate?: number }
export function PricingSection({ locale, initialProducts, initialUsdRate = FALLBACK_USD_RATE }: PricingProps) {
  const copy = billingCopy[locale]
  const [products, setProducts] = useState<LandingProduct[] | null>(initialProducts ?? null)
  const [usdRate, setUsdRate] = useState(initialUsdRate)
  const now = useCampaignTime()
  useEffect(() => {
    let cancelled = false
    let requestNumber = 0
    const refresh = () => {
      const request = ++requestNumber
      fetch(PRODUCTS_URL, { cache: "no-store", signal: AbortSignal.timeout(8000) }).then((response) => response.ok ? response.json() : null).catch(() => null)
        .then((data) => { if (!cancelled && request === requestNumber && data !== null) setProducts(parseProducts(data)) })
    }
    const visibleRefresh = () => { if (document.visibilityState === "visible") refresh() }
    refresh()
    const interval = window.setInterval(visibleRefresh, 60_000)
    const cancelCutoff = CAMPAIGN_END > Date.now() ? scheduleCampaignBoundary(CAMPAIGN_END, refresh, { now: Date.now, schedule: (callback, delay) => window.setTimeout(callback, delay), cancel: (handle) => window.clearTimeout(handle) }) : null
    document.addEventListener("visibilitychange", visibleRefresh)
    if (locale === "en") fetch(EXCHANGE_RATES_URL, { signal: AbortSignal.timeout(8000) }).then((response) => response.ok ? response.json() : null).catch(() => null).then((data) => { if (!cancelled && data !== null) setUsdRate(parseUsdRate(data)) })
    return () => { cancelled = true; window.clearInterval(interval); cancelCutoff?.(); document.removeEventListener("visibilitychange", visibleRefresh) }
  }, [locale])
  const currentProducts = products?.filter((product) => !expiredPromotion(product, now ?? Date.now())) ?? []
  const cards = pricedCards(copy.pricing.cards, currentProducts)
  const hasPromotion = now !== null && now < CAMPAIGN_END && currentProducts.some((product) => activePromotion(product, now))
  return <MotionConfig reducedMotion="user"><Section background="cta">
    <div className="text-center mb-8 md:mb-16"><p className="section-tag">{"# "} PRICING</p><h2 id="pricing-heading" className="text-4xl lg:text-5xl font-bold text-foreground font-display mb-4 text-balance">{copy.pricing.title}</h2><p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">{copy.pricing.subtitle}</p></div>
    {hasPromotion && <p className="mb-8 border-y border-primary/35 py-4 text-center text-sm font-medium text-foreground md:text-base">{locale === "pt-BR" ? "Aniversário KizuBot · Preços especiais no Premium 720h e 2160h até 05/11, horário de Brasília. Premium 300h: novo pacote, preço fixo." : "KizuBot anniversary · Special prices on Premium 720h and 2160h through November 5, Brasília time. Premium 300h: new pack, fixed price."}</p>}
    {products !== null && cards.length === 0 && <p role="status" className="text-center text-muted-foreground mb-8">{copy.pricing.loadError} <a className="underline" href={CHECKOUT_URL}>{locale === "en" ? "Check current plans at checkout" : "Consultar planos atuais no checkout"}</a></p>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
      {cards.map(({ card, product }, index) => <PricingCard key={card?.key ?? product.productKey}
        title={card?.title ?? product.displayName} price={formatBrl(product.amountMinor)}
        approximatePrice={locale === "en" ? `(${fillAmount(copy.pricing.usdApprox, usdApprox(product.amountMinor, usdRate))}*)` : undefined}
        regularPrice={now !== null && activePromotion(product, now) ? formatBrl(product.regularAmountMinor!) : undefined}
        regularPriceLabel={locale === "pt-BR" ? "Preço regular" : "Regular price"}
        promotionLabel={now !== null && activePromotion(product, now) ? locale === "pt-BR" ? "Aniversário · até 05/11 (Brasília)" : "Anniversary · through Nov 5 (Brasília)" : undefined}
        period={card?.period ?? ""} description={card?.description ?? ""} features={card ? cardFeatures(locale, card) : [...copy.pricing.sharedFeatures]}
        ctaText={card?.ctaText ?? copy.hero.ctaPrimary} ctaHref={card?.ctaHref ?? CHECKOUT_URL} badge={card?.badge} badgeColor="bg-primary"
        icon={(card?.premium ?? product.planKind === "premium") ? <Star className="w-8 h-8 text-primary fill-primary" /> : undefined}
        popular={card?.popular} index={index} />)}
    </div>
    {locale === "en" && cards.length > 0 && <p className="text-center text-sm text-muted-foreground mb-8">{copy.pricing.usdFootnote}</p>}
    <div className="max-w-3xl mx-auto mb-8 md:mb-16 text-left"><h3 className="text-2xl font-bold text-primary font-display mb-4">{copy.whyPremium.title}</h3>{copy.whyPremium.paragraphs.map((paragraph) => <p key={paragraph} className="text-muted-foreground mb-3 leading-relaxed">{paragraph}</p>)}</div>
    <PaymentMethods title={copy.pricing.paymentMethodsTitle} cryptoLabel={copy.pricing.cryptoLabel} />
  </Section></MotionConfig>
}
export function Pricing({ initialProducts }: { initialProducts?: LandingProduct[] }) { return <PricingSection locale="pt-BR" initialProducts={initialProducts} /> }
