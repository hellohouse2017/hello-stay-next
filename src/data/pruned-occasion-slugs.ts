export const PRUNED_OCCASION_REDIRECTS = {
    "family-trip": "/kaohsiung-whole-house#need-family-trip",
    "friends-gathering": "/kaohsiung-whole-house#need-friends-gathering",
    "company-retreat": "/kaohsiung-whole-house#need-company-retreat",
} as const;

export type PrunedOccasionSlug = keyof typeof PRUNED_OCCASION_REDIRECTS;

export function isPrunedOccasionSlug(slug: string): slug is PrunedOccasionSlug {
    return slug in PRUNED_OCCASION_REDIRECTS;
}

export function getPrunedOccasionRedirect(slug: PrunedOccasionSlug) {
    return PRUNED_OCCASION_REDIRECTS[slug];
}
