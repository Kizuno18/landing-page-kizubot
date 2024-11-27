"use client";

import React from "react";
import { Map, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function CavebotSection() {
    return (
        <section id="cavebot" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Map className="w-8 h-8" />Módulo Cavebot</h2>
            <p className="text-muted-foreground">Responsável pela navegação automática do seu personagem. Ele segue os scripts de waypoints que você define, controlando velocidade, diagonais e condições de espera.</p>

            <ConfigItem title="doCavebot" description="Ativa ou desativa completamente o módulo Cavebot. Quando desativado, o personagem não seguirá nenhuma rota, mesmo que um script esteja carregado." />

            <ConfigItem title="Hunt (currentWaypointFile)" description="Define qual script de waypoint o bot está seguindo no momento. No painel, você seleciona diretamente da lista de waypoints salvos — não precisa digitar o nome do arquivo.">
                <p><strong>Como Funciona:</strong> Ao clicar num waypoint na lista &quot;Waypoints Salvos&quot;, o painel grava o nome do arquivo (com a extensão <code>.kwpt</code>) no campo <code>CavebotModule.currentWaypointFile</code>. O bot recebe essa config, busca o conteúdo do arquivo no servidor e passa a seguir aquela rota.</p>
                <p><strong>Auto-switch:</strong> Se <code>autoSwitchHuntOnKill</code> estiver ativo, o bot pode trocar de hunt automaticamente ao matar certos monstros — ver entrada abaixo.</p>
                <p><strong>Ações de waypoint:</strong> Waypoints com ação interna agora aguardam melhor a troca real de etapa antes de executar a próxima ação, reduzindo repetição ou perda de ação em rotas com muitos comandos seguidos.</p>
            </ConfigItem>

            <ConfigItem title="autoSwitchHuntOnKill" description="Ao derrotar um monstro, o bot procura por um waypoint com nome similar e o carrega automaticamente.">
                <p><strong>Exemplo:</strong> Se você estiver usando <code>hunt_a.kwpt</code> e derrotar um &quot;Pikachu&quot;, o bot procurará por <code>pikachu.kwpt</code> e, se encontrar, mudará para essa hunt.</p>
            </ConfigItem>

            <ConfigItem title="dashWhileLure" description="Permite que o bot use dash (movimentação rápida) durante o lure. Resulta em velocidade consideravelmente maior ao percorrer a rota.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica</AlertTitle>
                    <AlertDescription>Usar dash torna o cavebot visivelmente mais rápido, mas pode parecer menos natural. Combine com o módulo de Humanização para balancear velocidade e segurança.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="diagonalType" description="Controla a frequência dos movimentos diagonais.">
                <p><strong>Como Funciona:</strong> Porcentagem de chance. <code>100</code> = sempre usa diagonais. <code>0</code> = desativa diagonais. Valores intermediários (ex: <code>50</code>) adicionam aleatoriedade, tornando o movimento menos robótico.</p>
            </ConfigItem>

            <ConfigItem title="lureAutoDelay / lureManualDelayPerMonster" description="Controle fino do timing durante o lure. O lureAutoDelay escolhe entre dois modos de cálculo de delay:">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>lureAutoDelay (ON, padrão):</strong> Modo adaptativo — a IA calcula sozinha o delay ideal entre passos com base na densidade de monstros e na velocidade do pokémon. Recomendado pra maioria das hunts.</li>
                    <li><strong>lureAutoDelay (OFF):</strong> Modo manual — o delay passa a ser controlado por <code>lureManualDelayPerMonster</code>.</li>
                    <li><strong>lureManualDelayPerMonster:</strong> Milissegundos a adicionar ao delay por cada monstro na tela. Só tem efeito quando <code>lureAutoDelay</code> está desligado. Quanto mais monstros, mais devagar o bot anda — simula cautela humana.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="waitFor..." description="Opções que pausam a movimentação do cavebot até que uma condição seja satisfeita.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>waitForRestart:</strong> Tempo em milissegundos para esperar no último waypoint antes de reiniciar a rota. Dá tempo para respawn dos monstros.</li>
                    <li><strong>waitForPlayerLifeRegen:</strong> O bot para se a vida do personagem estiver abaixo do percentual definido e só volta a andar quando regenerar. <code>0</code> para desativar.</li>
                    <li><strong>waitForPokemonLifeRegen:</strong> Igual ao anterior, mas para a vida do Pokémon. <code>0</code> para desativar.</li>
                    <li><strong>waitForAreaMovesCooldown:</strong> Espera todos os pokémoves de área saírem de cooldown antes de ir para o próximo waypoint. Garante que você chegue no respawn com pokémoves prontos.</li>
                    <li><strong>waitForTargetMovesCooldown:</strong> Igual ao anterior, mas para pokémoves de alvo único.</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica de Hunt</AlertTitle>
                    <AlertDescription>Ativar <code>waitForAreaMovesCooldown</code> em hunts de AoE garante que você sempre comece a box com pokémoves prontos, maximizando o DPS do primeiro combo.</AlertDescription>
                </Alert>
            </ConfigItem>
        </section>
    );
}
