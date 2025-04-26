import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Reembolso - KizuBot",
  description: "Política de reembolso e compensação do KizuBot - Conheça nossos termos e condições para uso do serviço",
}

export default function RefundPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="container-responsive section-padding">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Política de Reembolso e Compensação</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Por favor, leia nossa política cuidadosamente antes de adquirir os serviços do KizuBot
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* No Refunds Section */}
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">Política de Não Reembolso</CardTitle>
                    <CardDescription className="text-base">
                      O KizuBot opera sob uma política estrita de não reembolso nas seguintes situações
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Situações Onde Reembolsos NÃO São Disponibilizados
                  </h3>
                  <ul className="space-y-3 ml-7">
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Insatisfação Pessoal:</strong> Se você simplesmente não gostar
                      do serviço, mudar de ideia ou decidir que o bot não atende às suas expectativas pessoais após a
                      compra, reembolsos não serão emitidos. Encorajamos todos os usuários a revisar nossos recursos,
                      documentação e vídeos de demonstração antes de tomar a decisão de compra.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Banimentos de Conta do Jogo:</strong> O KizuBot é uma
                      ferramenta de automação de terceiros para PokeXGames. O uso de qualquer bot carrega riscos
                      inerentes, incluindo a possibilidade de suspensão de conta ou banimento permanente pelos
                      administradores do jogo. Não somos responsáveis por quaisquer ações tomadas pelo PokeXGames contra
                      sua conta, e nenhum reembolso será fornecido em caso de banimentos, suspensões ou quaisquer outras
                      penalidades impostas pelo jogo.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Instabilidades do Serviço:</strong> Embora nos esforcemos para
                      manter 99,9% de uptime e confiabilidade do serviço, instabilidades temporárias, períodos de
                      manutenção ou problemas técnicos podem ocorrer. Essas situações não se qualificam para reembolsos.
                      No entanto, tempo de inatividade significativo pode se qualificar para compensação de serviço
                      (veja a política de compensação abaixo).
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Erro do Usuário ou Configuração Incorreta:</strong> Problemas
                      decorrentes de configuração incorreta do bot, erro do usuário, requisitos inadequados do sistema
                      ou falha em seguir as instruções de configuração não se qualificam para reembolsos. Nossa equipe
                      de suporte está disponível para ajudá-lo a configurar o bot corretamente.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Mudanças nas Mecânicas do Jogo:</strong> O PokeXGames pode
                      atualizar suas mecânicas de jogo, sistemas anti-bot ou termos de serviço a qualquer momento.
                      Embora atualizemos continuamente o KizuBot para se adaptar a essas mudanças, incompatibilidades
                      temporárias não se qualificam para reembolsos.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Compensation Policy Section */}
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">Política de Compensação de Serviço</CardTitle>
                    <CardDescription className="text-base">
                      Podemos fornecer compensação na forma de dias de serviço adicionais sob circunstâncias específicas
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Quando a Compensação Pode Ser Concedida
                  </h3>
                  <ul className="space-y-3 ml-7">
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Interrupções Prolongadas do Serviço:</strong> Se o KizuBot
                      experimentar tempo de inatividade prolongado (mais de 24 horas consecutivas) devido a problemas de
                      servidor, problemas de infraestrutura ou outras falhas técnicas de nossa parte, os usuários
                      afetados podem receber compensação na forma de dias de assinatura adicionais equivalentes ao
                      período de inatividade.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Problemas de Acesso Comprovados:</strong> Se você experimentar
                      problemas de acesso consistentes que impedem o uso do serviço, e puder fornecer evidências claras
                      (capturas de tela, logs de erro, timestamps) demonstrando que o problema se origina de nossa
                      infraestrutura em vez de sua configuração local, você pode ser elegível para compensação.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Mau Funcionamento Crítico do Bot:</strong> Em casos raros onde
                      um bug crítico ou mau funcionamento no próprio bot (não relacionado a atualizações do jogo) impede
                      a funcionalidade principal por um período prolongado, a compensação pode ser fornecida após
                      verificação por nossa equipe técnica.
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold text-lg">Como Solicitar Compensação</h3>
                  <ol className="space-y-3 ml-7 list-decimal">
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Documente o Problema:</strong> Reúna evidências abrangentes
                      incluindo capturas de tela, mensagens de erro, timestamps e descrições detalhadas do problema.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Entre em Contato com o Suporte:</strong> Envie um ticket de
                      suporte através do nosso servidor oficial do Discord ou e-mail de suporte com toda a documentação
                      relevante.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Revisão Técnica:</strong> Nossa equipe técnica revisará seu
                      caso dentro de 48-72 horas para verificar o problema e determinar a elegibilidade para
                      compensação.
                    </li>
                    <li className="text-muted-foreground">
                      <strong className="text-foreground">Aprovação de Compensação:</strong> Se aprovado, dias de
                      serviço adicionais serão adicionados à sua conta dentro de 5 dias úteis.
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 ml-4 list-disc text-muted-foreground">
                  <li>
                    Todas as decisões de compensação são feitas a critério exclusivo da equipe do KizuBot e são finais.
                  </li>
                  <li>
                    A compensação é fornecida apenas na forma de dias de serviço adicionais, nunca como reembolsos
                    monetários.
                  </li>
                  <li>
                    O abuso do sistema de solicitação de compensação pode resultar em suspensão ou rescisão da conta.
                  </li>
                  <li>
                    Esta política pode ser atualizada a qualquer momento. O uso continuado do serviço constitui
                    aceitação de quaisquer mudanças na política.
                  </li>
                  <li>
                    Ao comprar o KizuBot, você reconhece que leu, entendeu e concorda com esta política de reembolso e
                    compensação.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Dúvidas Sobre Nossa Política?</h3>
                  <p className="text-muted-foreground">
                    Se você tiver alguma dúvida ou preocupação sobre nossa política de reembolso e compensação, entre em
                    contato com nossa equipe de suporte antes de fazer uma compra.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="btn-primary">
                      <Link href="/#pricing">Ver Planos de Preços</Link>
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
