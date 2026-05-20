import { getPrunedOccasionRedirect, isPrunedOccasionSlug, PRUNED_OCCASION_REDIRECTS } from "@/data/pruned-occasion-slugs";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(PRUNED_OCCASION_REDIRECTS).map(slug => ({ slug }));
}

export default async function OccasionRedirectPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug || !isPrunedOccasionSlug(slug)) {
        notFound();
    }

    permanentRedirect(getPrunedOccasionRedirect(slug));
}
