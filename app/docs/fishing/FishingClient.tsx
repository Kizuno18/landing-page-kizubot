"use client";

import React from "react";
import { FishingSection } from "../sections/FishingSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function FishingClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="fishing" moduleName="Fishing Automation" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Fishing Automation",
                        "description": "Guide to configure automatic fishing in KizuBot for PokeXGames including safety modes, health thresholds, fishing pull delay, and minigame handling",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT10M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Fishing Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Fishing and Choose Safety Mode",
                                "text": "Activate doFishing and optionally choose a fishingMode such as default, with-sight, clean-water, open-sky, same-floor, or aggressive.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable fishing and select an appropriate fishing mode" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Box and Health Limits",
                                "text": "Set maxBoxCreatures to limit monsters during fishing. Configure stopFishingAtPokemonHealth and stopFishingAtCharacterHealthPercent to pause fishing when HP drops.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Set creature limit and health thresholds for safe fishing" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Adjust Fishing Pull Delay",
                                "text": "Configure fishingPullDelay in Humanization to control how fast the bot pulls the rod after the bite. Choose instant, fast, default, slow, or realistic.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Choose a fishing pull delay preset in Humanization" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Fishing Automation Configuration" />
                <meta itemProp="description" content="Complete guide to automatic fishing, safety modes, health thresholds, fishing pull delay, and minigame handling in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <FishingSection />
                    </div>
                </div>
            </article>
        </>
    );
}
