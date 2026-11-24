# SEO implementation and verification

## Canonical URLs and languages

Production redirects the apex domain to `https://www.kizubot.com`. `lib/seo.ts` is the source of canonical URLs, page metadata and reciprocal language alternates. Portuguese and English pages have separate root layouts so the HTML language is correct in the original server response. Public route paths remain unchanged.

Legacy `/setup`, `/setup-poke`, `/engine` and `/general` URLs permanently redirect to their documentation equivalents, preserving query strings. The documentation subdomain permanently redirects to the canonical site's `/docs` subtree. Do not configure a reverse www-to-apex redirect in the hosting dashboard.

## Content and structured data

The homepage alone describes the software, organization and website. Offers derive from the same validated product API data used by visible plan cards. Unverified aggregate ratings, fictitious verification values, unsupported global FAQ markup and the incorrect global breadcrumb have been removed. Legal content and existing billing copy are preserved.

The documentation index links to 18 individual guides; `lib/docs.ts` controls their Portuguese metadata and related-guide matching. Each guide has its own H1, breadcrumb and TechArticle. Changelog entries link to relevant documentation and are rendered without injecting raw Markdown as HTML.

Sitemap modification dates come from content history where available or the actual changelog publication date. When a hosting checkout lacks Git history, optional dates are omitted instead of replaced with the current build time.

## Videos

Watch pages are generated from the existing allowlist in `public/video-urls.txt`. Titles, upload dates and captions come from the original publisher, with optional reviewed overrides documented in `content/videos/README.md`. The player is present in the initial HTML. No captions, reviews, dates or statistics are invented. VideoObject is emitted only when required factual metadata is available. A watch page lacking a verified title is excluded from the sitemap and marked noindex until metadata becomes available.

Public caption retrieval can fail or a video may have no captions. In either case the page says a transcript is unavailable. A complete transcript collection requires access to the original captions or recordings and permission to publish them; unavailable transcripts are not replaced with generated summaries.

## Verification

`pnpm build` runs SEO unit tests, the production Next.js build, and HTTP checks against a temporary production server. HTML checks cover canonical tags, language, H1s, structured data, visible API offer prices, FAQ text, video players, redirects, query preservation, robots and the image optimizer. A successful run writes `test-results/seo-smoke.json`. Vercel uses this build command, so a failed SEO check prevents deploying that build. GitHub Actions runs the same command when runners are available.

The repository's existing `typescript.ignoreBuildErrors: true` setting is preserved rather than introducing an unrelated type-policy change. `pnpm typecheck` is a separate diagnostic command; a successful SEO build is not a claim that repository-wide TypeScript diagnostics are clear.

Commands: `pnpm test:seo`, `pnpm typecheck`, `pnpm build`. `pnpm test:seo:html` needs an existing successful Next.js build. These checks do not replace a real-device performance audit or Google Search Console's indexing reports.

## External verification

Set `GOOGLE_SITE_VERIFICATION` to the real Search Console HTML-tag token only when using that verification method; DNS verification does not need a token in the application. No placeholder is emitted. Search Console ownership, sitemap submission, live Google indexing and unavailable publisher transcripts require the relevant external account/data; they cannot be inferred from this repository.
