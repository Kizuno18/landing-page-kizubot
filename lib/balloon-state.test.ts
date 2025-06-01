import assert from "node:assert/strict"
import test from "node:test"
import { advanceBalloons, balloonBurstMs, balloonRespawnMs, createBalloonSlots, popBalloon } from "./balloon-state.ts"

test("rapid repeated activation cannot extend a popped balloon's lifetime", () => {
  const initial = createBalloonSlots(4)
  const popped = popBalloon(initial, 0, false)
  assert.deepEqual(popBalloon(popped, 0, false), popped)
  assert.equal(popped.filter(slot => slot.phase === "active").length, 3)
  const waiting = advanceBalloons(popped, balloonBurstMs)
  assert.equal(waiting[0].phase, "waiting")
  assert.equal(waiting[0].remainingMs, balloonRespawnMs)
  const restored = advanceBalloons(waiting, balloonRespawnMs)
  assert.equal(restored[0].phase, "active")
  assert.equal(restored[0].generation, 1)
  assert.equal(restored.length, 4)
})

test("reduced motion skips the burst and uses the same bounded replacement", () => {
  const slots = popBalloon(createBalloonSlots(2), 1, true)
  assert.equal(slots[1].phase, "waiting")
  assert.equal(advanceBalloons(slots, balloonRespawnMs - 1)[1].phase, "waiting")
  assert.equal(advanceBalloons(slots, balloonRespawnMs)[1].phase, "active")
})

test("invalid elapsed time cannot advance timers and a delayed tick cannot multiply slots", () => {
  const slots = popBalloon(createBalloonSlots(12), 2, false)
  assert.equal(slots.length, 4)
  assert.deepEqual(advanceBalloons(slots, NaN), slots)
  assert.deepEqual(advanceBalloons(slots, -100), slots)
  const delayed = advanceBalloons(slots, 60000)
  assert.equal(delayed.length, 4)
  assert.equal(delayed[2].generation, 1)
  assert.ok(delayed.every(slot => slot.phase === "active"))
})
