"use client"

import { Bot, Cpu, Shield, Zap, Bell, Check } from "lucide-react"
import { Section } from "@/components/ui/section"
import { FeatureCard } from "@/components/ui/feature-card"

export function Features() {
  const features = [
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: "Bot para PokeXGames",
      description:
        "Com funcionalidade 100% AFK, nosso bot é essencial para jogadores que querem maximizar conquistas sem esforço.",
      variant: "highlight" as const,
    },
    {
      icon: <Cpu className="w-10 h-10 text-accent" />,
      title: "Fácil Configuração",
      description:
        "Nosso painel online permite configuração fácil de todas as etapas do bot, tudo diretamente no seu navegador.",
    },
    {
      icon: <Shield className="w-10 h-10 text-brand-green" />,
      title: "Segurança Garantida",
      description: "KizuBot nunca caiu em nenhum mass ban, oferecendo a melhor proteção para sua conta.",
      variant: "premium" as const,
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Detecção Inteligente",
      description:
        "Reconhece automaticamente shinys, megas e bosses, agindo como um humano faria ao capturar ou combater.",
    },
    {
      icon: <Bell className="w-10 h-10 text-accent" />,
      title: "Sistema de Alarmes",
      description:
        "Receba notificações no WhatsApp para eventos importantes como detecção de shinys ou presença de GMs.",
    },
    {
      icon: <Check className="w-10 h-10 text-brand-green" />,
      title: "Setup Pokémon Avançado",
      description: "Configure cada pokémon individualmente com skills, movimentos e estratégias personalizadas.",
      variant: "premium" as const,
    },
  ]

  return (
    <Section id="features" background="hero" className="grid-bg">
      <div className="text-center mb-8 md:mb-16">
        <div className="flex justify-center mb-6">
          <img src="/images/target.png" alt="Target Icon" className="h-16 w-auto" loading="lazy" />
        </div>
        <p className="section-tag">{"// "} FEATURES</p>
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground font-display mb-4 text-balance">
          Recursos Principais
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          O KizuBot oferece uma ampla gama de recursos para otimizar sua experiência de jogo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            variant={feature.variant}
            index={index}
          />
        ))}
      </div>
    </Section>
  )
}
