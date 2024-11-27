"use client";

import React from "react";
import { Crosshair, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function CatchSection() {
    return (
        <section id="catch" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Crosshair className="w-8 h-8" />Módulo de Catch</h2>
            <p className="text-muted-foreground">Configurações de captura de Pokémon, incluindo pokébolas, delays humanizados e catchAll.</p>

            <ConfigItem title="catchMode" description="Define como o sistema de captura opera.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>simple:</strong> Uma lista única de pokémons em <code>pokemonsToCatch</code>. Usa a pokébola padrão (ou a shiny quando for shiny) sem regras personalizadas.</li>
                    <li><strong>advanced:</strong> Permite configurar regras por pokémon — qual pokébola usar em qual espécie, incluindo fallbacks. Suporta overrides específicos de shiny via <code>advancedShinyPokeballs</code>.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="pokeballName / alternativePokeballName" description="Define as pokébolas para pokémons normais no modo simple. A alternativa é usada como fallback se a principal acabar." />
            <ConfigItem title="shinyPokeballName / alternativeShinyPokeballName" description="Define as pokébolas para shinies no modo simple. A alternativa é usada como fallback se a principal acabar." />
            <ConfigItem title="advancedShinyPokeballs" description="Mapa de overrides de pokébola por shiny específico no modo advanced. Ex: usar Ultra Ball para Shiny Charizard e Great Ball para Shiny Venusaur. Se um shiny não estiver mapeado, cai no fallback padrão do modo advanced." />
            <ConfigItem title="pokemonsToCatch" description="Lista de pokémons que serão capturados. No modo simple é uma lista simples; no modo advanced cada entrada pode ter uma pokébola específica associada." />

            <ConfigItem title="catchTimeout" description="Tempo máximo em segundos que o bot tenta capturar um pokémon antes de desistir e continuar a hunt. Aceita até 120s para capturas mais demoradas." />
            <ConfigItem title="assureCanThrowBall" description="Verifica se é possível jogar a ball antes de tentar. Previne tentativas desperdiçadas quando o pokémon não está em condição de captura." />

            <ConfigItem title="startThrowBallDelay / delayBetweenBalls" description="Delays humanizados para jogar pokébolas.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>startThrowBallDelay:</strong> Delay antes da primeira ball após derrotar o pokémon.</li>
                    <li><strong>delayBetweenBalls:</strong> Delay entre cada ball subsequente no mesmo pokémon.</li>
                </ul>
                <p className="mt-2">Opções: <code>instant</code> (0ms), <code>fast</code> (100-300ms), <code>default</code> (300-700ms), <code>slow</code> (500-1000ms), <code>realistic</code> (800-1500ms).</p>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Relação com Humanização</AlertTitle>
                    <AlertDescription>Estas opções podem ser gerenciadas pelo módulo de Humanização quando o master toggle estiver ativado.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="onlyCatchOneTimePerServerSave" description="Impede captura da mesma espécie mais de uma vez por dia (entre server saves). Cada captura é adicionada automaticamente à exclude list." />

            <ConfigItem title="catchAllEnabled / catchAllIsPersistency" description="Modo de captura universal — tenta capturar TODO pokémon derrotado.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>catchAllEnabled:</strong> Ativa o modo catchAll. Ignora listas de captura, mas respeita a <code>ignoreCatchList</code>.</li>
                    <li><strong>catchAllIsPersistency:</strong> Se ativado, captura a mesma espécie repetidamente. Se desativado, captura cada espécie apenas uma vez por sessão.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="ignoreCatchList" description="Lista de pokémons que NUNCA serão capturados, mesmo com catchAllEnabled ativo. Tem prioridade máxima sobre todas as outras configs de catch." />
        </section>
    );
}
