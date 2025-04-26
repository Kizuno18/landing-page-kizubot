import type { ReactNode } from "react"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ClarityAnalytics } from "@/components/clarity"
import { Gtag } from "@/components/gtag"
import { Analytics } from "@vercel/analytics/next"
import { appleSplashScreens, appleSplashHref, appleSplashMedia } from "@/lib/apple-splash.mjs"
import type { SiteLocale } from "@/lib/seo"
import "@/app/globals.css"

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" })
const mono = JetBrains_Mono({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

export function SiteShell({ children, locale = "pt-BR" }: { children: ReactNode; locale?: SiteLocale }) {
  return <html lang={locale} className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
    <head>
      {appleSplashScreens.map((screen) => <link key={`${screen.w}x${screen.h}`} rel="apple-touch-startup-image" media={appleSplashMedia(screen)} href={appleSplashHref(screen)} />)}
    </head>
    <body className="font-sans antialiased">
      <ThemeProvider attribute="data-theme" defaultTheme="spatial-hacker" themes={["spatial-hacker", "gold-days"]} enableSystem={false} storageKey="kizubot-theme">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">{locale === "en" ? "Skip to main content" : "Pular para o conteúdo principal"}</a>
        {children}
      </ThemeProvider>
      <Analytics /><ClarityAnalytics /><Gtag />
    </body>
  </html>
}
export function PortugueseRootLayout({ children }: { children: ReactNode }) { return <SiteShell>{children}</SiteShell> }
