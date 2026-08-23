import assert from 'node:assert/strict';
import { evaluateTrendStatus } from '@/modules/seo/infrastructure/seo-ranking';
import {
    buildSeoQueryPageOpportunities,
    resolveIntendedSeoLandingPage,
} from '@/modules/seo/domain/seo-query-ownership';

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

    assert.equal(resolveIntendedSeoLandingPage('高雄包棟民宿推薦'), '/kaohsiung-whole-house');
    assert.equal(resolveIntendedSeoLandingPage('高雄包棟民宿'), '/kaohsiung-whole-house');
    assert.equal(resolveIntendedSeoLandingPage('高雄包棟民宿比較'), '/compare');
    assert.equal(resolveIntendedSeoLandingPage('高雄民宿包棟'), '/kaohsiung-whole-house');
    assert.equal(resolveIntendedSeoLandingPage('高雄 10 人住宿'), '/blog/kaohsiung-10-person-stay');
    assert.equal(resolveIntendedSeoLandingPage('高雄 15 人包棟'), '/blog/kaohsiung-15-person-stay');
    assert.equal(resolveIntendedSeoLandingPage('高雄有廚房的民宿'), '/blog/kaohsiung-kitchen-bnb');
    assert.equal(resolveIntendedSeoLandingPage('高雄麻將包棟民宿'), '/blog/kaohsiung-mahjong-stay');
    assert.equal(resolveIntendedSeoLandingPage('高雄親子住宿'), '/blog/kaohsiung-family-accommodation');
    assert.equal(resolveIntendedSeoLandingPage('高雄家族旅遊包棟'), '/blog/kaohsiung-family-reunion');
    assert.equal(resolveIntendedSeoLandingPage('鹽埕早餐推薦'), '/explore/food');
    assert.equal(resolveIntendedSeoLandingPage('你好哇寓所'), '/hellohouse');

    const opportunities = buildSeoQueryPageOpportunities([
        { query: '高雄包棟民宿', page: 'https://www.hello-stay.com/compare', clicks: 8, impressions: 120, ctr: 8 / 120, position: 5.2 },
        { query: '高雄 10 人住宿', page: '/kaohsiung-whole-house', clicks: 2, impressions: 60, ctr: 2 / 60, position: 8.1 },
        { query: '鹽埕早餐推薦', page: '/explore/food', clicks: 3, impressions: 70, ctr: 3 / 70, position: 7 },
        { query: '鹽埕早餐推薦', page: '/blog/yancheng-breakfast-guide', clicks: 1, impressions: 25, ctr: 1 / 25, position: 9 },
    ]);

    assert.deepEqual(
        opportunities.map((opportunity) => ({
            query: opportunity.query,
            intended: opportunity.intendedLandingPage,
            actual: opportunity.actualImpressionPage,
            status: opportunity.competitionStatus,
        })),
        [
            { query: '高雄包棟民宿', intended: '/kaohsiung-whole-house', actual: '/compare', status: 'misaligned' },
            { query: '鹽埕早餐推薦', intended: '/explore/food', actual: '/explore/food', status: 'competing' },
            { query: '高雄 10 人住宿', intended: '/blog/kaohsiung-10-person-stay', actual: '/kaohsiung-whole-house', status: 'misaligned' },
        ],
    );

    console.log('✅ SEO ranking trend tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
