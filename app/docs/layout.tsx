import type { ReactNode } from "react"
import { SiteShell } from "@/components/site-shell"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export { baseMetadata as metadata, viewport } from "@/lib/seo"
export default function DocsLayout({ children }: { children: ReactNode }) { return <SiteShell><Header /><main id="main-content" className="min-h-screen bg-background text-foreground">{children}</main><Footer /></SiteShell> }
