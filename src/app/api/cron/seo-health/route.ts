import { NextResponse } from 'next/server';
import connectToDatabase from '@/modules/seo/infrastructure/seo-mongodb';
import { fetchGSCData, saveSnapshot, getSnapshot, fetchBlogTraffic, buildBlogRankingReport } from '@/modules/seo/infrastructure/seo-ranking';
import {
    exchangeRefreshTokenForAccessToken,
    fetchGa4AiAssistantLandingPages,
    fetchGa4AiAssistantSources,
    fetchGa4AiAssistantSummary,
    fetchGa4OrganicLandingPages,
    fetchGa4OrganicSummary,
    fetchGa4SeoLandingConversions,
    inspectGa4MeasurementTag,
} from '@/modules/seo/infrastructure/seo-ga4';
import { buildSeoDailyPerformanceSection, buildSeoRankingSection } from '@/modules/seo/application/seo-health-shared';
import { checkRobotsTxt, crawlSitemapHealth, type PageMetadataCheck } from '@/modules/seo/domain/seo-page-health';
import { buildSeoHealthRouteErrorPayload, buildSeoHealthRoutePayload } from '@/modules/seo/application/seo-health-route-payload';
import { isForceAlertSend, resolveSeoAlertDispatch, resolveSeoTriggerSource } from '@/modules/seo/application/seo-alert-delivery';
import { appendOptionalReportSection, buildMainSeoHealthOpsState } from '@/modules/seo/application/seo-ops-service';
import { buildElapsedSection, buildMainGa4Section, buildMainSeoHealthIntro } from '@/modules/seo/domain/seo-report-formatters';
import { defaultSeoRouteRuntime } from '@/modules/seo/application/seo-route-runtime';
import { GA4_MEASUREMENT_ID } from '@/lib/analytics-config';
import { buildBookingSeoFunnelSection, fetchBookingSeoFunnel } from '@/modules/seo/infrastructure/seo-booking-funnel';
import { buildCoreWebVitalsSection, fetchCoreWebVitals } from '@/modules/seo/infrastructure/seo-pagespeed';

export const maxDuration = 60;

const SITE_URL = 'https://www.hello-stay.com';
const GA4_PROPERTY_ID_HEADER = 'x-seo-ga4-property-id';
const GOOGLE_OAUTH_CLIENT_ID_HEADER = 'x-seo-google-oauth-client-id';
const GOOGLE_OAUTH_CLIENT_SECRET_HEADER = 'x-seo-google-oauth-client-secret';
const GOOGLE_OAUTH_REFRESH_TOKEN_HEADER = 'x-seo-google-oauth-refresh-token';
const GA4_AI_TRAFFIC_NOTE = 'Google AI Overviews / AI Mode 目前仍算在 Organic Search；GA4 可單獨切出的 AI 流量是可辨識的 AI Assistants referrer。';

function offsetDate(date: string, days: number): string {
    const value = new Date(`${date}T00:00:00Z`);
    value.setUTCDate(value.getUTCDate() + days);
    return value.toISOString().slice(0, 10);
}

function resolveReportCadence(request: Request, now = new Date()) {
    const explicit = new URL(request.url).searchParams.get('scope');
    if (explicit === 'monthly') return { scope: 'monthly' as const, includeWeekly: true, includeMonthly: true };
    if (explicit === 'weekly') return { scope: 'weekly' as const, includeWeekly: true, includeMonthly: false };
    if (explicit === 'daily') return { scope: 'daily' as const, includeWeekly: false, includeMonthly: false };
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Taipei', weekday: 'short', day: '2-digit' }).formatToParts(now);
    const weekday = parts.find((part) => part.type === 'weekday')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;
    const includeMonthly = day === '01';
    const includeWeekly = includeMonthly || weekday === 'Mon';
    return { scope: includeMonthly ? 'monthly' as const : includeWeekly ? 'weekly' as const : 'daily' as const, includeWeekly, includeMonthly };
}

function buildRequestDebugInfo(request: Request, options: { triggerSource: string; forceSend: boolean }) {
    return {
        triggerSource: options.triggerSource,
        forceSend: options.forceSend,
        url: request.url,
        userAgent: request.headers.get('user-agent') || '',
        authorizationPresent: !!request.headers.get('authorization'),
        xVercelCron: request.headers.get('x-vercel-cron') || '',
        xSeoTriggerSource: request.headers.get('x-seo-trigger-source') || '',
        xSeoForceSend: request.headers.get('x-seo-force-send') || '',
        xForwardedFor: request.headers.get('x-forwarded-for') || '',
        xForwardedHost: request.headers.get('x-forwarded-host') || '',
        xForwardedProto: request.headers.get('x-forwarded-proto') || '',
        host: request.headers.get('host') || '',
    };
}

export async function GET(request: Request) {
    const unauthorizedResponse = await defaultSeoRouteRuntime.authorizer.authorize(request);
    if (unauthorizedResponse && process.env.NODE_ENV === 'production') {
        return unauthorizedResponse;
    }

    try {
        const startTime = Date.now();
        const nowIso = new Date().toISOString();
        await connectToDatabase();
        const previousState = await defaultSeoRouteRuntime.opsStateStore.readMain();
        const forceSend = isForceAlertSend(request);
        const triggerSource = resolveSeoTriggerSource(request);
        const cadence = resolveReportCadence(request);
        const requestDebugInfo = buildRequestDebugInfo(request, { triggerSource, forceSend });

        console.info('[SEO] seo-health request received', requestDebugInfo);

        const [healthCheck, robotsOk] = await Promise.all([
            crawlSitemapHealth(SITE_URL),
            checkRobotsTxt(SITE_URL),
        ]);
        const pageResults = healthCheck.pages;
        const sitemapResult = healthCheck.sitemap;

        const totalPages = pageResults.length;
        const pagesWithJsonLd = pageResults.filter((page) => page.hasJsonLd).length;
        const pagesWithIssues = pageResults.filter((page) => page.issues.length > 0);
        const criticalIssues = healthCheck.issues.filter((issue) => issue.severity === 'critical');
        const currentTechnicalHealthy = robotsOk && sitemapResult.ok && criticalIssues.length === 0;
        const previousCriticalFingerprints = Array.isArray(previousState?.summary?.criticalFingerprints)
            ? previousState.summary.criticalFingerprints.filter((value): value is string => typeof value === 'string')
            : [];
        const alertDispatch = resolveSeoAlertDispatch({
            lastAlertAt: previousState?.lastAlertAt,
            nowIso,
            forceSend,
            previousCriticalFingerprints,
            currentCriticalFingerprints: criticalIssues.map((issue) => issue.fingerprint),
            previousHealthy: previousState?.healthy,
            currentHealthy: currentTechnicalHealthy,
        });
        const ga4PropertyId = request.headers.get(GA4_PROPERTY_ID_HEADER) || process.env.GOOGLE_ANALYTICS_PROPERTY_ID || '';
        const ga4OauthClientId = request.headers.get(GOOGLE_OAUTH_CLIENT_ID_HEADER) || process.env.GOOGLE_OAUTH_CLIENT_ID || '';
        const ga4OauthClientSecret = request.headers.get(GOOGLE_OAUTH_CLIENT_SECRET_HEADER) || process.env.GOOGLE_OAUTH_CLIENT_SECRET || '';
        const ga4OauthRefreshToken = request.headers.get(GOOGLE_OAUTH_REFRESH_TOKEN_HEADER) || process.env.GOOGLE_OAUTH_REFRESH_TOKEN || '';
        const ga4PropertyIdConfigured = !!ga4PropertyId;
        const ga4OauthConfigured = !!(ga4OauthClientId && ga4OauthClientSecret && ga4OauthRefreshToken);
        const ga4Date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        const ga4Range7d = { startDate: offsetDate(ga4Date, -6), endDate: ga4Date };
        const ga4Range28d = { startDate: offsetDate(ga4Date, -27), endDate: ga4Date };

        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        let report = buildMainSeoHealthIntro({
            timestamp: now,
            triggerSource,
            robotsOk,
            sitemap: sitemapResult,
            pagesWithJsonLd,
            totalPages,
            pagesWithIssues,
            seoIssues: healthCheck.issues,
        });
        report += `\n🗓️ 本次報表層級: ${cadence.scope}（技術每日 / 趨勢每週 / 內容每月）\n`;

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

        let ga4DataApiStatus: 'configured' | 'missing_config' | 'error' | 'skipped' = cadence.includeWeekly ? 'missing_config' : 'skipped';
        let ga4Summary = null;
        let ga4LandingPages: Array<{ page: string; sessions: number; users: number }> = [];
        let ga4ConversionLandingPages: Array<{ page: string; sessions: number; users: number; bookingClicks: number; lineClicks: number; phoneClicks: number; conversionUsers: number; clickRate: number }> = [];
        let ga4AiAssistantsSummary = null;
        let ga4AiSources: Array<{ source: string; sessions: number; users: number; pageviews: number }> = [];
        let ga4AiLandingPages: Array<{ page: string; sessions: number; users: number; pageviews: number }> = [];
        let ga4Summary28d = null;
        let ga4LandingPages28d: Array<{ page: string; sessions: number; users: number }> = [];
        let ga4ConversionLandingPages28d: Array<{ page: string; sessions: number; users: number; bookingClicks: number; lineClicks: number; phoneClicks: number; conversionUsers: number; clickRate: number }> = [];
        let ga4AiAssistantsSummary28d = null;
        let ga4AiLandingPages28d: Array<{ page: string; sessions: number; users: number; pageviews: number }> = [];
        let ga4Error: string | null = null;

        if (cadence.includeWeekly && ga4PropertyIdConfigured && ga4OauthConfigured) {
            try {
                const { accessToken } = await exchangeRefreshTokenForAccessToken({
                    clientId: ga4OauthClientId,
                    clientSecret: ga4OauthClientSecret,
                    refreshToken: ga4OauthRefreshToken,
                });
                const [
                    summary,
                    landingPages,
                    conversionLandingPages,
                    aiAssistantsSummary,
                    aiSources,
                    aiLandingPages,
                    summary28d,
                    landingPages28d,
                    conversionLandingPages28d,
                    aiAssistantsSummary28d,
                    aiLandingPages28d,
                ] = await Promise.all([
                    fetchGa4OrganicSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range7d,
                    }),
                    fetchGa4OrganicLandingPages({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range7d,
                    }),
                    fetchGa4SeoLandingConversions({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range7d,
                    }),
                    fetchGa4AiAssistantSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range7d,
                    }),
                    fetchGa4AiAssistantSources({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                    fetchGa4AiAssistantLandingPages({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range7d,
                    }),
                    fetchGa4OrganicSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                    fetchGa4OrganicLandingPages({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                    fetchGa4SeoLandingConversions({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                    fetchGa4AiAssistantSummary({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                    fetchGa4AiAssistantLandingPages({
                        propertyId: ga4PropertyId,
                        accessToken,
                        ...ga4Range28d,
                    }),
                ]);
                ga4Summary = summary;
                ga4LandingPages = landingPages;
                ga4ConversionLandingPages = conversionLandingPages;
                ga4AiAssistantsSummary = aiAssistantsSummary;
                ga4AiSources = aiSources;
                ga4AiLandingPages = aiLandingPages;
                ga4Summary28d = summary28d;
                ga4LandingPages28d = landingPages28d;
                ga4ConversionLandingPages28d = conversionLandingPages28d;
                ga4AiAssistantsSummary28d = aiAssistantsSummary28d;
                ga4AiLandingPages28d = aiLandingPages28d;
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
            windows: ga4Summary && ga4AiAssistantsSummary && ga4Summary28d && ga4AiAssistantsSummary28d ? {
                sevenDay: {
                    label: '近 7 天',
                    summary: ga4Summary,
                    landingPages: ga4LandingPages,
                    conversionLandingPages: ga4ConversionLandingPages,
                    aiLandingPages: ga4AiLandingPages,
                    aiSummary: ga4AiAssistantsSummary,
                },
                twentyEightDay: {
                    label: '近 28 天',
                    summary: ga4Summary28d,
                    landingPages: ga4LandingPages28d,
                    conversionLandingPages: ga4ConversionLandingPages28d,
                    aiLandingPages: ga4AiLandingPages28d,
                    aiSummary: ga4AiAssistantsSummary28d,
                },
            } : null,
        });

        const [bookingFunnel7d, bookingFunnel28d] = cadence.includeWeekly
            ? await Promise.all([
                fetchBookingSeoFunnel(7).catch((error) => {
                    console.error('[SEO] Booking funnel 7d error:', error);
                    return null;
                }),
                fetchBookingSeoFunnel(28).catch((error) => {
                    console.error('[SEO] Booking funnel 28d error:', error);
                    return null;
                }),
            ])
            : [null, null];
        if (cadence.includeWeekly) report += buildBookingSeoFunnelSection(bookingFunnel7d, bookingFunnel28d);

        const coreWebVitals = cadence.includeWeekly
            ? await Promise.all([
                '/',
                '/hellohouse',
                '/godin',
                '/compare',
                '/blog/kaohsiung-arena-accommodation',
            ].map((path) => fetchCoreWebVitals(`${SITE_URL}${path === '/' ? '' : path}`)))
            : [];
        if (coreWebVitals.length > 0) report += buildCoreWebVitalsSection(coreWebVitals);

        // ── Part 2: GSC 排名追蹤 ──────────────────────────
        const dailyPerformanceSection = cadence.includeWeekly
            ? null
            : await buildSeoDailyPerformanceSection({
                connect: connectToDatabase,
                pageFilter: 'https://www.hello-stay.com',
                errorPrefix: '[SEO]',
            });
        const rankingSection = cadence.includeWeekly
            ? await buildSeoRankingSection({
                connect: connectToDatabase,
                pageFilter: 'https://www.hello-stay.com',
                fetchData: (targetDate) => fetchGSCData(targetDate, { pageFilter: 'https://www.hello-stay.com' }),
                saveSnapshot,
                getSnapshot,
                errorPrefix: '[SEO]',
            })
            : { report: dailyPerformanceSection?.report || '', rankingData: null, rankingError: dailyPerformanceSection?.rankingError || null };
        report += rankingSection.report;
        const { rankingData, rankingError } = rankingSection;

        // ── Part 3: 部落格文章流量排行 ─────────────────────
        if (cadence.includeMonthly) {
            report += await appendOptionalReportSection({
                fetchData: () => fetchBlogTraffic({ endDate: rankingData?.date }),
                buildReport: buildBlogRankingReport,
                logPrefix: '[SEO] Blog traffic error:',
            });
        }

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        report += buildElapsedSection(elapsed);

        let alertSent = false;
        if (alertDispatch.shouldSend) {
            alertSent = await defaultSeoRouteRuntime.notifier.notifyMain(report);
        } else {
            console.info('[SEO] seo-health alert suppressed', {
                lastAlertAt: previousState?.lastAlertAt || null,
                reason: alertDispatch.reason,
                triggerSource,
                requestDebugInfo,
            });
        }

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
            criticalIssues,
        });
        const healthy = !!state.healthy;
        await defaultSeoRouteRuntime.opsStateStore.persistMain(state);

        return NextResponse.json(buildSeoHealthRoutePayload({
            success: true,
            healthy,
            timestamp: now,
            elapsed: `${elapsed}s`,
            pages: pageResults.map((page: PageMetadataCheck) => ({
                name: page.name,
                path: page.path,
                status: page.status,
                jsonLd: page.hasJsonLd,
                issues: page.issues,
                seoIssues: page.seoIssues || [],
            })),
            sitemap: sitemapResult,
            robots: robotsOk,
            ranking: rankingData,
            dailySearchPerformance: {
                date: dailyPerformanceSection?.dataDate || null,
                metrics: dailyPerformanceSection?.performance || null,
            },
            rankingError,
            pageOwnershipWarnings: rankingData?.trendReport?.pageOwnershipWarnings || [],
            ga4: {
                measurementId: GA4_MEASUREMENT_ID,
                siteTagDetected: ga4SiteTagDetected,
                propertyIdConfigured: ga4PropertyIdConfigured,
                oauthConfigured: ga4OauthConfigured,
                dataApiStatus: ga4DataApiStatus,
                date: ga4DataApiStatus === 'configured' ? ga4Date : null,
                summary: ga4Summary,
                landingPages: ga4LandingPages,
                conversionLandingPages: ga4ConversionLandingPages,
                aiLandingPages: ga4AiLandingPages,
                aiAssistants: {
                    summary: ga4AiAssistantsSummary,
                    sources: ga4AiSources,
                },
                windows: {
                    sevenDay: { range: ga4Range7d, summary: ga4Summary, landingPages: ga4LandingPages, conversionLandingPages: ga4ConversionLandingPages, aiLandingPages: ga4AiLandingPages, aiSummary: ga4AiAssistantsSummary },
                    twentyEightDay: { range: ga4Range28d, summary: ga4Summary28d, landingPages: ga4LandingPages28d, conversionLandingPages: ga4ConversionLandingPages28d, aiLandingPages: ga4AiLandingPages28d, aiSummary: ga4AiAssistantsSummary28d },
                },
                notes: [GA4_AI_TRAFFIC_NOTE],
                error: ga4Error,
            },
            bookingFunnel: {
                sevenDay: bookingFunnel7d,
                twentyEightDay: bookingFunnel28d,
            },
            coreWebVitals,
            alertSent,
            alertSuppressed: alertDispatch.alertSuppressed,
            triggerSource,
            forceSend,
            previousAlertAt: previousState?.lastAlertAt || null,
            cadence: cadence.scope,
        }));
    } catch (error) {
        console.error('[Cron] seo-health error:', error);
        return NextResponse.json(buildSeoHealthRouteErrorPayload(), { status: 500 });
    }
}
