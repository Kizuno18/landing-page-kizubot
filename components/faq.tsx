import { billingCopy, type BillingLocale } from "@/lib/billing-copy"
import { visibleFaqItems } from "@/lib/pricing"

// Native disclosure keeps answers in the initial HTML and works without JavaScript.
export function FaqSection({ locale }: { locale: BillingLocale }) {
  const copy = billingCopy[locale].faq
  return <section id="faq" className="section bg-primary-pattern" aria-labelledby="faq-heading">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-16"><p className="section-tag">{"? "} FAQ</p><h2 id="faq-heading" className="text-4xl font-bold text-foreground">{copy.title}</h2><p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{copy.subtitle}</p></div>
      {visibleFaqItems(copy.items).map((item) => <details key={item.question} className="border border-secondary/40 rounded-lg mb-3 overflow-hidden bg-black/70">
        <summary className="cursor-pointer px-4 py-3 text-base md:text-xl font-semibold text-foreground hover:text-primary focus-visible:outline focus-visible:outline-primary">{item.question}</summary>
        <div className="px-4 pb-4 text-base">{item.shown.split("\n").map((line, i) => <p key={i} className={`${line.startsWith("-") ? "pl-4" : ""} mb-2 text-gray-300 text-sm md:text-base`}>{line}</p>)}</div>
      </details>)}
    </div>
  </section>
}
export function Faq() { return <FaqSection locale="pt-BR" /> }
