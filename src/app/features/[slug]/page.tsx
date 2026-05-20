import { getPrunedFeatureRedirect, isPrunedFeatureSlug, PRUNED_FEATURE_REDIRECTS } from "@/data/pruned-feature-slugs";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(PRUNED_FEATURE_REDIRECTS).map(slug => ({ slug }));
}

export default async function FeatureRedirectPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug || !isPrunedFeatureSlug(slug)) {
        notFound();
    }

    permanentRedirect(getPrunedFeatureRedirect(slug));
}
