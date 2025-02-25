import { cache } from "react"
import { PRODUCTS_URL, EXCHANGE_RATES_URL, FALLBACK_USD_RATE, parseProducts, parseUsdRate } from "@/lib/pricing"

async function readJson(url: string): Promise<unknown> {
  try {
    const response = await fetch(url, { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) })
    return response.ok ? await response.json() : null
  } catch { return null }
}
// Shared between server components; never fabricate a price when the API is unavailable.
export const getLandingProducts = cache(async () => parseProducts(await readJson(PRODUCTS_URL)))
export const getUsdRate = cache(async () => parseUsdRate(await readJson(EXCHANGE_RATES_URL)) || FALLBACK_USD_RATE)
