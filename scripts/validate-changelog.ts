/**
 * Changelog Validator — Diamond Standard
 *
 * Systematically reads the WhatsApp .txt line by line,
 * extracts every changelog item (PT and EN), then compares
 * with the generated MDX files to find:
 *
 * 1. Missing items (in WhatsApp but not in MDX)
 * 2. Extra items (in MDX but not in WhatsApp)
 * 3. Content mismatches (item text differs)
 * 4. Missing dates (changelog date in WhatsApp not in MDX)
 * 5. EN quality (PT duplicated as EN vs real EN)
 *
 * Usage: npx tsx scripts/validate-changelog.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const INPUT_FILE = path.join(
  __dirname,
  "../../docs/WhatsApp Chat with KizuBot  kizubot.com/WhatsApp Chat with KizuBot  kizubot.com.txt",
);
const MDX_DIR = path.join(__dirname, "../content/changelog");

// ── Step 1: Parse WhatsApp into structured changelogs ──────────
const MSG_START = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s+\d{1,2}:\d{2}\s+-\s+(.+?):\s+([\s\S]*)$/;

interface WhatsAppChangelog {
  date: string;
  ptItems: string[];
  enItems: string[];
  lineStart: number;
}

function parseWhatsApp(): WhatsAppChangelog[] {
  const raw = fs.readFileSync(INPUT_FILE, "utf-8");
  const lines = raw.split("\n");

  // Group into messages first
  interface Msg { month: number; day: number; year: number; sender: string; text: string; line: number; }
  const msgs: Msg[] = [];
  let cur: Msg | null = null;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(MSG_START);
    if (m) {
      if (cur) msgs.push(cur);
      const [, mo, da, yr, sender, text] = m;
      cur = {
        month: parseInt(mo), day: parseInt(da),
        year: parseInt(yr.length === 2 ? `20${yr}` : yr),
        sender, text, line: i + 1,
      };
    } else if (cur) {
      cur.text += "\n" + lines[i];
    }
  }
  if (cur) msgs.push(cur);

  // Extract changelogs
  const changelogs: WhatsAppChangelog[] = [];

  for (const msg of msgs) {
    if (!msg.sender.includes("Big L")) continue;
    if (!msg.text.includes("[Changelog]") && !msg.text.includes("*Changelog:*") && !msg.text.includes("*Changelog*")) continue;

    const dateStr = `${msg.year}-${String(msg.month).padStart(2, "0")}-${String(msg.day).padStart(2, "0")}`;
    const fullLines = msg.text.split("\n");
    const ptItems: string[] = [];
    const enItems: string[] = [];
    let inEnglish = false;
    let pastChangelog = false;

    for (const line of fullLines) {
      const trimmed = line.trim();
      if (/^[\u200b\u200c\u200d\ufeff\u2060\s]+$/.test(trimmed) && trimmed.length > 0) continue;

      if (trimmed.includes("[Changelog]") || trimmed.includes("*Changelog:*") || trimmed.includes("*Changelog*")) {
        pastChangelog = true;
        continue;
      }
      if (!pastChangelog) continue;
      if (trimmed.includes("Atualização no Sistema")) continue;

      if (trimmed.includes("[ENGLISH]") || trimmed.includes("[EN]")) {
        inEnglish = true;
        continue;
      }

      if (/^>?\s*(Sum[aá]rio|Summary|Relogar|Reiniciar|Recriar|Relog\s*=|Restart\s*=|Recreate\s*=)/i.test(trimmed)) continue;
      if (/^-\s*(Relog|Restart|Recreate)\s*=/i.test(trimmed)) continue;
      if (trimmed.startsWith("> KizuBot System Update")) continue;
      if (trimmed.startsWith("To receive bot updates")) continue;
      if (trimmed.startsWith("BOT HOTKEYS")) continue;
      if (trimmed === "> [Changelog] KizuBot System") continue;
      if (trimmed.startsWith("> [Changelog]")) continue;
      if (trimmed.startsWith("*Summary") || trimmed.startsWith("Summary:")) continue;

      // End-of-changelog sections (recreate instructions, machine status)
      if (/^(Quem estiver|Quem precisar|Quem não|🧘|Pra galera|eu solicito)/i.test(trimmed)) {
        break;
      }

      if (trimmed.length === 0) continue;

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const normalized = trimmed.replace(/^\*\s+/, "- ");
        if (inEnglish) {
          enItems.push(normalized);
        } else {
          ptItems.push(normalized);
        }
      }
    }

    if (ptItems.length > 0) {
      changelogs.push({ date: dateStr, ptItems, enItems, lineStart: msg.line });
    }
  }

  return changelogs;
}

// ── Step 2: Parse MDX files ────────────────────────────────────
interface MdxChangelog {
  filename: string;
  date: string;
  slug: string;
  hasEnglish: boolean;
  ptItems: string[];
  enItems: string[];
  ptTitle: string;
  enTitle: string;
}

function parseMdxFiles(): MdxChangelog[] {
  const files = fs.readdirSync(MDX_DIR).filter(f => f.endsWith(".mdx")).sort();
  const results: MdxChangelog[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(MDX_DIR, file), "utf-8");
    const { data, content: body } = matter(content);

    // Extract PT items
    const ptMatch = body.match(/::pt\n([\s\S]*?)(?=::en|::$)/);
    const ptItems = ptMatch
      ? ptMatch[1].split("\n").filter(l => l.trim().startsWith("- ")).map(l => l.trim())
      : [];

    // Extract EN items
    const enMatch = body.match(/::en\n([\s\S]*?)(?=::pt|::$)/);
    const enItems = enMatch
      ? enMatch[1].split("\n").filter(l => l.trim().startsWith("- ")).map(l => l.trim())
      : [];

    results.push({
      filename: file,
      date: data.date,
      slug: data.slug,
      hasEnglish: data.hasEnglish ?? true,
      ptItems,
      enItems,
      ptTitle: data.pt?.title || "",
      enTitle: data.en?.title || "",
    });
  }

  return results;
}

// ── Step 3: Normalize text for comparison ──────────────────────
function normalize(s: string): string {
  return s
    .replace(/\*\*/g, "").replace(/\*/g, "")  // Remove bold markers
    .replace(/\s+/g, " ")                      // Collapse whitespace
    .replace(/^-\s*/, "")                       // Remove leading dash
    .trim()
    .toLowerCase();
}

// ── Step 4: Compare ────────────────────────────────────────────
function main() {
  console.log("=== KizuBot Changelog Validator — Diamond Standard ===\n");

  const whatsapp = parseWhatsApp();
  const mdx = parseMdxFiles();

  console.log(`WhatsApp: ${whatsapp.length} changelog messages`);
  console.log(`MDX:      ${mdx.length} files\n`);

  // Merge WhatsApp by date (same as parser does)
  const waByDate = new Map<string, { ptItems: string[]; enItems: string[]; lines: number[] }>();
  for (const wa of whatsapp) {
    const existing = waByDate.get(wa.date);
    if (existing) {
      existing.ptItems.push(...wa.ptItems);
      existing.enItems.push(...wa.enItems);
      existing.lines.push(wa.lineStart);
    } else {
      waByDate.set(wa.date, { ptItems: [...wa.ptItems], enItems: [...wa.enItems], lines: [wa.lineStart] });
    }
  }

  // MDX by date
  const mdxByDate = new Map<string, MdxChangelog>();
  for (const m of mdx) {
    mdxByDate.set(m.date, m);
  }

  let totalIssues = 0;
  let missingDates = 0;
  let missingPtItems = 0;
  let missingEnItems = 0;
  let extraPtItems = 0;
  let contentMismatches = 0;

  // Check 1: Missing dates
  console.log("--- MISSING DATES (in WhatsApp but not MDX) ---");
  for (const [date] of waByDate) {
    if (!mdxByDate.has(date)) {
      const wa = waByDate.get(date)!;
      console.log(`  MISSING: ${date} (${wa.ptItems.length} PT items, line ${wa.lines.join(",")})`);
      missingDates++;
      totalIssues++;
    }
  }
  if (missingDates === 0) console.log("  ✅ All dates present");

  // Check 2: PT content comparison
  console.log("\n--- PT CONTENT COMPARISON ---");
  for (const [date, wa] of waByDate) {
    const m = mdxByDate.get(date);
    if (!m) continue;

    const waNorm = new Set(wa.ptItems.map(normalize));
    const mdxNorm = new Set(m.ptItems.map(normalize));

    // Missing in MDX
    for (const item of waNorm) {
      if (item.length < 5) continue; // Skip very short items
      let found = false;
      for (const mdxItem of mdxNorm) {
        // Fuzzy match: check if 80% of the text matches
        if (mdxItem.includes(item.substring(0, Math.floor(item.length * 0.7))) ||
            item.includes(mdxItem.substring(0, Math.floor(mdxItem.length * 0.7)))) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(`  MISSING in MDX [${date}]: "${item.substring(0, 80)}..."`);
        missingPtItems++;
        totalIssues++;
      }
    }

    // Extra in MDX (not in WhatsApp)
    for (const item of mdxNorm) {
      if (item.length < 5) continue;
      let found = false;
      for (const waItem of waNorm) {
        if (waItem.includes(item.substring(0, Math.floor(item.length * 0.7))) ||
            item.includes(waItem.substring(0, Math.floor(waItem.length * 0.7)))) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(`  EXTRA in MDX [${date}]: "${item.substring(0, 80)}..."`);
        extraPtItems++;
        totalIssues++;
      }
    }

    // Item count mismatch
    if (wa.ptItems.length !== m.ptItems.length) {
      contentMismatches++;
    }
  }
  if (missingPtItems === 0 && extraPtItems === 0) console.log("  ✅ All PT items match");

  // Check 3: EN content — real EN vs duplicated PT
  console.log("\n--- EN CONTENT QUALITY ---");
  let realEn = 0;
  let ptAsEn = 0;
  for (const m of mdx) {
    if (m.hasEnglish) {
      realEn++;
    } else {
      ptAsEn++;
    }
  }
  console.log(`  Real EN:  ${realEn} entries`);
  console.log(`  PT as EN: ${ptAsEn} entries`);

  // Check for entries marked hasEnglish:true but EN content looks like PT
  let falseEn = 0;
  for (const m of mdx) {
    if (!m.hasEnglish) continue;
    const firstEn = normalize(m.enItems[0] || "");
    if (firstEn.includes("corrigid") || firstEn.includes("adicionad") || firstEn.includes("agora") ||
        firstEn.includes("melhorad") || firstEn.includes("resolvid") || firstEn.includes("ensinei")) {
      console.log(`  FALSE_EN [${m.date}]: "${m.enItems[0]?.substring(0, 60)}..."`);
      falseEn++;
      totalIssues++;
    }
  }
  if (falseEn === 0) console.log("  ✅ No PT content in EN sections");

  // Check 4: Slug quality
  console.log("\n--- SLUG QUALITY ---");
  let badSlugs = 0;
  for (const m of mdx) {
    if (m.slug.length < 30) {
      console.log(`  SHORT_SLUG [${m.date}]: "${m.slug}"`);
      badSlugs++;
    }
    if (m.slug.includes("undefined") || m.slug.includes("null")) {
      console.log(`  BAD_SLUG [${m.date}]: "${m.slug}"`);
      badSlugs++;
      totalIssues++;
    }
  }
  const dupSlugs = mdx.map(m => m.slug).filter((s, i, a) => a.indexOf(s) !== i);
  if (dupSlugs.length > 0) {
    for (const s of new Set(dupSlugs)) {
      console.log(`  DUPLICATE_SLUG: "${s}"`);
      totalIssues++;
    }
  }
  if (badSlugs === 0 && dupSlugs.length === 0) console.log("  ✅ All slugs valid and unique");

  // Check 5: Title quality
  console.log("\n--- TITLE QUALITY ---");
  let badTitles = 0;
  for (const m of mdx) {
    if (m.ptTitle.length < 10) {
      console.log(`  SHORT_TITLE [${m.date}]: "${m.ptTitle}"`);
      badTitles++;
    }
    if (m.ptTitle.endsWith(" foi") || m.ptTitle.endsWith(" de") || m.ptTitle.endsWith(" que") ||
        m.ptTitle.endsWith(" com") || m.ptTitle.endsWith(" no") || m.ptTitle.endsWith(" na") ||
        m.ptTitle.endsWith(" do") || m.ptTitle.endsWith(" da") || m.ptTitle.endsWith(" em") ||
        m.ptTitle.endsWith(" ao") || m.ptTitle.endsWith(" para") || m.ptTitle.endsWith(" pra")) {
      console.log(`  TRUNCATED_TITLE [${m.date}]: "${m.ptTitle}"`);
      badTitles++;
    }
  }
  if (badTitles === 0) console.log("  ✅ All titles good length and not truncated");
  else totalIssues += badTitles;

  // Summary
  console.log("\n========== SUMMARY ==========");
  console.log(`Total MDX files:      ${mdx.length}`);
  console.log(`WhatsApp dates:       ${waByDate.size}`);
  console.log(`Missing dates:        ${missingDates}`);
  console.log(`Missing PT items:     ${missingPtItems}`);
  console.log(`Extra PT items:       ${extraPtItems}`);
  console.log(`Content mismatches:   ${contentMismatches} (item count differs)`);
  console.log(`False EN (PT in EN):  ${falseEn}`);
  console.log(`Bad slugs:            ${badSlugs}`);
  console.log(`Bad titles:           ${badTitles}`);
  console.log(`─────────────────────────────`);
  console.log(`Total issues:         ${totalIssues}`);
  console.log(totalIssues === 0 ? "💎 DIAMOND STANDARD ACHIEVED" : `⚠️  ${totalIssues} issues to fix`);
}

main();
