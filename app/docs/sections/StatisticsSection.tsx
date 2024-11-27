"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart3, Info } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function StatisticsSection() {
    return (
        <section id="statistics" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><BarChart3 className="w-8 h-8" />Statistics</h2>
            <p className="text-muted-foreground">Acompanha sessões de hunt, lucro, XP, loot, gastos e desempenho geral do personagem. Use essa aba para revisar hunts recentes e comparar resultados.</p>

            <ConfigItem title="Hunting Sessions" description="Lista as sessões de hunt registradas pelo bot, com horário, duração, XP, kills, loot, gastos e lucro.">
                <p><strong>Paginação:</strong> A lista carrega em páginas para ficar leve mesmo quando você tem muitas hunts salvas. Use o seletor de quantidade por página e os botões de próximo/anterior para navegar.</p>
                <p><strong>Atualização:</strong> O auto-refresh respeita a página atual, então você pode analisar sessões antigas sem a tabela voltar sozinha para o começo.</p>
            </ConfigItem>

            <ConfigItem title="Custom Expenses" description="Permite adicionar gastos manuais em uma sessão de hunt quando o bot não consegue detectar esse custo sozinho.">
                <p><strong>Exemplos:</strong> Diamond, Boss Charm Charge, Profession Boost, Gym Fee, Storage Fee, Trade Fee ou qualquer outro custo manual da hunt.</p>
                <p><strong>Como funciona:</strong> Informe o nome, quantidade e preço unitário. O painel soma esse valor ao total de despesas e recalcula o lucro final da sessão.</p>
                <p><strong>Agregação:</strong> Quando você seleciona várias sessões, as despesas manuais também entram nos totais agregados.</p>
            </ConfigItem>

            <ConfigItem title="Auto-tracked Expenses" description="Gastos detectados automaticamente pelo bot, como itens usados durante a hunt e outros custos que aparecem nos dados enviados pela máquina.">
                <p><strong>Separação:</strong> A aba de despesas mostra o que foi rastreado pelo bot separado do que foi adicionado manualmente, evitando confusão no cálculo do lucro.</p>
            </ConfigItem>

            <ConfigItem title="Kill Statistics" description="Contadores de pokémons derrotados, loot e dados especiais de criaturas extraordinárias.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Lucky Bonus</AlertTitle>
                    <AlertDescription>Mensagens fragmentadas de Lucky Bonus não devem mais inflar a contagem de kills. O bot filtra mensagens repetidas e mantém o total mais próximo do real.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="XP e morte do personagem" description="Quando o personagem morre, o bot encerra a sessão atual e inicia uma nova sessão de hunt automaticamente.">
                <p><strong>Por que isso importa:</strong> A morte pode diminuir a XP do personagem. Separar a sessão evita XP negativo e lucro estranho misturado com a hunt anterior.</p>
                <p><strong>Transição:</strong> O encerramento e a criação da nova sessão acontecem juntos, reduzindo risco de sessão duplicada ou dados perdidos.</p>
            </ConfigItem>

            <ConfigItem title="Configurações antigas" description="O carregamento de configs ficou mais tolerante a valores antigos ou salvos em formato inesperado.">
                <p>Se uma configuração antiga estiver quebrada ou fora do formato esperado, o bot tenta seguir usando os padrões corretos em vez de parar o carregamento da config.</p>
            </ConfigItem>
        </section>
    );
}
