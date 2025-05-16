import assert from "node:assert/strict"
import test from "node:test"
import { ANNIVERSARY_AT, CAMPAIGN_END, anniversaryPhase } from "./anniversary.ts"
import { activePromotion, expiredPromotion, parseProducts } from "./pricing.ts"

test("anniversary wording and campaign end follow inclusive Brasília dates", () => {
  assert.equal(anniversaryPhase(Date.parse("2026-10-09T12:00:00-03:00")), "upcoming")
  assert.equal(anniversaryPhase(ANNIVERSARY_AT - 1), "upcoming")
  assert.equal(anniversaryPhase(ANNIVERSARY_AT), "celebrating")
  assert.equal(anniversaryPhase(CAMPAIGN_END - 1), "celebrating")
  assert.equal(anniversaryPhase(CAMPAIGN_END), "ended")
  assert.equal(new Date(CAMPAIGN_END).toISOString(), "2026-11-06T03:00:00.000Z")
})

test("promotion labels require valid API evidence and stop at the exact cutoff", () => {
  const product = parseProducts({ products: [{
    productKey: "premium-720h-br-south-1", datacenterId: "br-south-1", planKind: "premium", meterMode: "online",
    grantedSeconds: 2592000, amountMinor: 30000, displayName: "Premium 720h",
    regularAmountMinor: 45000, promotionEndsAt: "2026-11-06T03:00:00Z", promotionActive: true,
  }] })[0]
  assert.equal(activePromotion(product, CAMPAIGN_END - 1), true)
  assert.equal(activePromotion(product, CAMPAIGN_END), false)
  assert.equal(expiredPromotion(product, CAMPAIGN_END), true)
  assert.equal(activePromotion({ ...product, promotionActive: false }, CAMPAIGN_END - 1), false)
  assert.equal(activePromotion({ ...product, regularAmountMinor: 26000 }, CAMPAIGN_END - 1), false)
  assert.equal(activePromotion({ ...product, promotionEndsAt: undefined }, CAMPAIGN_END - 1), false)
})

test("unavailable catalog never produces fallback payable amounts", () => {
  assert.deepEqual(parseProducts(null), [])
  assert.deepEqual(parseProducts({ products: [{ amountMinor: "30000" }] }), [])
})
