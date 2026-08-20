import { AI_ASSISTANT_MEDIUM } from '@/lib/ai-assistant-referrers';

export interface Ga4TrafficSummary {
    sessions: number;
    users: number;
    pageviews: number;
}

export type Ga4OrganicSummary = Ga4TrafficSummary;
export type Ga4AiAssistantSummary = Ga4TrafficSummary;

export interface Ga4OrganicLandingPage {
    page: string;
    sessions: number;
    users: number;
}

export interface SeoLandingConversion extends Ga4OrganicLandingPage {
    bookingClicks: number;
    lineClicks: number;
    phoneClicks: number;
    conversionUsers: number;
    clickRate: number;
}

export interface Ga4AiLandingPage extends Ga4OrganicLandingPage {
    pageviews: number;
}

export interface Ga4TrafficSource {
    source: string;
    sessions: number;
    users: number;
    pageviews: number;
}

export interface GoogleOAuthAccessToken {
    accessToken: string;
    expiresIn: number;
    scope: string;
    tokenType: string;
}

type Ga4RunReportResponse = {
    rows?: Array<{
        dimensionValues?: Array<{ value?: string }>;
        metricValues?: Array<{ value?: string }>;
    }>;
};

type GoogleRefreshTokenResponse = {
    access_token?: string;
    expires_in?: number;
    scope?: string;
    token_type?: string;
    error?: string;
    error_description?: string;
};

function buildExactStringFilter(fieldName: string, value: string) {
    return {
        filter: {
            fieldName,
            stringFilter: {
                matchType: 'EXACT',
                value,
            },
        },
    };
}

function buildInListFilter(fieldName: string, values: readonly string[]) {
    return {
        filter: {
            fieldName,
            inListFilter: {
                values: [...values],
                caseSensitive: true,
            },
        },
    };
}

function buildAndFilter(expressions: Array<Record<string, unknown>>) {
    return {
        andGroup: { expressions },
    };
}

function parseSummaryRow(row?: {
    metricValues?: Array<{ value?: string }>;
}): Ga4TrafficSummary {
    return {
        sessions: Number(row?.metricValues?.[0]?.value || 0),
        users: Number(row?.metricValues?.[1]?.value || 0),
        pageviews: Number(row?.metricValues?.[2]?.value || 0),
    };
}

type Ga4DateOptions = {
    date?: string;
    startDate?: string;
    endDate?: string;
};

function resolveDateRange(options: Ga4DateOptions) {
    const startDate = options.startDate || options.date;
    const endDate = options.endDate || options.date;
    if (!startDate || !endDate) throw new Error('GA4 date range is required');
    return { startDate, endDate };
}

async function runGa4Report(options: {
    propertyId: string;
    accessToken: string;
    body: Record<string, unknown>;
    label: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4RunReportResponse> {
    const { propertyId, accessToken, body, label, fetchImpl = fetch } = options;
    const response = await fetchImpl(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`${label} ${response.status}: ${await response.text()}`);
    }

    return await response.json() as Ga4RunReportResponse;
}

export async function exchangeRefreshTokenForAccessToken(options: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    fetchImpl?: typeof fetch;
}): Promise<GoogleOAuthAccessToken> {
    const { clientId, clientSecret, refreshToken, fetchImpl = fetch } = options;
    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    });

    const response = await fetchImpl('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });

    const payload = await response.json() as GoogleRefreshTokenResponse;

    if (!response.ok || !payload.access_token) {
        const details = payload.error_description || payload.error || JSON.stringify(payload);
        throw new Error(`Google OAuth token ${response.status}: ${details}`);
    }

    return {
        accessToken: payload.access_token,
        expiresIn: Number(payload.expires_in || 0),
        scope: payload.scope || '',
        tokenType: payload.token_type || 'Bearer',
    };
}

export async function inspectGa4MeasurementTag(options: {
    siteUrl: string;
    measurementId: string;
    fetchImpl?: typeof fetch;
}): Promise<boolean> {
    const { siteUrl, measurementId, fetchImpl = fetch } = options;
    const response = await fetchImpl(siteUrl, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`GA4 site tag ${response.status}: ${await response.text()}`);
    }

    const html = await response.text();
    const hasScriptTag = html.includes(`googletagmanager.com/gtag/js?id=${measurementId}`);
    const escapedMeasurementId = measurementId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hasConfigCall = new RegExp(
        `gtag\\(\\s*['"]config['"]\\s*,\\s*['"]${escapedMeasurementId}['"]\\s*(?:,|\\))`
    ).test(html.replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"').replace(/\\\\'/g, "'"));

    return hasScriptTag && hasConfigCall;
}

async function fetchGa4TrafficSummary(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    label: string;
    dimensionName: string;
    filterFieldName: string;
    filterValue: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4TrafficSummary> {
    const { propertyId, accessToken, label, dimensionName, filterFieldName, filterValue, fetchImpl } = options;
    const data = await runGa4Report({
        propertyId,
        accessToken,
        fetchImpl,
        label,
        body: {
            dateRanges: [resolveDateRange(options)],
            dimensions: [{ name: dimensionName }],
            metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
            dimensionFilter: buildExactStringFilter(filterFieldName, filterValue),
            limit: 10,
        },
    });

    return parseSummaryRow(data.rows?.[0]);
}

export async function fetchGa4OrganicSummary(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4OrganicSummary> {
    const { propertyId, accessToken, date, startDate, endDate, fetchImpl } = options;
    return fetchGa4TrafficSummary({
        propertyId,
        accessToken,
        date,
        startDate,
        endDate,
        fetchImpl,
        label: 'GA4 summary',
        dimensionName: 'sessionDefaultChannelGroup',
        filterFieldName: 'sessionDefaultChannelGroup',
        filterValue: 'Organic Search',
    });
}

export async function fetchGa4OrganicLandingPages(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4OrganicLandingPage[]> {
    const { propertyId, accessToken, fetchImpl } = options;
    const data = await runGa4Report({
        propertyId,
        accessToken,
        fetchImpl,
        label: 'GA4 landing',
        body: {
            dateRanges: [resolveDateRange(options)],
            dimensions: [{ name: 'landingPagePlusQueryString' }],
            metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
            dimensionFilter: buildExactStringFilter('sessionDefaultChannelGroup', 'Organic Search'),
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: 5,
        },
    });

    return (data.rows || [])
        .map((row) => ({
            page: row.dimensionValues?.[0]?.value || '(not set)',
            sessions: Number(row.metricValues?.[0]?.value || 0),
            users: Number(row.metricValues?.[1]?.value || 0),
        }))
        .filter((row) => row.page && row.page !== '(not set)');
}

export async function fetchGa4SeoLandingConversions(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<SeoLandingConversion[]> {
    const { propertyId, accessToken, fetchImpl } = options;
    const dateRanges = [resolveDateRange(options)];
    const landingPageDimension = { name: 'landingPagePlusQueryString' };
    const organicFilter = buildExactStringFilter('sessionDefaultChannelGroup', 'Organic Search');
    const conversionEvents = ['book_click', 'line_cta_click', 'phone_click'] as const;
    const conversionFilter = buildAndFilter([
        organicFilter,
        buildInListFilter('eventName', conversionEvents),
    ]);

    const [landingData, clickData, conversionUserData] = await Promise.all([
        runGa4Report({
            propertyId,
            accessToken,
            fetchImpl,
            label: 'GA4 SEO landing conversions baseline',
            body: {
                dateRanges,
                dimensions: [landingPageDimension],
                metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
                dimensionFilter: organicFilter,
                orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
                limit: 100,
            },
        }),
        runGa4Report({
            propertyId,
            accessToken,
            fetchImpl,
            label: 'GA4 SEO landing conversion clicks',
            body: {
                dateRanges,
                dimensions: [landingPageDimension, { name: 'eventName' }],
                metrics: [{ name: 'eventCount' }],
                dimensionFilter: conversionFilter,
                limit: 500,
            },
        }),
        runGa4Report({
            propertyId,
            accessToken,
            fetchImpl,
            label: 'GA4 SEO landing conversion users',
            body: {
                dateRanges,
                dimensions: [landingPageDimension],
                metrics: [{ name: 'totalUsers' }],
                dimensionFilter: conversionFilter,
                limit: 100,
            },
        }),
    ]);

    const clicksByPage = new Map<string, Pick<SeoLandingConversion, 'bookingClicks' | 'lineClicks' | 'phoneClicks'>>();
    for (const row of clickData.rows || []) {
        const page = row.dimensionValues?.[0]?.value || '';
        const eventName = row.dimensionValues?.[1]?.value || '';
        if (!page || page === '(not set)') continue;
        const clicks = clicksByPage.get(page) || { bookingClicks: 0, lineClicks: 0, phoneClicks: 0 };
        const count = Number(row.metricValues?.[0]?.value || 0);
        if (eventName === 'book_click') clicks.bookingClicks += count;
        if (eventName === 'line_cta_click') clicks.lineClicks += count;
        if (eventName === 'phone_click') clicks.phoneClicks += count;
        clicksByPage.set(page, clicks);
    }

    const conversionUsersByPage = new Map(
        (conversionUserData.rows || [])
            .map((row) => [
                row.dimensionValues?.[0]?.value || '',
                Number(row.metricValues?.[0]?.value || 0),
            ] as const)
            .filter(([page]) => page && page !== '(not set)'),
    );

    return (landingData.rows || [])
        .map((row): SeoLandingConversion | null => {
            const page = row.dimensionValues?.[0]?.value || '';
            if (!page || page === '(not set)') return null;
            const users = Number(row.metricValues?.[1]?.value || 0);
            const conversionUsers = conversionUsersByPage.get(page) || 0;
            return {
                page,
                sessions: Number(row.metricValues?.[0]?.value || 0),
                users,
                ...(clicksByPage.get(page) || { bookingClicks: 0, lineClicks: 0, phoneClicks: 0 }),
                conversionUsers,
                clickRate: users > 0 ? conversionUsers / users : 0,
            };
        })
        .filter((row): row is SeoLandingConversion => row !== null);
}

export async function fetchGa4AiAssistantSummary(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4AiAssistantSummary> {
    const { propertyId, accessToken, date, startDate, endDate, fetchImpl } = options;
    return fetchGa4TrafficSummary({
        propertyId,
        accessToken,
        date,
        startDate,
        endDate,
        fetchImpl,
        label: 'GA4 AI assistant summary',
        dimensionName: 'sessionMedium',
        filterFieldName: 'sessionMedium',
        filterValue: AI_ASSISTANT_MEDIUM,
    });
}

export async function fetchGa4AiAssistantSources(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4TrafficSource[]> {
    const { propertyId, accessToken, fetchImpl } = options;
    const data = await runGa4Report({
        propertyId,
        accessToken,
        fetchImpl,
        label: 'GA4 AI assistant sources',
        body: {
            dateRanges: [resolveDateRange(options)],
            dimensions: [{ name: 'sessionSource' }],
            metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
            dimensionFilter: buildExactStringFilter('sessionMedium', AI_ASSISTANT_MEDIUM),
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: 5,
        },
    });

    return (data.rows || [])
        .map((row) => ({
            source: row.dimensionValues?.[0]?.value || '(not set)',
            sessions: Number(row.metricValues?.[0]?.value || 0),
            users: Number(row.metricValues?.[1]?.value || 0),
            pageviews: Number(row.metricValues?.[2]?.value || 0),
        }))
        .filter((row) => row.source && row.source !== '(not set)');
}

export async function fetchGa4AiAssistantLandingPages(options: {
    propertyId: string;
    accessToken: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    fetchImpl?: typeof fetch;
}): Promise<Ga4AiLandingPage[]> {
    const { propertyId, accessToken, fetchImpl } = options;
    const data = await runGa4Report({
        propertyId,
        accessToken,
        fetchImpl,
        label: 'GA4 AI assistant landing pages',
        body: {
            dateRanges: [resolveDateRange(options)],
            dimensions: [{ name: 'landingPagePlusQueryString' }],
            metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
            dimensionFilter: buildExactStringFilter('sessionMedium', AI_ASSISTANT_MEDIUM),
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: 20,
        },
    });

    return (data.rows || [])
        .map((row) => ({
            page: row.dimensionValues?.[0]?.value || '(not set)',
            sessions: Number(row.metricValues?.[0]?.value || 0),
            users: Number(row.metricValues?.[1]?.value || 0),
            pageviews: Number(row.metricValues?.[2]?.value || 0),
        }))
        .filter((row) => row.page && row.page !== '(not set)');
}
