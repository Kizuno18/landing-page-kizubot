/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// KizuBot service worker (compiled by @serwist/next -> public/sw.js).
import { defaultCache } from "@serwist/next/worker"
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist"
import { NetworkOnly, Serwist } from "serwist"

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Injected at build time by @serwist/next with the precache manifest.
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

// Tracking/proxy rewrites (see next.config rewrites) and dynamic endpoints
// must never be cached — always go to the network and store nothing.
const NO_CACHE =
  /^\/(c|g|m|track|webhook|api|og|feed\.xml|rss\.xml|sitemap\.xml|robots\.txt)(\/|$)/

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // Auto-update: a new service worker activates and takes control as soon as
  // it installs, so visitors get fresh content on their next navigation
  // without any prompt or forced reload.
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url, sameOrigin }) => sameOrigin && NO_CACHE.test(url.pathname),
      handler: new NetworkOnly(),
    },
    ...defaultCache,
  ],
})

// Offline fallback for navigations. The `fallbacks` constructor option did not
// reliably serve the precached page when the generic NetworkFirst route failed
// offline, so use the router-level catch handler instead — it fires whenever a
// route's handler errors or no route matches. /offline.html is precached, so
// it is always available.
serwist.setCatchHandler(async ({ request }) => {
  if (request.destination === "document") {
    const cached = await serwist.matchPrecache("/offline.html")
    if (cached) return cached
  }
  return Response.error()
})

serwist.addEventListeners()
