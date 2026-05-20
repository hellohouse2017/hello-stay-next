import { getPrunedCompareRedirect, isPrunedCompareSlug, PRUNED_COMPARE_REDIRECTS } from "@/data/pruned-compare-slugs";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(PRUNED_COMPARE_REDIRECTS).map(slug => ({ slug }));
}

export default async function CompareRedirectPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug || !isPrunedCompareSlug(slug)) {
        notFound();
    }

    permanentRedirect(getPrunedCompareRedirect(slug));
}
