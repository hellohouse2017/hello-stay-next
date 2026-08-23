import assert from 'node:assert/strict';
import { load } from 'cheerio';

import { crawlSitemapHealth, type SeoFetch } from '@/modules/seo/domain/seo-page-health';

const productionOrigin = 'https://www.hello-stay.com';
const localOrigin = (process.env.SEO_CRAWL_BASE_URL || 'http://127.0.0.1:3012').replace(/\/$/, '');

const TARGET_LANDING_PATHS = [
    '/',
    '/compare',
    '/kaohsiung-whole-house',
    '/explore/food',
    '/blog/kaohsiung-arena-accommodation',
    '/blog/kaohsiung-10-person-stay',
] as const;

type JsonLdNode = Record<string, unknown>;

function normalizeText(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
}

function getJsonLdNodes(html: string): JsonLdNode[] {
    const $ = load(html);
    const nodes: JsonLdNode[] = [];

    $('script[type="application/ld+json"]').each((_, element) => {
        const raw = $(element).text();
        if (!raw) return;

        const value = JSON.parse(raw) as unknown;
        const values = Array.isArray(value) ? value : [value];
        for (const item of values) {
            if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
            const node = item as JsonLdNode;
            nodes.push(node);
            if (Array.isArray(node['@graph'])) {
                nodes.push(...node['@graph'].filter((child): child is JsonLdNode => Boolean(child) && typeof child === 'object' && !Array.isArray(child)));
            }
        }
    });

    return nodes;
}

async function verifyLandingPage(path: string) {
    const response = await mappedFetch(`${productionOrigin}${path}`);
    assert.equal(response.status, 200, `${path} should return 200`);

    const html = await response.text();
    const $ = load(html);
    assert.equal($('h1').length, 1, `${path} should render exactly one H1`);

    const canonical = $('link[rel="canonical"]').attr('href');
    assert.ok(canonical, `${path} should render a canonical URL`);
    const canonicalUrl = new URL(canonical);
    assert.equal(canonicalUrl.origin, productionOrigin, `${path} canonical should use the production origin`);
    assert.equal(canonicalUrl.pathname.replace(/\/$/, '') || '/', path, `${path} canonical path should remain unchanged`);

    const visibleText = normalizeText($('body').clone().find('script, style').remove().end().text());
    const schemas = getJsonLdNodes(html);
    const faqSchemas = schemas.filter((node) => node['@type'] === 'FAQPage');
    for (const faqSchema of faqSchemas) {
        const entities = Array.isArray(faqSchema.mainEntity) ? faqSchema.mainEntity : [];
        for (const entity of entities) {
            if (!entity || typeof entity !== 'object' || Array.isArray(entity)) continue;
            const question = entity as JsonLdNode;
            const answer = question.acceptedAnswer;
            const answerText = answer && typeof answer === 'object' && !Array.isArray(answer)
                ? (answer as JsonLdNode).text
                : undefined;
            assert.equal(typeof question.name, 'string', `${path} FAQ question should have text`);
            assert.equal(typeof answerText, 'string', `${path} FAQ answer should have text`);
            assert.ok(visibleText.includes(normalizeText(question.name as string)), `${path} FAQ question should be visible: ${question.name}`);
            assert.ok(visibleText.includes(normalizeText(answerText as string)), `${path} FAQ answer should be visible: ${question.name}`);
        }
    }

    if (path === '/explore/food') {
        const foodList = schemas.find((node) => node['@type'] === 'ItemList' && typeof node.numberOfItems === 'number');
        assert.ok(foodList, 'food page should expose an ItemList with a numeric item count');
        const itemCount = Array.isArray(foodList.itemListElement) ? foodList.itemListElement.length : 0;
        assert.equal(itemCount, foodList.numberOfItems, 'food ItemList count should match its itemListElement length');
        assert.ok(itemCount > 0, 'food ItemList should contain at least one restaurant');
        assert.equal($('.local-guide-stay-bridge').length, 1, 'food page should expose a mid-content stay bridge');
        assert.ok($('.local-guide-stay-bridge a[href="/book"]').length > 0, 'food page stay bridge should link to booking');
    }

    if (path === '/blog/kaohsiung-10-person-stay') {
        const stickyBooking = $('.guide-mobile-booking-bar a[href*="/book?guestCount=10"]');
        assert.equal(stickyBooking.length, 1, '10-person article should expose a headcount-aware mobile booking CTA');
        assert.equal(stickyBooking.attr('data-cta-position'), 'sticky_mobile', 'mobile booking CTA should expose its position');
    }
}

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

    for (const path of TARGET_LANDING_PATHS) {
        await verifyLandingPage(path);
    }

    const legacy = await mappedFetch(`${productionOrigin}/blog/kaohsiung-concert-accommodation`, { redirect: 'manual' });
    assert.ok([301, 308].includes(legacy.status), `legacy concert URL should be permanent redirect, got ${legacy.status}`);
    assert.equal(legacy.headers.get('location'), '/blog/kaohsiung-arena-accommodation');

    const arena = await mappedFetch(`${productionOrigin}/blog/kaohsiung-arena-accommodation`);
    assert.equal(arena.status, 200);
    const arenaHtml = await arena.text();
    assert.match(arenaHtml, /高雄世運住宿／高雄巨蛋住宿/);
    assert.doesNotMatch(arenaHtml, /世運在鳳山/);

    console.log('✅ 本機 production sitemap crawl 通過');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
