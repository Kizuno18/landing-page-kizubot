"use client";

import React from "react";
import { Fingerprint, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function HumanizationSection() {
    return (
        <section id="humanization" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Fingerprint className="w-8 h-8" />Módulo de Humanização</h2>
            <p className="text-muted-foreground">
                Sistema centralizado de anti-detecção que adiciona variância natural a thresholds, micro-pausas durante a hunt,
                pausas longas simulando AFK, e reações humanizadas ao GM. Quando o master toggle está ativado, este módulo
                gerencia automaticamente configurações de outras páginas.
            </p>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Como funciona o gerenciamento</AlertTitle>
                <AlertDescription>
                    Quando a Humanização está ativa, algumas configurações de outras páginas (Healing, Farming, Catch) ficam bloqueadas
                    e são controladas por este módulo. Essas configurações mostram um badge &quot;Gerenciado pela Humanização&quot; no painel.
                </AlertDescription>
            </Alert>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Fingerprint className="w-6 h-6" />Geral</h3>

            <ConfigItem title="masterToggle" description="Switch principal que ativa/desativa todo o sistema de humanização. Quando ativado, gerencia configs de outras páginas e injeta regras de ações automáticas." />

            <ConfigItem title="globalVariance" description="Percentual padrão de variância aplicado a thresholds numéricos. Exemplo: com 10% de variância, um monsterStop de 8 varia entre ~7 e ~9 a cada ciclo de lure.">
                <p><strong>Como funciona:</strong> A variância é recalculada uma vez por sessão de lure (quando <code>nextCycle()</code> é chamado). Durante o mesmo lure, os valores permanecem estáveis — não oscilam a cada segundo.</p>
                <p><strong>Valores sentinela:</strong> Os valores <code>0</code>, <code>99</code> e <code>999</code> NUNCA são variados, pois representam &quot;desativado&quot; na maioria das configs.</p>
            </ConfigItem>

            <ConfigItem title="thresholdVariance" description="Override de variância específico para thresholds. Se definido, substitui o globalVariance apenas para thresholds numéricos. Deixe em 0 para usar o globalVariance." />

            <ConfigItem title="customVariances" description="Permite definir variância individual por threshold, sobrescrevendo o globalVariance para configs específicas.">
                <p><strong>Como funciona:</strong> Um JSON onde cada chave é o nome do threshold e o valor é a variância em %. Exemplo: <code>{`{"monsterStop": 15, "potionAtPercent": 5}`}</code> aplica 15% em monsterStop e 5% em potionAtPercent, independente do globalVariance.</p>
            </ConfigItem>

            <ConfigItem title="Thresholds Afetados" description="Lista de thresholds que recebem variância automática quando a humanização está ativa.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><code>waitForPlayerLifeRegen</code> — % de vida do personagem para esperar regeneração</li>
                    <li><code>waitForPokemonLifeRegen</code> — % de vida do pokémon para esperar regeneração</li>
                    <li><code>stopLureAtHealth</code> — % de vida para parar de lurar</li>
                    <li><code>forceComboAtHealth</code> — % de vida para forçar combo</li>
                    <li><code>healAtPercent</code> — % para usar heal</li>
                    <li><code>potionAtPercent</code> — % para usar poção</li>
                    <li><code>monsterStop</code> — quantidade de monstros para parar</li>
                    <li><code>minMonsters</code> — mínimo de monstros para combar</li>
                    <li><code>maxTimeForCombo</code> — tempo máximo de lure antes de forçar combo</li>
                    <li><code>waitForEnd</code> — tempo de espera após o combo antes de retomar cavebot</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Tooltip no Painel</AlertTitle>
                    <AlertDescription>Quando a humanização está ativa, inputs de thresholds no painel mostram um tooltip âmbar indicando o range real: &quot;will vary between X and Y&quot;.</AlertDescription>
                </Alert>
            </ConfigItem>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Fingerprint className="w-6 h-6" />Comportamento</h3>

            <ConfigItem title="humanizedRevive" description="Adiciona delays ao processo de revive, esperando animações completarem. Gerencia a config equivalente em Healing." />
            <ConfigItem title="humanizedStopWalking" description="O bot não para instantaneamente ao atingir o monsterStop — desacelera naturalmente como um jogador real faria." />
            <ConfigItem title="canMadeMistakes" description="O bot erra propositalmente minigames de farming de vez em quando. Gerencia a config equivalente em Farming." />
            <ConfigItem title="minigameSolveDelay" description="Tempo de resposta ao resolver minigames. Gerencia a config equivalente em Farming. Opções: instant, fast, default, slow, realistic." />
            <ConfigItem title="startThrowBallDelay / delayBetweenBalls" description="Delays humanizados para jogar pokébolas. Gerencia as configs equivalentes em Catch. Opções: instant, fast, default, slow, realistic." />
            <ConfigItem title="fishingPullDelay" description="Delay humanizado para puxar a vara depois da fisgada na pesca. Opções: instant, fast, default, slow, realistic. Substitui o antigo ajuste de fallback que ficava direto na aba Fishing." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Fingerprint className="w-6 h-6" />Reação ao GM</h3>

            <ConfigItem title="gmReactionDelayMin / gmReactionDelayMax" description="Range de delay em milissegundos antes de responder à seta do GM. Um valor aleatório é escolhido dentro do range a cada interação. Simula tempo de reação humano.">
                <p><strong>Padrão:</strong> 3000-8000ms (3-8 segundos). Um humano real demora alguns segundos para notar e responder.</p>
            </ConfigItem>
            <ConfigItem title="gmDanceOrder" description="Ordem da reação: dançar antes de falar ou falar antes de dançar. Adiciona variação ao comportamento." />
            <ConfigItem title="gmDoubleMessage" description="Envia duas mensagens sequenciais ao GM em vez de uma. Simula jogador nervoso tentando explicar." />
            <ConfigItem title="gmMaxDances / gmMaxMessages" description="Limites de fadiga: após X setas do GM, o bot para de dançar e/ou enviar mensagens. Simula um jogador que se cansa de responder." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Fingerprint className="w-6 h-6" />Micro-Pausas</h3>

            <ConfigItem title="microPausesEnabled / microPauseChance / microPauseDurationMin / microPauseDurationMax" description="Hesitações curtas de 0.5-3 segundos durante a caminhada. O bot para brevemente como se estivesse checando algo, depois continua.">
                <p><strong>Como funciona:</strong> São implementadas como regras de ação automáticas injetadas pelo painel. O bot processa como ações normais via polling de 250ms.</p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>microPausesEnabled:</strong> Liga/desliga o sistema de micro-pausas.</li>
                    <li><strong>microPauseChance:</strong> Probabilidade (0-100%) de uma micro-pausa acontecer a cada ciclo.</li>
                    <li><strong>microPauseDurationMin / microPauseDurationMax:</strong> Range de duração em <strong>milissegundos</strong> (500ms = 0.5s). Padrão: 500–3000ms.</li>
                </ul>
                <p><strong>Exemplo:</strong> Chance 15%, duração 500–2000ms = a cada ~7 ciclos o bot hesita por 0.5 a 2 segundos, como se estivesse checando o celular.</p>
            </ConfigItem>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Fingerprint className="w-6 h-6" />Pausas Longas (Hunt Breaks)</h3>

            <ConfigItem title="huntBreaksEnabled / huntBreakIntervalMin / huntBreakIntervalMax / huntBreakDurationMin / huntBreakDurationMax" description="Pausas longas de 1-5 minutos que simulam o jogador indo fazer outra coisa (ir ao banheiro, pegar água, etc).">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>huntBreaksEnabled:</strong> Liga/desliga o sistema de hunt breaks.</li>
                    <li><strong>huntBreakIntervalMin / huntBreakIntervalMax:</strong> Intervalo entre pausas (em minutos). Randomizado dentro do range.</li>
                    <li><strong>huntBreakDurationMin / huntBreakDurationMax:</strong> Duração da pausa (em minutos). Randomizado dentro do range.</li>
                    <li><strong>huntBreakDisableHealing:</strong> Desativa healing durante a pausa. O pokémon leva dano como se o jogador estivesse realmente AFK.</li>
                    <li><strong>huntBreakDisableCombat:</strong> Desativa combat durante a pausa. O pokémon não revida — AFK completo.</li>
                </ul>
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Cuidado com Hunt Breaks!</AlertTitle>
                    <AlertDescription>Se <code>huntBreakDisableHealing</code> e <code>huntBreakDisableCombat</code> estiverem ambos ativados, seu pokémon pode morrer durante a pausa. Use com cuidado em hunts perigosas.</AlertDescription>
                </Alert>
            </ConfigItem>
        </section>
    );
}
