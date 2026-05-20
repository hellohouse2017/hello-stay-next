export const PRUNED_CAPACITY_REDIRECTS = {
    "10": "/godin",
    "20": "/hellohouse",
    "30": "/kaohsiung-whole-house#capacity-30",
    "40": "/dazhi",
} as const;

export type PrunedCapacitySlug = keyof typeof PRUNED_CAPACITY_REDIRECTS;

export function isPrunedCapacitySlug(slug: string): slug is PrunedCapacitySlug {
    return slug in PRUNED_CAPACITY_REDIRECTS;
}

export function getPrunedCapacityRedirect(slug: PrunedCapacitySlug) {
    return PRUNED_CAPACITY_REDIRECTS[slug];
}
