import { Check } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  approximatePrice?: string
  regularPrice?: string
  regularPriceLabel?: string
  promotionLabel?: string
  period: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  badge?: string
  badgeColor?: string
  icon?: ReactNode
  popular?: boolean
  index?: number
  className?: string
}

// Prices must be visible before hydration, not hidden behind an entrance animation.
export function PricingCard({ title, price, approximatePrice, regularPrice, regularPriceLabel, promotionLabel, period, description, features, ctaText, ctaHref, badge, badgeColor = "bg-primary", icon, popular = false, className }: PricingCardProps) {
  return <article className={cn("relative flex min-w-0 flex-col bg-card border rounded-lg p-6 md:p-8 shadow-lg transition-all duration-300", popular ? "border-primary shadow-primary/20" : "border-border hover:border-primary/50", className)}>
    {badge && <div className={cn("absolute top-0 right-0 text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg", badgeColor)}>{badge}</div>}
    <div className="text-center mb-8">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h3 className="text-2xl font-bold text-foreground font-display mb-4">{title}</h3>
      {regularPrice && <p className="mb-1 text-sm text-foreground/75">{regularPriceLabel}: <s className="whitespace-nowrap">{regularPrice}</s></p>}
      <div className="mb-4"><span className="block whitespace-nowrap text-2xl md:text-3xl font-bold text-foreground">{price}</span>{approximatePrice && <span className="mt-1 block whitespace-nowrap text-sm text-muted-foreground">{approximatePrice}</span>}<span className="block text-muted-foreground mt-1">{period}</span></div>
      {promotionLabel && <p className="mb-3 text-xs font-semibold text-primary">{promotionLabel}</p>}
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
    <ul className="space-y-3 mb-8">{features.map((feature, index) => <li key={index} className="flex items-start gap-3"><span className="text-primary mt-1 flex-shrink-0"><Check className="w-4 h-4" aria-hidden="true" /></span><span className="text-card-foreground text-sm leading-relaxed">{feature}</span></li>)}</ul>
    <div className="mt-auto text-center"><Button asChild size="lg" className={cn("w-full whitespace-normal h-auto min-h-11 py-3 leading-snug", popular ? "btn-primary animate-pulse-glow" : "btn-primary")}><a href={ctaHref} target="_blank" rel="noopener noreferrer">{ctaText}</a></Button></div>
  </article>
}
