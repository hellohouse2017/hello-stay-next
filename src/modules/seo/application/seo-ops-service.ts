import type { ContentOpsState } from '@/modules/seo/infrastructure/seo-ops-state';
import type { JsonLdCoverageResult, LlmsCheckResult, PageMetadataCheck, SeoIssue, SitemapCheckResult } from '@/modules/seo/domain/seo-page-health';
import type { PageSpeedReport } from '@/modules/seo/domain/seo-report-formatters';

type MaybePromise<T> = T | Promise<T>;

export async function appendOptionalReportSection<T>(options: {
    fetchData: () => MaybePromise<T | null>;
    buildReport: (data: T) => string;
    onEmpty?: () => string;
    onError?: (message: string) => string;
    logPrefix: string;
}): Promise<string> {
    const { fetchData, buildReport, onEmpty, onError, logPrefix } = options;

    try {
        const data = await fetchData();
        if (!data) {
            return onEmpty ? onEmpty() : '';
        }
        return buildReport(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`${logPrefix} ${message}`);
        return onError ? onError(message) : '';
    }
}

export function buildMainSeoHealthOpsState(options: {
    nowIso: string;
    alertSent: boolean;
    pagesWithIssues: PageMetadataCheck[];
    totalPages: number;
    pagesWithJsonLd: number;
    robotsOk: boolean;
    sitemap: SitemapCheckResult;
    rankingError: string | null;
    ga4SiteTagDetected: boolean;
    ga4DataApiStatus: 'configured' | 'missing_config' | 'error' | 'skipped';
    criticalIssues?: SeoIssue[];
}): ContentOpsState {
    const {
        nowIso,
        alertSent,
        pagesWithIssues,
        totalPages,
        pagesWithJsonLd,
        robotsOk,
        sitemap,
        rankingError,
        ga4SiteTagDetected,
        ga4DataApiStatus,
        criticalIssues = [],
    } = options;
    const healthy = criticalIssues.length === 0 && sitemap.ok && robotsOk && !rankingError && ga4SiteTagDetected;

    return {
        status: healthy ? 'healthy' : 'failed',
        lastCheckedAt: nowIso,
        lastAlertAt: alertSent ? nowIso : undefined,
        healthy,
        alertSent,
        message: healthy
            ? 'SEO health 檢查正常。'
            : `SEO health 發現 ${pagesWithIssues.length} 個頁面有問題${!ga4SiteTagDetected ? '，且 GA4 前台埋碼未偵測到' : ''}${rankingError ? '，且 GSC / ranking 取數異常。' : '。'}`,
        summary: {
            pagesWithIssues: pagesWithIssues.length,
            totalPages,
            pagesWithJsonLd,
            robotsOk,
            sitemapOk: sitemap.ok,
            sitemapPageCount: sitemap.pageCount,
            rankingError: rankingError || null,
            ga4SiteTagDetected,
            ga4DataApiStatus,
            criticalIssueCount: criticalIssues.length,
            criticalFingerprints: criticalIssues.map((issue) => issue.fingerprint),
        },
    };
}

export function buildRuinsSeoHealthOpsState(options: {
    nowIso: string;
    alertSent: boolean;
    robotsOk: boolean;
    sitemap: SitemapCheckResult;
    llms: LlmsCheckResult;
    jsonLd: JsonLdCoverageResult;
    pageSpeed: PageSpeedReport;
    rankingError: string | null;
}): ContentOpsState {
    const { nowIso, alertSent, robotsOk, sitemap, llms, jsonLd, pageSpeed, rankingError } = options;
    const healthy = robotsOk && sitemap.ok && llms.ok && jsonLd.ok && !rankingError;

    return {
        status: healthy ? 'healthy' : 'failed',
        lastCheckedAt: nowIso,
        lastAlertAt: alertSent ? nowIso : undefined,
        healthy,
        alertSent,
        message: healthy
            ? 'Ruins SEO health 檢查正常。'
            : `Ruins SEO health 有問題${rankingError ? '，且 GSC / ranking 取數異常。' : '。'}`,
        summary: {
            robotsOk,
            sitemapOk: sitemap.ok,
            sitemapPageCount: sitemap.pageCount,
            llmsOk: llms.ok,
            jsonLdOk: jsonLd.ok,
            jsonLdCoverage: `${jsonLd.okCount}/${jsonLd.total}`,
            pageSpeedMobile: pageSpeed.mobile,
            pageSpeedDesktop: pageSpeed.desktop,
            rankingError: rankingError || null,
        },
    };
}
