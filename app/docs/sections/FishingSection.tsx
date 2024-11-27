"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Fish, Info } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function FishingSection() {
    return (
        <section id="fishing" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Fish className="w-8 h-8" />Módulo de Fishing</h2>
            <p className="text-muted-foreground">Automatiza a pesca com configurações de timing, segurança e paradas condicionais.</p>

            <ConfigItem title="doFishing" description="Ativa ou desativa a pesca automática." />

            <ConfigItem title="fishingMode" description="Modo único que define como o bot escolhe a água antes de lançar a vara. O padrão já vem seguro para a maioria dos usuários.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>default:</strong> Pesca em água limpa com linha de visão direta.</li>
                    <li><strong>with-sight:</strong> Só pesca se houver linha de visão direta com o tile de água.</li>
                    <li><strong>clean-water:</strong> Só pesca em tiles de água sem obstáculos.</li>
                    <li><strong>open-sky:</strong> Só pesca em água limpa sem obstáculos nos andares superiores.</li>
                    <li><strong>same-floor:</strong> Só pesca em água limpa e visível no mesmo andar.</li>
                    <li><strong>aggressive:</strong> Pesca em qualquer água encontrada, ignorando visão e obstáculos.</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica</AlertTitle>
                    <AlertDescription>Use default se não souber qual escolher. O usuário só precisa ativar doFishing para começar.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="maxBoxCreatures" description="Número máximo de monstros na tela para continuar pescando. Se excedido, a pesca para por segurança. Padrão: 7." />

            <ConfigItem title="fishingPullDelay" description="Delay humanizado para puxar a vara depois do som/efeito de fisgada. Esta opção fica no módulo de Humanização, não mais na aba Fishing.">
                <p><strong>Opções:</strong> <code>instant</code>, <code>fast</code>, <code>default</code>, <code>slow</code> e <code>realistic</code>.</p>
                <p><strong>Quando ajustar:</strong> use valores mais lentos se quiser uma reação mais natural; use valores rápidos se priorizar resposta imediata.</p>
            </ConfigItem>

            <ConfigItem title="Minigames de pesca" description="O bot prioriza terminar minigames de janela antes de voltar para tarefas como cavebot, catch ou farming.">
                <p>Minigames como fishing, cards, cook, music, mastermind e antibot-bar são tratados como fluxo de UI. O bot evita cancelar a própria resposta por movimento, troca de outfit ou mudança de mountary durante o solve.</p>
            </ConfigItem>

            <ConfigItem title="waitMovesCooldown" description="Espera os pokémoves saírem de cooldown entre cada ciclo de pesca. Garante que você tenha pokémoves prontos caso precise combater durante a pesca." />

            <ConfigItem title="stopFishingAtPokemonHealth" description="Para de pescar quando a vida do Pokémon cai abaixo deste percentual. Útil para esperar o regeneration natural. 0 para desativar." />
            <ConfigItem title="stopFishingAtCharacterHealthPercent" description="Para de pescar quando a vida do PERSONAGEM cai abaixo deste percentual. Protege contra morte do treinador em áreas perigosas. 0 para desativar." />

            <ConfigItem title="fishingMode: aggressive" description="Modo agressivo de pesca que ignora obstáculos e verificações de visão. Alto risco de detecção.">
                <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Alto Risco!</AlertTitle>
                    <AlertDescription>Este modo é facilmente identificável como comportamento de bot. Use por sua conta e risco.</AlertDescription>
                </Alert>
            </ConfigItem>
        </section>
    );
}
