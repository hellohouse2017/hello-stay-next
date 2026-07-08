export type SeoFetch = typeof fetch;

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
    hasTitle: boolean;
    hasDescription: boolean;
    hasJsonLd: boolean;
    hasOG: boolean;
    titleLength: number;
    descLength: number;
    issues: string[];
};

function containsCjk(text: string): boolean {
    return /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/.test(text);
}

function getDescriptionMinimumLength(description: string): number {
    return containsCjk(description) ? 50 : 80;
}

export async function checkRobotsTxt(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<boolean> {
    try {
        const res = await fetchImpl(`${siteUrl}/robots.txt`, { next: { revalidate: 0 } });
        return res.ok;
    } catch {
        return false;
    }
}

export async function checkSitemapXml(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<SitemapCheckResult> {
    try {
        const res = await fetchImpl(`${siteUrl}/sitemap.xml`, { next: { revalidate: 0 } });
        if (!res.ok) return { ok: false, pageCount: 0 };
        const xml = await res.text();
        return { ok: true, pageCount: (xml.match(/<url>/g) || []).length };
    } catch {
        return { ok: false, pageCount: 0 };
    }
}

export async function checkLlmsTxt(siteUrl: string, fetchImpl: SeoFetch = fetch): Promise<LlmsCheckResult> {
    try {
        const res = await fetchImpl(`${siteUrl}/llms.txt`, { next: { revalidate: 0 } });
        if (res.ok) {
            const data = await res.text();
            if (data.length > 100) return { ok: true, msg: '✅ llms.txt (AI 搜尋優化)' };
        }
        return { ok: false, msg: '❌ llms.txt' };
    } catch {
        return { ok: false, msg: '❌ llms.txt' };
    }
}

export async function checkJsonLdCoverage(siteUrl: string, paths: string[], fetchImpl: SeoFetch = fetch): Promise<JsonLdCoverageResult> {
    let okCount = 0;
    const total = paths.length;

    for (const path of paths) {
        try {
            const res = await fetchImpl(`${siteUrl}${path}`, { next: { revalidate: 0 } });
            if (res.ok) {
                const html = await res.text();
                if (html.includes('application/ld+json')) okCount++;
            }
        } catch {
            // ignore individual page failures; coverage will reflect misses
        }
    }

    return { ok: okCount === total, okCount, total };
}

export async function inspectPageMetadata(
    siteUrl: string,
    path: string,
    name: string,
    fetchImpl: SeoFetch = fetch
): Promise<PageMetadataCheck> {
    const issues: string[] = [];

    try {
        const res = await fetchImpl(`${siteUrl}${path}`, { next: { revalidate: 0 } });
        const html = await res.text();

        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/);
        const title = titleMatch?.[1] || '';
        const hasTitle = title.length > 0;
        if (!hasTitle) issues.push('❌ 缺少 title');
        else if (title.length < 20) issues.push(`⚠️ title 太短 (${title.length}字)`);
        else if (title.length > 70) issues.push(`⚠️ title 太長 (${title.length}字)`);

        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
        const desc = descMatch?.[1] || '';
        const hasDescription = desc.length > 0;
        if (!hasDescription) issues.push('❌ 缺少 meta description');
        else if (desc.length < getDescriptionMinimumLength(desc)) issues.push(`⚠️ description 太短 (${desc.length}字)`);
        else if (desc.length > 200) issues.push(`⚠️ description 太長 (${desc.length}字)`);

        const hasJsonLd = html.includes('application/ld+json');
        if (!hasJsonLd) issues.push('❌ 缺少 JSON-LD');

        const hasOG = html.includes('og:title') || html.includes('property="og:');
        if (!hasOG) issues.push('⚠️ 缺少 OG tags');

        return {
            name,
            path,
            status: res.status,
            hasTitle,
            hasDescription,
            hasJsonLd,
            hasOG,
            titleLength: title.length,
            descLength: desc.length,
            issues,
        };
    } catch (error) {
        return {
            name,
            path,
            status: 0,
            hasTitle: false,
            hasDescription: false,
            hasJsonLd: false,
            hasOG: false,
            titleLength: 0,
            descLength: 0,
            issues: [`❌ 無法訪問: ${error}`],
        };
    }
}
