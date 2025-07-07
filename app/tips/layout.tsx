import { baseMetadata, pageMetadata } from "@/lib/seo"
export { viewport } from "@/lib/seo"
export { PortugueseRootLayout as default } from "@/components/site-shell"
export const metadata = { ...baseMetadata, ...pageMetadata("Dicas de segurança", "Conheça os riscos e as boas práticas de uso do KizuBot no PokeXGames.", "/tips") }
