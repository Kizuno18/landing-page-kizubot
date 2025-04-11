import type { Metadata, Viewport } from "next"

// Production redirects the apex domain to www. Keep every SEO signal consistent.
export const SITE_URL = "https://www.kizubot.com"
export type SiteLocale = "pt-BR" | "en"
export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString()
export const homePath = (locale: SiteLocale) => locale === "en" ? "/en" : "/"

export function pageMetadata(title: string, description: string, path: string, locale: SiteLocale = "pt-BR", translations?: { pt: string; en: string }): Metadata {
  const fullTitle = title.includes("KizuBot") ? title : `${title} | KizuBot`
  const image = absoluteUrl(`/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(locale === "en" ? "PokeXGames automation" : "Automação para PokeXGames")}`)
  return {
    title: { absolute: fullTitle }, description,
    alternates: {
      canonical: absoluteUrl(path),
      ...(translations ? { languages: { "pt-BR": absoluteUrl(translations.pt), "en": absoluteUrl(translations.en), "x-default": absoluteUrl(translations.pt) } } : {}),
    },
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), type: "website", siteName: "KizuBot", locale: locale === "en" ? "en_US" : "pt_BR", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  }
}

const verification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KizuBot — Automação para PokeXGames",
  description: "Conheça os recursos, planos e guias do KizuBot para automatizar tarefas no PokeXGames.",
  applicationName: "KizuBot",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  icons: { icon: [{ url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" }, { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "KizuBot", statusBarStyle: "black-translucent" },
  formatDetection: { email: false, address: false, telephone: false },
  ...(verification && !/your-|placeholder/i.test(verification) ? { verification: { google: verification } } : {}),
  // Do not put a homepage canonical, product, FAQ, or breadcrumb on every route.
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#A855F7" }
