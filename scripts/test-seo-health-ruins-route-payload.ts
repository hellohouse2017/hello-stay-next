import assert from 'node:assert/strict';
import { buildRuinsSeoHealthRoutePayload } from '@/modules/seo/application/seo-health-ruins-route-payload';

async function main() {
    const payload = buildRuinsSeoHealthRoutePayload({
        success: true,
        healthy: true,
        timestamp: '2026/5/12 上午10:05:00',
        elapsed: '6.0s',
        sitemap: {
            ok: true,
            pageCount: 18,
        },
        robots: true,
        llms: true,
        jsonld: {
            ok: true,
            okCount: 5,
            total: 5,
        },
        pageSpeed: {
            mobile: { perf: 72, a11y: 91, bp: 88, seo: 95 },
            desktop: { perf: 95, a11y: 97, bp: 93, seo: 100 },
        },
        ranking: {
            totalClicks: 7,
            totalImpressions: 95,
            avgPosition: 11.3,
            avgCtr: 0.074,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
        },
        rankingError: null,
        alertSent: false,
        alertSuppressed: true,
        triggerSource: 'vercel-cron',
        forceSend: false,
        previousAlertAt: '2026-05-12T00:30:00.000Z',
    });

    assert.deepEqual(payload, {
        success: true,
        healthy: true,
        timestamp: '2026/5/12 上午10:05:00',
        elapsed: '6.0s',
        sitemap: {
            ok: true,
            pageCount: 18,
        },
        robots: true,
        llms: true,
        jsonld: {
            ok: true,
            okCount: 5,
            total: 5,
        },
        pageSpeed: {
            mobile: { perf: 72, a11y: 91, bp: 88, seo: 95 },
            desktop: { perf: 95, a11y: 97, bp: 93, seo: 100 },
        },
        ranking: {
            totalClicks: 7,
            totalImpressions: 95,
            avgPosition: 11.3,
            avgCtr: 0.074,
            topQueries: [],
            targetKeywords: [],
            topPages: [],
        },
        rankingError: null,
        alertSent: false,
        alertSuppressed: true,
        triggerSource: 'vercel-cron',
        forceSend: false,
        previousAlertAt: '2026-05-12T00:30:00.000Z',
    });

    console.log('✅ Ruins SEO health route payload tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
