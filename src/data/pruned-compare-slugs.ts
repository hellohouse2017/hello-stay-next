export const PRUNED_COMPARE_REDIRECTS = {
    "hellohouse-vs-godin": "/compare",
    "hellohouse-vs-dazhi": "/compare",
    "godin-vs-dazhi": "/compare",
} as const;

export type PrunedCompareSlug = keyof typeof PRUNED_COMPARE_REDIRECTS;

export function isPrunedCompareSlug(slug: string): slug is PrunedCompareSlug {
    return slug in PRUNED_COMPARE_REDIRECTS;
}

export function getPrunedCompareRedirect(slug: PrunedCompareSlug) {
    return PRUNED_COMPARE_REDIRECTS[slug];
}
