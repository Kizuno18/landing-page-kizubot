import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
import test from "node:test"
import { billingCopy, cardFeatures } from "./billing-copy.ts"

const LOCALES = ["pt-BR", "en"]
const CARD_KEYS = ["base_7d", "base_15d", "base_30d", "premium_300h", "premium_720h", "premium_2160h", "cota"]
const PRICES = { base_7d: "R$ 90", base_15d: "R$ 160", base_30d: "R$ 250", premium_300h: "R$ 260", premium_720h: "R$ 450", premium_2160h: "R$ 1200", cota: "R$ 0" }
const BANNED = [
  "só pra você", "just for you", "só sua", "on your own machine", "suporte prioritário",
  "máquina dedicada", "Suporte dedicado", "/mês", "250 reais mensal", "checkout.kizubot.com",
  "register.kizubot.com", "5511999999999",
]

test("both locales carry seven cards with regular reference prices and links", () => {
  for (const locale of LOCALES) {
    const cards = billingCopy[locale].pricing.cards
    assert.deepEqual(cards.map((card) => card.key), CARD_KEYS, locale)
    for (const card of cards) {
      assert.equal(card.price, PRICES[card.key], `${locale}.${card.key}`)
      const expectedHref = card.key === "cota" ? "https://painel.kizubot.com/dashboard/cota" : "https://painel.kizubot.com/checkout"
      assert.equal(card.ctaHref, expectedHref, `${locale}.${card.key}`)
      assert.equal(card.requiresCota, card.key === "cota")
      assert.equal(card.premium, card.key.startsWith("premium_"))
    }
    assert.equal(cardFeatures(locale, cards[3]).length, 12)
    assert.equal(cardFeatures(locale, cards[0]).length, 8)
    assert.notEqual(cardFeatures(locale, cards[0]), billingCopy[locale].pricing.sharedFeatures)
  }
})

test("both locales have the same FAQ ids and the same shape", () => {
  const ids = (locale) => billingCopy[locale].faq.items.map((item) => item.id)
  assert.deepEqual(ids("en"), ids("pt-BR"))
  assert.equal(ids("pt-BR").length, 11)
  for (const locale of LOCALES) {
    for (const item of billingCopy[locale].faq.items) {
      assert.equal(item.requiresCota, item.id === "cota", `${locale}.${item.id}`)
      assert.equal("answerBeforeCota" in item, item.id === "price" || item.id === "exhaustion", `${locale}.${item.id}`)
    }
  }
})

test("spot checks match the spec verbatim", () => {
  const pt = billingCopy["pt-BR"]
  const en = billingCopy.en
  assert.equal(pt.whyPremium.title, "Base ou Premium: escolha seu ritmo")
  assert.equal(en.pricing.cards.find((card) => card.key === "cota").description, "Already paying for Claude, Codex, Antigravity or Kiro on a paid tier? Connect your AI account in the KizuBot panel and get a free COTA license with Base-level features for as long as your weekly quota lasts.")
  assert.equal(pt.faq.items.find((item) => item.id === "payment").answer, "Cartão de crédito e boleto em painel.kizubot.com/checkout, liberação automática assim que o pagamento é aprovado. PIX e Cripto também dão, só que é manual: você paga, manda o comprovante no WhatsApp e a gente libera.")
  assert.equal(pt.pricing.loadError, "Não foi possível carregar os planos agora. Tente de novo em instantes.")
})

test("no string repeats a banned or stale claim", () => {
  const text = JSON.stringify(billingCopy)
  for (const phrase of BANNED) assert.equal(text.includes(phrase), false, `contains "${phrase}"`)
})

test("landing copy matches the approved snapshot", () => {
  const snapshotUrl = new URL("./billing-copy.snapshot.json", import.meta.url)
  const current = `${JSON.stringify(billingCopy, null, 2)}\n`
  if (process.env.UPDATE_BILLING_COPY_SNAPSHOT === "1") writeFileSync(snapshotUrl, current)
  assert.equal(current, readFileSync(snapshotUrl, "utf8"))
})
