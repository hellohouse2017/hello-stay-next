import type { checkRobotsTxt, checkSitemapXml, inspectPageMetadata } from '@/modules/seo/domain/seo-page-health';
import type { SeoIssue } from '@/modules/seo/domain/seo-page-health';
import type { Ga4OrganicLandingPage, Ga4OrganicSummary, Ga4TrafficSource, Ga4TrafficSummary } from '@/modules/seo/infrastructure/seo-ga4';
import type { fetchGSCData, GscDailyPerformance } from '@/modules/seo/infrastructure/seo-ranking';
import type { BookingSeoFunnelReport } from '@/modules/seo/infrastructure/seo-booking-funnel';
import type { CoreWebVitalsResult } from '@/modules/seo/infrastructure/seo-pagespeed';

export interface SeoHealthRoutePayload {
    success: true;
    healthy: boolean;
    timestamp: string;
    elapsed: string;
    pages: Array<{ name: string; path: string; status: number; jsonLd: boolean; issues: string[]; seoIssues?: SeoIssue[] }>;
    sitemap: Awaited<ReturnType<typeof checkSitemapXml>>;
    robots: Awaited<ReturnType<typeof checkRobotsTxt>>;
    ranking: Awaited<ReturnType<typeof fetchGSCData>> | null;
    dailySearchPerformance?: {
        date: string | null;
        metrics: GscDailyPerformance | null;
    };
    rankingError: string | null;
    ga4: {
        measurementId: string;
        siteTagDetected: boolean;
        propertyIdConfigured: boolean;
        oauthConfigured: boolean;
        dataApiStatus: 'configured' | 'missing_config' | 'error' | 'skipped';
        date: string | null;
        summary: Ga4OrganicSummary | null;
        landingPages: Ga4OrganicLandingPage[];
        aiAssistants: {
            summary: Ga4TrafficSummary | null;
            sources: Ga4TrafficSource[];
        };
        windows?: {
            sevenDay: { range: { startDate: string; endDate: string }; summary: Ga4OrganicSummary | null; landingPages: Ga4OrganicLandingPage[]; aiSummary: Ga4TrafficSummary | null };
            twentyEightDay: { range: { startDate: string; endDate: string }; summary: Ga4OrganicSummary | null; landingPages: Ga4OrganicLandingPage[]; aiSummary: Ga4TrafficSummary | null };
        };
        notes: string[];
        error: string | null;
    };
    bookingFunnel?: {
        sevenDay: BookingSeoFunnelReport | null;
        twentyEightDay: BookingSeoFunnelReport | null;
    };
    coreWebVitals?: CoreWebVitalsResult[];
    alertSent: boolean;
    alertSuppressed: boolean;
    triggerSource: string;
    forceSend: boolean;
    previousAlertAt: string | null;
    cadence?: 'daily' | 'weekly' | 'monthly';
}

export function buildSeoHealthRoutePayload(payload: SeoHealthRoutePayload): SeoHealthRoutePayload {
    return payload;
}

export interface SeoHealthRouteErrorPayload {
    error: 'SEO health check failed';
    source: 'seo-health';
}

export function buildSeoHealthRouteErrorPayload(): SeoHealthRouteErrorPayload {
    return {
        error: 'SEO health check failed',
        source: 'seo-health',
    };
}

export type SeoHealthPageResult = Awaited<ReturnType<typeof inspectPageMetadata>>;
