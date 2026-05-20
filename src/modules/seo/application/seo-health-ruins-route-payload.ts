import type { checkJsonLdCoverage, checkRobotsTxt, checkSitemapXml } from '@/modules/seo/domain/seo-page-health';
import type { fetchPageSpeedReport } from '@/modules/seo/infrastructure/seo-pagespeed';
import type { fetchRuinsGSCData } from '@/modules/seo/infrastructure/seo-ranking-ruins';

export interface RuinsSeoHealthRoutePayload {
    success: true;
    healthy: boolean;
    timestamp: string;
    elapsed: string;
    sitemap: Awaited<ReturnType<typeof checkSitemapXml>>;
    robots: Awaited<ReturnType<typeof checkRobotsTxt>>;
    llms: boolean;
    jsonld: Awaited<ReturnType<typeof checkJsonLdCoverage>>;
    pageSpeed: Awaited<ReturnType<typeof fetchPageSpeedReport>>;
    ranking: Awaited<ReturnType<typeof fetchRuinsGSCData>> | null;
    rankingError: string | null;
    alertSent: boolean;
}

export function buildRuinsSeoHealthRoutePayload(payload: RuinsSeoHealthRoutePayload): RuinsSeoHealthRoutePayload {
    return payload;
}

export interface RuinsSeoHealthRouteErrorPayload {
    error: 'Ruins SEO health check failed';
    source: 'seo-health-ruins';
}

export function buildRuinsSeoHealthRouteErrorPayload(): RuinsSeoHealthRouteErrorPayload {
    return {
        error: 'Ruins SEO health check failed',
        source: 'seo-health-ruins',
    };
}
