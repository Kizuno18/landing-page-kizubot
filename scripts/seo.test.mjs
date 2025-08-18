import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const source = (file) => fs.readFileSync(file, 'utf8')
function compile(file, aliases = {}) {
  let code = source(file)
  for (const [alias, target] of Object.entries(aliases)) code = code.replaceAll(`from "${alias}"`, `from "${target}"`)
  const result = ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }, reportDiagnostics: true })
  assert.equal((result.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error).length, 0, `${file}: syntax errors`)
  return `data:text/javascript;base64,${Buffer.from(result.outputText).toString('base64')}`
}
const seoUrl = compile('lib/seo.ts')
const seo = await import(seoUrl)
const docs = await import(compile('lib/docs.ts', { '@/lib/seo': seoUrl }))
const pricing = await import(compile('lib/pricing.ts'))
const videos = await import(compile('lib/videos.ts', { react: pathToFileURL(require.resolve('react')).href }))

test('canonical URLs and locale alternates use the production host', () => {
  const metadata = seo.pageMetadata('Guia de configuração', 'Descrição do guia', '/docs/setup', 'pt-BR')
  assert.equal(metadata.alternates.canonical, 'https://www.kizubot.com/docs/setup')
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical)
  assert.equal(metadata.openGraph.locale, 'pt_BR')
  const home = seo.pageMetadata('KizuBot', 'Automation', '/en', 'en', { pt: '/', en: '/en' })
  assert.equal(home.title.absolute, 'KizuBot')
  assert.equal(home.alternates.languages.en, 'https://www.kizubot.com/en')
  assert.equal(home.alternates.languages['x-default'], 'https://www.kizubot.com/')
  assert.equal(home.openGraph.locale, 'en_US')
})
test('root metadata has no inherited homepage canonical or fake verification', () => {
  assert.equal(seo.baseMetadata.alternates?.canonical, undefined)
  assert.doesNotMatch(JSON.stringify(seo.baseMetadata), /2025|your-google-verification-code|aggregateRating/)
  assert.equal(fs.existsSync('app/layout.tsx'), false)
  assert.match(source('app/en/layout.tsx'), /SiteShell locale="en"/)
  assert.match(source('components/site-shell.tsx'), /<html lang=\{locale\}/)
})
test('all 18 documentation modules have unique metadata and real sections', () => {
  assert.equal(docs.docModules.length, 18)
  assert.equal(new Set(docs.docModules.map((doc) => doc.id)).size, 18)
  assert.equal(new Set(docs.docModules.map((doc) => doc.title)).size, 18)
  for (const doc of docs.docModules) {
    assert.ok(fs.existsSync(`app/docs/sections/${doc.section}.tsx`), doc.id)
    assert.equal(docs.docMetadata(doc.id).alternates.canonical, `https://www.kizubot.com/docs/${doc.id}`)
    assert.doesNotMatch(docs.docMetadata(doc.id).title.absolute, /2025/)
  }
  assert.ok(docs.docModules.some((doc) => doc.id === 'hotkeys'))
  assert.ok(docs.relatedDocs('Cavebot waypoint routes and hotkeys').some((doc) => doc.id === 'cavebot'))
  assert.ok(docs.relatedDocs('Cavebot waypoint routes and hotkeys').some((doc) => doc.id === 'hotkeys'))
})
test('sitemap does not fabricate modification dates or include redirect aliases', () => {
  const sitemap = source('app/sitemap.ts')
  assert.doesNotMatch(sitemap, /new Date\(\)|Date\.now\(\)|currentDate/)
  assert.doesNotMatch(sitemap, /absoluteUrl\("\/(setup|setup-poke|general|engine|overview)"\)/)
  assert.match(sitemap, /video\.verifiedTitle/)
  assert.match(source('lib/content-dates.ts'), /--format=%cI/)
})
test('pricing uses validated API products and excludes unavailable promotions', () => {
  const valid = { productKey: 'premium-300h-br-south-1', datacenterId: 'br-south-1', planKind: 'premium', meterMode: 'online', grantedSeconds: 1080000, amountMinor: 12345, displayName: 'Test fixture plan' }
  assert.equal(pricing.parseProducts({ products: [valid, { ...valid, amountMinor: -1 }, { ...valid, planKind: 'invalid' }] }).length, 1)
  assert.equal(pricing.pricedCards([{ key: 'premium_300h', requiresCota: false }], [valid]).length, 1)
  assert.equal(pricing.pricedCards([{ key: 'premium_300h', requiresCota: true }], [valid]).length, 0)
  assert.equal(pricing.expiredPromotion({ ...valid, promotionActive: true, promotionEndsAt: '2026-01-01T00:00:00Z' }, Date.parse('2026-01-02T00:00:00Z')), true)
  assert.deepEqual(pricing.parseProducts(null), [])
  assert.match(source('components/pricing.tsx'), /initialProducts \?\? null/)
  assert.match(source('app/(home)/page.tsx'), /initialProducts=\{products\}/)
  assert.doesNotMatch(source('components/home-structured-data.tsx'), /aggregateRating|reviewCount|ratingCount/)
})
test('critical content and images do not require interaction', () => {
  assert.match(source('components/faq.tsx'), /<details/)
  assert.doesNotMatch(source('components/faq.tsx'), /useState|AccordionContent/)
  assert.match(source('components/hero.tsx'), /import Image from "next\/image"/)
  assert.match(source('next.config.ts'), /unoptimized: false/)
  assert.match(source('app/videos/[id]/page.tsx'), /<iframe/)
  assert.match(source('app/videos/[id]/page.tsx'), /video\.verifiedTitle && video\.uploadDate/)
})
test('video allowlist rejects arbitrary remote fetches', async (t) => {
  assert.ok(videos.getVideoIds().length > 0)
  assert.equal(new Set(videos.getVideoIds()).size, videos.getVideoIds().length)
  for (const id of videos.getVideoIds()) assert.match(id, /^[\w-]{11}$/)
  const mock = t.mock.method(globalThis, 'fetch', () => { throw new Error('unexpected fetch') })
  assert.equal(await videos.getVideo('../../private'), null)
  assert.equal(mock.mock.calls.length, 0)
})
test('real provider fields and caption timings are preserved', async (t) => {
  const id = videos.getVideoIds()[0]
  const player = { videoDetails: { title: 'Fixture video', shortDescription: 'Fixture description', lengthSeconds: '65' }, microformat: { playerMicroformatRenderer: { uploadDate: '2024-03-12' } }, captions: { playerCaptionsTracklistRenderer: { captionTracks: [{ baseUrl: `https://www.youtube.com/api/timedtext?v=${id}`, languageCode: 'pt', kind: 'asr' }] } } }
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(String(input))
    if (url.pathname === '/watch') return new Response(`var ytInitialPlayerResponse = ${JSON.stringify(player)};`)
    if (url.pathname === '/oembed') return Response.json({ title: 'Fixture video' })
    assert.equal(url.hostname, 'www.youtube.com')
    assert.equal(url.pathname, '/api/timedtext')
    return Response.json({ events: [{ tStartMs: 1500, segs: [{ utf8: 'Actual fixture caption' }] }] })
  })
  const video = await videos.getVideo(id)
  assert.equal(video.title, 'Fixture video')
  assert.equal(video.uploadDate, '2024-03-12')
  assert.equal(video.duration, 'PT65S')
  assert.equal(video.autoCaptions, true)
  assert.deepEqual(video.transcript, [{ seconds: 1.5, text: 'Actual fixture caption' }])
})
test('provider failure never invents a transcript or publication date', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('provider unavailable') })
  const video = await videos.getVideo(videos.getVideoIds()[1])
  assert.equal(video.verifiedTitle, false)
  assert.equal(video.uploadDate, undefined)
  assert.deepEqual(video.transcript, [])
})
