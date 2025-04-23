"use client";

import React from "react";
import { CavebotSection } from "../sections/CavebotSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function CavebotClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="cavebot" moduleName="Cavebot Navigation" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Cavebot for Automated Navigation",
                        "description": "Complete guide to configure KizuBot Cavebot module for automatic waypoint navigation, waypoint actions, route optimization, and efficient Pokemon farming in PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT15M",
                        "tool": [{
                            "@type": "HowToTool",
                            "name": "KizuBot Software"
                        }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Cavebot Module",
                                "text": "Activate the Cavebot module by setting doCavebot to true. This enables automatic navigation following your defined waypoint scripts.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set doCavebot configuration to enabled state"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Hunt Script",
                                "text": "Set the Hunt parameter to your waypoint script filename (e.g., 'shiny_charizard.kwpt'). The bot will request this script from the server and follow the waypoint path.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enter exact filename of your .kwpt waypoint script in Hunt field"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Navigation Precision",
                                "text": "Adjust nodeRadius to define waypoint reach tolerance (1-3 tiles). Lower values increase precision for narrow corridors, higher values speed up navigation in open areas.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set nodeRadius value based on hunting area layout (1 for tight spaces, 3 for open areas)"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Optimize Movement Pattern",
                                "text": "Configure diagonalType percentage (0-100) to control diagonal movement frequency. 100 means always use diagonals, 0 disables them, 50 adds randomness for more human-like movement.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set diagonalType percentage to balance speed and natural movement patterns"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Safety Features",
                                "text": "Set avoidLostMultiplier to prevent Pokemon from getting lost. The bot calculates wait time by multiplying monster count by this value. Also configure waitForPlayerLifeRegen and waitForPokemonLifeRegen for health-based pauses.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Adjust avoidLostMultiplier (e.g., 0.2) and health regeneration thresholds for safe navigation"
                                }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Cavebot Configuration Guide" />
                <meta itemProp="description" content="Complete guide to configure automatic waypoint navigation, waypoint actions, and route optimization in KizuBot for PokeXGames" />
                <meta itemProp="keywords" content="cavebot, waypoint navigation, waypoint actions, auto-navigation, route optimization, pokemon farming, KizuBot" />
                <meta itemProp="articleSection" content="Bot Configuration" />
                <meta itemProp="audience" content="PokeXGames Players, Bot Users" />
                
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <CavebotSection />
                    </div>
                </div>
            </article>
        </>
    );
}
