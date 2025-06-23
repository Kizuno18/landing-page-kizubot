/**
 * Deep Validator — compares WhatsApp .txt line-by-line with MDX files.
 * For each date, prints EVERY item from WhatsApp and whether it exists in MDX.
 * Also checks if MDX has items that DON'T belong to that date.
 *
 * Usage: npx tsx scripts/deep-validate.ts
 * Usage: npx tsx scripts/deep-validate.ts 2024-11  (filter by date prefix)
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const INPUT_FILE = path.join(
  __dirname,
  "../../docs/WhatsApp Chat with KizuBot  kizubot.com/WhatsApp Chat with KizuBot  kizubot.com.txt",
);
const MDX_DIR = path.join(__dirname, "../content/changelog");
const DATE_FILTER = process.argv[2] || "";

const MSG_START =
  /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s+\d{1,2}:\d{2}\s+-\s+(.+?):\s+([\s\S]*)$/;

// ── Parse WhatsApp ─────────────────────────────────────────────
interface WaEntry {
  date: string;
  ptItems: string[];
  lineStart: number;
}

function parseWhatsApp(): Map<string, WaEntry> {
  const raw = fs.readFileSync(INPUT_FILE, "utf-8");
  const lines = raw.split("\n");

  interface Msg {
    month: number;
    day: number;
    year: number;
    sender: string;
    text: string;
    line: number;
  }
  const msgs: Msg[] = [];
  let cur: Msg | null = null;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(MSG_START);
    if (m) {
      if (cur) msgs.push(cur);
      const [, mo, da, yr, sender, text] = m;
      cur = {
        month: parseInt(mo),
        day: parseInt(da),
        year: parseInt(yr.length === 2 ? `20${yr}` : yr),
        sender,
        text,
        line: i + 1,
      };
    } else if (cur) {
      cur.text += "\n" + lines[i];
    }
  }
  if (cur) msgs.push(cur);

  // Extract changelogs
  const byDate = new Map<string, WaEntry>();

  for (const msg of msgs) {
    if (!msg.sender.includes("Big L")) continue;
    if (
      !msg.text.includes("[Changelog]") &&
      !msg.text.includes("*Changelog:*") &&
      !msg.text.includes("*Changelog*")
    )
      continue;

    const dateStr = `${msg.year}-${String(msg.month).padStart(2, "0")}-${String(msg.day).padStart(2, "0")}`;

    const fullLines = msg.text.split("\n");
    const ptItems: string[] = [];
    let inEnglish = false;
    let pastChangelog = false;

    for (const line of fullLines) {
      const trimmed = line.trim();
      if (
        /^[\u200b\u200c\u200d\ufeff\u2060\s]+$/.test(trimmed) &&
        trimmed.length > 0
      )
        continue;

      if (
        trimmed.includes("[Changelog]") ||
        trimmed.includes("*Changelog:*") ||
        trimmed.includes("*Changelog*")
      ) {
        pastChangelog = true;
        continue;
      }
      if (!pastChangelog) continue;
      if (trimmed.includes("Atualização no Sistema")) continue;

      if (trimmed.includes("[ENGLISH]") || trimmed.includes("[EN]")) {
        inEnglish = true;
        continue;
      }

      if (
        /^>?\s*(Sum[aá]rio|Summary|Relogar|Reiniciar|Recriar|Relog\s*=|Restart\s*=|Recreate\s*=)/i.test(
          trimmed,
        )
      )
        continue;
      if (/^-\s*(Relog|Restart|Recreate)\s*=/i.test(trimmed)) continue;
      if (trimmed.startsWith("> KizuBot System Update")) continue;
      if (trimmed.startsWith("To receive bot updates")) continue;
      if (trimmed.startsWith("BOT HOTKEYS")) continue;
      if (trimmed === "> [Changelog] KizuBot System") continue;
      if (trimmed.startsWith("> [Changelog]")) continue;
      if (trimmed.startsWith("*Summary") || trimmed.startsWith("Summary:"))
        continue;

      // End-of-changelog sections (recreate instructions, machine status)
      if (/^(Quem estiver|Quem precisar|Quem não|🧘|Pra galera|eu solicito)/i.test(trimmed)) {
        break;
      }

      if (trimmed.length === 0) continue;

      if (!inEnglish && (trimmed.startsWith("- ") || trimmed.startsWith("* "))) {
        ptItems.push(trimmed.replace(/^\*\s+/, "- "));
      }
    }

    if (ptItems.length > 0) {
      const existing = byDate.get(dateStr);
      if (existing) {
        existing.ptItems.push(...ptItems);
      } else {
        byDate.set(dateStr, { date: dateStr, ptItems, lineStart: msg.line });
      }
    }
  }

  return byDate;
}

// ── Parse MDX ──────────────────────────────────────────────────
interface MdxEntry {
  filename: string;
  date: string;
  ptItems: string[];
}

function parseMdx(): Map<string, MdxEntry> {
  const byDate = new Map<string, MdxEntry>();
  const files = fs.readdirSync(MDX_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(MDX_DIR, file), "utf-8");
    const { data, content: body } = matter(content);

    const ptMatch = body.match(/::pt\n([\s\S]*?)(?=\n::en|\n::$)/);
    const ptItems = ptMatch
      ? ptMatch[1]
          .split("\n")
          .filter((l) => l.trim().startsWith("- "))
          .map((l) => l.trim())
      : [];

    byDate.set(data.date, { filename: file, date: data.date, ptItems });
  }

  return byDate;
}

// ── Normalize for comparison ───────────────────────────────────
function norm(s: string): string {
  return s
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .replace(/^-\s*/, "")
    .trim()
    .toLowerCase()
    .substring(0, 80);
}

// ── Compare ────────────────────────────────────────────────────
function main() {
  const wa = parseWhatsApp();
  const mdx = parseMdx();

  const allDates = new Set([...wa.keys(), ...mdx.keys()]);
  const sorted = Array.from(allDates).sort();

  let totalMissing = 0;
  let totalExtra = 0;
  let totalWrongDate = 0;
  let datesChecked = 0;

  for (const date of sorted) {
    if (DATE_FILTER && !date.startsWith(DATE_FILTER)) continue;
    datesChecked++;

    const waEntry = wa.get(date);
    const mdxEntry = mdx.get(date);

    if (!waEntry && mdxEntry) {
      console.log(`\n🔴 ${date} — IN MDX BUT NOT IN WHATSAPP (${mdxEntry.filename})`);
      totalWrongDate++;
      continue;
    }

    if (waEntry && !mdxEntry) {
      console.log(`\n🔴 ${date} — IN WHATSAPP (line ${waEntry.lineStart}) BUT NO MDX`);
      totalMissing += waEntry.ptItems.length;
      continue;
    }

    if (!waEntry || !mdxEntry) continue;

    // Compare items
    const waItems = waEntry.ptItems.map(norm);
    const mdxItems = mdxEntry.ptItems.map(norm);

    const missing: string[] = [];
    const extra: string[] = [];

    for (let i = 0; i < waItems.length; i++) {
      const waItem = waItems[i];
      let found = false;
      for (const mdxItem of mdxItems) {
        if (
          mdxItem === waItem ||
          mdxItem.includes(waItem.substring(0, 40)) ||
          waItem.includes(mdxItem.substring(0, 40))
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        missing.push(waEntry.ptItems[i]);
      }
    }

    for (let i = 0; i < mdxItems.length; i++) {
      const mdxItem = mdxItems[i];
      let found = false;
      for (const waItem of waItems) {
        if (
          waItem === mdxItem ||
          waItem.includes(mdxItem.substring(0, 40)) ||
          mdxItem.includes(waItem.substring(0, 40))
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        extra.push(mdxEntry.ptItems[i]);
      }
    }

    if (missing.length > 0 || extra.length > 0 || waItems.length !== mdxItems.length) {
      console.log(
        `\n⚠️  ${date} — WA: ${waItems.length} items, MDX: ${mdxItems.length} items (${mdxEntry.filename})`,
      );
      for (const m of missing) {
        console.log(`  ❌ MISSING: ${m.substring(0, 100)}`);
        totalMissing++;
      }
      for (const e of extra) {
        console.log(`  ➕ EXTRA:   ${e.substring(0, 100)}`);
        totalExtra++;
      }
    }
  }

  console.log("\n========== DEEP VALIDATION SUMMARY ==========");
  console.log(`Dates checked:    ${datesChecked}`);
  console.log(`Missing items:    ${totalMissing}`);
  console.log(`Extra items:      ${totalExtra}`);
  console.log(`Wrong date MDX:   ${totalWrongDate}`);
  console.log(
    totalMissing + totalExtra + totalWrongDate === 0
      ? "💎 PERFECT MATCH"
      : `⚠️  ${totalMissing + totalExtra + totalWrongDate} issues`,
  );
}

main();
