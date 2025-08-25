"use client";

import React from "react";
import { PartySection } from "../sections/PartySection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function PartyClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="party" moduleName="Party System" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Party System for Team Hunts",
                        "description": "Guide to configure automatic party creation, invites, and loot/catch behavior for team hunts in KizuBot for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT5M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Party Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Party System",
                                "text": "Activate useParty to enable party logic, then enable doParty for auto-creation if not in a party.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable useParty and doParty toggles" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Auto-Invites",
                                "text": "Enable inviteAccounts and add player names to inviteNames. The bot will automatically invite listed players to the party.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Add player names to the invite list" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Party System for Team Hunts" />
                <meta itemProp="description" content="Complete guide to automatic party creation, invites, and loot/catch behavior for team hunts in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <PartySection />
                    </div>
                </div>
            </article>
        </>
    );
}
