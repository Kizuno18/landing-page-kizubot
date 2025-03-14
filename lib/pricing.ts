export const PRODUCTS_URL = "https://painel.kizubot.com/api/products?datacenter=br-south-1"
export const EXCHANGE_RATES_URL = "https://painel.kizubot.com/api/exchange-rates"
export const FALLBACK_USD_RATE = 0.18

export interface LandingProduct {
  productKey: string
  datacenterId: string
  planKind: "base" | "premium"
  meterMode: "wall_clock" | "online"
  grantedSeconds: number
  amountMinor: number
  displayName: string
  regularAmountMinor?: number
  promotionEndsAt?: string | null
  promotionActive?: boolean
}

function positiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0
}

export function parseProducts(value: unknown): LandingProduct[] {
  const list = value && typeof value === "object" ? (value as { products?: unknown }).products : null
  if (!Array.isArray(list)) return []
  const products: LandingProduct[] = []
  for (const item of list) {
    if (!item || typeof item !== "object") continue
    const row = item as Record<string, unknown>
    if (typeof row.productKey !== "string" || typeof row.datacenterId !== "string" || typeof row.displayName !== "string") continue
    if (row.planKind !== "base" && row.planKind !== "premium") continue
    if (row.meterMode !== "wall_clock" && row.meterMode !== "online") continue
    if (!positiveInteger(row.grantedSeconds) || !positiveInteger(row.amountMinor)) continue
    products.push({
      productKey: row.productKey, datacenterId: row.datacenterId, planKind: row.planKind, meterMode: row.meterMode,
      grantedSeconds: row.grantedSeconds, amountMinor: row.amountMinor, displayName: row.displayName,
      ...(positiveInteger(row.regularAmountMinor) ? { regularAmountMinor: row.regularAmountMinor } : {}),
      ...(typeof row.promotionEndsAt === "string" && Number.isFinite(Date.parse(row.promotionEndsAt)) ? { promotionEndsAt: row.promotionEndsAt } : {}),
      ...(typeof row.promotionActive === "boolean" ? { promotionActive: row.promotionActive } : {}),
    })
  }
  return products
}

export function activePromotion(product: LandingProduct, now: number): boolean {
  return product.promotionActive === true
    && typeof product.regularAmountMinor === "number"
    && product.regularAmountMinor > product.amountMinor
    && typeof product.promotionEndsAt === "string"
    && Date.parse(product.promotionEndsAt) > now
}

export function expiredPromotion(product: LandingProduct, now: number): boolean {
  return product.promotionActive === true
    && typeof product.promotionEndsAt === "string"
    && Date.parse(product.promotionEndsAt) <= now
}

export function productCopyKey(productKey: string, datacenterId: string): string {
  const suffix = `-${datacenterId}`
  return (productKey.endsWith(suffix) ? productKey.slice(0, -suffix.length) : productKey).replace(/-/g, "_")
}

export function formatBrl(amountMinor: number): string {
  const fractionDigits = amountMinor % 100 === 0 ? 0 : 2
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits,
  }).format(amountMinor / 100)
}

export function usdApprox(amountMinor: number, usdRate: number): string {
  return (amountMinor / 100 * usdRate).toFixed(2)
}

export function parseUsdRate(value: unknown): number {
  const rate = (value as { rates?: { USD?: unknown } } | null)?.rates?.USD
  return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_USD_RATE
}

export function fillAmount(template: string, amount: string): string {
  return template.replace("{amount}", amount)
}

export function enPriceLabel(amountMinor: number, usdRate: number, usdTemplate: string): string {
  return `${formatBrl(amountMinor)} (${fillAmount(usdTemplate, usdApprox(amountMinor, usdRate))}*)`
}

export function pricedCards<C extends { key: string; requiresCota: boolean }>(
  cards: readonly C[],
  products: LandingProduct[],
): { card: C | null; product: LandingProduct }[] {
  const byKey = new Map(products.map((product) => [productCopyKey(product.productKey, product.datacenterId), product]))
  const cardKeys = new Set(cards.map((card) => card.key))
  const carded = cards
    .filter((card) => !card.requiresCota && byKey.has(card.key))
    .map((card) => ({ card, product: byKey.get(card.key)! }))
  const uncarded = products
    .filter((product) => !cardKeys.has(productCopyKey(product.productKey, product.datacenterId)))
    .map((product) => ({ card: null, product }))
  return [...carded, ...uncarded]
}

export function visibleFaqItems<I extends { requiresCota: boolean; answer: string; answerBeforeCota?: string }>(
  items: readonly I[],
): (I & { shown: string })[] {
  return items.filter((item) => !item.requiresCota).map((item) => ({ ...item, shown: item.answerBeforeCota ?? item.answer }))
}
