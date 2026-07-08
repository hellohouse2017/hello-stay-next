import assert from 'node:assert/strict';
import { evaluateTrendStatus } from '@/modules/seo/infrastructure/seo-ranking';

async function main() {
    const newPageTrend = evaluateTrendStatus(
        {
            startDate: '2026-06-20',
            endDate: '2026-06-26',
            clicks: 13,
            impressions: 225,
            ctr: 13 / 225,
            avgPosition: 8.4,
        },
        {
            startDate: '2026-06-13',
            endDate: '2026-06-19',
            clicks: 0,
            impressions: 0,
            ctr: 0,
            avgPosition: 0,
        },
        20,
    );

    assert.equal(newPageTrend.status, 'up');
    assert.match(newPageTrend.note || '', /前一期幾乎無資料/);

    const lowVolumeTrend = evaluateTrendStatus(
        {
            startDate: '2026-06-20',
            endDate: '2026-06-26',
            clicks: 0,
            impressions: 1,
            ctr: 0,
            avgPosition: 10,
        },
        {
            startDate: '2026-06-13',
            endDate: '2026-06-19',
            clicks: 0,
            impressions: 1,
            ctr: 0,
            avgPosition: 23,
        },
        20,
    );

    assert.equal(lowVolumeTrend.status, 'insufficient');
    assert.match(lowVolumeTrend.note || '', /低搜尋量/);

    console.log('✅ SEO ranking trend tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
