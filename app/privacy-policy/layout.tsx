import { baseMetadata, pageMetadata } from "@/lib/seo"
export { viewport } from "@/lib/seo"
export { PortugueseRootLayout as default } from "@/components/site-shell"
export const metadata = { ...baseMetadata, ...pageMetadata("Política de Privacidade", "Saiba como o KizuBot coleta, utiliza e protege informações pessoais.", "/privacy-policy") }
