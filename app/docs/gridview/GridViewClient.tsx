"use client";

import React from "react";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";
import { GridViewSection } from "../sections/GridViewSection";

export function GridViewClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="gridview" moduleName="GridView / Panel" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Use GridView in KizuBot",
                        "description": "Guide to monitor all KizuBot characters in GridView, use status cards, open VNC, answer chat, run Panic, Stop, Dashboard access, and recreate machines.",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT5M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot GridView" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Open GridView",
                                "text": "Open GridView / Panel from the dashboard navigation to see all bot characters in one screen.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Open GridView / Panel from the dashboard" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Select a Bot",
                                "text": "Click a character card to open its controls, chat, status, VNC, Panic, Stop, Recreate, and Dashboard shortcut.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Click a bot card and review the control panel" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Manage Remote Access",
                                "text": "Open VNC for online machines, pick an available machine for offline characters, or recreate a machine and wait for VNC to open automatically.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Use VNC or Recreate from the selected bot controls" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot GridView / Panel Guide" />
                <meta itemProp="description" content="Guide to KizuBot GridView monitoring, bot cards, VNC, chat, Panic, Stop, Dashboard access, and machine recreate" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <GridViewSection />
                    </div>
                </div>
            </article>
        </>
    );
}
