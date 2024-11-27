"use client";

import React from "react";
import { Bot, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function KizuAISection() {
    return (
        <section id="kizu-ai" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Bot className="w-8 h-8" />KizuAI</h2>
            <p className="text-muted-foreground">Assistente conversacional do painel para dúvidas de PXG, estratégias, builds, farming e configs do próprio bot.</p>

            <ConfigItem title="Kizu Assistant" description="Chat com IA especializado em PokeXGames e no contexto atual do seu personagem.">
                <p><strong>Contexto por personagem:</strong> Ao abrir o chat logado, o painel carrega a config atual e mostra quais módulos estão ativos para aquele personagem.</p>
                <p><strong>Conversa contínua:</strong> O chat mantém um identificador de conversa por personagem. Follow-ups continuam o assunto sem precisar reenviar suas configs a cada pergunta.</p>
                <p><strong>Fontes:</strong> Quando a resposta usa material consultado pelo assistente, as fontes aparecem abaixo da mensagem.</p>
                <p><strong>Modo geral:</strong> Se a config não carregar, o assistente ainda pode responder dúvidas gerais sobre PXG.</p>
            </ConfigItem>

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Reset da conversa</AlertTitle>
                <AlertDescription>Use o botão de atualizar no chat para limpar a conversa salva daquele personagem e começar um novo contexto.</AlertDescription>
            </Alert>

            <ConfigItem title="Estados do assistente" description="Mensagens amigáveis indicam quando o assistente está inicializando, com sessão expirada, em limite de uso ou demorando demais para responder.">
                <p>Se aparecer aviso de inicialização ou timeout, aguarde alguns segundos e reformule a pergunta. Se aparecer sessão expirada, avise o suporte.</p>
            </ConfigItem>
        </section>
    );
}
