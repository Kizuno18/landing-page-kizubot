import Link from "next/link";
import type { Locale } from "@/lib/changelog";

interface LanguageToggleProps {
  active: Locale;
  ptHref: string;
  enHref: string;
}

/**
 * Segmented pill toggle for PT/EN language switching.
 * Active locale is highlighted, inactive is a link.
 */
export function LanguageToggle({ active, ptHref, enHref }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-primary/15 bg-card/50 p-0.5 font-mono text-xs">
      {active === "pt" ? (
        <span className="px-3 py-1.5 rounded bg-primary/15 text-primary font-medium">
          PT
        </span>
      ) : (
        <Link
          href={ptHref}
          className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
        >
          PT
        </Link>
      )}
      {active === "en" ? (
        <span className="px-3 py-1.5 rounded bg-primary/15 text-primary font-medium">
          EN
        </span>
      ) : (
        <Link
          href={enHref}
          className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
        >
          EN
        </Link>
      )}
    </div>
  );
}
