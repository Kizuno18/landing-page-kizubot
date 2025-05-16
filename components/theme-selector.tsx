"use client"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { THEMES, THEME_KEYS } from "@/lib/themes"
import { cn } from "@/lib/utils"
export function ThemeSelector({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const en = pathname === "/en" || pathname.startsWith("/en/")
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className={cn("flex h-8 w-[200px] rounded-full bg-muted/30 animate-pulse", className)} />
  return <div role="group" aria-label={en ? "Select theme" : "Selecionar tema"} className={cn("flex rounded-full border border-border bg-card/60 p-0.5 backdrop-blur-sm", className)}>{THEME_KEYS.map((key) => {
    const active = theme === key
    const meta = THEMES[key]
    return <button key={key} aria-pressed={active} aria-label={`${en ? "Theme" : "Tema"} ${meta.label}`} onClick={() => setTheme(key)} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 cursor-pointer", active ? "bg-primary/15 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}><span className="flex gap-0.5" aria-hidden="true">{meta.colors.map((color, i) => <span key={i} className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />)}</span><span className="hidden sm:inline">{meta.label}</span></button>
  })}</div>
}
