"use client";

import React from "react";
import { EngineSection } from "../sections/EngineSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function EngineClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="engine" moduleName="Engine & GM Protection" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Engine and GM Protection",
                        "description": "Guide to configure KizuBot core settings, GM Protection modes and cooldowns, extraordinary creature handling, and anti-detection for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT15M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Engine Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Configure GM Protection Mode",
                                "text": "Choose between Partial (pauses modules), Full (logout), or Suicide (walks into monsters) mode for GM detection response. Set staffDeactivationModules and gmCooldown to control what pauses and when it can resume.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Select GM protection mode and configure deactivation modules" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Extraordinary Creature Handling",
                                "text": "Enable autoKillExtraordinary to prioritize shiny, boss, and mega creatures. Configure extraordinaryCreatures and priorityCreatures lists for custom targeting.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable auto-kill and configure creature lists" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Auto Step on Arrow",
                                "text": "Enable autoStepOnArrow for the bot to automatically step on GM arrows. Configure danceForGM and response phrases in the Alarms tab.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable arrow stepping and configure GM responses" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Engine and GM Protection Configuration" />
                <meta itemProp="description" content="Complete guide to engine settings, GM protection cooldowns, and extraordinary creature handling in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <EngineSection />
                    </div>
                </div>
            </article>
        </>
    );
}
