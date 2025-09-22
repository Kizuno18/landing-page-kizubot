import { ChangelogIndexPage } from "@/components/changelog/index-page"
import { pageMetadata } from "@/lib/seo"
export const metadata = pageMetadata("KizuBot updates and changelog", "Follow new KizuBot features, improvements and fixes for PokeXGames, with links to relevant module configuration guides.", "/en/changelog", "en", { pt: "/changelog", en: "/en/changelog" })
export default function Page() { return <ChangelogIndexPage locale="en" /> }
