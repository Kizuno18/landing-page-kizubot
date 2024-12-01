import { ChangelogIndexPage } from "@/components/changelog/index-page"
import { pageMetadata } from "@/lib/seo"
export const metadata = pageMetadata("Atualizações do KizuBot", "Acompanhe as novidades, melhorias e correções do KizuBot para PokeXGames, com links aos guias de configuração dos módulos.", "/changelog", "pt-BR", { pt: "/changelog", en: "/en/changelog" })
export default function Page() { return <ChangelogIndexPage locale="pt" /> }
