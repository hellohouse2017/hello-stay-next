import type { PageSpeedCategoryScores, PageSpeedReport } from '@/modules/seo/domain/seo-report-formatters';

type PageSpeedStrategy = 'mobile' | 'desktop';

type LighthouseCategoryScores = {
    performance?: { score?: number };
    accessibility?: { score?: number };
    'best-practices'?: { score?: number };
    seo?: { score?: number };
};

type PageSpeedApiResponse = {
    error?: unknown;
    lighthouseResult?: {
        categories?: LighthouseCategoryScores;
    };
};

export function extractPageSpeedCategoryScores(categories: LighthouseCategoryScores | undefined): PageSpeedCategoryScores {
    return {
        perf: Math.round((categories?.performance?.score || 0) * 100),
        a11y: Math.round((categories?.accessibility?.score || 0) * 100),
        bp: Math.round((categories?.['best-practices']?.score || 0) * 100),
        seo: Math.round((categories?.seo?.score || 0) * 100),
    };
}

export async function fetchPageSpeedReport(
    pageUrl: string,
    fetchImpl: typeof fetch = fetch
): Promise<PageSpeedReport> {
    const result: PageSpeedReport = { mobile: null, desktop: null };

    for (const strategy of ['mobile', 'desktop'] as const satisfies PageSpeedStrategy[]) {
        try {
            const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(pageUrl)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;
            const response = await fetchImpl(apiUrl);
            const json = await response.json() as PageSpeedApiResponse;
            if (json.error) continue;
            result[strategy] = extractPageSpeedCategoryScores(json.lighthouseResult?.categories);
        } catch {
            // Rate-limited or transient API failures should not fail the whole SEO report.
            continue;
        }
    }

    return result;
}
