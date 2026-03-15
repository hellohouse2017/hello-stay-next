import { NextRequest, NextResponse } from "next/server";

/**
 * Instagram Comment API
 *
 * POST /api/social/comment
 * Body: { mediaId, message, account }
 *
 * GET /api/social/comment?mediaId=xxx&account=hellohouse
 * Returns comments on a specific IG media
 */

const PAGES = {
    hellohouse: {
        ig: {
            userId: "17841441000970951",
            tokenEnv: "IG_USER_TOKEN_HELLOHOUSE",
        },
    },
    ruins: {
        ig: {
            userId: "17841440220452213",
            tokenEnv: "IG_USER_TOKEN_RUINS",
        },
    },
};

const API_SECRET = (process.env.META_APP_SECRET || "").trim();

// ---------------------------------------------------------------------------
// Get comments on an IG media
// ---------------------------------------------------------------------------
async function getComments(mediaId: string, accessToken: string) {
    const fields = "id,text,username,timestamp,like_count";
    const res = await fetch(
        `https://graph.facebook.com/v21.0/${mediaId}/comments?fields=${fields}&access_token=${accessToken}`,
    );
    const data = await res.json();

    if (data.error) {
        return { success: false, error: data.error };
    }

    return {
        success: true,
        mediaId,
        count: data.data?.length || 0,
        comments: (data.data || []).map((c: Record<string, unknown>) => ({
            id: c.id,
            text: c.text,
            username: c.username,
            timestamp: c.timestamp,
            likeCount: c.like_count,
        })),
    };
}

// ---------------------------------------------------------------------------
// Post a comment on an IG media
// ---------------------------------------------------------------------------
async function postComment(mediaId: string, message: string, accessToken: string) {
    const res = await fetch(
        `https://graph.facebook.com/v21.0/${mediaId}/comments`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                access_token: accessToken,
            }),
        },
    );
    const data = await res.json();

    if (data.error) {
        return { success: false, error: data.error };
    }

    return {
        success: true,
        commentId: data.id,
        mediaId,
    };
}

// ---------------------------------------------------------------------------
// GET handler — read comments
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mediaId = req.nextUrl.searchParams.get("mediaId");
    if (!mediaId) {
        return NextResponse.json({
            error: "Missing mediaId",
            usage: "GET /api/social/comment?mediaId=xxx&account=hellohouse",
        });
    }

    const account = req.nextUrl.searchParams.get("account") || "hellohouse";
    const pageConfig = PAGES[account as keyof typeof PAGES];
    if (!pageConfig) {
        return NextResponse.json({ error: `Unknown account: ${account}` });
    }

    const token = process.env[pageConfig.ig.tokenEnv]?.trim();
    if (!token) {
        return NextResponse.json({ success: false, error: "IG token not configured" });
    }

    const result = await getComments(mediaId, token);
    return NextResponse.json(result);
}

// ---------------------------------------------------------------------------
// POST handler — post comment
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { mediaId, message, account = "hellohouse" } = body;

    if (!mediaId || !message) {
        return NextResponse.json({ error: "Missing mediaId or message" }, { status: 400 });
    }

    const pageConfig = PAGES[account as keyof typeof PAGES];
    if (!pageConfig) {
        return NextResponse.json({ error: `Unknown account: ${account}` });
    }

    const token = process.env[pageConfig.ig.tokenEnv]?.trim();
    if (!token) {
        return NextResponse.json({ success: false, error: "IG token not configured" });
    }

    const result = await postComment(mediaId, message, token);
    return NextResponse.json(result);
}
