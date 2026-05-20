import assert from 'node:assert/strict';
import { buildSeoHealthRouteErrorPayload } from '@/modules/seo/application/seo-health-route-payload';

async function main() {
    assert.deepEqual(buildSeoHealthRouteErrorPayload(), {
        error: 'SEO health check failed',
        source: 'seo-health',
    });

    console.log('✅ SEO health route error payload tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
