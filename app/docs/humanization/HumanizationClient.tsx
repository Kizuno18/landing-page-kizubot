"use client";

import React from "react";
import { HumanizationSection } from "../sections/HumanizationSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function HumanizationClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="humanization" moduleName="Humanization System" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Humanization for Anti-Detection",
                        "description": "Complete guide to configure KizuBot's humanization system including threshold variance, micro-pauses, hunt breaks, fishing pull delay, and GM reaction for safer PokeXGames automation",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT15M",
                        "tool": [{
                            "@type": "HowToTool",
                            "name": "KizuBot Humanization Module"
                        }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Humanization Master Toggle",
                                "text": "Activate the humanization master toggle to enable all anti-detection features. This will manage related settings across Healing, Farming, and Catch modules automatically.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enable the master toggle in the Humanization tab"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Threshold Variance",
                                "text": "Set globalVariance percentage to add natural variation to numeric thresholds like monsterStop, healAtPercent, and potionAtPercent. Values vary per lure cycle, not per second.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set globalVariance between 5-15% for natural behavior"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Micro-Pauses",
                                "text": "Configure micro-pauses to add brief 0.5-3 second hesitations during walking. Set chance percentage and duration range for natural-looking movement patterns.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set micro-pause chance to 10-20% with 0.5-2s duration"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Hunt Breaks",
                                "text": "Set up longer AFK breaks of 1-5 minutes that simulate real player behavior like going to the bathroom or grabbing water. Optionally disable healing and combat during breaks for authentic AFK appearance.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Configure hunt break intervals and duration ranges"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Adjust Fishing Pull Delay",
                                "text": "Choose how fast the bot pulls the rod after a fishing bite. Presets range from instant to realistic.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Select fishingPullDelay based on the reaction speed you want"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup GM Reaction Humanization",
                                "text": "Configure realistic delays before responding to GM arrows, fatigue limits for dancing and messaging, and dance/message order for natural-looking GM interactions.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Set GM reaction delay to 3-8 seconds and configure fatigue limits"
                                }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Humanization System Configuration" />
                <meta itemProp="description" content="Complete guide to anti-detection humanization, threshold variance, micro-pauses, hunt breaks, fishing pull delay, and GM reaction in KizuBot for PokeXGames" />
                <meta itemProp="keywords" content="humanization, anti-detection, micro-pause, hunt break, fishing pull delay, GM reaction, threshold variance, KizuBot humanization" />
                <meta itemProp="articleSection" content="Humanization Configuration" />

                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <HumanizationSection />
                    </div>
                </div>
            </article>
        </>
    );
}
