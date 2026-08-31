import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "3f2ee42d161f4223b12db715cc59bf14";
const HOST = "https://www.hello-stay.com";

/**
 * Vercel Cron Job — 每天自動檢查已發布的文章並提交到 IndexNow
 * 排程: 每天 UTC 02:00 (台灣時間 10:00)
 * 設定在 vercel.json
 */
export async function GET(req: NextRequest) {
    // Verify Vercel cron secret (production) or key (manual trigger)
    const authHeader = req.headers.get("authorization");
    const keyParam = req.nextUrl.searchParams.get("key");
    const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
    const isManual = keyParam === INDEXNOW_KEY;

    if (!isVercelCron && !isManual) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all sitemap URLs dynamically
    const { default: sitemap } = await import("@/app/sitemap");
    const sitemapEntries = await sitemap();
    const allUrls = sitemapEntries.map((entry) => entry.url);

    // Submit to IndexNow
    const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            host: "www.hello-stay.com",
            key: INDEXNOW_KEY,
            keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: allUrls,
        }),
    });

    return NextResponse.json({
        success: true,
        indexnowStatus: response.status,
        totalSubmitted: allUrls.length,
        timestamp: new Date().toISOString(),
    });
}
