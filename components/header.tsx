"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ThemeSelector } from "@/components/theme-selector"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuToggle = useRef<HTMLButtonElement>(null)
  const menuPanel = useRef<HTMLDivElement>(null)
  const desktopNav = useRef<HTMLElement>(null)
  const english = usePathname().startsWith("/en")
  const home = english ? "/en" : "/"
  const buyLabel = english ? "Buy Now!" : "Comprar Agora!"
  const navLinks = english ? [
    { href: `${home}#video-gallery`, label: "Demo" },
    { href: `${home}#results`, label: "Results" },
    { href: `${home}#pricing`, label: "Pricing" },
    { href: `${home}#faq`, label: "FAQ" },
    { href: "/docs", label: "Docs" },
    { href: "/en/changelog", label: "Changelog" },
  ] : [
    { href: `${home}#features`, label: "Recursos" },
    { href: `${home}#how-it-works`, label: "Como Funciona" },
    { href: `${home}#modules`, label: "Módulos" },
    { href: `${home}#results`, label: "Resultados" },
    { href: `${home}#testimonials`, label: "Depoimentos" },
    { href: `${home}#pricing`, label: "Preços" },
    { href: `${home}#faq`, label: "FAQ" },
    { href: "/docs", label: "Docs" },
    { href: "/changelog", label: "Changelog" },
  ]

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
    return () => document.body.classList.remove("menu-open")
  }, [isMenuOpen])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1440px)")
    const closeDesktopMenu = () => {
      if (!desktop.matches) return
      if (menuPanel.current?.contains(document.activeElement) || document.activeElement === menuToggle.current) {
        desktopNav.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true })
      }
      setIsMenuOpen(false)
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (menuPanel.current?.contains(document.activeElement)) menuToggle.current?.focus({ preventScroll: true })
      setIsMenuOpen(false)
    }
    desktop.addEventListener("change", closeDesktopMenu)
    document.addEventListener("keydown", closeWithEscape)
    return () => {
      desktop.removeEventListener("change", closeDesktopMenu)
      document.removeEventListener("keydown", closeWithEscape)
    }
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-black/85 backdrop-blur-sm z-50 py-3 px-4 md:py-4 md:px-6 border-b border-primary/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={home} className="flex items-center shrink-0">
          <Image
            src="/images/logo-principal-kizubot.png"
            alt="KizuBot Logo"
            width={40}
            height={40}
            sizes="40px"
            loading="eager"
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2 min-[1440px]:hidden">
          <Link href="https://painel.kizubot.com/checkout" className="btn-primary !text-sm !px-3 !py-2 min-h-11" target="_blank" rel="noopener noreferrer">{buyLabel}</Link>
          <button
            ref={menuToggle}
            className="text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={english ? isMenuOpen ? "Close menu" : "Open menu" : isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav ref={desktopNav} className="hidden min-[1440px]:flex items-center gap-4 whitespace-nowrap text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <ThemeSelector />
          <Link
            href="https://painel.kizubot.com/checkout"
            className="btn-primary !text-base !py-2 !px-4 min-h-11"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buyLabel}
          </Link>
        </nav>

        {/* Mobile Navigation — animated slide-down */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuPanel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              id="header-menu"
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md min-[1440px]:hidden overflow-y-auto max-h-[calc(100dvh-80px)] border-b border-primary/10"
            >
              <nav className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-primary hover:bg-white/5 transition-colors py-3.5 px-6 text-center border-b border-white/5 last:border-0"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex justify-center py-3 border-b border-white/5">
                  <ThemeSelector />
                </div>
                <div className="px-6 py-4">
                  <Link
                    href="https://painel.kizubot.com/checkout"
                    className="btn-primary text-base py-3 px-6 w-full text-center block"
                    onClick={closeMenu}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {buyLabel}
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
