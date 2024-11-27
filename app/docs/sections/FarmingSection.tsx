"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Pickaxe } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function FarmingSection() {
    return (
        <section id="farming" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Pickaxe className="w-8 h-8" />Módulo de Farming</h2>
            <p className="text-muted-foreground">Automatiza a coleta de recursos baseada na sua profissão, com resolução de minigames e comportamento humanizado.</p>

            <ConfigItem title="doFarm" description="Ativa ou desativa a coleta automática de recursos (madeira, matos, minérios, etc)." />

            <ConfigItem title="farmingRadius / bigBushRadius / headbuttRadius" description="Define o raio de busca (em tiles) para cada tipo de recurso.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>farmingRadius:</strong> Raio para recursos normais (matos, minérios).</li>
                    <li><strong>bigBushRadius:</strong> Raio para arbustos grandes (Professor). Pode ser diferente do raio padrão para otimizar a rota.</li>
                    <li><strong>headbuttRadius:</strong> Raio para árvores de headbutt (Estilista).</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="alwaysHeadbutt" description="Automaticamente procura árvores para usar headbutt. Essencial para Estilistas coletando pontos de estilista." />
            <ConfigItem title="drawCorpses" description="Exibe corpos de Pokémon derrotados no mapa. Necessário para coleta de pontos de estilista em Outland. Esta config fica no módulo de Combat." />

            <ConfigItem title="collectOnlyBigBushes" description="Coleta apenas arbustos grandes, ignorando os pequenos. Útil para Professores que querem maximizar eficiência em áreas com muitos arbustos." />
            <ConfigItem title="nwEnabled" description="Ativa a coleta de recursos da Nature Warfare (NW). Habilitado separadamente dos recursos de profissão normais. Quando ativo, o bot também ignora alarmes enquanto estiver dentro de um nightmare." />

            <ConfigItem title="stepInTallGrass" description="O bot pisa em tall grass de eventos automaticamente ao encontrá-las na rota. Útil durante eventos sazonais que requerem interação com esses tiles." />

            <ConfigItem title="minigameSolveDelay" description="Tempo de resposta ao resolver minigames anti-bot durante o farming.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>instant:</strong> Sem delay, resolve imediatamente (alto risco de detecção).</li>
                    <li><strong>fast:</strong> 2-4 segundos.</li>
                    <li><strong>default:</strong> 4-7 segundos (comportamento padrão).</li>
                    <li><strong>slow:</strong> 8-12 segundos (mais seguro).</li>
                    <li><strong>realistic:</strong> 13-20 segundos (simula humano distraído, mais seguro).</li>
                </ul>
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica</AlertTitle>
                    <AlertDescription>O modo <code>realistic</code> é recomendado para sessões longas. Combine com <code>canMadeMistakes</code> para máxima naturalidade.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="canMadeMistakes" description="O bot erra propositalmente o minigame de vez em quando, simulando um jogador distraído. Aumenta a naturalidade do comportamento.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Relação com Humanização</AlertTitle>
                    <AlertDescription>Esta opção pode ser gerenciada pelo módulo de Humanização quando o master toggle estiver ativado.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="resumeCavebotBehavior" description="Define como o bot retoma o cavebot após terminar uma tarefa de farming.">
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>nearest:</strong> Vai para o waypoint mais próximo da posição atual.</li>
                    <li><strong>next:</strong> Vai para o próximo waypoint na sequência.</li>
                    <li><strong>previous:</strong> Volta para o waypoint anterior.</li>
                </ul>
            </ConfigItem>

            <ConfigItem title="flyFarm" description="[Premium] Permite coleta de recursos em andares diferentes usando a habilidade de voar." />
            <ConfigItem title="useVehicle" description="[Premium] Utiliza bike/montaria para se mover entre pontos de coleta, acelerando o farming." />
        </section>
    );
}
