import { NextRequest, NextResponse } from "next/server";

type PageKey = "hellohouse" | "ruins";

const PAGES: Record<PageKey, { id: string; tokenEnv: string; name: string }> = {
    hellohouse: {
        id: "624684244350308",
        tokenEnv: "FB_PAGE_TOKEN_HELLOHOUSE",
        name: "你好哇寓所",
    },
    ruins: {
        id: "2164459177210502",
        tokenEnv: "FB_PAGE_TOKEN_RUINS",
        name: "廢墟Bar",
    },
};

const API_SECRET = process.env.META_APP_SECRET || "";

/**
 * Social Media Publishing API
 *
 * POST /api/social/publish
 * Headers: x-api-key: <META_APP_SECRET>
 * Body: {
 *   "page": "hellohouse" | "ruins",
 *   "message": "你的貼文內容...",
 *   "link": "https://...", // 可選，附加連結
 *   "imageUrl": "https://...", // 可選，附加圖片
 * }
 */
export async function POST(req: NextRequest) {
    // Auth
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { page, message, link, imageUrl } = body as {
            page: PageKey;
            message: string;
            link?: string;
            imageUrl?: string;
        };

        if (!page || !message) {
            return NextResponse.json(
                { error: "Missing required fields: page, message" },
                { status: 400 }
            );
        }

        const pageConfig = PAGES[page];
        if (!pageConfig) {
            return NextResponse.json(
                { error: `Invalid page. Use: ${Object.keys(PAGES).join(", ")}` },
                { status: 400 }
            );
        }

        const token = process.env[pageConfig.tokenEnv];
        if (!token) {
            return NextResponse.json(
                { error: `Token not configured for ${page}` },
                { status: 500 }
            );
        }

        const results: Record<string, unknown> = {};

        // --- Facebook Post ---
        if (imageUrl) {
            // Photo post
            const fbRes = await fetch(
                `https://graph.facebook.com/v21.0/${pageConfig.id}/photos`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: imageUrl,
                        message,
                        access_token: token,
                    }),
                }
            );
            results.facebook = await fbRes.json();
        } else {
            // Text/link post
            const params: Record<string, string> = {
                message,
                access_token: token,
            };
            if (link) params.link = link;

            const fbRes = await fetch(
                `https://graph.facebook.com/v21.0/${pageConfig.id}/feed`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(params),
                }
            );
            results.facebook = await fbRes.json();
        }

        return NextResponse.json({
            success: true,
            page: pageConfig.name,
            pageId: pageConfig.id,
            results,
        });
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to publish", detail: String(e) },
            { status: 500 }
        );
    }
}

/**
 * GET /api/social/publish — List available pages
 */
export async function GET() {
    return NextResponse.json({
        pages: Object.entries(PAGES).map(([key, p]) => ({
            key,
            name: p.name,
            id: p.id,
        })),
        usage: {
            method: "POST",
            headers: { "x-api-key": "your-api-secret" },
            body: {
                page: "hellohouse | ruins",
                message: "貼文內容",
                link: "(可選) 附加連結",
                imageUrl: "(可選) 圖片 URL",
            },
        },
    });
}
