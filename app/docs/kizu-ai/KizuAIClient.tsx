"use client";

import React from "react";
import { KizuAISection } from "../sections/KizuAISection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function KizuAIClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="kizu-ai" moduleName="KizuAI" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Use KizuAI in KizuBot",
                        "description": "Guide to use KizuAI, the KizuBot assistant with per-character context, conversation memory, and answer sources for PokeXGames.",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT3M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuAI Assistant" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Open KizuAI",
                                "text": "Open the KizuAI page in the dashboard while logged in with your character.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Open KizuAI from the dashboard navigation" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Ask With Context",
                                "text": "Ask about PXG, builds, farming, or your bot configuration. The first turn loads the current config; follow-ups reuse the conversation context.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Ask a question and continue with follow-ups naturally" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Review Sources",
                                "text": "Check the sources shown below answers when the assistant cites reference material.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Use sources to understand where the answer came from" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuAI Assistant Guide" />
                <meta itemProp="description" content="Guide to KizuAI conversation context, per-character memory, and answer sources in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <KizuAISection />
                    </div>
                </div>
            </article>
        </>
    );
}
