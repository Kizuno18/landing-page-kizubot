"use client";

import React from "react";
import { AlertTriangle, Info, Monitor } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function GridViewSection() {
    return (
        <section id="gridview" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Monitor className="w-8 h-8" />GridView / Panel</h2>
            <p className="text-muted-foreground">Mostra todos os bots em uma grade para monitorar status, abrir VNC, responder chat e agir rápido sem trocar de tela toda hora.</p>

            <ConfigItem title="Resumo e legenda de status" description="A barra superior e a legenda ajudam a enxergar o estado geral das máquinas.">
                <p><strong>Total:</strong> Mostra quantos bots aparecem na grade.</p>
                <p><strong>Status:</strong> A grade separa visualmente bots huntando, no CP, pausados, com stamina baixa, offline, com player/shiny na tela ou com mensagem nova.</p>
                <p><strong>Prioridade:</strong> Mensagem nova e alertas aparecem com mais destaque para você resolver primeiro o que exige atenção.</p>
            </ConfigItem>

            <ConfigItem title="Cards dos bots" description="Cada card representa um personagem e mostra o status atual dele.">
                <p><strong>Selecionar bot:</strong> Clique no card para abrir os controles daquele personagem. No celular, os controles abrem em uma gaveta inferior.</p>
                <p><strong>Mensagem não lida:</strong> Cards com mensagem nova podem ser marcados como lidos pelo botão de fechar no próprio card.</p>
                <p><strong>Streamer mode:</strong> Quando o modo streamer estiver ativo, os nomes seguem o mesmo mascaramento usado no restante do painel.</p>
            </ConfigItem>

            <ConfigItem title="Controles rápidos" description="Ações principais ficam disponíveis assim que um bot é selecionado.">
                <p><strong>VNC:</strong> Abre acesso remoto da máquina selecionada. No desktop, o VNC abre como janela flutuante; no celular, abre em tela quase cheia.</p>
                <p><strong>Panic:</strong> Envia o comando de emergência para o bot online selecionado.</p>
                <p><strong>Dashboard:</strong> Troca para o perfil do personagem selecionado e abre o dashboard normal dele.</p>
                <p><strong>Stop / Shutdown:</strong> Desliga a máquina vinculada ao personagem selecionado.</p>
            </ConfigItem>

            <ConfigItem title="Chat integrado" description="Permite acompanhar e responder mensagens do personagem selecionado direto do GridView.">
                <p><strong>Mensagens recentes:</strong> Quando alguém manda mensagem para o personagem, o GridView destaca o card e mostra o remetente no painel.</p>
                <p><strong>Resposta rápida:</strong> Use o chat do painel para enviar mensagem ou comando sem precisar abrir a página individual do personagem.</p>
            </ConfigItem>

            <ConfigItem title="VNC em bot offline" description="Quando o personagem está offline, o painel usa a lista real de máquinas em vez de depender de dados antigos do personagem.">
                <p><strong>Máquinas online:</strong> Se existir uma máquina online, você pode conectar o VNC diretamente por ela.</p>
                <p><strong>Máquinas offline:</strong> Se a máquina estiver offline, o painel oferece recreate já com a máquina certa pré-selecionada.</p>
                <p><strong>Várias janelas:</strong> No desktop, você pode manter mais de uma janela VNC aberta, minimizar, redimensionar e alternar o foco.</p>
            </ConfigItem>

            <ConfigItem title="Recreate pelo GridView" description="Recria uma máquina sem precisar sair da grade de monitoramento.">
                <p><strong>Selecionar máquina:</strong> O diálogo carrega suas máquinas ativas e tenta escolher automaticamente a máquina vinculada ao personagem.</p>
                <p><strong>Senha VNC:</strong> Você pode manter a senha atual ou definir uma nova senha antes de recriar.</p>
                <p><strong>Espera automática:</strong> Depois do recreate, o painel espera a máquina voltar. Se demorar mais, ele mostra aviso centralizado e continua verificando em segundo plano; quando ficar pronta, o VNC abre automaticamente.</p>
            </ConfigItem>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Quando usar GridView?</AlertTitle>
                <AlertDescription>Use GridView quando você gerencia vários personagens e quer ver tudo em uma tela. Para configurar módulos em detalhe, abra o Dashboard do personagem.</AlertDescription>
            </Alert>

            <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Cuidado com ações globais</AlertTitle>
                <AlertDescription>Confirme o personagem e a máquina selecionados antes de usar Panic, Stop ou Recreate, principalmente quando houver muitos bots na grade.</AlertDescription>
            </Alert>
        </section>
    );
}
