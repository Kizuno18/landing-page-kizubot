import Link from "next/link"
import { relatedDocs } from "@/lib/docs"
import type { Locale } from "@/lib/changelog"
export function RelatedDocs({ text, locale }: { text: string; locale: Locale }) {
  const docs = relatedDocs(text)
  if (!docs.length) return null
  return <aside className="mt-10 p-6 border border-primary/20 rounded-xl" aria-labelledby="related-docs-heading"><h2 id="related-docs-heading" className="text-xl font-bold mb-4">{locale === "en" ? "Related configuration guides (Portuguese)" : "Guias relacionados a esta atualização"}</h2><ul className="grid gap-3 sm:grid-cols-2">{docs.map((doc) => <li key={doc.id}><Link href={`/docs/${doc.id}`} hrefLang="pt-BR" lang="pt-BR" className="text-primary hover:underline">{doc.name}</Link></li>)}</ul></aside>
}
