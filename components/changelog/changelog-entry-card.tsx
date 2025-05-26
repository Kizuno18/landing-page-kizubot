import Link from "next/link";
import { ChangelogTagBadge } from "./changelog-tag";
import type { ChangelogEntry, Locale } from "@/lib/changelog";

interface ChangelogEntryCardProps {
  entry: ChangelogEntry;
  locale: Locale;
}

/**
 * Card component for the changelog index page.
 * Displays date, title, tags, and summary with a link to the full entry.
 */
export function ChangelogEntryCard({ entry, locale }: ChangelogEntryCardProps) {
  const basePath = locale === "en" ? "/en/changelog" : "/changelog";
  const readMore = locale === "en" ? "Read more" : "Ler mais";

  const formattedDate = new Date(entry.date + "T12:00:00").toLocaleDateString(
    locale === "en" ? "en-US" : "pt-BR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <article className="group relative border border-primary/10 rounded-lg bg-card/50 p-6 hover:border-primary/25 transition-colors">
      {/* Date */}
      <time
        dateTime={entry.date}
        className="block text-sm font-mono text-muted-foreground mb-2"
      >
        {formattedDate}
      </time>

      {/* Title */}
      <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        <Link href={`${basePath}/${entry.slug}`}>{entry.title}</Link>
      </h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {entry.tags.map((tag) => (
          <ChangelogTagBadge key={tag} tag={tag} locale={locale} />
        ))}
      </div>

      {/* Summary */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {entry.summary}
      </p>

      {/* Read more link */}
      <Link
        href={`${basePath}/${entry.slug}`}
        className="inline-flex items-center text-sm font-mono text-primary hover:text-primary/80 transition-colors"
      >
        {readMore}
        <span className="ml-1">&rarr;</span>
      </Link>

      {/* Full-card clickable overlay */}
      <Link
        href={`${basePath}/${entry.slug}`}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        tabIndex={-1}
      />
    </article>
  );
}
