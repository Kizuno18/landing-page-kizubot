"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  index?: number
  variant?: "default" | "premium" | "highlight"
  className?: string
}

export function FeatureCard({ icon, title, description, index = 0, variant = "default", className }: FeatureCardProps) {
  const variants = {
    default: "bg-card border-border hover:border-primary/40 hover:shadow-glow-primary-sm",
    premium: "bg-card border-primary/25 hover:border-primary hover:shadow-glow-primary",
    highlight: "bg-card border-secondary/25 hover:border-secondary hover:shadow-glow-secondary",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "border rounded-lg p-6 transition-all duration-300 group",
        variants[variant],
        className,
      )}
    >
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-3 font-display">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
