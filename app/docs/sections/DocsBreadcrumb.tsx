"use client";

/**
 * JSON-LD BreadcrumbList for doc subpages.
 * Renders as structured data only (no visible UI).
 */
export function DocsBreadcrumb({ moduleId, moduleName }: { moduleId: string; moduleName: string }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://www.kizubot.com"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Documentation",
                            "item": "https://www.kizubot.com/docs"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": moduleName,
                            "item": `https://www.kizubot.com/docs/${moduleId}`
                        }
                    ]
                })
            }}
        />
    );
}
