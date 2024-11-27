"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Wrench } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function AccountSection() {
    return (
        <section id="account" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Wrench className="w-8 h-8" />Módulo de Conta</h2>
            <p className="text-muted-foreground">Gerencia as credenciais da conta do jogo, profiles de configuração, personagens ocultos, licenças e senha do painel.</p>

            <ConfigItem title="AccountModule.accountInfo" description="Salva as credenciais da sua conta do PokeXGames para login automático e auto-reconnect.">
                <Alert className="mt-2">
                    <Info className="h-4 w-4"/>
                    <AlertTitle>Segurança</AlertTitle>
                    <AlertDescription>Suas credenciais são armazenadas de forma segura e usadas apenas para o login no jogo.</AlertDescription>
                </Alert>
            </ConfigItem>

            <ConfigItem title="Licenças e pagamentos custom" description="Mostra e valida o estado da licença e dos pagamentos vinculados à conta.">
                <p>Licenças expiradas não são reativadas automaticamente por acidente. Pagamentos custom pendentes ficam preservados para o painel continuar mostrando o estado correto até a confirmação.</p>
            </ConfigItem>

            <ConfigItem title="Manage Profiles" description="Sistema de perfis de configuração que permite salvar e carregar diferentes configs para diferentes hunts/atividades.">
                <p><strong>Como Funciona:</strong> Salve a config atual como um profile nomeado (ex: &quot;Hunt Venusaur&quot;, &quot;Farming Outland&quot;). Troque entre profiles sem precisar reconfigurar tudo manualmente.</p>
                <p><strong>Compartilhamento:</strong> Profiles são visíveis entre todos os personagens do mesmo login.</p>
            </ConfigItem>

            <ConfigItem title="Personagens Ocultos" description="Permite ocultar personagens antigos ou inativos da tela de seleção de character. Personagens ocultos não aparecem no GridView." />

            <ConfigItem title="Alterar Senha" description="Permite alterar a senha da sua conta do painel KizuBot diretamente do dashboard." />
        </section>
    );
}
