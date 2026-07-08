import assert from 'node:assert/strict';
import {
    isForceAlertSend,
    resolveSeoAlertDispatch,
    resolveSeoTriggerSource,
} from '@/modules/seo/application/seo-alert-delivery';

async function main() {
    const explicitSourceRequest = new Request('https://example.com/api/cron/seo-health', {
        headers: {
            'x-seo-trigger-source': 'manual-smoke',
        },
    });
    assert.equal(resolveSeoTriggerSource(explicitSourceRequest), 'manual-smoke');

    const vercelRequest = new Request('https://example.com/api/cron/seo-health', {
        headers: {
            'x-vercel-cron': '1',
        },
    });
    assert.equal(resolveSeoTriggerSource(vercelRequest), 'vercel-cron');

    const forceHeaderRequest = new Request('https://example.com/api/cron/seo-health', {
        headers: {
            'x-seo-force-send': 'true',
        },
    });
    assert.equal(isForceAlertSend(forceHeaderRequest), true);

    const forceQueryRequest = new Request('https://example.com/api/cron/seo-health?force=1');
    assert.equal(isForceAlertSend(forceQueryRequest), true);

    assert.deepEqual(
        resolveSeoAlertDispatch({
            lastAlertAt: '2026-06-19T01:00:00.000Z',
            nowIso: '2026-06-19T08:00:00.000Z',
            forceSend: false,
        }),
        {
            shouldSend: false,
            alertSuppressed: true,
            reason: 'already_sent_today',
        }
    );

    assert.deepEqual(
        resolveSeoAlertDispatch({
            lastAlertAt: '2026-06-19T01:00:00.000Z',
            nowIso: '2026-06-19T08:00:00.000Z',
            forceSend: true,
        }),
        {
            shouldSend: true,
            alertSuppressed: false,
            reason: null,
        }
    );

    console.log('✅ SEO alert delivery tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
