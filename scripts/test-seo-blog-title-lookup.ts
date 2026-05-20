import assert from 'node:assert/strict';
import { createMongoBlogTitleLookup } from '@/modules/seo/infrastructure/seo-blog-title-lookup';

async function main() {
    let connectCalls = 0;
    const loggedErrors: string[] = [];

    const lookup = createMongoBlogTitleLookup({
        connect: async () => {
            connectCalls += 1;
        },
        findTitles: async () => [
            { slug: 'kaohsiung-family-trip', title: '高雄家族旅遊住宿推薦' },
            { slug: 'yancheng-bnb', title: '鹽埕包棟民宿整理' },
        ],
    });

    const titleMap = await lookup.getTitleMap();
    assert.equal(connectCalls, 1);
    assert.equal(titleMap.get('kaohsiung-family-trip'), '高雄家族旅遊住宿推薦');
    assert.equal(titleMap.get('yancheng-bnb'), '鹽埕包棟民宿整理');

    const failingLookup = createMongoBlogTitleLookup({
        connect: async () => undefined,
        findTitles: async () => {
            throw new Error('boom');
        },
        onError: (error) => {
            loggedErrors.push(error instanceof Error ? error.message : String(error));
        },
    });

    const fallbackMap = await failingLookup.getTitleMap();
    assert.equal(fallbackMap.size, 0);
    assert.deepEqual(loggedErrors, ['boom']);

    console.log('✅ SEO blog title lookup tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
