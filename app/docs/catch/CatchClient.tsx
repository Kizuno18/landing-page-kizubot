"use client";

import React from "react";
import { CatchSection } from "../sections/CatchSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function CatchClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="catch" moduleName="Auto-Catch" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Auto-Catch System for Pokemon Hunting",
                        "description": "Complete guide to automatic Pokemon catching, longer catch timeout, shiny hunting, pokeball management, and catch filtering in KizuBot for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT15M",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Auto-Catch",
                                "text": "Activate the auto-catch module to enable automatic Pokemon catching. Configure catch conditions and filters.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enable auto-catch module and set basic catching parameters"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Shiny Hunting",
                                "text": "Set up shiny detection and catching priorities. Configure special actions for shiny Pokemon including notifications and priority catching.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Enable shiny detection and configure shiny-specific catching behavior"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Setup Pokeball Management",
                                "text": "Configure pokeball selection strategy and inventory management. Set priority order for different pokeball types based on Pokemon value.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Define pokeball priority order and usage strategy"
                                }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Catch Filters",
                                "text": "Set up Pokemon filters including species whitelist/blacklist, level ranges, catch conditions, and catchTimeout up to 120 seconds. Define which Pokemon to catch automatically.",
                                "itemListElement": [{
                                    "@type": "HowToDirection",
                                    "text": "Configure catch filters with Pokemon names and conditions"
                                }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Auto-Catch Configuration" />
                <meta itemProp="description" content="Comprehensive guide to automatic Pokemon catching, catch timeout, and shiny hunting in KizuBot" />
                <meta itemProp="keywords" content="auto-catch, pokemon catching, catch timeout, shiny hunting, pokeball management, catch filters" />
                
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <CatchSection />
                    </div>
                </div>
            </article>
        </>
    );
}
