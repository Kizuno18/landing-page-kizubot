export const ANNIVERSARY_AT = Date.parse("2026-10-11T00:00:00-03:00")
export const CAMPAIGN_END = Date.parse("2026-11-06T00:00:00-03:00")

export function anniversaryPhase(now: number): "upcoming" | "celebrating" | "ended" {
  if (now >= CAMPAIGN_END) return "ended"
  return now < ANNIVERSARY_AT ? "upcoming" : "celebrating"
}
