"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart, Info, RefreshCw } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function HealingSection() {
    return (
        <section id="healing" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Heart className="w-8 h-8" />Módulo de Healing</h2>
            <p className="text-muted-foreground">Gerencia a cura e recuperação do seu personagem e Pokémon, incluindo revive, poções, berries e posicionamento de segurança.</p>

            <ConfigItem title="doHealing" description="Ativa ou desativa todo o módulo de cura. Desligar impede revives, poções, berries e posicionamento." />
            <ConfigItem title="useMedicine" description="Ativa o uso automático de medicines para curar condições negativas (burn, poison, sleep, etc). A IA seleciona a medicine correta para cada condição." />
            <ConfigItem title="useMedicineBeforeCombo" description="Se ativado, usa medicine ANTES de iniciar o combo, garantindo que o pokémon entre na luta sem condições negativas." />
            <ConfigItem title="smartMedicine" description="Sistema inteligente de medicine que detecta e cura automaticamente qualquer Stun ou CC (crowd control) que o pokémon receba durante o combate. Não depende de configuração manual — a IA identifica a condição e aplica a medicine correta." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Heart className="w-6 h-6" />Revive</h3>

            <ConfigItem title="useRevive / reviveName" description="Controla o uso de revives. O item definido em reviveName será usado para reviver pokémons.">
                <p><strong>Sub-opções de quando reviver:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>reviveOnEndLure:</strong> Usa revive ao final de cada lure/combo, garantindo vida cheia para o próximo.</li>
                    <li><strong>forceReviveByCds:</strong> Se os pokémoves acabarem e ainda houver monstros, usa outro revive para resetar cooldowns.</li>
                    <li><strong>reviveOnAllMovesInCooldown:</strong> Usa revive apenas se TODOS os pokémoves (área + alvo) estiverem em cooldown simultaneamente.</li>
                    <li><strong>useCriticalRevive / criticalRevivePercent:</strong> Usa revive se a vida do pokémon cair abaixo do percentual crítico, mesmo no meio do combate.</li>
                    <li><strong>prioritizeTargetMovesAfterRevive:</strong> Após usar revive, priorizo pokémoves de alvo único antes de voltar à rotação normal. Útil para garantir dano imediato após resetar cooldowns.</li>
                    <li><strong>reviveAfterStun / reviveAfterStunDelay:</strong> Após usar um stun configurado no Combat, o bot pode recolher o pokémon depois de alguns segundos para usar revive e resetar cooldowns. Enquanto a aba de Stun estiver em manutenção, o painel salva esses campos desligados.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="humanizedRevive" description="Adiciona delays humanizados ao processo de revive, esperando animações completarem antes de executar o próximo passo. Torna o comportamento mais natural.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Relação com Humanização</AlertTitle>
                    <AlertDescription>Esta opção pode ser gerenciada automaticamente pelo módulo de Humanização quando o master toggle estiver ativado.</AlertDescription>
                </Alert>
            </ConfigItem>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Heart className="w-6 h-6" />Poções e Comida</h3>

            <ConfigItem title="usePotion / potionName / potionAtPercent" description="Controla o uso de poções de vida no Pokémon.">
                <p><strong>Como Funciona:</strong> Se <code>usePotion</code> estiver ativo, usa o item de <code>potionName</code> quando a vida cair abaixo de <code>potionAtPercent</code>.</p>
                <p><strong>potionAfterCombo:</strong> Se ativado, só usa poção após o término do combo, mesmo que a vida esteja baixa durante a luta.</p>
            </ConfigItem>

            <ConfigItem title="usePokeFood / pokeFoodName" description="Usa comida automática no Pokémon para recuperar HP/PP. Defina o nome exato do item em pokeFoodName." />
            <ConfigItem title="usePlayerFood / playerFoodName" description="Usa comida automática no personagem do jogador. Útil para manter HP do treinador em hunts perigosas." />

            <ConfigItem title="useBerry" description="Sistema avançado para uso de berries com regras configuráveis.">
                <p><strong>Como Funciona:</strong> Crie regras como &quot;Usar Aspear Berry no Charizard quando estiver Frozen&quot; ou &quot;Usar Sitrus Berry no Snorlax quando vida abaixo de 40%&quot;. Cada regra especifica: berry, pokémon, condição e threshold.</p>
            </ConfigItem>

            <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Configurações de distância migraram para o Combate</AlertTitle>
                <AlertDescription>
                    Os controles de <code>keepDistance</code>, <code>pokemonKeepDistance</code> e distância contra criaturas extraordinárias agora ficam unificados na aba <strong>Combat &gt; Posicionamento e Distância</strong>, junto com o novo sistema de <strong>Regras Situacionais</strong>. Veja a seção de Combate para detalhes.
                </AlertDescription>
            </Alert>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><RefreshCw className="w-6 h-6" />Smart Swap System</h3>
            <p className="text-muted-foreground">Sistema de rotação automática de pokémons baseado em triggers configuráveis por pokémon. Cada entrada gera regras de ação (ActionRules) com tipo <code>smart_swap</code> internamente.</p>

            <ConfigItem title="Swap Entries (lista de pokémons)" description="Você adiciona cada pokémon do seu time à lista de swap e configura individualmente os triggers que fazem aquele pokémon ser trocado.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>enabled:</strong> Se o pokémon pode entrar na rotação de swap. Pokémons desabilitados não são considerados nem como origem, nem como destino do swap.</li>
                    <li><strong>onDeath:</strong> Troca de pokémon quando este morre. Gera uma regra que dispara no evento <code>pokemon_dead</code>.</li>
                    <li><strong>onLowLife + lowLifePercent:</strong> Troca quando a vida do pokémon cair abaixo do percentual configurado.</li>
                    <li><strong>onAllCD:</strong> Troca quando TODOS os pokémoves (area + target) estão em cooldown ao mesmo tempo — ideal pra maximizar DPS rodando vários pokémons.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="Swap Fallbacks" description="O que fazer quando o swap é solicitado mas nenhum pokémon da lista está disponível. Cada categoria tem suas próprias opções:">
                <p className="mt-2"><strong>onAllDead</strong> — quando todos os pokémons da lista estão mortos:</p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>revive_main:</strong> Usa revive no pokémon principal (slot 1).</li>
                    <li><strong>revive_last:</strong> Usa revive no último pokémon ativo antes da morte.</li>
                    <li><strong>revive_all:</strong> Revive todos os mortos em sequência.</li>
                    <li><strong>stop:</strong> Para tudo e não faz nada — o bot fica parado aguardando ação manual.</li>
                </ul>
                <p className="mt-2"><strong>onAllLow</strong> — quando todos estão com vida baixa:</p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>revive_main:</strong> Usa revive no pokémon principal pra resetar a vida.</li>
                    <li><strong>potion_current:</strong> Usa poção no pokémon atual e continua com ele.</li>
                    <li><strong>wait_regen:</strong> Espera a regeneração natural.</li>
                </ul>
                <p className="mt-2"><strong>onAllCD</strong> — quando todos estão com todos os pokémoves em cooldown:</p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>revive_main:</strong> Força revive no pokémon principal pra resetar cooldowns.</li>
                    <li><strong>wait_cd_if_safe:</strong> Espera os cooldowns se a situação for segura (poucos monstros, vida OK).</li>
                    <li><strong>wait_cd_always:</strong> Sempre espera os cooldowns, independente do contexto.</li>
                </ul>
                <p className="mt-2"><strong>swapCooldown:</strong> Tempo mínimo em segundos entre swaps consecutivos, pra evitar troca-troca rápido demais (padrão: 5s).</p>
            </ConfigItem>
        </section>
    );
}
