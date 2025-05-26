import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { LanguageToggle } from "@/components/changelog/language-toggle"
import { ChangelogTagBadge } from "@/components/changelog/changelog-tag"
import { ChangelogNav } from "@/components/changelog/changelog-nav"
import { ChangelogMarkdown } from "@/components/changelog/markdown"
import { RelatedDocs } from "@/components/changelog/related-docs"
import { getChangelogBySlug, getAdjacentEntries, type Locale } from "@/lib/changelog"
import { absoluteUrl, pageMetadata } from "@/lib/seo"

function readEntry(slug: string, locale: Locale) { const entry = getChangelogBySlug(slug, locale); if (!entry || (locale === "en" && !entry.hasEnglish)) notFound(); return entry }
export function changelogMetadata(slug: string, locale: Locale): Metadata {
  const entry = readEntry(slug, locale)
  const path = `${locale === "en" ? "/en" : ""}/changelog/${slug}`
  const metadata = pageMetadata(entry.title, entry.summary, path, locale === "en" ? "en" : "pt-BR", entry.hasEnglish ? { pt: `/changelog/${slug}`, en: `/en/changelog/${slug}` } : undefined)
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: entry.date, ...(entry.image ? { images: [{ url: absoluteUrl(entry.image), alt: entry.title }] } : {}) } }
}
export function ChangelogArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const entry = readEntry(slug, locale)
  const en = locale === "en"
  const home = en ? "/en" : "/"
  const index = `${en ? "/en" : ""}/changelog`
  const url = absoluteUrl(`${index}/${slug}`)
  const { prev, next } = getAdjacentEntries(slug, locale)
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: entry.title, description: entry.summary, datePublished: entry.date, dateModified: entry.date, url, mainEntityOfPage: url, inLanguage: en ? "en" : "pt-BR", author: { "@type": "Organization", name: "KizuBot", url: absoluteUrl("/") }, publisher: { "@type": "Organization", name: "KizuBot", url: absoluteUrl("/") } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: en ? "Home" : "Início", item: absoluteUrl(home) }, { "@type": "ListItem", position: 2, name: "Changelog", item: absoluteUrl(index) }, { "@type": "ListItem", position: 3, name: entry.title, item: url }] }} />
    <Header /><main id="main-content" className="min-h-screen bg-background pt-28 pb-16 px-4"><article className="max-w-3xl mx-auto">
      <nav aria-label={en ? "Breadcrumb" : "Caminho de navegação"} className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-8"><Link href={home}>{en ? "Home" : "Início"}</Link><span aria-hidden="true">/</span><Link href={index}>Changelog</Link><span aria-hidden="true">/</span><span aria-current="page">{entry.title}</span></nav>
      {entry.hasEnglish && <div className="mb-6"><LanguageToggle active={locale} ptHref={`/changelog/${slug}`} enHref={`/en/changelog/${slug}`} /></div>}
      <time dateTime={entry.date} className="block text-sm text-muted-foreground mb-3">{new Date(`${entry.date}T12:00:00Z`).toLocaleDateString(en ? "en-US" : "pt-BR", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{entry.title}</h1>
      <p className="text-lg text-muted-foreground mb-6">{entry.summary}</p>
      <div className="flex flex-wrap gap-2 mb-8">{entry.tags.map((tag) => <ChangelogTagBadge key={tag} tag={tag} locale={locale} />)}</div>
      <ChangelogMarkdown content={entry.content} /><RelatedDocs text={`${entry.title} ${entry.summary} ${entry.content}`} locale={locale} />
      <ChangelogNav prev={prev} next={next} locale={locale} /><Link href={index} className="block mt-8 text-primary hover:underline">{en ? "← All updates" : "← Todas as atualizações"}</Link>
    </article></main><Footer locale={en ? "en" : "pt-BR"} />
  </>
}
