// Captures real mobile (narrow / portrait) screenshots of the running site for
// the web app manifest. Requires the production server running (PORT 3210) and
// a Chromium binary (uses the env's preinstalled Playwright browser).
//
//   pnpm exec next start -p 3210 &
//   node scripts/capture-screenshots.mjs
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(root, "public", "screenshots")
const BASE = process.env.BASE_URL || "http://localhost:3210"
const EXEC =
  process.env.CHROMIUM_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

// iPhone-class viewport. deviceScaleFactor 2 -> 828x1792 output (ratio 2.16,
// within Chrome's <= 2.3 rule for install-dialog screenshots).
const VIEWPORT = { width: 414, height: 896 }

async function main() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch({
    executablePath: EXEC,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  })
  // Keep the install banner out of the shots.
  await context.addInitScript(() => {
    try {
      localStorage.setItem("kizubot-pwa-install-dismissed", "1")
      localStorage.setItem("kizubot-pwa-ios-dismissed", "1")
    } catch {}
  })

  const page = await context.newPage()
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 60000 })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: join(OUT, "mobile-home.png") })
  console.log("  ✓ mobile-home.png")

  // Align each section's top to the viewport (offset for the sticky header).
  for (const [id, name] of [
    ["features", "mobile-features.png"],
    ["how-it-works", "mobile-how.png"],
    ["results", "mobile-results.png"],
  ]) {
    const found = await page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId)
      if (!el) return false
      el.scrollIntoView({ block: "start" })
      window.scrollBy(0, -72)
      return true
    }, id)
    if (!found) {
      console.log("  · skipped (no #" + id + ")")
      continue
    }
    await page.waitForTimeout(1000)
    await page.screenshot({ path: join(OUT, name) })
    console.log("  ✓", name)
  }

  await browser.close()
  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
