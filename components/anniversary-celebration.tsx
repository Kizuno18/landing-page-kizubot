"use client"

import { PartyPopper } from "lucide-react"
import { useCampaignTime } from "@/hooks/use-campaign-time"
import { anniversaryPhase } from "@/lib/anniversary"
import type { BillingLocale } from "@/lib/billing-copy"
import { InteractiveBalloons } from "@/components/interactive-balloons"
import styles from "@/components/hero.module.css"

export function AnniversaryCelebration({ locale }: { locale: BillingLocale }) {
  const now = useCampaignTime()
  // Checked before the placeholder so server HTML and hydration agree once the campaign is over;
  // the reserved strip used to collapse after mount and shift the hero up.
  if (anniversaryPhase(now ?? Date.now()) === "ended") return null
  if (now === null) return <div aria-hidden="true" className={`${styles.campaign} w-full shrink-0`} />
  const upcoming = anniversaryPhase(now) === "upcoming"
  const title = locale === "pt-BR"
    ? upcoming ? "11/10: KizuBot faz 2 anos!" : "KizuBot: 2 anos, rumo ao terceiro!"
    : upcoming ? "Oct 11: KizuBot turns 2!" : "KizuBot: 2 years, starting year 3!"
  return (
    <>
      <div aria-hidden="true" className="anniversary-balloons pointer-events-none absolute inset-x-0 top-16 z-[1] h-72 overflow-hidden md:h-[440px]">
        <img src="/anniversary-balloons.png" alt="" width="1024" height="1536" className="anniversary-balloon-left absolute -left-10 top-0 h-64 w-auto object-contain opacity-75 md:-left-12 md:h-[440px] md:opacity-90" />
        <img src="/anniversary-balloons.png" alt="" width="1024" height="1536" className="anniversary-balloon-right absolute -right-10 top-2 h-64 w-auto object-contain opacity-75 md:-right-12 md:h-[440px] md:opacity-90" />
      </div>
      <InteractiveBalloons locale={locale} />
      <div className={`${styles.campaign} relative z-10 flex shrink-0 w-full flex-col justify-center gap-1 border-y border-primary/30 bg-black/65 px-3 text-center`}>
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
          <PartyPopper className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><span>{title}</span>
        </p>
        <p className="text-sm font-semibold text-primary">{locale === "pt-BR" ? "Promoção Premium até 05/11" : "Premium offer through Nov 5"}</p>
      </div>
    </>
  )
}
