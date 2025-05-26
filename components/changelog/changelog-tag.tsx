import { TAG_CONFIG, type ChangelogTag, type Locale } from "@/lib/changelog";

interface ChangelogTagProps {
  tag: ChangelogTag;
  locale: Locale;
}

/**
 * Colored pill badge for changelog entry categories.
 * Uses brand CSS vars for theme-aware colors.
 */
export function ChangelogTagBadge({ tag, locale }: ChangelogTagProps) {
  const config = TAG_CONFIG[tag];
  if (!config) return null;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border"
      style={{
        color: config.color,
        borderColor: `color-mix(in srgb, ${config.color} 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${config.color} 8%, transparent)`,
      }}
    >
      {config.label[locale]}
    </span>
  );
}
