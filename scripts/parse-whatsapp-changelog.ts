/**
 * WhatsApp Changelog Parser → MDX Generator (v2)
 *
 * Reads the WhatsApp export .txt, groups multi-line messages,
 * extracts every changelog entry, and generates SEO-optimized
 * bilingual MDX files.
 *
 * Usage: npx tsx scripts/parse-whatsapp-changelog.ts
 */

import fs from "fs";
import path from "path";

const INPUT_FILE = path.join(
  __dirname,
  "../../docs/WhatsApp Chat with KizuBot  kizubot.com/WhatsApp Chat with KizuBot  kizubot.com.txt",
);
const OUTPUT_DIR = path.join(__dirname, "../content/changelog");

// Regex to detect a new WhatsApp message line (timestamp + sender)
const MSG_START = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s+\d{1,2}:\d{2}\s+-\s+(.+?):\s+([\s\S]*)$/;

interface WhatsAppMessage {
  month: number;
  day: number;
  year: number;
  sender: string;
  fullText: string;
}

interface ChangelogEntry {
  date: string;
  ptContent: string[];
  enContent: string[];
}

// ── Tag detection ──────────────────────────────────────────────
const TAG_KW: Record<string, string[]> = {
  "new-feature": [
    "adicionad", "nova opção", "novo ", "nova ", "novas ", "novos ",
    "agora você pode", "agora é possível", "implementad", "adicionam",
    "added", "new option", "new ", "implemented",
  ],
  improvement: [
    "melhorad", "otimizad", "ensinei", "melhorei", "humanizaç",
    "improved", "optimiz", "taught",
  ],
  "bug-fix": [
    "corrigid", "resolvid", "arrumei", "arrumad", "fixed", "fix ",
  ],
  security: [
    "segurança", "proteção contra", "anti-ban", "anti-det",
    "security", "protection against",
  ],
};

function detectTags(content: string): string[] {
  const lower = content.toLowerCase();
  const tags = new Set<string>();
  for (const [tag, kws] of Object.entries(TAG_KW)) {
    for (const kw of kws) {
      if (lower.includes(kw)) { tags.add(tag); break; }
    }
  }
  if (tags.size === 0) tags.add("improvement");
  return Array.from(tags);
}

// ── Slug / title / summary helpers ─────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 55);
}

function cleanBold(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

function generateTitle(items: string[], locale: "pt" | "en"): string {
  // Strategy: pick top 2-3 meaningful features from the items
  // Priority: new features > improvements > fixes

  const newFeatures: string[] = [];
  const improvements: string[] = [];
  const fixes: string[] = [];

  for (const item of items) {
    const clean = cleanBold(item).replace(/^-\s*/, "").trim();
    const lower = clean.toLowerCase();

    // Extract a short descriptor — cut at natural break points
    let desc = clean.substring(0, 60);
    // Cut at comma, period, parenthesis, or dash
    const breakPoints = [desc.indexOf(","), desc.indexOf("."), desc.indexOf("("), desc.indexOf(" —"), desc.indexOf(" -", 5)].filter(i => i > 10);
    if (breakPoints.length > 0) {
      desc = desc.substring(0, Math.min(...breakPoints));
    } else {
      // Fall back to last space
      const lastSpace = desc.lastIndexOf(" ");
      if (lastSpace > 15) desc = desc.substring(0, lastSpace);
    }
    desc = desc.trim();

    if (lower.includes("adicionad") || lower.includes("added") || lower.includes("novo") || lower.includes("new ") || lower.includes("agora você pode") || lower.includes("implementad")) {
      if (newFeatures.length < 2) newFeatures.push(desc);
    } else if (lower.includes("melhorad") || lower.includes("otimizad") || lower.includes("improved") || lower.includes("ensinei")) {
      if (improvements.length < 2) improvements.push(desc);
    } else if (lower.includes("corrigid") || lower.includes("resolvid") || lower.includes("fixed") || lower.includes("arrumei")) {
      if (fixes.length < 2) fixes.push(desc);
    }
  }

  // Build title: extract bold keywords first, then fall back to short descriptions
  const boldKeywords: string[] = [];
  for (const item of items) {
    const bolds = item.match(/\*\*(.+?)\*\*/g);
    if (bolds) {
      for (const b of bolds) {
        const kw = b.replace(/\*\*/g, "").trim();
        if (kw.length > 2 && kw.length < 30 && !boldKeywords.includes(kw) && kw !== "IA") {
          boldKeywords.push(kw);
        }
      }
    }
    if (boldKeywords.length >= 3) break;
  }

  if (boldKeywords.length >= 2) {
    return boldKeywords.slice(0, 3).join(", ");
  }

  // Fall back to short descriptions from feature items
  // Stop words that make bad title endings
  const STOP_WORDS = new Set(["de", "que", "com", "no", "na", "do", "da", "em", "ao", "para", "pra", "foi", "o", "a", "os", "as", "um", "uma", "the", "in", "of", "for", "to", "a", "an", "on", "at", "by", "with", "from"]);

  function trimStopWords(s: string): string {
    const words = s.split(" ");
    while (words.length > 2 && STOP_WORDS.has(words[words.length - 1].toLowerCase())) {
      words.pop();
    }
    return words.join(" ");
  }

  const all = [...newFeatures, ...improvements, ...fixes];
  if (all.length === 0) {
    let first = cleanBold(items[0] || "").replace(/^-\s*/, "").substring(0, 50).trim();
    first = trimStopWords(first);
    return first || (locale === "pt" ? "Atualizações e Correções" : "Updates and Fixes");
  }

  const short = all.slice(0, 2).map((s) => {
    let result = s;
    if (result.length > 40) {
      const cut = result.substring(0, 40);
      const lastSpace = cut.lastIndexOf(" ");
      result = lastSpace > 15 ? cut.substring(0, lastSpace) : cut;
    }
    return trimStopWords(result);
  });

  return short.join(" & ");
}

function generateSummary(items: string[]): string {
  const parts = items.slice(0, 2).map((i) => {
    let clean = cleanBold(i).replace(/^-\s*/, "").trim();
    // Remove trailing period/exclamation to avoid double periods on join
    clean = clean.replace(/[.!]+$/, "");
    // Capitalize first letter
    if (clean.length > 0) clean = clean[0].toUpperCase() + clean.substring(1);
    return clean;
  });
  let s = parts.join(". ") + ".";
  if (s.length > 160) s = s.substring(0, 157) + "...";
  return s;
}

// ── Step 1: Parse into messages ────────────────────────────────
function parseMessages(): WhatsAppMessage[] {
  const raw = fs.readFileSync(INPUT_FILE, "utf-8");
  const lines = raw.split("\n");
  const msgs: WhatsAppMessage[] = [];

  let current: WhatsAppMessage | null = null;

  for (const line of lines) {
    const m = line.match(MSG_START);
    if (m) {
      // Save previous message
      if (current) msgs.push(current);

      const [, mo, da, yr, sender, text] = m;
      current = {
        month: parseInt(mo),
        day: parseInt(da),
        year: parseInt(yr.length === 2 ? `20${yr}` : yr),
        sender,
        fullText: text,
      };
    } else if (current) {
      // Continuation line of current message
      current.fullText += "\n" + line;
    }
  }
  if (current) msgs.push(current);

  return msgs;
}

// ── Step 2: Extract changelogs from messages ───────────────────
function extractChangelogs(msgs: WhatsAppMessage[]): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];

  for (const msg of msgs) {
    // Only Big Léo messages
    if (!msg.sender.includes("Big L") && !msg.sender.includes("Big L")) continue;

    // Must contain changelog marker (multiple formats used over time)
    if (
      !msg.fullText.includes("[Changelog]") &&
      !msg.fullText.includes("Changelog]") &&
      !msg.fullText.includes("*Changelog:*") &&
      !msg.fullText.includes("*Changelog*")
    ) continue;

    const dateStr = `${msg.year}-${String(msg.month).padStart(2, "0")}-${String(msg.day).padStart(2, "0")}`;

    const fullLines = msg.fullText.split("\n");
    const ptItems: string[] = [];
    const enItems: string[] = [];
    let inEnglish = false;
    let pastChangelog = false;

    for (const line of fullLines) {
      const trimmed = line.trim();

      // Skip zero-width-only lines
      if (trimmed.length > 0 && /^[\u200b\u200c\u200d\ufeff\u2060\s]+$/.test(trimmed)) continue;

      // Detect changelog start (multiple formats used over time)
      if (trimmed.includes("[Changelog]") || trimmed.includes("*Changelog:*") || trimmed.includes("*Changelog*")) {
        pastChangelog = true;
        continue;
      }

      // Also skip "Atualização no Sistema do Bot" header line
      if (trimmed.includes("Atualização no Sistema") || trimmed.includes("Atualização no sistema")) {
        continue;
      }

      if (!pastChangelog) continue;

      // Detect English section
      if (trimmed.includes("[ENGLISH]") || trimmed.includes("[EN]") || trimmed === "[ENGLISH]") {
        inEnglish = true;
        continue;
      }

      // Skip summaries/commands
      if (/^>?\s*(Sum[aá]rio|Summary|Relogar|Reiniciar|Recriar|Relog\s*=|Restart\s*=|Recreate\s*=)/i.test(trimmed)) continue;
      if (/^-\s*(Relog|Restart|Recreate)\s*=/i.test(trimmed)) continue;
      if (trimmed.startsWith("> KizuBot System Update")) continue;
      if (trimmed.startsWith("To receive bot updates")) continue;
      if (trimmed.startsWith("BOT HOTKEYS")) continue;
      if (trimmed === "> [Changelog] KizuBot System") continue;
      if (trimmed.startsWith("> [Changelog]")) continue;

      // Detect end-of-changelog sections (recreate instructions, machine status)
      if (/^(Quem estiver|Quem precisar|Quem não|🧘|Pra galera|eu solicito)/i.test(trimmed)) {
        break; // Everything after this is NOT changelog content
      }

      // Empty
      if (trimmed.length === 0) continue;

      // Collect bullet items
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        // Normalize WhatsApp bold (*text*) to markdown bold (**text**)
        let normalized = trimmed.replace(/^\*\s+/, "- ");
        // Convert single-asterisk bold to double
        normalized = normalized.replace(/\*([^*\n]+)\*/g, "**$1**");

        if (inEnglish) {
          enItems.push(normalized);
        } else {
          ptItems.push(normalized);
        }
      }
    }

    if (ptItems.length > 0) {
      entries.push({ date: dateStr, ptContent: ptItems, enContent: enItems });
    }
  }

  return entries;
}

// ── Step 3: Merge same-date entries ────────────────────────────
function mergeByDate(entries: ChangelogEntry[]): ChangelogEntry[] {
  const map = new Map<string, ChangelogEntry>();
  for (const e of entries) {
    const existing = map.get(e.date);
    if (existing) {
      existing.ptContent.push(...e.ptContent);
      existing.enContent.push(...e.enContent);
    } else {
      map.set(e.date, { date: e.date, ptContent: [...e.ptContent], enContent: [...e.enContent] });
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

// ── Step 4: Generate MDX ───────────────────────────────────────
function generateMdx(entry: ChangelogEntry): string {
  const pt = entry.ptContent;
  const hasRealEn = entry.enContent.length > 0;
  const en = hasRealEn ? entry.enContent : pt;

  const tags = detectTags(pt.join("\n"));
  const ptTitle = generateTitle(pt, "pt");
  const enTitle = generateTitle(en, "en");
  const ptSummary = generateSummary(pt);
  const enSummary = generateSummary(en);
  // Slug includes date suffix to guarantee uniqueness
  const dateSuffix = entry.date.replace(/-/g, "").substring(4); // MMDD
  const slug = `pokexgames-kizubot-ai-${slugify(ptTitle)}-${dateSuffix}`;

  const esc = (s: string) => s.replace(/"/g, '\\"');

  // When no real EN exists, use PT content but mark it
  const enTitleFinal = hasRealEn ? esc(enTitle) : esc(ptTitle);
  const enSummaryFinal = hasRealEn ? esc(enSummary) : esc(ptSummary);

  return `---
slug: "${slug}"
date: "${entry.date}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
hasEnglish: ${hasRealEn}
pt:
  title: "${esc(ptTitle)}"
  summary: "${esc(ptSummary)}"
en:
  title: "${enTitleFinal}"
  summary: "${enSummaryFinal}"
---

::pt
${pt.join("\n")}
::

::en
${en.join("\n")}
::
`;
}

// ── Main ───────────────────────────────────────────────────────
function main() {
  console.log("Parsing WhatsApp export...");
  const msgs = parseMessages();
  console.log(`Parsed ${msgs.length} messages total`);

  const changelogs = extractChangelogs(msgs);
  console.log(`Found ${changelogs.length} changelog entries`);

  const merged = mergeByDate(changelogs);
  console.log(`Merged to ${merged.length} unique dates`);

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    const existing = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".mdx"));
    for (const file of existing) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
    console.log(`Cleaned ${existing.length} existing MDX files`);
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate
  let created = 0;
  for (const entry of merged) {
    if (entry.ptContent.length === 0) continue;

    const mdx = generateMdx(entry);
    const ptTitle = generateTitle(entry.ptContent, "pt");
    const slugPart = slugify(ptTitle).substring(0, 40);
    const filename = `${entry.date}-${slugPart}.mdx`;

    fs.writeFileSync(path.join(OUTPUT_DIR, filename), mdx, "utf-8");
    created++;
  }

  console.log(`\nCreated ${created} MDX files in ${OUTPUT_DIR}`);

  // Print a summary
  console.log("\nDate range:");
  console.log(`  First: ${merged[0]?.date}`);
  console.log(`  Last:  ${merged[merged.length - 1]?.date}`);
  console.log(`  Total items: ${merged.reduce((s, e) => s + e.ptContent.length, 0)} PT / ${merged.reduce((s, e) => s + e.enContent.length, 0)} EN`);
}

main();
