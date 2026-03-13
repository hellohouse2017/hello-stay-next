import { NextRequest, NextResponse } from "next/server";

type PageKey = "hellohouse" | "ruins";

interface PageConfig {
    id: string;        // Facebook Page ID
    tokenEnv: string;  // FB Page Token env var name
    name: string;
    ig?: {
        userId: string;    // IG Business Account ID
        tokenEnv: string;  // IG User Token env var name
    };
    threads?: {
        userId: string;    // Threads User ID
        tokenEnv: string;  // Threads Access Token env var name
    };
}

const PAGES: Record<PageKey, PageConfig> = {
    hellohouse: {
        id: "624684244350308",
        tokenEnv: "FB_PAGE_TOKEN_HELLOHOUSE",
        name: "你好哇寓所",
        ig: {
            userId: "17841441000970951",
            tokenEnv: "IG_USER_TOKEN_HELLOHOUSE",
        },
        threads: {
            userId: "72085024476",
            tokenEnv: "THREADS_USER_TOKEN_HELLOHOUSE",
        },
    },
    ruins: {
        id: "2164459177210502",
        tokenEnv: "FB_PAGE_TOKEN_RUINS",
        name: "廢墟Bar",
        ig: {
            userId: "17841440220452213",
            tokenEnv: "IG_USER_TOKEN_RUINS",
        },
        threads: {
            userId: "67147415179",
            tokenEnv: "THREADS_USER_TOKEN_RUINS",
        },
    },
};

const API_SECRET = (process.env.META_APP_SECRET || "").trim();

// ---------------------------------------------------------------------------
// Helper: publish to Instagram (2-step: create container → publish)
// ---------------------------------------------------------------------------
async function publishToInstagram(
    igUserId: string,
    token: string,
    message: string,
    imageUrl?: string,
    link?: string,
): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
        // IG requires an image for feed posts — skip if no image
        if (!imageUrl) {
            return { success: false, error: "Instagram requires an image — skipped (text-only post)" };
        }

        // Step 1: Create media container
        const caption = link ? `${message}\n\n🔗 ${link}` : message;
        const containerRes = await fetch(
            `https://graph.instagram.com/v21.0/${igUserId}/media`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image_url: imageUrl,
                    caption,
                    access_token: token,
                }),
            },
        );
        const containerData = await containerRes.json();
        if (!containerData.id) {
            return { success: false, error: "Failed to create IG container", data: containerData };
        }

        // Step 2: Publish
        const publishRes = await fetch(
            `https://graph.instagram.com/v21.0/${igUserId}/media_publish`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    creation_id: containerData.id,
                    access_token: token,
                }),
            },
        );
        const publishData = await publishRes.json();
        return { success: !!publishData.id, data: publishData };
    } catch (e) {
        return { success: false, error: `Instagram error: ${String(e)}` };
    }
}

// ---------------------------------------------------------------------------
// Helper: publish to Threads
// ---------------------------------------------------------------------------
async function publishToThreads(
    threadsUserId: string,
    token: string,
    message: string,
    imageUrl?: string,
    link?: string,
): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
        // Build text content with optional link
        const text = link ? `${message}\n\n🔗 ${link}` : message;

        if (imageUrl) {
            // Image post — 2-step flow
            // Step 1: Create container
            const containerRes = await fetch(
                `https://graph.threads.net/v1.0/${threadsUserId}/threads`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        media_type: "IMAGE",
                        image_url: imageUrl,
                        text,
                        access_token: token,
                    }),
                },
            );
            const containerData = await containerRes.json();
            if (!containerData.id) {
                return { success: false, error: "Failed to create Threads container", data: containerData };
            }

            // Step 2: Publish
            const publishRes = await fetch(
                `https://graph.threads.net/v1.0/${threadsUserId}/threads_publish`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        creation_id: containerData.id,
                        access_token: token,
                    }),
                },
            );
            const publishData = await publishRes.json();
            return { success: !!publishData.id, data: publishData };
        } else {
            // Text post — single step with auto_publish_text
            const res = await fetch(
                `https://graph.threads.net/v1.0/${threadsUserId}/threads`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        media_type: "TEXT",
                        text,
                        link_attachment: link || undefined,
                        access_token: token,
                        auto_publish_text: true,
                    }),
                },
            );
            const data = await res.json();
            return { success: !!data.id, data };
        }
    } catch (e) {
        return { success: false, error: `Threads error: ${String(e)}` };
    }
}

/**
 * Social Media Publishing API — Facebook + Instagram + Threads
 *
 * POST /api/social/publish
 * Headers: x-api-key: <META_APP_SECRET>
 * Body: {
 *   "page": "hellohouse" | "ruins",
 *   "message": "你的貼文內容...",
 *   "link": "https://...",        // 可選，附加連結
 *   "imageUrl": "https://...",    // 可選，附加圖片（IG 必須有圖片）
 *   "platforms": ["facebook", "instagram", "threads"]  // 可選，指定平台，預設全部
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
        const { page, message, link, imageUrl, platforms } = body as {
            page: PageKey;
            message: string;
            link?: string;
            imageUrl?: string;
            platforms?: string[];
        };

        if (!page || !message) {
            return NextResponse.json(
                { error: "Missing required fields: page, message" },
                { status: 400 },
            );
        }

        const pageConfig = PAGES[page];
        if (!pageConfig) {
            return NextResponse.json(
                { error: `Invalid page. Use: ${Object.keys(PAGES).join(", ")}` },
                { status: 400 },
            );
        }

        // Determine which platforms to publish to
        const allPlatforms = ["facebook", "instagram", "threads"];
        const targetPlatforms = platforms && platforms.length > 0
            ? platforms.filter((p) => allPlatforms.includes(p))
            : allPlatforms;

        const results: Record<string, unknown> = {};

        // --- Facebook ---
        if (targetPlatforms.includes("facebook")) {
            const fbToken = process.env[pageConfig.tokenEnv]?.trim();
            if (!fbToken) {
                results.facebook = { success: false, error: "Token not configured" };
            } else {
                try {
                    if (imageUrl) {
                        const fbRes = await fetch(
                            `https://graph.facebook.com/v21.0/${pageConfig.id}/photos`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    url: imageUrl,
                                    message,
                                    access_token: fbToken,
                                }),
                            },
                        );
                        const fbData = await fbRes.json();
                        results.facebook = { success: !!fbData.id || !!fbData.post_id, data: fbData };
                    } else {
                        const params: Record<string, string> = {
                            message,
                            access_token: fbToken,
                        };
                        if (link) params.link = link;

                        const fbRes = await fetch(
                            `https://graph.facebook.com/v21.0/${pageConfig.id}/feed`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(params),
                            },
                        );
                        const fbData = await fbRes.json();
                        results.facebook = { success: !!fbData.id, data: fbData };
                    }
                } catch (e) {
                    results.facebook = { success: false, error: `Facebook error: ${String(e)}` };
                }
            }
        }

        // --- Instagram ---
        if (targetPlatforms.includes("instagram") && pageConfig.ig) {
            const igToken = process.env[pageConfig.ig.tokenEnv]?.trim();
            const igUserId = pageConfig.ig.userId;
            if (!igToken || !igUserId) {
                results.instagram = { success: false, error: "IG token or user ID not configured — skipped" };
            } else {
                results.instagram = await publishToInstagram(igUserId, igToken, message, imageUrl, link);
            }
        }

        // --- Threads ---
        if (targetPlatforms.includes("threads") && pageConfig.threads) {
            const threadsToken = process.env[pageConfig.threads.tokenEnv]?.trim();
            const threadsUserId = pageConfig.threads.userId;
            if (!threadsToken || !threadsUserId) {
                results.threads = { success: false, error: "Threads token or user ID not configured — skipped" };
            } else {
                results.threads = await publishToThreads(threadsUserId, threadsToken, message, imageUrl, link);
            }
        }

        // Summary
        const published = Object.entries(results)
            .filter(([, v]) => (v as { success: boolean }).success)
            .map(([k]) => k);
        const failed = Object.entries(results)
            .filter(([, v]) => !(v as { success: boolean }).success)
            .map(([k]) => k);

        return NextResponse.json({
            success: published.length > 0,
            page: pageConfig.name,
            pageId: pageConfig.id,
            published,
            failed,
            results,
        });
    } catch (e) {
        return NextResponse.json(
            { error: "Failed to publish", detail: String(e) },
            { status: 500 },
        );
    }
}

/**
 * GET /api/social/publish — List available pages & platforms
 */
export async function GET() {
    return NextResponse.json({
        pages: Object.entries(PAGES).map(([key, p]) => ({
            key,
            name: p.name,
            facebookPageId: p.id,
            instagram: p.ig ? {
                configured: !!(process.env[p.ig.tokenEnv] && p.ig.userId),
                userId: p.ig.userId || null,
            } : null,
            threads: p.threads ? {
                configured: !!(process.env[p.threads.tokenEnv] && p.threads.userId),
                userId: p.threads.userId || null,
            } : null,
        })),
        usage: {
            method: "POST",
            headers: { "x-api-key": "your-api-secret" },
            body: {
                page: "hellohouse | ruins",
                message: "貼文內容",
                link: "(可選) 附加連結",
                imageUrl: "(可選) 圖片 URL — IG 必須有圖",
                platforms: "(可選) ['facebook','instagram','threads'] — 預設全部",
            },
        },
    });
}
