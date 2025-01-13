import { JsonLd } from "@/components/json-ld"
import { SITE_URL, absoluteUrl, homePath, type SiteLocale } from "@/lib/seo"
import { expiredPromotion, pricedCards, type LandingProduct } from "@/lib/pricing"
import { billingCopy, CHECKOUT_URL } from "@/lib/billing-copy"

export function HomeStructuredData({ locale, products }: { locale: SiteLocale; products: LandingProduct[] }) {
  const now = Date.now()
  const visibleProducts = pricedCards(billingCopy[locale].pricing.cards, products.filter((product) => !expiredPromotion(product, now))).map(({ product }) => product)
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "KizuBot", url: SITE_URL, logo: absoluteUrl("/images/logo-principal-kizubot.png") },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "KizuBot", url: SITE_URL, inLanguage: ["pt-BR", "en"], publisher: { "@id": `${SITE_URL}/#organization` } },
      {
        "@type": "SoftwareApplication", "@id": `${absoluteUrl(homePath(locale))}#software`, name: "KizuBot", url: absoluteUrl(homePath(locale)),
        description: locale === "en" ? "PokeXGames automation with cavebot, combat, healing, catching and a web control panel." : "Automação para PokeXGames com cavebot, combate, cura, captura e painel de controle web.",
        applicationCategory: "GameApplication", operatingSystem: "Web", inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
        ...(visibleProducts.length ? { offers: visibleProducts.map((product) => ({ "@type": "Offer", name: product.displayName, price: (product.amountMinor / 100).toFixed(2), priceCurrency: "BRL", url: CHECKOUT_URL })) } : {}),
      },
    ],
  }} />
}
