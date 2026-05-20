import assert from 'node:assert/strict';
import { extractPageSpeedCategoryScores, fetchPageSpeedReport } from '@/modules/seo/infrastructure/seo-pagespeed';

async function main() {
    const categories = extractPageSpeedCategoryScores({
        performance: { score: 0.91 },
        accessibility: { score: 0.82 },
        'best-practices': { score: 0.49 },
        seo: { score: 1 },
    });
    assert.deepEqual(categories, { perf: 91, a11y: 82, bp: 49, seo: 100 });

    let calls = 0;
    const fetchMock: typeof fetch = (async (input) => {
        const url = String(input);
        calls += 1;

        if (url.includes('strategy=mobile')) {
            return {
                json: async () => ({
                    lighthouseResult: {
                        categories: {
                            performance: { score: 0.95 },
                            accessibility: { score: 0.84 },
                            'best-practices': { score: 0.76 },
                            seo: { score: 0.99 },
                        },
                    },
                }),
            } as Response;
        }

        return {
            json: async () => ({ error: { message: 'quota exceeded' } }),
        } as Response;
    }) as typeof fetch;

    const report = await fetchPageSpeedReport('https://ruins.hello-stay.com/zh/', fetchMock);
    assert.equal(calls, 2);
    assert.deepEqual(report, {
        mobile: { perf: 95, a11y: 84, bp: 76, seo: 99 },
        desktop: null,
    });

    const throwFetchMock: typeof fetch = (async () => {
        throw new Error('network down');
    }) as typeof fetch;
    const fallback = await fetchPageSpeedReport('https://ruins.hello-stay.com/zh/', throwFetchMock);
    assert.deepEqual(fallback, { mobile: null, desktop: null });

    console.log('✅ SEO PageSpeed tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
