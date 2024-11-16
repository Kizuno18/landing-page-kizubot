import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const docsManifest = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KizuBot Complete Documentation Index",
    "description": "Comprehensive index of all KizuBot documentation pages for PokeXGames automation including setup, configuration guides, and feature documentation",
    "url": "https://www.kizubot.com/docs",
    "numberOfItems": 17,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "TechArticle",
          "name": "Setup Guide",
          "description": "Initial installation and configuration guide for KizuBot. Covers software setup, Pokemon move presets, account connection, and first-time configuration for PokeXGames.",
          "url": "https://www.kizubot.com/docs/setup",
          "keywords": ["setup", "installation", "getting started", "pokemon dex", "pokemon moves", "first time", "configuration"],
          "articleSection": "Getting Started"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TechArticle",
          "name": "Cavebot Guide",
          "description": "Complete guide to Cavebot module for automatic waypoint navigation, waypoint actions, route optimization, and efficient farming routes in PokeXGames.",
          "url": "https://www.kizubot.com/docs/cavebot",
          "keywords": ["cavebot", "waypoint", "waypoint actions", "navigation", "auto-walk", "route", "farming path"],
          "articleSection": "Core Modules"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "TechArticle",
          "name": "Combat System",
          "description": "Comprehensive combat configuration including target selection, luring strategies, spell rotation, tactical stun maintenance status, attack automation, and safety protocols.",
          "url": "https://www.kizubot.com/docs/combat",
          "keywords": ["combat", "auto-battle", "targeting", "luring", "attacks", "spells", "stun maintenance"],
          "articleSection": "Core Modules"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "TechArticle",
          "name": "Healing System",
          "description": "Auto-healing configuration for HP/MP management, potion usage, healing spells, revive after stun, and emergency protocols for safe AFK farming.",
          "url": "https://www.kizubot.com/docs/healing",
          "keywords": ["healing", "auto-heal", "HP management", "MP management", "potions", "revive", "revive after stun"],
          "articleSection": "Core Modules"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "TechArticle",
          "name": "Auto-Catch System",
          "description": "Pokemon catching automation including shiny hunting, longer catch timeout, pokeball management, catch filters, and automatic Pokemon collection.",
          "url": "https://www.kizubot.com/docs/catch",
          "keywords": ["catch", "auto-catch", "catch timeout", "shiny hunting", "pokeball", "pokemon collection"],
          "articleSection": "Features"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "TechArticle",
          "name": "Farming System",
          "description": "Profession farming configuration for resource gathering, headbutt, Nature Warfare resources, minigame solving, and route resume behavior.",
          "url": "https://www.kizubot.com/docs/farming",
          "keywords": ["farming", "profession", "resource gathering", "headbutt", "minigame solver", "Nature Warfare"],
          "articleSection": "Features"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "TechArticle",
          "name": "Fishing System",
          "description": "Automatic fishing configuration including direct fishing modes, humanized pull delay, minigame handling, and fishing optimization.",
          "url": "https://www.kizubot.com/docs/fishing",
          "keywords": ["fishing", "auto-fish", "fishing mode", "fishing pull delay", "minigame", "water pokemon", "fishing spots"],
          "articleSection": "Features"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "TechArticle",
          "name": "Alarms System",
          "description": "Alert and notification configuration including sound alarms, WhatsApp and Telegram delivery, duplicate filtering, mega detection, and custom alert triggers for important events.",
          "url": "https://www.kizubot.com/docs/alarms",
          "keywords": ["alarms", "alerts", "notifications", "whatsapp", "telegram", "duplicate alarms", "mega alarm", "warnings"],
          "articleSection": "Utilities"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "TechArticle",
          "name": "Statistics",
          "description": "Dashboard statistics guide for hunting sessions, XP, kills, loot, profit, automatic expenses, manual custom expenses, and session comparison.",
          "url": "https://www.kizubot.com/docs/statistics",
          "keywords": ["statistics", "hunt sessions", "XP tracking", "profit", "custom expenses", "loot tracking"],
          "articleSection": "Utilities"
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "TechArticle",
          "name": "Party System",
          "description": "Party management including automatic party creation, auto-invites, and optional loot/catch behavior for team hunts.",
          "url": "https://www.kizubot.com/docs/party",
          "keywords": ["party", "group", "auto invite", "team hunt", "ignore loot", "ignore catch"],
          "articleSection": "Advanced Features"
        }
      },
      {
        "@type": "ListItem",
        "position": 11,
        "item": {
          "@type": "TechArticle",
          "name": "Engine Configuration",
          "description": "Core engine settings including GM Protection cooldowns, anti-detection features, timing configurations, and advanced bot behavior.",
          "url": "https://www.kizubot.com/docs/engine",
          "keywords": ["engine", "GM protection", "gm cooldown", "anti-detection", "core settings"],
          "articleSection": "Advanced Configuration"
        }
      },
      {
        "@type": "ListItem",
        "position": 12,
        "item": {
          "@type": "TechArticle",
          "name": "Actions System",
          "description": "Custom action configuration including macros, conditional actions, chat loop protection, event triggers, and advanced automation scripts.",
          "url": "https://www.kizubot.com/docs/actions",
          "keywords": ["actions", "macros", "automation", "chat message", "triggers", "scripts", "custom actions"],
          "articleSection": "Advanced Features"
        }
      },
      {
        "@type": "ListItem",
        "position": 13,
        "item": {
          "@type": "TechArticle",
          "name": "Account Management",
          "description": "Account configuration including character selection, licenses, profile management, hidden characters, game credentials, and security settings.",
          "url": "https://www.kizubot.com/docs/account",
          "keywords": ["account", "profile", "character", "license", "hidden character", "security", "account management"],
          "articleSection": "Configuration"
        }
      },
      {
        "@type": "ListItem",
        "position": 14,
        "item": {
          "@type": "TechArticle",
          "name": "Humanization System",
          "description": "Humanization configuration for threshold variance, micro-pauses, hunt breaks, fishing pull delay, GM reaction delays, and anti-detection behavior.",
          "url": "https://www.kizubot.com/docs/humanization",
          "keywords": ["humanization", "anti-detection", "micro-pause", "hunt break", "fishing pull delay", "GM reaction", "threshold variance"],
          "articleSection": "Advanced Configuration"
        }
      },
      {
        "@type": "ListItem",
        "position": 15,
        "item": {
          "@type": "TechArticle",
          "name": "KizuAI Assistant",
          "description": "KizuAI assistant guide for per-character context, conversation memory, answer sources, and PXG questions inside the KizuBot dashboard.",
          "url": "https://www.kizubot.com/docs/kizu-ai",
          "keywords": ["KizuAI", "Kizu Assistant", "PXG assistant", "AI chat", "conversation context", "answer sources"],
          "articleSection": "Utilities"
        }
      },
      {
        "@type": "ListItem",
        "position": 16,
        "item": {
          "@type": "TechArticle",
          "name": "Machine Setup",
          "description": "Machine Setup guide for machines, licenses, VNC, optimized settings.otml, recreate, WhatsApp commands, repair behavior, and live machine identity.",
          "url": "https://www.kizubot.com/docs/machine-setup",
          "keywords": ["machine setup", "VNC", "settings otml", "recreate machine", "license", "WhatsApp commands", "machine identity"],
          "articleSection": "Configuration"
        }
      },
      {
        "@type": "ListItem",
        "position": 17,
        "item": {
          "@type": "TechArticle",
          "name": "GridView / Panel",
          "description": "GridView guide for monitoring all bot characters, reading status cards, opening VNC, answering chat, using Panic, Stop, Dashboard access, and recreating machines.",
          "url": "https://www.kizubot.com/docs/gridview",
          "keywords": ["GridView", "panel", "bot monitoring", "status cards", "VNC", "Panic", "machine recreate", "remote access"],
          "articleSection": "Utilities"
        }
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "KizuBot",
      "description": "Advanced automation software for PokeXGames MMORPG"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "PokeXGames Players, Bot Users, MMORPG Automation Users"
    },
    "version": "1.0",
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "license": "https://www.kizubot.com/license"
  };

  return NextResponse.json(docsManifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
