"use client";

import React from "react";
import { Keyboard, Power, Settings, Monitor, Wrench, Bug, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfigItem } from "./ConfigItem";

export function HotkeysSection() {
    return (
        <section id="hotkeys" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Keyboard className="w-8 h-8" />Atalhos de Teclado (In-Game)</h2>
            <p className="text-muted-foreground">Estes são atalhos de teclado pressionados dentro do próprio cliente do PokeXGames, na sessão VNC. Não são botões do painel nem comandos do bot via WhatsApp. Para assistir a uma gravação da Cam Offline, é necessário sair do personagem antes de iniciar a reprodução.</p>

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Power className="w-6 h-6" />Controle do Bot</h3>

            <ConfigItem title="Home" description="Liga/desliga o bot inteiro (master toggle do Engine) — exatamente o mesmo efeito de clicar no switch &quot;KizuBot&quot; no painel de botões in-game (o painel que abre com Delete). O switch e o status &quot;ALL ON / ALL OFF&quot; acima dele ficam sempre sincronizados, não importa qual dos dois você usou." />
            <ConfigItem title="Alt+P" description="PANIC shutdown — para toda a atividade do bot instantaneamente. Sem confirmação, sem aviso. Use apenas em emergência real." />
            <ConfigItem title="Alt+H" description="Inicia uma nova sessão de caçada, zerando as estatísticas da sessão atual (mortes, loot, XP) no servidor em uma única chamada atômica." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Settings className="w-6 h-6" />Configurações</h3>

            <ConfigItem title="Alt+I" description="Recarrega as configurações salvas do painel/cloud no personagem, sem reiniciar o jogo. Use depois de salvar uma aba no painel." />
            <ConfigItem title="Alt+R" description="Atalho alternativo para recarregar as configurações salvas do painel/cloud no personagem, sem reiniciar o jogo." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Monitor className="w-6 h-6" />Janelas e HUDs</h3>

            <ConfigItem title="Delete" description="Mostra/esconde o painel de botões in-game (switches do KizuBot e do Recorder)." />
            <ConfigItem title="Alt+G" description="Abre a Cam Offline — lista as sessões gravadas do personagem e permite baixar as disponíveis para assistir dentro do próprio cliente do jogo. Serve pra ver o que aconteceu enquanto você não estava olhando: os minutos antes de uma morte, uma desconexão ou a passagem de um GM. Saia do personagem antes de reproduzir e escolha a velocidade de 1x, 2x, 4x ou 8x antes de clicar em Play. O botão Stop encerra a reprodução e reabre a lista; gravações recuperadas de uma sessão interrompida podem aparecer como parciais." />
            <ConfigItem title="F11" description="Mostra/esconde o HUD de estatísticas em tempo real — sessão, combate, loot, recursos, performance e rota." />
            <ConfigItem title="Alt+W" description="Mostra/esconde as janelas do jogo (hide/show geral do client)." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Wrench className="w-6 h-6" />Utilidades</h3>

            <ConfigItem title="Alt+T" description="Abre a TV do jogo, para assistir outros jogadores." />
            <ConfigItem title="Alt+C" description="Abre o cronômetro do jogo." />

            <h3 className="text-2xl font-bold text-primary flex items-center gap-3 mt-10"><Bug className="w-6 h-6" />Ferramentas de Debug</h3>
            <p className="text-muted-foreground">Avançadas, mas disponíveis para todo cliente.</p>

            <ConfigItem title="F7" description="Mostra/esconde o Shape Tester — ferramenta visual para pré-visualizar o formato de área (cone, diamante, etc.) de cada pokémove." />
            <ConfigItem title="F9" description="Mostra/esconde o Tile Inspector — inspeciona atributos do tile embaixo do cursor (se é andável, se há criatura em cima, etc.)." />
            <ConfigItem title="F10" description="Mostra/esconde o Debug HUD — estado interno do bot em tempo real (bloqueios de guard, estado do walker)." />
            <ConfigItem title="F12" description="Abre o painel de referência de hotkeys dentro do próprio jogo (FYI Panel) — a mesma lista deste guia, sempre à mão, sem precisar sair do client." />
            <ConfigItem title="Alt+M" description="Com o Tile Inspector aberto (F9), inspeciona o tile embaixo do cursor do mouse." />
            <ConfigItem title="Alt+B" description="Com o Shape Tester aberto (F7), avança para o próximo preset de formato (apenas no HUD, não desenha no mapa)." />
            <ConfigItem title="Alt+V" description="Com o Shape Tester aberto (F7), renderiza o formato atualmente selecionado como efeitos visuais no mapa." />

            <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Atalhos customizados de Action Rules</AlertTitle>
                <AlertDescription>
                    Regras criadas em <strong>Actions &amp; Rules</strong> podem receber uma tecla própria, que vira automaticamente <code>Alt+&lt;letra&gt;</code> dentro do jogo. Evite reusar as letras já ocupadas pelos atalhos nativos acima: <code>I</code>, <code>R</code>, <code>H</code>, <code>P</code>, <code>G</code>, <code>W</code>, <code>T</code>, <code>C</code>, <code>M</code>, <code>B</code> e <code>V</code>.
                </AlertDescription>
            </Alert>
        </section>
    );
}
