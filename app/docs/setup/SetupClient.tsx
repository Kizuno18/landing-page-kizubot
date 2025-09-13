"use client";

import React from "react";
import { SetupSection } from "../sections/SetupSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function SetupClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="setup" moduleName="Pokemon Setup" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure Pokemon Spells and Stun Moves in KizuBot",
                        "description": "Guide to configure spell categories (target, area, support, heal, stun), detected moves, and Pokédex presets for each Pokemon in KizuBot Setup for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT10M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Setup Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Add Pokemon to Setup",
                                "text": "Create an entry for each Pokemon by exact name or use the Pokédex search when a preset is available. Inside each entry, assign move slots (M1-M12 / F1-F12) to five categories: targetMoves, areaMoves, supportMoves, healMoves, and stunMoves.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Use the drag-and-drop interface to categorize each spell" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Stun Moves",
                                "text": "Drag stun spells to the stunMoves category. The AI auto-detects stun effects from the game's effect table. When useStunMoves is disabled in Combat, stun moves are automatically redistributed to target or area categories.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Assign stun spells — auto-detection handles the rest" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Pokemon Setup and Spell Configuration" />
                <meta itemProp="description" content="Complete guide to configuring spell categories, detected moves, Pokédex presets, and stun moves for each Pokemon in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <SetupSection />
                    </div>
                </div>
            </article>
        </>
    );
}
