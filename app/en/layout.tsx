import type { ReactNode } from "react"
import { SiteShell } from "@/components/site-shell"
export { baseMetadata as metadata, viewport } from "@/lib/seo"
export default function EnglishLayout({ children }: { children: ReactNode }) { return <SiteShell locale="en">{children}</SiteShell> }
