import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic OG image generator.
 * Usage: /og?title=My+Page+Title
 * Default: KizuBot branding image
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "KizuBot";
  const subtitle =
    searchParams.get("subtitle") ||
    "Advanced AI Bot for PokeXGames";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020008 0%, #0A0A2E 50%, #020008 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid background effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,204,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,204,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #00CCFF, #FFAA00, #AA66FF, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "60px",
            zIndex: 1,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#00CCFF",
              letterSpacing: "4px",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            KIZUBOT
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? "42px" : "52px",
              fontWeight: "800",
              color: "#F1F5F9",
              lineHeight: 1.2,
              maxWidth: "900px",
              marginBottom: "20px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              color: "#888888",
              maxWidth: "700px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#555555",
            fontSize: "16px",
          }}
        >
          <span>kizubot.com</span>
          <span style={{ color: "#00CCFF" }}>•</span>
          <span>PokeXGames Automation</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
