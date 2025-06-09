"use client";

import React from "react";
import { FarmingSection } from "../sections/FarmingSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function FarmingClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="farming" moduleName="Farming System" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Profession Farming System",
                        "description": "Complete guide to profession resource farming, headbutt, Nature Warfare resources, minigame solving, and route resume behavior in KizuBot for PokeXGames",
                        "totalTime": "PT10M",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Setup Farming Route",
                                "text": "Configure Cavebot waypoints for a path that passes near profession resources such as bushes, trees, and event tiles.",
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Resource Collection",
                                "text": "Enable doFarm and configure resource radius, headbutt, big bush filtering, Nature Warfare resources, and tall grass stepping as needed.",
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Tune Minigame Behavior",
                                "text": "Choose minigameSolveDelay and canMadeMistakes to control how naturally the bot solves farming minigames.",
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Farming System" />
                <meta itemProp="description" content="Configure KizuBot profession farming, resource gathering, minigame solving, and route resume behavior" />
                <meta itemProp="keywords" content="profession farming, auto-farm, resource gathering, headbutt, Nature Warfare, minigame solver" />
                
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <FarmingSection />
                    </div>
                </div>
            </article>
        </>
    );
}
