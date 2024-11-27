"use client";

import React from "react";
import { Bell, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function AlarmsSection() {
    return (
        <section id="alarms" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Bell className="w-8 h-8" />Módulo de Alarmes</h2>
            <p className="text-muted-foreground">Configura notificações para eventos importantes via WhatsApp e Telegram. Cada tipo de alarme pode ser ativado ou desativado individualmente.</p>

            <ConfigItem title="alarmEnabled" description="Liga ou desliga o envio de todas as notificações. Master switch do sistema de alarmes." />
            <ConfigItem title="alwaysPlayAlarm" description="Controla se o alarme sonoro local continua tocando quando o bot principal está desligado. Seletor de 3 estados:">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Off (0):</strong> Nenhum alarme toca quando o bot está desligado.</li>
                    <li><strong>Always On (1):</strong> Todos os alarmes sonoros continuam tocando mesmo com o bot desligado. Útil pra monitoramento 24/7.</li>
                    <li><strong>Private Messages Only (2):</strong> Apenas o alarme de mensagem privada continua tocando com o bot desligado.</li>
                </ul>
            </ConfigItem>
            <ConfigItem title="botterPhone / telegramID" description="Número de WhatsApp e/ou ID do Telegram para receber alertas. Suporta múltiplos contatos." />

            <ConfigItem title="Entrega WhatsApp / Telegram" description="Cuida da entrega externa dos alarmes e mensagens importantes.">
                <p><strong>Reconexão:</strong> O WhatsApp tenta voltar automaticamente quando a sessão cai, reduzindo o tempo offline sem tentativa de recuperação.</p>
                <p><strong>Duplicatas:</strong> O painel e o bot filtram melhor alarmes e mensagens repetidas em sequência antes de enviar para canais externos.</p>
                <p><strong>Mensagens longas:</strong> Alarmes extensos podem usar o formato com &quot;Leia mais&quot; para manter a mensagem legível no WhatsApp.</p>
            </ConfigItem>

            <ConfigItem title="enabledAlarms" description="Lista de eventos que geram alarme. Cada um é individualmente ativável no painel.">
                <p><strong>Jogadores e staff:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>playerDetected:</strong> Alarme genérico de detecção de jogador (legado — use os abaixo para maior controle).</li>
                    <li><strong>humanJoinScreen / humanLeftScreen:</strong> Jogador entrou ou saiu da tela.</li>
                    <li><strong>detectPlayerHigherFloor / detectPlayerLowerFloor:</strong> Jogador detectado no andar de cima ou de baixo.</li>
                    <li><strong>staffScreen:</strong> Staff/GM visível na tela.</li>
                    <li><strong>verificationGM:</strong> GM pediu verificação (seta ou aviso).</li>
                    <li><strong>proofBot:</strong> Aviso anti-bot do servidor apareceu.</li>
                </ul>
                <p className="mt-3"><strong>Criaturas extraordinárias:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>shinyDetected / shinyHigherFloor / shinyLowerFloor:</strong> Shiny na tela ou em outro andar.</li>
                    <li><strong>megaDetected / megaHigherFloor / megaLowerFloor:</strong> Mega na tela ou em outro andar.</li>
                    <li><strong>bossDetected / bossHigherFloor / bossLowerFloor:</strong> Boss na tela ou em outro andar.</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Megas e visuais reconhecidos</AlertTitle>
                    <AlertDescription>O alarme de mega usa a lista confiável de visuais reconhecidos pelo bot e evita falsos positivos de NPCs, criaturas passivas e summons. Se um mega novo aparecer com visual ainda não cadastrado, envie o caso para adicionarmos esse visual ao detector.</AlertDescription>
                </Alert>
                <p className="mt-3"><strong>Mensagens:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>privateMessage:</strong> Mensagem privada recebida.</li>
                    <li><strong>defaultMessage:</strong> Mensagem no chat default.</li>
                    <li><strong>partyMessage / tvMessage:</strong> Mensagem no canal da party ou TV.</li>
                    <li><strong>reportMessage:</strong> Alguém usou <code>/report</code> em você.</li>
                    <li><strong>partyInvite:</strong> Alguém convidou você para party.</li>
                </ul>
                <p className="mt-3"><strong>Loot e captura:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>dropRare / dropStone:</strong> Loot raro ou evolution stone dropou (separados).</li>
                    <li><strong>pokemonCaught:</strong> Um pokémon foi capturado.</li>
                    <li><strong>lootStatistics:</strong> Envio periódico de stats acumulados de loot.</li>
                </ul>
                <p className="mt-3"><strong>Status do personagem:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>lowHealth:</strong> Vida do personagem abaixo de <code>lowHealthPercent</code>.</li>
                    <li><strong>lowSupplies:</strong> Algum item em <code>lowSuppliesItems</code> ficou abaixo do threshold.</li>
                    <li><strong>effectOnScreen:</strong> Um efeito relevante apareceu na tela (ex: debuff visual).</li>
                    <li><strong>characterStucked:</strong> O bot está travado há <code>stuckTimeout</code> segundos.</li>
                    <li><strong>characterDied:</strong> O personagem morreu.</li>
                    <li><strong>characterTeleported:</strong> Personagem foi teleportado para outra região (arrasto).</li>
                    <li><strong>characterDisconnected:</strong> Personagem foi desconectado.</li>
                    <li><strong>highPing:</strong> Ping ultrapassou <code>highPingThreshold</code>.</li>
                </ul>
                <p className="mt-3"><strong>Banco e ações:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>vaultDeposit / vaultWithdraw:</strong> Depósito ou saque no vault.</li>
                    <li><strong>action:</strong> Uma ActionRule com alarme foi acionada.</li>
                    <li><strong>notify:</strong> Notificações do jogo (sininho) — super recursos, PokéPark, etc.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="highPingThreshold" description="Threshold de ping em ms para acionar o alarme highPing. Quando o ping ultrapassa este valor, você recebe uma notificação." />
            <ConfigItem title="lowSuppliesItems" description="Lista de itens monitorados pelo alarme lowSupplies. Cada entrada define um item e a quantidade mínima antes do alarme disparar — ex: alertar quando restam menos de 50 revives." />
            <ConfigItem title="stuckTimeout" description="Tempo em segundos que o bot precisa ficar preso sem conseguir se mover antes de disparar o alarme characterStucked. Valores mais altos evitam falsos positivos em hunts lentas." />
            <ConfigItem title="antiSpamInterval" description="Intervalo mínimo em segundos entre alarmes consecutivos do mesmo tipo. Previne flood de notificações quando o mesmo evento dispara várias vezes seguidas." />
            <ConfigItem title="lootStatisticsInterval" description="Frequência (em minutos) com que as estatísticas de loot são enviadas automaticamente via WhatsApp/Telegram. Depende do alarme lootStatistics estar ativado." />

            <ConfigItem title="ignoredNames" description="Lista de jogadores que não devem acionar alarmes. Útil para ignorar amigos, alts ou jogadores frequentes da mesma área." />
            <ConfigItem title="ignoredItems" description="Lista de itens que não devem acionar alarme de drop. Também funciona como blacklist para o lootOnlyRare do módulo de Combate.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Relação com Combat</AlertTitle>
                    <AlertDescription>Itens na <code>ignoredItems</code> são ignorados tanto para alarmes quanto para coleta quando <code>lootOnlyRare</code> está ativado no Combat.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="responsesGM" description="Lista de frases e respostas configuráveis para responder ao GM automaticamente quando a seta do GM aparece. Você pode adicionar quantas quiser.">
                <p><strong>Como Funciona:</strong> Quando o GM interage, o bot seleciona uma resposta da lista e envia. Funciona em conjunto com <code>danceForGM</code> na aba Engine.</p>
            </ConfigItem>

            <ConfigItem title="disableAlarmsNearMark / disableAlarmsNearNurseJoy" description="Desliga os alarmes automaticamente quando o personagem está perto do mark de teleporte ou perto da Nurse Joy. Evita alarmes falsos em áreas seguras onde é normal ter outros jogadores." />

            <ConfigItem title="lowHealthPercent" description="Percentual de vida do PERSONAGEM abaixo do qual o alarme de vida baixa é acionado. Configure para receber notificação quando seu treinador estiver em perigo." />

            <ConfigItem title="useSimilarity" description="Detecta nomes de staff por similaridade textual. Nomes muito curtos são tratados com mais cuidado para reduzir falsos positivos, mas ainda é recomendado manter desativado se não souber o que está fazendo." />
        </section>
    );
}
