"use client"

import Script from "next/script"

/**
 * Loads GA4 via the first-party `/g/boot` endpoint.
 * The clarity-proxy Worker at `m.kizubot.com/g/boot` (reached through the
 * Next.js rewrite on `/g/*`) resolves the measurementId based on Referer
 * hostname — `kizubot.com` → Kizubot LP property (G-TZDW1RWBRX).
 * No consumer env var required.
 */
export function Gtag() {
  return <Script src="/g/boot" strategy="afterInteractive" />
}
