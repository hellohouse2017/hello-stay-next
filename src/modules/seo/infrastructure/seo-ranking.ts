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

const defaultSearchConsoleAuth = defaultSearchConsoleAuthProvider;

function mergeFilterGroups(
    baseGroups: Array<{ filters: Array<{ dimension: string; expression: string; operator: string }> }> = [],
    extraGroups: Array<{ filters: Array<{ dimension: string; expression: string; operator: string }> }> = [],
) {
    if (baseGroups.length === 0) return extraGroups;
    if (extraGroups.length === 0) return baseGroups;
    return [...baseGroups, ...extraGroups];
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

export async function fetchGSCData(targetDate?: string): Promise<{
    totalClicks: number; totalImpressions: number; avgPosition: number; avgCtr: number;
    topQueries: QueryData[]; targetKeywords: QueryData[]; topPages: PageData[];
} | null> {
    const auth = await defaultSearchConsoleAuth.getAuth();
    if (!auth) return null;

    try {
        const sc = google.searchconsole({ version: 'v1', auth });
        const date = targetDate || (() => { const d = new Date(); d.setDate(d.getDate() - 3); return d.toISOString().split('T')[0]; })();

        // 1. 總覽
        const ov = await sc.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody: { startDate: date, endDate: date, dimensions: [] } });
        const overview = ov.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

        // 2. Top queries
        const qr = await sc.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody: { startDate: date, endDate: date, dimensions: ['query'], rowLimit: 10 } });
        const topQueries: QueryData[] = (qr.data.rows || []).map(r => ({ query: r.keys?.[0] || '', clicks: r.clicks || 0, impressions: r.impressions || 0, ctr: r.ctr || 0, position: r.position || 0 }));

        // 3. 目標關鍵字（逐一查）
        const targetKeywords: QueryData[] = [];
        for (const keyword of TARGET_KEYWORDS) {
            try {
                const kr = await sc.searchanalytics.query({
                    siteUrl: GSC_SITE_URL,
                    requestBody: { startDate: date, endDate: date, dimensions: ['query'], dimensionFilterGroups: [{ filters: [{ dimension: 'query', expression: keyword, operator: 'equals' }] }] },
                });
                const row = kr.data.rows?.[0];
                targetKeywords.push(row
                    ? { query: keyword, clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position || 0 }
                    : { query: keyword, clicks: 0, impressions: 0, ctr: 0, position: 0 });
            } catch { targetKeywords.push({ query: keyword, clicks: 0, impressions: 0, ctr: 0, position: 0 }); }
        }

        // 4. Top pages
        const pr = await sc.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody: { startDate: date, endDate: date, dimensions: ['page'], rowLimit: 10 } });
        const topPages: PageData[] = (pr.data.rows || []).map(r => ({ page: (r.keys?.[0] || '').replace(SITE_ORIGIN, ''), clicks: r.clicks || 0, impressions: r.impressions || 0, ctr: r.ctr || 0, position: r.position || 0 }));

        return {
            totalClicks: overview.clicks as number || 0, totalImpressions: overview.impressions as number || 0,
            avgPosition: overview.position as number || 0, avgCtr: overview.ctr as number || 0,
            topQueries, targetKeywords, topPages,
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

function positionText(pos: number): string {
    if (pos === 0) return '❌ Google 搜不到';
    const page = Math.ceil(pos / 10);
    const rank = Math.round(pos);
    if (page === 1) return `✅ 第1頁 第${rank}名`;
    return `⚠️ 第${page}頁 第${rank}名`;
}

function changeText(current: number, previous: number): string {
    if (previous === 0 || current === 0) return '';
    const diff = previous - current;
    if (Math.abs(diff) < 0.5) return '持平';
    if (diff > 0) return `進步${Math.round(diff)}名 ✅`;
    return `退步${Math.round(Math.abs(diff))}名 ⚠️`;
}

function clicksText(clicks: number, impressions: number): string {
    if (impressions === 0) return '還沒有人搜到';
    if (clicks === 0) return `${impressions}人搜到，但沒人點`;
    return `${impressions}人搜到，${clicks}人點進來`;
}

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
