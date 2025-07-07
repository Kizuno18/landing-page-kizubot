import { AlertTriangle, Shield, Bell, Ban, Link2, TrendingDown, Home, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dicas de Segurança - KizuBot",
  description:
    "Guia de segurança e melhores práticas para uso do KizuBot - Proteja sua conta e maximize sua experiência",
}

export default function TipsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-card to-background border-b border-primary">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 text-balance">
              Guia de Segurança e Melhores Práticas
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
              Informações essenciais para proteger sua conta e maximizar sua experiência com o bot de forma segura
            </p>
          </div>
        </section>

        {/* Critical Warning */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Alert className="border-red-500 bg-red-950/30 mb-12">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-400 text-xl font-bold">Aviso Crítico</AlertTitle>
              <AlertDescription className="text-gray-300 text-base mt-2">
                Embora o KizuBot seja considerado "indetectável por sistemas automáticos", isso não significa que você
                está imune a banimentos. A PXG proíbe expressamente o uso de qualquer software que ofereça vantagem
                injusta sobre outros jogadores, incluindo bots e macros. Todos os banimentos são atualmente realizados
                manualmente por Game Masters através de observação comportamental e denúncias de jogadores.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* How Bans Occur */}
        <section className="py-12 px-4 bg-[rgba(0,0,0,0.3)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Como Ocorrem os Banimentos</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entender os métodos de detecção é crucial para se manter seguro
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-black/70 border-primary">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Ban className="w-6 h-6" />
                    Métodos de Detecção Manual
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="font-semibold text-white">Banimentos são realizados manualmente através de:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Observação comportamental por Game Masters (GMs)</li>
                    <li>Monitoramento e vigilância de administradores</li>
                    <li>Denúncias e reports de jogadores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black/70 border-primary">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Comportamentos Suspeitos de Bots
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="font-semibold text-white">Bots não se comportam 100% humanos porque:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Repetem padrões de movimentação consistentemente</li>
                    <li>Permanecem no mesmo local por períodos prolongados</li>
                    <li>Executam ações com intervalos exatos</li>
                    <li>Não respondem a interações no chat</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-yellow-500 bg-yellow-950/20">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <AlertTitle className="text-yellow-400 text-lg font-bold">Exemplo Clássico</AlertTitle>
              <AlertDescription className="text-gray-300 text-base mt-2">
                Um personagem farmando por mais de 10 horas no mesmo respawn é extremamente incomum para jogadores
                humanos. Esse comportamento atrai a atenção de GMs, que podem aparecer pessoalmente (visível ou
                invisível) para verificar a situação. A falta de resposta pode confirmar o uso de bot e resultar em
                banimento imediato.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Alarm System */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Sistema de Alarme é Essencial</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Proteja-se da detecção com alertas em tempo real
              </p>
            </div>

            <Card className="bg-black/70 border-primary mb-8">
              <CardHeader>
                <CardTitle className="text-primary text-2xl">Configure Alarmes Para:</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Shield className="w-5 h-5 text-primary" />
                      Detecção de STAFF
                    </div>
                    <p className="text-sm">Alerta quando um membro da STAFF entra na sua tela</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Proximidade de Jogador
                    </div>
                    <p className="text-sm">Alerta quando outro jogador se aproxima</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Detecção de Inatividade
                    </div>
                    <p className="text-sm">Alerta quando o personagem fica parado por muito tempo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-blue-500 bg-blue-950/20">
              <Bell className="h-5 w-5 text-blue-400" />
              <AlertTitle className="text-blue-400 text-lg font-bold">Notificações via WhatsApp</AlertTitle>
              <AlertDescription className="text-gray-300 text-base mt-2">
                O sistema de notificações via WhatsApp é totalmente configurável através do painel de controle. Para
                configurar e ativar as notificações, siga o tutorial completo disponível no painel, que explica passo a
                passo como conectar seu WhatsApp e personalizar os alertas de acordo com suas necessidades.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* If Banned */}
        <section className="py-12 px-4 bg-[rgba(0,0,0,0.3)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Ban className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Se Você For Banido</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entenda o que realmente afeta suas outras contas
              </p>
            </div>

            <Card className="bg-black/70 border-red-500 mb-8">
              <CardHeader>
                <CardTitle className="text-red-400 text-2xl">O Banimento Fica Isolado na Conta do Bot</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Não é necessário formatar computador, trocar de IP ou resetar sua rede
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p className="text-base">
                  Cada máquina do KizuBot roda isolada, com IP e identificador de hardware próprios, únicos por
                  personagem. Isso significa que o ambiente do bot nunca compartilha identidade com o seu computador
                  pessoal ou com outras licenças que você tenha — mesmo que todas rodem na mesma internet.
                </p>
                <div className="bg-primary/15 p-4 rounded-lg border border-primary">
                  <p className="font-semibold text-white mb-2">Se você seguiu a Regra de Ouro:</p>
                  <p className="text-sm">
                    Nunca logou a conta de bot no seu PC pessoal e nunca interagiu no jogo (casa, trade, market) entre
                    a conta banida e suas outras contas — o banimento não se propaga. Suas outras contas e seu
                    computador continuam 100% seguros, sem nenhuma ação adicional necessária.
                  </p>
                </div>
                <Alert className="border-yellow-500 bg-yellow-950/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <AlertTitle className="text-yellow-400 text-base font-bold">O único risco real</AlertTitle>
                  <AlertDescription className="text-gray-300 text-sm mt-1">
                    É ter interagido dentro do jogo entre a conta banida e outra conta (casa compartilhada, itens
                    dropados, trade direto ou no market). Nesse caso, evite repetir esse tipo de interação — o vínculo
                    vem da interação em si, não do fato de ambas terem usado o KizuBot.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chain Ban */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Link2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">O que é Chain Ban?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entendendo como contas associadas são banidas juntas
              </p>
            </div>

            <Card className="bg-black/70 border-primary mb-8">
              <CardHeader>
                <CardTitle className="text-primary text-2xl">Definição de Chain Ban</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p className="text-base">
                  Chain ban é um sistema onde várias contas conectadas direta ou indiretamente a uma conta banida também
                  são punidas, mesmo que não tenham cometido infrações.
                </p>
                <div className="bg-primary/15 p-4 rounded-lg border border-primary">
                  <p className="font-semibold text-white mb-3">Conexões que podem causar chain ban:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Compartilhar casa no jogo com outra conta</li>
                    <li>Trade direto ou movimentações suspeitas no market entre as contas</li>
                    <li>Itens dropados repassados de uma conta pra outra</li>
                    <li>Logar a conta de bot no seu computador ou rede pessoal</li>
                  </ul>
                </div>
                <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-500">
                  <p className="font-semibold text-white mb-2">Isso NÃO inclui as máquinas do KizuBot:</p>
                  <p className="text-sm">
                    Cada máquina do KizuBot tem IP e identificador de hardware únicos por personagem. Rodar 2 licenças
                    em 2 VNCs diferentes não cria nenhum vínculo entre elas — o vínculo só existe se as contas
                    interagirem entre si dentro do jogo. Ou seja, dá pra ter uma conta bot rodando e continuar jogando
                    sua conta principal no seu PC normalmente, desde que elas nunca interajam uma com a outra.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-red-500 bg-red-950/30">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-400 text-lg font-bold">Aviso Crítico</AlertTitle>
              <AlertDescription className="text-gray-300 text-base mt-2">
                Um único pequeno erro é suficiente para comprometer todas as contas associadas. Chain bans podem afetar
                sua conta principal, contas de amigos e qualquer conta que já tenha interagido no jogo com a conta
                banida.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-12 px-4 bg-[rgba(0,0,0,0.3)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Melhores Práticas e Hábitos</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Siga estas diretrizes para reduzir significativamente os riscos de detecção e banimento
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Never Share House */}
              <Card className="bg-black/70 border-primary hover:border-primary/70 transition-colors">
                <CardHeader>
                  <Home className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-primary">Nunca Compartilhe Casa</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="font-semibold text-white">Erro fatal mais comum:</p>
                  <p className="text-sm">
                    Nunca compartilhe residência no jogo com sua conta principal ou contas de amigos.
                  </p>
                  <Alert className="border-red-500 bg-red-950/20 mt-4">
                    <AlertDescription className="text-xs text-gray-300">
                      Há casos de contas com grandes quantias de moeda, sem histórico de bot, ou até mesmo amigos que
                      não usam o software, que foram banidas apenas por compartilhar uma casa com uma conta de bot.
                    </AlertDescription>
                  </Alert>
                  <p className="text-sm font-bold text-primary mt-4">
                    Regra de Ouro: Contas de bot devem morar sozinhas
                  </p>
                </CardContent>
              </Card>

              {/* Market Movements */}
              <Card className="bg-black/70 border-primary hover:border-primary/70 transition-colors">
                <CardHeader>
                  <TrendingDown className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-primary">Evite Atividade Suspeita no Market</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="font-semibold text-white">Não levante bandeiras vermelhas:</p>
                  <p className="text-sm">
                    Listar todos os itens acumulados de 5-6+ dias de farm de uma só vez é extremamente incomum para
                    jogadores humanos.
                  </p>
                  <Alert className="border-yellow-500 bg-yellow-950/20 mt-4">
                    <AlertDescription className="text-xs text-gray-300">
                      A empresa já realizou banimentos sem aviso ou prova concreta, baseando-se apenas em movimentações
                      no market.
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-bold text-primary">Melhor Prática:</p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>Venda itens gradualmente e espaçados</li>
                      <li>Simule comportamento humano</li>
                      <li>Venda um pouco por vez em dias diferentes</li>
                      <li>Varie os horários de venda</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Never Mix Accounts */}
              <Card className="bg-black/70 border-primary hover:border-primary/70 transition-colors">
                <CardHeader>
                  <Shield className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-primary">Nunca Misture Conta Principal com Máquina do Bot</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="font-semibold text-white">Separação crítica:</p>
                  <p className="text-sm">
                    A conta do bot deve ser usada exclusivamente dentro de uma Máquina Virtual (VM) com seu próprio
                    sistema, IP e configurações.
                  </p>
                  <Alert className="border-red-500 bg-red-950/20 mt-4">
                    <AlertDescription className="text-xs text-gray-300">
                      Nunca logue esta conta no seu computador pessoal, mesmo que seja apenas para checar o loot, apenas
                      por "5 minutos", ou se a VM estiver offline.
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-bold text-primary">Por que isso importa:</p>
                    <p className="text-xs">
                      Se sua conta de bot for flagrada e você não responder a um GM, todas as contas que logaram na
                      mesma máquina ficam marcadas e rastreadas, criando um efeito dominó que pode banir sua conta
                      principal e até contas de amigos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final Warning */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="border-primary bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
              <AlertTitle className="text-primary text-2xl font-bold">Lembre-se</AlertTitle>
              <AlertDescription className="text-gray-300 text-base mt-3 space-y-2">
                <p>
                  O uso de bot nunca é 100% seguro, mas seguir estas melhores práticas pode reduzir significativamente
                  seus riscos de detecção, banimento e associação com contas principais.
                </p>
                <p className="font-semibold text-white">
                  Mantenha-se vigilante, use alarmes, mantenha separação adequada entre contas e sempre simule padrões
                  de comportamento humano.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
