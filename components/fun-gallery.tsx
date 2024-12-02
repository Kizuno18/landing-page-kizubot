"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import { useEffect, useState } from "react"

interface MediaItem {
  type: "video" | "image"
  url: string
  title: string
}

export function FunGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const mediaItems: MediaItem[] = [
    // Feedback videos from YouTube
    { type: "video", url: "https://youtu.be/02zzxXcb0no", title: "Premium Feedback" },
    { type: "video", url: "https://youtu.be/ccQfkhcd1iA", title: "Sem Rodeio" },
    { type: "video", url: "https://youtu.be/RgcDTwX5YDI", title: "Returning Feedback" },
    { type: "video", url: "https://youtu.be/eKsERYp5CqM", title: "Merk" },
    { type: "video", url: "https://youtu.be/n719f8fYLzE", title: "Matando Boss" },
    { type: "video", url: "https://youtu.be/rpXhhoEm-nY", title: "Duduzin" },
    // Feedbacks
    { type: "image", url: "/media/feedbacks/feedback-leo-jr.jpeg", title: "Lucro de 9kk em 2 dias" },
    { type: "image", url: "/media/feedbacks/feedback-robson.jpeg", title: "Shiny Tangela" },
    { type: "image", url: "/media/feedbacks/feedback-thiago.jpeg", title: "Bot Completo e Sem Bug" },
    { type: "image", url: "/media/feedbacks/feedback-alessandro.jpeg", title: "Trampo da Hora" },
    { type: "image", url: "/media/feedbacks/feedback-berry.jpg", title: "Feedback Berry" },
    { type: "image", url: "/media/feedbacks/feedback-bot-insano.png", title: "Bot Insano" },
    { type: "image", url: "/media/feedbacks/feedback-bot-perfeicao.png", title: "Bot Perfeição" },
    { type: "image", url: "/media/feedbacks/hunt-de-olho-fechado.png", title: "Hunt de Olho Fechado" },
    { type: "image", url: "/media/feedbacks/feedback-cliente-infinito.png", title: "Cliente Infinito" },
    { type: "image", url: "/media/feedbacks/feedback-deitado-bot-drop-boss.png", title: "Deitado Bot Drop Boss" },
    { type: "image", url: "/media/feedbacks/feedback-dvd.jpg", title: "Feedback DVD" },
    { type: "image", url: "/media/feedbacks/feedback-edson.jpg", title: "Feedback Edson" },
    { type: "image", url: "/media/feedbacks/feedback-flavio.png", title: "Feedback Flavio" },
    { type: "image", url: "/media/feedbacks/feedback-leo-carioca.png", title: "Leo Carioca" },
    { type: "image", url: "/media/feedbacks/feedback-lucros.png", title: "Feedback Lucros" },
    { type: "image", url: "/media/feedbacks/feedback-luis-chato.png", title: "Luis Chato" },
    { type: "image", url: "/media/feedbacks/feedback-luis.png", title: "Feedback Luis" },
    { type: "image", url: "/media/feedbacks/feedback-mais-fluido.png", title: "Mais Fluido" },
    { type: "image", url: "/media/feedbacks/feedback-mts.jpg", title: "Feedback MTS" },
    { type: "image", url: "/media/feedbacks/feedback-natan.jpg", title: "Feedback Natan" },
    { type: "image", url: "/media/feedbacks/feedback-novo-sistema-alarmes.png", title: "Novo Sistema Alarmes" },
    { type: "image", url: "/media/feedbacks/feedback-soa.jpg", title: "Feedback SOA" },
    { type: "image", url: "/media/feedbacks/feedback-usuario-antigo-gabrieel.png", title: "Usuário Antigo Gabrieel" },
    { type: "image", url: "/media/feedbacks/feedback-usuario-antigo-deivid.jpg", title: "Usuário Antigo Deivid" },
    { type: "image", url: "/media/feedbacks/feedback-vip2.jpg", title: "Feedback Premium" },
    { type: "image", url: "/media/feedbacks/caugh-shiny-fera.jpeg", title: "Shiny Feraligatr Capturado" },
    { type: "image", url: "/media/feedbacks/feedback-lucro.jpeg", title: "Feedback Lucro" },
    { type: "image", url: "/media/feedbacks/kizubot-tem-suporte-de-qualidade.png", title: "Suporte de Qualidade" },
    { type: "image", url: "/media/feedbacks/o-usuario-ficou-fascinado-pela-funcao-de-responder-pm-pelo-telegram.png", title: "Fascinado pela Função de PM pelo Telegram" },
    { type: "image", url: "/media/feedbacks/usuario-achou-o-bot-completo-e-esta-aprendendo.png", title: "Bot Completo e Aprendendo" },
    { type: "video", url: "/media/feedbacks/perguntou-a-quantos-anos-o-big-e-programador-achou-demais-o-bot.mp4", title: "Achou Demais o Bot" },
    { type: "image", url: "/media/feedbacks/feedback-jhon.jpeg", title: "Feedback Jonathan Mendonça" },
    { type: "image", url: "/media/feedbacks/esse-bot-tem-tudo-feedback.png", title: "Esse Bot É Um Roubo, Faz Tudo" },
    { type: "image", url: "/media/feedbacks/feedback-caio-vinicius-mato-91kk.jpeg", title: "Caio Vinicius — 91kk em 1 mês de Mato" },
    { type: "image", url: "/media/feedbacks/feedback-captura-shiny-marowak.jpg", title: "Captura Shiny Marowak" },
    { type: "image", url: "/media/feedbacks/feedback-matheus-f.png", title: "Matheus — Sem Comparação, Qualidade Absurda pra PXG" },
    { type: "image", url: "/media/feedbacks/feedback-leonardo-menezes-1700dd.jpeg", title: "Leonardo — 1700 Diamonds em 1 Char + Renovou Licença" },
    { type: "image", url: "/media/feedbacks/feedback-leonardo-bot-mais-completo.jpeg", title: "O Mais Completo e Com Suporte" },
    { type: "image", url: "/media/feedbacks/feedback-leonardo-peguei-shiny.jpeg", title: "Peguei um Shiny na Época" },
    // Images
    { type: "image", url: "/media/images/dev-da-pxg-interessado-no-bot.jpg", title: "Dev da PXG Interessado" },
    { type: "image", url: "/media/images/feedback de lucro de 900kk.jpg", title: "Lucro de 900kk" },
    { type: "image", url: "/media/images/feedback-leo-rodrigues.jpg", title: "Leo Rodrigues" },
    { type: "image", url: "/media/images/feedback_lucro_do_gil_em_1dia.jpg", title: "Lucro do Gil em 1 dia" },
    { type: "image", url: "/media/images/loxas-lavando-a-louça.jpg", title: "Loxas Lavando Louça" },
    { type: "image", url: "/media/images/mod-airy-concorda-que-kizubot-efenomenal.jpg", title: "Mod Airy Concorda" },
    { type: "image", url: "/media/images/usuario_impressionado_com_a_siplicidade_do_bot.jpg", title: "Impressionado com Simplicidade" },
    // Results
    { type: "image", url: "/media/results/captura-shiny-rapidash.png", title: "Shiny Rapidash" },
    { type: "image", url: "/media/results/caught-sh-cubone.png", title: "Shiny Cubone" },
    { type: "image", url: "/media/results/caught-shiny-raichu.png", title: "Shiny Raichu" },
    { type: "image", url: "/media/results/caught-shiny-venusaur.jpg", title: "Shiny Venusaur" },
    { type: "image", url: "/media/results/filipe-ficou-rico-faliu-emerald.png", title: "Filipe Ficou Rico" },
    { type: "image", url: "/media/results/lucro-boss-loot.png", title: "Lucro Boss Loot" },
    { type: "image", url: "/media/results/metalcoat.jpg", title: "Metal Coat" },
    { type: "image", url: "/media/results/result-beach-farming.jpg", title: "Beach Farming" },
    { type: "image", url: "/media/results/result-community-success.jpg", title: "Community Success" },
    { type: "image", url: "/media/results/result-mega-evolution-drop.png", title: "Drop de Mega Evolução (Barbaracite)" },
    { type: "image", url: "/media/results/result-dl-earnings.jpg", title: "DL Earnings" },
    { type: "image", url: "/media/results/result-earth-balls-inventory.jpg", title: "Earth Balls Inventory" },
    { type: "image", url: "/media/results/result-farming-stats.jpg", title: "Farming Stats" },
    { type: "image", url: "/media/results/result-multi-resource-collection.jpg", title: "Multi Resource Collection" },
    { type: "image", url: "/media/results/result-rare-items-inventory.jpg", title: "Rare Items Inventory" },
    { type: "image", url: "/media/results/result-shiny-collection.jpg", title: "Shiny Collection" },
    { type: "image", url: "/media/results/result-uninterrupted-farming.jpg", title: "Uninterrupted Farming" },
    { type: "image", url: "/media/results/sh-dratini-new-server.jpg", title: "Shiny Dratini" },
    { type: "image", url: "/media/results/sh-muk.jpg", title: "Shiny Muk" },
    { type: "image", url: "/media/results/shiny-venu.jpg", title: "Shiny Venusaur" },
    // Testimonials
    { type: "image", url: "/media/testimonials/testimonial-rodrigo.png", title: "Testimonial Rodrigo" },
    { type: "image", url: "/media/testimonials/sé-loco-o-bot-joga-demais-feedback.png", title: "Sé Loco, o Bot Joga Demais" },
    { type: "image", url: "/media/testimonials/20kk-num-unico-dia.png", title: "20kk num Único Dia" },
    { type: "image", url: "/media/testimonials/dashboard-estatisticas-lucro-200reais-plus.jpg", title: "Dashboard: Lucro de R$200+" },
    { type: "image", url: "/media/testimonials/nathan-dias-bot-top-waypoints.jpeg", title: "Nathan — Tá Top o Bot" },
    { type: "image", url: "/media/testimonials/nathan-dias-parece-player-avisos-top.jpeg", title: "Nathan — Parece Player de Verdade" },
    { type: "image", url: "/media/testimonials/cliente-pl-bot-muito-bom-sem-ban.jpeg", title: "Cliente da Polônia — O Bot é Muito Bom" },
    { type: "image", url: "/media/testimonials/cliente-mx-alan-herrera-painel-vnc.jpeg", title: "Alan Herrera (México) — Painel VNC Muito Intuitivo" },
    { type: "image", url: "/media/testimonials/lorde-tyrael-bot-faz-isso.jpeg", title: "Lorde Tyrael — Bot Faz Isso" },
    { type: "image", url: "/media/testimonials/xandy-novo-bot-mt-bom.jpeg", title: "Xandy — Novo Bot Muito Bom" },
    { type: "image", url: "/media/testimonials/pilotti-com-o-bot-novo.jpeg", title: "pilotti — Com o Bot Novo" },
    { type: "image", url: "/media/testimonials/xandy-bot-nao-faria-isso-safe.jpeg", title: "Xandy — Tá Safe, Bot Não Faria Isso" },
  ]

  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Auto-cycle — 2s gives users time to read titles
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isPaused, mediaItems.length])

  const currentItem = mediaItems[currentIndex]

  // Swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
      } else {
        setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
      }
    }
    setTouchStart(null)
  }

  const getVideoId = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/,
      /(?:youtube\.com\/v\/)([\w-]{11})/
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }

    return null
  }

  const getThumbnailUrl = (videoId: string) => {
    // Use hqdefault for better compatibility (maxresdefault not always available)
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  return (
    <section className="section bg-gradient-to-b from-background to-secondary/10 py-16">
      <div className="container-responsive">
        <div className="text-center mb-8">
          <p className="section-tag">{"~ "} FUN_GALLERY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Galeria de Zoeira
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Feedbacks e momentos épicos da comunidade KizuBot
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main display area */}
          <div
            className="relative bg-card border-2 border-secondary/30 rounded-xl overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="aspect-video relative"
              >
                {currentItem.type === "video" ? (
                  currentItem.url.startsWith("/media/") ? (
                    <video
                      src={currentItem.url}
                      className="w-full h-full object-contain bg-black"
                      controls
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="w-full h-full bg-black">
                      <img
                        src={getThumbnailUrl(getVideoId(currentItem.url) || "") || "/placeholder.svg"}
                        alt={currentItem.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-secondary/90 backdrop-blur-sm p-4 rounded-full">
                          <Play className="w-8 h-8 text-secondary-foreground" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    src={currentItem.url}
                    alt={currentItem.title}
                    className="w-full h-full object-contain bg-black"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <p className="text-white text-lg font-semibold text-center">{currentItem.title}</p>
            </div>

            {/* Counter overlay */}
            <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1 rounded-full font-bold">
              {currentIndex + 1} / {mediaItems.length}
            </div>

            {/* Type badge */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentItem.type === "video" ? "📹 Vídeo" : "🖼️ Imagem"}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              onClick={() => setIsPaused(!isPaused)}
              size="lg"
              className="btn-secondary"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Continuar
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              {isPaused ? "Pausado" : "Trocando a cada 2s"}
            </div>
          </div>

          {/* Progress indicator - simple on mobile, dots on desktop */}
          <div className="mt-6 md:hidden text-center">
            <div className="inline-flex items-center gap-3 text-sm text-muted-foreground">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
                className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-full border border-border hover:border-primary/50 transition-colors flex items-center justify-center"
              >
                ←
              </button>
              <span className="font-medium font-mono text-xs">{currentIndex + 1} / {mediaItems.length}</span>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % mediaItems.length)}
                className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-full border border-border hover:border-primary/50 transition-colors flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
          <div className="mt-6 hidden md:flex flex-wrap items-center justify-center gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para ${item.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
