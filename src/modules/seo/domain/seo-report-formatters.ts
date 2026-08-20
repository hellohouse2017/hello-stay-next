import type { PageMetadataCheck, JsonLdCoverageResult, LlmsCheckResult, SeoIssue, SitemapCheckResult } from '@/modules/seo/domain/seo-page-health';

export type PageSpeedCategoryScores = {
    perf: number;
    a11y: number;
    bp: number;
    seo: number;
};

export type PageSpeedReport = {
    mobile: PageSpeedCategoryScores | null;
    desktop: PageSpeedCategoryScores | null;
};

export type MainGa4SectionStatus = 'configured' | 'missing_config' | 'error' | 'skipped';

export function buildMainSeoHealthIntro(options: {
    timestamp: string;
    triggerSource: string;
    robotsOk: boolean;
    sitemap: SitemapCheckResult;
    pagesWithJsonLd: number;
    totalPages: number;
    pagesWithIssues: PageMetadataCheck[];
    seoIssues?: SeoIssue[];
}): string {
    const { timestamp, triggerSource, robotsOk, sitemap, pagesWithJsonLd, totalPages, pagesWithIssues, seoIssues } = options;

    let report = `📊 <b>SEO 健康日報</b>\n`;
    report += `🕐 ${timestamp}\n`;
    report += `🧭 觸發來源: ${triggerSource}\n`;
    report += `🔁 推播策略: Asia/Taipei 同日最多 1 次（force=1 可覆蓋）\n`;
    report += `──────────────\n`;
    report += `${robotsOk ? '✅' : '❌'} robots.txt\n`;
    report += `${sitemap.ok ? '✅' : '❌'} sitemap.xml (${sitemap.pageCount} 頁)\n`;
    report += `✅ JSON-LD: ${pagesWithJsonLd}/${totalPages} 頁\n`;

    if (seoIssues) {
        const critical = seoIssues.filter((issue) => issue.severity === 'critical');
        const warnings = seoIssues.filter((issue) => issue.severity === 'warning');
        const opportunities = seoIssues.filter((issue) => issue.severity === 'opportunity');
        report += `\n健康分級：${critical.length} critical / ${warnings.length} warning / ${opportunities.length} opportunity\n`;

        const reportable = [...critical, ...warnings].slice(0, 24);
        if (reportable.length > 0) {
            report += `\n⚠️ <b>需要處理:</b>\n`;
            for (const issue of reportable) {
                report += `${issue.severity === 'critical' ? '❌' : '⚠️'} <b>${issue.path}</b> [${issue.code}] ${issue.message}\n`;
            }
            if (critical.length + warnings.length > reportable.length) {
                report += `ℹ️ 另有 ${critical.length + warnings.length - reportable.length} 項，完整清單請看 API payload。\n`;
            }
        }

        if (opportunities.length > 0) {
            const shortDescriptions = opportunities.filter((issue) => issue.code === 'description_short');
            report += `\n💡 <b>優化機會:</b> ${opportunities.length} 項`;
            if (shortDescriptions.length > 0) report += `（含 ${shortDescriptions.length} 頁 description 可加強）`;
            report += `\n`;
        }

        if (critical.length === 0 && warnings.length === 0) report += `\n🎉 技術健康檢查無 critical / warning。\n`;
        return report;
    }

    if (pagesWithIssues.length > 0) {
        report += `\n⚠️ <b>發現問題:</b>\n`;
        for (const page of pagesWithIssues) {
            report += `\n📄 <b>${page.name}</b> (${page.path})\n`;
            for (const issue of page.issues) {
                report += `   ${issue}\n`;
            }
        }
        return report;
    }

    report += `\n🎉 所有頁面健康！無問題。\n`;
    return report;
}

export function buildRuinsSeoHealthIntro(options: {
    timestamp: string;
    triggerSource: string;
    robotsOk: boolean;
    sitemap: SitemapCheckResult;
    llms: LlmsCheckResult;
    jsonLd: JsonLdCoverageResult;
}): string {
    const { timestamp, triggerSource, robotsOk, sitemap, llms, jsonLd } = options;

    let report = `📊 <b>廢墟酒吧 SEO 健康日報</b>\n`;
    report += `🕐 ${timestamp}\n`;
    report += `🧭 觸發來源: ${triggerSource}\n`;
    report += `🔁 推播策略: Asia/Taipei 同日最多 1 次（force=1 可覆蓋）\n`;
    report += `──────────────\n`;
    report += `${robotsOk ? '✅' : '❌'} robots.txt\n`;
    report += `${sitemap.ok ? '✅' : '❌'} sitemap.xml (${sitemap.pageCount} 頁)\n`;
    report += `${llms.msg}\n`;
    report += `${jsonLd.ok ? '✅' : '⚠️'} JSON-LD: ${jsonLd.okCount}/${jsonLd.total} 頁\n`;
    report += robotsOk && sitemap.ok && llms.ok && jsonLd.ok
        ? `\n🎉 所有頁面健康！無問題。\n`
        : `\n⚠️ 有問題需要處理\n`;
    return report;
}

export function buildPageSpeedSection(pageSpeed: PageSpeedReport): string {
    const scoreEmoji = (score: number) => (score >= 90 ? '🟢' : score >= 50 ? '🟠' : '🔴');
    let report = '';

    if (pageSpeed.mobile) {
        const ps = pageSpeed.mobile;
        report += `\n📈 <b>PageSpeed 分數</b>\n──────────────\n`;
        report += `<b>📱 行動裝置</b>\n`;
        report += `${scoreEmoji(ps.perf)} 效能: ${ps.perf}  ${scoreEmoji(ps.a11y)} 無障礙: ${ps.a11y}\n`;
        report += `${scoreEmoji(ps.bp)} 最佳做法: ${ps.bp}  ${scoreEmoji(ps.seo)} SEO: ${ps.seo}\n`;
    }

    if (pageSpeed.desktop) {
        const ps = pageSpeed.desktop;
        report += `<b>💻 電腦版</b>\n`;
        report += `${scoreEmoji(ps.perf)} 效能: ${ps.perf}  ${scoreEmoji(ps.a11y)} 無障礙: ${ps.a11y}\n`;
        report += `${scoreEmoji(ps.bp)} 最佳做法: ${ps.bp}  ${scoreEmoji(ps.seo)} SEO: ${ps.seo}\n`;
    }

    if (!pageSpeed.mobile && !pageSpeed.desktop) {
        report += `\n⏭️ PageSpeed API 額度暫時不足，跳過分數檢查\n`;
    }

    return report;
}

export function buildMainGa4Section(options: {
    measurementId: string;
    siteTagDetected: boolean;
    propertyIdConfigured: boolean;
    oauthConfigured: boolean;
    dataApiStatus: MainGa4SectionStatus;
    dataDate: string | null;
    summary: { sessions: number; users: number; pageviews: number } | null;
    landingPages: Array<{ page: string; sessions: number; users: number }>;
    aiAssistantsSummary: { sessions: number; users: number; pageviews: number } | null;
    aiSources: Array<{ source: string; sessions: number; users: number; pageviews: number }>;
    siteTagError?: string | null;
    dataApiError?: string | null;
    windows?: {
        sevenDay: {
            label: string;
            summary: { sessions: number; users: number; pageviews: number };
            landingPages: Array<{ page: string; sessions: number; users: number }>;
            conversionLandingPages: Array<{ page: string; sessions: number; users: number; bookingClicks: number; lineClicks: number; phoneClicks: number; conversionUsers: number; clickRate: number }>;
            aiLandingPages: Array<{ page: string; sessions: number; users: number; pageviews: number }>;
            aiSummary: { sessions: number; users: number; pageviews: number };
        };
        twentyEightDay: {
            label: string;
            summary: { sessions: number; users: number; pageviews: number };
            landingPages: Array<{ page: string; sessions: number; users: number }>;
            conversionLandingPages: Array<{ page: string; sessions: number; users: number; bookingClicks: number; lineClicks: number; phoneClicks: number; conversionUsers: number; clickRate: number }>;
            aiLandingPages: Array<{ page: string; sessions: number; users: number; pageviews: number }>;
            aiSummary: { sessions: number; users: number; pageviews: number };
        };
    } | null;
}): string {
    const {
        measurementId,
        siteTagDetected,
        propertyIdConfigured,
        oauthConfigured,
        dataApiStatus,
        dataDate,
        summary,
        landingPages,
        aiAssistantsSummary,
        aiSources,
        siteTagError,
        dataApiError,
        windows,
    } = options;

    let report = `\n📈 <b>GA4 狀態</b>\n──────────────\n`;

    if (siteTagError) {
        report += `⚠️ 前台埋碼檢查失敗: ${siteTagError}\n`;
    } else {
        report += `${siteTagDetected ? '✅' : '❌'} 前台埋碼: ${measurementId}\n`;
    }

    report += `${propertyIdConfigured ? '✅' : 'ℹ️'} Data API Property ID\n`;
    report += `${oauthConfigured ? '✅' : 'ℹ️'} Data API OAuth\n`;

    if (dataApiStatus === 'configured' && windows && dataDate) {
        for (const window of [windows.sevenDay, windows.twentyEightDay]) {
            report += `\n🔎 <b>${window.label}</b>（截至 ${dataDate}）\n`;
            report += `Organic: Sessions ${window.summary.sessions} / Active Users ${window.summary.users} / Pageviews ${window.summary.pageviews}\n`;
            report += `AI Assistants: Sessions ${window.aiSummary.sessions} / Active Users ${window.aiSummary.users} / Pageviews ${window.aiSummary.pageviews}\n`;
            if (window.landingPages.length > 0) {
                report += `<b>Organic Landing Paths</b>\n`;
                for (const [index, page] of window.landingPages.entries()) {
                    report += `${index + 1}. ${page.page} (${page.sessions} sessions / ${page.users} active users)\n`;
                }
            }
            if (window.conversionLandingPages.length > 0) {
                report += `<b>Organic Landing Conversion Users</b>\n`;
                for (const page of window.conversionLandingPages.slice(0, 5)) {
                    const totalClicks = page.bookingClicks + page.lineClicks + page.phoneClicks;
                    report += `${page.page}: ${page.conversionUsers}/${page.users} users (${(page.clickRate * 100).toFixed(1)}%) / ${totalClicks} clicks\n`;
                }
            }
            if (window.aiLandingPages.length > 0) {
                report += `<b>AI Assistant Landing Paths</b>\n`;
                for (const [index, page] of window.aiLandingPages.slice(0, 5).entries()) {
                    report += `${index + 1}. ${page.page} (${page.sessions} sessions / ${page.users} users)\n`;
                }
            }
        }
        report += `ℹ️ AI 單日為 0 不告警；Google AI Overviews / AI Mode 仍計入 Organic Search\n`;
        return report;
    }

    if (dataApiStatus === 'configured' && summary && dataDate) {
        const aiSummary = aiAssistantsSummary || { sessions: 0, users: 0, pageviews: 0 };
        report += `\n🔎 <b>來源拆分</b> (${dataDate})\n`;
        report += `Organic Search: Sessions ${summary.sessions} / Users ${summary.users} / Pageviews ${summary.pageviews}\n`;
        report += `AI Assistants: Sessions ${aiSummary.sessions} / Users ${aiSummary.users} / Pageviews ${aiSummary.pageviews}\n`;

        if (aiSources.length > 0) {
            report += `<b>Top AI Sources</b>\n`;
            for (const [index, source] of aiSources.entries()) {
                report += `${index + 1}. ${source.source} (${source.sessions} sessions / ${source.users} users)\n`;
            }
        }

        if (landingPages.length > 0) {
            report += `<b>Organic Top Landing Pages</b>\n`;
            for (const [index, page] of landingPages.entries()) {
                report += `${index + 1}. ${page.page} (${page.sessions} sessions / ${page.users} users)\n`;
            }
        }

        report += `ℹ️ Google AI Overviews / AI Mode 目前仍算在 Organic Search\n`;
        return report;
    }

    if (dataApiStatus === 'error' && dataApiError) {
        report += `\n⚠️ GA4 Data API 查詢失敗: ${dataApiError}\n`;
        return report;
    }

    if (dataApiStatus === 'skipped') {
        report += `\nℹ️ GA4 來源與 landing path 於每週報表查詢；本次只驗證前台埋碼與設定存在。\n`;
        return report;
    }

    if (!siteTagDetected && !siteTagError) {
        report += `\n⚠️ 尚未偵測到 GA4 前台埋碼，請優先檢查 layout / Tag 設定。\n`;
        return report;
    }

    report += `\nℹ️ 已確認網站前台埋碼；若要在日報中顯示 GA4 自然搜尋 / AI Assistants 拆分，還需補齊 Property ID 與 OAuth 設定。\n`;
    return report;
}

export function buildElapsedSection(elapsedSeconds: string): string {
    return `\n⏱️ 檢查耗時 ${elapsedSeconds}s`;
}
