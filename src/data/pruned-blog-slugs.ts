export const PRUNED_BLOG_REDIRECTS = {
    "kaohsiung-graduation-trip": "/kaohsiung-whole-house",
    "kaohsiung-sports-team": "/packages",
    "kaohsiung-bnb-recommendation": "/",
    "kaohsiung-group-stay-guide": "/kaohsiung-whole-house",
    "yancheng-food-guide": "/explore",
} as const;

export type PrunedBlogSlug = keyof typeof PRUNED_BLOG_REDIRECTS;

export function isPrunedBlogSlug(slug: string): slug is PrunedBlogSlug {
    return slug in PRUNED_BLOG_REDIRECTS;
}

export function getPrunedBlogRedirect(slug: PrunedBlogSlug) {
    return PRUNED_BLOG_REDIRECTS[slug];
}
