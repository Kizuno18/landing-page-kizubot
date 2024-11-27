import Link from "next/link"
import { docModules } from "@/lib/docs"
import { pageMetadata, absoluteUrl } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
export const metadata = pageMetadata("Documentação do KizuBot", "Encontre guias de instalação, painel, cavebot, combate, captura, pesca e atalhos. Aprenda a configurar cada módulo do KizuBot para PokeXGames.", "/docs")
export default function DocsPage() {
  return <div className="container-responsive section-padding pt-28"><div className="max-w-5xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Documentação do KizuBot</h1>
    <p className="text-lg text-muted-foreground mb-6">Encontre o guia da função que deseja configurar. Comece pela preparação da máquina e pelo painel; depois ajuste os módulos conforme sua necessidade.</p>
    <p className="mb-10"><Link href="/docs/machine-setup" className="text-primary underline">Preparar minha máquina</Link>{" · "}<Link href="/docs/gridview" className="text-primary underline">Conhecer o painel</Link>{" · "}<Link href="/docs/hotkeys" className="text-primary underline">Consultar atalhos</Link></p>
    <ul className="grid gap-5 sm:grid-cols-2">{docModules.map((doc) => <li id={doc.id} key={doc.id} className="scroll-mt-28 border border-primary/20 bg-card rounded-xl p-6"><h2 className="text-2xl font-bold mb-3"><Link className="text-primary hover:underline" href={`/docs/${doc.id}`}>{doc.name}</Link></h2><p className="text-muted-foreground">{doc.description}</p></li>)}</ul>
    <p className="mt-10 text-muted-foreground">Veja também o <Link href="/changelog" className="text-primary underline">histórico de atualizações</Link> e os <Link href="/tips" className="text-primary underline">riscos e cuidados de utilização</Link>.</p>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Documentação do KizuBot", url: absoluteUrl("/docs"), inLanguage: "pt-BR", mainEntity: { "@type": "ItemList", itemListElement: docModules.map((doc, index) => ({ "@type": "ListItem", position: index + 1, name: doc.name, url: absoluteUrl(`/docs/${doc.id}`) })) } }} />
  </div></div>
}
