"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Anchor, BarChart3, Bell, Bot, Cpu, Crosshair, FileText, Fingerprint, Fish, Heart, Info, Keyboard, Map, Monitor, Pickaxe, Shield, Sword, Users, Wrench, AlertTriangle } from 'lucide-react';
import Link from "next/link";
import { ConfigItem } from "./sections/ConfigItem";
import { CavebotSection } from "./sections/CavebotSection";
import { CombatSection } from "./sections/CombatSection";
import { HealingSection } from "./sections/HealingSection";
import { CatchSection } from "./sections/CatchSection";
import { FarmingSection } from "./sections/FarmingSection";
import { FishingSection } from "./sections/FishingSection";
import { AlarmsSection } from "./sections/AlarmsSection";
import { StatisticsSection } from "./sections/StatisticsSection";
import { PartySection } from "./sections/PartySection";
import { EngineSection } from "./sections/EngineSection";
import { ActionsSection } from "./sections/ActionsSection";
import { AccountSection } from "./sections/AccountSection";
import { SetupSection } from "./sections/SetupSection";
import { HumanizationSection } from "./sections/HumanizationSection";
import { KizuAISection } from "./sections/KizuAISection";
import { MachineSetupSection } from "./sections/MachineSetupSection";
import { GridViewSection } from "./sections/GridViewSection";
import { HotkeysSection } from "./sections/HotkeysSection";

const modules = [
    { id: "machine-setup", name: "Machine Setup", icon: Monitor },
    { id: "gridview", name: "GridView / Panel", icon: Monitor },
    { id: "cavebot", name: "Cavebot", icon: Map },
    { id: "combat", name: "Combate", icon: Sword },
    { id: "healing", name: "Healing", icon: Heart },
    { id: "catch", name: "Catch", icon: Crosshair },
    { id: "farming", name: "Farming", icon: Pickaxe },
    { id: "fishing", name: "Fishing", icon: Fish },
    { id: "alarms", name: "Alarmes", icon: Bell },
    { id: "statistics", name: "Statistics", icon: BarChart3 },
    { id: "party", name: "Party", icon: Users },
    { id: "engine", name: "Engine (Geral)", icon: Cpu },
    { id: "actions", name: "Actions & Rules", icon: Bot },
    { id: "account", name: "Conta", icon: Wrench },
    { id: "setup", name: "Setup Pokémon", icon: Shield },
    { id: "humanization", name: "Humanização", icon: Fingerprint },
    { id: "kizu-ai", name: "KizuAI", icon: Bot },
    { id: "hotkeys", name: "Atalhos de Teclado", icon: Keyboard },
];

export default function DocsClient() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "KizuBot Documentation - Complete Guide",
                        "description": "Complete documentation for KizuBot automation software for PokeXGames. Includes setup guides, module configuration, features, and advanced settings.",
                        "url": "https://www.kizubot.com/docs",
                        "mainEntity": {
                            "@type": "ItemList",
                            "name": "KizuBot Documentation Sections",
                            "numberOfItems": 18,
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Setup Guide",
                                    "url": "https://www.kizubot.com/docs/setup"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Cavebot Navigation",
                                    "url": "https://www.kizubot.com/docs/cavebot"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Combat System",
                                    "url": "https://www.kizubot.com/docs/combat"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Healing System",
                                    "url": "https://www.kizubot.com/docs/healing"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 5,
                                    "name": "Auto-Catch",
                                    "url": "https://www.kizubot.com/docs/catch"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 6,
                                    "name": "Farming System",
                                    "url": "https://www.kizubot.com/docs/farming"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 7,
                                    "name": "Fishing",
                                    "url": "https://www.kizubot.com/docs/fishing"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 8,
                                    "name": "Alarms & Notifications",
                                    "url": "https://www.kizubot.com/docs/alarms"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 9,
                                    "name": "Statistics",
                                    "url": "https://www.kizubot.com/docs/statistics"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 10,
                                    "name": "Party System",
                                    "url": "https://www.kizubot.com/docs/party"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 11,
                                    "name": "Engine Configuration",
                                    "url": "https://www.kizubot.com/docs/engine"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 12,
                                    "name": "Actions & Macros",
                                    "url": "https://www.kizubot.com/docs/actions"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 13,
                                    "name": "Account Management",
                                    "url": "https://www.kizubot.com/docs/account"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 14,
                                    "name": "Humanization System",
                                    "url": "https://www.kizubot.com/docs/humanization"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 15,
                                    "name": "KizuAI Assistant",
                                    "url": "https://www.kizubot.com/docs/kizu-ai"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 16,
                                    "name": "Machine Setup",
                                    "url": "https://www.kizubot.com/docs/machine-setup"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 17,
                                    "name": "GridView / Panel",
                                    "url": "https://www.kizubot.com/docs/gridview"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 18,
                                    "name": "In-Game Hotkeys",
                                    "url": "https://www.kizubot.com/docs/hotkeys"
                                }
                            ]
                        },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.kizubot.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Documentation",
                                    "item": "https://www.kizubot.com/docs"
                                }
                            ]
                        }
                    })
                }}
            />
            <div className="container-responsive section-padding">
                <div className="max-w-4xl mx-auto">
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle className="text-3xl text-primary flex items-center gap-3">
                                <FileText className="w-8 h-8" />
                                Guia de Funcionalidades
                            </CardTitle>
                            <CardDescription>
                                Esta página é o seu manual completo para todas as configurações disponíveis no painel do KizuBot. Use o índice abaixo para navegar rapidamente para a seção desejada.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Índice</h3>
                            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {modules.map(module => (
                                    <li key={module.id}>
                                        <Link href={`#${module.id}`} className="flex items-center gap-2 p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors border border-border">
                                            <module.icon className="w-5 h-5 text-primary" />
                                            <span className="font-medium text-foreground">{module.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <MachineSetupSection />

                    <GridViewSection />

                    <CavebotSection />

                    <CombatSection />

                    <HealingSection />

                    <CatchSection />

                    <FarmingSection />

                    <FishingSection />

                    <AlarmsSection />

                    <StatisticsSection />
                     
                    <PartySection />

                    <EngineSection />

                    <ActionsSection />

                    <AccountSection />

                    <SetupSection />

                    <HumanizationSection />

                    <KizuAISection />

                    <HotkeysSection />
                </div>
            </div>
        </>
    );
}
