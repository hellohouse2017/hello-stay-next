/**
 * SEO Ranking — Google Search Console API + MongoDB 快照
 * 每日查 GSC 排名數據，存入 MongoDB，供歷史比較
 */
import mongoose, { Schema, Model } from 'mongoose';
import { google } from 'googleapis';
import { defaultBlogTitleLookup, type BlogTitleLookup } from './seo-blog-title-lookup';
import {
    DEFAULT_GSC_SITE_URL,
    DEFAULT_MAIN_SITE_ORIGIN,
    defaultSearchConsoleAuthProvider,
    type SearchConsoleAuthProvider,
} from './seo-gsc-runtime';
import { createMongoSeoSnapshotRepository } from './seo-snapshot-repository';

// ── 目標關鍵字（老闆最在意的排名）──────────────────

export const TARGET_KEYWORDS = [
    '高雄包棟民宿',
    '高雄包棟推薦',
    '高雄包棟',
    '高雄民宿推薦',
    '高雄民宿包棟',
    '鹽埕民宿',
    '鹽埕包棟',
    '高雄團體住宿',
    '高雄家族旅遊住宿',
    '你好哇寓所',
    '溝頂民宿',
];

export const KEYWORD_GROUPS = [
    {
        key: 'whole_house_core',
        label: '包棟核心詞群',
        keywords: ['高雄包棟民宿', '高雄包棟推薦', '高雄包棟'],
        intent: '最直接反映主站在高雄包棟主戰場的能見度。',
    },
    {
        key: 'accommodation_intent',
        label: '住宿決策詞群',
        keywords: ['高雄民宿推薦', '高雄民宿包棟', '高雄團體住宿', '高雄家族旅遊住宿'],
        intent: '偏近下單前的住宿比較與方案決策。',
    },
    {
        key: 'yancheng_local',
        label: '鹽埕在地詞群',
        keywords: ['鹽埕民宿', '鹽埕包棟'],
        intent: '反映區域型搜尋是否慢慢被吃下來。',
    },
    {
        key: 'brand_terms',
        label: '品牌詞群',
        keywords: ['你好哇寓所', '溝頂民宿'],
        intent: '反映品牌認知與指名搜尋穩定度。',
    },
] as const;

// ── Types ──────────────────────────────────────────────

export interface QueryData {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export interface PageData {
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export interface ISeoSnapshot {
    date: string;
    totalClicks: number;
    totalImpressions: number;
    avgPosition: number;
    avgCtr: number;
    topQueries: QueryData[];
    targetKeywords: QueryData[];
    topPages: PageData[];
    createdAt: Date;
}

export interface SeoPeriodMetrics {
    startDate: string;
    endDate: string;
    clicks: number;
    impressions: number;
    ctr: number;
    avgPosition: number;
}

export type SeoTrendStatus = 'up' | 'flat' | 'down' | 'insufficient';

export interface SeoTrendComparison {
    label: string;
    current: SeoPeriodMetrics;
    previous: SeoPeriodMetrics;
    clicksDelta: number;
    clicksDeltaPct: number | null;
    impressionsDelta: number;
    impressionsDeltaPct: number | null;
    ctrDelta: number;
    positionDelta: number;
    status: SeoTrendStatus;
    note: string | null;
}

export interface SeoLandingPageTrend {
    page: string;
    current: SeoPeriodMetrics;
    previous: SeoPeriodMetrics;
    status: SeoTrendStatus;
    note: string | null;
}

export interface SeoKeywordGroupTrend {
    key: string;
    label: string;
    keywords: string[];
    intent: string;
    comparison7d: SeoTrendComparison;
    comparison28d: SeoTrendComparison;
}

export interface SeoOverallTrendSummary {
    status: 'up' | 'flat' | 'down';
    label: '偏進步' | '持平' | '偏弱';
    reason: string;
}

export interface SeoTrendReport {
    overall: SeoOverallTrendSummary;
    comparison7d: SeoTrendComparison;
    comparison28d: SeoTrendComparison;
    landingPages: SeoLandingPageTrend[];
    keywordGroups: SeoKeywordGroupTrend[];
    notes: string[];
}

// ── Mongoose Model ─────────────────────────────────────

export const SeoSnapshotSchema = new Schema<ISeoSnapshot>({
    date: { type: String, required: true, unique: true, index: true },
    totalClicks: { type: Number, default: 0 },
    totalImpressions: { type: Number, default: 0 },
    avgPosition: { type: Number, default: 0 },
    avgCtr: { type: Number, default: 0 },
    topQueries: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
    targetKeywords: [{ query: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
    topPages: [{ page: String, clicks: Number, impressions: Number, ctr: Number, position: Number }],
}, { timestamps: true });

export const SeoSnapshotModel: Model<ISeoSnapshot> =
    mongoose.models.SeoSnapshot || mongoose.model<ISeoSnapshot>('SeoSnapshot', SeoSnapshotSchema);

const defaultSeoSnapshotRepository = createMongoSeoSnapshotRepository({
    collectionName: 'SeoSnapshot',
    snapshotSchema: SeoSnapshotSchema,
});

// ── GSC API ────────────────────────────────────────────

const GSC_SITE_URL = DEFAULT_GSC_SITE_URL;
const SITE_ORIGIN = DEFAULT_MAIN_SITE_ORIGIN;
const MIN_IMPRESSIONS_FOR_PAGE_JUDGEMENT = 20;
const MIN_IMPRESSIONS_FOR_KEYWORD_GROUP_7D = 20;
const MIN_IMPRESSIONS_FOR_KEYWORD_GROUP_28D = 40;
const MIN_IMPRESSIONS_FOR_SITE_JUDGEMENT = 40;

const defaultSearchConsoleAuth = defaultSearchConsoleAuthProvider;

function mergeFilterGroups(
    baseGroups: Array<{ filters: Array<{ dimension: string; expression: string; operator: string }> }> = [],
    extraGroups: Array<{ filters: Array<{ dimension: string; expression: string; operator: string }> }> = [],
) {
    if (baseGroups.length === 0) return extraGroups;
    if (extraGroups.length === 0) return baseGroups;
    return [...baseGroups, ...extraGroups];
}

function addDays(dateString: string, delta: number): string {
    const date = new Date(`${dateString}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + delta);
    return date.toISOString().split('T')[0];
}

function buildWindow(latestDate: string, days: number, previousOffsetDays: number): { label: string; startDate: string; endDate: string } {
    const endDate = addDays(latestDate, -previousOffsetDays);
    const startDate = addDays(endDate, -(days - 1));
    return { label: `近${days}天`, startDate, endDate };
}

function createEmptyMetrics(startDate: string, endDate: string): SeoPeriodMetrics {
    return {
        startDate,
        endDate,
        clicks: 0,
        impressions: 0,
        ctr: 0,
        avgPosition: 0,
    };
}

function normalizeMetrics(startDate: string, endDate: string, row?: {
    clicks?: number | null;
    impressions?: number | null;
    ctr?: number | null;
    position?: number | null;
} | null): SeoPeriodMetrics {
    return {
        startDate,
        endDate,
        clicks: row?.clicks || 0,
        impressions: row?.impressions || 0,
        ctr: row?.ctr || 0,
        avgPosition: row?.position || 0,
    };
}

function safeDeltaPct(current: number, previous: number): number | null {
    if (previous === 0) {
        return current === 0 ? 0 : null;
    }
    return ((current - previous) / previous) * 100;
}

export function evaluateTrendStatus(current: SeoPeriodMetrics, previous: SeoPeriodMetrics, minImpressions: number): { status: SeoTrendStatus; note: string | null } {
    if ((current.impressions + previous.impressions) < minImpressions) {
        return {
            status: 'insufficient',
            note: `低搜尋量（兩期合計曝光 ${current.impressions + previous.impressions}）`,
        };
    }

    if (previous.impressions === 0 && current.impressions >= minImpressions) {
        return {
            status: 'up',
            note: `前一期幾乎無資料，本期開始累積曝光（${current.impressions}）`,
        };
    }

    const clickDeltaPct = safeDeltaPct(current.clicks, previous.clicks) ?? 0;
    const impressionDeltaPct = safeDeltaPct(current.impressions, previous.impressions) ?? 0;
    const ctrDelta = current.ctr - previous.ctr;
    const positionDelta = previous.avgPosition - current.avgPosition;

    if (clickDeltaPct >= 10 || (impressionDeltaPct >= 10 && ctrDelta >= 0) || positionDelta >= 0.8) {
        return { status: 'up', note: null };
    }

    if (clickDeltaPct <= -10 || (impressionDeltaPct <= -10 && ctrDelta <= 0) || positionDelta <= -0.8) {
        return { status: 'down', note: null };
    }

    return { status: 'flat', note: null };
}

function buildTrendComparison(label: string, current: SeoPeriodMetrics, previous: SeoPeriodMetrics, minImpressions: number): SeoTrendComparison {
    const decision = evaluateTrendStatus(current, previous, minImpressions);
    return {
        label,
        current,
        previous,
        clicksDelta: current.clicks - previous.clicks,
        clicksDeltaPct: safeDeltaPct(current.clicks, previous.clicks),
        impressionsDelta: current.impressions - previous.impressions,
        impressionsDeltaPct: safeDeltaPct(current.impressions, previous.impressions),
        ctrDelta: current.ctr - previous.ctr,
        positionDelta: previous.avgPosition - current.avgPosition,
        status: decision.status,
        note: decision.note,
    };
}

function sumMetrics(metrics: SeoPeriodMetrics[]): SeoPeriodMetrics {
    if (metrics.length === 0) {
        return createEmptyMetrics('', '');
    }

    const clicks = metrics.reduce((sum, item) => sum + item.clicks, 0);
    const impressions = metrics.reduce((sum, item) => sum + item.impressions, 0);
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const weightedPosition = impressions > 0
        ? metrics.reduce((sum, item) => sum + (item.avgPosition * item.impressions), 0) / impressions
        : 0;

    return {
        startDate: metrics[0].startDate,
        endDate: metrics[0].endDate,
        clicks,
        impressions,
        ctr,
        avgPosition: weightedPosition,
    };
}

function buildPageFilterGroups(pageFilter?: string) {
    if (!pageFilter) return [];
    return [{
        filters: [{ dimension: 'page', expression: pageFilter, operator: 'includingRegex' }],
    }];
}

async function fetchOverviewMetrics(sc: ReturnType<typeof google.searchconsole>, startDate: string, endDate: string, pageFilter?: string): Promise<SeoPeriodMetrics> {
    const response = await sc.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: {
            startDate,
            endDate,
            dimensions: [],
            ...(pageFilter ? { dimensionFilterGroups: buildPageFilterGroups(pageFilter) } : {}),
        },
    });
    return normalizeMetrics(startDate, endDate, response.data.rows?.[0]);
}

async function fetchTopQueries(sc: ReturnType<typeof google.searchconsole>, startDate: string, endDate: string, pageFilter?: string): Promise<QueryData[]> {
    const response = await sc.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: {
            startDate,
            endDate,
            dimensions: ['query'],
            rowLimit: 10,
            ...(pageFilter ? { dimensionFilterGroups: buildPageFilterGroups(pageFilter) } : {}),
        },
    });

    return (response.data.rows || []).map((row) => ({
        query: row.keys?.[0] || '',
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
    }));
}

async function fetchKeywordMetrics(sc: ReturnType<typeof google.searchconsole>, keyword: string, startDate: string, endDate: string, pageFilter?: string): Promise<SeoPeriodMetrics> {
    try {
        const response = await sc.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['query'],
                dimensionFilterGroups: mergeFilterGroups(
                    buildPageFilterGroups(pageFilter),
                    [{
                        filters: [{ dimension: 'query', expression: keyword, operator: 'equals' }],
                    }],
                ),
            },
        });
        return normalizeMetrics(startDate, endDate, response.data.rows?.[0]);
    } catch {
        return createEmptyMetrics(startDate, endDate);
    }
}

async function fetchTopPages(sc: ReturnType<typeof google.searchconsole>, startDate: string, endDate: string, pageFilter?: string): Promise<PageData[]> {
    const response = await sc.searchanalytics.query({
        siteUrl: GSC_SITE_URL,
        requestBody: {
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: 10,
            ...(pageFilter ? { dimensionFilterGroups: buildPageFilterGroups(pageFilter) } : {}),
        },
    });

    return (response.data.rows || []).map((row) => ({
        page: (row.keys?.[0] || '').replace(SITE_ORIGIN, ''),
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
    }));
}

function buildLandingPageTrends(currentPages: PageData[], previousPages: PageData[], label: string): SeoLandingPageTrend[] {
    const previousMap = new Map(previousPages.map((page) => [page.page, page]));
    return currentPages.slice(0, 5).map((page) => {
        const current = normalizeMetrics(label, label, {
            clicks: page.clicks,
            impressions: page.impressions,
            ctr: page.ctr,
            position: page.position,
        });
        const previousPage = previousMap.get(page.page);
        const previous = normalizeMetrics(label, label, {
            clicks: previousPage?.clicks || 0,
            impressions: previousPage?.impressions || 0,
            ctr: previousPage?.ctr || 0,
            position: previousPage?.position || 0,
        });
        const decision = evaluateTrendStatus(current, previous, MIN_IMPRESSIONS_FOR_PAGE_JUDGEMENT);

        return {
            page: page.page,
            current,
            previous,
            status: decision.status,
            note: decision.note,
        };
    });
}

function buildKeywordGroupTrend(
    group: typeof KEYWORD_GROUPS[number],
    rows: Array<{
        query: string;
        current7d: SeoPeriodMetrics;
        previous7d: SeoPeriodMetrics;
        current28d: SeoPeriodMetrics;
        previous28d: SeoPeriodMetrics;
    }>,
    label7d: string,
    label28d: string,
): SeoKeywordGroupTrend {
    const comparison7d = buildTrendComparison(
        label7d,
        sumMetrics(rows.map((row) => row.current7d)),
        sumMetrics(rows.map((row) => row.previous7d)),
        MIN_IMPRESSIONS_FOR_KEYWORD_GROUP_7D,
    );
    const comparison28d = buildTrendComparison(
        label28d,
        sumMetrics(rows.map((row) => row.current28d)),
        sumMetrics(rows.map((row) => row.previous28d)),
        MIN_IMPRESSIONS_FOR_KEYWORD_GROUP_28D,
    );

    return {
        key: group.key,
        label: group.label,
        keywords: [...group.keywords],
        intent: group.intent,
        comparison7d,
        comparison28d,
    };
}

function buildOverallTrendSummary(comparison7d: SeoTrendComparison, comparison28d: SeoTrendComparison): SeoOverallTrendSummary {
    const score = [comparison7d, comparison28d].reduce((sum, comparison) => {
        if (comparison.status === 'up') return sum + 1;
        if (comparison.status === 'down') return sum - 1;
        return sum;
    }, 0);

    if (score >= 1) {
        return {
            status: 'up',
            label: '偏進步',
            reason: `${comparison7d.label}與${comparison28d.label}至少有一個主要指標組合轉強，先看曝光與點擊是否持續放大。`,
        };
    }

    if (score <= -1) {
        return {
            status: 'down',
            label: '偏弱',
            reason: `${comparison7d.label}與${comparison28d.label}至少有一個主要指標組合轉弱，需優先檢查主 landing page 與標題 CTR。`,
        };
    }

    return {
        status: 'flat',
        label: '持平',
        reason: '整體曝光、點擊與平均排名沒有明顯惡化，但也尚未形成強烈成長趨勢。',
    };
}

function formatCtr(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
}

function formatSignedPct(value: number | null): string {
    if (value === null) return '新資料';
    const rounded = Math.round(value);
    return `${rounded > 0 ? '+' : ''}${rounded}%`;
}

function formatPosition(value: number): string {
    if (!value) return 'n/a';
    return value.toFixed(1);
}

function renderTrendStatus(status: SeoTrendStatus): string {
    if (status === 'up') return '偏進步 ✅';
    if (status === 'down') return '偏弱 ⚠️';
    if (status === 'insufficient') return '資料不足 ℹ️';
    return '持平';
}

function renderComparisonHeadline(comparison: SeoTrendComparison): string {
    return `點擊 ${comparison.current.clicks}（${formatSignedPct(comparison.clicksDeltaPct)}） / 曝光 ${comparison.current.impressions}（${formatSignedPct(comparison.impressionsDeltaPct)}） / CTR ${formatCtr(comparison.current.ctr)} / 均排名 ${formatPosition(comparison.current.avgPosition)}${comparison.note ? `｜${comparison.note}` : ''}`;
}

function buildTrendComparisonSection(comparison: SeoTrendComparison): string {
    let report = `\n📐 <b>${comparison.label} vs 前一期</b>\n`;
    report += `   ${renderTrendStatus(comparison.status)}\n`;
    report += `   點擊 ${comparison.current.clicks}（前期 ${comparison.previous.clicks}，${formatSignedPct(comparison.clicksDeltaPct)}）\n`;
    report += `   曝光 ${comparison.current.impressions}（前期 ${comparison.previous.impressions}，${formatSignedPct(comparison.impressionsDeltaPct)}）\n`;
    report += `   CTR ${formatCtr(comparison.current.ctr)}（前期 ${formatCtr(comparison.previous.ctr)}，${(comparison.ctrDelta * 100).toFixed(1)}pp）\n`;
    report += `   均排名 ${formatPosition(comparison.current.avgPosition)}（前期 ${formatPosition(comparison.previous.avgPosition)}，${comparison.positionDelta > 0 ? '進步' : comparison.positionDelta < 0 ? '退步' : '持平'} ${Math.abs(comparison.positionDelta).toFixed(1)}）\n`;
    if (comparison.note) {
        report += `   ℹ️ ${comparison.note}\n`;
    }
    return report;
}

function positionText(position: number): string {
    if (position <= 0) return '尚無穩定排名資料';
    const rounded = Math.round(position);
    if (rounded <= 10) return `✅ 第1頁 第${rounded}名`;
    if (rounded <= 20) return `⚠️ 第2頁 第${rounded - 10}名`;
    return `⚠️ 約第${rounded}名`;
}

function changeText(currentPosition: number, previousPosition: number): string | null {
    if (currentPosition <= 0 || previousPosition <= 0) return null;
    const delta = previousPosition - currentPosition;
    const rounded = Math.abs(Math.round(delta));
    if (rounded === 0) return '持平';
    return delta > 0 ? `進步${rounded}名 ✅` : `退步${rounded}名 ⚠️`;
}

function clicksText(clicks: number, impressions: number): string {
    if (impressions <= 0) return '目前搜尋量太低，暫無曝光資料';
    if (clicks <= 0) return `${impressions}人搜到，但沒人點`;
    return `${impressions}人搜到，${clicks}人點進來`;
}

/**
 * 智能回退：從最近的日期往前找，找到第一個有數據的日期
 * GSC 數據延遲不固定（2-4天甚至更久），這樣永遠拿到最新的有效數據
 */
export async function findLatestGSCDate(pageFilter?: string): Promise<{ date: string; daysAgo: number } | null> {
    const auth = await defaultSearchConsoleAuth.getAuth();
    if (!auth) return null;

    const sc = google.searchconsole({ version: 'v1', auth });

    // 從 2 天前開始往回找，最多找到 7 天前
    for (let daysAgo = 2; daysAgo <= 7; daysAgo++) {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        const date = d.toISOString().split('T')[0];

        try {
            const requestBody: Record<string, unknown> = { startDate: date, endDate: date, dimensions: [] };
            if (pageFilter) {
                requestBody.dimensionFilterGroups = [{
                    filters: [{ dimension: 'page', expression: pageFilter, operator: 'includingRegex' }],
                }];
            }
            const res = await sc.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody });
            const row = res.data.rows?.[0];
            if (row && ((row.clicks || 0) > 0 || (row.impressions || 0) > 0)) {
                return { date, daysAgo };
            }
        } catch { /* skip, try older date */ }
    }
    return null;
}

export async function fetchGSCData(targetDate?: string, options?: { pageFilter?: string }): Promise<{
    totalClicks: number; totalImpressions: number; avgPosition: number; avgCtr: number;
    topQueries: QueryData[]; targetKeywords: QueryData[]; topPages: PageData[];
    trendReport: SeoTrendReport;
} | null> {
    const auth = await defaultSearchConsoleAuth.getAuth();
    if (!auth) return null;

    try {
        const sc = google.searchconsole({ version: 'v1', auth });
        const latestDate = targetDate || (() => { const d = new Date(); d.setDate(d.getDate() - 3); return d.toISOString().split('T')[0]; })();
        const pageFilter = options?.pageFilter;

        const current7dRange = buildWindow(latestDate, 7, 0);
        const previous7dRange = buildWindow(latestDate, 7, 7);
        const current28dRange = buildWindow(latestDate, 28, 0);
        const previous28dRange = buildWindow(latestDate, 28, 28);

        const [current7d, previous7d, current28d, previous28d, topQueries, currentTopPages, previousTopPages] = await Promise.all([
            fetchOverviewMetrics(sc, current7dRange.startDate, current7dRange.endDate, pageFilter),
            fetchOverviewMetrics(sc, previous7dRange.startDate, previous7dRange.endDate, pageFilter),
            fetchOverviewMetrics(sc, current28dRange.startDate, current28dRange.endDate, pageFilter),
            fetchOverviewMetrics(sc, previous28dRange.startDate, previous28dRange.endDate, pageFilter),
            fetchTopQueries(sc, current7dRange.startDate, current7dRange.endDate, pageFilter),
            fetchTopPages(sc, current7dRange.startDate, current7dRange.endDate, pageFilter),
            fetchTopPages(sc, previous7dRange.startDate, previous7dRange.endDate, pageFilter),
        ]);

        const keywordRows = await Promise.all(TARGET_KEYWORDS.map(async (keyword) => ({
            query: keyword,
            current7d: await fetchKeywordMetrics(sc, keyword, current7dRange.startDate, current7dRange.endDate, pageFilter),
            previous7d: await fetchKeywordMetrics(sc, keyword, previous7dRange.startDate, previous7dRange.endDate, pageFilter),
            current28d: await fetchKeywordMetrics(sc, keyword, current28dRange.startDate, current28dRange.endDate, pageFilter),
            previous28d: await fetchKeywordMetrics(sc, keyword, previous28dRange.startDate, previous28dRange.endDate, pageFilter),
        })));

        const targetKeywords: QueryData[] = keywordRows.map((row) => ({
            query: row.query,
            clicks: row.current7d.clicks,
            impressions: row.current7d.impressions,
            ctr: row.current7d.ctr,
            position: row.current7d.avgPosition,
        }));

        const topPages = currentTopPages.map((page) => ({
            page: page.page,
            clicks: page.clicks,
            impressions: page.impressions,
            ctr: page.ctr,
            position: page.position,
        }));

        const keywordGroups = KEYWORD_GROUPS.map((group) => {
            const keywords = group.keywords as readonly string[];
            const rows = keywordRows.filter((row) => keywords.includes(row.query));
            return buildKeywordGroupTrend(group, rows, current7dRange.label, current28dRange.label);
        });

        const comparison7d = buildTrendComparison(current7dRange.label, current7d, previous7d, MIN_IMPRESSIONS_FOR_SITE_JUDGEMENT);
        const comparison28d = buildTrendComparison(current28dRange.label, current28d, previous28d, MIN_IMPRESSIONS_FOR_SITE_JUDGEMENT);
        const trendReport: SeoTrendReport = {
            overall: buildOverallTrendSummary(comparison7d, comparison28d),
            comparison7d,
            comparison28d,
            landingPages: buildLandingPageTrends(currentTopPages, previousTopPages, current7dRange.label),
            keywordGroups,
            notes: [
                '低搜尋量詞或近 7/28 天總曝光不足時，日報會標成「資料不足」，不直接判定出榜或退步。',
                '詞群表現來自預設核心關鍵字的聚合，適合看趨勢，不等於即時 SERP 單點排名。',
                '點擊、曝光、排名數字來自 Google Search Console 官方 API；「偏進步/持平/偏弱」是本站依據這些數字做的內部判讀邏輯，不是 Google 的官方評分或保證。',
            ],
        };

        return {
            totalClicks: current7d.clicks,
            totalImpressions: current7d.impressions,
            avgPosition: current7d.avgPosition,
            avgCtr: current7d.ctr,
            topQueries,
            targetKeywords,
            topPages,
            trendReport,
        };
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        throw new Error(`GSC API: ${msg}`);
    }
}

// ── Snapshot CRUD ──────────────────────────────────────

export async function saveSnapshot(date: string, data: Omit<ISeoSnapshot, 'date' | 'createdAt'>) {
    return defaultSeoSnapshotRepository.save(date, data);
}

export async function getSnapshot(date: string): Promise<ISeoSnapshot | null> {
    return defaultSeoSnapshotRepository.get(date);
}

// ── 白話報表 ──────────────────────────────────────────

export function buildRankingReport(
    today: ISeoSnapshot,
    yesterday: ISeoSnapshot | null,
    lastWeek: ISeoSnapshot | null,
): string {
    let report = `\n📈 <b>Google 搜尋排名</b> (${today.date}的數據)\n`;
    report += `──────────────\n`;
    report += `今日全站：${today.totalClicks}人從 Google 點進來，被搜到 ${today.totalImpressions} 次\n`;

    if (yesterday) {
        const d = today.totalClicks - yesterday.totalClicks;
        if (d > 0) report += `比前天多 ${d} 人點進來 ✅\n`;
        else if (d < 0) report += `比前天少 ${Math.abs(d)} 人 ⚠️\n`;
        else report += `跟前天差不多\n`;
    }

    if (today.targetKeywords && today.targetKeywords.length > 0) {
        const ranked = today.targetKeywords.filter(kw => kw.position > 0);
        const unranked = today.targetKeywords.filter(kw => kw.position === 0);

        if (ranked.length > 0) {
            report += `\n🎯 <b>搜這些字能找到你</b>\n`;
            for (const kw of ranked) {
                report += `\n<b>「${kw.query}」</b>\n`;
                report += `  ${positionText(kw.position)}\n`;
                report += `  ${clicksText(kw.clicks, kw.impressions)}\n`;

                if (yesterday?.targetKeywords) {
                    const ykw = yesterday.targetKeywords.find(x => x.query === kw.query);
                    if (ykw && ykw.position > 0) {
                        const c = changeText(kw.position, ykw.position);
                        if (c) report += `  vs昨天：${c}\n`;
                    }
                }
                if (lastWeek?.targetKeywords) {
                    const wkw = lastWeek.targetKeywords.find(x => x.query === kw.query);
                    if (wkw && wkw.position > 0) {
                        const c = changeText(kw.position, wkw.position);
                        if (c) report += `  vs上週：${c}\n`;
                    }
                }
            }
        }

        if (unranked.length > 0) {
            report += `\n❌ <b>這些字還搜不到你</b>\n`;
            report += unranked.map(kw => `  • ${kw.query}`).join('\n') + '\n';
            report += `  <i>→ 持續發文，通常要 2-4 週才會有排名</i>\n`;
        }
    }

    report += `\nℹ️ <i>點擊/曝光/排名數字來自 Google Search Console 官方 API，屬即時官方數據；「進步/退步/持平」等判讀為本站內部邏輯，非 Google 官方評分。</i>\n`;

    return report;
}

export function buildTrendRankingReport(dataDate: string, data: Awaited<ReturnType<typeof fetchGSCData>>): string {
    if (!data) {
        return '\n⚠️ GSC 數據暫時無法取得\n';
    }

    const { trendReport } = data;
    let report = `\n📈 <b>Google 搜尋趨勢</b> (${dataDate} 最新可用資料)\n`;
    report += `──────────────\n`;
    report += `整體判斷：<b>${trendReport.overall.label}</b>\n`;
    report += `${trendReport.overall.reason}\n`;

    report += buildTrendComparisonSection(trendReport.comparison7d);
    report += buildTrendComparisonSection(trendReport.comparison28d);

    if (trendReport.landingPages.length > 0) {
        report += `\n📄 <b>Top Landing Pages 趨勢</b>（近7天）\n`;
        report += `──────────────\n`;
        for (const [index, page] of trendReport.landingPages.entries()) {
            report += `${index + 1}. <b>${page.page}</b>\n`;
            report += `   ${page.current.clicks} 點擊 / ${page.current.impressions} 曝光 / CTR ${formatCtr(page.current.ctr)} / 均排名 ${formatPosition(page.current.avgPosition)}\n`;
            report += `   對比前7天：${renderTrendStatus(page.status)}${page.note ? `｜${page.note}` : ''}\n`;
        }
    }

    if (trendReport.keywordGroups.length > 0) {
        report += `\n🎯 <b>核心詞群趨勢</b>\n`;
        report += `──────────────\n`;
        for (const group of trendReport.keywordGroups) {
            report += `\n<b>${group.label}</b>\n`;
            report += `  關鍵字：${group.keywords.join('、')}\n`;
            report += `  28天：${renderTrendStatus(group.comparison28d.status)}｜${renderComparisonHeadline(group.comparison28d)}\n`;
            report += `  7天：${renderTrendStatus(group.comparison7d.status)}｜${renderComparisonHeadline(group.comparison7d)}\n`;
            report += `  ${group.intent}\n`;
        }
    }

    if (trendReport.notes.length > 0) {
        report += `\nℹ️ <b>判讀說明</b>\n`;
        for (const note of trendReport.notes) {
            report += `  • ${note}\n`;
        }
    }

    return report;
}

export async function runSeoCheck(config: {
    siteUrl: string;
    targetKeywords: string[];
    collectionName: string;
    reportTitle: string;
    authProvider?: SearchConsoleAuthProvider;
}) {
    const auth = await (config.authProvider || defaultSearchConsoleAuth).getAuth();
    if (!auth) return null;

    const pageFilter = config.siteUrl === GSC_SITE_URL ? undefined : config.siteUrl;
    const origin = config.siteUrl.replace(/^sc-domain:/, '');
    const snapshotRepository = createMongoSeoSnapshotRepository({
        collectionName: config.collectionName,
        snapshotSchema: SeoSnapshotSchema,
    });

    const latest = await findLatestGSCDate(pageFilter);
    if (!latest) return null;

    try {
        const sc = google.searchconsole({ version: 'v1', auth });
        const date = latest.date;
        const baseFilterGroups = pageFilter
            ? [{
                filters: [{ dimension: 'page', expression: pageFilter, operator: 'includingRegex' }],
            }]
            : [];

        const ov = await sc.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: { startDate: date, endDate: date, dimensions: [], ...(baseFilterGroups.length ? { dimensionFilterGroups: baseFilterGroups } : {}) },
        });
        const overview = ov.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

        const qr = await sc.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: { startDate: date, endDate: date, dimensions: ['query'], rowLimit: 10, ...(baseFilterGroups.length ? { dimensionFilterGroups: baseFilterGroups } : {}) },
        });
        const topQueries: QueryData[] = (qr.data.rows || []).map(r => ({
            query: r.keys?.[0] || '',
            clicks: r.clicks || 0,
            impressions: r.impressions || 0,
            ctr: r.ctr || 0,
            position: r.position || 0,
        }));

        const targetKeywords: QueryData[] = [];
        for (const keyword of config.targetKeywords) {
            try {
                const keywordFilterGroups = mergeFilterGroups(baseFilterGroups, [{
                    filters: [{ dimension: 'query', expression: keyword, operator: 'equals' }],
                }]);
                const kr = await sc.searchanalytics.query({
                    siteUrl: GSC_SITE_URL,
                    requestBody: {
                        startDate: date,
                        endDate: date,
                        dimensions: ['query'],
                        dimensionFilterGroups: keywordFilterGroups,
                    },
                });
                const row = kr.data.rows?.[0];
                targetKeywords.push(row
                    ? { query: keyword, clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position || 0 }
                    : { query: keyword, clicks: 0, impressions: 0, ctr: 0, position: 0 });
            } catch {
                targetKeywords.push({ query: keyword, clicks: 0, impressions: 0, ctr: 0, position: 0 });
            }
        }

        const pr = await sc.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: { startDate: date, endDate: date, dimensions: ['page'], rowLimit: 10, ...(baseFilterGroups.length ? { dimensionFilterGroups: baseFilterGroups } : {}) },
        });
        const topPages: PageData[] = (pr.data.rows || []).map(r => ({
            page: (r.keys?.[0] || '').replace(origin, ''),
            clicks: r.clicks || 0,
            impressions: r.impressions || 0,
            ctr: r.ctr || 0,
            position: r.position || 0,
        }));

        const snapshotData = {
            totalClicks: overview.clicks as number || 0,
            totalImpressions: overview.impressions as number || 0,
            avgPosition: overview.position as number || 0,
            avgCtr: overview.ctr as number || 0,
            topQueries,
            targetKeywords,
            topPages,
        };

        await snapshotRepository.save(date, snapshotData);

        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0];

        const lastWeek = new Date(date);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekDate = lastWeek.toISOString().split('T')[0];

        const todaySnapshot = await snapshotRepository.get(date);
        const yesterdaySnapshot = await snapshotRepository.get(yesterdayDate);
        const lastWeekSnapshot = await snapshotRepository.get(lastWeekDate);

        if (!todaySnapshot) return null;

        let report = buildRankingReport(todaySnapshot, yesterdaySnapshot, lastWeekSnapshot);
        if (config.reportTitle && config.reportTitle !== 'Google 搜尋排名') {
            report = report.replace('<b>Google 搜尋排名</b>', `<b>${config.reportTitle}</b>`);
        }

        return {
            date,
            report,
            snapshot: todaySnapshot,
            yesterdaySnapshot,
            lastWeekSnapshot,
        };
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        throw new Error(`SEO Check (${config.reportTitle}): ${msg}`);
    }
}

// ── 部落格文章流量排行 ─────────────────────────────────

export interface BlogPageTraffic {
    page: string;
    title: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export interface BlogTrafficReport {
    startDate: string;
    endDate: string;
    articles: BlogPageTraffic[];
}

const BLOG_TRANSLATION_THRESHOLD = 100; // 月曝光超過此數建議翻譯

async function fetchBlogPageTitle(pagePath: string): Promise<string | null> {
    try {
        const res = await fetch(`${SITE_ORIGIN}${pagePath}`);
        if (!res.ok) return null;
        const html = await res.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const rawTitle = titleMatch?.[1]?.trim();
        if (!rawTitle) return null;
        return rawTitle.replace(/\s*\|\s*Hello Stay.*$/, '').trim();
    } catch {
        return null;
    }
}

export async function fetchBlogTraffic(deps?: {
    titleLookup?: BlogTitleLookup;
    fetchPageTitle?: (pagePath: string) => Promise<string | null>;
    authProvider?: SearchConsoleAuthProvider;
}): Promise<BlogTrafficReport | null> {
    const auth = await (deps?.authProvider || defaultSearchConsoleAuth).getAuth();
    if (!auth) return null;

    try {
        const sc = google.searchconsole({ version: 'v1', auth });
        const titleMap = await (deps?.titleLookup || defaultBlogTitleLookup).getTitleMap();

        // 查近 7 天的 /blog/ 頁面數據
        const endDate = (() => { const d = new Date(); d.setDate(d.getDate() - 3); return d.toISOString().split('T')[0]; })();
        const startDate = (() => { const d = new Date(); d.setDate(d.getDate() - 9); return d.toISOString().split('T')[0]; })();

        const pr = await sc.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['page'],
                dimensionFilterGroups: [{
                    filters: [{ dimension: 'page', expression: '/blog/', operator: 'contains' }],
                }],
                rowLimit: 20,
            },
        });

        const rows = await Promise.all((pr.data.rows || []).map(async (r) => {
            const url = r.keys?.[0] || '';
            const page = url.replace(SITE_ORIGIN, '');
            const slug = page.replace(/^\/.*\/blog\//, '');
            const fallbackTitle = await (deps?.fetchPageTitle || fetchBlogPageTitle)(page);
            return {
                page,
                title: titleMap.get(slug) || fallbackTitle || slug,
                clicks: r.clicks || 0,
                impressions: r.impressions || 0,
                ctr: r.ctr || 0,
                position: r.position || 0,
            };
        }));

        // 按 clicks 降序，取 Top 5
        rows.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
        return {
            startDate,
            endDate,
            articles: rows.slice(0, 5),
        };
    } catch (error) {
        console.error('[SEO] Blog traffic error:', error instanceof Error ? error.message : error);
        return null;
    }
}

export function buildBlogRankingReport(reportData: BlogTrafficReport): string {
    const { startDate, endDate, articles } = reportData;
    if (!articles || articles.length === 0) {
        return `\n📝 <b>部落格文章流量</b>（GSC ${startDate} ~ ${endDate}）\n  目前無部落格流量數據\n`;
    }

    let report = `\n📝 <b>部落格文章流量 Top ${articles.length}</b>（GSC ${startDate} ~ ${endDate}）\n`;
    report += `──────────────\n`;

    for (let i = 0; i < articles.length; i++) {
        const a = articles[i];
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        report += `\n${medal} <b>${a.title}</b>\n`;
        report += `   ${a.clicks} 點擊 · ${a.impressions} 曝光 · 均排名 ${Math.round(a.position)}\n`;
        report += `   ${a.page}\n`;
    }

    // 檢查月曝光是否超過門檻（7天數據 × 4.3 ≈ 月估計）
    const suggestTranslation = articles.filter(a => (a.impressions * 4.3) >= BLOG_TRANSLATION_THRESHOLD);
    if (suggestTranslation.length > 0) {
        report += `\n🌐 <b>建議翻譯成英文/日文</b>（月曝光估計超過 ${BLOG_TRANSLATION_THRESHOLD}）\n`;
        for (const a of suggestTranslation) {
            const monthEst = Math.round(a.impressions * 4.3);
            report += `  • ${a.title}（≈${monthEst} 月曝光）\n`;
        }
    }

    report += `\nℹ️ <i>Top 5 來自 GSC 的 /blog/ 頁面聚合，不是即時流量。</i>\n`;
    return report;
}
