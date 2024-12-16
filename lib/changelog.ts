import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Supported locales for changelog content
export type Locale = "pt" | "en";

// Tag identifiers used in frontmatter
export type ChangelogTag =
  | "new-feature"
  | "improvement"
  | "bug-fix"
  | "security";

// Tag display configuration per locale
export const TAG_CONFIG: Record<
  ChangelogTag,
  { color: string; label: Record<Locale, string> }
> = {
  "new-feature": {
    color: "var(--color-brand-cyan)",
    label: { pt: "Nova Funcionalidade", en: "New Feature" },
  },
  improvement: {
    color: "var(--color-brand-amber)",
    label: { pt: "Melhoria", en: "Improvement" },
  },
  "bug-fix": {
    color: "var(--color-brand-green)",
    label: { pt: "Correção", en: "Bug Fix" },
  },
  security: {
    color: "var(--color-brand-purple)",
    label: { pt: "Segurança", en: "Security" },
  },
};

// Parsed changelog entry metadata (frontmatter)
export interface ChangelogEntry {
  slug: string;
  date: string;
  tags: ChangelogTag[];
  image?: string;
  title: string;
  summary: string;
}

// Full changelog entry with rendered body content
export interface ChangelogEntryWithContent extends ChangelogEntry {
  content: string;
  hasEnglish: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "changelog");

/**
 * Extract locale-specific section from MDX content.
 * Sections are delimited by ::pt / ::en markers.
 */
function extractLocaleContent(rawContent: string, locale: Locale): string {
  const marker = `::${locale}`;
  const otherLocale = locale === "pt" ? "en" : "pt";
  const otherMarker = `::${otherLocale}`;

  const startIdx = rawContent.indexOf(marker);
  if (startIdx === -1) return rawContent;

  const contentAfterMarker = rawContent.substring(startIdx + marker.length);
  const endIdx = contentAfterMarker.indexOf(otherMarker);

  if (endIdx === -1) {
    // No other locale marker found, use everything after current marker
    return contentAfterMarker.trim();
  }

  return contentAfterMarker.substring(0, endIdx).trim();
}

/**
 * Get all changelog entries sorted by date (newest first).
 * Reads frontmatter only — does not parse MDX body.
 */
export function getAllChangelogs(locale: Locale = "pt"): ChangelogEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      const localeData = data[locale] || data.pt || {};

      return {
        slug: data.slug || filename.replace(/\.mdx$/, ""),
        date: data.date,
        tags: data.tags || [],
        image: data.image,
        title: localeData.title || data.title || "",
        summary: localeData.summary || data.summary || "",
        _hasEnglish: data.hasEnglish,
      };
    })
    // When requesting EN, only return entries with real English content
    .filter((entry) => locale === "pt" || entry._hasEnglish === true)
    .map(({ _hasEnglish, ...entry }) => entry as ChangelogEntry)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single changelog entry by slug, with locale-specific content.
 */
export function getChangelogBySlug(
  slug: string,
  locale: Locale = "pt",
): ChangelogEntryWithContent | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  for (const filename of files) {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const entrySlug = data.slug || filename.replace(/\.mdx$/, "");
    if (entrySlug !== slug) continue;

    const localeData = data[locale] || data.pt || {};

    return {
      slug: entrySlug,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
      title: localeData.title || data.title || "",
      summary: localeData.summary || data.summary || "",
      content: extractLocaleContent(content, locale),
      hasEnglish: data.hasEnglish === true,
    };
  }

  return null;
}

/**
 * Get all slugs for generateStaticParams.
 */
export function getChangelogSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data.slug || filename.replace(/\.mdx$/, "");
  });
}

/**
 * Get slugs that have real English content (not PT duplicated).
 * Used by EN pages to avoid generating pages with wrong-language content.
 */
export function getChangelogSlugsWithEnglish(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .filter((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return data.hasEnglish === true;
    })
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return data.slug || filename.replace(/\.mdx$/, "");
    });
}

/**
 * Get adjacent entries for prev/next navigation.
 */
export function getAdjacentEntries(
  slug: string,
  locale: Locale = "pt",
): { prev: ChangelogEntry | null; next: ChangelogEntry | null } {
  const all = getAllChangelogs(locale);
  const idx = all.findIndex((e) => e.slug === slug);

  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
