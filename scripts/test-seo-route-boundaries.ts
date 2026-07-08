import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
    const files = [
        path.join(process.cwd(), 'src/app/api/cron/seo-health/route.ts'),
        path.join(process.cwd(), 'src/app/api/cron/seo-health-ruins/route.ts'),
    ];

    for (const filePath of files) {
        const source = fs.readFileSync(filePath, 'utf8');
        assert.doesNotMatch(source, /cron-auth/);
        assert.doesNotMatch(source, /seo-ops-adapters/);
        assert.match(source, /defaultSeoRouteRuntime/);

        const connectIndex = source.indexOf('await connectToDatabase();');
        assert.notEqual(connectIndex, -1, `${path.basename(filePath)} should connect to Mongo before reading SEO ops state`);

        const stateReadPattern = filePath.endsWith('seo-health/route.ts')
            ? 'await defaultSeoRouteRuntime.opsStateStore.readMain();'
            : 'await defaultSeoRouteRuntime.opsStateStore.readRuins();';
        const stateReadIndex = source.indexOf(stateReadPattern);
        assert.notEqual(stateReadIndex, -1, `${path.basename(filePath)} should read SEO ops state`);
        assert.ok(connectIndex < stateReadIndex, `${path.basename(filePath)} should connect to Mongo before reading SEO ops state`);
    }

    console.log('✅ SEO route boundary tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
