import { NextRequest, NextResponse } from "next/server";

/**
 * Social Media Keyword Search API
 *
 * GET /api/social/search?q=高雄包棟&platform=threads&type=recent
 *
 * Searches Threads (and optionally IG) for posts matching keywords.
 */

const PAGES = {
    hellohouse: {
        threads: {
            userId: "72085024476",
            tokenEnv: "THREADS_USER_TOKEN_HELLOHOUSE",
        },
        ig: {
            userId: "17841441000970951",
            tokenEnv: "IG_USER_TOKEN_HELLOHOUSE",
        },
    },
    ruins: {
        threads: {
            userId: "67147415179",
            tokenEnv: "THREADS_USER_TOKEN_RUINS",
        },
        ig: {
            userId: "17841440220452213",
            tokenEnv: "IG_USER_TOKEN_RUINS",
        },
    },
};

const API_SECRET = (process.env.META_APP_SECRET || "").trim();

// ---------------------------------------------------------------------------
// Threads keyword search
// ---------------------------------------------------------------------------
async function searchThreads(
    query: string,
    accessToken: string,
    searchType: string = "RECENT",
) {
    const fields = "id,text,username,permalink,timestamp,media_type,media_url";
    const url = `https://graph.threads.net/v1.0/keyword_search?q=${encodeURIComponent(query)}&search_type=${searchType}&fields=${fields}&access_token=${accessToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
        return { success: false, error: data.error };
    }

    return {
        success: true,
        platform: "threads",
        query,
        count: data.data?.length || 0,
        posts: (data.data || []).map((post: Record<string, unknown>) => ({
            id: post.id,
            text: post.text,
            username: post.username,
            permalink: post.permalink,
            timestamp: post.timestamp,
            mediaType: post.media_type,
            mediaUrl: post.media_url,
        })),
    };
}

// ---------------------------------------------------------------------------
// Instagram hashtag search
// ---------------------------------------------------------------------------
async function searchInstagram(
    query: string,
    igUserId: string,
    accessToken: string,
) {
    // Step 1: Get hashtag ID
    const hashtagRes = await fetch(
        `https://graph.facebook.com/v21.0/ig_hashtag_search?q=${encodeURIComponent(query)}&user_id=${igUserId}&access_token=${accessToken}`,
    );
    const hashtagData = await hashtagRes.json();

    if (!hashtagData.data?.[0]?.id) {
        return { success: false, error: hashtagData.error || "Hashtag not found" };
    }

    const hashtagId = hashtagData.data[0].id;

    // Step 2: Get recent media for this hashtag
    const fields = "id,caption,permalink,timestamp,media_type,media_url,like_count,comments_count";
    const mediaRes = await fetch(
        `https://graph.facebook.com/v21.0/${hashtagId}/recent_media?user_id=${igUserId}&fields=${fields}&access_token=${accessToken}`,
    );
    const mediaData = await mediaRes.json();

    if (mediaData.error) {
        return { success: false, error: mediaData.error };
    }

    return {
        success: true,
        platform: "instagram",
        query,
        hashtagId,
        count: mediaData.data?.length || 0,
        posts: (mediaData.data || []).map((post: Record<string, unknown>) => ({
            id: post.id,
            caption: post.caption,
            permalink: post.permalink,
            timestamp: post.timestamp,
            mediaType: post.media_type,
            mediaUrl: post.media_url,
            likeCount: post.like_count,
            commentsCount: post.comments_count,
        })),
    };
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const query = req.nextUrl.searchParams.get("q");
    if (!query) {
        return NextResponse.json({
            error: "Missing query parameter 'q'",
            usage: "GET /api/social/search?q=高雄包棟&platform=threads&type=recent&account=hellohouse",
        });
    }

    const platform = req.nextUrl.searchParams.get("platform") || "threads";
    const searchType = req.nextUrl.searchParams.get("type") || "RECENT";
    const account = req.nextUrl.searchParams.get("account") || "hellohouse";

    const pageConfig = PAGES[account as keyof typeof PAGES];
    if (!pageConfig) {
        return NextResponse.json({ error: `Unknown account: ${account}` });
    }

    const results: Record<string, unknown> = {};

    if (platform === "threads" || platform === "all") {
        const threadsToken = process.env[pageConfig.threads.tokenEnv]?.trim();
        if (!threadsToken) {
            results.threads = { success: false, error: "Threads token not configured" };
        } else {
            results.threads = await searchThreads(query, threadsToken, searchType);
        }
    }

    if (platform === "instagram" || platform === "all") {
        const igToken = process.env[pageConfig.ig.tokenEnv]?.trim();
        if (!igToken) {
            results.instagram = { success: false, error: "IG token not configured" };
        } else {
            results.instagram = await searchInstagram(query, pageConfig.ig.userId, igToken);
        }
    }

    return NextResponse.json(results);
}
