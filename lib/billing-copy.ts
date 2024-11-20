// Customer-facing landing copy; wording changes need owner approval and a snapshot update.
export type BillingLocale = "pt-BR" | "en"

export type PlanCopyKey = "base_7d" | "base_15d" | "base_30d" | "premium_300h" | "premium_720h" | "premium_2160h" | "cota"

export interface PlanCardCopy {
  key: PlanCopyKey
  title: string
  price: string
  period: string
  description: string
  ctaText: string
  ctaHref: string
  badge?: string
  popular?: boolean
  premium: boolean
  requiresCota: boolean
}

export interface FaqItemCopy {
  id: string
  question: string
  answer: string
  answerBeforeCota?: string
  requiresCota: boolean
}

export interface LandingCopy {
  hero: {
    titleBrand: string
    titleRest: string
    subtitle: string
    logoAlt: string
    waitingAlt: string
    offerAriaLabel: string
    offerBadge: string
    activeUsersAriaLabel: string
    activeUsers: string
    ctaPrimary: string
    ctaDemo: string
    ctaDemoAriaLabel: string
  }
  pricing: {
    title: string
    subtitle: string
    paymentMethodsTitle: string
    cryptoLabel: string
    sharedFeatures: readonly string[]
    premiumExtraFeatures: readonly string[]
    cards: readonly PlanCardCopy[]
    loadError: string
    usdApprox: string
    usdFootnote: string
  }
  whyPremium: {
    title: string
    paragraphs: readonly string[]
  }
  faq: {
    title: string
    subtitle: string
    items: readonly FaqItemCopy[]
  }
}

export const CHECKOUT_URL = "https://painel.kizubot.com/checkout"
const COTA_URL = "https://painel.kizubot.com/dashboard/cota"

export const billingCopy: Readonly<Record<BillingLocale, LandingCopy>> = {
  "pt-BR": {
    hero: {
      titleBrand: "KizuBot",
      titleRest: ", a IA feita sob medida pra você!",
      subtitle: "Automatize sua experiência no PokeXGames com o bot mais avançado e seguro do mercado. Conquiste mais resultados com menos esforço.",
      logoAlt: "KizuBot - IA para PokeXGames",
      waitingAlt: "Usuários aguardando novas vagas do KizuBot",
      offerAriaLabel: "Informações de oferta e usuários",
      offerBadge: "OFERTA LIMITADA - ÚLTIMAS VAGAS!",
      activeUsersAriaLabel: "Estatística de usuários ativos",
      activeUsers: "+500 usuários ativos este mês",
      ctaPrimary: "Começar Agora",
      ctaDemo: "Ver Demonstração",
      ctaDemoAriaLabel: "Ver demonstração do KizuBot",
    },
    pricing: {
      title: "Investimento",
      subtitle: "Um investimento que se paga rapidamente com os resultados obtidos",
      paymentMethodsTitle: "Métodos de Pagamento",
      cryptoLabel: "Criptomoedas",
      sharedFeatures: [
        "Acesso a todos os módulos",
        "Suporte via WhatsApp",
        "Alarmes no celular",
        "Atualizações constantes",
        "Uso com PC desligado",
        "Acesso pelo celular",
        "Resposta automática a GMs",
        "Detecção de shinys, megas e bosses",
      ],
      premiumExtraFeatures: [
        "Voar e usar montaria liberados",
        "Coleta de recursos do Nightmare World liberada",
        "Máquina com mais recursos",
        "Consome hora só enquanto o personagem está logado no jogo",
      ],
      cards: [
        {
          key: "base_7d",
          title: "Base 7 dias",
          price: "R$ 90",
          period: "/7 dias",
          description: "Testou, farmou, valeu. Ideal pra ver se o bot serve pra você antes de fechar um pacote maior.",
          ctaText: "COMPRAR 7 DIAS",
          ctaHref: CHECKOUT_URL,
          premium: false,
          requiresCota: false,
        },
        {
          key: "base_15d",
          title: "Base 15 dias",
          price: "R$ 160",
          period: "/15 dias",
          description: "O meio-termo pra quem já sabe que vai usar mas não quer travar o mês inteiro ainda.",
          ctaText: "COMPRAR 15 DIAS",
          ctaHref: CHECKOUT_URL,
          premium: false,
          requiresCota: false,
        },
        {
          key: "base_30d",
          title: "Base 30 dias",
          price: "R$ 250",
          period: "/30 dias",
          description: "Um mês inteiro para aproveitar sua rotina de farm. Na mesma máquina, alterne 3 personagens em sequência: 8 horas cada, até 24 horas por dia. Um personagem por vez.",
          ctaText: "COMPRAR 30 DIAS",
          ctaHref: CHECKOUT_URL,
          badge: "Mais Vendido",
          premium: false,
          requiresCota: false,
        },
        {
          key: "premium_300h",
          title: "Premium 300h",
          price: "R$ 260",
          period: "/300 horas online",
          description: "Seu primeiro saldo Premium: 300 horas que só contam dentro do jogo, sem prazo de validade. Voo, montaria e coleta de recursos do Nightmare World. Preço fixo, sem desconto temporário.",
          ctaText: "COMPRAR PREMIUM 300H",
          ctaHref: CHECKOUT_URL,
          badge: "NOVO",
          premium: true,
          requiresCota: false,
        },
        {
          key: "premium_720h",
          title: "Premium 720h",
          price: "R$ 450",
          period: "/720 horas online",
          description: "720 horas contam só quando seu personagem tá dentro do jogo — não corre enquanto você tá offline. Sem validade: usa quando quiser até acabar. Voar, montaria, coleta de recursos do Nightmare World e uma máquina com mais recursos.",
          ctaText: "COMPRAR PREMIUM 720H",
          ctaHref: CHECKOUT_URL,
          badge: "PREMIUM",
          popular: true,
          premium: true,
          requiresCota: false,
        },
        {
          key: "premium_2160h",
          title: "Premium 2160h",
          price: "R$ 1200",
          period: "/2160 horas online",
          description: "O pacote pra quem já sabe que vai ficar logado todo dia. 2160 horas de jogo (não de relógio) sem prazo de validade, com toda a experiência premium.",
          ctaText: "COMPRAR PREMIUM 2160H",
          ctaHref: CHECKOUT_URL,
          premium: true,
          requiresCota: false,
        },
        {
          key: "cota",
          title: "COTA",
          price: "R$ 0",
          period: "/enquanto durar sua cota",
          description: "Você já paga Claude, Codex, Antigravity ou Kiro no plano pago? Conecta sua conta de IA no painel KizuBot e ganha licença COTA de graça, com recursos nível Base, enquanto sua cota semanal durar.",
          ctaText: "VER COMO FUNCIONA",
          ctaHref: COTA_URL,
          badge: "COTA",
          premium: false,
          requiresCota: true,
        },
      ],
      loadError: "Não foi possível carregar os planos agora. Tente de novo em instantes.",
      usdApprox: "≈ US$ {amount}",
      usdFootnote: "Valor em dólar aproximado; a cobrança é feita em reais (BRL).",
    },
    whyPremium: {
      title: "Base ou Premium: escolha seu ritmo",
      paragraphs: [
        "Base é para aproveitar o dia inteiro: na mesma máquina, você pode alternar 3 personagens em sequência, 8 horas cada, totalizando 24 horas de uso por dia. Apenas um personagem joga por vez; não são três máquinas simultâneas. Os pacotes de 7, 15 e 30 dias contam tempo corrido.",
        "Premium acompanha seu tempo de jogo: os saldos de 300, 720 e 2160 horas só são consumidos enquanto o personagem está online, sem prazo de validade. Deslogou? O saldo para. Escolha conforme sua rotina, sem abrir mão dos módulos do bot.",
        "E não é só isso: no Premium seu personagem também pode voar, usar montaria e coletar recursos do Nightmare World, e a máquina tem mais recursos.",
      ],
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tire suas dúvidas sobre o KizuBot",
      items: [
        {
          id: "lifetime",
          question: "O KizuBot tem acesso vitalício?",
          answer: "Não tem vitalício, nós temos custos mensais pra: \n- nos manter como o melhor bot do mercado\n- manter o melhor ping na sua máquina\n- updates e novidades constantes\n- alarmes no whatsapp\n- bot privado apenas para os melhores\n- custos de IA terceirizada\n- manter toda a segurança que proporcionamos\n- poder usar o bot com seu PC desligado\n- poder acessar o bot pelo celular\n- o bot responder GM e pisar na seta",
          requiresCota: false,
        },
        {
          id: "price",
          question: "Quanto custa o KizuBot?",
          answer: "Base tem pacotes de 7, 15 e 30 dias corridos. Premium tem saldos de 300, 720 e 2160 horas online, sem prazo de validade. Consulte os cartões de planos acima para os preços atuais e as ofertas disponíveis. A cobrança é em reais. A licença COTA também pode estar disponível no painel para assinantes de IA elegíveis.",
          answerBeforeCota: "Base tem pacotes de 7, 15 e 30 dias corridos. Premium tem saldos de 300, 720 e 2160 horas online, sem prazo de validade. Consulte os cartões de planos acima para os preços atuais e as ofertas disponíveis. A cobrança é em reais.",
          requiresCota: false,
        },
        {
          id: "base-vs-premium",
          question: "Qual a diferença entre Base e Premium?",
          answer: "Base conta dias corridos e permite aproveitar a mesma máquina com 3 personagens em sequência: 8 horas cada, até 24 horas por dia, um personagem por vez. Premium só desconta saldo enquanto o personagem está online no PXG, sem validade, com voo, montaria, coleta de recursos do Nightmare World e uma máquina com mais recursos. Não dá pra fazer upgrade de um pro outro — Premium é licença nova, em máquina nova.",
          requiresCota: false,
        },
        {
          id: "cota",
          question: "O que é a licença COTA?",
          answer: "COTA é a licença de graça pra quem já é assinante pago de Claude, Codex, Antigravity ou Kiro. Você conecta sua conta de IA no painel do KizuBot e, enquanto sua cota semanal daquele provedor não acabar, seu bot roda com recursos nível Base sem pagar nada. Cada conta conectada dá direito a uma máquina. Quando a cota do provedor zera (ou você desconecta), o bot desloga com segurança e a máquina é liberada; recrie quando a cota resetar.",
          requiresCota: true,
        },
        {
          id: "exhaustion",
          question: "O que acontece quando meu tempo ou minha cota acaba?",
          answer: "O bot faz o PANIC (deslogada segura, igual o comando !panic do WhatsApp) e a máquina é liberada. Ninguém fica online sem saldo. No Base e Premium, renove e recrie a máquina. Na COTA, é esperar sua cota semanal resetar no provedor e recriar a máquina de novo — não recria sozinho, você escolhe quando voltar.",
          answerBeforeCota: "O bot faz o PANIC (deslogada segura, igual o comando !panic do WhatsApp) e a máquina é liberada. Ninguém fica online sem saldo. No Base e Premium, renove e recrie a máquina.",
          requiresCota: false,
        },
        {
          id: "payment",
          question: "Quais métodos de pagamento são aceitos?",
          answer: "Cartão de crédito e boleto em painel.kizubot.com/checkout, liberação automática assim que o pagamento é aprovado. PIX e Cripto também dão, só que é manual: você paga, manda o comprovante no WhatsApp e a gente libera.",
          requiresCota: false,
        },
        {
          id: "ban-safety",
          question: "KizuBot é seguro contra banimentos?",
          answer: "KizuBot nunca caiu em nenhum mass ban",
          requiresCota: false,
        },
        {
          id: "shiny",
          question: "O bot mata Shiny, Boss e Mega?",
          answer: "O bot é capaz de reconhecer shiny, megas e bosses e agir como um humano faria matando e coletando o loot. Em caso de shiny, jogando a ball.",
          requiresCota: false,
        },
        {
          id: "alarms",
          question: "Como funciona o sistema de alarmes?",
          answer: "O KizuBot possui um sistema avançado de alarmes que pode notificar você via WhatsApp para diversos eventos como: detecção de jogadores, shinys, bosses, megas, mensagens privadas, vida baixa, e muito mais. Você pode configurar quais alarmes deseja receber.",
          requiresCota: false,
        },
        {
          id: "pc-off",
          question: "Preciso deixar meu PC ligado para usar o bot?",
          answer: "Não, o KizuBot pode funcionar mesmo com seu PC desligado, pois opera em nossos servidores. Você também pode acessar e controlar o bot pelo celular.",
          requiresCota: false,
        },
        {
          id: "gm",
          question: "O que acontece se um GM aparecer enquanto estou usando o bot?",
          answer: "O KizuBot possui um sistema de detecção de GMs e staff. Quando detectado, o bot pode enviar um alarme para seu WhatsApp, responder automaticamente com mensagens pré-configuradas e até mesmo fazer seu personagem dançar para simular presença humana.",
          requiresCota: false,
        },
      ],
    },
  },
  en: {
    hero: {
      titleBrand: "KizuBot",
      titleRest: ", the AI tailored to the way you play!",
      subtitle: "Automate your PokeXGames experience with the most advanced and secure bot on the market. Get more results with less effort.",
      logoAlt: "KizuBot - AI for PokeXGames",
      waitingAlt: "Users waiting for new KizuBot spots",
      offerAriaLabel: "Offer and user information",
      offerBadge: "LIMITED OFFER - LAST SPOTS!",
      activeUsersAriaLabel: "Active users statistic",
      activeUsers: "+500 active users this month",
      ctaPrimary: "Get Started",
      ctaDemo: "Watch Demo",
      ctaDemoAriaLabel: "Watch the KizuBot demo",
    },
    pricing: {
      title: "Pricing",
      subtitle: "An investment that quickly pays for itself with the results you get",
      paymentMethodsTitle: "Payment Methods",
      cryptoLabel: "Crypto",
      sharedFeatures: [
        "Access to every module",
        "WhatsApp support",
        "Mobile alarms",
        "Constant updates",
        "Works with your PC off",
        "Access from your phone",
        "Automatic GM response",
        "Shiny, mega and boss detection",
      ],
      premiumExtraFeatures: [
        "Fly and vehicle unlocked",
        "Nightmare World resource collection unlocked",
        "A machine with more resources",
        "Only burns hours while your character is actually online",
      ],
      cards: [
        {
          key: "base_7d",
          title: "Base 7 days",
          price: "R$ 90",
          period: "/7 days",
          description: "Try it, farm it, decide. The cheapest way to see if the bot is for you before committing to a bigger pack.",
          ctaText: "BUY 7 DAYS",
          ctaHref: CHECKOUT_URL,
          premium: false,
          requiresCota: false,
        },
        {
          key: "base_15d",
          title: "Base 15 days",
          price: "R$ 160",
          period: "/15 days",
          description: "The middle ground for people who already know they'll use it but don't want to lock in a full month yet.",
          ctaText: "BUY 15 DAYS",
          ctaHref: CHECKOUT_URL,
          premium: false,
          requiresCota: false,
        },
        {
          key: "base_30d",
          title: "Base 30 days",
          price: "R$ 250",
          period: "/30 days",
          description: "A full month for your farming routine. Rotate 3 characters in sequence on the same machine: 8 hours each, up to 24 hours a day. One character at a time.",
          ctaText: "BUY 30 DAYS",
          ctaHref: CHECKOUT_URL,
          badge: "Best Seller",
          premium: false,
          requiresCota: false,
        },
        {
          key: "premium_300h",
          title: "Premium 300h",
          price: "R$ 260",
          period: "/300 online hours",
          description: "Your first Premium balance: 300 hours spent only in-game, with no expiry. Flying, vehicles and Nightmare World resource collection included. Fixed price, no temporary discount.",
          ctaText: "GET PREMIUM 300H",
          ctaHref: CHECKOUT_URL,
          badge: "NEW",
          premium: true,
          requiresCota: false,
        },
        {
          key: "premium_720h",
          title: "Premium 720h",
          price: "R$ 450",
          period: "/720 online hours",
          description: "720 hours only count while your character is actually inside the game — nothing burns while you're offline. No expiry: use it whenever until it runs out. Fly, vehicle, Nightmare World resource collection and a machine with more resources included.",
          ctaText: "GET PREMIUM 720H",
          ctaHref: CHECKOUT_URL,
          badge: "PREMIUM",
          popular: true,
          premium: true,
          requiresCota: false,
        },
        {
          key: "premium_2160h",
          title: "Premium 2160h",
          price: "R$ 1200",
          period: "/2160 online hours",
          description: "For players who know they'll be logged in daily. 2160 hours of actual play time (not wall-clock), no expiry, full premium experience.",
          ctaText: "GET PREMIUM 2160H",
          ctaHref: CHECKOUT_URL,
          premium: true,
          requiresCota: false,
        },
        {
          key: "cota",
          title: "COTA",
          price: "R$ 0",
          period: "/while your quota lasts",
          description: "Already paying for Claude, Codex, Antigravity or Kiro on a paid tier? Connect your AI account in the KizuBot panel and get a free COTA license with Base-level features for as long as your weekly quota lasts.",
          ctaText: "SEE HOW IT WORKS",
          ctaHref: COTA_URL,
          badge: "COTA",
          premium: false,
          requiresCota: true,
        },
      ],
      loadError: "We couldn't load the plans right now. Please try again in a moment.",
      usdApprox: "≈ US$ {amount}",
      usdFootnote: "*approximate, charged in BRL",
    },
    whyPremium: {
      title: "Base or Premium: choose your pace",
      paragraphs: [
        "Base makes the most of a full day: rotate 3 characters in sequence on the same machine, 8 hours each, for 24 hours of daily use. Only one character plays at a time; these are not three simultaneous machines. The 7, 15 and 30-day packs count calendar time.",
        "Premium follows your play time: 300, 720 and 2160-hour balances are only spent while your character is online, with no expiry. Logged off? Your balance pauses. Choose the rhythm that fits you, with access to the bot's modules on both plans.",
        "On top of that, Premium unlocks flying, vehicles and Nightmare World resource collection for your character, and runs on a machine with more resources.",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Get your KizuBot questions answered",
      items: [
        {
          id: "lifetime",
          question: "Does KizuBot have lifetime access?",
          answer: "There's no lifetime plan, we have monthly costs to: \n- keep us the best bot on the market\n- keep the best ping on your machine\n- constant updates and new features\n- WhatsApp alarms\n- a private bot for the best players only\n- third-party AI costs\n- keep all the security we provide\n- let you use the bot with your PC off\n- let you access the bot from your phone\n- have the bot answer GMs and step on the arrow",
          requiresCota: false,
        },
        {
          id: "price",
          question: "How much does KizuBot cost?",
          answer: "Base offers 7, 15 and 30 calendar days. Premium offers 300, 720 and 2160 online hours with no expiry. Check the plan cards above for current prices and available offers. Payments are charged in BRL. Eligible AI subscribers may also find a COTA license in the panel.",
          answerBeforeCota: "Base offers 7, 15 and 30 calendar days. Premium offers 300, 720 and 2160 online hours with no expiry. Check the plan cards above for current prices and available offers. Payments are charged in BRL.",
          requiresCota: false,
        },
        {
          id: "base-vs-premium",
          question: "What's the difference between Base and Premium?",
          answer: "Base counts calendar days and lets you rotate 3 characters in sequence on one machine: 8 hours each, up to 24 hours a day, one character at a time. Premium only spends balance while your character is online in PXG, with no expiry, plus flying, vehicles, Nightmare World resource collection and a machine with more resources. There's no upgrade path between them — Premium is a new license on a new machine.",
          requiresCota: false,
        },
        {
          id: "cota",
          question: "What is a COTA license?",
          answer: "COTA is a free license for anyone already on a paid subscription to Claude, Codex, Antigravity or Kiro. You connect your AI account in the KizuBot panel, and as long as your weekly quota with that provider isn't exhausted, your bot runs with Base-level features at no cost. Each connected account is good for one machine. When the provider's quota hits zero (or you disconnect), the bot logs out safely and the machine is released; recreate it once your quota resets.",
          requiresCota: true,
        },
        {
          id: "exhaustion",
          question: "What happens when my time or my quota runs out?",
          answer: "The bot performs a PANIC (safe logout, same as the WhatsApp !panic command) and the machine is released. Nobody stays online with an empty balance. On Base and Premium, renew and recreate the machine. On COTA, wait for your weekly quota to reset with the provider and recreate the machine again — it doesn't auto-recreate, you choose when to come back.",
          answerBeforeCota: "The bot performs a PANIC (safe logout, same as the WhatsApp !panic command) and the machine is released. Nobody stays online with an empty balance. On Base and Premium, renew and recreate the machine.",
          requiresCota: false,
        },
        {
          id: "payment",
          question: "What payment methods do you accept?",
          answer: "Credit card and boleto at painel.kizubot.com/checkout, released automatically as soon as the payment clears. PIX and crypto also work, but manually: you pay, send the receipt on WhatsApp, and we release it.",
          requiresCota: false,
        },
        {
          id: "ban-safety",
          question: "Is KizuBot safe from bans?",
          answer: "KizuBot has never been caught in a mass ban",
          requiresCota: false,
        },
        {
          id: "shiny",
          question: "Does the bot kill Shiny, Boss and Mega?",
          answer: "The bot recognizes shinies, megas and bosses and acts like a human would, killing them and collecting the loot. For a shiny, it throws the ball.",
          requiresCota: false,
        },
        {
          id: "alarms",
          question: "How does the alarm system work?",
          answer: "KizuBot has an advanced alarm system that can notify you on WhatsApp about many events, such as: player detection, shinies, bosses, megas, private messages, low health and much more. You choose which alarms you want to receive.",
          requiresCota: false,
        },
        {
          id: "pc-off",
          question: "Do I need to keep my PC on to use the bot?",
          answer: "No, KizuBot works even with your PC off, because it runs on our servers. You can also access and control the bot from your phone.",
          requiresCota: false,
        },
        {
          id: "gm",
          question: "What happens if a GM shows up while I'm using the bot?",
          answer: "KizuBot has a GM and staff detection system. When one is detected, the bot can send an alarm to your WhatsApp, reply automatically with pre-configured messages and even make your character dance to simulate human presence.",
          requiresCota: false,
        },
      ],
    },
  },
}

export function cardFeatures(locale: BillingLocale, card: PlanCardCopy): string[] {
  const { sharedFeatures, premiumExtraFeatures } = billingCopy[locale].pricing
  return card.premium ? [...sharedFeatures, ...premiumExtraFeatures] : [...sharedFeatures]
}
