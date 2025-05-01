"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown, Quote, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function Testimonials() {
  const [showAll, setShowAll] = useState(false)

  // The server cannot know the viewport, so it renders the desktop count and CSS hides the extra
  // cards on mobile. Trimming them after hydration moved everything below by ~1,900 px (CLS 1.0).
  const MOBILE_DISPLAY_COUNT = 6
  const DESKTOP_DISPLAY_COUNT = 12

  const testimonials = [
    {
      name: "Leonardo Bernardo",
      role: "Cliente Satisfeito",
      content: "Foi excelente. Dentre todos, foi o mais completo e com o suporte. Quando consegui manusear todo o bot 100%, obtive bastante lucro.",
      avatar: "/media/feedbacks/feedback-leonardo-bot-mais-completo.jpeg",
      type: "feedback",
      rating: 5,
    },
    {
      name: "Leonardo Rodrigues",
      role: "Shiny Hunter",
      content: "Salve Léo. Foi boa. Eu consegui pegar um shiny na época.",
      avatar: "/media/feedbacks/feedback-leonardo-peguei-shiny.jpeg",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Cliente Shiny Hunter",
      role: "Shiny Feraligatr Catcher",
      content: "Mano, obviamente que tu não vai postar nick nem nada, mas eu tava relaxado assistindo um filme com a minha mulher. pokemonCaught ~ I've caught Feraligatr. KKKKKKKKKKK Shiny Feraligatr Nível 100, Inegociável!",
      avatar: "/media/feedbacks/caugh-shiny-fera.jpeg",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Léo",
      role: "High Profit User",
      content: "Vlw Léo mano com suas dicas tô começando a aprender. Parou de morrer na Hunt e tá rodando gostosinho. Total Real-World Value: R$ 25,31 | $4.73 | €4.08. Nessa pegada é só sucesso!",
      avatar: "/media/feedbacks/feedback-lucro.jpeg",
      type: "high-profit",
      rating: 5,
    },
    {
      name: "Israel de Oliveira Joaquim",
      role: "Cliente KizuBot PxG",
      content: "Vi sua config agora, mudei: combat: minmonster de 4 pra 99, maxtimeforcombo de 30 pra 20, waitforend de 10 pra 3, forcecomboathealth de 45 pra 40, boxradius de 4 pra 3, End of Combo Priority mudei de healing pra loot. Melhorou muito! Blza, Boa!",
      avatar: "/media/feedbacks/kizubot-tem-suporte-de-qualidade.png",
      type: "professional-dev",
      rating: 5,
    },
    {
      name: "Marcos António",
      role: "Staff Member",
      content: "Mais um dia colocando a staff no bolso. Respondido via celular. Nem em casa eu estou.",
      avatar: "/media/testimonials/staff-no-bolso-marcos.jpg",
      type: "staff-success",
      rating: 5,
    },
    {
      name: "Cliente Satisfeito",
      role: "Usuário Premium",
      content:
        "O bot evoluiu muito. O principal bug não acontece mais. Não se trava mais, está mais fluído, está muito top. Parabéns pelo trampo.",
      avatar: "/media/testimonials/reconhece-o-empenho.png",
      type: "feedback",
      rating: 5,
    },
    {
      name: "Cliente em Família",
      role: "Pai de Família",
      content: "Aproveitando com a família enquanto o bot roda suave no farm.",
      avatar: "/media/testimonials/aproveitando-com-a-familia-enquanto-o-bot-roda.png",
      type: "family-time",
      rating: 5,
    },
    {
      name: "Rodrigo Vinícius",
      role: "Pai de Família",
      content: "Obrigado @Big Léo, enquanto bot caça, eu me divertindo com a família. Tempo de qualidade garantido!",
      avatar: "/media/testimonials/aproveitando-com-a-familia-enquanto-o-bot-roda.png",
      type: "family-time",
      rating: 5,
    },
    {
      name: "Leonardo Junio",
      role: "High Profit User",
      content: "Se tá de parabéns pelo bot na moral. Em 2 dias com ele eu já fiz 9kk de item de finders.",
      avatar: "/media/feedbacks/feedback-leo-jr.jpeg",
      type: "high-profit",
      rating: 5,
    },
    {
      name: "Robson Luiz",
      role: "Shiny Hunter",
      content: "Acabei o projeto kkk. Shiny tangela. E outros dois shinys eu peguei então acabou kkkk",
      avatar: "/media/feedbacks/feedback-robson.jpeg",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Thiago Barandino",
      role: "Experienced Botter",
      content: "Ele é bem completo quase n tem bug, show!!! No tibia ja cheguei a fazer de 15 a 20 mil por mês só botiando!! Eu tinha servidor dedicado so pra isso 😂",
      avatar: "/media/feedbacks/feedback-thiago.jpeg",
      type: "veteran-comparison",
      rating: 5,
    },
    {
      name: "Alessandro Nogueira",
      role: "Boss Hunter",
      content: "Ativei msgs pelo zap também. Chega certinho. Você mano, fez um trampo da hora. Imagino o trabalho q deve ser feito. Obrigado pela atenção Slc",
      avatar: "/media/feedbacks/feedback-alessandro.jpeg",
      type: "dev-appreciation",
      rating: 5,
    },
    {
      name: "Caçador de Shinies",
      role: "Shiny Hunter",
      content:
        "KKKKKKKKKKKKK até esqueci. 50 janguru e 27 premier. Peguei na janguru. Caralhoooo vale quanto um desse? 700kk já passei.",
      avatar: "/media/results/shiny-venu.jpg",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Wally",
      role: "Shiny Hunter",
      content: "Wally capturou 2 Smeargle 7★ em 3h de hunt com o bot.",
      avatar: "/media/testimonials/wally-capturou-2-smeargle-7-em-3h-de-hunt.png",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Wilgner Silva",
      role: "Cliente Premium",
      content:
        "Feedback: O número deu certoooo familia! Alarme truandooo no 12. Gratidão! Crédito toda ao queridíssimo Grande Léo.",
      avatar: "/media/testimonials/testimonial-wilgner.png",
      type: "alarm-system",
      rating: 5,
    },
    {
      name: "Giovanni",
      role: "Usuário Retornando",
      content:
        "Um feedback pra você: O bot evoluiu muito. O principal bug não acontece mais. Não se trava mais, está mais fluído, está muito top. Parabéns pelo trampo.",
      avatar: "/media/testimonials/returning-giov.png",
      type: "returning-user",
      rating: 5,
    },
    {
      name: "Ian Almeida",
      role: "Shiny Hunter",
      content:
        "Shiny Muk - Nível Necessário: 100, Preço de NPC: Inegociável, Partíde Aura: ✓. Pena que n vi piscar, tava afk.",
      avatar: "/media/results/sh-muk.jpg",
      type: "shiny-catch",
      rating: 5,
    },
    {
      name: "Samuel",
      role: "Multi-Server Player",
      content: "Mais um shiny na conta no server novo. Esse aí tirou onda. 4 shiny já.",
      avatar: "/media/results/sh-dratini-new-server.jpg",
      type: "multi-server",
      rating: 5,
    },
    {
      name: "Xandy",
      role: "Usuário Aguardando",
      content: "Kizu quando abre novas vagas? Ansioso para começar a usar o bot!",
      avatar: "/media/testimonials/xandy-esperando-novas-vagas.jpg",
      type: "waiting-list",
      rating: 5,
    },
    {
      name: "Douglas",
      role: "Usuário Retornando",
      content:
        "Teu bot é mt bom e fácil configurar parabéns pelo trampo. Voltando depois de um tempo e continua excelente!",
      avatar: "/media/testimonials/returning-doug.png",
      type: "returning-user",
      rating: 5,
    },
    {
      name: "Filipe",
      role: "6º Usuário KizuBot",
      content:
        "Eu fui o sexto usuário que comprou o bot, e logo no terceiro dia, caçando machamp de golduck, level 70 eu capturei o primeiro shiny machamp. Até aí tudo bem né, é só mais um cagado, nunca mais vai acontecer, mas logo em seguida, na segunda semana, eu peguei o próximo, esse já em outro personagem level 94. No final da história eu acabei vendendo por 1000 reais cada um e comprei mais uma licença do bot.",
      avatar: "/media/testimonials/testimonial-filipe.png",
      type: "success-story",
      rating: 5,
    },
    {
      name: "Pedro Henrique (PH)",
      role: "Usuário Premium",
      content:
        "Mano, tava cansado de ficar farmando na mão e perdendo shiny. Com o KizuBot, já dropei 3 metal coat, 2 king's rock e um shiny Marowak em uma semana! O sistema de alarme no zap é brabo demais, recebi notificação de GM e consegui responder na hora. Já paguei o investimento só com os drops que vendi no trade.",
      avatar: "/media/testimonials/testimonial-pedro-henrique.png",
      type: "roi-success",
      rating: 5,
    },
    {
      name: "Gustavo Vieira",
      role: "Farming Specialist",
      content:
        "Total dropped items: 12335! Screw: 11616, Electric Tail: 45, Thunder Stone: 12. Que chique kk! Deu certo! É agradecer por indicar o sanatore. O cara super gente boa. Ficou à disposição e ajudou muito.",
      avatar: "/media/testimonials/testimonial-gustavo-vieira.png",
      type: "farming-stats",
      rating: 5,
    },
    {
      name: "Ian Almeida",
      role: "Cliente Premium",
      content:
        "Léo é bem metódico nessas paradas. Dificilmente ele vai fazer algo rápido pra deixar todo mundo on, sem analisar esse da risco de detecção, por exemplo. PAZ.",
      avatar: "/media/testimonials/programador-metodico-profissional.png",
      type: "professional-dev",
      rating: 5,
    },
    {
      name: "Sergin Mochileiro",
      role: "Beach Vendor",
      content:
        "Com KizuBot posso vender minha arte na praia e cuidar do char pelo WhatsApp. Mas fala baixo, é segredo!",
      avatar: "/media/testimonials/mochileiro.png",
      type: "lifestyle-freedom",
      rating: 5,
    },
    {
      name: "Loxas",
      role: "Usuário Aguardando",
      content: "Salve kizu me avisa quando abrir vagas. Ansioso para começar!",
      avatar: "/media/testimonials/loxas-esperando-vagas.jpg",
      type: "waiting-list",
      rating: 5,
    },
    {
      name: "Matheus",
      role: "Rare Items Hunter",
      content:
        "Boss Metagross detectado! Tech Ball, Ironhard Backpack, Metal Coat dropados. Carai, estourou! Treino tá rendendo e bot tá torando, braboo!",
      avatar: "/media/results/metalcoat.jpg",
      type: "rare-drops",
      rating: 5,
    },
    {
      name: "Matheus",
      role: "Gym Enthusiast",
      content:
        "Pra tu fazer uma mídia: recebendo alarmes do bot no relógio enquanto treina na academia. Tecnologia a favor da produtividade!",
      avatar: "/media/testimonials/alarmes-relogio-academia.jpg",
      type: "mobile-convenience",
      rating: 5,
    },
    {
      name: "Cliente Mobile",
      role: "Mobile User",
      content:
        "Configurei bot p farmar mato no meu celular, super de boa. Flashback dos tempos antigos, mas agora automatizado!",
      avatar: "/media/testimonials/mato-celular.png",
      type: "mobile-farming",
      rating: 5,
    },
    {
      name: "Usuário Transformado",
      role: "Life Changed",
      content: "KizuBot mudou minha vida... Agora posso focar no que realmente importa enquanto o bot trabalha!",
      avatar: "/media/testimonials/mudou-minha-vida.jpg",
      type: "life-changing",
      rating: 5,
    },
    {
      name: "Java",
      role: "Ex-Cheater",
      content:
        "Sempre usei umas paradinha, mas esse KizuBot recomendo tlgd. Seguro e eficiente, sem riscos desnecessários.",
      avatar: "/media/testimonials/java-testimonial.jpg",
      type: "security-focused",
      rating: 5,
    },
    {
      name: "Boss Hunter",
      role: "High Profit Player",
      content: "15kk de item de boss dropou 2 em 1h em um boneco só. Caço demais! Lucro garantido com o KizuBot.",
      avatar: "/media/results/lucro-boss-loot.png",
      type: "high-profit",
      rating: 5,
    },
    {
      name: "Cliente Infinito",
      role: "Boss Hunter",
      content:
        "Comprei até um boss detector no rainbow. Investimento kk. Art Attack, I need your help! Mano, tu tem um cliente infinito. Hahahah.",
      avatar: "/media/feedbacks/feedback-cliente-infinito.png",
      type: "boss-hunting",
      rating: 5,
    },
    {
      name: "Admirador",
      role: "Developer Appreciator",
      content: "Na moral vc é foda programando, pra fazer uns blg desse slc",
      avatar: "/media/testimonials/foda-programando.png",
      type: "dev-appreciation",
      rating: 5,
    },
    {
      name: "Cliente Relaxado",
      role: "AFK Player",
      content: "Boss Rhyperior detectado! Protector dropado! Eu tô deitado e o bot tá como? ❤️",
      avatar: "/media/feedbacks/feedback-deitado-bot-drop-boss.png",
      type: "afk-success",
      rating: 5,
    },
    {
      name: "Cliente Satisfeito",
      role: "System Tester",
      content:
        "Tá muito mais fluído. Só consegui logar nele hoje infelizmente. Vi algumas funcionalidades novas sim. Vou tentar me atualizar. Obrigado pela oportunidade 🙏",
      avatar: "/media/feedbacks/feedback-mais-fluido.png",
      type: "system-improvement",
      rating: 5,
    },
    {
      name: "Big Flávio",
      role: "2-Month User",
      content:
        "2 meses de Kizu, farmei 1.5kkk. Com os 1.5kkk montei rotação ice pb full com Tm burst. Troquei rotação completa em um char de disk4 charm e trevo. Gracias Kizu",
      avatar: "/media/feedbacks/feedback-flavio.png",
      type: "long-term-success",
      rating: 5,
    },
    {
      name: "Gilson Junior",
      role: "High Earner",
      content:
        "7 dias de farm com o bot kkkkk. Lucro esperado: 73.72KK. Diamond Vault: 301KK, 748K e 204 dollars. Tenho a grana pra renovar já. Mano sistema que uso pra fazer grana. Ninguém bate 😂. Meu esquema é o melhor. E o retorno mais rápido.",
      avatar: "/media/testimonials/gilson-junior-feedback-lucro.png",
      type: "weekly-profits",
      rating: 5,
    },
    {
      name: "Cliente Perfeccionista",
      role: "Quality Tester",
      content: "Acredito que mudando isso, a hunt fica mais rápida. Esse bot é a perfeição ocara. Se tá doido EOWKEOWK",
      avatar: "/media/feedbacks/feedback-bot-perfeicao.png",
      type: "perfection-praise",
      rating: 5,
    },
    {
      name: "Mano",
      role: "Regretful Buyer",
      content: "KKKKKKKKKKKKKK isso tá mt bom. Eu quero mt ter comprado isso antes. Queria* 😂😂😂",
      avatar: "/media/feedbacks/feedback-soa.jpg",
      type: "wish-bought-earlier",
      rating: 5,
    },
    {
      name: "Eduardo José",
      role: "Alarm System User",
      content:
        "Parabéns pelo novo sistema de alarme muito top msm. Ficou absurdo. Pensei q nem tava funcionando kkk. Tem que ir lá no dashboard e conectar seu whatsapp com o qr code",
      avatar: "/media/feedbacks/feedback-novo-sistema-alarmes.png",
      type: "alarm-upgrade",
      rating: 5,
    },
    {
      name: "Filipe Rico",
      role: "Market Breaker",
      content:
        "Que server merda esse emerald pra botiar, POP. Nada vende nessa merda. Acho que por isso o filipe parou de jogar. Vendeu 2 shiny machamp e faliu o mundo emerald 😂. Coitado do meu emerald '-'",
      avatar: "/media/results/filipe-ficou-rico-faliu-emerald.png",
      type: "market-impact",
      rating: 5,
    },
    {
      name: "Luis",
      role: "Configuration Expert",
      content:
        "As configurações novas ficaram dahora demais. Essa de bater os target depois que bate revive pra não precisar bater outro rev espetacular. De dar move no poke tb depois do segundo bixo. Parabéns mano",
      avatar: "/media/feedbacks/feedback-luis.png",
      type: "config-improvements",
      rating: 5,
    },
    {
      name: "Multi-Account User",
      role: "Premium User",
      content:
        "No caso agora eu tenho 2 máquinas, 1 vip2 e uma premium. Se no mês que vem eu quiser posso upgradar a premium pra vip2? Aí ter 2 máquinas vip2? Show, biz!! Bot insano irmão!! mt foda 😂😂",
      avatar: "/media/feedbacks/feedback-bot-insano.png",
      type: "multi-account",
      rating: 5,
    },
    {
      name: "Natan",
      role: "Strategic Player",
      content:
        "É amigos, fui taxado de louco, mas parece que toda loucura tem um fio de lucidez. Kizubot vai começar a soltar a carta e quem farmava muito, vai começar a farmar muito mais 💰💰💰. @Big Léo parabéns pelo empenho na resolução meu mano, símbora 🚀",
      avatar: "/media/feedbacks/feedback-natan.jpg",
      type: "strategic-vision",
      rating: 5,
    },
    {
      name: "Matheus",
      role: "Gym & Bot User",
      content:
        "Eu na academia upando o char principal e o bot upando a secundária. Na moral @Big Léo top de mais essa ferramenta kk parabéns. Na mesma conta?",
      avatar: "/media/feedbacks/feedback-mts.jpg",
      type: "dual-activity",
      rating: 5,
    },
    {
      name: "Berry Trader",
      role: "Trading Specialist",
      content:
        "Acho que ela caça bem nesses 3 lugares. Novo método de ficar rico, berry por encomenda. Se quiser divulgar, borra os nomes atrás do trade e do trade e GG",
      avatar: "/media/feedbacks/feedback-berry.jpg",
      type: "trading-strategy",
      rating: 5,
    },
    {
      name: "DVD",
      role: "New Server Player",
      content: "Kizubot é uma mãe 3.5kk no new server kk só em vendas de um dia. Isso foi insano. Kkk",
      avatar: "/media/feedbacks/feedback-dvd.jpg",
      type: "daily-earnings",
      rating: 5,
    },
    {
      name: "Luis Chato",
      role: "Long-term User",
      content:
        "Passando para eu dar um feedback do bot esses últimos dias. Negócio rodando bem pra caramba. Não morri faz uns 7 dias. Hunter Mawile, sableye e claydol",
      avatar: "/media/feedbacks/feedback-luis-chato.png",
      type: "stability-praise",
      rating: 5,
    },
    {
      name: "Leo Carioca",
      role: "Feature Enthusiast",
      content:
        "Leo, meu feedback é o seguinte: o bot tá um monstro, melhorou muito, consigo personalizar mto mais as coisas, mas o lure tá melhor, o move tá melhor, o uso de berry tá certinho, revive tá tranquilo",
      avatar: "/media/feedbacks/feedback-leo-carioca.png",
      type: "feature-improvements",
      rating: 5,
    },
    {
      name: "Edson (Gabrieel)",
      role: "Veteran User",
      content:
        "Comprando o Kizu bot de início com esse atual de agora (atualizações) eu gostei muito do painel ficou mais organizado e mais fácil de entender no início era hardcore hahahah. A IA ficou mais aprimorada principalmente em Hunt e Farm de itens. Única coisa que me incomoda ksksksk é eu sempre tá falei dês do começo e ela não respeitar ou esperar o limite de Pokémon do lure, mas quando eu fiz a configuração que me indicaram isso parou de me incomodar. Te falar a verdade tá bem melhor do que quando começou, lógico que o INÍCIO É ASSIM MESMO E SEMPRE TENDO A MELHORAR que é o caso.",
      avatar: "/media/feedbacks/feedback-usuario-antigo-gabrieel.png",
      type: "veteran-comparison",
      rating: 5,
    },
    {
      name: "Premium User",
      role: "Monthly Earner",
      content: "Balanço primeiro mês do vip2: 600kkzin pra conta. Poderia ter feito mais, perdi tempo aprendendo",
      avatar: "/media/feedbacks/feedback-vip2.jpg",
      type: "monthly-balance",
      rating: 5,
    },
    {
      name: "Dudu",
      role: "Long-term User",
      content:
        "Bom dia jovem! Usei bot num char lá uns 2 meses aí deixei 5 meses parado foi logar o char ainda tá lá não foi ban não kk",
      avatar: "/media/testimonials/cliente-sem-ban.jpg",
      type: "account-safety",
      rating: 5,
    },
    {
      name: "High Profit Trader",
      role: "Market Expert",
      content:
        "Esse char tem mais coisas 65kk mkt de item pra vende mais 30 na bag. Nos outros deve ter mais uns 500kk os dois juntos fora os 182kk que vendi já",
      avatar: "/media/feedbacks/feedback-lucros.png",
      type: "market-profits",
      rating: 5,
    },
    {
      name: "Shiny Hunter",
      role: "Venusaur Catcher",
      content:
        "shinyDetected ~ shiny Venusaur, pokemonCaught ~ I've caught ven. to indo dp ver KKKKKKKKKKKKKKKKKKKKKKKKKK",
      avatar: "/media/results/caught-shiny-venusaur.jpg",
      type: "shiny-excitement",
      rating: 5,
    },
    {
      name: "Carlos",
      role: "Premium Enthusiast",
      content:
        "Tu consegue zerar pra mim pls? pronto. vlwwwww. um cara deve te perguntar sobre vip2 aí, nao dei nenhuma info falei pra te perguntar. so falei q faz cash kk. gilson junior. insano o update. mano estou navegando fortemente e tendo inumeras ideias caralho sensacional mano sensacional",
      avatar: "/media/testimonials/carlos-feedback-nw.jpg",
      type: "system-updates",
      rating: 5,
    },
    {
      name: "Community Members",
      role: "Bot Lovers",
      content:
        "Eu amo esse bot ❤️. Manda uma marmita p Léo. o bot ta fazendo a comida ou vc? Eu, ele tá caçando lá bem suave. Aí posso ficar tranquilo. Enquanto upa. Fazer um hambúrguer. Fica de boa no sofá. Amém. Mira fartura pra vc. Muita*. Ai sim em. O Bot tá deixando as pessoas bem comidas. Aqui hoje foi petisco assistindo o jogo do Botafogo kk",
      avatar: "/media/testimonials/testimonial-vinicius.png",
      type: "community-love",
      rating: 5,
    },
    {
      name: "Edson",
      role: "System Analyst",
      content:
        "Então... Comparando o Kizu bot de início com esse atual de agora (atualizações) eu gostei muito do painel ficou mais organizado e mais fácil de entender no início era hardcore hahahah você lembra. A IA ficou mais aprimorada principalmente em Hunt e Farm de itens isso eu gostei também gostei das novas opções que deixaram ela mais legit. Única coisa que me incomoda ksksksk e eu sempre te falei dês do começo e ela não respeitar ou esperar o limite de Pokémon do lure, mas quando eu fiz a configuração que me indicaram isso parou de me incomodar. Antes era complicado porque tava no início da IA tinha uns Bug ou queda era travado as máquinas. Hoje em dia eu achei tranquilo",
      avatar: "/media/feedbacks/feedback-edson.jpg",
      type: "system-evolution",
      rating: 5,
    },
    {
      name: "Multiple Shiny Hunter",
      role: "Raichu Collector",
      content:
        "shinyDetected ~ shiny Pikachu, shinyDetected ~ shiny Raichu, shinyDetected ~ shiny Pichu, pokemonCaught ~ I've caught raichu. vou la conferir 👀👀👀👀 nem fudendo pqp KKKKKKKKKKKKKKKKKKKK",
      avatar: "/media/results/caught-shiny-raichu.png",
      type: "multiple-shinies",
      rating: 5,
    },
    {
      name: "Beach Lifestyle User",
      role: "Freedom Seeker",
      content:
        "Eu não vendo nada na praia. Isso é uma sátira a mim. Ctz. Desde o dia que tirei foto na praia E mechendo no bot. Kkkkkk. Já teve a vez de um na represa pescando e outro na cachoeira. Esse grupo e bot tem história 😂",
      avatar: "/media/testimonials/eu-nao-vendo-arte-na-praia-mas-ja-usei-o-bot-curtindo-uma-praia.png",
      type: "lifestyle-integration",
      rating: 5,
    },
    {
      name: "Cubone Hunter",
      role: "Shiny Collector",
      content: "shinyDetected ~ shiny Cubone, pokemonCaught ~ I've caught cubone. cantou big",
      avatar: "/media/results/caught-sh-cubone.png",
      type: "rare-shiny",
      rating: 5,
    },
    {
      name: "Rapidash Trainer",
      role: "Level 100 Collector",
      content:
        "pokemonCaught Rapidash. A notificação. A captura. Shiny Rapidash Nível Necessário: 100, Preço de NPC: Inegociável, Partíde Aura: ✓",
      avatar: "/media/results/captura-shiny-rapidash.png",
      type: "high-level-catch",
      rating: 5,
    },
    {
      name: "Smartwatch User",
      role: "Wearable Tech Enthusiast",
      content: "KizuBot Mundo dropRare Darkness Stone. kkkk. Recebendo notificações do bot direto no relógio!",
      avatar: "/media/testimonials/alarme-no-relogio.jpg",
      type: "wearable-integration",
      rating: 5,
    },
    {
      name: "Testador KizuBot",
      role: "Beta Tester",
      content: "APROVADO! Testador KizuBot oficial. Sistema funcionando perfeitamente!",
      avatar: "/media/testimonials/aprovado.png",
      type: "beta-approval",
      rating: 5,
    },
    {
      name: "Usuário do Telegram",
      role: "Telegram Enthusiast",
      content: "O usuário ficou fascinado pela função de responder PM pelo Telegram. Poder controlar tudo direto pelo Telegram é outro nível!",
      avatar: "/media/feedbacks/o-usuario-ficou-fascinado-pela-funcao-de-responder-pm-pelo-telegram.png",
      type: "telegram-feature",
      rating: 5,
    },
    {
      name: "Programador Impressionado",
      role: "Developer",
      content: "Perguntou a quantos anos o Big é programador. Achou demais o bot, ficou impressionado com a qualidade do código e das funcionalidades!",
      avatar: "/media/feedbacks/perguntou-a-quantos-anos-o-big-e-programador-achou-demais-o-bot.mp4",
      type: "dev-impressed",
      rating: 5,
    },
    {
      name: "Novo Usuário",
      role: "Aprendiz",
      content: "Achou o bot completo e está aprendendo a usar todas as funcionalidades. Cada dia descobre algo novo!",
      avatar: "/media/feedbacks/usuario-achou-o-bot-completo-e-esta-aprendendo.png",
      type: "learning-user",
      rating: 5,
    },
    {
      name: "Jonathan Mendonça",
      role: "Detalhista / KizuBot PXG",
      content:
        "Avaliação Geral: ⭐⭐⭐⭐⭐. O bot entrega exatamente o que promete e é o melhor da atualidade pela dinâmica dentro do PXG. Pontos positivos: eficiência (resultado prometido com alta performance), intuitividade (fácil de entender), indicação para players sérios. Pontos de atenção: VNC atual tem latência/ping alto e resolução baixa (700 MB de banda fibra). Sugere atualizar materiais de apoio (tutoriais) conforme novo design para facilitar onboarding. Considerações finais: feedback dado porque Big Léo valoriza a voz do cliente; vai renovar e indicar para amigos.",
      avatar: "/media/feedbacks/feedback-jhon.jpeg",
      type: "detailed-review",
      rating: 5,
    },
    {
      name: "Cliente Boss Hunter",
      role: "Boss Drop Specialist",
      content:
        "Bom dia! Só compartilhar mesmo... ontem e hoje rendendo. Boss Tangrowth detectado, dropRare Gaia Tentacles. Boss Electivire detectado, dropRare Electirizer e Max Volt Paw!",
      avatar: "/media/testimonials/feedback-de-drops-de-boss.jpeg",
      type: "boss-drops",
      rating: 5,
    },
    {
      name: "Murilo Alexandre Ferreira",
      role: "Cliente KizuBot PxG",
      content:
        "Bom comecei a usar bem msm ontem, vamos dizer que 24 hrs de uso. De 24 hrs apenas 8 horas parado. Morreu cedo aí ficou off. E alguns itens não configurei preço. Jogo no soul o kk tá em torno de 7,00 +-. 16 hrs de bot em 1 dia. R$ 32,51 de lucro!",
      avatar: "/media/testimonials/fez-32-reais-100-porcento-ausente-em-16h.jpeg",
      type: "daily-profit",
      rating: 5,
    },
    {
      name: "Cliente Atualizado",
      role: "Update Enthusiast",
      content:
        "Léo ficou top, fiquei olhando uns 10 minutos não vi dar Lost em nenhum poke. Gravei +- a Hunt só pra testar msm, mas tá top. Bot tá cada dia melhor, parabéns!",
      avatar: "/media/testimonials/usuario extremamente feliz com as atualizações constantes do kizubot.png",
      type: "constant-updates",
      rating: 5,
    },
    {
      name: "Cliente Xbox Gamer",
      role: "Dual-Screen Player",
      content:
        "Mas esse bot é um roubo. Faz tudo a desgraça. Podia tbm dividir a tela da tv p eu deixar rodando e jogar Xbox 🤣🤣🤣",
      avatar: "/media/feedbacks/esse-bot-tem-tudo-feedback.png",
      type: "dual-activity",
      rating: 5,
    },
    {
      name: "Caio Vinicius",
      role: "Mato Farmer",
      content:
        "Se quiser mostrar pra galera, 1 mês pegando mato, 91kk esperado + tudo aquilo de chemical ainda pra pôr (só não coloco pq já tem mt chemical no market) + 190 dd q já comprei com o cash e tinha mais 790 dd q já passei pra comprar umas coisas. Sem contar q teve mt gasto comprando os itens né.",
      avatar: "/media/feedbacks/feedback-caio-vinicius-mato-91kk.jpeg",
      type: "high-profit",
      rating: 5,
    },
    {
      name: "Matheus F.",
      role: "Cliente Satisfeito",
      content:
        "Tô gostando muito. Tá farmando automático pra mim enquanto eu fico na main jogando de boa. Só aumentando meu lucro, e futuramente pra vender e tirar um extra. No geral, tô bastante satisfeito!! Sem comparação. É absurdo os recursos q temos disponível, não fazia ideia que tinha algo de tanta qualidade pra pxg.",
      avatar: "/media/feedbacks/feedback-matheus-f.png",
      type: "dual-activity",
      rating: 5,
    },
    {
      name: "Leonardo Menezes",
      role: "Multi-Char Farmer",
      content:
        "A licença acabou hoje e eu renovei. Deu pra farmar bem, tô usando o bot em 2 char — um pra fazer chemical e vender os dds, e outro eu tô upando ainda. Aí eu farmei uns 1700 dd no char do rainbow. Pior q teve uma semana q fiquei sem entrar pq deu problema no monitor, se não eu teria farmado mais kk.",
      avatar: "/media/feedbacks/feedback-leonardo-menezes-1700dd.jpeg",
      type: "weekly-profits",
      rating: 5,
    },
    {
      name: "Nathan Dias",
      role: "Cliente KizuBot PxG",
      content:
        "Tá top o bot viu, vlw aí! Arcanine rápido e a conta com botinha da Mewtwo, os poke ficavam longe. Só preciso fazer mais waypoints depois.",
      avatar: "/media/testimonials/nathan-dias-bot-top-waypoints.jpeg",
      type: "feedback",
      rating: 5,
    },
    {
      name: "Nathan Dias",
      role: "Hunter Legit",
      content:
        "Tô assistindo na cam aqui, parece player demais kkk. Já tá 30 min na hunt e nem morre. Esses avisos do site é top também — quando chega mensagem ou dropa algo, ele fala certinho. Chegou umas mudanças top de verdade!",
      avatar: "/media/testimonials/nathan-dias-parece-player-avisos-top.jpeg",
      type: "alarm-system",
      rating: 5,
    },
    {
      name: "Mazur (PL)",
      role: "Cliente Internacional",
      content:
        "O bot é muito bom, espero não ser banido nesses 30 dias :ss. Tem que ver se tá configurado certinho. KizuBot já cruzou fronteiras — cliente da Polônia rodando suave no PXG.",
      avatar: "/media/testimonials/cliente-pl-bot-muito-bom-sem-ban.jpeg",
      type: "international-client",
      rating: 5,
    },
    {
      name: "Alan Herrera",
      role: "Cliente Internacional",
      content:
        "Ah muy bien, si el panel que pusieron esta muy top poder abrir vnc rapidamente ahi, puedo contestar rapido sin tener que abrir el programa. Se ve el tiempo y esfuerzo que le dedicaron esta muy intuitivo, nuevamente muchas gracias por tu tiempo.",
      avatar: "/media/testimonials/cliente-mx-alan-herrera-painel-vnc.jpeg",
      type: "international-client",
      rating: 5,
    },
    {
      name: "Lorde Tyrael",
      role: "Membro da Comunidade",
      content: "bot faz isso",
      avatar: "/media/testimonials/lorde-tyrael-bot-faz-isso.jpeg",
      type: "account-safety",
      rating: 5,
    },
    {
      name: "Xandy",
      role: "Cliente KizuBot PxG",
      content: "slk esse novo bot ta mt bom msm",
      avatar: "/media/testimonials/xandy-novo-bot-mt-bom.jpeg",
      type: "account-safety",
      rating: 5,
    },
    {
      name: "pilotti",
      role: "Membro da Comunidade",
      content: "com o bot novo",
      avatar: "/media/testimonials/pilotti-com-o-bot-novo.jpeg",
      type: "account-safety",
      rating: 5,
    },
    {
      name: "Xandy",
      role: "Cliente KizuBot PxG",
      content: "ta safe, garantiram p mim q o bot não faria isso",
      avatar: "/media/testimonials/xandy-bot-nao-faria-isso-safe.jpeg",
      type: "account-safety",
      rating: 5,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "shiny-catch":
        return "border-yellow-400/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
      case "staff-success":
        return "border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-900/20 to-cyan-900/20"
      case "family-time":
        return "border-green-400/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      case "alarm-system":
        return "border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
      case "returning-user":
        return "border-pink-400/50 bg-gradient-to-br from-pink-900/20 to-rose-900/20"
      case "multi-server":
        return "border-emerald-400/50 bg-gradient-to-br from-emerald-900/20 to-green-900/20"
      case "waiting-list":
        return "border-yellow-400/50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
      case "farming-stats":
        return "border-emerald-400/50 bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
      case "professional-dev":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "lifestyle-freedom":
        return "border-orange-400/50 bg-gradient-to-br from-orange-900/20 to-red-900/20"
      case "rare-drops":
        return "border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20"
      case "mobile-convenience":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "mobile-farming":
        return "border-lime-400/50 bg-gradient-to-br from-lime-900/20 to-green-900/20"
      case "life-changing":
        return "border-rose-400/50 bg-gradient-to-br from-rose-900/20 to-pink-900/20"
      case "security-focused":
        return "border-slate-400/50 bg-gradient-to-br from-slate-900/20 to-gray-900/20"
      case "high-profit":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
      case "boss-hunting":
        return "border-red-400/50 bg-gradient-to-br from-red-900/20 to-orange-900/20"
      case "dev-appreciation":
        return "border-teal-400/50 bg-gradient-to-br from-teal-900/20 to-cyan-900/20"
      case "afk-success":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
      case "system-improvement":
        return "border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"
      case "long-term-success":
        return "border-green-400/50 bg-gradient-to-br from-green-900/20 to-lime-900/20"
      case "weekly-profits":
        return "border-yellow-400/50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
      case "perfection-praise":
        return "border-pink-400/50 bg-gradient-to-br from-pink-900/20 to-rose-900/20"
      case "wish-bought-earlier":
        return "border-orange-400/50 bg-gradient-to-br from-orange-900/20 to-red-900/20"
      case "alarm-upgrade":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "market-impact":
        return "border-emerald-400/50 bg-gradient-to-br from-emerald-900/20 to-green-900/20"
      case "config-improvements":
        return "border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"
      case "multi-account":
        return "border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-900/20 to-rose-900/20"
      case "strategic-vision":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
      case "dual-activity":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "trading-strategy":
        return "border-orange-400/50 bg-gradient-to-br from-orange-900/20 to-red-900/20"
      case "daily-earnings":
        return "border-green-400/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      case "stability-praise":
        return "border-teal-400/50 bg-gradient-to-br from-teal-900/20 to-cyan-900/20"
      case "feature-improvements":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "veteran-comparison":
        return "border-rose-400/50 bg-gradient-to-br from-rose-900/20 to-pink-900/20"
      case "monthly-balance":
        return "border-lime-400/50 bg-gradient-to-br from-lime-900/20 to-green-900/20"
      case "account-safety":
        return "border-green-400/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      case "market-profits":
        return "border-yellow-400/50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20"
      case "shiny-excitement":
        return "border-orange-400/50 bg-gradient-to-br from-orange-900/20 to-red-900/20"
      case "system-updates":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-orange-900/20"
      case "community-love":
        return "border-pink-400/50 bg-gradient-to-br from-pink-900/20 to-rose-900/20"
      case "system-evolution":
        return "border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"
      case "multiple-shinies":
        return "border-yellow-400/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
      case "lifestyle-integration":
        return "border-cyan-400/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
      case "rare-shiny":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
      case "high-level-catch":
        return "border-red-400/50 bg-gradient-to-br from-red-900/20 to-orange-900/20"
      case "wearable-integration":
        return "border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-900/20 to-cyan-900/20"
      case "beta-approval":
        return "border-emerald-400/50 bg-gradient-to-br from-emerald-900/20 to-green-900/20"
      case "telegram-feature":
        return "border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-sky-900/20"
      case "dev-impressed":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-orange-900/20"
      case "learning-user":
        return "border-lime-400/50 bg-gradient-to-br from-lime-900/20 to-emerald-900/20"
      case "detailed-review":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
      case "boss-drops":
        return "border-red-400/50 bg-gradient-to-br from-red-900/20 to-orange-900/20"
      case "daily-profit":
        return "border-amber-400/50 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
      case "constant-updates":
        return "border-teal-400/50 bg-gradient-to-br from-teal-900/20 to-cyan-900/20"
      case "international-client":
        return "border-sky-400/50 bg-gradient-to-br from-sky-900/20 to-blue-900/20"
      default:
        return "border-secondary/30 bg-gradient-to-br from-secondary/15 to-accent/10"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "shiny-catch":
        return "✨"
      case "staff-success":
        return "👑"
      case "family-time":
        return "👨‍👩‍👧‍👦"
      case "alarm-system":
        return "🔔"
      case "returning-user":
        return "🔄"
      case "multi-server":
        return "🌐"
      case "waiting-list":
        return "⏳"
      case "farming-stats":
        return "📊"
      case "professional-dev":
        return "👨‍💻"
      case "lifestyle-freedom":
        return "🏖️"
      case "rare-drops":
        return "💎"
      case "mobile-convenience":
        return "⌚"
      case "mobile-farming":
        return "📱"
      case "life-changing":
        return "🌟"
      case "security-focused":
        return "🛡️"
      case "high-profit":
        return "💰"
      case "boss-hunting":
        return "🐉"
      case "dev-appreciation":
        return "👏"
      case "afk-success":
        return "😴"
      case "system-improvement":
        return "⚡"
      case "long-term-success":
        return "📈"
      case "weekly-profits":
        return "💵"
      case "perfection-praise":
        return "🎯"
      case "wish-bought-earlier":
        return "😅"
      case "alarm-upgrade":
        return "🔊"
      case "market-impact":
        return "📉"
      case "config-improvements":
        return "⚙️"
      case "multi-account":
        return "👥"
      case "strategic-vision":
        return "🎯"
      case "dual-activity":
        return "🏋️"
      case "trading-strategy":
        return "🍇"
      case "daily-earnings":
        return "💸"
      case "stability-praise":
        return "🛡️"
      case "feature-improvements":
        return "🔧"
      case "veteran-comparison":
        return "🏆"
      case "monthly-balance":
        return "📊"
      case "account-safety":
        return "🛡️"
      case "market-profits":
        return "💰"
      case "shiny-excitement":
        return "✨"
      case "system-updates":
        return "🚀"
      case "community-love":
        return "❤️"
      case "system-evolution":
        return "📈"
      case "multiple-shinies":
        return "🌟"
      case "lifestyle-integration":
        return "🏖️"
      case "rare-shiny":
        return "💎"
      case "high-level-catch":
        return "🏆"
      case "wearable-integration":
        return "⌚"
      case "beta-approval":
        return "✅"
      case "telegram-feature":
        return "📲"
      case "dev-impressed":
        return "🤯"
      case "learning-user":
        return "📚"
      case "detailed-review":
        return "🧠"
      case "boss-drops":
        return "🐉"
      case "daily-profit":
        return "💵"
      case "constant-updates":
        return "🔄"
      case "international-client":
        return "🌍"
      default:
        return "💬"
    }
  }

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, DESKTOP_DISPLAY_COUNT)

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-responsive">
        <div className="text-center mb-8 md:mb-16">
          <p className="section-tag">{"* "} TESTIMONIALS</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Depoimentos Reais
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
          >
            Mais de 500 usuários ativos confiam no KizuBot. Veja suas experiências reais e resultados impressionantes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${getTypeColor(testimonial.type)} border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group${!showAll && index >= MOBILE_DISPLAY_COUNT ? " hidden md:block" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl" title={testimonial.type}>
                  {getTypeIcon(testimonial.type)}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <Quote className="w-8 h-8 text-primary mb-4 group-hover:text-secondary transition-colors" />

              <p className="text-foreground/90 mb-6 text-sm leading-relaxed line-clamp-4 group-hover:text-foreground transition-colors">
                {testimonial.content}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="relative">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} - ${testimonial.role}`}
                    width={40}
                    height={40}
                    sizes="40px"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && testimonials.length > MOBILE_DISPLAY_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              size="lg"
              variant="outline"
              className="btn-secondary text-lg px-6 sm:px-8 py-4 h-auto whitespace-normal max-w-full"
            >
              <ChevronDown className="w-5 h-5 mr-2" />
              Ver Mais Depoimentos (<span className="md:hidden">{testimonials.length - MOBILE_DISPLAY_COUNT}</span><span className="hidden md:inline">{testimonials.length - DESKTOP_DISPLAY_COUNT}</span> restantes)
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Junte-se a mais de 500 usuários satisfeitos</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experimente o KizuBot e veja por que somos a escolha #1 para automação no PokeXGames
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {/* Core tags - always visible */}
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              500+ Usuários Ativos
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-fuchsia-400 rounded-full"></span>
              Milhares de Shinies Capturados
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Sistema de Alarme 24/7
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Estatísticas de Farming
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Alto Lucro
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
              Foco em Segurança
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Liberdade de Estilo de Vida
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
              Drop de Itens Raros
            </span>
            {/* Extended tags - hidden on mobile to avoid scroll fatigue */}
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Conveniência Móvel
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Caçador de Bosses
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Sucesso AFK
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Desenvolvimento Profissional
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Sucesso a Longo Prazo
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Amor pela Comunidade
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Estabilidade
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              Mudança de Vida
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
