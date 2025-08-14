import assert from 'node:assert/strict'
import fs from 'node:fs'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

const managed = process.argv.includes('--start-server')
const port = process.env.SEO_TEST_PORT || '3187'
const base = process.env.SEO_TEST_URL || `http://127.0.0.1:${port}`
const origin = 'https://www.kizubot.com'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let child, logs = ''
const reports = []
const entities = (text) => text.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code))).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const attr = (tag, name) => new RegExp(`\\b${name}=["']([^"']*)["']`, 'i').exec(tag)?.[1]
const normalizedUrl = (url) => new URL(entities(url)).href
async function request(path, options = {}) { return fetch(`${base}${path}`, { headers: { 'user-agent': 'Googlebot' }, signal: AbortSignal.timeout(45000), ...options }) }
function schemas(html) { return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => { const data = JSON.parse(match[1]); return data['@graph'] ?? [data] }) }
async function checkPage(path) {
  const response = await request(path)
  assert.equal(response.status, 200, `${path}: HTTP status`)
  const html = await response.text()
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).filter((tag) => attr(tag, 'rel') === 'canonical')
  assert.equal(links.length, 1, `${path}: exactly one canonical`)
  // Next normalizes a root URL to its origin without a slash. Compare URL
  // semantics, not spelling: https://example.com and https://example.com/ match.
  assert.equal(normalizedUrl(attr(links[0], 'href')), new URL(`${origin}${path}`).href, `${path}: self canonical`)
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? ''
  assert.ok(title.trim(), `${path}: title`)
  if (path === '/' || path === '/en' || path.startsWith('/docs')) assert.doesNotMatch(title, /2025|KizuBot.*KizuBot/, `${path}: stale or duplicated brand title`)
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: single page-specific H1`)
  assert.equal(attr(/<html\b[^>]*>/.exec(html)?.[0] ?? '', 'lang'), path === '/en' || path.startsWith('/en/') ? 'en' : 'pt-BR', `${path}: language`)
  assert.doesNotMatch(html, /your-google-verification-code|your-yandex-verification-code|your-yahoo-verification-code/)
  const data = schemas(html)
  assert.ok(!data.some((item) => item.aggregateRating), `${path}: unverified ratings`)
  if (path !== '/' && path !== '/en') assert.ok(!data.some((item) => ['SoftwareApplication', 'Product', 'FAQPage'].includes(item['@type'])), `${path}: leaked global schema`)
  for (const item of data) if (item['@type'] === 'BreadcrumbList') assert.equal(normalizedUrl(item.itemListElement.at(-1).item), new URL(`${origin}${path}`).href, `${path}: breadcrumb destination`)
  for (const item of data) if (item['@type'] === 'VideoObject') { assert.ok(item.name && item.uploadDate && item.thumbnailUrl && item.embedUrl); assert.ok(Number.isFinite(Date.parse(item.uploadDate))) }
  if (path === '/' || path === '/en') {
    const bodyText = entities(html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '))
    const software = data.find((item) => item['@type'] === 'SoftwareApplication')
    assert.ok(software, `${path}: scoped software data`)
    for (const offer of software.offers ?? []) { const amount = Number(offer.price); const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: amount % 1 === 0 ? 0 : 2, maximumFractionDigits: amount % 1 === 0 ? 0 : 2 }).format(amount); assert.ok(bodyText.includes(entities(price)), `${path}: offer price must appear in initial HTML`) }
    assert.match(html, /<details\b/, `${path}: server-rendered FAQ`)
  }
  if (path.startsWith('/videos/')) assert.match(html, /<iframe\b[^>]*youtube-nocookie\.com/, `${path}: crawlable player`)
  reports.push({ path, status: response.status, title: entities(title), schemas: data.map((item) => item['@type']) })
}
try {
  if (managed) {
    child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', port], { env: { ...process.env, NODE_ENV: 'production' }, stdio: ['ignore', 'pipe', 'pipe'] })
    child.stdout.on('data', (data) => { logs = (logs + data.toString()).slice(-24000) })
    child.stderr.on('data', (data) => { logs = (logs + data.toString()).slice(-24000) })
    child.on('error', (error) => { logs += String(error) })
  }
  let ready = false
  for (let attempt = 0; attempt < 80; attempt++) { try { if ((await fetch(`${base}/robots.txt`, { signal: AbortSignal.timeout(1000) })).ok) { ready = true; break } } catch {} if (child?.exitCode !== null && child?.exitCode !== undefined) break; await wait(250) }
  assert.ok(ready, `Server did not start: ${logs}`)
  const sitemapResponse = await request('/sitemap.xml')
  assert.equal(sitemapResponse.status, 200)
  const sitemap = await sitemapResponse.text()
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => entities(match[1]))
  assert.ok(urls.length > 20, 'complete sitemap')
  assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URLs')
  for (const url of urls) assert.equal(new URL(url).origin, origin, 'sitemap host')
  assert.ok(urls.includes(`${origin}/docs/hotkeys`), 'hotkeys in sitemap')
  const paths = ['/', '/en', ...urls.map((url) => new URL(url).pathname).filter((path) => path.startsWith('/docs') || ['/tips', '/privacy-policy', '/terms-of-service', '/refunds', '/data-deletion', '/changelog', '/en/changelog', '/videos', '/en/videos'].includes(path))]
  paths.push(...urls.map((url) => new URL(url).pathname).filter((path) => /^\/(en\/)?changelog\/.+/.test(path)).slice(0, 4))
  const firstVideo = fs.readFileSync('public/video-urls.txt', 'utf8').split(/\r?\n/).find(Boolean)?.split('/').pop()
  if (firstVideo) paths.push(`/videos/${firstVideo}`)
  for (const path of [...new Set(paths)]) await checkPage(path)
  for (const [from, to] of [['/setup', '/docs/setup'], ['/setup-poke', '/docs/setup'], ['/engine', '/docs/engine'], ['/general', '/docs/engine']]) {
    const response = await request(`${from}?seo-check=1`, { redirect: 'manual' })
    assert.equal(response.status, 308, `${from}: permanent redirect`)
    const location = new URL(response.headers.get('location'), base)
    assert.equal(location.pathname, to)
    assert.equal(location.searchParams.get('seo-check'), '1', `${from}: preserve query`)
  }
  const missing = await request('/docs/this-module-does-not-exist')
  assert.equal(missing.status, 404, 'unknown docs route')
  const robots = await (await request('/robots.txt')).text()
  assert.match(robots, /https:\/\/www\.kizubot\.com\/sitemap\.xml/)
  assert.doesNotMatch(robots, /Disallow:\s*\/_next/)
  const image = await request('/_next/image?url=%2Fimages%2Flogo-principal-kizubot.png&w=128&q=75')
  assert.equal(image.status, 200, 'image optimization endpoint')
  assert.match(image.headers.get('content-type') ?? '', /^image\//)
  fs.mkdirSync('test-results', { recursive: true })
  fs.writeFileSync('test-results/seo-smoke.json', JSON.stringify({ checkedPages: reports.length, pages: reports }, null, 2))
  console.log(`SEO HTML checks passed: ${reports.length} pages, canonical URLs, schemas, redirects, robots and optimized images.`)
} catch (error) {
  console.error(logs)
  fs.mkdirSync('test-results', { recursive: true })
  fs.writeFileSync('test-results/seo-smoke.json', JSON.stringify({ checkedPages: reports.length, pages: reports, failure: String(error.message) }, null, 2))
  throw error
} finally {
  if (child && child.exitCode === null) { child.kill('SIGTERM'); await Promise.race([once(child, 'exit'), wait(3000)]); if (child.exitCode === null) child.kill('SIGKILL') }
}
