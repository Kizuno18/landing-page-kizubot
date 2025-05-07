"use client";

import React from "react";
import { CombatSection } from "../sections/CombatSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function CombatClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="combat" moduleName="Combat System" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Combat System for Automated Battles",
                        "description": "Comprehensive guide to configure KizuBot's auto-battle system including target selection, luring strategies, spell rotation, and safety measures for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT20M",
                        "tool": [{
                            "@type": "HowToTool",
                            "name": "KizuBot Combat Module"
                        }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Combat Module",
                                "text": "Activate the Combat module by setting doCombat to true. This enables automatic battle actions including targeting, attacking, and loot collection.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enable doCombat to activate all combat functions"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Target Selection",
                                "text": "Set up target filtering using targetAll (attack all monsters), targetCreatures (whitelist specific monsters), or ignoreCreatures (blacklist specific monsters). The bot will only attack monsters matching your criteria.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Choose between targetAll mode or configure targetCreatures/ignoreCreatures lists"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Set Luring Threshold",
                                "text": "Configure monsterStop parameter to define how many visible monsters trigger combat initiation. The bot will walk and gather monsters until this count is reached, then stop and attack.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set monsterStop value (e.g., 8) to control luring strategy"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Safety Thresholds",
                                "text": "Set stopLureAtHealth to stop luring when Pokemon health drops below percentage, and forceComboAtHealth to immediately start combat at critical health. Also configure maxTimeForCombo to limit luring duration.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Define health thresholds and time limits for safe combat initiation"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Anti-KS Protection",
                                "text": "Enable ksIgnoreLoot to skip looting when other players are present, and ksIgnoreCatch to prevent catching Pokemon around other players. This avoids accusations of kill-stealing.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Activate ksIgnoreLoot and ksIgnoreCatch for multiplayer etiquette"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Review Tactical Stun Status",
                                "text": "The visual Stun tab is temporarily under maintenance. Existing stun move fallback still prevents moves from being lost, but the panel saves stun settings disabled until the rework is complete.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Review the Stun maintenance notice before relying on tactical stun settings"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Loot with considerStoneRare",
                                "text": "Enable lootOnlyRare to collect only rare drops. Use considerStoneRare to also collect evolution stones which have common priority on the server. The ignoredItems from Alarms acts as a blacklist for both alarms and loot.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enable considerStoneRare if you want to collect stones with lootOnlyRare"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Post-Combat Actions",
                                "text": "Set endOfComboActionOrder to either 'Loot First' (collect items then heal) or 'Healing First' (heal then collect items). Choose based on risk tolerance and loot importance.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Select action priority: Loot First for efficiency or Healing First for safety"
                                }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Combat System Configuration" />
                <meta itemProp="description" content="Complete guide to auto-battle configuration, target selection, and combat optimization in KizuBot for PokeXGames" />
                <meta itemProp="keywords" content="auto-battle, combat system, target selection, luring, spell rotation, KizuBot combat" />
                <meta itemProp="articleSection" content="Combat Configuration" />
                
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <CombatSection />
                    </div>
                </div>
            </article>
        </>
    );
}
