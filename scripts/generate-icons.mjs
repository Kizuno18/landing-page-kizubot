// Generates the PWA / favicon icon set from the master KizuBot logo.
//
// Run locally (not at deploy time) and commit the output:
//   pnpm icons
//
// The master logo is a transparent mascot emblem with both very light
// (white wordmark) and very dark (robot body) elements, so a flat black or
// white tile would hide half of it. We composite it onto a subtle
// dark-purple -> black radial gradient so the brand reads consistently on
// any launcher, tab bar, or splash surface.

import sharp from "sharp"
import pngToIco from "png-to-ico"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { appleSplashScreens } from "../lib/apple-splash.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const SRC = join(root, "public", "images", "logo-principal-kizubot.png")
const OUT = join(root, "public", "icons")
const SHOTS = join(root, "public", "screenshots")
const SPLASH = join(root, "public", "splash")

// Branded background. Slight purple glow in the center fading to the app's
// background_color (#000) at the edges.
function gradientSvg(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="g" cx="50%" cy="42%" r="78%">
           <stop offset="0%" stop-color="#23103f"/>
           <stop offset="55%" stop-color="#0b0614"/>
           <stop offset="100%" stop-color="#000000"/>
         </radialGradient>
       </defs>
       <rect width="${size}" height="${size}" fill="url(#g)"/>
     </svg>`,
  )
}

// Render the logo centered on the gradient tile.
// `coverage` is the fraction of the tile the logo may occupy (the rest is
// padding). Maskable icons use a smaller coverage to stay inside the 80%
// safe zone that aggressive circular masks can crop.
async function makeIcon(size, coverage, file) {
  const box = Math.round(size * coverage)
  const logo = await sharp(SRC)
    .resize(box, box, { fit: "inside", withoutEnlargement: false })
    .toBuffer()

  const out = join(OUT, file)
  await sharp(gradientSvg(size))
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log("  ✓", file)
}

// Apple launch screen: the logo centered on the brand gradient at the device's
// full pixel resolution.
function gradientSvgWH(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="g" cx="50%" cy="45%" r="75%">
           <stop offset="0%" stop-color="#23103f"/>
           <stop offset="55%" stop-color="#0b0614"/>
           <stop offset="100%" stop-color="#000000"/>
         </radialGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
     </svg>`,
  )
}

async function makeSplash(w, h) {
  const logoBox = Math.round(Math.min(w, h) * 0.42)
  const logo = await sharp(SRC)
    .resize(logoBox, logoBox, { fit: "inside", withoutEnlargement: false })
    .toBuffer()

  const file = `apple-splash-${w}-${h}.png`
  // Palette PNG: the near-black gradient + small logo quantize cleanly and cut
  // these from ~10 MB to ~1 MB total.
  await sharp(gradientSvgWH(w, h))
    .composite([{ input: logo, gravity: "center" }])
    .png({ palette: true, quality: 90, effort: 8, compressionLevel: 9 })
    .toFile(join(SPLASH, file))
  console.log("  ✓", "splash/" + file)
}

// Normalize a product image into a uniform "wide" screenshot frame so the
// manifest screenshots satisfy Chrome's richer-install-dialog rules (all
// screenshots of one form factor must share an aspect ratio, ratio <= 2.3).
async function makeScreenshot(src, file) {
  const W = 1280
  const H = 720
  const out = join(SHOTS, file)
  await sharp(join(root, "public", "images", src))
    .resize(W, H, { fit: "contain", background: "#0b0614" })
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log("  ✓", "screenshots/" + file)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  await mkdir(SHOTS, { recursive: true })
  await mkdir(SPLASH, { recursive: true })

  console.log("Generating icons ->", OUT)
  // PWA maskable (separate, tighter safe zone) and "any" purpose icons.
  await makeIcon(192, 0.82, "icon-192.png")
  await makeIcon(512, 0.82, "icon-512.png")
  await makeIcon(192, 0.6, "icon-192-maskable.png")
  await makeIcon(512, 0.6, "icon-512-maskable.png")

  // Apple touch icon (no transparency -> solid tile avoids iOS black fill).
  await makeIcon(180, 0.8, "apple-touch-icon.png")

  // Favicons (bigger coverage since they render tiny).
  await makeIcon(16, 0.9, "favicon-16.png")
  await makeIcon(32, 0.9, "favicon-32.png")
  await makeIcon(48, 0.9, "favicon-48.png")

  // Multi-resolution favicon.ico served by Next from /app.
  const ico = await pngToIco([
    join(OUT, "favicon-16.png"),
    join(OUT, "favicon-32.png"),
    join(OUT, "favicon-48.png"),
  ])
  const icoPath = join(root, "app", "favicon.ico")
  await writeFile(icoPath, ico)
  console.log("  ✓ app/favicon.ico")

  // Manifest screenshots (wide / desktop) from existing product UI images.
  await makeScreenshot("aba_cavebot.jpg", "shot-cavebot.png")
  await makeScreenshot("aba_engine.jpg", "shot-engine.png")
  await makeScreenshot("aba_alarms_pt1.jpg", "shot-alarms.png")

  // Apple launch screens for each supported device.
  for (const s of appleSplashScreens) await makeSplash(s.w, s.h)

  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
