import assert from 'node:assert/strict';
import { buildSeoRankingSection } from '@/modules/seo/application/seo-health-shared';

async function main() {
    const missing = await buildSeoRankingSection({
        connect: async () => undefined,
        findLatestDate: async () => null,
        fetchData: async () => null,
        saveSnapshot: async () => undefined,
        getSnapshot: async () => null,
        errorPrefix: '[test]',
    });
    assert.equal(missing.rankingData, null);
    assert.equal(missing.rankingError, 'No GSC data available in last 7 days');
    assert.match(missing.report, /最近 7 天都沒有數據/);

    const noPayload = await buildSeoRankingSection({
        connect: async () => undefined,
        findLatestDate: async () => ({ date: '2026-05-10', daysAgo: 2 }),
        fetchData: async () => null,
        saveSnapshot: async () => undefined,
        getSnapshot: async () => null,
        errorPrefix: '[test]',
    });
    assert.equal(noPayload.rankingData, null);
    assert.equal(noPayload.rankingError, 'fetchGSCData returned null');
    assert.match(noPayload.report, /暫時無法取得/);

    let savedDate = '';
    let savedClicks = 0;
    const success = await buildSeoRankingSection({
        connect: async () => undefined,
        findLatestDate: async () => ({ date: '2026-05-10', daysAgo: 2 }),
        fetchData: async () => ({
            totalClicks: 12,
            totalImpressions: 120,
            avgPosition: 5.2,
            avgCtr: 0.1,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
            trendReport: {
                overall: { status: 'flat', label: '持平', reason: 'test' },
                comparison7d: {
                    label: '近7天',
                    current: { startDate: '2026-05-04', endDate: '2026-05-10', clicks: 12, impressions: 120, ctr: 0.1, avgPosition: 5.2 },
                    previous: { startDate: '2026-04-27', endDate: '2026-05-03', clicks: 10, impressions: 100, ctr: 0.1, avgPosition: 5.5 },
                    clicksDelta: 2,
                    clicksDeltaPct: 20,
                    impressionsDelta: 20,
                    impressionsDeltaPct: 20,
                    ctrDelta: 0,
                    positionDelta: 0.3,
                    status: 'flat',
                    note: null,
                },
                comparison28d: {
                    label: '近28天',
                    current: { startDate: '2026-04-13', endDate: '2026-05-10', clicks: 40, impressions: 400, ctr: 0.1, avgPosition: 5.2 },
                    previous: { startDate: '2026-03-16', endDate: '2026-04-12', clicks: 38, impressions: 380, ctr: 0.1, avgPosition: 5.3 },
                    clicksDelta: 2,
                    clicksDeltaPct: 5.26,
                    impressionsDelta: 20,
                    impressionsDeltaPct: 5.26,
                    ctrDelta: 0,
                    positionDelta: 0.1,
                    status: 'flat',
                    note: null,
                },
                landingPages: [],
                keywordGroups: [],
                notes: [],
            },
        }),
        saveSnapshot: async (date, data) => {
            savedDate = date;
            savedClicks = data.totalClicks;
            return undefined;
        },
        getSnapshot: async () => null,
        errorPrefix: '[test]',
    });
    assert.equal(savedDate, '2026-05-10');
    assert.equal(savedClicks, 12);
    assert.equal(success.rankingError, null);
    assert.equal(success.rankingData?.date, '2026-05-10');
    assert.match(success.report, /Google 搜尋趨勢/);
    assert.match(success.report, /整體判斷/);
    assert.doesNotMatch(success.report, /這些字還搜不到你/);

    let connected = false;
    await buildSeoRankingSection({
        connect: async () => {
            connected = true;
        },
        findLatestDate: async () => ({ date: '2026-05-10', daysAgo: 2 }),
        fetchData: async () => ({
            totalClicks: 1,
            totalImpressions: 10,
            avgPosition: 3,
            avgCtr: 0.1,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
            trendReport: {
                overall: { status: 'flat', label: '持平', reason: 'test' },
                comparison7d: {
                    label: '近7天',
                    current: { startDate: '2026-05-04', endDate: '2026-05-10', clicks: 1, impressions: 10, ctr: 0.1, avgPosition: 3 },
                    previous: { startDate: '2026-04-27', endDate: '2026-05-03', clicks: 1, impressions: 10, ctr: 0.1, avgPosition: 3 },
                    clicksDelta: 0,
                    clicksDeltaPct: 0,
                    impressionsDelta: 0,
                    impressionsDeltaPct: 0,
                    ctrDelta: 0,
                    positionDelta: 0,
                    status: 'flat',
                    note: null,
                },
                comparison28d: {
                    label: '近28天',
                    current: { startDate: '2026-04-13', endDate: '2026-05-10', clicks: 4, impressions: 40, ctr: 0.1, avgPosition: 3 },
                    previous: { startDate: '2026-03-16', endDate: '2026-04-12', clicks: 4, impressions: 40, ctr: 0.1, avgPosition: 3 },
                    clicksDelta: 0,
                    clicksDeltaPct: 0,
                    impressionsDelta: 0,
                    impressionsDeltaPct: 0,
                    ctrDelta: 0,
                    positionDelta: 0,
                    status: 'flat',
                    note: null,
                },
                landingPages: [],
                keywordGroups: [],
                notes: [],
            },
        }),
        saveSnapshot: async () => undefined,
        getSnapshot: async () => null,
        errorPrefix: '[test]',
    });
    assert.equal(connected, true);

    console.log('✅ SEO health shared tests passed');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
