"use client";

import React from "react";
import { AlarmsSection } from "../sections/AlarmsSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export default function AlarmsClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="alarms" moduleName="Alarms & Notifications" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure KizuBot Alarms and Notifications",
                        "description": "Guide to configure WhatsApp and Telegram notifications, duplicate filtering, player detection, shiny and mega alerts, loot statistics, and GM warnings in KizuBot for PokeXGames",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT10M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Alarms Module" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Enable Alarms and Set Contacts",
                                "text": "Enable alarmEnabled and configure your WhatsApp number (botterPhone) and/or Telegram ID (telegramID) to receive notifications.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable alarms and add your contact numbers" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Select Alarm Events",
                                "text": "Choose which events trigger notifications: playerDetected, shinyDetected, megaDetected, privateMessage, lowSupply, dropRare, pokemonCaught, gameNotification, and more.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Enable individual alarm types in the panel" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure Ignored Names and Items",
                                "text": "Add friends and common players to ignoredNames to prevent false alarms. Add common drops to ignoredItems to filter loot notifications.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Set up ignore lists for players and items" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Alarms and Notifications Configuration" />
                <meta itemProp="description" content="Complete guide to WhatsApp and Telegram notifications, duplicate filtering, player alerts, mega detection, and loot statistics in KizuBot for PokeXGames" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <AlarmsSection />
                    </div>
                </div>
            </article>
        </>
    );
}
