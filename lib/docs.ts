import { pageMetadata } from "@/lib/seo"

export const docModules = [
  { id: "machine-setup", name: "Machine Setup", title: "Machine Setup: configure sua máquina", description: "Aprenda a preparar a máquina, acessar a sessão remota e iniciar a configuração do KizuBot.", section: "MachineSetupSection", terms: ["machine", "máquina", "maquina", "vnc", "datacenter"] },
  { id: "gridview", name: "GridView e painel", title: "GridView: monitore personagens pelo painel", description: "Conheça o GridView do KizuBot para acompanhar sessões e acessar o painel de controle dos personagens.", section: "GridViewSection", terms: ["gridview", "panel", "painel", "dashboard"] },
  { id: "setup", name: "Setup de Pokémon", title: "Setup: configure os Pokémon do KizuBot", description: "Veja as configurações de Pokémon e prepare o KizuBot para suas sessões no PokeXGames.", section: "SetupSection", terms: ["setup", "pokémon setup", "pokemon setup"] },
  { id: "cavebot", name: "Cavebot", title: "Cavebot: configure rotas e navegação", description: "Aprenda a configurar rotas, waypoints e ações de navegação do Cavebot no KizuBot para PokeXGames.", section: "CavebotSection", terms: ["cavebot", "waypoint", "rota", "route", "walker", "kwpt"] },
  { id: "combat", name: "Combate", title: "Combate: configure ataques e combos", description: "Consulte as opções de combate do KizuBot e ajuste ataques, combos e condições para suas caçadas.", section: "CombatSection", terms: ["combat", "combo", "attack", "ataque", "pokemove"] },
  { id: "healing", name: "Cura e recuperação", title: "Healing: configure cura e recuperação", description: "Aprenda a ajustar as opções de cura, recuperação e proteção de vida no KizuBot.", section: "HealingSection", terms: ["healing", "heal", "cura", "revive", "health"] },
  { id: "catch", name: "Captura", title: "Catch: configure a captura de Pokémon", description: "Conheça as opções de captura automática do KizuBot e configure suas preferências de catch no PokeXGames.", section: "CatchSection", terms: ["catch", "captur", "pokeball", "pokéball"] },
  { id: "farming", name: "Farming", title: "Farming: configure a coleta de recursos", description: "Configure as opções de coleta de recursos do KizuBot e acompanhe suas atividades de farming.", section: "FarmingSection", terms: ["farm", "coleta", "gather", "resource", "recurso"] },
  { id: "fishing", name: "Pesca", title: "Fishing: configure a pesca automática", description: "Veja como ajustar o módulo de pesca do KizuBot e suas configurações para o PokeXGames.", section: "FishingSection", terms: ["fish", "pesc"] },
  { id: "alarms", name: "Alarmes", title: "Alarmes: configure avisos e notificações", description: "Conheça as opções de alarmes e notificações do KizuBot para acompanhar acontecimentos durante suas sessões.", section: "AlarmsSection", terms: ["alarm", "notifica", "notification", "alert"] },
  { id: "statistics", name: "Estatísticas", title: "Estatísticas: acompanhe suas sessões", description: "Entenda os relatórios e as estatísticas de sessões, combate e coleta exibidos pelo KizuBot.", section: "StatisticsSection", terms: ["statistic", "estatística", "estatistica", "report", "relatório", "relatorio"] },
  { id: "party", name: "Party", title: "Party: configure o jogo em grupo", description: "Consulte as configurações do módulo Party do KizuBot para organizar atividades em grupo.", section: "PartySection", terms: ["party", "grupo", "group"] },
  { id: "engine", name: "Engine", title: "Engine: configurações gerais do KizuBot", description: "Conheça as configurações gerais do Engine e ajuste o comportamento dos módulos do KizuBot.", section: "EngineSection", terms: ["engine", "motor", "geral"] },
  { id: "actions", name: "Actions e Rules", title: "Actions e Rules: configure regras e ações", description: "Aprenda a configurar regras e ações do KizuBot, relacionando condições e comandos no painel.", section: "ActionsSection", terms: ["action", "rule", "regra", "macro", "ação", "ações"] },
  { id: "account", name: "Conta", title: "Conta: configurações e acesso ao KizuBot", description: "Consulte as opções de conta do KizuBot e encontre orientações para suas configurações de acesso.", section: "AccountSection", terms: ["account", "conta", "login", "premium", "plano", "billing"] },
  { id: "humanization", name: "Humanização", title: "Humanização: conheça as configurações", description: "Entenda as opções de humanização do KizuBot e consulte os avisos sobre os riscos de utilização.", section: "HumanizationSection", terms: ["humaniz", "humanis", "segurança", "security"] },
  { id: "kizu-ai", name: "KizuAI", title: "KizuAI: conheça o assistente do KizuBot", description: "Veja os recursos e as configurações do assistente KizuAI disponíveis no painel do KizuBot.", section: "KizuAISection", terms: ["kizuai", "kizu-ai", "assistant", "assistente"] },
  { id: "hotkeys", name: "Atalhos de teclado", title: "Hotkeys: atalhos de teclado do KizuBot", description: "Consulte os atalhos do KizuBot no cliente PokeXGames: controle do bot, configurações, janelas e ferramentas de diagnóstico.", section: "HotkeysSection", terms: ["hotkey", "atalho", "keyboard", "teclado", "cam offline"] },
] as const
export type DocId = typeof docModules[number]["id"]
export function getDoc(id: DocId) { return docModules.find((doc) => doc.id === id)! }
export function docMetadata(id: DocId) { const doc = getDoc(id); return pageMetadata(doc.title, doc.description, `/docs/${id}`) }
function termScore(terms: readonly string[], text: string): number { return terms.filter((term) => text.includes(term)).length }
export function relatedDocs(text: string) {
  const normalized = text.toLocaleLowerCase("pt-BR")
  return docModules.map((doc) => ({ doc, score: termScore(doc.terms, normalized) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 6).map(({ doc }) => doc)
}
