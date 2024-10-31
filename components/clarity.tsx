"use client"

import Script from "next/script"

/**
 * Loads Microsoft Clarity via the first-party `/c/boot` endpoint.
 * The Cloudflare Worker at `m.kizubot.com/c/boot` (reached through the
 * Next.js rewrite on `/c/*`) injects the projectId based on Referer host
 * (`kizubot.com` → Clarity `lp` project). No env var required.
 */
export function ClarityAnalytics() {
  return <Script src="/c/boot" strategy="afterInteractive" />
}
