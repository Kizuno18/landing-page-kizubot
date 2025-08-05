"use client";

import React from "react";
import { HealingSection } from "../sections/HealingSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function HealingClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="healing" moduleName="Healing System" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Healing System for Safe AFK Farming",
                        "description": "Step-by-step guide to configure automatic HP/MP management, potion usage, healing spells, revive after stun, and emergency protocols in KizuBot for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT10M",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Configure Player Health Management",
                                "text": "Set HP thresholds for automatic healing with potions or spells. Configure minimum health percentage to trigger healing and potion/spell names to use.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Define player HP healing thresholds and healing item names"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Pokemon Health Management",
                                "text": "Configure automatic Pokemon healing using revives and potions. Set health thresholds and specify revive/potion items for Pokemon recovery.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set Pokemon HP thresholds and revive/potion configuration"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Mana Management",
                                "text": "Set MP regeneration thresholds and mana potion usage. Configure minimum mana percentage to trigger potion use for spell-casting sustainability.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Define MP thresholds and mana potion configuration"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Emergency Protocols",
                                "text": "Configure emergency healing triggers for critical health situations and revive behavior after stun. Set very low HP thresholds that activate immediate healing regardless of other conditions.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Configure emergency HP thresholds for critical situations"
                                }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Healing System Configuration" />
                <meta itemProp="description" content="Configure automatic HP/MP management, revive after stun, and healing protocols for safe AFK farming" />
                <meta itemProp="keywords" content="auto-heal, HP management, MP management, revive after stun, potion automation, healing system" />
                
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <HealingSection />
                    </div>
                </div>
            </article>
        </>
    );
}
