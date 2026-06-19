import assert from 'node:assert/strict';
import { buildSeoHealthRoutePayload } from '@/modules/seo/application/seo-health-route-payload';

async function main() {
    const payload = buildSeoHealthRoutePayload({
        success: true,
        healthy: false,
        timestamp: '2026/5/12 上午10:00:00',
        elapsed: '4.2s',
        pages: [
            {
                name: '首頁',
                path: '/',
                status: 200,
                jsonLd: true,
                issues: [],
            },
            {
                name: '查詢空房',
                path: '/book',
                status: 500,
                jsonLd: false,
                issues: ['title missing', 'json-ld missing'],
            },
        ],
        sitemap: {
            ok: true,
            pageCount: 42,
        },
        robots: true,
        ranking: {
            totalClicks: 12,
            totalImpressions: 180,
            avgPosition: 9.4,
            avgCtr: 0.067,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
        },
        rankingError: 'gsc timeout',
        ga4: {
            measurementId: 'G-LKVWPNVH5M',
            siteTagDetected: true,
            propertyIdConfigured: false,
            oauthConfigured: true,
            dataApiStatus: 'missing_config',
            date: null,
            summary: null,
            landingPages: [],
            aiAssistants: {
                summary: null,
                sources: [],
            },
            notes: ['Google AI Overviews / AI Mode 目前仍算在 Organic Search；GA4 可單獨切出的 AI 流量是可辨識的 AI Assistants referrer。'],
            error: null,
        },
        alertSent: true,
    });

    assert.deepEqual(payload, {
        success: true,
        healthy: false,
        timestamp: '2026/5/12 上午10:00:00',
        elapsed: '4.2s',
        pages: [
            {
                name: '首頁',
                path: '/',
                status: 200,
                jsonLd: true,
                issues: [],
            },
            {
                name: '查詢空房',
                path: '/book',
                status: 500,
                jsonLd: false,
                issues: ['title missing', 'json-ld missing'],
            },
        ],
        sitemap: {
            ok: true,
            pageCount: 42,
        },
        robots: true,
        ranking: {
            totalClicks: 12,
            totalImpressions: 180,
            avgPosition: 9.4,
            avgCtr: 0.067,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
        },
        rankingError: 'gsc timeout',
        ga4: {
            measurementId: 'G-LKVWPNVH5M',
            siteTagDetected: true,
            propertyIdConfigured: false,
            oauthConfigured: true,
            dataApiStatus: 'missing_config',
            date: null,
            summary: null,
            landingPages: [],
            aiAssistants: {
                summary: null,
                sources: [],
            },
            notes: ['Google AI Overviews / AI Mode 目前仍算在 Organic Search；GA4 可單獨切出的 AI 流量是可辨識的 AI Assistants referrer。'],
            error: null,
        },
        alertSent: true,
    });

    console.log('✅ SEO health route payload tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
