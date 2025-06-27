import { baseMetadata, pageMetadata } from "@/lib/seo"
export { viewport } from "@/lib/seo"
export { PortugueseRootLayout as default } from "@/components/site-shell"
export const metadata = { ...baseMetadata, ...pageMetadata("Termos de Serviço", "Consulte os termos e condições de utilização do KizuBot.", "/terms-of-service") }
