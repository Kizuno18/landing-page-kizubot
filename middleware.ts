import { NextResponse, type NextRequest } from "next/server"

const CANONICAL_ORIGIN = "https://www.kizubot.com"
export function middleware(req: NextRequest) {
  const host = req.nextUrl.hostname.toLowerCase()
  const { pathname, search } = req.nextUrl
  if (host === "kizubot.com") return NextResponse.redirect(new URL(pathname + search, CANONICAL_ORIGIN), 308)
  if (host !== "docs.kizubot.com") return NextResponse.next()
  // Preserve old documentation links, including fragments (browser) and queries.
  const destination = pathname === "/" ? "/docs" : pathname === "/docs" || pathname.startsWith("/docs/") || /\.[^/]+$/.test(pathname) ? pathname : `/docs${pathname}`
  return NextResponse.redirect(new URL(destination + search, CANONICAL_ORIGIN), 308)
}
export const config = { matcher: ["/((?!_next/|api/).*)"] }
