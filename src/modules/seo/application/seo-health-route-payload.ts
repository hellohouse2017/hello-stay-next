import type { checkRobotsTxt, checkSitemapXml, inspectPageMetadata } from '@/modules/seo/domain/seo-page-health';
import type { Ga4OrganicLandingPage, Ga4OrganicSummary, Ga4TrafficSource, Ga4TrafficSummary } from '@/modules/seo/infrastructure/seo-ga4';
import type { fetchGSCData } from '@/modules/seo/infrastructure/seo-ranking';

export interface SeoHealthRoutePayload {
    success: true;
    healthy: boolean;
    timestamp: string;
    elapsed: string;
    pages: Array<{ name: string; path: string; status: number; jsonLd: boolean; issues: string[] }>;
    sitemap: Awaited<ReturnType<typeof checkSitemapXml>>;
    robots: Awaited<ReturnType<typeof checkRobotsTxt>>;
    ranking: Awaited<ReturnType<typeof fetchGSCData>> | null;
    rankingError: string | null;
    ga4: {
        measurementId: string;
        siteTagDetected: boolean;
        propertyIdConfigured: boolean;
        oauthConfigured: boolean;
        dataApiStatus: 'configured' | 'missing_config' | 'error';
        date: string | null;
        summary: Ga4OrganicSummary | null;
        landingPages: Ga4OrganicLandingPage[];
        aiAssistants: {
            summary: Ga4TrafficSummary | null;
            sources: Ga4TrafficSource[];
        };
        notes: string[];
        error: string | null;
    };
    alertSent: boolean;
    alertSuppressed: boolean;
    triggerSource: string;
    forceSend: boolean;
    previousAlertAt: string | null;
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
