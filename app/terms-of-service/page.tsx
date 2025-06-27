import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Shield,
  AlertTriangle,
  Users,
  CreditCard,
  Ban,
  Scale,
  RefreshCw,
  Server,
  Database,
  Bell,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termos de Serviço - KizuBot",
  description: "Termos de Serviço do KizuBot - Termos legais e condições para uso do nosso serviço de bot",
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="container-responsive section-padding">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Termos de Serviço</h1>
            <p className="text-lg text-muted-foreground text-pretty">Última atualização: 26 de Agosto de 2026</p>
            <p className="text-base text-muted-foreground mt-2 text-pretty">
              Por favor, leia estes termos cuidadosamente antes de usar os serviços do KizuBot
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>
                  Bem-vindo ao KizuBot. Estes Termos de Serviço ("Termos") regem o seu acesso e uso de todos os produtos
                  e serviços do KizuBot, incluindo o software do bot, nosso painel web ("Dashboard"), APIs e todos os
                  sites associados (coletivamente, o "Serviço"). Ao comprar, acessar ou usar o Serviço, você concorda em
                  se vincular a estes Termos.
                </p>
                <p className="font-semibold text-foreground">
                  Se você não concordar com estes Termos, não use o Serviço.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Service Definition */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">1. Definição do Serviço</CardTitle>
                    <CardDescription className="text-base">O que o KizuBot oferece</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  O KizuBot é um software de automação de terceiros projetado para interagir com o jogo online
                  PokeXGames. O Serviço consiste em um conjunto de ferramentas que trabalham em conjunto para fornecer
                  funcionalidades de automação:
                </p>

                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Software de Automação</h3>
                      <p className="text-sm text-muted-foreground">
                        O núcleo do sistema, responsável por executar as tarefas de automação no jogo, incluindo
                        navegação, combate, coleta de recursos e outras funcionalidades programadas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Painel de Controle</h3>
                      <p className="text-sm text-muted-foreground">
                        Interface web onde os usuários podem criar contas, gerenciar múltiplos perfis de personagens e
                        configurar detalhadamente cada módulo de automação. Todas as configurações são armazenadas de
                        forma segura.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Sistema de Notificações</h3>
                      <p className="text-sm text-muted-foreground">
                        Serviço especializado que gerencia alertas e notificações em tempo real. Quando eventos críticos
                        são detectados, o sistema pode notificar o usuário através de diversos canais, incluindo
                        WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-semibold text-foreground mt-4">
                  O KizuBot é uma ferramenta de terceiros e não é afiliado, endossado ou conectado ao PokeXGames ou seus
                  desenvolvedores.
                </p>
              </CardContent>
            </Card>

            {/* Eligibility and User Accounts */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">2. Elegibilidade e Contas de Usuário</CardTitle>
                    <CardDescription className="text-base">Requisitos para uso do serviço</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">2.1. Idade</h3>
                  <p>Você deve ter pelo menos 18 anos de idade para usar o Serviço.</p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">2.2. Registro de Conta</h3>
                  <p>
                    Para acessar o Serviço, você deve criar uma conta em nosso Dashboard. Você concorda em fornecer
                    informações precisas, completas e atualizadas durante o processo de registro. Você é responsável por
                    manter a confidencialidade de sua senha e conta.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">2.3. Responsabilidade da Conta</h3>
                  <p>
                    Você é o único responsável por todas as atividades que ocorrem em sua conta. Você concorda em nos
                    notificar imediatamente sobre qualquer uso não autorizado de sua conta.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">2.4. Múltiplos Perfis (Personagens)</h3>
                  <p>
                    Sua conta do KizuBot pode gerenciar múltiplos perfis de personagens. Cada perfil é uma configuração
                    distinta associada a um personagem do jogo. A criação e o gerenciamento desses perfis são de sua
                    responsabilidade.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage and Conduct */}
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">3. Uso do Serviço e Conduta</CardTitle>
                    <CardDescription className="text-base">
                      Informações importantes sobre o uso de ferramentas de automação
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.1. Conformidade com as Regras do Jogo</h3>
                  <p>
                    O KizuBot é uma ferramenta de automação de terceiros. O uso de bots, scripts ou qualquer forma de
                    automação é estritamente contra os Termos de Serviço do PokeXGames. Você reconhece e aceita que o
                    uso do KizuBot viola as regras do jogo e acarreta riscos significativos.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.2. Risco de Sanções no Jogo</h3>
                  <p>
                    Você entende e assume total responsabilidade pelo risco de sanções em sua conta do PokeXGames,
                    incluindo, mas não se limitando a, suspensões temporárias ou banimento permanente.
                  </p>
                  <p className="font-semibold text-foreground">
                    O KizuBot não é responsável por nenhuma ação disciplinar tomada pelos administradores do PokeXGames
                    contra sua conta de jogo.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.3. Uso Aceitável</h3>
                  <p>Você concorda em não usar o Serviço para:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Violar qualquer lei ou regulamento aplicável</li>
                    <li>Distribuir, vender, sublicenciar ou compartilhar sua conta KizuBot com terceiros</li>
                    <li>
                      Tentar fazer engenharia reversa, descompilar ou desmontar qualquer parte do software do KizuBot
                    </li>
                    <li>
                      Usar o Serviço para qualquer finalidade maliciosa, incluindo assédio a outros jogadores ou
                      exploração de bugs do jogo
                    </li>
                    <li>Sobrecarregar ou interromper a integridade de nossos servidores e infraestrutura</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payments and Subscriptions */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">4. Pagamentos, Assinaturas e Reembolsos</CardTitle>
                    <CardDescription className="text-base">Termos de cobrança e pagamento</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.1. Assinaturas</h3>
                  <p>
                    O acesso ao KizuBot é baseado em um modelo de assinatura. As taxas, a duração e os recursos de cada
                    plano de assinatura estão descritos em nossa página de preços.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.2. Pagamentos</h3>
                  <p>
                    Todos os pagamentos são processados por meio de provedores de pagamento de terceiros (por exemplo,
                    Stripe). Ao fornecer informações de pagamento, você declara que está autorizado a usar o método de
                    pagamento designado.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.3. Política de Reembolso e Compensação</h3>
                  <p>
                    O KizuBot opera sob uma política estrita de{" "}
                    <strong className="text-foreground">não reembolso</strong>. Ao comprar o serviço, você concorda que
                    não terá direito a um reembolso monetário em situações como insatisfação pessoal, banimento de sua
                    conta de jogo, instabilidades temporárias do serviço ou erros de configuração do usuário.
                  </p>
                  <p>
                    Em casos de interrupções prolongadas do serviço causadas por nossa infraestrutura, podemos oferecer
                    compensação na forma de dias de serviço adicionais, a nosso exclusivo critério.
                  </p>
                  <p className="mt-3">
                    Você pode consultar a política completa aqui:{" "}
                    <Link href="/refunds" className="text-primary hover:underline font-semibold">
                      Política de Reembolso e Compensação do KizuBot
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">5. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Todo o software, design, texto, gráficos, logos e a seleção e arranjo dos mesmos contidos no Serviço
                  são de propriedade do KizuBot ou de seus licenciadores e são protegidos por leis de direitos autorais
                  e outras leis de propriedade intelectual.
                </p>
                <p>
                  Você recebe uma licença limitada, não exclusiva, intransferível e revogável para usar o Serviço para
                  seu uso pessoal e não comercial, sujeito a estes Termos.
                </p>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">6. Disponibilidade do Serviço e Modificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.1. Uptime</h3>
                  <p>
                    Nós nos esforçamos para garantir a alta disponibilidade do Serviço, mas não garantimos que ele será
                    ininterrupto ou livre de erros. Períodos de manutenção planejada ou emergencial podem ocorrer.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.2. Adaptação a Atualizações do Jogo</h3>
                  <p>
                    O PokeXGames pode atualizar seu cliente de jogo, mecânicas ou sistemas anti-bot a qualquer momento.
                    Embora nos esforcemos para adaptar o KizuBot a essas mudanças o mais rápido possível, podem ocorrer
                    períodos de incompatibilidade temporária. Tais períodos não são elegíveis para reembolso, mas podem
                    ser considerados para compensação de serviço em casos extremos.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.3. Modificações no Serviço</h3>
                  <p>
                    Reservamo-nos o direito de modificar, suspender ou descontinuar, temporária ou permanentemente, o
                    Serviço (ou qualquer parte dele) com ou sem aviso prévio.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">7. Privacidade e Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">7.1. Coleta de Dados</h3>
                  <p>
                    Para fornecer e melhorar o Serviço, coletamos certos dados, incluindo, mas não se limitando a:
                    informações da sua conta (login, nickname), configurações do bot, dados do personagem no jogo
                    (nível, experiência, etc.) e informações de hardware anonimizadas (HWID) para fins de segurança e
                    limitação de dispositivos.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">7.2. Uso dos Dados</h3>
                  <p>
                    Usamos esses dados para operar o Serviço, fornecer suporte ao cliente, monitorar a saúde do sistema
                    e aplicar estes Termos. Não compartilharemos seus dados pessoais com terceiros, exceto quando
                    exigido por lei.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">7.3. Uso das APIs do YouTube e TikTok</h3>
                  <p>
                    O Serviço utiliza o YouTube API Services e a API de postagem de conteúdo do TikTok exclusivamente
                    como integração interna e de primeira parte: o KizuBot publica e agenda conteúdo apenas em seus
                    próprios canais/contas oficiais, operados unicamente pela equipe do KizuBot. Usuários finais não
                    conectam suas próprias contas do YouTube ou do TikTok ao Serviço. O KizuBot cumpre os{" "}
                    <a
                      href="https://www.youtube.com/t/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Serviço do YouTube
                    </a>{" "}
                    e os{" "}
                    <a
                      href="https://www.tiktok.com/legal/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Serviço do TikTok
                    </a>
                    , além das leis e políticas de cada plataforma. Detalhes sobre quais dados são acessados,
                    armazenados e como a equipe do KizuBot pode revogar o acesso estão descritos em nossa{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
                      Política de Privacidade
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">8. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="font-semibold text-foreground uppercase">
                  NA EXTENSÃO MÁXIMA PERMITIDA PELA LEI, O SERVIÇO KIZUBOT É FORNECIDO "COMO ESTÁ" E "CONFORME
                  DISPONÍVEL". O KIZUBOT RENUNCIA A TODAS AS GARANTIAS, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE
                  LIMITANDO A, GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO VIOLAÇÃO.
                </p>
                <p className="font-semibold text-foreground uppercase">
                  O KIZUBOT NÃO SERÁ RESPONSÁVEL POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS
                  OU PUNITIVOS, INCLUINDO PERDA DE LUCROS, DADOS, USO, BOA VONTADE OU OUTRAS PERDAS INTANGÍVEIS,
                  RESULTANTES DE:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Seu acesso ou uso ou incapacidade de acessar ou usar o Serviço</li>
                  <li>Qualquer sanção (incluindo banimento) imposta pelos administradores do PokeXGames</li>
                  <li>Qualquer conduta ou conteúdo de terceiros no Serviço</li>
                </ul>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Ban className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">9. Rescisão</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Reservamo-nos o direito de suspender ou rescindir seu acesso ao Serviço imediatamente, sem aviso
                  prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes
                  Termos.
                </p>
                <p>Após a rescisão, seu direito de usar o Serviço cessará imediatamente.</p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">10. Alterações nos Termos</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Podemos modificar estes Termos a qualquer momento. Se fizermos alterações, publicaremos os Termos
                  revisados em nosso site e atualizaremos a data da "Última atualização".
                </p>
                <p>
                  Seu uso continuado do Serviço após a publicação dos Termos revisados constitui sua aceitação das
                  alterações.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">11. Lei Aplicável e Disputas</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar conflitos
                  de princípios legais. Quaisquer disputas decorrentes destes Termos ou do uso do Serviço serão
                  resolvidas nos tribunais do Brasil.
                </p>
                <p>
                  Você concorda em primeiro tentar resolver quaisquer disputas informalmente entrando em contato com
                  nossa equipe de suporte antes de iniciar qualquer processo legal formal.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">12. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através dos nossos
                  canais oficiais de suporte.
                </p>
                <p className="mt-3 font-semibold text-foreground">
                  Ao usar o KizuBot, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos de
                  Serviço.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Pronto para Começar?</h3>
                  <p className="text-muted-foreground">
                    Revise nossos planos de preços e política de reembolso antes de comprar
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="btn-primary">
                      <Link href="/#pricing">Ver Planos de Preços</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/refunds">Política de Reembolso</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/">Voltar ao Início</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
