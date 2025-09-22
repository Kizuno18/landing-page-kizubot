import { getChangelogSlugsWithEnglish } from "@/lib/changelog"
import { ChangelogArticlePage, changelogMetadata } from "@/components/changelog/article-page"
type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export function generateStaticParams() { return getChangelogSlugsWithEnglish().map((slug) => ({ slug })) }
export async function generateMetadata({ params }: Props) { return changelogMetadata((await params).slug, "en") }
export default async function Page({ params }: Props) { return <ChangelogArticlePage slug={(await params).slug} locale="en" /> }
