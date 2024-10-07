import type { NextConfig } from "next"
import withSerwistInit from "@serwist/next"

const nextConfig: NextConfig = {
  // Preserve the repository's existing type-check policy; `pnpm typecheck`
  // remains available separately. Production HTML and SEO tests gate builds.
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }, { protocol: "https", hostname: "img.youtube.com" }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/setup", destination: "/docs/setup", permanent: true },
      { source: "/setup-poke", destination: "/docs/setup", permanent: true },
      { source: "/engine", destination: "/docs/engine", permanent: true },
      { source: "/general", destination: "/docs/engine", permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: "/c/:path*", destination: "https://m.kizubot.com/c/:path*" },
      { source: "/g/:path*", destination: "https://m.kizubot.com/g/:path*" },
      { source: "/m/:path*", destination: "https://m.kizubot.com/m/:path*" },
      { source: "/track/:path*", destination: "https://m.kizubot.com/track/:path*" },
      { source: "/webhook/:path*", destination: "https://m.kizubot.com/webhook/:path*" },
    ]
  },
  async headers() {
    return [{ source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Service-Worker-Allowed", value: "/" }] }]
  },
}
const withSerwist = withSerwistInit({ swSrc: "app/sw.ts", swDest: "public/sw.js", disable: process.env.NODE_ENV === "development", reloadOnOnline: false, globPublicPatterns: ["icons/**/*", "manifest.json", "offline.html"] })
export default withSerwist(nextConfig)
