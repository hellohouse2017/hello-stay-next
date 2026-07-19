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
        audits?: Record<string, { numericValue?: number }>;
    };
    loadingExperience?: {
        metrics?: Record<string, { percentile?: number }>;
    };
};

export type CoreWebVitalsResult = {
    path: string;
    source: 'crux' | 'lighthouse' | 'unavailable';
    lcpMs: number | null;
    inpMs: number | null;
    cls: number | null;
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

export async function fetchCoreWebVitals(pageUrl: string, fetchImpl: typeof fetch = fetch): Promise<CoreWebVitalsResult> {
    const path = new URL(pageUrl).pathname;
    try {
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(pageUrl)}&strategy=mobile&category=performance`;
        const response = await fetchImpl(apiUrl, { signal: AbortSignal.timeout(20_000) });
        if (!response.ok) throw new Error(`PageSpeed ${response.status}`);
        const json = await response.json() as PageSpeedApiResponse;
        const field = json.loadingExperience?.metrics;
        const fieldLcp = field?.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
        const fieldInp = field?.INTERACTION_TO_NEXT_PAINT?.percentile;
        const fieldCls = field?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;
        if (fieldLcp !== undefined || fieldInp !== undefined || fieldCls !== undefined) {
            return {
                path,
                source: 'crux',
                lcpMs: fieldLcp ?? null,
                inpMs: fieldInp ?? null,
                cls: fieldCls !== undefined ? fieldCls / 100 : null,
            };
        }

        const audits = json.lighthouseResult?.audits;
        if (audits) {
            return {
                path,
                source: 'lighthouse',
                lcpMs: audits['largest-contentful-paint']?.numericValue ?? null,
                inpMs: audits['interaction-to-next-paint']?.numericValue ?? null,
                cls: audits['cumulative-layout-shift']?.numericValue ?? null,
            };
        }
    } catch {
        // Weekly reporting should continue when PSI is rate-limited.
    }
    return { path, source: 'unavailable', lcpMs: null, inpMs: null, cls: null };
}

function metric(value: number | null, unit = ''): string {
    return value === null ? 'n/a' : `${unit === 'ms' ? Math.round(value) : value.toFixed(3)}${unit}`;
}

export function buildCoreWebVitalsSection(results: CoreWebVitalsResult[]): string {
    let report = '\n⚡ <b>Core Web Vitals</b>（行動版）\n──────────────\n';
    for (const result of results) {
        report += `${result.path || '/'}: LCP ${metric(result.lcpMs, 'ms')} / INP ${metric(result.inpMs, 'ms')} / CLS ${metric(result.cls)} [${result.source}]\n`;
    }
    return report;
}
