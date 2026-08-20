export type SeoQueryCompetitionStatus = 'aligned' | 'competing' | 'misaligned';

export interface SeoQueryPageMetric {
    query: string;
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export interface SeoQueryPageOpportunity {
    query: string;
    intendedLandingPage: string;
    actualImpressionPage: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    competitionStatus: SeoQueryCompetitionStatus;
    competingPages: string[];
}

const HEADCOUNT_LANDING_PAGES: Record<string, string> = {
    '6': '/blog/kaohsiung-6-person-stay',
    '10': '/blog/kaohsiung-10-person-stay',
    '20': '/blog/kaohsiung-20-person-stay',
    '30': '/blog/kaohsiung-30-person-stay',
};

export function resolveIntendedSeoLandingPage(rawQuery: string): string | null {
    const query = rawQuery.trim().toLowerCase();
    if (!query) return null;

    if (/溝頂|godin/.test(query)) return '/godin';
    if (/你好哇寓所|hello\s*house/.test(query)) return '/hellohouse';
    if (/hello\s*stay/.test(query)) return '/';

    if (query.includes('鹽埕') && /(美食|早餐|小吃|咖啡|甜點|飲料|宵夜|吃什麼)/.test(query)) {
        return '/explore/food';
    }

    if (/(巨蛋|世運)/.test(query) && /(住宿|民宿|演唱會|住哪)/.test(query)) {
        return '/blog/kaohsiung-arena-accommodation';
    }

    const headcount = query.match(/(?:^|\D)(6|10|20|30)\s*人(?:\D|$)/)?.[1];
    if (headcount && /(住宿|民宿|包棟|住哪)/.test(query)) {
        return HEADCOUNT_LANDING_PAGES[headcount];
    }

    if (/\d+\s*人/.test(query) && /(住宿|民宿|包棟|住哪)/.test(query)) {
        return '/kaohsiung-whole-house';
    }

    if (query.includes('高雄') && query.includes('包棟')) return '/compare';
    if (query.includes('高雄') && /(團體|多人|家族)/.test(query) && /(住宿|民宿)/.test(query)) {
        return '/kaohsiung-whole-house';
    }

    return null;
}

function normalizePagePath(page: string): string {
    try {
        const path = new URL(page, 'https://www.hello-stay.com').pathname;
        return path === '/' ? path : path.replace(/\/$/, '');
    } catch {
        const path = page.split(/[?#]/, 1)[0] || '/';
        return path === '/' ? path : path.replace(/\/$/, '');
    }
}

function aggregatePageRows(rows: SeoQueryPageMetric[]) {
    const byPage = new Map<string, SeoQueryPageMetric[]>();
    for (const row of rows) {
        const page = normalizePagePath(row.page);
        byPage.set(page, [...(byPage.get(page) || []), row]);
    }

    return [...byPage.entries()]
        .map(([page, pageRows]) => {
            const clicks = pageRows.reduce((sum, row) => sum + row.clicks, 0);
            const impressions = pageRows.reduce((sum, row) => sum + row.impressions, 0);
            return {
                page,
                clicks,
                impressions,
                ctr: impressions > 0 ? clicks / impressions : 0,
                position: impressions > 0
                    ? pageRows.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions
                    : 0,
            };
        })
        .sort((left, right) => right.impressions - left.impressions || right.clicks - left.clicks);
}

export function buildSeoQueryPageOpportunities(rows: SeoQueryPageMetric[]): SeoQueryPageOpportunity[] {
    const byQuery = new Map<string, SeoQueryPageMetric[]>();
    for (const row of rows) {
        const query = row.query.trim().toLowerCase();
        if (!query || row.impressions <= 0) continue;
        byQuery.set(query, [...(byQuery.get(query) || []), row]);
    }

    return [...byQuery.entries()]
        .flatMap(([query, queryRows]): SeoQueryPageOpportunity[] => {
            const intendedLandingPage = resolveIntendedSeoLandingPage(query);
            if (!intendedLandingPage) return [];
            const pages = aggregatePageRows(queryRows);
            const actual = pages[0];
            if (!actual) return [];
            const totalImpressions = pages.reduce((sum, page) => sum + page.impressions, 0);
            const significantPages = pages.filter((page) => (
                page.impressions >= 10 && page.impressions / totalImpressions >= 0.2
            ));
            const competitionStatus: SeoQueryCompetitionStatus = significantPages.length > 1
                ? 'competing'
                : actual.page === intendedLandingPage
                    ? 'aligned'
                    : 'misaligned';

            return [{
                query,
                intendedLandingPage,
                actualImpressionPage: actual.page,
                clicks: actual.clicks,
                impressions: actual.impressions,
                ctr: actual.ctr,
                position: actual.position,
                competitionStatus,
                competingPages: significantPages.map((page) => page.page),
            }];
        })
        .sort((left, right) => right.impressions - left.impressions || left.position - right.position);
}
