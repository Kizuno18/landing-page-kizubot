import { notFound } from "next/navigation"
import { DocsArticle } from "@/components/docs-article"
import { docModules, docMetadata, type DocId } from "@/lib/docs"
import { MachineSetupSection } from "../sections/MachineSetupSection"
import { GridViewSection } from "../sections/GridViewSection"
import { SetupSection } from "../sections/SetupSection"
import { CavebotSection } from "../sections/CavebotSection"
import { CombatSection } from "../sections/CombatSection"
import { HealingSection } from "../sections/HealingSection"
import { CatchSection } from "../sections/CatchSection"
import { FarmingSection } from "../sections/FarmingSection"
import { FishingSection } from "../sections/FishingSection"
import { AlarmsSection } from "../sections/AlarmsSection"
import { StatisticsSection } from "../sections/StatisticsSection"
import { PartySection } from "../sections/PartySection"
import { EngineSection } from "../sections/EngineSection"
import { ActionsSection } from "../sections/ActionsSection"
import { AccountSection } from "../sections/AccountSection"
import { HumanizationSection } from "../sections/HumanizationSection"
import { KizuAISection } from "../sections/KizuAISection"
import { HotkeysSection } from "../sections/HotkeysSection"

const sections = { "machine-setup": MachineSetupSection, gridview: GridViewSection, setup: SetupSection, cavebot: CavebotSection, combat: CombatSection, healing: HealingSection, catch: CatchSection, farming: FarmingSection, fishing: FishingSection, alarms: AlarmsSection, statistics: StatisticsSection, party: PartySection, engine: EngineSection, actions: ActionsSection, account: AccountSection, humanization: HumanizationSection, "kizu-ai": KizuAISection, hotkeys: HotkeysSection } satisfies Record<DocId, React.ComponentType>
type Props = { params: Promise<{ module: string }> }
export const dynamicParams = false
export function generateStaticParams() { return docModules.map((doc) => ({ module: doc.id })) }
async function resolveId(params: Props["params"]): Promise<DocId> { const { module } = await params; const doc = docModules.find((doc) => doc.id === module); if (!doc) notFound(); return doc.id }
export async function generateMetadata({ params }: Props) { return docMetadata(await resolveId(params)) }
export default async function DocumentationModule({ params }: Props) { const id = await resolveId(params); const Section = sections[id]; return <DocsArticle id={id}><Section /></DocsArticle> }
