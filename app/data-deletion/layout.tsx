import { baseMetadata, pageMetadata } from "@/lib/seo"
export { viewport } from "@/lib/seo"
export { PortugueseRootLayout as default } from "@/components/site-shell"
export const metadata = { ...baseMetadata, ...pageMetadata("Exclusão de Dados", "Veja como solicitar a exclusão dos seus dados pessoais no KizuBot.", "/data-deletion") }
