import assert from 'node:assert/strict';
import { buildRuinsSeoHealthRouteErrorPayload } from '@/modules/seo/application/seo-health-ruins-route-payload';

async function main() {
    assert.deepEqual(buildRuinsSeoHealthRouteErrorPayload(), {
        error: 'Ruins SEO health check failed',
        source: 'seo-health-ruins',
    });

    console.log('✅ Ruins SEO health route error payload tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
