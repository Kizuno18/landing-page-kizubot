"use client";

import React from "react";
import { MachineSetupSection } from "../sections/MachineSetupSection";
import { DocsBreadcrumb } from "../sections/DocsBreadcrumb";

export function MachineSetupClient() {
    return (
        <>
            <DocsBreadcrumb moduleId="machine-setup" moduleName="Machine Setup" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Configure Machine Setup in KizuBot",
                        "description": "Guide to manage KizuBot machines, licenses, VNC settings, optimized settings.otml, recreate, WhatsApp commands, and machine identity.",
                        "image": "https://www.kizubot.com/og",
                        "totalTime": "PT10M",
                        "tool": [{ "@type": "HowToTool", "name": "KizuBot Machine Setup" }],
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Prepare Settings",
                                "text": "Apply the optimized settings.otml preset or upload your own file. It is applied automatically when the next game session starts.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Load the optimized preset or upload settings.otml for the next game session" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Configure VNC",
                                "text": "Set a compatible VNC password and resolution. Recreate the machine to apply these settings.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Set password and resolution, then use recreate when needed" }]
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Manage Machines",
                                "text": "Activate licenses, create machines, start, stop, recreate, and link WhatsApp for remote commands.",
                                "itemListElement": [{ "@type": "HowToDirection", "text": "Use the machine actions in the Machine Setup tab" }]
                            }
                        ]
                    })
                }}
            />
            <article itemScope itemType="https://schema.org/TechArticle">
                <meta itemProp="name" content="KizuBot Machine Setup Guide" />
                <meta itemProp="description" content="Guide to KizuBot Machine Setup, VNC, licenses, settings.otml, recreate, WhatsApp commands, and machine identity" />
                <div className="container-responsive section-padding">
                    <div className="max-w-4xl mx-auto">
                        <MachineSetupSection />
                    </div>
                </div>
            </article>
        </>
    );
}
