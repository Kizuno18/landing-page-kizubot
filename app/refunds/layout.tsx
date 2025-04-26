import { baseMetadata, pageMetadata } from "@/lib/seo"
export { viewport } from "@/lib/seo"
export { PortugueseRootLayout as default } from "@/components/site-shell"
export const metadata = { ...baseMetadata, ...pageMetadata("Política de Reembolso", "Consulte as condições e orientações para solicitar reembolsos do KizuBot.", "/refunds") }
