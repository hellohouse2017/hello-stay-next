import assert from 'node:assert/strict';
import {
    exchangeRefreshTokenForAccessToken,
    fetchGa4AiAssistantSources,
    fetchGa4AiAssistantSummary,
    fetchGa4OrganicLandingPages,
    fetchGa4OrganicSummary,
    inspectGa4MeasurementTag,
} from '@/modules/seo/infrastructure/seo-ga4';

async function main() {
    const summary = await fetchGa4OrganicSummary({
        propertyId: '123456',
        accessToken: 'token',
        date: '2026-05-11',
        fetchImpl: async (input, init) => {
            assert.match(String(input), /properties\/123456:runReport/);
            assert.match(String(init?.headers && (init.headers as Record<string, string>).Authorization), /^Bearer token$/);
            const body = JSON.parse(String(init?.body));
            assert.deepEqual(body.metrics, [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }]);
            return new Response(JSON.stringify({
                rows: [
                    {
                        metricValues: [{ value: '42' }, { value: '30' }, { value: '99' }],
                    },
                ],
            }), { status: 200 });
        },
    });
    assert.deepEqual(summary, { sessions: 42, users: 30, pageviews: 99 });

    const landingPages = await fetchGa4OrganicLandingPages({
        propertyId: '123456',
        accessToken: 'token',
        date: '2026-05-11',
        fetchImpl: async (_input, init) => {
            const body = JSON.parse(String(init?.body));
            assert.deepEqual(body.dimensions, [{ name: 'landingPagePlusQueryString' }]);
            return new Response(JSON.stringify({
                rows: [
                    {
                        dimensionValues: [{ value: '/blog/post-a' }],
                        metricValues: [{ value: '20' }, { value: '15' }],
                    },
                    {
                        dimensionValues: [{ value: '(not set)' }],
                        metricValues: [{ value: '9' }, { value: '7' }],
                    },
                ],
            }), { status: 200 });
        },
    });
    assert.deepEqual(landingPages, [
        { page: '/blog/post-a', sessions: 20, users: 15 },
    ]);

    const aiSummary = await fetchGa4AiAssistantSummary({
        propertyId: '123456',
        accessToken: 'token',
        date: '2026-05-11',
        fetchImpl: async (_input, init) => {
            const body = JSON.parse(String(init?.body));
            assert.equal(body.dimensionFilter.filter.fieldName, 'sessionMedium');
            assert.equal(body.dimensionFilter.filter.stringFilter.value, 'ai-assistant');
            return new Response(JSON.stringify({
                rows: [
                    {
                        metricValues: [{ value: '6' }, { value: '5' }, { value: '12' }],
                    },
                ],
            }), { status: 200 });
        },
    });
    assert.deepEqual(aiSummary, { sessions: 6, users: 5, pageviews: 12 });

    const aiSources = await fetchGa4AiAssistantSources({
        propertyId: '123456',
        accessToken: 'token',
        date: '2026-05-11',
        fetchImpl: async (_input, init) => {
            const body = JSON.parse(String(init?.body));
            assert.deepEqual(body.dimensions, [{ name: 'sessionSource' }]);
            assert.equal(body.dimensionFilter.filter.fieldName, 'sessionMedium');
            return new Response(JSON.stringify({
                rows: [
                    {
                        dimensionValues: [{ value: 'chatgpt.com' }],
                        metricValues: [{ value: '4' }, { value: '3' }, { value: '8' }],
                    },
                    {
                        dimensionValues: [{ value: '(not set)' }],
                        metricValues: [{ value: '2' }, { value: '2' }, { value: '3' }],
                    },
                ],
            }), { status: 200 });
        },
    });
    assert.deepEqual(aiSources, [
        { source: 'chatgpt.com', sessions: 4, users: 3, pageviews: 8 },
    ]);

    await assert.rejects(
        () => fetchGa4OrganicSummary({
            propertyId: '123456',
            accessToken: 'token',
            date: '2026-05-11',
            fetchImpl: async () => new Response('quota exceeded', { status: 429 }),
        }),
        /GA4 summary 429: quota exceeded/
    );

    const emptySummary = await fetchGa4OrganicSummary({
        propertyId: '123456',
        accessToken: 'token',
        date: '2026-05-11',
        fetchImpl: async () => new Response(JSON.stringify({ rows: [] }), { status: 200 }),
    });
    assert.deepEqual(emptySummary, { sessions: 0, users: 0, pageviews: 0 });

    const refreshedToken = await exchangeRefreshTokenForAccessToken({
        clientId: 'cid',
        clientSecret: 'secret',
        refreshToken: 'refresh',
        fetchImpl: async (input, init) => {
            assert.equal(String(input), 'https://oauth2.googleapis.com/token');
            assert.equal(init?.method, 'POST');
            assert.match(String(init?.body), /client_id=cid/);
            assert.match(String(init?.body), /grant_type=refresh_token/);
            return new Response(JSON.stringify({
                access_token: 'new-token',
                expires_in: 3600,
                scope: 'scope-a scope-b',
                token_type: 'Bearer',
            }), { status: 200 });
        },
    });
    assert.deepEqual(refreshedToken, {
        accessToken: 'new-token',
        expiresIn: 3600,
        scope: 'scope-a scope-b',
        tokenType: 'Bearer',
    });

    await assert.rejects(
        () => exchangeRefreshTokenForAccessToken({
            clientId: 'cid',
            clientSecret: 'secret',
            refreshToken: 'refresh',
            fetchImpl: async () => new Response(JSON.stringify({
                error: 'invalid_grant',
                error_description: 'Bad Request',
            }), { status: 400 }),
        }),
        /Google OAuth token 400: Bad Request/
    );

    const siteTagDetected = await inspectGa4MeasurementTag({
        siteUrl: 'https://www.hello-stay.com',
        measurementId: 'G-LKVWPNVH5M',
        fetchImpl: async () => new Response(
            '<script src="https://www.googletagmanager.com/gtag/js?id=G-LKVWPNVH5M"></script><script>gtag(\'config\', \'G-LKVWPNVH5M\');</script>',
            { status: 200 }
        ),
    });
    assert.equal(siteTagDetected, true);

    const siteTagMissing = await inspectGa4MeasurementTag({
        siteUrl: 'https://www.hello-stay.com',
        measurementId: 'G-LKVWPNVH5M',
        fetchImpl: async () => new Response('<html><body>no tag</body></html>', { status: 200 }),
    });
    assert.equal(siteTagMissing, false);

    await assert.rejects(
        () => inspectGa4MeasurementTag({
            siteUrl: 'https://www.hello-stay.com',
            measurementId: 'G-LKVWPNVH5M',
            fetchImpl: async () => new Response('down', { status: 503 }),
        }),
        /GA4 site tag 503: down/
    );

    console.log('✅ SEO GA4 helper tests passed');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
