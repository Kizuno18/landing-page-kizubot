"use client"

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import type { BillingLocale } from "@/lib/billing-copy"
import { advanceBalloons, createBalloonSlots, popBalloon, type BalloonSlot } from "@/lib/balloon-state"
import styles from "./interactive-balloons.module.css"

const colors = ["#f57878", "#50d2c5", "#f1c765", "#f57878"]
const colorNames = {
  "pt-BR": ["coral", "verde", "dourado", "coral"],
  en: ["coral", "teal", "gold", "coral"],
}

function BurstFragment({ index, paused }: { index: number; paused: boolean }) {
  const elapsed = useRef(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)
  const rotate = useMotionValue(index * 45)
  useAnimationFrame((_, delta) => {
    if (paused) return
    elapsed.current += Math.min(delta, 50)
    const progress = Math.min(1, elapsed.current / 400)
    const distance = (1 - (1 - progress) ** 2) * 34
    x.set(Math.cos(index * Math.PI / 4) * distance)
    y.set(Math.sin(index * Math.PI / 4) * distance)
    opacity.set(1 - progress)
    rotate.set(index * 45 + progress * 100)
  })
  return <motion.i className={styles.fragment} style={{ x, y, opacity, rotate }} />
}

function Balloon({ slot, paused, reducedMotion, label, onPop }: {
  slot: BalloonSlot
  paused: boolean
  reducedMotion: boolean
  label: string
  onPop: (id: number, keyboard: boolean) => void
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)
  const elapsed = useRef(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  useAnimationFrame((_, delta) => {
    if (paused || hovered || focused || reducedMotion || slot.phase !== "active") return
    elapsed.current += Math.min(delta, 50)
    const phase = elapsed.current / 1000 + slot.id * 1.7
    x.set(Math.sin(phase * 0.72) * 4)
    y.set(Math.sin(phase * 0.5) * (slot.id > 1 ? 20 : 15))
    rotate.set(Math.sin(phase * 0.65) * 5)
  })

  useEffect(() => {
    if (reducedMotion) {
      x.set(0)
      y.set(0)
      rotate.set(0)
    }
  }, [reducedMotion, x, y, rotate])

  return (
    <motion.div
      className={`${styles.slot} ${styles[`slot${slot.id}`]}`}
      style={{ x, y, rotate, ...({ "--balloon-color": colors[(slot.id + slot.generation) % colors.length] } as CSSProperties) }}
      data-balloon-slot={slot.id}
    >
      {slot.phase === "active" && (
        <button
          type="button"
          className={styles.balloon}
          aria-label={label}
          title={label}
          data-balloon-id={slot.id}
          onClick={event => onPop(slot.id, event.detail === 0)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <svg className={styles.art} viewBox="0 0 80 154" aria-hidden="true" focusable="false">
            <path d="M40 94 C25 111 55 122 40 151" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" />
            <path d="M40 3 C15 3 5 23 7 44 C9 66 23 83 40 92 C57 83 71 66 73 44 C75 23 65 3 40 3Z" fill="var(--balloon-color)" />
            <path d="M17 30 C19 18 28 12 33 12" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="6" strokeLinecap="round" />
            <path d="M53 11 C70 29 66 61 44 86 C61 76 72 60 73 44 C75 27 69 17 53 11Z" fill="rgba(0,0,0,.1)" />
            <path d="M40 89 L34 98 Q40 96 46 98Z" fill="var(--balloon-color)" />
          </svg>
        </button>
      )}
      {slot.phase === "burst" && !reducedMotion && (
        <div className={styles.burst} aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <BurstFragment key={index} index={index} paused={paused} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function InteractiveBalloons({ locale }: { locale: BillingLocale }) {
  const reducedMotion = useReducedMotion() === true
  const [slots, setSlots] = useState(() => createBalloonSlots(2))
  const [hidden, setHidden] = useState(false)
  const overlay = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px) and (min-height: 821px)")
    const resize = () => {
      const count = query.matches ? 4 : 2
      const focused = document.activeElement as HTMLElement | null
      const focusedId = focused?.dataset.balloonId
      if (focusedId && Number(focusedId) >= count) {
        const remainingButton = overlay.current?.querySelector<HTMLButtonElement>("button[data-balloon-id='0'], button[data-balloon-id='1']")
        const heroButton = overlay.current?.closest("section")?.querySelector<HTMLElement>("[data-hero-primary-cta], button:not([data-balloon-id])")
        ;(remainingButton ?? heroButton)?.focus({ preventScroll: true })
      }
      setSlots(current => createBalloonSlots(count).map(slot => current.find(existing => existing.id === slot.id) ?? slot))
    }
    const visibility = () => setHidden(document.hidden)
    resize()
    visibility()
    query.addEventListener("change", resize)
    document.addEventListener("visibilitychange", visibility)
    return () => {
      query.removeEventListener("change", resize)
      document.removeEventListener("visibilitychange", visibility)
    }
  }, [])

  useEffect(() => {
    if (hidden || slots.every(slot => slot.phase === "active")) return
    const timer = window.setTimeout(() => setSlots(current => advanceBalloons(current, 100)), 100)
    return () => window.clearTimeout(timer)
  }, [hidden, slots])

  const pop = (id: number, keyboard: boolean) => {
    const currentButton = overlay.current?.querySelector<HTMLButtonElement>(`[data-balloon-id="${id}"]`)
    if (keyboard && document.activeElement === currentButton) {
      const buttons = Array.from(overlay.current?.querySelectorAll<HTMLButtonElement>("button[data-balloon-id]") ?? [])
      const index = buttons.findIndex(button => button === currentButton)
      const next = buttons[index + 1] ?? buttons.find(button => button !== currentButton)
      const heroButton = overlay.current?.closest("section")?.querySelector<HTMLElement>("[data-hero-primary-cta], button:not([data-balloon-id])")
      ;(next ?? heroButton)?.focus({ preventScroll: true })
    }
    setSlots(current => popBalloon(current, id, reducedMotion))
  }

  return (
    <div ref={overlay} className={styles.overlay} role="group" aria-label={locale === "pt-BR" ? "Balões de aniversário" : "Birthday balloons"} data-interactive-balloons="true">
      {slots.map(slot => {
        const color = colorNames[locale][(slot.id + slot.generation) % colors.length]
        const label = locale === "pt-BR" ? `Estourar balão ${color}` : `Pop ${color} balloon`
        return <Balloon key={`${slot.id}-${slot.generation}`} slot={slot} paused={hidden} reducedMotion={reducedMotion} label={label} onPop={pop} />
      })}
    </div>
  )
}
