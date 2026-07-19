export const PRUNED_BLOG_REDIRECTS = {
    "kaohsiung-graduation-trip": "/kaohsiung-whole-house",
    "kaohsiung-sports-team": "/packages",
    "kaohsiung-bnb-recommendation": "/",
    "kaohsiung-group-stay-guide": "/kaohsiung-whole-house",
    "kaohsiung-concert-accommodation": "/blog/kaohsiung-arena-accommodation",
} as const;

export type PrunedBlogSlug = keyof typeof PRUNED_BLOG_REDIRECTS;

export function isPrunedBlogSlug(slug: string): slug is PrunedBlogSlug {
    return slug in PRUNED_BLOG_REDIRECTS;
}

export function getPrunedBlogRedirect(slug: PrunedBlogSlug) {
    return PRUNED_BLOG_REDIRECTS[slug];
}
