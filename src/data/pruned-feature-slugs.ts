export const PRUNED_FEATURE_REDIRECTS = {
    kitchen: "/blog/kaohsiung-kitchen-bnb#kitchen",
    parking: "/traffic#parking",
} as const;

export type PrunedFeatureSlug = keyof typeof PRUNED_FEATURE_REDIRECTS;

export function isPrunedFeatureSlug(slug: string): slug is PrunedFeatureSlug {
    return slug in PRUNED_FEATURE_REDIRECTS;
}

export function getPrunedFeatureRedirect(slug: PrunedFeatureSlug) {
    return PRUNED_FEATURE_REDIRECTS[slug];
}
