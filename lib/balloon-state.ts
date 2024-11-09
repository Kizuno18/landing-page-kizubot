export type BalloonSlot = {
  id: number
  generation: number
  phase: "active" | "burst" | "waiting"
  remainingMs: number
}

export const balloonBurstMs = 420
export const balloonRespawnMs = 3800

export function createBalloonSlots(count: number): BalloonSlot[] {
  return Array.from({ length: Math.min(4, Math.max(0, count)) }, (_, id) => ({
    id, generation: 0, phase: "active", remainingMs: 0,
  }))
}

export function popBalloon(slots: BalloonSlot[], id: number, reducedMotion: boolean): BalloonSlot[] {
  return slots.map(slot => slot.id === id && slot.phase === "active"
    ? { ...slot, phase: reducedMotion ? "waiting" : "burst", remainingMs: reducedMotion ? balloonRespawnMs : balloonBurstMs }
    : slot)
}

export function advanceBalloons(slots: BalloonSlot[], elapsedMs: number): BalloonSlot[] {
  if (elapsedMs <= 0 || !Number.isFinite(elapsedMs)) return slots
  return slots.map(slot => {
    if (slot.phase === "active") return slot
    const remainingMs = slot.remainingMs - elapsedMs
    if (remainingMs > 0) return { ...slot, remainingMs }
    if (slot.phase === "burst" && remainingMs + balloonRespawnMs > 0) {
      return { ...slot, phase: "waiting", remainingMs: remainingMs + balloonRespawnMs }
    }
    return { ...slot, phase: "active", remainingMs: 0, generation: slot.generation + 1 }
  })
}
