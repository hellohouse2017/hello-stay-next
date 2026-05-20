import { getPrunedCapacityRedirect, isPrunedCapacitySlug, PRUNED_CAPACITY_REDIRECTS } from "@/data/pruned-capacity-slugs";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(PRUNED_CAPACITY_REDIRECTS).map(slug => ({ slug }));
}

export default async function CapacityRedirectPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug || !isPrunedCapacitySlug(slug)) {
        notFound();
    }

    permanentRedirect(getPrunedCapacityRedirect(slug));
}
