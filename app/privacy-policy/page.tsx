import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, Cookie, FileText, Mail, Server, AlertCircle, Youtube } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade - KizuBot",
  description: "Política de Privacidade do KizuBot - Como coletamos, usamos e protegemos seus dados",
}

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <div className="container-responsive section-padding">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Política de Privacidade</h1>
            <p className="text-lg text-muted-foreground text-pretty">Última atualização: 26 de Agosto de 2026</p>
            <p className="text-base text-muted-foreground mt-2 text-pretty">
              Entenda como coletamos, usamos e protegemos suas informações pessoais
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardContent className="pt-6 space-y-3 text-muted-foreground">
                <p>
                  A privacidade dos nossos usuários é extremamente importante para nós. Esta Política de Privacidade
                  descreve como o KizuBot ("nós", "nosso" ou "nos") coleta, usa, armazena e protege suas informações
                  pessoais quando você utiliza nossos serviços, incluindo o software do bot, Dashboard (painel web),
                  APIs e sites associados (coletivamente, o "Serviço").
                </p>
                <p className="font-semibold text-foreground">
                  Ao usar o Serviço, você concorda com a coleta e uso de informações de acordo com esta política.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">1. Informações que Coletamos</CardTitle>
                    <CardDescription className="text-base">
                      Dados necessários para fornecer e melhorar nosso serviço
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">1.1. Informações de Conta</h3>
                  <p>Quando você cria uma conta no KizuBot Dashboard, coletamos:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Nome de usuário (login)</li>
                    <li>Endereço de e-mail</li>
                    <li>Senha (armazenada de forma criptografada)</li>
                    <li>Data de criação da conta</li>
                    <li>Status da assinatura e histórico de pagamentos</li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">1.2. Dados de Configuração do Bot</h3>
                  <p>Para fornecer o serviço de automação, armazenamos:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Perfis de personagens (nicknames, configurações de módulos)</li>
                    <li>Configurações de Cavebot, Healing, Combat, Farming e outros módulos</li>
                    <li>Waypoints e rotas de navegação</li>
                    <li>Listas de itens, spells e configurações de alarme</li>
                    <li>Preferências de notificação (incluindo números de WhatsApp, se configurado)</li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">1.3. Dados de Uso e Telemetria</h3>
                  <p>Para monitorar a saúde do sistema e melhorar o serviço, coletamos:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Logs de conexão do bot (horários de início/fim de sessão)</li>
                    <li>Dados de desempenho (experiência ganha, itens coletados, tempo de farm)</li>
                    <li>Informações de erro e relatórios de falhas</li>
                    <li>Versão do cliente do bot</li>
                    <li>Endereço IP (para segurança e prevenção de fraudes)</li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">1.4. Identificação de Hardware (HWID)</h3>
                  <p>
                    Para aplicar limites de dispositivos e prevenir compartilhamento não autorizado de contas, coletamos
                    um identificador único e anonimizado do hardware (HWID) do dispositivo onde o bot está sendo
                    executado.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">1.5. Informações de Pagamento</h3>
                  <p>
                    Processamos pagamentos através de provedores terceirizados seguros. Não armazenamos informações
                    completas de cartão de crédito ou dados bancários em nossos servidores. Recebemos apenas dados de
                    transação (status do pagamento, valor, data) do processador de pagamento para gerenciar sua
                    assinatura.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">2. Como Usamos Suas Informações</CardTitle>
                    <CardDescription className="text-base">Finalidades do processamento de dados</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Utilizamos as informações coletadas para:</p>
                <ul className="space-y-3 ml-6 list-disc text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Fornecer e operar o Serviço:</strong> Autenticar usuários,
                    carregar configurações do bot, executar automações e sincronizar dados entre o KizuBot Core e o
                    Dashboard.
                  </li>
                  <li>
                    <strong className="text-foreground">Processar pagamentos e gerenciar assinaturas:</strong> Validar
                    pagamentos, ativar/desativar acesso ao serviço e manter registros de transações.
                  </li>
                  <li>
                    <strong className="text-foreground">Fornecer suporte ao cliente:</strong> Responder a perguntas,
                    resolver problemas técnicos e investigar bugs reportados.
                  </li>
                  <li>
                    <strong className="text-foreground">Melhorar e desenvolver o Serviço:</strong> Analisar padrões de
                    uso, identificar áreas de melhoria e desenvolver novos recursos.
                  </li>
                  <li>
                    <strong className="text-foreground">Garantir segurança e prevenir fraudes:</strong> Detectar e
                    prevenir uso não autorizado, compartilhamento de contas e atividades maliciosas.
                  </li>
                  <li>
                    <strong className="text-foreground">Aplicar nossos Termos de Serviço:</strong> Monitorar
                    conformidade com nossas políticas e tomar ações apropriadas em caso de violações.
                  </li>
                  <li>
                    <strong className="text-foreground">Comunicar com você:</strong> Enviar notificações importantes
                    sobre o serviço, atualizações, manutenções programadas e mudanças em nossas políticas.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Storage and Security */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">3. Armazenamento e Segurança de Dados</CardTitle>
                    <CardDescription className="text-base">Como protegemos suas informações</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.1. Onde Armazenamos Seus Dados</h3>
                  <p>Seus dados são armazenados em:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>
                      <strong className="text-foreground">Banco de Dados Seguro:</strong> Hospedado em servidores
                      protegidos, armazena informações de conta, configurações do bot e dados de telemetria.
                    </li>
                    <li>
                      <strong className="text-foreground">Servidores Web:</strong> Hospeda o painel de controle e
                      serviços relacionados, com infraestrutura distribuída globalmente para melhor desempenho.
                    </li>
                    <li>
                      <strong className="text-foreground">Servidores de Aplicação:</strong> Onde o software de automação
                      é executado, armazenando temporariamente configurações em cache durante a sessão ativa.
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.2. Medidas de Segurança</h3>
                  <p>Implementamos várias medidas de segurança para proteger seus dados:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Criptografia de senhas usando algoritmos de hash seguros (bcrypt)</li>
                    <li>Comunicação HTTPS/TLS entre todos os componentes do sistema</li>
                    <li>Autenticação baseada em tokens (JWT) para acesso à API</li>
                    <li>Controles de acesso rigorosos e princípio de privilégio mínimo</li>
                    <li>Monitoramento contínuo de atividades suspeitas</li>
                    <li>Backups regulares do banco de dados</li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">3.3. Retenção de Dados</h3>
                  <p>
                    Mantemos suas informações pessoais pelo tempo necessário para fornecer o Serviço e cumprir nossas
                    obrigações legais. Dados de contas inativas por mais de 12 meses podem ser arquivados ou excluídos.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Server className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">4. Compartilhamento com Terceiros</CardTitle>
                    <CardDescription className="text-base">Serviços externos que utilizamos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de
                  marketing. No entanto, compartilhamos dados com provedores de serviços terceirizados que nos ajudam a
                  operar o Serviço:
                </p>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.1. Processadores de Pagamento</h3>
                  <p>
                    Utilizamos processadores de pagamento terceirizados confiáveis para processar transações. Esses
                    provedores têm acesso a informações de pagamento necessárias para processar transações, mas não
                    podem usá-las para outros fins. Não armazenamos dados completos de cartão de crédito em nossos
                    sistemas.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.2. Provedores de Hospedagem</h3>
                  <p>
                    Nosso painel de controle e infraestrutura são hospedados em provedores de serviços confiáveis e
                    seguros. Esses provedores têm acesso técnico aos dados para manter a operação dos servidores, mas
                    estão vinculados por acordos de confidencialidade rigorosos.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.3. Serviços de Notificação</h3>
                  <p>
                    Se você optar por usar notificações via WhatsApp, utilizamos serviços especializados para enviar
                    mensagens. Seu número de telefone é armazenado de forma segura e usado exclusivamente para enviar
                    alertas do bot conforme configurado por você.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">4.4. Requisitos Legais</h3>
                  <p>
                    Podemos divulgar suas informações se exigido por lei, ordem judicial ou processo legal, ou se
                    acreditarmos de boa-fé que tal ação é necessária para cumprir obrigações legais ou proteger nossos
                    direitos.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">5. Cookies e Tecnologias de Rastreamento</CardTitle>
                    <CardDescription className="text-base">Como usamos cookies em nosso site</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">5.1. O que são Cookies</h3>
                  <p>
                    Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita nosso site.
                    Eles nos ajudam a reconhecer você, lembrar suas preferências e melhorar sua experiência.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">5.2. Tipos de Cookies que Usamos</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>
                      <strong className="text-foreground">Cookies Essenciais:</strong> Necessários para o funcionamento
                      do Dashboard, incluindo autenticação de sessão e segurança.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies de Preferência:</strong> Armazenam suas configurações
                      e preferências (tema, idioma, etc.).
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies Analíticos:</strong> Nos ajudam a entender como os
                      usuários interagem com o site para melhorar a experiência (se implementado).
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">5.3. Gerenciamento de Cookies</h3>
                  <p>
                    Você pode configurar seu navegador para recusar cookies ou alertá-lo quando cookies estão sendo
                    enviados. No entanto, algumas partes do Serviço podem não funcionar corretamente sem cookies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">6. Seus Direitos e Controles</CardTitle>
                    <CardDescription className="text-base">Como você pode gerenciar seus dados</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Você tem os seguintes direitos em relação aos seus dados:</p>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.1. Acesso e Portabilidade</h3>
                  <p>
                    Você pode acessar e visualizar suas informações pessoais e configurações do bot através do
                    Dashboard. Você pode solicitar uma cópia de seus dados entrando em contato com nosso suporte.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.2. Correção</h3>
                  <p>
                    Você pode atualizar ou corrigir suas informações de conta e configurações do bot diretamente no
                    Dashboard.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.3. Exclusão</h3>
                  <p>
                    Você pode solicitar a exclusão de sua conta e dados associados entrando em contato conosco para que
                    possamos tomar as medidas necessárias.
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">6.4. Retirada de Consentimento</h3>
                  <p>
                    Você pode retirar seu consentimento para certos usos de dados (como notificações via WhatsApp) a
                    qualquer momento através das configurações do Dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* YouTube and TikTok API Usage */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Youtube className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">7. Uso das APIs do YouTube e TikTok</CardTitle>
                    <CardDescription className="text-base">
                      Como integramos com o YouTube API Services e o TikTok Content Posting API
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">7.1. YouTube API Services</h3>
                  <p>
                    O Serviço utiliza o YouTube API Services exclusivamente como integração interna e de primeira
                    parte: o KizuBot publica e agenda vídeos promocionais e de conteúdo apenas em seus próprios
                    canais oficiais do YouTube, operados unicamente pela equipe do KizuBot. Usuários finais não
                    conectam suas próprias contas do YouTube ao Serviço. O KizuBot cumpre os{" "}
                    <a
                      href="https://www.youtube.com/t/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Serviço do YouTube
                    </a>{" "}
                    e a{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Política de Privacidade do Google
                    </a>
                    .
                  </p>
                  <p>Nessa integração interna, acessamos e armazenamos apenas:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>
                      Tokens OAuth de acesso e atualização vinculados exclusivamente à conta/canal oficial do
                      KizuBot
                    </li>
                    <li>Metadados dos vídeos que publicamos (título, descrição, tags, miniatura) e status de envio/agendamento</li>
                  </ul>
                  <p>
                    Os usuários não conectam contas do YouTube ao Serviço; portanto, nenhum dado de conta de usuário
                    do YouTube é coletado. Os dados acima são armazenados em nosso banco de dados seguro pelo tempo
                    necessário para operar os canais oficiais do KizuBot. Nunca vendemos ou compartilhamos esses
                    dados com terceiros.
                  </p>
                  <p>
                    O acesso é gerenciado exclusivamente pela equipe do KizuBot e pode ser revogado a qualquer
                    momento em{" "}
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      myaccount.google.com/permissions
                    </a>
                    . Para solicitar a exclusão dos dados armazenados, entre em contato em{" "}
                    <a href="mailto:contato@kizuno.net" className="text-primary hover:underline font-semibold">
                      contato@kizuno.net
                    </a>
                    .
                  </p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <h3 className="font-semibold text-lg text-foreground">7.2. TikTok Content Posting API</h3>
                  <p>
                    O Serviço também utiliza a API de postagem de conteúdo do TikTok exclusivamente como integração
                    interna e de primeira parte: o KizuBot publica conteúdo apenas em suas próprias contas oficiais
                    do TikTok, operadas unicamente pela equipe do KizuBot. Usuários finais não conectam suas próprias
                    contas do TikTok ao Serviço. Acessamos e armazenamos apenas tokens de acesso vinculados à(s)
                    conta(s) oficial(is) do KizuBot e metadados do conteúdo que publicamos (título, legenda, status
                    de publicação). Esses dados ficam em nosso banco de dados seguro pelo tempo necessário para
                    operar as contas oficiais e nunca são vendidos ou compartilhados com terceiros.
                  </p>
                  <p>
                    O acesso é gerenciado exclusivamente pela equipe do KizuBot e pode ser revogado diretamente nas
                    configurações de aplicativos conectados do TikTok, ou você pode solicitar a exclusão dos dados
                    armazenados em{" "}
                    <a href="mailto:contato@kizuno.net" className="text-primary hover:underline font-semibold">
                      contato@kizuno.net
                    </a>
                    . Consulte a{" "}
                    <a
                      href="https://www.tiktok.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Política de Privacidade do TikTok
                    </a>{" "}
                    e os{" "}
                    <a
                      href="https://www.tiktok.com/legal/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Termos de Serviço do TikTok
                    </a>{" "}
                    para mais informações.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">8. Privacidade de Menores</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Nosso Serviço não é destinado a menores de 18 anos. Não coletamos intencionalmente informações
                  pessoais de menores. Se você é pai ou responsável e acredita que seu filho nos forneceu informações
                  pessoais, entre em contato conosco para que possamos tomar as medidas necessárias.
                </p>
              </CardContent>
            </Card>

            {/* International Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">9. Usuários Internacionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  O KizuBot opera principalmente no Brasil. Se você está acessando o Serviço de fora do Brasil, suas
                  informações podem ser transferidas, armazenadas e processadas no Brasil ou em outros países onde
                  nossos provedores de serviço operam.
                </p>
                <p>
                  Ao usar o Serviço, você consente com a transferência de suas informações para países que podem ter
                  leis de proteção de dados diferentes do seu país de residência.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">10. Alterações nesta Política de Privacidade</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas
                  práticas ou por razões operacionais, legais ou regulatórias.
                </p>
                <p>
                  Notificaremos você sobre quaisquer alterações significativas publicando a nova Política de Privacidade
                  em nosso site e atualizando a data da "Última atualização". Recomendamos que você revise esta política
                  periodicamente.
                </p>
                <p className="font-semibold text-foreground">
                  Seu uso continuado do Serviço após a publicação de alterações constitui sua aceitação dessas mudanças.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-2xl mb-2">11. Entre em Contato</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao
                  tratamento de seus dados pessoais, entre em contato conosco através dos nossos canais oficiais de
                  suporte.
                </p>
                <p className="font-semibold text-foreground">
                  Importante: Conforme estabelecido em nossos Termos de Serviço, não aceitamos disputas de pagamento e
                  não oferecemos reembolsos monetários. Todas as questões devem ser resolvidas através do nosso suporte
                  oficial.
                </p>
                <p className="mt-3 text-foreground">
                  Estamos comprometidos em proteger sua privacidade e responderemos às suas solicitações de forma
                  oportuna.
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
                      <Link href="/terms-of-service">Termos de Serviço</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/refunds">Política de Reembolso</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/tips">Guia de Segurança</Link>
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
