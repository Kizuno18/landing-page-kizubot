import assert from "node:assert/strict"
import test from "node:test"
import { CAMPAIGN_END, anniversaryPhase } from "./anniversary.ts"
import { MAX_TIMER_DELAY, scheduleCampaignBoundary, type CampaignClock } from "./campaign-timer.ts"

function fakeClock(start: number) {
  let now = start
  let sequence = 0
  const timers = new Map<number, { at: number; callback: () => void }>()
  const delays: number[] = []
  const clock: CampaignClock = {
    now: () => now,
    schedule: (callback, delay) => {
      delays.push(delay)
      const handle = ++sequence
      timers.set(handle, { at: now + delay, callback })
      return handle
    },
    cancel: (handle) => { timers.delete(handle) },
  }
  return {
    clock,
    delays,
    advanceTo(target: number) {
      for (;;) {
        const next = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0]
        if (!next || next[1].at > target) break
        now = next[1].at
        timers.delete(next[0])
        next[1].callback()
      }
      now = target
    },
  }
}

test("an October 9 open page rearms beyond the timer limit and expires exactly November 6 BRT", () => {
  const fake = fakeClock(Date.parse("2026-10-09T00:00:00-03:00"))
  const effects: { at: number; phase: string }[] = []
  scheduleCampaignBoundary(CAMPAIGN_END, () => effects.push({ at: fake.clock.now(), phase: anniversaryPhase(fake.clock.now()) }), fake.clock)
  assert.equal(fake.delays[0], MAX_TIMER_DELAY)
  fake.advanceTo(CAMPAIGN_END - 1)
  assert.deepEqual(effects, [])
  assert.equal(fake.delays.length, 2)
  assert.ok(fake.delays[1] > 0 && fake.delays[1] < MAX_TIMER_DELAY)
  fake.advanceTo(CAMPAIGN_END)
  assert.deepEqual(effects, [{ at: CAMPAIGN_END, phase: "ended" }])
  fake.advanceTo(CAMPAIGN_END + 60_000)
  assert.equal(effects.length, 1)
})

test("unmount cancellation clears a rearmed long-running boundary", () => {
  const start = Date.parse("2026-10-09T00:00:00-03:00")
  const fake = fakeClock(start)
  let fired = false
  const cancel = scheduleCampaignBoundary(CAMPAIGN_END, () => { fired = true }, fake.clock)
  fake.advanceTo(start + MAX_TIMER_DELAY)
  assert.equal(fake.delays.length, 2)
  cancel()
  fake.advanceTo(CAMPAIGN_END)
  assert.equal(fired, false)
})
