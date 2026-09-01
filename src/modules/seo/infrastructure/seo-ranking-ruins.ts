/**
 * SEO Ranking — Ruins Bar (ruins.hello-stay.com)
 * 跟民宿版共用 GSC Service Account (sc-domain:hello-stay.com)
 * 但追蹤不同的關鍵字 + 存到獨立 collection
 */
import { google } from 'googleapis';
import { runSeoCheck, ISeoSnapshot, QueryData, PageData, SeoSnapshotSchema } from './seo-ranking';
import {
    DEFAULT_GSC_SITE_URL,
    DEFAULT_RUINS_SITE_ORIGIN,
    defaultSearchConsoleAuthProvider,
} from './seo-gsc-runtime';
import { createMongoSeoSnapshotRepository } from './seo-snapshot-repository';
import { addTaipeiDaysToYmd, formatTaipeiYmd } from '@/lib/taipei-time';

// ── 廢墟 Bar 目標關鍵字 ──────────────────────────
export const RUINS_TARGET_KEYWORDS = [
    '高雄求婚場地',
    '高雄求婚場地推薦',
    '高雄派對場地',
    '高雄包場',
    '高雄派對包場',
    '高雄輕婚禮',
    '高雄活動場地',
    '高雄生日派對場地',
    '高雄場地租借',
    '高雄會議場地',
    '高雄共識營場地',
    '高雄春酒場地',
    '高雄尾牙場地',
    '高雄婚禮派對場地',
    '高雄品牌發表會場地',
    '高雄品酒會場地',
    '高雄產品體驗會場地',
];

const RUINS_SITE_URL = DEFAULT_RUINS_SITE_ORIGIN;
const RUINS_COLLECTION_NAME = 'RuinsSeoSnapshot';
const ruinsSeoSnapshotRepository = createMongoSeoSnapshotRepository({
    collectionName: RUINS_COLLECTION_NAME,
    snapshotSchema: SeoSnapshotSchema,
});

// ── GSC API（保留外部 interface） ──────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchRuinsGSCData(_targetDate?: string): Promise<{
    totalClicks: number; totalImpressions: number; avgPosition: number; avgCtr: number;
    topQueries: QueryData[]; targetKeywords: QueryData[]; topPages: PageData[];
} | null> {
    const result = await runSeoCheck({
        siteUrl: RUINS_SITE_URL,
        targetKeywords: RUINS_TARGET_KEYWORDS,
        collectionName: RUINS_COLLECTION_NAME,
        reportTitle: 'Ruins Bar Google 搜尋排名',
    });

    if (!result) return null;

    const snapshot = result.snapshot;
    return {
        totalClicks: snapshot.totalClicks,
        totalImpressions: snapshot.totalImpressions,
        avgPosition: snapshot.avgPosition,
        avgCtr: snapshot.avgCtr,
        topQueries: snapshot.topQueries,
        targetKeywords: snapshot.targetKeywords,
        topPages: snapshot.topPages,
    };
}

// ── Snapshot CRUD（保留外部 interface） ──────────────────────────────────────

export async function saveRuinsSnapshot(date: string, data: Omit<ISeoSnapshot, 'date' | 'createdAt'>) {
    return ruinsSeoSnapshotRepository.save(date, data);
}

export async function getRuinsSnapshot(date: string): Promise<ISeoSnapshot | null> {
    return ruinsSeoSnapshotRepository.get(date);
}

// ── 部落格文章流量排行 ─────────────────────────────────

export async function fetchRuinsBlogTraffic(): Promise<{
    page: string; title: string; clicks: number; impressions: number; position: number;
}[] | null> {
    const auth = await defaultSearchConsoleAuthProvider.getAuth();
    if (!auth) return null;

    try {
        const sc = google.searchconsole({ version: 'v1', auth });

        const endDate = addTaipeiDaysToYmd(formatTaipeiYmd(), -3);
        const startDate = addTaipeiDaysToYmd(formatTaipeiYmd(), -9);

        const pr = await sc.searchanalytics.query({
            siteUrl: DEFAULT_GSC_SITE_URL,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['page'],
                dimensionFilterGroups: [{
                    filters: [
                        { dimension: 'page', expression: `${RUINS_SITE_URL}/.*blog/`, operator: 'includingRegex' as const },
                    ],
                }],
                rowLimit: 10,
            },
        });

        const rows = (pr.data.rows || []).map(r => {
            const url = r.keys?.[0] || '';
            const slug = url.replace(RUINS_SITE_URL, '').replace(/^\/.*\/blog\//, '');
            return {
                page: url.replace(RUINS_SITE_URL, ''),
                title: slug,
                clicks: r.clicks || 0,
                impressions: r.impressions || 0,
                position: r.position || 0,
            };
        });

        rows.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
        return rows.slice(0, 10);
    } catch (error) {
        console.error('[SEO-Ruins] Blog traffic error:', error instanceof Error ? error.message : error);
        return null;
    }
}

export function buildRuinsBlogReport(articles: { page: string; title: string; clicks: number; impressions: number; position: number }[]): string {
    if (!articles || articles.length === 0) {
        return '\n📝 <b>部落格流量</b>（近7天）\n  目前無部落格流量數據（新文章需 2-4 週才會有數據）\n';
    }

    let report = `\n📝 <b>部落格流量 Top ${articles.length}</b>（近7天）\n`;
    report += `──────────────\n`;

    for (let i = 0; i < articles.length; i++) {
        const a = articles[i];
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        report += `${medal} ${a.title}\n`;
        report += `   ${a.clicks}點擊 · ${a.impressions}曝光 · 排名${Math.round(a.position)}\n`;
    }

    return report;
}
