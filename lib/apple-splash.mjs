// Apple PWA launch ("splash") screens.
//
// Shared by scripts/generate-icons.mjs (renders the PNGs) and app/layout.tsx
// (emits the <link rel="apple-touch-startup-image"> tags) so the device list
// stays in one place. Each entry is the device's portrait pixel size + DPR.

export const appleSplashScreens = [
  // iPhones
  { w: 1290, h: 2796, ratio: 3 }, // 15/14 Pro Max
  { w: 1179, h: 2556, ratio: 3 }, // 15 / 15 Pro / 14 Pro
  { w: 1284, h: 2778, ratio: 3 }, // 14 Plus / 13/12 Pro Max
  { w: 1170, h: 2532, ratio: 3 }, // 14 / 13 / 13 Pro / 12 / 12 Pro
  { w: 1125, h: 2436, ratio: 3 }, // 13/12 mini / 11 Pro / XS / X
  { w: 1242, h: 2688, ratio: 3 }, // 11 Pro Max / XS Max
  { w: 828, h: 1792, ratio: 2 }, // 11 / XR
  { w: 1242, h: 2208, ratio: 3 }, // 8/7/6s Plus
  { w: 750, h: 1334, ratio: 2 }, // SE (2nd/3rd) / 8 / 7 / 6s
  { w: 640, h: 1136, ratio: 2 }, // SE (1st)
  // iPads
  { w: 1536, h: 2048, ratio: 2 }, // 9.7" / mini / Air
  { w: 1620, h: 2160, ratio: 2 }, // 10.2"
  { w: 1640, h: 2360, ratio: 2 }, // Air 10.9"
  { w: 1668, h: 2224, ratio: 2 }, // Pro 10.5"
  { w: 1668, h: 2388, ratio: 2 }, // Pro 11"
  { w: 2048, h: 2732, ratio: 2 }, // Pro 12.9"
]

export function appleSplashHref({ w, h }) {
  return `/splash/apple-splash-${w}-${h}.png`
}

export function appleSplashMedia({ w, h, ratio }) {
  const cw = w / ratio
  const ch = h / ratio
  return `screen and (device-width: ${cw}px) and (device-height: ${ch}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)`
}
