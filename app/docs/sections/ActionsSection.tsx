"use client";

import { Bot } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function ActionsSection() {
    return (
        <section id="actions" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Bot className="w-8 h-8" />Módulo Actions &amp; Rules</h2>
            <p className="text-muted-foreground">
                O módulo <code>Actions &amp; Rules</code> é o cérebro de automação avançada do KizuBot. Nele você cria “regras” que
                observam o jogo (condições) e, quando essas condições são verdadeiras, executam uma sequência de ações totalmente
                configurável, como falar no chat, usar itens, teleportar, pausar o cavebot, tocar alarmes, rodar scripts seguros, etc.
            </p>

            <ConfigItem
                title="Visão Geral"
                description="Como o sistema de regras conecta o painel ao cliente do bot."
            >
                <p>
                    Você pode enxergar o módulo <code>Actions &amp; Rules</code> como uma ponte entre o que você configura no painel e o que
                    o bot faz dentro do jogo. Cada regra criada no painel vira uma "receita de automação" que o cliente do bot segue com
                    base em condições e ações bem definidas.
                </p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>No painel:</strong> você monta regras visuais com nome, condições, grupos lógicos, sequência de ações e, se quiser, uma hotkey.</li>
                    <li><strong>Na nuvem:</strong> essas regras são guardadas junto com as demais configurações da sua conta, ficando disponíveis para qualquer instância do bot vinculada a você.</li>
                    <li><strong>No cliente do bot:</strong> quando o bot carrega suas configurações, ele recebe a lista atualizada de regras de Actions &amp; Rules e atualiza o módulo responsável por monitorar o jogo.</li>
                    <li><strong>Em tempo real:</strong> enquanto você joga (ou deixa o bot jogando), esse módulo fica avaliando condições e eventos do jogo e dispara as sequências de ações das regras que estiverem habilitadas.</li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Estrutura de uma Regra"
                description="Componentes principais que você configura na tela de Actions."
            >
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <strong>name:</strong> nome único da regra. É usado para organização, logs e para identificar timers internos.
                    </li>
                    <li>
                        <strong>enabled:</strong> liga/desliga a regra inteira. Ideal para testar regras novas sem apagá-las.
                    </li>
                    <li>
                        <strong>hotkey:</strong> tecla opcional (por exemplo, <code>J</code>) que vira um atalho <code>Alt+J</code> dentro do jogo. O <code>ActionsModule.registerAllHotkeys()</code> registra esses atalhos sempre que as configs são carregadas.
                    </li>
                    <li>
                        <strong>onlyInPz / onlyOutsidePz:</strong> filtros globais para rodar a regra apenas dentro ou fora de PZ.
                    </li>
                    <li>
                        <strong>pokemonSummoned:</strong> permite exigir que o Pokémon esteja ou não esteja sumonado para que a regra funcione.
                    </li>
                    <li>
                        <strong>actions:</strong> lista ordenada de ações que serão executadas em sequência quando a regra ativar.
                    </li>
                    <li>
                        <strong>condition_groups:</strong> grupos de condições com lógica <code>AND</code>/<code>OR</code> que definem quando a regra dispara.
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Condições (Condition Groups)"
                description="Quando a regra dispara."
            >
                <p>
                    As condições são o “se” da sua automação. No painel, você monta grupos com a propriedade <code>logic</code> ("AND" ou "OR")
                    e uma lista de <code>conditions</code>. O fluxo é o seguinte:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <strong>logic = "OR":</strong> a regra dispara se qualquer condição daquele grupo for verdadeira.
                    </li>
                    <li>
                        <strong>logic = "AND":</strong> todas as condições do grupo precisam ser verdadeiras ao mesmo tempo.
                    </li>
                    <li>
                        <strong>Tipos de condição mais usados:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><code>time_is</code> / <code>time_between</code> / <code>server_save</code> / <code>timed_logout</code> / <code>timed</code>: regras baseadas em horário, uptime do bot ou eventos recorrentes (<code>interval</code> em milissegundos — padrão <code>60000</code> = 1 minuto; aceita também <code>interval_min</code>/<code>interval_max</code> para randomização).</li>
                            <li><code>player_on_screen</code> / <code>player_count_is</code> / <code>no_player_on_screen</code>: monitoram a presença e quantidade de jogadores na tela, com opção de ignorar membros da party.</li>
                            <li><code>is_in_pz</code> / <code>is_not_in_pz</code> / <code>is_in_combat</code> / <code>is_not_in_combat</code>: cuidam de contexto de segurança (cidade, combate, etc.).</li>
                            <li><code>player_health</code> / <code>player_health_between</code>: gatilhos por percentual de vida do personagem.</li>
                            <li><code>pokemon_health</code> / <code>pokemon_health_between</code> / <code>pokemon_not_summoned</code> / <code>active_pokemon_is</code>: gatilhos por status do Pokémon ou verificar qual pokémon está ativo.</li>
                            <li><code>has_status</code> / <code>missing_status</code> / <code>has_any_bad_status</code> / <code>move_off_cooldown</code>: verificam status conditions (poisoned, burning, paralyzed, etc.) e cooldown de habilidades.</li>
                            <li><code>all_moves_in_cooldown</code> / <code>target_moves_in_cooldown</code>: verificam se todos os pokémoves (área + alvo) ou apenas as de alvo estão em cooldown - ideal para Smart Swap e otimização de DPS.</li>
                            <li><code>pokemon_unsummoned</code>: detecta quando o Pokémon foi dessummonado forçadamente (teleport, dive, ou outras mecânicas do jogo).</li>
                            <li><code>target_health_between</code>: regras que dependem da vida do monstro que você está atacando.</li>
                            <li><code>creature_in_box</code> / <code>creature_in_screen</code> / <code>creature_count</code>: monitoram criaturas em volta ou na box.</li>
                            <li><code>extraordinary_in_box</code> / <code>extraordinary_in_screen</code> / <code>shiny_in_*</code> / <code>boss_in_*</code> / <code>mega_in_*</code>: gatilhos específicos para shinies, bosses e megas.</li>
                            <li><code>item_count_lower_than</code> / <code>item_count_higher_than</code>: monitoram quantidade de itens (revives, pokébolas, etc.).</li>
                            <li><code>module_enabled</code>: verifica se um módulo específico (Cavebot, Farming, etc.) está ligado.</li>
                            <li><code>chat_message</code> / <code>text_message</code>: respondem a mensagens específicas no chat. Mensagens enviadas pelo próprio bot são ignoradas para evitar loop de resposta automática.</li>
                            <li><code>creature_appear</code> / <code>player_watching_tv</code>: condições baseadas em eventos pontuais observados pelo bot.</li>
                            <li><code>pokemon_dead</code>: dispara no exato momento em que o pokémon ativo morre — usado pelo Smart Swap &quot;On Death&quot;.</li>
                            <li><code>combo_active</code> / <code>lure_active</code>: verificam o estado interno do combate — se você está em combo ou ainda na fase de lure.</li>
                            <li><code>staff_on_screen</code> / <code>gm_arrow_detected</code> / <code>anti_bot_warning</code>: condições usadas pelo sistema de GM Protection (detecção de staff, seta do GM, aviso anti-bot do servidor).</li>
                            <li><code>is_flying</code> / <code>is_not_flying</code> / <code>is_riding</code> / <code>is_not_riding</code> / <code>is_in_vehicle</code> / <code>is_not_in_vehicle</code> / <code>is_broadcasting_tv</code> / <code>is_party_leader</code> / <code>is_near_waypoint</code>: verificam estados especiais do personagem, do Pokémon ou da rota.</li>
                            <li><code>state_variable_is</code> / <code>state_cooldown_passed</code> / <code>player_state_is</code>: permitem criar lógicas com memória e cooldowns personalizados usando variáveis internas do módulo.</li>
                        </ul>
                    </li>
                    <li>
                        Por baixo dos panos, o módulo de ações avalia cada condição com base no contexto atual (vida, criaturas na tela,
                        mensagens recebidas, etc.) e decide se a regra pode ou não disparar.
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Ações Disponíveis"
                description="O que a regra pode fazer por você no jogo."
            >
                <p>
                    Quando uma regra dispara, o bot percorre a lista de <code>actions</code> que você configurou. Alguns exemplos práticos
                    que você enxerga na tela de edição:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>talk / say_random:</strong> envia mensagens formatadas em canais como <code>say</code>, <code>trade</code>, party, TV ou privado, com placeholders como <code>{"{player}"}</code> ou <code>{"{creature.name}"}</code>.</li>
                    <li><strong>use_item:</strong> usa itens no player, no Pokémon ou em posições calculadas (por exemplo, ao redor do Pokémon), perfeito para revives, potions, boxes, etc.</li>
                    <li><strong>cast_spell:</strong> dispara um move específico do seu Pokémon pelo ID do slot (1–12).</li>
                    <li><strong>call_pokemon / swap_pokemon / revive_pokemon:</strong> controla qual Pokémon está em campo, revive pokémons específicos e gerencia o time durante a hunt.</li>
                    <li><strong>teleport:</strong> usa o teleporte do Pokémon para voltar a cidades/locais específicos quando as condições são atendidas.</li>
                    <li><strong>toggle_module / pause_cavebot:</strong> liga/desliga módulos (Cavebot, Farming, etc.) ou pausa o Cavebot por um tempo determinado, retomando depois automaticamente, se configurado. O nome do módulo aceita variações de maiúsculas/minúsculas e o alias <code>is</code> para o master toggle.</li>
                    <li><strong>change_setting:</strong> altera configurações avançadas em tempo real (por exemplo, ligar/desligar <code>CombatModule.ksIgnoreLoot</code> ou mudar prioridades).</li>
                    <li><strong>set_state / increment_state:</strong> manipulam variáveis internas de estado, permitindo regras com memória (como contar quantos avisos um jogador já recebeu antes de tomar uma ação mais agressiva).</li>
                    <li><strong>wait:</strong> pausa a sequência por alguns milissegundos, útil para criar fluxos do tipo “faz X, espera Y, depois faz Z”.</li>
                    <li><strong>play_alarm:</strong> toca sons integrados ao módulo de alarmes, com texto opcional para log ou notificações externas.</li>
                    <li><strong>walk_to_waypoint / set_cavebot_waypoint:</strong> movem ou reposicionam o Cavebot para um waypoint específico, ótimo para rotas de fuga ou atalho até uma área.</li>
                    <li><strong>force_logout / safe_logout / reconnect / panic_shutdown:</strong> controlam desligar e religar o cliente de forma automática, incluindo desligamento de emergência com mensagem personalizada.</li>
                    <li><strong>sell_item_market / search_item_market / buy_cheapest_item_market:</strong> automatizam interações com o market do jogo (busca, venda e compra de itens dentro de parâmetros definidos).</li>
                    <li><strong>talk_to_npc / npc_select_option / buy_npc_item:</strong> automatizam diálogos com NPCs, seleção de opções e compra de itens diretamente pelos menus.</li>
                    <li><strong>run_script:</strong> executa scripts pré-definidos e seguros do próprio cliente do bot (não editáveis pelo usuário): <code>deposit_money</code>, <code>withdraw_money</code>, <code>open_private_chat</code>, <code>send_party_invite</code>, <code>talk_nurse_joy</code>, <code>stack_items_in_container</code>, <code>tv_ban</code>, <code>tv_unban</code>, <code>use_vehicle</code>.</li>
                    <li><strong>stop_sequence:</strong> encerra a execução da regra no ponto atual, útil para criar “if/else” dentro da mesma sequência.</li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Cheat Sheet de Conditions &amp; Actions"
                description="Tabela-resumo com os tipos mais usados e quando aplicar cada um."
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Conditions (gatilhos)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-border rounded-md overflow-hidden">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Tipo</th>
                                        <th className="px-3 py-2 text-left">Quando usar</th>
                                        <th className="px-3 py-2 text-left">Campos principais</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>time_between</code> / <code>time_is</code></td>
                                        <td className="px-3 py-2 align-top">Regras por horário específico ou janela de horário (ex.: antes do server save).</td>
                                        <td className="px-3 py-2 align-top"><code>start_time</code>, <code>end_time</code>, <code>time</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>player_on_screen</code></td>
                                        <td className="px-3 py-2 align-top">Detectar qualquer jogador na tela e reagir, ignorando party se quiser.</td>
                                        <td className="px-3 py-2 align-top"><code>ignore_party_members</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>player_health_between</code> / <code>pokemon_health_between</code></td>
                                        <td className="px-3 py-2 align-top">Automatizar ações de segurança quando a vida cair abaixo de um limite.</td>
                                        <td className="px-3 py-2 align-top"><code>min_percent</code>, <code>max_percent</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>item_count_lower_than</code></td>
                                        <td className="px-3 py-2 align-top">Detectar quando um item crítico (revive, pokébola, berry) está acabando.</td>
                                        <td className="px-3 py-2 align-top"><code>item_name</code>, <code>count</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>chat_message</code> / <code>text_message</code></td>
                                        <td className="px-3 py-2 align-top">Reagir a mensagens-chave no chat (ex.: comandos, avisos ou perguntas).</td>
                                        <td className="px-3 py-2 align-top"><code>channel</code> (para <code>chat_message</code>), <code>contains</code> (opcional)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>extraordinary_in_screen</code></td>
                                        <td className="px-3 py-2 align-top">Detectar shinies/bosses/megas na tela para tocar alarmes ou mudar a rota.</td>
                                        <td className="px-3 py-2 align-top">Sem campos obrigatórios além do <code>type</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>state_cooldown_passed</code></td>
                                        <td className="px-3 py-2 align-top">Impedir que uma regra dispare muitas vezes em pouco tempo (cooldown customizado).</td>
                                        <td className="px-3 py-2 align-top"><code>variable</code>, <code>cooldown</code> (segundos)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>has_status</code> / <code>missing_status</code></td>
                                        <td className="px-3 py-2 align-top">Verificar se player/pokémon tem ou não tem um status (poisoned, burning, paralyzed, etc.).</td>
                                        <td className="px-3 py-2 align-top"><code>target</code> (player/pokemon), <code>status_name</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>active_pokemon_is</code></td>
                                        <td className="px-3 py-2 align-top">Verificar se o pokémon ativo é um específico por nome.</td>
                                        <td className="px-3 py-2 align-top"><code>name</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>all_moves_in_cooldown</code></td>
                                        <td className="px-3 py-2 align-top">Detectar quando todos os pokémoves (área + alvo) estão em cooldown - ideal para Smart Swap.</td>
                                        <td className="px-3 py-2 align-top">Sem campos obrigatórios</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>pokemon_unsummoned</code></td>
                                        <td className="px-3 py-2 align-top">Detectar dessummon forçado (teleport, dive, mecânicas do jogo).</td>
                                        <td className="px-3 py-2 align-top">Sem campos obrigatórios</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Actions (o que executar)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-border rounded-md overflow-hidden">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Tipo</th>
                                        <th className="px-3 py-2 text-left">Quando usar</th>
                                        <th className="px-3 py-2 text-left">Campos principais</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>talk</code> / <code>say_random</code></td>
                                        <td className="px-3 py-2 align-top">Enviar avisos automáticos, respostas de PM ou mensagens de roleplay.</td>
                                        <td className="px-3 py-2 align-top"><code>channel</code>, <code>message</code> ou <code>messages[]</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>use_item</code></td>
                                        <td className="px-3 py-2 align-top">Usar itens de cura, revives, boxes ou qualquer outro item configurado.</td>
                                        <td className="px-3 py-2 align-top"><code>item_name</code>, <code>target</code>, <code>positionOption</code> (opcional)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>cast_spell</code></td>
                                        <td className="px-3 py-2 align-top">Forçar o uso de um move específico em momentos críticos.</td>
                                        <td className="px-3 py-2 align-top"><code>move_id</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>toggle_module</code> / <code>pause_cavebot</code></td>
                                        <td className="px-3 py-2 align-top">Ativar/desativar módulos inteiros com base em risco, status ou horário.</td>
                                        <td className="px-3 py-2 align-top"><code>module</code>, <code>state</code>, <code>duration</code> (para pausa)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>play_alarm</code></td>
                                        <td className="px-3 py-2 align-top">Ser avisado imediatamente (som/notificação) quando algo muito importante acontece.</td>
                                        <td className="px-3 py-2 align-top"><code>sound</code>, <code>text</code> (opcional), <code>loops</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>set_state</code> / <code>increment_state</code></td>
                                        <td className="px-3 py-2 align-top">Marcar que algo aconteceu (avisos, tentativas, flags) e usar isso em outras regras.</td>
                                        <td className="px-3 py-2 align-top"><code>variable</code>, <code>value</code> ou <code>amount</code></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 align-top"><code>run_script</code></td>
                                        <td className="px-3 py-2 align-top">Aproveitar ações complexas prontas (depositar dinheiro, abrir PM, banir da TV, etc.).</td>
                                        <td className="px-3 py-2 align-top"><code>script_id</code>, parâmetros específicos do script (quando existirem)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </ConfigItem>

            <ConfigItem
                title="Placeholders e Contexto"
                description="Torne as regras inteligentes usando dados do evento."
            >
                <p>
                    Diversas ações e condições suportam placeholders como <code>{"{player}"}</code>, <code>{"{message}"}</code> ou
                    <code>{"{creature.name}"}</code>. O módulo converte essas variáveis usando a função
                    <code>ActionsModule.resolvePlaceholders</code>, que busca os valores dentro de um objeto de contexto
                    (<code>eventData</code>).
                </p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        Em regras de chat, <code>eventData.player</code> e <code>eventData.message</code> são preenchidos automaticamente com o jogador e a mensagem recebida.
                    </li>
                    <li>
                        Em regras de TV, <code>eventData.watcherName</code> e variáveis como
                        <code>ActionsModule.state.tvWatchers</code> permitem banir ou notificar quem está assistindo há muito tempo.
                    </li>
                    <li>
                        Em regras de criaturas, <code>eventData.creature</code> carrega o monstro que apareceu ou está sendo atacado, permitindo mensagens altamente personalizadas.
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Presets de Actions"
                description="Modelos prontos para você não começar do zero."
            >
                <p>
                    A aba de presets da página de Actions traz uma coleção de modelos prontos (presets) organizados por categoria
                    (Utility, System &amp; Automation, etc.), já configurados e prontos para serem importados e ajustados.
                </p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <strong>Deposit Money (Hotkey):</strong> cria uma regra com hotkey que chama o script seguro
                        <code>deposit_money</code>, responsável por abrir o cofre e depositar todo o dinheiro (ou um valor específico se você configurar <code>count</code>).
                    </li>
                    <li>
                        <strong>Safe Logout on Player Detection:</strong> detecta um jogador na tela, executa
                        <code>panic_shutdown</code> com uma mensagem personalizada usando <code>{"{player}"}</code>, espera 5 minutos, reconecta e ativa novamente os módulos principais.
                    </li>
                </ul>
                <p>
                    Esses presets são um excelente ponto de partida: você pode importar, testar, ajustar textos, tempos e módulos
                    afetados, em vez de montar tudo do zero.
                </p>
                <p>
                    A lógica interna desses presets é exatamente a mesma que você configura manualmente no painel. Eles existem apenas
                    para poupar tempo e servir como "receitas prontas" que você pode adaptar ao seu estilo de jogo.
                </p>
            </ConfigItem>

            <ConfigItem
                title="Exemplos Práticos de Regras"
                description="Passo a passo de configurações comuns usando Actions &amp; Rules."
            >
                <h4 className="font-semibold mb-2">1. Safe Logout ao Detectar Jogador</h4>
                <p className="mb-2">
                    Objetivo: se qualquer jogador aparecer na sua tela durante a hunt, o bot deve desligar tudo com segurança, esperar
                    um tempo e depois tentar reconectar.
                </p>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li><strong>Nome da regra:</strong> <code>Safe Logout on Player Detection</code></li>
                    <li><strong>onlyOutsidePz:</strong> ativado (true), para não disparar enquanto você está parado em cidade/PZ.</li>
                    <li>
                        <strong>condition_groups:</strong> um grupo com <code>logic = "OR"</code> e uma condição:
                        <ul className="list-disc ml-6 space-y-1">
                            <li><code>type = "player_on_screen"</code></li>
                            <li><code>ignore_party_members = true</code> para não considerar sua própria party como ameaça.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>actions (em ordem):</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>panic_shutdown</code> com <code>reason = "Panic shutdown due to player {"{player}"} on screen."</code> — usa o placeholder para registrar quem foi detectado.
                            </li>
                            <li><code>wait</code> com <code>duration = 300000</code> (5 minutos) — dá tempo para o player ir embora.</li>
                            <li><code>reconnect</code> — tenta logar novamente na conta usando as infos de <code>AccountModule.accountInfo</code>.</li>
                            <li><code>toggle_module</code> com <code>module = "All"</code> e <code>state = true</code> — reativa os módulos após o retorno.</li>
                        </ul>
                    </li>
                </ul>

                <h4 className="font-semibold mb-2">2. Depositar Dinheiro com Hotkey</h4>
                <p className="mb-2">
                    Objetivo: ao apertar uma tecla, o bot abre o cofre e deposita todo o dinheiro (ou um valor específico).
                </p>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li><strong>Nome da regra:</strong> <code>Deposit Money (Hotkey)</code></li>
                    <li><strong>enabled:</strong> true</li>
                    <li><strong>hotkey:</strong> <code>D</code> (no jogo isso vira <code>Alt+D</code>)</li>
                    <li><strong>condition_groups:</strong> pode ficar vazio — a execução será manual via hotkey.</li>
                    <li>
                        <strong>actions:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>run_script</code> com <code>script_id = "deposit_money"</code> — chama um script seguro interno do cliente do bot.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Variação com valor fixo:</strong> adicione o parâmetro <code>count</code> na action para depositar apenas
                        parte do dinheiro (ex.: <code>count = 50000</code> para 50k).
                    </li>
                </ul>

                <h4 className="font-semibold mb-2">3. Responder PM Automaticamente</h4>
                <p className="mb-2">
                    Objetivo: mandar uma resposta automática quando alguém te envia uma mensagem privada, usando o nome e o conteúdo da
                    mensagem na resposta.
                </p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Nome da regra:</strong> <code>Auto Reply Private Message</code></li>
                    <li><strong>enabled:</strong> true</li>
                    <li><strong>condition_groups:</strong> um grupo com <code>logic = "OR"</code> e uma condição:</li>
                </ul>
                <ul className="list-disc ml-10 space-y-1 mb-2">
                    <li><code>type = "chat_message"</code></li>
                    <li><code>channel = "private"</code></li>
                    <li><code>contains</code> opcional — se você quiser que dispare só quando a mensagem tiver uma palavra-chave.</li>
                </ul>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li>
                        <strong>actions:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>talk</code> com:
                                <ul className="list-disc ml-6 space-y-1">
                                    <li><code>channel = "private"</code></li>
                                    <li>
                                        <code>message = "Olá {"{player}"}, recebi sua mensagem: {"{message}"}. No momento estou usando o KizuBot, em breve
                                        respondo manualmente."</code>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Opcional: use <code>set_state</code> + <code>state_cooldown_passed</code> em uma segunda regra para evitar
                                responder spam do mesmo jogador muitas vezes em pouco tempo.
                            </li>
                        </ul>
                    </li>
                </ul>

                <h4 className="font-semibold mb-2">4. Aviso ao Detectar Shiny/Boss/Mega</h4>
                <p className="mb-2">
                    Objetivo: tocar um alarme específico e mandar uma mensagem quando uma criatura extraordinária aparecer na tela.
                </p>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li><strong>Nome da regra:</strong> <code>Extraordinary Creature Alert</code></li>
                    <li><strong>enabled:</strong> true</li>
                    <li>
                        <strong>condition_groups:</strong> um grupo com <code>logic = "OR"</code> e uma condição do tipo
                        <code>extraordinary_in_screen</code> (ou condição equivalente disponível no painel que detecte extraordinários).
                    </li>
                    <li>
                        <strong>actions:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>play_alarm</code> com <code>sound = "shinyDetected"</code>, <code>loops = 3</code> e um texto opcional
                                (ex.: "Shiny/Boss/Mega na tela!").
                            </li>
                            <li>
                                Opcional: adicionar uma action <code>talk</code> em canal privado para avisar outra conta sua ou parceiro de hunt.
                            </li>
                        </ul>
                    </li>
                </ul>

                <h4 className="font-semibold mb-2">5. Usar Stun baseado na vida do Pokémon alvo</h4>
                <p className="mb-2">
                    Objetivo: usar automaticamente um movimento de stun quando a vida do alvo estiver abaixo de um limite, ajudando a
                    controlar lures perigosos.
                </p>
                <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li><strong>Nome da regra:</strong> <code>Use Stun on Low Target HP</code></li>
                    <li><strong>enabled:</strong> true</li>
                    <li>
                        <strong>condition_groups:</strong> um grupo com <code>logic = "OR"</code> e uma condição do tipo
                        <code>target_health_between</code> com <code>min_percent</code> e <code>max_percent</code> configurados (por exemplo, entre 1% e 30%).
                    </li>
                    <li>
                        <strong>actions:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>cast_spell</code> com <code>move_id</code> apontando para o slot do seu stun na barra de moves.
                            </li>
                        </ul>
                    </li>
                </ul>

                <h4 className="font-semibold mb-2">6. Regra Anti-Gank Completa (múltiplos grupos)</h4>
                <p className="mb-2">
                    Objetivo: criar uma proteção completa contra gank, combinando detecção de players, checagem de vida e cooldown para
                    não ficar desligando e religando o bot o tempo todo.
                </p>
                <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Nome da regra:</strong> <code>Anti-Gank Protection</code></li>
                    <li><strong>enabled:</strong> true</li>
                    <li><strong>onlyOutsidePz:</strong> true (só faz sentido quando você está em hunt).</li>
                    <li>
                        <strong>condition_groups:</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <strong>Grupo 1 (detecção de risco)</strong> — <code>logic = "OR"</code>:
                                <ul className="list-disc ml-6 space-y-1">
                                    <li><code>player_on_screen</code> com <code>ignore_party_members = true</code>.</li>
                                    <li><code>player_count_is</code> com <code>greater_than = 2</code> (mais de dois jogadores na tela).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Grupo 2 (estado do personagem)</strong> — <code>logic = "AND"</code>:
                                <ul className="list-disc ml-6 space-y-1">
                                    <li><code>player_health_between</code> com <code>min_percent = 1</code> e <code>max_percent = 70</code>.</li>
                                    <li><code>is_not_in_pz</code> (garantir que você ainda está exposto).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Grupo 3 (cooldown da proteção)</strong> — <code>logic = "AND"</code>:
                                <ul className="list-disc ml-6 space-y-1">
                                    <li><code>state_cooldown_passed</code> com <code>variable = "anti_gank_last_trigger"</code> e <code>cooldown</code> em segundos.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>actions (em ordem):</strong>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>
                                <code>set_state</code> com <code>variable = "anti_gank_last_trigger"</code> e <code>value = true</code> para registrar o último disparo da proteção.
                            </li>
                            <li>
                                <code>panic_shutdown</code> com uma mensagem explicando o motivo (por exemplo,
                                <code>"Anti-gank triggered due to players on screen."</code>), para desligar tudo de forma segura.
                            </li>
                            <li>
                                Opcional: adicionar um <code>play_alarm</code> ou envio de mensagem privada para avisar outra conta sua que o
                                anti-gank foi ativado.
                            </li>
                        </ul>
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Debugando Regras (Quando algo não dispara)"
                description="Passos simples para entender por que uma regra não está funcionando como esperado."
            >
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <strong>1. Teste via hotkey primeiro:</strong> se sua regra tiver <code>hotkey</code>, deixe
                        <code>condition_groups</code> o mais simples possível ou até vazio, e confirme se a sequência de ações funciona quando você pressiona o atalho (Alt+tecla).
                    </li>
                    <li>
                        <strong>2. Revise os filtros globais:</strong> confira se <code>onlyInPz</code>, <code>onlyOutsidePz</code> e
                        <code>pokemonSummoned</code> fazem sentido para o cenário em que você está testando. Esses filtros bloqueiam a regra mesmo que as condições internas sejam verdadeiras.
                    </li>
                    <li>
                        <strong>3. Simplifique as condições:</strong> comece com uma única condição em um grupo (por exemplo,
                        <code>player_health</code>) e verifique se dispara. Depois vá adicionando mais condições ou grupos aos poucos.
                    </li>
                    <li>
                        <strong>4. Verifique valores numéricos:</strong> certifique-se de que campos como percentuais, intervalos e contagens
                        (por exemplo, <code>duration</code>, <code>min_percent</code>, <code>max_percent</code>, <code>count</code>) estejam coerentes com o que você espera no jogo.
                    </li>
                    <li>
                        <strong>5. Use placeholders com cuidado:</strong> se a mensagem usa <code>{"{player}"}</code> ou
                        <code>{"{message}"}</code>, verifique se a condição realmente preenche esse contexto (por exemplo,
                        <code>chat_message</code> em canal privado).
                    </li>
                    <li>
                        <strong>6. Evite conflitos entre regras:</strong> duas regras podem tentar fazer coisas opostas ao mesmo tempo (uma
                        ligando módulo, outra desligando). Se algo parecer "piscando" ou instável, desative regras semelhantes e teste uma por vez.
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="FAQ de Actions &amp; Rules"
                description="Perguntas frequentes sobre o uso do sistema de ações."
            >
                <ul className="list-disc ml-6 space-y-3">
                    <li>
                        <strong>Posso usar Actions &amp; Rules sem presets?</strong>
                        <p>Sim. Os presets são apenas atalhos para criar regras prontas. Você pode montar tudo manualmente, campo por campo, usando a mesma interface.</p>
                    </li>
                    <li>
                        <strong>O que acontece se eu apagar um preset?</strong>
                        <p>Apagar um preset importado não afeta o funcionamento do bot nem suas outras regras. Ele só deixa de aparecer na lista de regras do painel.</p>
                    </li>
                    <li>
                        <strong>Regras com <code>timed</code> podem me prejudicar?</strong>
                        <p>Podem, se configuradas com intervalos muito baixos. Use intervalos maiores e, sempre que possível, combine com
                        condições de cooldown (<code>state_cooldown_passed</code>) para evitar spam de ações.</p>
                    </li>
                    <li>
                        <strong>Posso usar Actions para substituir totalmente o Cavebot?</strong>
                        <p>O foco de Actions &amp; Rules é reagir a eventos e estados (vida, players, mensagens, horários). Ele complementa o Cavebot e outros módulos, mas não substitui um script de movimentação completo.</p>
                    </li>
                    <li>
                        <strong>Se eu errar uma regra, posso quebrar o bot?</strong>
                        <p>Erros de configuração normalmente só fazem a regra não disparar ou se comportar de forma indesejada. Se algo parecer estranho, desative a regra (<code>enabled = false</code>) e ajuste aos poucos até chegar no comportamento desejado.</p>
                    </li>
                </ul>
            </ConfigItem>

            <ConfigItem
                title="Boas Práticas"
                description="Dicas para criar regras poderosas e seguras."
            >
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Comece simples:</strong> crie regras com poucas condições e 1–2 ações para validar o comportamento.</li>
                    <li><strong>Use hotkeys para teste:</strong> ative a mesma sequência via hotkey antes de deixá-la totalmente automatizada.</li>
                    <li><strong>Combine com Alarmes:</strong> use <code>play_alarm</code> e notificações externas para saber quando uma regra crítica é disparada.</li>
                    <li><strong>Atenção a loops:</strong> evite criar regras que se auto-disparem em alta frequência (por exemplo, <code>timed</code> com intervalo muito baixo) sem algum controle de cooldown via <code>state_cooldown_passed</code>.</li>
                    <li><strong>Priorize segurança:</strong> em ações de TV, player detection e staff, prefira desligar módulos, pausar cavebot ou fazer logout seguro antes de qualquer ação agressiva.</li>
                </ul>
            </ConfigItem>
        </section>
    );
}
