"use client";

import React from "react";
import { AccountSection } from "../sections/AccountSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function AccountClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="account" moduleName="Account Management" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Manage Your KizuBot Account and Profiles",
                        "description": "Guide to manage KizuBot account credentials, configuration profiles, licenses, hidden characters, and panel password for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT5M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Account Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Configure Account Credentials",
                                "text": "Save your PokeXGames account credentials for automatic login and auto-reconnect functionality.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enter your game credentials in the Account tab" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Manage Configuration Profiles",
                                "text": "Save different configuration profiles for different hunts and activities. Switch between profiles without manual reconfiguration.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Create and switch between named profiles" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Account Management and Profiles" />
                <meta itemProp="description" content="Complete guide to account credentials, licenses, hidden characters, panel password, and configuration profiles in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <AccountSection />
                    </div>
                </div>
            </article>
        </>
    );
}
