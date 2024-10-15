import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: "default" | "hero" | "cta"
  padding?: "default" | "large" | "small"
}

export function Section({ children, className, id, background = "default", padding = "default" }: SectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    hero: "bg-hero-pattern",
    cta: "bg-cta-pattern",
  }

  const paddingClasses = {
    default: "section-padding",
    large: "py-20 px-4 md:py-32 md:px-6 lg:py-40 lg:px-8",
    small: "py-8 px-4 md:py-12 md:px-6 lg:py-16 lg:px-8",
  }

  return (
    <section id={id} className={cn(backgroundClasses[background], paddingClasses[padding], className)}>
      <div className="container-responsive">{children}</div>
    </section>
  )
}
