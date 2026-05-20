import { NextResponse } from 'next/server';
import connectToDatabase from '@/modules/seo/infrastructure/seo-mongodb';
import { fetchGSCData, saveSnapshot, getSnapshot, fetchBlogTraffic, buildBlogRankingReport } from '@/modules/seo/infrastructure/seo-ranking';
import {
    exchangeRefreshTokenForAccessToken,
    fetchGa4AiAssistantSources,
    fetchGa4AiAssistantSummary,
    fetchGa4OrganicLandingPages,
    fetchGa4OrganicSummary,
    inspectGa4MeasurementTag,
} from '@/modules/seo/infrastructure/seo-ga4';
import { buildSeoRankingSection } from '@/modules/seo/application/seo-health-shared';
import { checkRobotsTxt, checkSitemapXml, inspectPageMetadata, type PageMetadataCheck } from '@/modules/seo/domain/seo-page-health';
import { buildSeoHealthRouteErrorPayload, buildSeoHealthRoutePayload } from '@/modules/seo/application/seo-health-route-payload';
import { appendOptionalReportSection, buildMainSeoHealthOpsState } from '@/modules/seo/application/seo-ops-service';
import { buildElapsedSection, buildMainGa4Section, buildMainSeoHealthIntro } from '@/modules/seo/domain/seo-report-formatters';
import { defaultSeoRouteRuntime } from '@/modules/seo/application/seo-route-runtime';

const SITE_URL = 'https://www.hello-stay.com';
const GA4_MEASUREMENT_ID = 'G-N2LV3SSTPF';
const GA4_PROPERTY_ID_HEADER = 'x-seo-ga4-property-id';
const GOOGLE_OAUTH_CLIENT_ID_HEADER = 'x-seo-google-oauth-client-id';
const GOOGLE_OAUTH_CLIENT_SECRET_HEADER = 'x-seo-google-oauth-client-secret';
const GOOGLE_OAUTH_REFRESH_TOKEN_HEADER = 'x-seo-google-oauth-refresh-token';
const GA4_AI_TRAFFIC_NOTE = 'Google AI Overviews / AI Mode 目前仍算在 Organic Search；GA4 可單獨切出的 AI 流量是可辨識的 AI Assistants referrer。';

const PAGES = [
    { path: '/', name: '首頁' },
    { path: '/hellohouse', name: '你好哇寓所' },
    { path: '/godin', name: '溝頂民宿' },
    { path: '/dazhi', name: '大智若愚' },
    { path: '/book', name: '查詢空房' },
    { path: '/agreement', name: '入住須知' },
    { path: '/traffic', name: '交通停車' },
    { path: '/explore', name: '周邊探索' },
    { path: '/packages', name: '包棟方案' },
];

export async function GET(request: Request) {
    const unauthorizedResponse = await defaultSeoRouteRuntime.authorizer.authorize(request);
    if (unauthorizedResponse && process.env.NODE_ENV === 'production') {
        return unauthorizedResponse;
    }

    try {
        const startTime = Date.now();

        const [pageResults, sitemapResult, robotsOk] = await Promise.all([
            Promise.all(PAGES.map((page) => inspectPageMetadata(SITE_URL, page.path, page.name))),
            checkSitemapXml(SITE_URL),
            checkRobotsTxt(SITE_URL),
        ]);

        const totalPages = pageResults.length;
        const pagesWithJsonLd = pageResults.filter((page) => page.hasJsonLd).length;
        const pagesWithIssues = pageResults.filter((page) => page.issues.length > 0);
        const ga4PropertyId = request.headers.get(GA4_PROPERTY_ID_HEADER) || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || '';
        const ga4OauthClientId = request.headers.get(GOOGLE_OAUTH_CLIENT_ID_HEADER) || process.env.GOOGLE_OAUTH_CLIENT_ID || '';
        const ga4OauthClientSecret = request.headers.get(GOOGLE_OAUTH_CLIENT_SECRET_HEADER) || process.env.GOOGLE_OAUTH_CLIENT_SECRET || '';
        const ga4OauthRefreshToken = request.headers.get(GOOGLE_OAUTH_REFRESH_TOKEN_HEADER) || process.env.GOOGLE_OAUTH_REFRESH_TOKEN || '';
        const ga4PropertyIdConfigured = !!ga4PropertyId;
        const ga4OauthConfigured = !!(ga4OauthClientId && ga4OauthClientSecret && ga4OauthRefreshToken);
        const ga4Date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        let report = buildMainSeoHealthIntro({
            timestamp: now,
            robotsOk,
            sitemap: sitemapResult,
            pagesWithJsonLd,
            totalPages,
            pagesWithIssues,
        });

        let ga4SiteTagDetected = false;
        let ga4SiteTagError: string | null = null;
        try {
            ga4SiteTagDetected = await inspectGa4MeasurementTag({
                siteUrl: SITE_URL,
                measurementId: GA4_MEASUREMENT_ID,
            });
        } catch (error) {
            ga4SiteTagError = error instanceof Error ? error.message : String(error);
            console.error('[SEO] GA4 site tag error:', ga4SiteTagError);
        }

        let ga4DataApiStatus: 'configured' | 'missing_config' | 'error' = 'missing_config';
        let ga4Summary = null;
        let ga4LandingPages: Array<{ page: string; sessions: number; users: number }> = [];
        let ga4AiAssistantsSummary = null;
        let ga4AiSources: Array<{ source: string; sessions: number; users: number; pageviews: number }> = [];
        let ga4Error: string | null = null;

        if (ga4PropertyIdConfigured && ga4OauthConfigured) {
            try {
                const { accessToken } = await exchangeRefreshTokenForAccessToken({
                    clientId: ga4OauthClientId,
                    clientSecret: ga4OauthClientSecret,
                    refreshToken: ga4OauthRefreshToken,
                });
                const [summary, landingPages, aiAssistantsSummary, aiSources] = await Promise.all([
                    fetchGa4OrganicSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        date: ga4Date,
                    }),
                    fetchGa4OrganicLandingPages({
                        propertyId: ga4PropertyId,
                        accessToken,
                        date: ga4Date,
                    }),
                    fetchGa4AiAssistantSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        date: ga4Date,
                    }),
                    fetchGa4AiAssistantSources({
                        propertyId: ga4PropertyId,
                        accessToken,
                        date: ga4Date,
                    }),
                ]);
                ga4Summary = summary;
                ga4LandingPages = landingPages;
                ga4AiAssistantsSummary = aiAssistantsSummary;
                ga4AiSources = aiSources;
                ga4DataApiStatus = 'configured';
            } catch (error) {
                ga4DataApiStatus = 'error';
                ga4Error = error instanceof Error ? error.message : String(error);
                console.error('[SEO] GA4 data API error:', ga4Error);
            }
        }

        report += buildMainGa4Section({
            measurementId: GA4_MEASUREMENT_ID,
            siteTagDetected: ga4SiteTagDetected,
            propertyIdConfigured: ga4PropertyIdConfigured,
            oauthConfigured: ga4OauthConfigured,
            dataApiStatus: ga4DataApiStatus,
            dataDate: ga4DataApiStatus === 'configured' ? ga4Date : null,
            summary: ga4Summary,
            landingPages: ga4LandingPages,
            aiAssistantsSummary: ga4AiAssistantsSummary,
            aiSources: ga4AiSources,
            siteTagError: ga4SiteTagError,
            dataApiError: ga4Error,
        });

        // ── Part 2: GSC 排名追蹤 ──────────────────────────
        const rankingSection = await buildSeoRankingSection({
            connect: connectToDatabase,
            fetchData: fetchGSCData,
            saveSnapshot,
            getSnapshot,
            errorPrefix: '[SEO]',
        });
        report += rankingSection.report;
        const { rankingData, rankingError } = rankingSection;

        // ── Part 3: 部落格文章流量排行 ─────────────────────
        report += await appendOptionalReportSection({
            fetchData: fetchBlogTraffic,
            buildReport: buildBlogRankingReport,
            logPrefix: '[SEO] Blog traffic error:',
        });

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        report += buildElapsedSection(elapsed);

        const alertSent = await defaultSeoRouteRuntime.notifier.notifyMain(report);
        const nowIso = new Date().toISOString();
        const state = buildMainSeoHealthOpsState({
            nowIso,
            alertSent,
            pagesWithIssues,
            totalPages,
            pagesWithJsonLd,
            robotsOk,
            sitemap: sitemapResult,
            rankingError,
            ga4SiteTagDetected,
            ga4DataApiStatus,
        });
        const healthy = !!state.healthy;
        await defaultSeoRouteRuntime.opsStateStore.persistMain(state);

        return NextResponse.json(buildSeoHealthRoutePayload({
            success: true,
            healthy,
            timestamp: now,
            elapsed: `${elapsed}s`,
            pages: pageResults.map((page: PageMetadataCheck) => ({ name: page.name, path: page.path, status: page.status, jsonLd: page.hasJsonLd, issues: page.issues })),
            sitemap: sitemapResult,
            robots: robotsOk,
            ranking: rankingData,
            rankingError,
            ga4: {
                measurementId: GA4_MEASUREMENT_ID,
                siteTagDetected: ga4SiteTagDetected,
                propertyIdConfigured: ga4PropertyIdConfigured,
                oauthConfigured: ga4OauthConfigured,
                dataApiStatus: ga4DataApiStatus,
                date: ga4DataApiStatus === 'configured' ? ga4Date : null,
                summary: ga4Summary,
                landingPages: ga4LandingPages,
                aiAssistants: {
                    summary: ga4AiAssistantsSummary,
                    sources: ga4AiSources,
                },
                notes: [GA4_AI_TRAFFIC_NOTE],
                error: ga4Error,
            },
            alertSent,
        }));
    } catch (error) {
        console.error('[Cron] seo-health error:', error);
        return NextResponse.json(buildSeoHealthRouteErrorPayload(), { status: 500 });
    }
}
