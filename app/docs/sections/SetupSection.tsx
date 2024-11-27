"use client";

import React from "react";
import { Shield, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function SetupSection() {
    return (
        <section id="setup" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Shield className="w-8 h-8" />Módulo de Setup Pokémon</h2>
            <p className="text-muted-foreground">O coração do combate — define as habilidades de cada Pokémon com 5 categorias de pokémoves e detecção automática de stun.</p>

            <ConfigItem title="CombatModule.Spells" description="Define os pokémoves para cada Pokémon pelo nome exato. Cada pokémove é identificado por slot M1-M12/F1-F12 no jogo.">
                <p><strong>Busca na Pokédex:</strong> A aba Time Pokémon pode buscar pokémons na Pokédex do KizuBot e puxar uma pré-configuração de pokémoves quando houver dados disponíveis.</p>
                <p><strong>Movimentos detectados:</strong> Quando o personagem já detectou pokémoves no jogo, o painel mostra os movimentos disponíveis com nome, cooldown, tipo e efeito, facilitando montar o setup sem adivinhar qual slot é qual.</p>
                <p><strong>5 Categorias de Pokémoves:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>targetMoves:</strong> Pokémoves de alvo único. Usadas contra um monstro específico.</li>
                    <li><strong>areaMoves:</strong> Pokémoves de área (AoE). Atingem múltiplos monstros ao redor.</li>
                    <li><strong>supportMoves:</strong> Buffs e pokémoves de suporte (ex: Charm, Charge, Agility).</li>
                    <li><strong>healMoves:</strong> Pokémoves de cura do próprio Pokémon (ex: Synthesis, Recover).</li>
                    <li><strong>stunMoves:</strong> Pokémoves de stun/CC. Detectadas automaticamente pela IA com base nos efeitos do jogo. Usadas pelo Sistema de Stun Tático configurado no módulo de Combat.</li>
                </ul>
                <p className="mt-2"><strong>Prioridade:</strong> A ordem dos pokémoves dentro de cada lista define a prioridade de uso. O bot sempre tenta usar o primeiro pokémove disponível (que não esteja em cooldown).</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Detecção Automática de Stun</AlertTitle>
                    <AlertDescription>Você não precisa classificar manualmente quais pokémoves são stun. A IA detecta automaticamente com base na tabela de efeitos do jogo. Basta arrastar os pokémoves para a categoria <code>stunMoves</code> no painel drag-and-drop.</AlertDescription>
                </Alert>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Quando Stun Desativado</AlertTitle>
                    <AlertDescription>Se <code>useStunMoves</code> estiver desativado no Combat, pokémoves de stun são automaticamente redistribuídos para <code>targetMoves</code> ou <code>areaMoves</code> com base no tipo do pokémove. Nenhum pokémove é perdido.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="Gatilhos por slot (support / heal)" description="Cada chip de support ou heal move em Time Pokémon ganha um input numérico individual: monster count (support) ou HP% (heal). Slot sem valor usa o padrão — support: cast imediato (a partir de qualquer monstro); heal: desativado.">
                <p><strong>Exemplo Smeargle 8:</strong> Skill de defesa configurada em 2 monstros, skill de imunidade em 5. Quando o lure tem 2 monstros, o bot castra defesa. Quando passa de 5, castra também a imunidade.</p>
                <p><strong>Exemplo heal:</strong> Light Heal configurado em 70% de HP, Super Heal em 30%. O bot usa a heal certa de acordo com o quão crítico está o pokémon.</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Onde estavam essas configs antes?</AlertTitle>
                    <AlertDescription>Os campos globais <code>useSupportMoveWithMonsterCount</code> e <code>healAtPercent</code> ficavam no painel de Combat. Foram removidos e substituídos por gatilhos por slot dentro de cada Pokémon. Configs antigas foram migradas automaticamente — cada slot herdou o valor global que você tinha.</AlertDescription>
                </Alert>
            </ConfigItem>
        </section>
    );
}
