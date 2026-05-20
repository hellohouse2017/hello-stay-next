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
    assert.match(success.report, /Google 搜尋排名/);

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
