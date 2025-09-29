"use client";

import React from "react";
import { StatisticsSection } from "../sections/StatisticsSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function StatisticsClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="statistics" moduleName="Statistics" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Read KizuBot Statistics and Hunting Sessions",
                        "description": "Guide to use KizuBot Statistics for hunting sessions, XP, kills, loot, profit, and manual custom expenses.",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT5M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Statistics Dashboard" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Open Hunting Sessions",
                                "text": "Use the Statistics tab to review hunting sessions, including duration, XP, kills, loot, expenses, and profit.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Open the Statistics tab and select a hunting session" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Add Manual Expenses",
                                "text": "Add expenses the bot cannot detect by itself, such as Diamond, Boss Charm, boosts, gym fees, storage fees, or trade fees.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Add a custom expense with name, count, and unit price" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Compare Sessions",
                                "text": "Use pagination and multi-session aggregation to compare results across many saved hunts.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Navigate pages and select sessions to compare totals" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Statistics and Hunting Sessions" />
                <meta itemProp="description" content="Complete guide to hunting sessions, XP, kills, loot, profit, and custom expenses in KizuBot Statistics" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <StatisticsSection />
                    </div>
                </div>
            </article>
        </>
    );
}
