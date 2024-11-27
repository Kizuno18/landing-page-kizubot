"use client";

import React from "react";
import { Cpu, Shield, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function EngineSection() {
    return (
        <section id="engine" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Cpu className="w-8 h-8" />Engine (Geral)</h2>
            <p className="text-muted-foreground">Configurações gerais, de segurança, GM Protection e comportamento do núcleo do bot.</p>

            <ConfigItem title="callPokemonWhenTrapped" description="Quando o bot está travado (sem caminho), chama o pokémon de volta e tenta outra rota. Evita que o pokémon fique parado indefinidamente." />
            <ConfigItem title="autoDeactivateMountary" description="Desmonta automaticamente a montaria quando necessário (ex: ao entrar em combate). Só atua enquanto o master toggle do bot está ligado." />
            <ConfigItem title="hidePurplePokemons" description="Esconde pokémons roxos (envenenados) da visualização para não confundir a IA de targeting." />
            <ConfigItem title="hideBrotherHoodNpcs" description="Esconde NPCs da Brotherhood para que a IA não os confunda com monstros de hunt. Oculta megas, bosses e shinies dos NPCs da BH." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Shield className="w-6 h-6" />Criaturas Extraordinárias</h3>

            <ConfigItem title="autoKillExtraordinary" description="Quando ativado, o bot prioriza e ataca imediatamente qualquer criatura extraordinária (Shiny, Boss, Mega ou da lista customizada). Respeita o Shape Radius antes de iniciar o combo." />
            <ConfigItem title="useOnlyAreaMovesOnExtraordinary" description="Força o uso apenas de pokémoves de área ao combater criaturas extraordinárias. Opcional — quando desativado, usa rotação normal de pokémoves." />
            <ConfigItem title="extraordinaryCreatures / priorityCreatures" description="Listas customizáveis para targeting especial.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>extraordinaryCreatures:</strong> Tratados como Shiny/Boss (ataque imediato, keep distance, alarme, loot forçado).</li>
                    <li><strong>priorityCreatures:</strong> Param o lure mas são combatidos com lógica normal, não de extraordinários.</li>
                </ul>
            </ConfigItem>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Distância contra extraordinárias migrou para Combate</AlertTitle>
                <AlertDescription>
                    Os campos <code>extraordinaryKeepDistance</code> e <code>keepExactDistanceOnExtraordinary</code> saíram desta aba e agora vivem em <strong>Combat &gt; Posicionamento e Distância &gt; Extraordinary</strong>, junto com as outras configs de distância unificadas e o sistema de Regras Situacionais. O comportamento do bot não mudou — só a localização no painel.
                </AlertDescription>
            </Alert>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Shield className="w-6 h-6" />GM Protection</h3>
            <p className="text-muted-foreground">Sistema dedicado de proteção contra GMs com detecção separada de staff na tela, seta do GM e aviso anti-bot.</p>

            <ConfigItem title="Modos de Proteção" description="Três modos de reação ao detectar um GM na tela.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Partial (stopBotOnStaff):</strong> Pausa módulos selecionados (Cavebot, Farming, Fishing) mas continua curando. Reativa automaticamente após o GM sair.</li>
                    <li><strong>Full (shutdownOnStaff):</strong> Inicia logout seguro — termina o combate atual e desloga.</li>
                    <li><strong>Suicide (suicideOnStaff):</strong> Desliga healing, cancela ataque, e anda em direção ao grupo de monstros mais denso para morrer &quot;acidentalmente&quot;.</li>
                </ul>
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Modo Suicídio</AlertTitle>
                    <AlertDescription>Use como último recurso. O pokémon vai morrer. É a reação mais &quot;natural&quot; — parece que o jogador não estava prestando atenção.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="staffDeactivationModules" description="No modo Partial, define quais módulos são desativados ao detectar GM. Escolha individualmente entre Cavebot, Farming e Fishing." />
            <ConfigItem title="timeAfterGM" description="Tempo em segundos para esperar após o GM sair da tela antes de reativar os módulos. Padrão: 60 segundos. Evita reativação prematura." />
            <ConfigItem title="gmCooldown" description="Tempo de segurança depois da última atividade de GM antes de reativar o bot.">
                <p>Esse tempo reinicia quando o bot vê qualquer evento de GM: staff na tela, seta do GM, mensagem suspeita ou report. Assim o bot não volta a agir no meio de uma abordagem ainda em andamento.</p>
            </ConfigItem>

            <ConfigItem title="autoStepOnArrow" description="Quando a seta do GM aparece no chão, o bot automaticamente pisa nela. Se desativado, a seta é ignorada." />
            <ConfigItem title="danceForGM" description="O bot responde ao GM dançando e/ou enviando mensagens configuráveis. As frases e respostas são configuradas na aba de Alarmes." />

            <ConfigItem title="useSimilarity" description="Detecta nomes de staff por similaridade (ex: 'GMaster' seria detectado como 'GM'). Nomes muito curtos são tratados com mais cuidado para reduzir falsos positivos." />

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Relação com Humanização</AlertTitle>
                <AlertDescription>O módulo de Humanização adiciona delays naturais à reação do GM (tempo antes de responder, fadiga após múltiplas setas, ordem de dançar/falar). Configure na aba Humanização &gt; Comportamento.</AlertDescription>
            </Alert>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Cpu className="w-6 h-6" />Outros</h3>

            <ConfigItem title="streamerMode" description="Modo streamer: esconde informações sensíveis do painel (login, senha, telefone do WhatsApp, IP da máquina) para permitir gravações ou streams sem vazar dados. Pode ser ativado/desativado a qualquer momento." />
            <ConfigItem title="In-Game Commands" description="Envie comandos para seu personagem (say, reply, panic) diretamente do painel, mesmo sem estar no computador." />
        </section>
    );
}
