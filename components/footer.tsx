import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { homePath, type SiteLocale } from "@/lib/seo"

export function Footer({ locale = "pt-BR" }: { locale?: SiteLocale }) {
  const en = locale === "en"
  const home = homePath(locale)
  const links = en ? [[home, "Home"], [`${home}#video-gallery`, "Demos"], [`${home}#results`, "Results"], [`${home}#pricing`, "Pricing"], [`${home}#faq`, "FAQ"], ["/docs", "Documentation (Portuguese)"], ["/en/changelog", "Changelog"], ["/en/videos", "Videos"], ["/feed.xml", "RSS feed"]] : [[home, "Início"], ["/#features", "Recursos"], ["/#how-it-works", "Como funciona"], ["/#modules", "Módulos"], ["/#results", "Resultados"], ["/#pricing", "Preços"], ["/#faq", "FAQ"], ["/docs", "Documentação"], ["/changelog", "Changelog"], ["/videos", "Vídeos"], ["/feed.xml", "RSS (em inglês)"]]
  return <footer className="bg-black/90 border-t border-primary/20 py-12 px-4">
    <div className="max-w-6xl mx-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div><Image src="/images/logo-principal-kizubot.png" alt="KizuBot" width={64} height={64} sizes="64px" className="h-16 w-16 mb-4" /><p className="text-muted-foreground max-w-xs">{en ? "KizuBot: AI-powered automation for your PokeXGames experience." : "KizuBot, a IA feita sob medida para automatizar sua experiência no PokeXGames."}</p></div>
      <nav aria-label={en ? "Footer navigation" : "Navegação do rodapé"}><h2 className="text-lg font-bold text-primary mb-4 font-mono">{en ? "Quick links" : "Links rápidos"}</h2><ul className="grid grid-cols-2 gap-2">{links.map(([href, label]) => <li key={href}><Link href={href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{label}</Link></li>)}</ul></nav>
    </div><div className="border-t border-primary/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col gap-2 items-center md:items-start"><p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} KizuBot. {en ? "All rights reserved." : "Todos os direitos reservados."}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">{[["/privacy-policy", en ? "Privacy policy (Portuguese)" : "Política de Privacidade"], ["/terms-of-service", en ? "Terms of service (Portuguese)" : "Termos de Serviço"], ["/refunds", en ? "Refunds (Portuguese)" : "Reembolsos"], ["/data-deletion", en ? "Data deletion (Portuguese)" : "Exclusão de Dados"]].map(([href, label]) => <li key={href}><Link href={href} hrefLang="pt-BR" className="text-muted-foreground hover:text-primary transition-colors text-sm">{label}</Link></li>)}</ul>
      </div><Button asChild size="sm" className="bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/90 font-bold"><a href="https://wa.me/554891594946?text=!comprar" target="_blank" rel="noopener noreferrer">WhatsApp</a></Button>
    </div></div>
  </footer>
}
