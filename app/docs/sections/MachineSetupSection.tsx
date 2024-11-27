"use client";

import React from "react";
import { AlertTriangle, Info, Monitor } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function MachineSetupSection() {
    return (
        <section id="machine-setup" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Monitor className="w-8 h-8" />Machine Setup</h2>
            <p className="text-muted-foreground">Gerencia máquinas, licenças, VNC, recriação, settings.otml e vínculo do WhatsApp para comandos remotos.</p>

            <ConfigItem title="settings.otml" description="Carrega configurações visuais do cliente PXG na máquina.">
                <p><strong>Preset otimizado:</strong> Use a opção rápida do painel para aplicar um settings.otml limpo e ajustado para VM, sem credenciais, UUIDs ou estado antigo da sua conta.</p>
                <p><strong>Upload manual:</strong> Envie seu próprio settings.otml quando quiser preservar hotkeys, janelas e action bar. O arquivo é aplicado automaticamente na próxima sessão do jogo.</p>
                <p><strong>Download:</strong> O painel também oferece o preset otimizado para baixar e revisar localmente.</p>
            </ConfigItem>

            <ConfigItem title="VNC password / VNC resolution" description="Define senha e resolução usadas no acesso remoto da máquina.">
                <p><strong>Senha VNC:</strong> A senha precisa ter pelo menos 6 caracteres. Evite <code>%</code>, <code>{"{"}</code>, <code>{"}"}</code>, <code>+</code>, <code>&lt;</code> e <code>&gt;</code>, pois esses caracteres podem quebrar a recriação da máquina.</p>
                <p><strong>Resolução:</strong> Resoluções maiores usam mais banda. Alterações de senha ou resolução são aplicadas no próximo recreate.</p>
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Save &amp; Recreate</AlertTitle>
                    <AlertDescription>Use recreate para aplicar mudanças de senha, resolução e outras configs internas da máquina imediatamente.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="Máquinas e licenças" description="Mostra licenças ativas, expiradas, máquinas criadas e ações disponíveis para cada máquina.">
                <p><strong>Ativar licença:</strong> Licenças novas podem ser ativadas no painel; links de checkout podem abrir a tela já com a licença preenchida.</p>
                <p><strong>Criar máquina:</strong> Uma licença disponível pode criar uma nova máquina com senha e resolução definidas por você.</p>
                <p><strong>Licenças expiradas:</strong> Licenças vencidas não são reativadas automaticamente por acidente. Pagamentos custom pendentes ficam preservados até a confirmação.</p>
            </ConfigItem>

            <ConfigItem title="Recreate / Start / Stop" description="Controla o ciclo de vida da máquina pelo painel.">
                <p><strong>Recreate:</strong> Recria a máquina com as configs atuais. O processo usa limite padrão de até 10 minutos; se passar de alguns minutos, o painel mostra aviso centralizado e continua utilizável enquanto termina em segundo plano.</p>
                <p><strong>Start/Stop:</strong> Liga ou desliga a máquina quando necessário. A máquina também desliga sozinha depois de cerca de 15 minutos offline; para voltar, é só recriar.</p>
                <p><strong>WhatsApp:</strong> Depois de vincular o número, comandos como <code>!view</code> e <code>!recreate</code> podem ser usados pelo WhatsApp.</p>
            </ConfigItem>

            <ConfigItem title="Identidade da máquina" description="Mostra a identidade real enviada pela máquina e evita campos vazios quando a VM já está online.">
                <p><strong>Identidade em tempo real:</strong> O painel lê os dados vivos do personagem/máquina, em vez de depender de campos antigos que podiam aparecer como &quot;N/A&quot;.</p>
                <p><strong>Após recreate:</strong> A máquina mantém melhor sua identidade e configs internas, reduzindo comportamento estranho entre recriações.</p>
                <p><strong>Color depth:</strong> A profundidade de cor é fixada em 24 bits pelo servidor. Não há ajuste manual necessário no painel.</p>
            </ConfigItem>

            <ConfigItem title="VNC e repair automático" description="Acesso remoto e recuperação do processo do jogo.">
                <p><strong>RealVNC:</strong> Use o endereço VNC da máquina com a senha configurada no painel.</p>
                <p><strong>Repair:</strong> Quando o jogo mostra &quot;Repair successful&quot;, o bot reconhece melhor o aviso e reinicia apenas o processo do jogo, sem derrubar a sessão VNC inteira.</p>
            </ConfigItem>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Onde fica a conta do jogo?</AlertTitle>
                <AlertDescription>Login, senha do PXG, perfis salvos, personagens ocultos e alteração de senha ficam na página Conta.</AlertDescription>
            </Alert>
        </section>
    );
}
