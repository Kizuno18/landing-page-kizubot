"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swords, Fish, Pickaxe, Bell, Bot, Users, Heart, Crosshair, Cpu, Check, ArrowRight } from "lucide-react"

export function Modules() {
  const modules = [
    {
      id: "combat",
      name: "Combate",
      icon: <Swords className="w-5 h-5" />,
      docUrl: "/docs/combat",
      description: "Automatize combates com estratégias avançadas",
      features: [
        "Ativa o módulo de combate",
        "Coleta de loot item por item ou todos de uma vez",
        "Ignora loot quando há players na tela",
        "Ignora captura quando há players na tela",
        "Usa comando pokeStop no pokémon",
        "Configura tempo para começar o combo",
        "Ordena o pokémon a ficar no melhor local possível",
        "Esconde pokémons bloqueados (roxos)",
        "Ataca todos os pokémons na tela",
        "Desenha pokémons derrotados (para estilistas)",
      ],
      imageUrl: "/images/aba_combat_pt1.jpg",
      secondaryImageUrl: "/images/aba_combat_pt2.jpg",
    },
    {
      id: "cavebot",
      name: "Cavebot",
      icon: <Bot className="w-5 h-5" />,
      docUrl: "/docs/cavebot",
      description: "Navegação automática pelo mapa",
      features: [
        "Ativa o mode cavebot para hunts automáticas",
        "Ajusta velocidade para não perder o lure",
        "Define tentativas de caminhada antes de clicar no mapa",
        "Distância máxima para pular waypoints",
        "Raio de aleatorização para caminhos",
        "Grava distância entre pontos",
        "Carrega, renomeia e gerencia waypoints salvos",
      ],
      imageUrl: "/images/aba_cavebot.jpg",
    },
    {
      id: "catch",
      name: "Captura",
      icon: <Crosshair className="w-5 h-5" />,
      docUrl: "/docs/catch",
      description: "Captura automática de pokémons",
      features: [
        "Define pokébola para pokémons normais",
        "Define pokébola para pokémons shiny",
        "Lista de pokémons para capturar automaticamente",
        "Joga pokébola até capturar o pokémon da lista",
      ],
      imageUrl: "/images/aba_catch.jpg",
    },
    {
      id: "healing",
      name: "Cura",
      icon: <Heart className="w-5 h-5" />,
      docUrl: "/docs/healing",
      description: "Sistema de cura e revive automático",
      features: [
        "Ativa modo de Healer com revives, potions, food e berries",
        "Usa revive quando todas as skills estão em cooldown",
        "Força revive em situações críticas",
        "Reconecta após morte",
        "Muda automaticamente para outro pokémon se o atual morrer",
        "Mantém distância segura do pokémon",
        "Usa poções, comida e berries automaticamente",
      ],
      imageUrl: "/images/aba_healling_pt1.jpg",
      secondaryImageUrl: "/images/aba_healling_pt2.jpg",
    },
    {
      id: "farming",
      name: "Coleta",
      icon: <Pickaxe className="w-5 h-5" />,
      docUrl: "/docs/farming",
      description: "Coleta automática de recursos",
      features: [
        "Ativa o modo de coleta de recursos",
        "Usa headbutt em árvores enquanto coleta recursos",
        "Define raio de detecção de recursos",
        "Define raio para headbutt",
        "Detecta automaticamente recursos baseado na profissão",
      ],
      imageUrl: "/images/aba_farming.jpg",
    },
    {
      id: "fishing",
      name: "Pesca",
      icon: <Fish className="w-5 h-5" />,
      docUrl: "/docs/fishing",
      description: "Pesca automática",
      features: [
        "Ativa o modo pescador",
        "Configura quantidade máxima de pokémons na área",
        "Para de pescar quando a vida do pokémon estiver baixa",
      ],
      imageUrl: "/images/aba_fishing.jpg",
    },
    {
      id: "alarms",
      name: "Alarmes",
      icon: <Bell className="w-5 h-5" />,
      docUrl: "/docs/alarms",
      description: "Sistema de notificações",
      features: [
        "Detecta players em qualquer andar",
        "Notifica entrada e saída de players na tela",
        "Alarmes para shiny, boss e mega em qualquer andar",
        "Detecta staff e GMs na tela",
        "Alarmes para mensagens privadas e de chat",
        "Notifica vida baixa e suprimentos",
        "Alarmes para teleportes e desconexões",
        "Notifica capturas de pokémons e drops raros",
      ],
      imageUrl: "/images/aba_alarms_pt1.jpg",
      secondaryImageUrl: "/images/aba_alarms_pt2.jpg",
    },
    {
      id: "party",
      name: "Party",
      icon: <Users className="w-5 h-5" />,
      docUrl: "/docs/party",
      description: "Gerenciamento de grupo",
      features: [
        "Cria party automaticamente",
        "Ativa uso de party",
        "Convida contas configuradas para a party",
        "Útil para verificar estatísticas de loot e dano",
      ],
      imageUrl: "/images/aba_party.jpg",
    },
    {
      id: "setup",
      name: "Setup Pokémon",
      icon: <Cpu className="w-5 h-5" />,
      docUrl: "/docs/setup",
      description: "Configure seus pokémons",
      features: [
        "Adicione e configure múltiplos pokémons",
        "Configure as skills de cada pokémon",
        "Defina diferentes tipos de movimentos (target, area, support, heal)",
        "Organize a ordem de uso das skills",
        "Configuração completa para cada pokémon individual",
      ],
      imageUrl: "/images/aba_Setup_pokemon.jpg",
    },
    {
      id: "engine",
      name: "Sistema",
      icon: <Cpu className="w-5 h-5" />,
      docUrl: "/docs/engine",
      description: "Configurações do sistema",
      features: [
        "Ativa envio de alarmes para WhatsApp",
        "Mostra HUD com estatísticas",
        "Ativa coleta de loot",
        "Envia mensagens no Trade",
        "Otimizações de memória",
        "Dança ao detectar GM",
        "Mata automaticamente shinys, boss e megas",
      ],
      imageUrl: "/images/aba_engine.jpg",
    },
    {
      id: "account",
      name: "Conta",
      icon: <Cpu className="w-5 h-5" />,
      docUrl: "/docs/account",
      description: "Configurações de conta",
      features: [
        "Upload de configurações personalizadas",
        "Carrega as configurações do seu PC na máquina VNC",
        "Salva hotkeys e posições dos menus",
        "Facilita a configuração em diferentes dispositivos",
      ],
      imageUrl: "/images/aba_account.jpg",
    },
  ]

  const [activeTab, setActiveTab] = useState("combat")

  return (
    <section id="modules" className="section bg-primary-pattern grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="flex justify-center mb-6">
            <img src="/images/sup.png" alt="Support Icon" className="h-12 md:h-16" />
          </div>
          <p className="section-tag">{"["} MODULES {"]"}</p>
          <h2 className="text-4xl font-bold text-foreground">Módulos Poderosos</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça os módulos que fazem do KizuBot a ferramenta mais completa para PokeXGames
          </p>
        </div>

        <Tabs defaultValue="combat" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 md:mb-16 scroll-fade-right">
            <TabsList className="flex overflow-x-auto pb-2 gap-1.5 md:gap-2 bg-transparent w-full md:flex-wrap md:justify-center md:overflow-x-visible scrollbar-hide">
              {modules.map((module) => (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className={`
                    flex items-center justify-center gap-1 px-3.5 py-3 md:px-3 md:py-2.5 rounded-lg border-2 text-xs md:text-sm whitespace-nowrap flex-shrink-0 min-h-[44px]
                    ${
                      activeTab === module.id
                        ? "bg-primary/20 text-primary border-primary shadow-lg shadow-primary/20"
                        : "bg-muted/50 text-white border-transparent hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
                    }
                    transition-all duration-300
                  `}
                >
                  <span className="hidden md:inline mr-1">{module.icon}</span>
                  <span>{module.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/70 border border-primary/30 rounded-xl p-4 md:p-8 hud-brackets"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-accent p-2 rounded-full">{module.icon}</div>
                      <h3 className="text-xl font-bold text-primary">{module.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm md:text-base">{module.description}</p>

                    <div className="hidden md:block space-y-4">
                      {module.imageUrl ? (
                        <img
                          src={module.imageUrl || "/placeholder.svg"}
                          alt={`Interface do módulo ${module.name}`}
                          loading="lazy"
                          className="rounded-lg border border-secondary/40 shadow-lg"
                        />
                      ) : (
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt={`Interface do módulo ${module.name}`}
                          className="rounded-lg border border-secondary/40 shadow-lg"
                        />
                      )}

                      {module.secondaryImageUrl && (
                        <img
                          src={module.secondaryImageUrl || "/placeholder.svg"}
                          alt={`Interface adicional do módulo ${module.name}`}
                          loading="lazy"
                          className="rounded-lg border border-accent/30 shadow-lg mt-4"
                        />
                      )}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold text-white mb-3">Funcionalidades:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-secondary">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-gray-200 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {module.docUrl && (
                      <Link
                        href={module.docUrl}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
                      >
                        Ver documentação completa
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {/* Mobile view for images */}
                    <div className="md:hidden mt-6 space-y-4">
                      {module.imageUrl && (
                        <img
                          src={module.imageUrl || "/placeholder.svg"}
                          alt={`Interface do módulo ${module.name}`}
                          className="rounded-lg border border-secondary/30 shadow-lg w-full"
                        />
                      )}

                      {module.secondaryImageUrl && (
                        <img
                          src={module.secondaryImageUrl || "/placeholder.svg"}
                          alt={`Interface adicional do módulo ${module.name}`}
                          className="rounded-lg border border-accent/30 shadow-lg mt-4 w-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
