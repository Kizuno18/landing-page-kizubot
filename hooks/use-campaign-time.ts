"use client"

import { useEffect, useState } from "react"
import { ANNIVERSARY_AT, CAMPAIGN_END } from "@/lib/anniversary"
import { scheduleCampaignBoundary } from "@/lib/campaign-timer"

export function useCampaignTime() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const interval = window.setInterval(update, 30_000)
    const timers = [ANNIVERSARY_AT, CAMPAIGN_END]
      .filter((boundary) => boundary > Date.now())
      .map((boundary) => scheduleCampaignBoundary(boundary, update, {
        now: Date.now,
        schedule: (callback, delay) => window.setTimeout(callback, delay),
        cancel: (handle) => window.clearTimeout(handle),
      }))
    document.addEventListener("visibilitychange", update)
    return () => {
      window.clearInterval(interval)
      timers.forEach((cancel) => cancel())
      document.removeEventListener("visibilitychange", update)
    }
  }, [])
  return now
}
