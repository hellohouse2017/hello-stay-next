import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "3f2ee42d161f4223b12db715cc59bf14";
const HOST = "https://www.hello-stay.com";

/**
 * IndexNow API — 即時通知 Bing/Yandex 等搜尋引擎有新內容
 * 
 * 使用方式：
 * POST /api/indexnow
 * Body: { "urls": ["/blog/new-article", "/hellohouse"] }
 * Header: x-api-key: <INDEXNOW_KEY>
 * 
 * 或用 curl：
 * curl -X POST https://www.hello-stay.com/api/indexnow \
 *   -H "Content-Type: application/json" \
 *   -H "x-api-key: 3f2ee42d161f4223b12db715cc59bf14" \
 *   -d '{"urls":["/blog/new-article"]}'
 */
export async function POST(req: NextRequest) {
    // Simple key auth
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== INDEXNOW_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const paths: string[] = body.urls || [];

        if (paths.length === 0) {
            return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
        }

        const fullUrls = paths.map(p => p.startsWith("http") ? p : `${HOST}${p.startsWith("/") ? p : `/${p}`}`);

        // Submit to IndexNow (Bing endpoint)
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                host: "www.hello-stay.com",
                key: INDEXNOW_KEY,
                keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
                urlList: fullUrls,
            }),
        });

        return NextResponse.json({
            success: true,
            status: response.status,
            submitted: fullUrls.length,
            urls: fullUrls,
        });
    } catch (e) {
        return NextResponse.json({ error: "Failed to submit", detail: String(e) }, { status: 500 });
    }
}

// GET: Submit all important pages at once (useful for initial setup)
export async function GET(req: NextRequest) {
    const apiKey = req.nextUrl.searchParams.get("key");
    if (apiKey !== INDEXNOW_KEY) {
        return NextResponse.json({ error: "Provide ?key= parameter" }, { status: 401 });
    }

    const allPages = [
        "/", "/hellohouse", "/godin", "/dazhi", "/book",
        "/explore", "/traffic", "/packages", "/reviews",
        "/blog", "/capacity/10", "/capacity/20", "/capacity/30",
    ];

    const fullUrls = allPages.map(p => `${HOST}${p}`);

    const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            host: "www.hello-stay.com",
            key: INDEXNOW_KEY,
            keyLocation: `${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: fullUrls,
        }),
    });

    return NextResponse.json({
        success: true,
        status: response.status,
        submitted: fullUrls.length,
        urls: fullUrls,
    });
}
