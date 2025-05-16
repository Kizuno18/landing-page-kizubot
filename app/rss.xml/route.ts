import { NextResponse } from "next/server"
import { absoluteUrl } from "@/lib/seo"
export async function GET() { return NextResponse.redirect(absoluteUrl("/feed.xml"), 301) }
