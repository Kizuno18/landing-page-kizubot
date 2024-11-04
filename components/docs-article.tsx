import type { ReactNode } from "react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl } from "@/lib/seo"
import { docModules, getDoc, type DocId } from "@/lib/docs"
import { contentModifiedAt } from "@/lib/content-dates"

export function DocsArticle({ id, children }: { id: DocId; children: ReactNode }) {
  const doc = getDoc(id)
  const url = absoluteUrl(`/docs/${id}`)
  const modified = contentModifiedAt(`app/docs/sections/${doc.section}.tsx`)
  return <article className="container-responsive section-padding pt-28">
    <div className="max-w-4xl mx-auto">
      <nav aria-label="Caminho de navegação" className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-8"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/docs">Documentação</Link><span aria-hidden="true">/</span><span aria-current="page">{doc.name}</span></nav>
      <header className="mb-10"><h1 className="text-3xl md:text-5xl font-bold text-secondary">{doc.title}</h1><p className="text-lg text-muted-foreground mt-4">{doc.description}</p></header>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Documentação", item: absoluteUrl("/docs") }, { "@type": "ListItem", position: 3, name: doc.name, item: url }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: doc.title, description: doc.description, url, mainEntityOfPage: url, inLanguage: "pt-BR", author: { "@type": "Organization", name: "KizuBot", url: absoluteUrl("/") }, ...(modified ? { dateModified: modified } : {}) }} />
      {children}
      <nav aria-label="Outros guias" className="border-t border-primary/20 pt-8 mt-10"><h2 className="text-xl font-bold mb-4">Continue na documentação</h2><ul className="grid gap-3 sm:grid-cols-3">{docModules.filter((item) => item.id !== id).map((item) => <li key={item.id}><Link className="text-primary hover:underline" href={`/docs/${item.id}`}>{item.name}</Link></li>)}</ul></nav>
    </div>
  </article>
}
