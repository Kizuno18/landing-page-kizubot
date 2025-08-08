import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("English landing uses localized shared sections and server data", async () => {
  const [page, ptPage, layout, shell, seo, sitemap] = await Promise.all([
    readFile("app/en/page.tsx", "utf8"), readFile("app/(home)/page.tsx", "utf8"),
    readFile("app/en/layout.tsx", "utf8"), readFile("components/site-shell.tsx", "utf8"),
    readFile("lib/seo.ts", "utf8"), readFile("app/sitemap.ts", "utf8"),
  ])
  for (const name of ["HeroSection", "VideoGallery", "Results", "PricingSection", "FaqSection", "Footer"]) assert.match(page, new RegExp(`<${name} locale="en"`), name)
  assert.match(page, /initialProducts=\{products\}/)
  assert.match(page, /initialUsdRate=\{usdRate\}/)
  assert.match(page, /videos=\{videos\}/)
  assert.match(layout, /<SiteShell locale="en">/)
  assert.match(shell, /<html lang=\{locale\}/)
  assert.match(page, /pageMetadata\(/)
  assert.match(ptPage, /pageMetadata\(/)
  assert.match(page, /\{ pt: "\/", en: "\/en" \}/)
  assert.match(ptPage, /\{ pt: "\/", en: "\/en" \}/)
  assert.match(seo, /SITE_URL = "https:\/\/www\.kizubot\.com"/)
  assert.match(sitemap, /url: absoluteUrl\("\/en"\), alternates: alternates\("\/", "\/en"\)/)
})
