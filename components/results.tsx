"use client"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { SiteLocale } from "@/lib/seo"

const examples = [
  ["result-sablenite-drop.jpg", "Drop raro: Sablenite", "Rare drop: Sablenite", "Registro de um item raro coletado durante uma caçada.", "A rare item collected during a hunt."],
  ["result-dl-earnings.jpg", "Estatísticas da caçada", "Hunt statistics", "Relatório compartilhado com os resultados de uma sessão.", "A shared report showing the results of a session."],
  ["result-earth-balls-inventory.jpg", "Inventário e projetos de captura", "Inventory and catching projects", "Earth Balls e recursos acumulados em projetos de captura.", "Earth Balls and resources accumulated during catching projects."],
  ["result-farming-stats.jpg", "Estatísticas de farming", "Farming statistics", "Relatório de loots, movimentos e jogadores detectados.", "A report of loots, movements and players detected."],
  ["result-shiny-machamp-capture.png", "Capturas de Machamp shiny", "Shiny Machamp catches", "Capturas compartilhadas em personagens diferentes.", "Catches shared from different characters."],
  ["result-community-success.jpg", "Resultados da comunidade", "Community results", "Jogadores compartilham suas experiências e resultados no grupo.", "Players share their experiences and results in the community."],
  ["result-mega-evolution-drop.png", "Drop de Barbaracite", "Barbaracite drop", "Registro do item de Mega Evolução coletado durante uma caçada.", "A Mega Evolution item collected during a hunt."],
  ["acionar-o-kizubot.png", "Ajuda da comunidade", "Community support", "Conversas sobre suporte e configurações do KizuBot.", "Conversations about KizuBot support and configuration."],
  ["loxas-recebe-homenagem-do-kizubot.png", "Reconhecimento da comunidade", "Community recognition", "Uma homenagem compartilhada pelos jogadores.", "A tribute shared by players."],
  ["xandy-manja-do-kizubot.png", "Experiências compartilhadas", "Shared experiences", "Comentários dos usuários sobre o uso do KizuBot.", "User comments about their KizuBot experience."],
  ["xandy-pensando-em-usar-kizubot-para-projeto.png", "Novos projetos", "New projects", "Perguntas da comunidade sobre projetos com o KizuBot.", "Community questions about projects using KizuBot."],
  ["result-beach-farming.jpg", "Acompanhamento remoto", "Remote monitoring", "Um usuário acompanha sua coleta de Earth Stones à distância.", "A user monitors Earth Stone collection remotely."],
  ["result-shiny-collection.jpg", "Coleção de shinies e alertas", "Shiny collection and alerts", "Registro compartilhado de capturas e alertas.", "A shared record of catches and alerts."],
  ["result-rare-items-inventory.jpg", "Itens raros no inventário", "Rare items in the inventory", "Inventário com itens de boss e moedas acumuladas.", "An inventory with boss items and accumulated coins."],
  ["result-uninterrupted-farming.jpg", "Sessão de farming", "Farming session", "Relato compartilhado sobre uma sessão de coleta de recursos.", "A shared account of a resource-gathering session."],
  ["result-multi-resource-collection.jpg", "Coleta de múltiplos recursos", "Multiple resource collection", "Registro com Stylist Points, toy boxes, Earth Stones e armadillo claws.", "A record of Stylist Points, toy boxes, Earth Stones and armadillo claws."],
] as const

export function Results({ locale = "pt-BR" }: { locale?: SiteLocale }) {
  const en = locale === "en"
  const [slide, setSlide] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (selected !== null) dialog.current?.showModal(); else dialog.current?.close() }, [selected])
  const card = (index: number) => {
    const result = examples[index]
    const title = result[en ? 2 : 1]
    return <article key={result[0]} className="bg-black/70 border-2 border-primary/40 rounded-xl overflow-hidden hover:border-accent transition-colors">
      <div className="p-5"><h3 className="text-xl font-bold text-primary mb-3">{title}</h3><p className="text-gray-300 text-sm mb-4">{result[en ? 4 : 3]}</p></div>
      <button className="block w-full aspect-[4/3] relative" onClick={() => setSelected(index)} aria-label={`${en ? "Enlarge" : "Ampliar"}: ${title}`}>
        <Image src={`/media/results/${result[0]}`} alt={title} fill sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 380px" className="object-contain" />
        <Maximize2 className="absolute top-2 right-2 text-white" size={20} />
      </button>
    </article>
  }
  return <section id="results" className="section bg-secondary-pattern" aria-labelledby="results-heading">
    <div className="max-w-7xl mx-auto"><div className="text-center mb-8 md:mb-16"><p className="section-tag">{":: "} RESULTS</p><h2 id="results-heading" className="text-4xl font-bold text-foreground">{en ? "Community results" : "Resultados da comunidade"}</h2><p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{en ? "Screenshots and experiences shared by KizuBot users. Original screenshots are in Portuguese; individual results vary." : "Capturas de tela e experiências compartilhadas por usuários do KizuBot. Os resultados individuais variam."}</p></div>
      <div className="md:hidden">{card(slide)}<div className="flex justify-center items-center gap-4 mt-4"><button className="p-3" onClick={() => setSlide((slide + examples.length - 1) % examples.length)} aria-label={en ? "Previous result" : "Resultado anterior"}><ChevronLeft /></button><span aria-live="polite">{slide + 1} / {examples.length}</span><button className="p-3" onClick={() => setSlide((slide + 1) % examples.length)} aria-label={en ? "Next result" : "Próximo resultado"}><ChevronRight /></button></div></div>
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">{examples.map((_, index) => card(index))}</div>
      <p className="text-center text-muted-foreground mt-10">{en ? "Past results do not guarantee future drops, catches or earnings." : "Resultados anteriores não garantem drops, capturas ou ganhos futuros."}</p>
    </div>
    <dialog ref={dialog} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} className="bg-black text-white p-4 rounded-xl w-[95vw] max-w-5xl backdrop:bg-black/90" aria-label={en ? "Enlarged result" : "Resultado ampliado"}>
      <button className="ml-auto block p-3" onClick={() => setSelected(null)} aria-label={en ? "Close image" : "Fechar imagem"}><X /></button>
      {selected !== null && <div className="relative h-[75vh]"><Image src={`/media/results/${examples[selected][0]}`} alt={examples[selected][en ? 2 : 1]} fill sizes="95vw" className="object-contain" /></div>}
    </dialog>
  </section>
}
