import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { LanguageToggle } from "@/components/changelog/language-toggle"
import { ChangelogEntryCard } from "@/components/changelog/changelog-entry-card"
import { getAllChangelogs, type Locale } from "@/lib/changelog"
import { absoluteUrl } from "@/lib/seo"
export function ChangelogIndexPage({ locale }: { locale: Locale }) {
  const en = locale === "en"
  const entries = getAllChangelogs(locale)
  const path = `${en ? "/en" : ""}/changelog`
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "KizuBot Changelog", url: absoluteUrl(path), inLanguage: en ? "en" : "pt-BR", mainEntity: { "@type": "ItemList", itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.title, url: absoluteUrl(`${path}/${entry.slug}`) })) } }} />
    <Header /><main id="main-content" className="min-h-screen bg-background pt-28 pb-16 px-4"><div className="max-w-3xl mx-auto">
      <header className="mb-12"><div className="flex flex-wrap items-center justify-between gap-4 mb-4"><h1 className="text-4xl font-bold">{en ? "KizuBot updates" : "Atualizações do KizuBot"}</h1><LanguageToggle active={locale} ptHref="/changelog" enHref="/en/changelog" /></div><p className="text-lg text-muted-foreground">{en ? "New features, improvements and fixes. Each update links to relevant configuration guides." : "Novas funcionalidades, melhorias e correções. Cada atualização inclui links aos guias relacionados."}</p><Link href="/feed.xml" className="inline-block mt-4 text-primary underline">{en ? "Subscribe to the RSS feed" : "Acompanhar pelo RSS (em inglês)"}</Link></header>
      <div className="space-y-6">{entries.map((entry) => <ChangelogEntryCard key={entry.slug} entry={entry} locale={locale} />)}</div>
      {!entries.length && <p>{en ? "No updates available yet." : "Nenhuma atualização disponível ainda."}</p>}
      <Link href={en ? "/en" : "/"} className="block mt-12 text-primary underline">{en ? "← Back to home" : "← Voltar ao início"}</Link>
    </div></main><Footer locale={en ? "en" : "pt-BR"} />
  </>
}
