import assert from "node:assert/strict"
import test from "node:test"
import { enPriceLabel, fillAmount, formatBrl, parseProducts, parseUsdRate, pricedCards, productCopyKey, usdApprox, visibleFaqItems } from "./pricing.ts"

const products = [
  { productKey: "premium-720h-br-south-1", datacenterId: "br-south-1", planKind: "premium", meterMode: "online", grantedSeconds: 2592000, amountMinor: 30000, currency: "brl", displayName: "Premium — 720h" },
  { productKey: "base-7d-br-south-1", datacenterId: "br-south-1", planKind: "base", meterMode: "wall_clock", grantedSeconds: 604800, amountMinor: 9000, currency: "brl", displayName: "Base — 7 dias" },
]

test("parseProducts keeps only well-formed base/premium products", () => {
  assert.equal(parseProducts({ products }).length, 2)
  assert.deepEqual(parseProducts({ products: [{ ...products[0], planKind: "cota" }, { ...products[0], amountMinor: "30000" }] }), [])
  assert.deepEqual(parseProducts(null), [])
})

test("cards follow the copy order, take live prices, and never show COTA yet", () => {
  const cards = [
    { key: "base_7d", requiresCota: false }, { key: "base_15d", requiresCota: false },
    { key: "premium_720h", requiresCota: false }, { key: "cota", requiresCota: true },
  ]
  const priced = pricedCards(cards, parseProducts({ products }))
  assert.deepEqual(priced.map((entry) => [entry.card?.key, entry.product.amountMinor]), [["base_7d", 9000], ["premium_720h", 30000]])
  assert.deepEqual(pricedCards(cards, []), [])
})

test("a catalog product without a copy card still renders, after the carded ones", () => {
  const cards = [{ key: "base_7d", requiresCota: false }, { key: "cota", requiresCota: true }]
  const extra = { ...products[1], productKey: "base-60d-br-south-1", displayName: "Base — 60 dias", amountMinor: 50000 }
  const priced = pricedCards(cards, parseProducts({ products: [extra, ...products] }))
  assert.deepEqual(
    priced.map((entry) => [entry.card?.key ?? null, entry.product.displayName]),
    [["base_7d", "Base — 7 dias"], [null, "Base — 60 dias"], [null, "Premium — 720h"]],
  )
})

test("BRL, USD and key helpers", () => {
  assert.equal(productCopyKey("premium-2160h-br-south-1", "br-south-1"), "premium_2160h")
  assert.equal(formatBrl(9000).replace(/\u00a0/g, " "), "R$ 90")
  assert.equal(formatBrl(9050).replace(/\u00a0/g, " "), "R$ 90,50")
  assert.equal(usdApprox(9000, 0.18), "16.20")
  assert.equal(parseUsdRate({ rates: { USD: 0.2 } }), 0.2)
  assert.equal(parseUsdRate({ rates: { USD: "x" } }), 0.18)
  assert.equal(parseUsdRate(null), 0.18)
  assert.equal(fillAmount("≈ US$ {amount}", "16.20"), "≈ US$ 16.20")
  assert.equal(enPriceLabel(9000, 0.18, "≈ US$ {amount}"), "R$\u00a090 (≈ US$ 16.20*)")
})

test("FAQ hides COTA items and uses the pre-COTA answer", () => {
  const items = [
    { id: "price", requiresCota: false, answer: "full", answerBeforeCota: "before" },
    { id: "cota", requiresCota: true, answer: "cota" },
    { id: "safe", requiresCota: false, answer: "safe" },
  ]
  assert.deepEqual(visibleFaqItems(items).map((item) => [item.id, item.shown]), [["price", "before"], ["safe", "safe"]])
})
