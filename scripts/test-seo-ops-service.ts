import assert from 'node:assert/strict';
import {
    appendOptionalReportSection,
    buildMainSeoHealthOpsState,
    buildRuinsSeoHealthOpsState,
} from '@/modules/seo/application/seo-ops-service';

async function main() {
    const noDataReport = await appendOptionalReportSection({
        fetchData: async () => null,
        buildReport: () => 'should not happen',
        onEmpty: () => 'EMPTY',
        logPrefix: '[TEST]',
    });
    assert.equal(noDataReport, 'EMPTY');

    const errorReport = await appendOptionalReportSection({
        fetchData: async () => {
            throw new Error('boom');
        },
        buildReport: () => 'should not happen',
        onError: (message) => `ERR:${message}`,
        logPrefix: '[TEST]',
    });
    assert.equal(errorReport, 'ERR:boom');

    const successReport = await appendOptionalReportSection({
        fetchData: async () => ({ value: 42 }),
        buildReport: (data) => `OK:${data.value}`,
        logPrefix: '[TEST]',
    });
    assert.equal(successReport, 'OK:42');

    const mainHealthy = buildMainSeoHealthOpsState({
        nowIso: '2026-05-12T08:00:00.000Z',
        alertSent: true,
        pagesWithIssues: [],
        totalPages: 9,
        pagesWithJsonLd: 9,
        robotsOk: true,
        sitemap: { ok: true, pageCount: 9 },
        rankingError: null,
        ga4SiteTagDetected: true,
        ga4DataApiStatus: 'configured',
    });
    assert.equal(mainHealthy.status, 'healthy');
    assert.equal(mainHealthy.healthy, true);
    assert.equal(mainHealthy.message, 'SEO health 檢查正常。');
    assert.equal(mainHealthy.lastAlertAt, '2026-05-12T08:00:00.000Z');

    const mainFailed = buildMainSeoHealthOpsState({
        nowIso: '2026-05-12T08:00:00.000Z',
        alertSent: false,
        pagesWithIssues: [
            {
                name: '首頁',
                path: '/',
                status: 200,
                hasTitle: true,
                hasDescription: true,
                hasJsonLd: false,
                hasOG: true,
                titleLength: 20,
                descLength: 100,
                issues: ['❌ 缺少 JSON-LD'],
            },
        ],
        totalPages: 9,
        pagesWithJsonLd: 8,
        robotsOk: true,
        sitemap: { ok: true, pageCount: 9 },
        rankingError: 'GSC timeout',
        ga4SiteTagDetected: false,
        ga4DataApiStatus: 'missing_config',
    });
    assert.equal(mainFailed.status, 'failed');
    assert.equal(mainFailed.healthy, false);
    assert.match(mainFailed.message || '', /1 個頁面有問題/);
    assert.match(mainFailed.message || '', /GA4 前台埋碼未偵測到/);
    assert.match(mainFailed.message || '', /GSC \/ ranking 取數異常/);
    assert.equal(mainFailed.summary?.rankingError, 'GSC timeout');
    assert.equal(mainFailed.summary?.ga4SiteTagDetected, false);

    const ruinsFailed = buildRuinsSeoHealthOpsState({
        nowIso: '2026-05-12T08:00:00.000Z',
        alertSent: false,
        robotsOk: false,
        sitemap: { ok: true, pageCount: 12 },
        llms: { ok: true, msg: '✅ llms.txt (AI 搜尋優化)' },
        jsonLd: { ok: false, okCount: 4, total: 5 },
        pageSpeed: {
            mobile: { perf: 91, a11y: 88, bp: 77, seo: 95 },
            desktop: null,
        },
        rankingError: null,
    });
    assert.equal(ruinsFailed.status, 'failed');
    assert.equal(ruinsFailed.healthy, false);
    assert.equal(ruinsFailed.message, 'Ruins SEO health 有問題。');
    assert.equal(ruinsFailed.summary?.jsonLdCoverage, '4/5');
    assert.deepEqual(ruinsFailed.summary?.pageSpeedMobile, { perf: 91, a11y: 88, bp: 77, seo: 95 });

    console.log('✅ SEO ops service tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
