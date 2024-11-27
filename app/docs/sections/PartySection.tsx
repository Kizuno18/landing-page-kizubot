"use client";

import React from "react";
import { Users } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

export function PartySection() {
    return (
        <section id="party" className="space-y-6 mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3"><Users className="w-8 h-8" />Módulo de Party</h2>
            <p className="text-muted-foreground">Gerencia a criação e convites de party.</p>
            <ConfigItem title="doParty" description="Se ativado, o bot criará uma party automaticamente se não estiver em uma." />
            <ConfigItem title="useParty" description="Habilita a lógica geral de party. Necessário para as outras funções operarem." />
            <ConfigItem title="inviteAccounts / inviteNames" description="Se ativado, o bot convidará automaticamente os jogadores listados em `inviteNames` para a party." />
            <ConfigItem title="ignoreLoot / ignoreCatch" description="Permite desativar o loot e/ou a captura de Pokémon quando estiver em uma party, útil para hunts em equipe onde outra pessoa é responsável por essas tarefas." />
        </section>
    );
}
