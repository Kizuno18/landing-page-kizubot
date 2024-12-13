import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Youtube, Music2, Mail } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Exclusão de Dados - KizuBot",
  description: "Como funciona a integração interna do KizuBot com YouTube e TikTok e como solicitar a exclusão dos seus dados de conta",
}

export default function DataDeletionPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="container-responsive section-padding">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Trash2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Exclusão de Dados</h1>
            <p className="text-lg text-muted-foreground text-pretty">Última atualização: 26 de Agosto de 2026</p>
            <p className="text-base text-muted-foreground mt-2 text-pretty">
              Como funciona nossa integração com YouTube e TikTok, e como solicitar a exclusão dos seus dados de conta
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>
                  Esta página explica como funciona a integração do KizuBot com o YouTube e o TikTok, e como
                  solicitar a exclusão completa dos dados de conta que armazenamos em seu nome. Para mais detalhes
                  sobre quais dados coletamos e por quanto tempo os mantemos, consulte nossa{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* YouTube / Google */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Youtube className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">1. Integração com o YouTube (Uso Interno)</CardTitle>
                    <CardDescription className="text-base">
                      Uso exclusivamente interno, restrito aos canais oficiais do KizuBot
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  A integração do KizuBot com o YouTube API Services é de uso interno: publicamos e agendamos vídeos
                  apenas nos canais oficiais do KizuBot, operados exclusivamente pela nossa equipe. Usuários finais
                  não conectam suas próprias contas do YouTube ao Serviço, então não há acesso de usuário para
                  revogar. O acesso da conta oficial do KizuBot é gerenciado pela nossa equipe em{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                  >
                    myaccount.google.com/permissions
                  </a>
                  .
                </p>
              </CardContent>
            </Card>

            {/* TikTok */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Music2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">2. Integração com o TikTok (Uso Interno)</CardTitle>
                    <CardDescription className="text-base">
                      Uso exclusivamente interno, restrito às contas oficiais do KizuBot
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  A integração do KizuBot com a API de postagem de conteúdo do TikTok também é de uso interno:
                  publicamos conteúdo apenas nas contas oficiais do KizuBot, operadas exclusivamente pela nossa
                  equipe. Usuários finais não conectam suas próprias contas do TikTok ao Serviço, então não há acesso
                  de usuário para revogar. O acesso das contas oficiais do KizuBot é gerenciado pela nossa equipe
                  diretamente nas configurações de aplicativos conectados do TikTok.
                </p>
              </CardContent>
            </Card>

            {/* Full data deletion */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">3. Solicitar a Exclusão Completa dos Seus Dados</CardTitle>
                    <CardDescription className="text-base">
                      Como pedir a remoção total dos dados da sua conta KizuBot
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Você pode solicitar a exclusão completa dos dados da sua conta KizuBot (login, e-mail, configurações
                  do bot e demais dados de conta descritos na nossa Política de Privacidade) a qualquer momento.
                </p>
                <p>
                  Para solicitar a exclusão completa desses dados, envie um e-mail para{" "}
                  <a href="mailto:contato@kizuno.net" className="text-primary hover:underline font-semibold">
                    contato@kizuno.net
                  </a>{" "}
                  informando sua conta e o pedido de exclusão de dados.
                </p>
                <p className="font-semibold text-foreground">
                  Seus dados serão apagados em até 30 dias a partir da solicitação.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Documentos Relacionados</h3>
                  <p className="text-muted-foreground">
                    Leia também nossos outros documentos legais para entender completamente nossos serviços
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="btn-primary">
                      <Link href="/privacy-policy">Política de Privacidade</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/terms-of-service">Termos de Serviço</Link>
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
