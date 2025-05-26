import type { ReactNode } from "react"

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index} className="text-primary bg-primary/5 px-1 rounded">{part.slice(1, -1)}</code>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link && (/^https?:\/\//.test(link[2]) || /^\/(?!\/)/.test(link[2]))) {
      const href = link[2].replace(/^https:\/\/(?:www\.)?kizubot\.com(?=\/|$)/, "https://www.kizubot.com")
      return <a key={index} className="text-primary underline" href={href}>{link[1]}</a>
    }
    return part
  })
}
// Render the supported Markdown subset as React nodes: no untrusted raw HTML.
export function ChangelogMarkdown({ content }: { content: string }) {
  const blocks: ReactNode[] = []
  let items: string[] = []
  const flush = () => { if (items.length) { blocks.push(<ul key={`list-${blocks.length}`} className="list-disc pl-6 space-y-3">{items.map((line, index) => <li key={index}>{inline(line)}</li>)}</ul>); items = [] } }
  for (const line of content.split("\n")) {
    const text = line.trim()
    if (!text || /^::(?:pt|en)?$/.test(text)) { flush(); continue }
    if (/^[-*] /.test(text)) { items.push(text.slice(2)); continue }
    flush()
    if (/^#{1,6} /.test(text)) blocks.push(<h2 key={blocks.length} className="text-2xl font-bold mt-8">{inline(text.replace(/^#+ /, ""))}</h2>)
    else blocks.push(<p key={blocks.length}>{inline(text)}</p>)
  }
  flush()
  return <div className="space-y-5 text-foreground/80 leading-relaxed">{blocks}</div>
}
