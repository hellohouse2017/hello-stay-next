/**
 * Ruins Bar SEO 健康日報 Cron
 * 
 * 健康檢查（robots.txt, sitemap, llms.txt, JSON-LD）
 * + Google Search Console 排名追蹤
 * + PageSpeed Insights
 * → 推送到廢墟專屬 Telegram
 */
import { NextResponse } from 'next/server';
import connectToDatabase from '@/modules/seo/infrastructure/seo-mongodb';
import { fetchRuinsGSCData, saveRuinsSnapshot, getRuinsSnapshot, fetchRuinsBlogTraffic, buildRuinsBlogReport } from '@/modules/seo/infrastructure/seo-ranking-ruins';
import { buildSeoRankingSection } from '@/modules/seo/application/seo-health-shared';
import { checkJsonLdCoverage, checkLlmsTxt, checkRobotsTxt, checkSitemapXml } from '@/modules/seo/domain/seo-page-health';
import { fetchPageSpeedReport } from '@/modules/seo/infrastructure/seo-pagespeed';
import { buildRuinsSeoHealthRouteErrorPayload, buildRuinsSeoHealthRoutePayload } from '@/modules/seo/application/seo-health-ruins-route-payload';
import { isForceAlertSend, resolveSeoAlertDispatch, resolveSeoTriggerSource } from '@/modules/seo/application/seo-alert-delivery';
import { appendOptionalReportSection, buildRuinsSeoHealthOpsState } from '@/modules/seo/application/seo-ops-service';
import { buildElapsedSection, buildPageSpeedSection, buildRuinsSeoHealthIntro } from '@/modules/seo/domain/seo-report-formatters';
import { defaultSeoRouteRuntime } from '@/modules/seo/application/seo-route-runtime';

export const maxDuration = 60;

const SITE_URL = 'https://ruins.hello-stay.com';
const LOCALE_PAGES = ['/zh', '/en', '/ja', '/ko', '/vi'];

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
        const previousState = await defaultSeoRouteRuntime.opsStateStore.readRuins();
        const forceSend = isForceAlertSend(request);
        const triggerSource = resolveSeoTriggerSource(request);
        const alertDispatch = resolveSeoAlertDispatch({
            lastAlertAt: previousState?.lastAlertAt,
            nowIso,
            forceSend,
        });
        const requestDebugInfo = buildRequestDebugInfo(request, { triggerSource, forceSend });

        console.info('[SEO] seo-health-ruins request received', requestDebugInfo);
        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        // ── Part 1: 健康檢查 ──
        const [robotsOk, sitemapResult, llmsResult, jsonldResult, psResult] = await Promise.all([
            checkRobotsTxt(SITE_URL),
            checkSitemapXml(SITE_URL),
            checkLlmsTxt(SITE_URL),
            checkJsonLdCoverage(SITE_URL, LOCALE_PAGES),
            fetchPageSpeedReport(`${SITE_URL}/zh/`),
        ]);

        let report = buildRuinsSeoHealthIntro({
            timestamp: now,
            triggerSource,
            robotsOk,
            sitemap: sitemapResult,
            llms: llmsResult,
            jsonLd: jsonldResult,
        });
        report += buildPageSpeedSection(psResult);

        // ── Part 2: GSC 排名追蹤 ──
        const rankingSection = await buildSeoRankingSection({
            connect: connectToDatabase,
            pageFilter: 'https://ruins.hello-stay.com',
            fetchData: fetchRuinsGSCData,
            saveSnapshot: saveRuinsSnapshot,
            getSnapshot: getRuinsSnapshot,
            errorPrefix: '[SEO-Ruins]',
        });
        report += rankingSection.report;
        const { rankingData, rankingError } = rankingSection;

        // ── Part 3: 部落格流量排行 ──
        report += await appendOptionalReportSection({
            fetchData: fetchRuinsBlogTraffic,
            buildReport: buildRuinsBlogReport,
            onEmpty: () => '\n📝 <b>部落格流量</b>（近7天）\n  目前無部落格流量數據（新文章需 2-4 週才會有數據）\n',
            onError: (message) => `\n📝 部落格流量查詢失敗: ${message}\n`,
            logPrefix: '[SEO-Ruins] Blog traffic error:',
        });

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        report += buildElapsedSection(elapsed);

        let alertSent = false;
        if (alertDispatch.shouldSend) {
            alertSent = await defaultSeoRouteRuntime.notifier.notifyRuins(report);
        } else {
            console.info('[SEO] seo-health-ruins alert suppressed', {
                lastAlertAt: previousState?.lastAlertAt || null,
                reason: alertDispatch.reason,
                triggerSource,
                requestDebugInfo,
            });
        }

        const state = buildRuinsSeoHealthOpsState({
            nowIso,
            alertSent,
            robotsOk,
            sitemap: sitemapResult,
            llms: llmsResult,
            jsonLd: jsonldResult,
            pageSpeed: psResult,
            rankingError,
        });
        const healthy = !!state.healthy;
        await defaultSeoRouteRuntime.opsStateStore.persistRuins(state);

        return NextResponse.json(buildRuinsSeoHealthRoutePayload({
            success: true,
            healthy,
            timestamp: now,
            elapsed: `${elapsed}s`,
            sitemap: sitemapResult,
            robots: robotsOk,
            llms: llmsResult.ok,
            jsonld: jsonldResult,
            pageSpeed: psResult,
            ranking: rankingData,
            rankingError,
            alertSent,
            alertSuppressed: alertDispatch.alertSuppressed,
            triggerSource,
            forceSend,
            previousAlertAt: previousState?.lastAlertAt || null,
        }));
    } catch (error) {
        console.error('[Cron] seo-health-ruins error:', error);
        return NextResponse.json(buildRuinsSeoHealthRouteErrorPayload(), { status: 500 });
    }
}
