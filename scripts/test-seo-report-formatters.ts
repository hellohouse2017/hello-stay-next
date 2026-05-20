import assert from 'node:assert/strict';
import {
    buildElapsedSection,
    buildMainGa4Section,
    buildMainSeoHealthIntro,
    buildPageSpeedSection,
    buildRuinsSeoHealthIntro,
} from '@/modules/seo/domain/seo-report-formatters';

async function main() {
    const mainIntro = buildMainSeoHealthIntro({
        timestamp: '2026/05/12 16:00:00',
        robotsOk: true,
        sitemap: { ok: true, pageCount: 9 },
        pagesWithJsonLd: 7,
        totalPages: 9,
        pagesWithIssues: [
            {
                name: '首頁',
                path: '/',
                status: 200,
                hasTitle: true,
                hasDescription: true,
                hasJsonLd: false,
                hasOG: true,
                titleLength: 28,
                descLength: 96,
                issues: ['❌ 缺少 JSON-LD'],
            },
        ],
    });
    assert.match(mainIntro, /SEO 健康日報/);
    assert.match(mainIntro, /✅ robots\.txt/);
    assert.match(mainIntro, /✅ sitemap\.xml \(9 頁\)/);
    assert.match(mainIntro, /✅ JSON-LD: 7\/9 頁/);
    assert.match(mainIntro, /📄 <b>首頁<\/b> \(\//);
    assert.match(mainIntro, /❌ 缺少 JSON-LD/);

    const ruinsIntro = buildRuinsSeoHealthIntro({
        timestamp: '2026/05/12 16:00:00',
        robotsOk: false,
        sitemap: { ok: true, pageCount: 12 },
        llms: { ok: true, msg: '✅ llms.txt (AI 搜尋優化)' },
        jsonLd: { ok: false, okCount: 4, total: 5 },
    });
    assert.match(ruinsIntro, /廢墟酒吧 SEO 健康日報/);
    assert.match(ruinsIntro, /❌ robots\.txt/);
    assert.match(ruinsIntro, /✅ llms\.txt/);
    assert.match(ruinsIntro, /⚠️ JSON-LD: 4\/5 頁/);
    assert.match(ruinsIntro, /⚠️ 有問題需要處理/);

    const pageSpeed = buildPageSpeedSection({
        mobile: { perf: 92, a11y: 81, bp: 49, seo: 100 },
        desktop: null,
    });
    assert.match(pageSpeed, /PageSpeed 分數/);
    assert.match(pageSpeed, /🟢 效能: 92/);
    assert.match(pageSpeed, /🟠 無障礙: 81/);
    assert.match(pageSpeed, /🔴 最佳做法: 49/);

    const noPageSpeed = buildPageSpeedSection({ mobile: null, desktop: null });
    assert.match(noPageSpeed, /PageSpeed API 額度暫時不足/);

    const ga4Configured = buildMainGa4Section({
        measurementId: 'G-N2LV3SSTPF',
        siteTagDetected: true,
        propertyIdConfigured: true,
        oauthConfigured: true,
        dataApiStatus: 'configured',
        dataDate: '2026-05-10',
        summary: { sessions: 42, users: 30, pageviews: 99 },
        landingPages: [{ page: '/blog/post-a', sessions: 20, users: 15 }],
        aiAssistantsSummary: { sessions: 6, users: 5, pageviews: 12 },
        aiSources: [{ source: 'chatgpt.com', sessions: 4, users: 3, pageviews: 8 }],
        dataApiError: null,
    });
    assert.match(ga4Configured, /GA4 狀態/);
    assert.match(ga4Configured, /✅ 前台埋碼: G-N2LV3SSTPF/);
    assert.match(ga4Configured, /來源拆分/);
    assert.match(ga4Configured, /Organic Search: Sessions 42 \/ Users 30 \/ Pageviews 99/);
    assert.match(ga4Configured, /AI Assistants: Sessions 6 \/ Users 5 \/ Pageviews 12/);
    assert.match(ga4Configured, /Top AI Sources/);
    assert.match(ga4Configured, /chatgpt\.com/);
    assert.match(ga4Configured, /Google AI Overviews \/ AI Mode 目前仍算在 Organic Search/);

    const ga4MissingConfig = buildMainGa4Section({
        measurementId: 'G-N2LV3SSTPF',
        siteTagDetected: true,
        propertyIdConfigured: false,
        oauthConfigured: false,
        dataApiStatus: 'missing_config',
        dataDate: null,
        summary: null,
        landingPages: [],
        aiAssistantsSummary: null,
        aiSources: [],
        dataApiError: null,
    });
    assert.match(ga4MissingConfig, /還需補齊 Property ID 與 OAuth 設定/);

    const ga4MissingTag = buildMainGa4Section({
        measurementId: 'G-N2LV3SSTPF',
        siteTagDetected: false,
        propertyIdConfigured: true,
        oauthConfigured: true,
        dataApiStatus: 'missing_config',
        dataDate: null,
        summary: null,
        landingPages: [],
        aiAssistantsSummary: null,
        aiSources: [],
        dataApiError: null,
    });
    assert.match(ga4MissingTag, /尚未偵測到 GA4 前台埋碼/);

    assert.equal(buildElapsedSection('3.4'), '\n⏱️ 檢查耗時 3.4s');

    console.log('✅ SEO report formatter tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
