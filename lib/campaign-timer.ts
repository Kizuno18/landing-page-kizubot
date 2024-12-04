export const MAX_TIMER_DELAY = 2_147_483_647

export interface CampaignClock {
  now: () => number
  schedule: (callback: () => void, delay: number) => number
  cancel: (handle: number) => void
}

export function scheduleCampaignBoundary(boundary: number, callback: () => void, clock: CampaignClock): () => void {
  let handle: number | null = null
  let cancelled = false
  const arm = () => {
    if (cancelled) return
    const remaining = boundary - clock.now()
    if (remaining <= 0) {
      callback()
      return
    }
    handle = clock.schedule(arm, Math.min(remaining, MAX_TIMER_DELAY))
  }
  arm()
  return () => {
    cancelled = true
    if (handle !== null) clock.cancel(handle)
  }
}
