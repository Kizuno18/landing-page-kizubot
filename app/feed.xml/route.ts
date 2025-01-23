import { Feed } from "feed"
import { getAllChangelogs } from "@/lib/changelog"
import { absoluteUrl } from "@/lib/seo"
export async function GET() {
  const entries = getAllChangelogs("en")
  const feed = new Feed({ title: "KizuBot Changelog", description: "New features, improvements and fixes for KizuBot, the PokeXGames automation tool.", id: absoluteUrl("/en/changelog"), link: absoluteUrl("/en/changelog"), language: "en", favicon: absoluteUrl("/favicon.ico"), copyright: `© ${new Date().getFullYear()} KizuBot. All rights reserved.`, feedLinks: { rss2: absoluteUrl("/feed.xml") }, author: { name: "KizuBot Team", link: absoluteUrl("/") } })
  for (const entry of entries) feed.addItem({ title: entry.title,
    // Stable legacy GUIDs prevent existing subscribers receiving duplicate items.
    id: `https://kizubot.com/en/changelog/${entry.slug}`,
    link: absoluteUrl(`/en/changelog/${entry.slug}`), description: entry.summary, date: new Date(`${entry.date}T12:00:00Z`), author: [{ name: "KizuBot Team", link: absoluteUrl("/") }] })
  return new Response(feed.rss2(), { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" } })
}
