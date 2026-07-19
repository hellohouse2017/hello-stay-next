import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';

export type SeoFetch = typeof fetch;

export type SeoIssueSeverity = 'critical' | 'warning' | 'opportunity';

export type SeoIssue = {
    severity: SeoIssueSeverity;
    code: string;
    path: string;
    message: string;
    fingerprint: string;
};

export type SitemapCheckResult = {
    ok: boolean;
    pageCount: number;
};

export type LlmsCheckResult = {
    ok: boolean;
    msg: string;
};

export type JsonLdCoverageResult = {
    ok: boolean;
    okCount: number;
    total: number;
};

export type PageMetadataCheck = {
    name: string;
    path: string;
    status: number;
    redirectTarget?: string | null;
    hasTitle: boolean;
    hasDescription: boolean;
    hasJsonLd: boolean;
    hasOG: boolean;
    titleLength: number;
    descLength: number;
    canonical?: string | null;
    htmlLang?: string | null;
    h1Count?: number;
    internalLinks?: string[];
    hreflangs?: Record<string, string>;
    seoIssues?: SeoIssue[];
    /** Compatibility field for the existing report and API clients. */
    issues: string[];
};

export type SitemapHealthCheck = {
    sitemap: SitemapCheckResult;
    pages: PageMetadataCheck[];
    issues: SeoIssue[];
};

const ISSUE_MARKERS: Record<SeoIssueSeverity, string> = {
    critical: '❌',
    warning: '⚠️',
    opportunity: '💡',
};

function containsCjk(text: string): boolean {
    return /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/.test(text);
}

function getDescriptionMinimumLength(description: string): number {
    return containsCjk(description) ? 50 : 80;
}

function normalizePathname(value: string): string {
    const pathname = new URL(value, 'https://seo.local').pathname;
    if (pathname === '/') return '/';
    return pathname.replace(/\/+$/, '');
}

function normalizeUrl(value: string): string {
    const url = new URL(value);
    url.hash = '';
    url.search = '';
    url.pathname = normalizePathname(url.pathname);
    return url.toString().replace(/\/$/, url.pathname === '/' ? '/' : '');
}

function createIssue(severity: SeoIssueSeverity, code: string, path: string, message: string): SeoIssue {
    return {
        severity,
        code,
        path,
        message,
        fingerprint: `${severity}:${code}:${path}`,
    };
}

export function formatSeoIssue(issue: SeoIssue): string {
    return `${ISSUE_MARKERS[issue.severity]} ${issue.message}`;
}

function appendIssue(target: SeoIssue[], severity: SeoIssueSeverity, code: string, path: string, message: string) {
    target.push(createIssue(severity, code, path, message));
}

function flattenJsonLdTypes(value: unknown, result = new Set<string>()): Set<string> {
    if (Array.isArray(value)) {
        for (const entry of value) flattenJsonLdTypes(entry, result);
        return result;
    }
    if (!value || typeof value !== 'object') return result;

    const record = value as Record<string, unknown>;
    const type = record['@type'];
    if (typeof type === 'string') result.add(type);
    if (Array.isArray(type)) {
        for (const entry of type) if (typeof entry === 'string') result.add(entry);
    }
    for (const nested of Object.values(record)) flattenJsonLdTypes(nested, result);
    return result;
}

function collectFaqQuestions(value: unknown, result: string[] = []): string[] {
    if (Array.isArray(value)) {
        for (const entry of value) collectFaqQuestions(entry, result);
        return result;
    }
    if (!value || typeof value !== 'object') return result;
    const record = value as Record<string, unknown>;
    if (record['@type'] === 'Question' && typeof record.name === 'string') result.push(record.name.trim());
    for (const nested of Object.values(record)) collectFaqQuestions(nested, result);
    return result;
}

function parseSitemapUrls(xml: string): string[] {
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml) as {
        urlset?: { url?: Array<{ loc?: string }> | { loc?: string } };
    };
    const entries = parsed.urlset?.url;
    if (!entries) return [];
    return (Array.isArray(entries) ? entries : [entries])
        .map((entry) => entry.loc?.trim() || '')
        .filter(Boolean);
}

function countSitemapEntries(xml: string): number {
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml) as {
        urlset?: { url?: unknown[] | unknown };
    };
    const entries = parsed.urlset?.url;
    if (!entries) return 0;
    return Array.isArray(entries) ? entries.length : 1;
}

function expectedHtmlLang(path: string): string {
    const locale = path.match(/^\/(en|ja|ko|vi)(?:\/|$)/)?.[1];
    return locale || 'zh';
}

function isHtmlLangValid(path: string, lang: string | null): boolean {
    if (!lang) return false;
    return lang.toLowerCase().startsWith(expectedHtmlLang(path));
}

function requiredSchemaTypes(path: string): string[] {
    if (['/hellohouse', '/godin', '/en/hellohouse', '/en/godin', '/ja/hellohouse', '/ja/godin', '/ko/hellohouse', '/ko/godin', '/vi/hellohouse', '/vi/godin'].includes(path)) {
        return ['LodgingBusiness'];
    }
    if (path.startsWith('/blog/') || /^\/(en|ja|ko|vi)\/blog\//.test(path)) {
        return ['Article', 'BreadcrumbList'];
    }
    if (['/blog', '/guide', '/explore', '/explore/food', '/explore/spots', '/en/guide', '/ja/guide', '/ko/guide', '/vi/guide'].includes(path)) {
        return ['CollectionPage'];
    }
    return [];
}

async function inspectUrl(url: string, siteOrigin: string, fetchImpl: SeoFetch): Promise<PageMetadataCheck> {
    const path = normalizePathname(url);
    const issues: SeoIssue[] = [];
    let response: Response;

    try {
        response = await fetchImpl(url, { redirect: 'manual', cache: 'no-store' });
    } catch (error) {
        appendIssue(issues, 'critical', 'fetch_failed', path, `無法訪問: ${error instanceof Error ? error.message : String(error)}`);
        return buildEmptyPage(path, 0, issues);
    }

    const redirectTarget = response.headers.get('location');
    if (response.status >= 300 && response.status < 400) {
        appendIssue(issues, 'critical', 'sitemap_redirect', path, `Sitemap URL 發生 ${response.status} 轉址${redirectTarget ? ` → ${redirectTarget}` : ''}`);
        return buildEmptyPage(path, response.status, issues, redirectTarget);
    }
    if (!response.ok) {
        appendIssue(issues, 'critical', 'http_status', path, `HTTP 狀態 ${response.status}`);
        return buildEmptyPage(path, response.status, issues);
    }

    const html = await response.text();
    const $ = load(html);
    const title = $('title').first().text().trim();
    const description = $('meta[name="description"]').first().attr('content')?.trim() || '';
    const canonicalRaw = $('link[rel="canonical"]').first().attr('href')?.trim() || null;
    const canonical = canonicalRaw ? new URL(canonicalRaw, siteOrigin).toString() : null;
    const robots = $('meta[name="robots"]').attr('content')?.toLowerCase() || '';
    const htmlLang = $('html').attr('lang')?.trim() || null;
    const h1Count = $('h1').length;
    const ogUrl = $('meta[property="og:url"]').attr('content')?.trim() || '';
    const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || '';
    const hreflangs: Record<string, string> = {};
    $('link[rel="alternate"][hreflang]').filter((_, element) => {
        const type = $(element).attr('type')?.toLowerCase();
        return !type || type === 'text/html';
    }).each((_, element) => {
        const hreflang = $(element).attr('hreflang')?.toLowerCase().trim();
        const href = $(element).attr('href')?.trim();
        if (hreflang && href) hreflangs[hreflang] = new URL(href, siteOrigin).toString();
    });

    if (!title) appendIssue(issues, 'critical', 'title_missing', path, '缺少 title');
    else if (title.length < 20) appendIssue(issues, 'opportunity', 'title_short', path, `title 太短 (${title.length}字)`);
    else if (title.length > 70) appendIssue(issues, 'opportunity', 'title_long', path, `title 太長 (${title.length}字)`);

    if (!description) appendIssue(issues, 'warning', 'description_missing', path, '缺少 meta description');
    else if (description.length < getDescriptionMinimumLength(description)) appendIssue(issues, 'opportunity', 'description_short', path, `description 太短 (${description.length}字)`);
    else if (description.length > 200) appendIssue(issues, 'opportunity', 'description_long', path, `description 太長 (${description.length}字)`);

    if (!canonical) appendIssue(issues, 'critical', 'canonical_missing', path, '缺少 canonical');
    else if (normalizeUrl(canonical) !== normalizeUrl(url)) appendIssue(issues, 'critical', 'canonical_mismatch', path, `canonical 非自我指向 (${canonical})`);
    if (robots.includes('noindex')) appendIssue(issues, 'critical', 'public_noindex', path, 'Sitemap 公開頁含 noindex');
    if (h1Count !== 1) appendIssue(issues, h1Count === 0 ? 'critical' : 'warning', 'h1_count', path, `H1 數量為 ${h1Count}，預期 1`);
    if (!ogUrl) appendIssue(issues, 'opportunity', 'og_url_missing', path, '缺少 og:url');
    else if (normalizeUrl(new URL(ogUrl, siteOrigin).toString()) !== normalizeUrl(url)) appendIssue(issues, 'warning', 'og_url_mismatch', path, `og:url 與頁面不一致 (${ogUrl})`);
    if (!ogImage) appendIssue(issues, 'opportunity', 'og_image_missing', path, '缺少 og:image');
    if (!isHtmlLangValid(path, htmlLang)) appendIssue(issues, 'warning', 'html_lang_mismatch', path, `HTML lang 不正確 (${htmlLang || 'missing'})`);

    const jsonLdValues: unknown[] = [];
    $('script[type="application/ld+json"]').each((_, element) => {
        const raw = $(element).text().trim();
        if (!raw) return;
        try {
            jsonLdValues.push(JSON.parse(raw));
        } catch {
            appendIssue(issues, 'critical', 'jsonld_invalid', path, 'JSON-LD 無法解析');
        }
    });
    const hasJsonLd = jsonLdValues.length > 0;
    const requiredTypes = requiredSchemaTypes(path);
    if (!hasJsonLd) appendIssue(issues, requiredTypes.length > 0 ? 'warning' : 'opportunity', 'jsonld_missing', path, '缺少 JSON-LD');
    const schemaTypes = flattenJsonLdTypes(jsonLdValues);
    for (const type of requiredTypes) {
        if (!schemaTypes.has(type)) appendIssue(issues, 'warning', 'schema_type_missing', path, `缺少 ${type} schema`);
    }
    if (schemaTypes.has('FAQPage')) {
        const bodyText = $('body').text().replace(/\s+/g, ' ');
        const hiddenQuestion = collectFaqQuestions(jsonLdValues).find((question) => !bodyText.includes(question));
        if (hiddenQuestion) appendIssue(issues, 'critical', 'faq_not_visible', path, `FAQ schema 問題未出現在可見頁面: ${hiddenQuestion}`);
    }

    const internalLinks = new Set<string>();
    $('a[href]').each((_, element) => {
        const href = $(element).attr('href')?.trim();
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
        try {
            const target = new URL(href, url);
            if (target.origin !== siteOrigin || /^\/(api|admin|go)(?:\/|$)/.test(target.pathname)) return;
            internalLinks.add(normalizePathname(target.pathname));
        } catch {
            appendIssue(issues, 'warning', 'link_invalid', path, `無法解析內部連結: ${href}`);
        }
    });

    return {
        name: path === '/' ? '首頁' : path,
        path,
        status: response.status,
        redirectTarget,
        hasTitle: title.length > 0,
        hasDescription: description.length > 0,
        hasJsonLd,
        hasOG: $('meta[property^="og:"]').length > 0,
        titleLength: title.length,
        descLength: description.length,
        canonical,
        htmlLang,
        h1Count,
        internalLinks: [...internalLinks],
        hreflangs,
        seoIssues: issues,
        issues: issues.map(formatSeoIssue),
    };
}

function buildEmptyPage(path: string, status: number, issues: SeoIssue[], redirectTarget: string | null = null): PageMetadataCheck {
    return {
        name: path === '/' ? '首頁' : path,
        path,
        status,
        redirectTarget,
        hasTitle: false,
        hasDescription: false,
        hasJsonLd: false,
        hasOG: false,
        titleLength: 0,
        descLength: 0,
        canonical: null,
        htmlLang: null,
        h1Count: 0,
        internalLinks: [],
        hreflangs: {},
        seoIssues: issues,
        issues: issues.map(formatSeoIssue),
    };
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
    const results = new Array<R>(items.length);
    let cursor = 0;
    async function worker() {
        while (cursor < items.length) {
            const index = cursor++;
            results[index] = await mapper(items[index]);
        }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
    return results;
}

export async function crawlSitemapHealth(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<SitemapHealthCheck> {
    const siteOrigin = new URL(siteUrl).origin;
    let sitemapResponse: Response;
    try {
        sitemapResponse = await fetchImpl(`${siteOrigin}/sitemap.xml`, { cache: 'no-store' });
    } catch {
        return { sitemap: { ok: false, pageCount: 0 }, pages: [], issues: [createIssue('critical', 'sitemap_fetch_failed', '/sitemap.xml', '無法取得 sitemap.xml')] };
    }
    if (!sitemapResponse.ok) {
        return { sitemap: { ok: false, pageCount: 0 }, pages: [], issues: [createIssue('critical', 'sitemap_http_status', '/sitemap.xml', `sitemap.xml HTTP ${sitemapResponse.status}`)] };
    }

    let urls: string[];
    try {
        urls = [...new Set(parseSitemapUrls(await sitemapResponse.text()).map((url) => normalizeUrl(url)))];
    } catch {
        return { sitemap: { ok: false, pageCount: 0 }, pages: [], issues: [createIssue('critical', 'sitemap_invalid_xml', '/sitemap.xml', 'sitemap.xml 無法解析')] };
    }
    const sitemap = { ok: urls.length > 0, pageCount: urls.length };
    const sitemapIssues: SeoIssue[] = [];
    for (const url of urls) {
        if (new URL(url).origin !== siteOrigin) appendIssue(sitemapIssues, 'critical', 'sitemap_external_url', '/sitemap.xml', `Sitemap 含站外 URL: ${url}`);
    }
    const localUrls = urls.filter((url) => new URL(url).origin === siteOrigin);
    const pages = await mapWithConcurrency(localUrls, 8, (url) => inspectUrl(url, siteOrigin, fetchImpl));
    const pageByPath = new Map(pages.map((page) => [page.path, page]));

    for (const page of pages) {
        const pageIssues = page.seoIssues ?? [];
        const sourceUrl = `${siteOrigin}${page.path === '/' ? '' : page.path}`;
        const hreflangEntries = Object.entries(page.hreflangs ?? {});
        for (const [language, targetRaw] of hreflangEntries) {
            const targetPath = normalizePathname(targetRaw);
            const targetPage = pageByPath.get(targetPath);
            if (!targetPage) {
                appendIssue(pageIssues, 'warning', 'hreflang_target_missing', page.path, `hreflang ${language} 指向非 sitemap URL: ${targetPath}`);
                continue;
            }
            const reciprocal = Object.values(targetPage.hreflangs ?? {}).some((value) => normalizeUrl(value) === normalizeUrl(sourceUrl));
            if (!reciprocal && language !== 'x-default') appendIssue(pageIssues, 'warning', 'hreflang_not_reciprocal', page.path, `hreflang ${language} 缺少 reciprocal 回鏈`);
        }
        if (/^\/(en|ja|ko|vi)(?:\/|$)/.test(page.path) && hreflangEntries.length === 0) {
            appendIssue(pageIssues, 'warning', 'hreflang_missing', page.path, '外語頁缺少 hreflang');
        }
        page.issues = pageIssues.map(formatSeoIssue);
    }

    const linkedPaths = [...new Set(pages.flatMap((page) => page.internalLinks ?? []))];
    const missingFromSitemap = linkedPaths.filter((path) => !pageByPath.has(path));
    const linkedStatusEntries = await mapWithConcurrency(missingFromSitemap, 8, async (path) => {
        try {
            const response = await fetchImpl(`${siteOrigin}${path}`, { redirect: 'manual', cache: 'no-store' });
            return [path, { status: response.status, location: response.headers.get('location') }] as const;
        } catch {
            return [path, { status: 0, location: null }] as const;
        }
    });
    const linkedStatuses = new Map(linkedStatusEntries);
    for (const page of pages) {
        const pageIssues = page.seoIssues ?? [];
        for (const targetPath of page.internalLinks ?? []) {
            const crawledTarget = pageByPath.get(targetPath);
            const status = crawledTarget?.status ?? linkedStatuses.get(targetPath)?.status ?? 0;
            if (status === 0 || status >= 400) appendIssue(pageIssues, 'critical', 'internal_link_broken', page.path, `內部連結 ${targetPath} 回應 ${status || '失敗'}`);
            else if (status >= 300) appendIssue(pageIssues, 'warning', 'internal_link_redirect', page.path, `內部連結 ${targetPath} 發生 ${status} 轉址`);
        }
        page.issues = pageIssues.map(formatSeoIssue);
    }

    return {
        sitemap,
        pages,
        issues: [...sitemapIssues, ...pages.flatMap((page) => page.seoIssues ?? [])],
    };
}

export async function checkRobotsTxt(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<boolean> {
    try {
        const res = await fetchImpl(`${siteUrl}/robots.txt`, { next: { revalidate: 0 } });
        if (!res.ok) return false;
        const body = await res.text();
        return !/^\s*Disallow:\s*\/_next\//im.test(body);
    } catch {
        return false;
    }
}

export async function checkSitemapXml(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<SitemapCheckResult> {
    try {
        const res = await fetchImpl(`${siteUrl}/sitemap.xml`, { next: { revalidate: 0 } });
        if (!res.ok) return { ok: false, pageCount: 0 };
        const pageCount = countSitemapEntries(await res.text());
        return { ok: pageCount > 0, pageCount };
    } catch {
        return { ok: false, pageCount: 0 };
    }
}

export async function checkLlmsTxt(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<LlmsCheckResult> {
    try {
        const res = await fetchImpl(`${siteUrl}/llms.txt`, { next: { revalidate: 0 } });
        if (res.ok && (await res.text()).length > 100) return { ok: true, msg: '✅ llms.txt (AI 搜尋優化)' };
        return { ok: false, msg: '❌ llms.txt' };
    } catch {
        return { ok: false, msg: '❌ llms.txt' };
    }
}

export async function checkJsonLdCoverage(siteUrl: string, paths: string[], fetchImpl: SeoFetch = fetch): Promise<JsonLdCoverageResult> {
    const results = await mapWithConcurrency(paths, 8, async (path) => {
        try {
            const res = await fetchImpl(`${siteUrl}${path}`, { next: { revalidate: 0 } });
            return res.ok && (await res.text()).includes('application/ld+json');
        } catch {
            return false;
        }
    });
    const okCount = results.filter(Boolean).length;
    return { ok: okCount === paths.length, okCount, total: paths.length };
}

export async function inspectPageMetadata(siteUrl: string, path: string, name: string, fetchImpl: SeoFetch = fetch): Promise<PageMetadataCheck> {
    const page = await inspectUrl(`${siteUrl}${path}`, new URL(siteUrl).origin, fetchImpl);
    const legacyCodes = new Set([
        'fetch_failed', 'http_status', 'title_missing', 'title_short', 'title_long',
        'description_missing', 'description_short', 'description_long', 'jsonld_missing', 'jsonld_invalid',
    ]);
    const seoIssues = (page.seoIssues ?? []).filter((issue) => legacyCodes.has(issue.code));
    if (!page.hasOG) seoIssues.push(createIssue('warning', 'og_missing', path, '缺少 OG tags'));
    return { ...page, name, seoIssues, issues: seoIssues.map(formatSeoIssue) };
}
