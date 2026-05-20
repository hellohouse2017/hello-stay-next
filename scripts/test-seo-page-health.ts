import assert from 'node:assert/strict';
import {
    checkJsonLdCoverage,
    checkLlmsTxt,
    checkRobotsTxt,
    checkSitemapXml,
    inspectPageMetadata,
    type SeoFetch,
} from '@/modules/seo/domain/seo-page-health';

function createFetchStub(map: Record<string, { ok: boolean; status?: number; body: string }>): SeoFetch {
    return (async (input: string | URL | Request) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
        const hit = map[url];
        if (!hit) {
            throw new Error(`Unexpected URL: ${url}`);
        }
        return new Response(hit.body, { status: hit.status ?? (hit.ok ? 200 : 500) });
    }) as SeoFetch;
}

async function main() {
    const siteUrl = 'https://example.com';
    const fetchStub = createFetchStub({
        [`${siteUrl}/robots.txt`]: { ok: true, body: 'User-agent: *' },
        [`${siteUrl}/sitemap.xml`]: { ok: true, body: '<urlset><url></url><url></url></urlset>' },
        [`${siteUrl}/llms.txt`]: { ok: true, body: 'a'.repeat(120) },
        [`${siteUrl}/ok`]: {
            ok: true,
            body: '<html><head><title>這是一個足夠長而且明確超過二十字的標題用於測試 metadata 規則</title><meta name="description" content="這是一段足夠長的 description 內容，用來驗證 metadata 檢查邏輯是否能正確辨識長度與存在性，而且應該會明確超過八十字元下限，並且再多補一些字數避免邊界誤差。"><meta property="og:title" content="og" /><script type="application/ld+json">{}</script></head></html>',
        },
        [`${siteUrl}/bad`]: {
            ok: true,
            body: '<html><head><title>短</title></head></html>',
        },
        [`${siteUrl}/zh`]: { ok: true, body: '<script type="application/ld+json">{}</script>' },
        [`${siteUrl}/en`]: { ok: true, body: '<html></html>' },
    });

    assert.equal(await checkRobotsTxt(siteUrl, fetchStub), true);
    assert.deepEqual(await checkSitemapXml(siteUrl, fetchStub), { ok: true, pageCount: 2 });
    assert.deepEqual(await checkLlmsTxt(siteUrl, fetchStub), { ok: true, msg: '✅ llms.txt (AI 搜尋優化)' });

    const goodPage = await inspectPageMetadata(siteUrl, '/ok', 'OK', fetchStub);
    assert.equal(goodPage.issues.length, 0);
    assert.equal(goodPage.hasJsonLd, true);

    const badPage = await inspectPageMetadata(siteUrl, '/bad', 'BAD', fetchStub);
    assert.equal(badPage.hasDescription, false);
    assert.match(badPage.issues.join('\n'), /缺少 meta description/);
    assert.match(badPage.issues.join('\n'), /缺少 JSON-LD/);
    assert.match(badPage.issues.join('\n'), /缺少 OG tags/);

    assert.deepEqual(
        await checkJsonLdCoverage(siteUrl, ['/zh', '/en'], fetchStub),
        { ok: false, okCount: 1, total: 2 }
    );

    console.log('✅ SEO page health tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
