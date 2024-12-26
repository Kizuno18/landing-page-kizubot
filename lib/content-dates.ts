import { execFileSync } from "node:child_process"

// Optional dates must reflect actual file history, never checkout or build time.
const dates = new Map<string, string | undefined>()
let historyAvailable: boolean | undefined
function git(args: string[]): string { return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 2000 }).trim() }
export function contentModifiedAt(file: string): string | undefined {
  if (dates.has(file)) return dates.get(file)
  let value: string | undefined
  try {
    // A shallow boundary can make every file appear modified by the latest commit.
    if (historyAvailable === undefined) historyAvailable = git(["rev-parse", "--is-shallow-repository"]) === "false"
    if (historyAvailable) {
      const date = git(["log", "-1", "--format=%cI", "--", file])
      if (date && Number.isFinite(Date.parse(date))) value = new Date(date).toISOString()
    }
  } catch { historyAvailable = false }
  dates.set(file, value)
  return value
}
