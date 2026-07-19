import assert from 'node:assert/strict';

import { crawlSitemapHealth, type SeoFetch } from '@/modules/seo/domain/seo-page-health';

const productionOrigin = 'https://www.hello-stay.com';
const localOrigin = (process.env.SEO_CRAWL_BASE_URL || 'http://127.0.0.1:3012').replace(/\/$/, '');

const mappedFetch: SeoFetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const original = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const url = new URL(original);
    if (url.origin === productionOrigin) {
        url.protocol = new URL(localOrigin).protocol;
        url.host = new URL(localOrigin).host;
    }
    return fetch(url, init);
}) as SeoFetch;

async function main() {
    const health = await crawlSitemapHealth(productionOrigin, mappedFetch);
    const critical = health.issues.filter((issue) => issue.severity === 'critical');
    const warnings = health.issues.filter((issue) => issue.severity === 'warning');
    const opportunities = health.issues.filter((issue) => issue.severity === 'opportunity');

    console.log(`SEO crawl: ${health.pages.length} pages / ${critical.length} critical / ${warnings.length} warning / ${opportunities.length} opportunity`);
    const warningCounts = warnings.reduce<Record<string, number>>((counts, issue) => {
        counts[issue.code] = (counts[issue.code] || 0) + 1;
        return counts;
    }, {});
    console.log('Warning summary:', warningCounts);
    for (const issue of warnings.slice(0, 20)) console.warn(`WARNING ${issue.path} [${issue.code}] ${issue.message}`);
    for (const issue of critical) console.error(`CRITICAL ${issue.path} [${issue.code}] ${issue.message}`);

    assert.equal(health.sitemap.ok, true, 'sitemap.xml should parse');
    assert.equal(health.pages.length, health.sitemap.pageCount, 'all sitemap URLs should be crawled');
    assert.deepEqual(critical, [], 'local production crawl has critical SEO issues');

    const legacy = await mappedFetch(`${productionOrigin}/blog/kaohsiung-concert-accommodation`, { redirect: 'manual' });
    assert.ok([301, 308].includes(legacy.status), `legacy concert URL should be permanent redirect, got ${legacy.status}`);
    assert.equal(legacy.headers.get('location'), '/blog/kaohsiung-arena-accommodation');

    const arena = await mappedFetch(`${productionOrigin}/blog/kaohsiung-arena-accommodation`);
    assert.equal(arena.status, 200);
    const arenaHtml = await arena.text();
    assert.match(arenaHtml, /高雄巨蛋／世運主場館住宿怎麼選/);
    assert.doesNotMatch(arenaHtml, /世運在鳳山/);

    console.log('✅ 本機 production sitemap crawl 通過');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
