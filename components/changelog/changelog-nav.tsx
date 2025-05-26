import Link from "next/link";
import type { ChangelogEntry, Locale } from "@/lib/changelog";

interface ChangelogNavProps {
  prev: ChangelogEntry | null;
  next: ChangelogEntry | null;
  locale: Locale;
}

/**
 * Previous/Next navigation between changelog entries.
 * Uses semantic nav element for accessibility.
 */
export function ChangelogNav({ prev, next, locale }: ChangelogNavProps) {
  const basePath = locale === "en" ? "/en/changelog" : "/changelog";
  const prevLabel = locale === "en" ? "Previous" : "Anterior";
  const nextLabel = locale === "en" ? "Next" : "Próximo";

  if (!prev && !next) return null;

  return (
    <nav
      className="flex justify-between items-stretch gap-4 mt-12 pt-8 border-t border-primary/10"
      aria-label={locale === "en" ? "Changelog navigation" : "Navegação do changelog"}
    >
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="flex-1 group p-4 rounded-lg border border-primary/10 hover:border-primary/25 transition-colors"
        >
          <span className="block text-xs font-mono text-muted-foreground mb-1">
            &larr; {prevLabel}
          </span>
          <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="flex-1 group p-4 rounded-lg border border-primary/10 hover:border-primary/25 transition-colors text-right"
        >
          <span className="block text-xs font-mono text-muted-foreground mb-1">
            {nextLabel} &rarr;
          </span>
          <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
