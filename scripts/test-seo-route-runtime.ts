import assert from 'node:assert/strict';
import { createCronRequestAuthorizer, createSeoRouteRuntime } from '@/modules/seo/application/seo-route-runtime';

async function main() {
    let authorizedRequest: Request | null = null;
    const authorizer = createCronRequestAuthorizer({
        authorize: async (request) => {
            authorizedRequest = request;
            return null;
        },
    });

    const request = new Request('https://example.com/api/cron/seo-health');
    assert.equal(await authorizer.authorize(request), null);
    assert.equal(authorizedRequest, request);

    const runtime = createSeoRouteRuntime({
        authorizer,
        notifier: {
            notifyMain: async () => true,
            notifyRuins: async () => false,
        },
        opsStateStore: {
            readMain: async () => null,
            readRuins: async () => null,
            persistMain: async (state) => state,
            persistRuins: async (state) => state,
        },
    });

    assert.equal(await runtime.notifier.notifyMain('report'), true);
    assert.equal(await runtime.notifier.notifyRuins('report'), false);

    console.log('✅ SEO route runtime tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
