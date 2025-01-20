"use client";

import React from "react";
import { ActionsSection } from "../sections/ActionsSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function ActionsClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="actions" moduleName="Actions & Rules" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Create Automation Rules in KizuBot Actions System",
                        "description": "Guide to create custom automation rules with conditions, chat-safe triggers, and actions in KizuBot for PokeXGames — the advanced macro system",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT20M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Actions Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Create a New Rule",
                                "text": "Define a rule with a unique name, set it as enabled, and optionally assign an ALT+key hotkey for in-game toggling.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Click 'Add Rule' and configure name, toggle, and optional hotkey" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Conditions",
                                "text": "Add conditions from 11 groups: Health, Location, Combat, Creatures (shiny/mega/boss), Items, Players, Messages, Time, Status, Advanced, and GM Protection. Message rules ignore the bot's own messages to avoid loops.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Select condition type and configure triggers" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Define Action Sequence",
                                "text": "Add actions from 10 groups: Items & Healing, Combat, Movement, Communication, NPC Interaction, Market, Bot Control, Session, Advanced, and GM Protection.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Build the action sequence that executes when conditions are met" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Actions and Rules Automation System" />
                <meta itemProp="description" content="Complete guide to creating custom automation rules with conditions, chat-safe triggers, and actions in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <ActionsSection />
                    </div>
                </div>
            </article>
        </>
    );
}
