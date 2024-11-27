"use client";

import React from "react";
import { Sword, AlertTriangle, Info, Zap, Move } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function CombatSection() {
    return (
        <section id="combat" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Sword className="w-8 h-8" />Módulo de Combate</h2>
            <p className="text-muted-foreground">Gerencia todas as ações de combate: luring, targeting, uso de pokémoves, coleta de loot e sistema de stun tático.</p>

            <ConfigItem title="doCombat" description="Ativa ou desativa o módulo de combate. Se desligado, o bot não atacará monstros, não coletará loot e não usará pokémoves ofensivas." />

            <ConfigItem title="targetCreatures / ignoreCreatures / targetAll" description="Listas para controlar quais monstros atacar.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>targetAll:</strong> Ataca todos os monstros, exceto NPCs e os listados em <code>ignoreCreatures</code>.</li>
                    <li><strong>targetCreatures:</strong> Lista branca — se <code>targetAll</code> estiver desligado, o bot SÓ atacará os monstros nesta lista.</li>
                    <li><strong>ignoreCreatures:</strong> Lista negra — o bot NUNCA atacará estes monstros, independente das outras configurações.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="useTargetAttack" description="Quando ativado, sempre ataca o pokémon com target (alvo selecionado). Se desativado, usa a rotação normal de pokémoves sem selecionar um alvo específico." />
            <ConfigItem title="Skill de suporte: gatilho por slot (movido para Time Pokémon)" description="O gatilho de quantos monstros são necessários para cast de skill de suporte agora é configurado por slot dentro de Time Pokémon. O antigo campo global único foi removido — cada move tem o seu próprio gatilho.">
                <p>Exemplo prático: Smeargle 8 tem skill de defesa E skill de imunidade no mesmo set. Você configura defesa em 2 monstros e imunidade em 5, e o bot escolhe a skill certa de acordo com o tamanho do lure.</p>
                <p>Slots sem gatilho definido usam o padrão de cast imediato (a partir de qualquer monstro).</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Onde configurar agora</AlertTitle>
                    <AlertDescription>Dashboard &gt; <strong>Time Pokémon</strong>. Cada chip de support move tem um input numérico para o monster count individual.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="monsterStop" description="Número de monstros na tela para o bot parar de lurar e iniciar o combate.">
                <p><strong>Como Funciona:</strong> Principal gatilho de combate. A contagem considera todos os monstros visíveis na tela dentro do campo de visão configurado.</p>
                <p><strong>Exemplo:</strong> Se definido como <code>8</code>, o bot caminha pela hunt juntando monstros. Ao ver o 8º monstro, para e inicia o combo.</p>
                <p><strong>Valor:</strong> Use <code>1</code> para matar um por um (hunts perigosas). Use <code>999</code> para nunca parar de lurar manualmente.</p>
            </ConfigItem>

            <ConfigItem title="minMonsters" description="Número mínimo de monstros que devem estar dentro do Shape Radius para iniciar o combo. Diferente de monsterStop, que conta na tela inteira.">
                <p><strong>Diferença de monsterStop:</strong> O <code>monsterStop</code> para de andar. O <code>minMonsters</code> decide se começa a atacar. O bot pode parar (monsterStop atingido) mas esperar mais monstros chegarem dentro do shape (minMonsters não atingido).</p>
            </ConfigItem>

            <ConfigItem title="Shape Radius" description="Define a área de efeito (AoE) dos pokémoves do seu Pokémon — quais tiles ao redor dele um pokémove realmente acerta. Substitui o antigo boxRadius numérico por um sistema visual com presets e cascata de prioridade.">
                <p><strong>47 presets em 7 categorias:</strong> Quadrados, Diamantes, Cruzes, Octógonos, Anéis, Cones e Linhas — e ainda editor customizado para desenhar o seu próprio formato.</p>
                <p><strong>Cascata de prioridade</strong> (do mais específico pro mais genérico):</p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Por pokémove:</strong> cado pokémove individual (F1-F12) pode ter seu próprio shape. Útil quando o seu pokémon tem um cone e um diamante na mesma rotação.</li>
                    <li><strong>Por pokémon:</strong> sobrescreve o padrão para um pokémon específico (ex: Venusaur usa diamante 2, Charizard usa cone 3).</li>
                    <li><strong>Padrão:</strong> o shape que se aplica a qualquer pokémon sem override.</li>
                </ul>
                <p><strong>Rotação automática:</strong> cones e linhas rotacionam sozinhos baseado na direção que o seu pokémon está olhando, então a IA sempre sabe pra qual lado o pokémove vai bater.</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Por que substituiu o boxRadius?</AlertTitle>
                    <AlertDescription>O antigo boxRadius era sempre um quadrado e contava os tiles dos cantos, mas os pokémoves reais (diamond/cross/cone/line) não alcançavam ali. Isso causava o famoso bug do &quot;sobrou 1 monstro no canto&quot; depois do combo. Com Shape Radius, só conta o que realmente vai ser atingido.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="requireReachForCombo" description="O bot só conta e engaja monstros que o seu pokémon consegue alcançar por um caminho real (pathfinding). Ligado por padrão.">
                <p><strong>O que resolve:</strong> monstro dentro da área do combo MAS atrás de boulder/parede — a AOE não acerta ele, então não deve contar. E monstro em sala fechada que nunca vai conseguir vir até você — não deve travar o lure.</p>
                <p><strong>Como funciona:</strong> a cada ciclo o bot faz um flood de alcance a partir do pokémon (limitado ao campo de visão). Monstro cujo tile não é alcançável é ignorado na contagem (box e tela).</p>
                <p><strong>Exceção:</strong> criaturas extraordinárias (shiny/boss/mega) são sempre consideradas, mesmo atrás de parede — o bot continua tentando se reposicionar pra alcançá-las.</p>
                <p><strong>Quando desligar:</strong> só se uma hunt específica tiver comportamento estranho — desligado, volta à contagem por geometria pura.</p>
            </ConfigItem>
            <ConfigItem title="stopLureAtHealth" description="Percentual de vida do Pokémon para parar de lurar e iniciar combate, mesmo que monsterStop não tenha sido atingido. 0 para desativar." />
            <ConfigItem title="forceComboAtHealth" description="Percentual de vida do Pokémon para forçar o combo imediatamente, ignorando tempo de lure. Medida de segurança contra morte do pokémon." />
            <ConfigItem title="maxTimeForCombo" description="Tempo máximo em segundos lurando antes de forçar o combo. Use 999 para desativar." />

            <ConfigItem title="waitLureOnDespawnWarning" description="Quando o '!' amarelo aparece indicando que um Pokémon na box está prestes a despawnar, o bot para e mata imediatamente em vez de continuar lurando." />

            <ConfigItem title="visionRadiusHorizontal / visionRadiusVertical" description="Define o campo de visão da IA em tiles. Controla até onde o bot 'enxerga' monstros.">
                <p><strong>Padrão:</strong> 11 horizontal, 6 vertical. Reduza se o bot estiver detectando monstros muito distantes (shinies longe, por exemplo).</p>
            </ConfigItem>

            <ConfigItem title="monsterLeave" description="Tempo em segundos que o bot aguarda um monstro se afastar antes de considerá-lo 'perdido'. Se um monstro sair do Shape Radius e não voltar neste tempo, é removido da contagem de monstros ativos." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Sword className="w-6 h-6" />Loot</h3>

            <ConfigItem title="lootingEnabled" description="Ativa ou desativa a coleta de loot. Nota: criaturas extraordinárias (shiny/mega/boss) SEMPRE têm seu loot coletado, mesmo com esta opção desativada." />
            <ConfigItem title="lootOnlyRare" description="Coleta apenas loots raros (prioridade > 1 no servidor). Itens na ignoredItems do módulo de Alarmes também são ignorados aqui." />
            <ConfigItem title="considerStoneRare" description="Trata evolution stones como itens raros, permitindo coleta mesmo com lootOnlyRare ativado. Stones têm prioridade 1 (comum) no servidor, então sem esta opção elas são ignoradas.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Relação com Alarmes</AlertTitle>
                    <AlertDescription>A <code>ignoredItems</code> do módulo de Alarmes funciona como blacklist tanto para alarmes quanto para loot em modo <code>lootOnlyRare</code>.</AlertDescription>
                </Alert>
            </ConfigItem>
            <ConfigItem title="lootOneByOne" description="Coleta loot um corpo por vez em vez de todos de uma vez. Mais lento, mas pode ser mais seguro em certas situações." />
            <ConfigItem title="maxLootDistance" description="Distância máxima em tiles para o bot ir coletar um loot. Corpos mais distantes são ignorados." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Sword className="w-6 h-6" />Proteção contra KS</h3>

            <ConfigItem title="ksIgnoreLoot / ksIgnoreCatch" description="Opções de proteção quando há outros jogadores na tela.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>ksIgnoreLoot:</strong> Não coleta loot se houver jogadores (que não sejam da party) na tela.</li>
                    <li><strong>ksIgnoreCatch:</strong> Não captura pokémons se houver outros jogadores na tela.</li>
                </ul>
            </ConfigItem>
            <ConfigItem title="throwBallWhenPlayerOnScreen" description="Comportamento oposto ao ksIgnoreCatch: adiciona corpos à lista de captura e começa a jogar Poké Balls SOMENTE quando jogadores estão na tela. Útil para projetos shiny com testemunhas." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Move className="w-6 h-6" />Posicionamento e Distância</h3>
            <p className="text-muted-foreground">Controla como o personagem, o pokémon e o comportamento contra extraordinárias reagem à distância dos monstros. Esta seção é unificada — antes as configs de distância ficavam espalhadas em 3 lugares diferentes (Combate, Cura e Engine). Agora todas vivem aqui, lado a lado, com um sistema de Regras Situacionais opcional por cima.</p>

            <ConfigItem title="Player — keepDistance / distanceToKeep / minMonstersToKeepDistance" description="Controle de posicionamento do SEU PERSONAGEM durante o combate.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>keepDistance:</strong> Faz o seu personagem manter distância dos monstros automaticamente.</li>
                    <li><strong>distanceToKeep:</strong> Distância alvo em tiles (1–8).</li>
                    <li><strong>minMonstersToKeepDistance:</strong> Só ativa o keepDistance quando houver pelo menos essa quantidade de monstros na tela. <code>0</code> = sempre manter distância.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="Pokémon — pokemonKeepDistance / pokemonDistanceToKeep / pokemonKeepDistanceMode" description="Controle de posicionamento do SEU POKÉMON durante o combate. Faz o pokémon se afastar ativamente dos monstros — útil para pokémons frágeis ou que dependem de pokémoves de longo alcance.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>pokemonKeepDistance:</strong> Liga/desliga o keep distance do pokémon.</li>
                    <li><strong>pokemonDistanceToKeep:</strong> Distância mínima (em tiles) que o pokémon vai tentar manter do monstro mais próximo.</li>
                    <li><strong>pokemonKeepDistanceMode:</strong> Quando aplicar o afastamento. Opções: <code>always</code> (sempre) ou <code>untilWaitBox</code> (só enquanto a box ainda não está montada, legado).</li>
                </ul>
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Não confunda!</AlertTitle>
                    <AlertDescription><code>keepDistance</code> (player) move o SEU PERSONAGEM. <code>pokemonKeepDistance</code> ordena o SEU POKÉMON a se afastar. São dois sistemas independentes com tiles, gatilhos e dispatchers separados.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="Extraordinary — extraordinaryKeepDistance / keepExactDistanceOnExtraordinary" description="Distância do seu personagem durante o combo contra criaturas extraordinárias (shiny / mega / boss). Essas configs ficavam na aba Engine antigamente — foram movidas pra cá pra ficar perto das outras configs de distância.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>extraordinaryKeepDistance:</strong> Distância máxima (em tiles) que o personagem pode ficar do pokémon durante combate contra extraordinária. Se passar, o bot anda mais perto. Ignorado se <code>keepExactDistanceOnExtraordinary &gt; 0</code>.</li>
                    <li><strong>keepExactDistanceOnExtraordinary:</strong> Força o personagem a ficar EXATAMENTE essa quantidade de tiles do pokémon durante o combo. <code>0</code> = desativado (usa a distância máxima acima). Qualquer valor &gt; 0 sobrescreve a distância máxima.</li>
                </ul>
            </ConfigItem>

            <h4 className="text-xl font-bold text-primary flex items-center gap-3 mt-8"><Move className="w-5 h-5" />Regras Situacionais (avançado)</h4>
            <p className="text-muted-foreground">Sistema opcional de regras condicionais montado por cima dos configs simples acima. Permite mudar a distância dinamicamente baseado no estado do jogo — tipo &quot;recua pra 4 tiles quando meu HP cair abaixo de 50%&quot; ou &quot;usa distância 6 quando o Alakazam tá summonado&quot;. Disponível por papel (Player, Pokémon) via accordion &quot;Regras situacionais (avançado)&quot; em cada sub-seção.</p>

            <ConfigItem title="keepDistanceRules (por papel)" description="Cada papel (Player e Pokémon) tem sua própria configuração de regras, composta de 4 campos principais.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>enabled:</strong> Master toggle do sistema de regras pra esse papel. Quando desligado, o bot usa o fluxo legado dos configs simples. Quando ligado, os inputs legados ganham um badge &quot;Managed by Rules&quot; e ficam visualmente marcados como sobrescritos.</li>
                    <li><strong>phase:</strong> Fase do ciclo de combate em que as regras são avaliadas. Opções: <code>always</code>, <code>lureonly</code> (só durante lure), <code>comboonly</code> (só durante combo), <code>lureandcombo</code> (durante lure ou combo) e <code>untilwaitbox</code> (compat com o modo legado do pokémon). Fora da fase ativa, o bot cai no fluxo legado.</li>
                    <li><strong>baseDistance:</strong> Distância fallback usada quando nenhuma regra bate. 0–8 tiles. <code>0</code> = no-op.</li>
                    <li><strong>rules[]:</strong> Lista ordenada de regras condicionais (ver abaixo). Avaliadas por prioridade DESC — a primeira que bater ganha e sua distância é aplicada.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="Estrutura de uma Regra" description="Cada regra tem priority, distance e uma lista de conditions.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>priority:</strong> Inteiro. Prioridade maior ganha. Em empates, a ordem de inserção (primeira adicionada) desempata (sort estável).</li>
                    <li><strong>distance:</strong> Distância em tiles (0–8) aplicada quando a regra bater.</li>
                    <li><strong>conditions[]:</strong> Lista de condições combinadas com lógica <code>AND</code> — todas precisam ser verdadeiras pra regra disparar. Pra lógica OR, crie múltiplas regras com a mesma prioridade e distances diferentes.</li>
                </ul>
                <p className="mt-2"><strong>Regra sem condições</strong> = sempre bate (útil como fallback de última instância ou pra sobrescrever todo um phase com distância fixa).</p>
            </ConfigItem>

            <ConfigItem title="11 Tipos de Condições" description="O que cada condição verifica em tempo real:">
                <ul className="list-disc ml-6 space-y-2">
                    <li><code>playerHpBelow</code> / <code>playerHpAbove</code>: HP do seu personagem abaixo/acima de um percentual (0–100).</li>
                    <li><code>pokemonHpBelow</code> / <code>pokemonHpAbove</code>: HP do seu pokémon abaixo/acima de um percentual (0–100).</li>
                    <li><code>monsterCountAtLeast</code>: Quantidade total de monstros na tela (qualquer tile) é ≥ N.</li>
                    <li><code>monstersInBoxAtLeast</code>: Quantidade de monstros dentro do Shape Radius é ≥ N.</li>
                    <li><code>extraordinaryOnScreen</code>: Existe pelo menos 1 criatura extraordinária (shiny/mega/boss) visível na tela. Sem payload.</li>
                    <li><code>creatureOnScreen</code>: Alguma criatura da lista de nomes configurada aparece na tela.</li>
                    <li><code>activePokemonIn</code>: O seu pokémon sumonado atual está na lista de nomes configurada.</li>
                    <li><code>duringLure</code>: Bot está atualmente na fase de lure. Sem payload.</li>
                    <li><code>duringCombo</code>: Bot está atualmente em combo. Sem payload.</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Exemplo prático</AlertTitle>
                    <AlertDescription>
                        Você quer que o personagem recue pra 5 tiles quando aparecer um shiny OU quando seu HP cair abaixo de 40%. Solução: 2 regras, mesma prioridade, distance=5: regra A com <code>extraordinaryOnScreen</code>, regra B com <code>playerHpBelow 40</code>. Como condições dentro de uma regra são AND, você usa regras separadas pra obter OR.
                    </AlertDescription>
                </Alert>
            </ConfigItem>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Backward compat</AlertTitle>
                <AlertDescription>
                    Se você não ativar o sistema de regras, nada muda — o bot continua usando os configs legados (keepDistance, pokemonKeepDistance, etc.) exatamente como antes. Os 1598 usuários existentes que já tinham configs salvos recebem a coluna nova com <code>enabled=false</code> por padrão e zero mudança de comportamento até optarem por ativar.
                </AlertDescription>
            </Alert>

            <h4 className="text-xl font-bold text-primary flex items-center gap-3 mt-8"><Move className="w-5 h-5" />Wait Close Target (&quot;Tickzinho&quot;)</h4>
            <p className="text-muted-foreground">Gate por pokémove/pokémon que segura o cast de um pokémove até que a criatura mais próxima entre no raio Chebyshev configurado ao redor do seu pokémon. Diferente do Shape Radius (que responde &quot;esso pokémove vai acertar?&quot;), o Wait Close Target responde &quot;é o momento certo de castar?&quot;.</p>

            <ConfigItem title="waitCloseTargetCascade" description="Cascata de configuração (igual à do Shape Radius): default → per-pokemon → per-move. Cada nó tem 3 campos.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>enabled:</strong> Liga/desliga o gate pra esse nó da cascata.</li>
                    <li><strong>distance:</strong> Raio Chebyshev (1–8 tiles). O pokémove segura até que a criatura mais próxima do seu pokémon esteja dentro desse raio.</li>
                    <li><strong>timeoutMs:</strong> Tempo máximo (500–5000 ms) que o gate segura. Se o tempo estourar sem criatura entrar no raio, o pokémove cata mesmo assim. Essa trava de segurança garante que a rotação nunca trava em deadlock.</li>
                </ul>
                <p className="mt-2"><strong>Usos típicos:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Pokémoves melee que precisam da criatura grudada (tipo Body Slam, Earthquake de perto)</li>
                    <li>Burst AoE tipo Blast Burn onde você quer que os monstros se agrupem antes de detonar</li>
                    <li>Lures de canto onde você quer esperar o pack todo chegar</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Extraordinárias sempre passam</AlertTitle>
                    <AlertDescription>
                        O gate é automaticamente bypassed quando há criatura extraordinária (shiny/mega/boss) no alvo — pra não arriscar perder o kill esperando.
                    </AlertDescription>
                </Alert>
            </ConfigItem>

            <h4 className="text-xl font-bold text-primary flex items-center gap-3 mt-8"><Sword className="w-5 h-5" />Alvo de Stragglers no 2º Combo</h4>
            <p className="text-muted-foreground">Comportamento opt-in que, durante a fase do &quot;segundo combo&quot; (depois do bot ter feito pelo menos 1 revive forçado no combo atual), prioriza mirar monstros de baixa vida FORA do Shape Radius — os tais &quot;stragglers&quot;. Evita que esses sobreviventes sigam o personagem até o próximo lure e escapem a full range.</p>

            <ConfigItem title="targetStragglersOnSecondCombo / stragglerHealthThreshold" description="Ativa a priorização de stragglers após revive forçado no combo atual.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>targetStragglersOnSecondCombo:</strong> Liga/desliga o comportamento. Padrão: desligado. Só tem efeito durante a fase &quot;notFirstRevive&quot; (quando o bot já usou pelo menos 1 revive no combo atual).</li>
                    <li><strong>stragglerHealthThreshold:</strong> Percentual de HP abaixo do qual uma criatura fora da box é considerada &quot;straggler&quot;. Padrão: 40%. Só considera criaturas a no máximo 7 tiles do seu pokémon.</li>
                </ul>
                <p className="mt-2"><strong>Quando usar:</strong> Hunts onde sobra sempre aquele bichinho com 10% de vida seguindo você pro próximo lure e morrendo no pull seguinte num local ruim. Com isso ativado, o bot cancela o target atual e termina o straggler antes.</p>
            </ConfigItem>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Sword className="w-6 h-6" />Posicionamento e Lure</h3>

            <ConfigItem title="usePokeStop" description="Usa o comando pokeStop para finalizar o lure. O pokémon fica parado aguardando os monstros se aproximarem." />
            <ConfigItem title="pokeStopDuringLure" description="Usa pokeStop durante o lure (enquanto caminha), não apenas no fim. Mantém o pokémon parado em um ponto enquanto o personagem atrai monstros." />
            <ConfigItem title="orderDuringLure / orderOnSelfDuringLure" description="Controla o posicionamento do pokémon durante o lure.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>orderDuringLure:</strong> Ordena o pokémon para o melhor tile durante o lure, otimizando a posição para o combo que virá.</li>
                    <li><strong>orderOnSelfDuringLure:</strong> Ordena o pokémon para o tile do personagem durante o lure, mantendo-o sempre perto de você.</li>
                </ul>
            </ConfigItem>
            <ConfigItem title="delayBetweenOrder" description="Delay em milissegundos entre cada ordem de posicionamento. Evita ordens excessivas que parecem robóticas. Valor padrão recomendado: 300-500ms." />
            <ConfigItem title="orderInBestTileToFinishBox" description="A IA posiciona o pokémon no melhor tile para maximizar dano de pokémoves de área antes de iniciar o combo." />
            <ConfigItem title="repositionDuringCombo" description="Durante o combo, reposiciona o Pokémon para o melhor tile quando os inimigos mudam de posição. Garante que os pokémoves de área atinjam o máximo de alvos possível." />
            <ConfigItem title="provokeCreatures" description="Provoca criaturas para atraí-las mesmo sem estar no target. Ativado por padrão." />
            <ConfigItem title="maxMonstersToProvoke" description="Número máximo de monstros para provocar simultaneamente. 0 para desativar o limite (provoca todos). Útil para não atrair monstros demais de uma vez." />
            <ConfigItem title="minMonstersToOrder" description="Número mínimo de monstros na box para o bot começar a ordenar o posicionamento do pokémon. Evita ordens desnecessárias com poucos monstros." />
            <ConfigItem title="disablePokeStopOnTargetSkills" description="Cancela o pokeStop antes de usar um pokémove de alvo único. Impede que o pokémon fique parado quando precisa se mover para atacar." />
            <ConfigItem title="ignoreShapeBoxOnTargetSkills" description="Permite usar pokémoves de alvo único em pokémons que estão fora do Shape Radius. Útil para alcançar monstros que não entraram na área de efeito. (Antigamente chamada de ignoreBoxRadiusOnTargetSkills — renomeada para manter consistência com o novo sistema.)" />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Sword className="w-6 h-6" />Fim de Combo</h3>

            <ConfigItem title="endOfComboActionOrder" description="Define a prioridade das ações após o fim de um combo.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Loot First (Padrão):</strong> Coleta loot primeiro, depois revive/potion. Mais eficiente, mas arriscado se o pokémon estiver com vida baixa.</li>
                    <li><strong>Healing First:</strong> Revive/potion primeiro, depois coleta loot. Mais seguro, pode perder corpos que desaparecem.</li>
                </ul>
            </ConfigItem>
            <ConfigItem title="waitForEnd" description="Tempo em segundos que o bot aguarda após o combo antes de continuar o cavebot. Útil para dar tempo de coletar loot de corpos distantes." />
            <ConfigItem title="attackDelay" description="Delay em milissegundos entre cada ataque. Valores maiores tornam o combate mais lento e humanizado. 0 para velocidade máxima." />
            <ConfigItem title="cdDelayBeforeRevive" description="Delay em segundos antes de usar revive no combo. Padrão: 1.1s. Previne race conditions onde o pokémove não dá dano porque o pokémon foi puxado cedo demais." />
            <ConfigItem title="cdDelayBeforeReviveOnExtraordinary" description="Delay de revive específico para quando está combatendo criaturas extraordinárias (shiny/mega/boss). Pode ser diferente do delay normal. Padrão: 1.1s." />
            <ConfigItem title="cdImmunityWindow" description="Janela de imunidade em segundos após revive durante a qual o bot assume que os cooldowns estão zerados. Previne tentativas de cast durante a animação de revive. Padrão: 3s." />
            <ConfigItem title="humanizedStopWalking" description="O bot não para de andar instantaneamente ao atingir o monsterStop — desacelera naturalmente como um jogador real. Gerenciado pelo módulo de Humanização quando ativo." />
            <ConfigItem title="drawCorpses" description="Exibe corpos de Pokémon derrotados no mapa. Necessário para coleta de pontos de estilista em Outland e para o sistema de loot visual." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Zap className="w-6 h-6" />Sistema de Stun Tático</h3>
            <p className="text-muted-foreground">Sistema dedicado para uso inteligente de pokémoves de stun com cenários configuráveis.</p>

            <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Aba em manutenção</AlertTitle>
                <AlertDescription>A configuração visual de Stun no painel está temporariamente em manutenção. O bot preserva a lógica interna e o fallback das pokémoves, mas o painel salva a aba de Stun desligada até a reorganização terminar.</AlertDescription>
            </Alert>

            <ConfigItem title="useStunMoves" description="Ativa o sistema de stun tático. Quando habilitado, pokémoves classificados como stun são usados de acordo com cenários configuráveis em vez de rotação normal.">
                <p><strong>Como Funciona:</strong> A IA detecta automaticamente quais pokémoves do seu setup são de stun (com base nos efeitos do jogo). Você configura em quais situações usar stun (ex: sempre contra shinies, quando há mais de 5 monstros, etc).</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Quando desativado</AlertTitle>
                    <AlertDescription>Pokémoves de stun são redistribuídas para <code>targetMoves</code> ou <code>areaMoves</code> automaticamente com base no tipo do pokémove. Nenhum pokémove é &quot;perdida&quot;.</AlertDescription>
                </Alert>
            </ConfigItem>
            <ConfigItem title="stunPriority" description="Define quando o stun é usado no fluxo do combo.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>before_combo:</strong> Usa stun ANTES de começar os pokémoves normais. Bom para imobilizar antes de atacar.</li>
                    <li><strong>during_combo:</strong> Usa stun no meio da rotação normal de pokémoves.</li>
                    <li><strong>on_demand:</strong> Usa stun somente quando um cenário específico é ativado (ex: shiny apareceu).</li>
                </ul>
            </ConfigItem>
            <ConfigItem title="stunCooldownBuffer" description="Buffer em milissegundos adicionado ao cooldown real do stun. Previne tentativas de cast quando o pokémove ainda está em cooldown mas o timer está no limite." />
            <ConfigItem title="Cenários de Stun" description="Configure até 10 situações diferentes que ativam o uso de stun.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>always:</strong> Sempre usa stun quando disponível.</li>
                    <li><strong>extraordinary / shiny / mega / boss:</strong> Usa stun quando criaturas especiais estão na box.</li>
                    <li><strong>creature_name:</strong> Usa stun contra um Pokémon específico (pelo nome).</li>
                    <li><strong>creature_count:</strong> Usa stun quando há X ou mais monstros na box.</li>
                    <li><strong>pokemon_hp_below:</strong> Usa stun quando a vida do seu Pokémon cai abaixo de um percentual.</li>
                    <li><strong>during_lure:</strong> Usa stun durante o lure, antes do combo iniciar.</li>
                    <li><strong>combo_start:</strong> Usa stun apenas no início do combo.</li>
                </ul>
            </ConfigItem>
        </section>
    );
}
