import { NextRequest, NextResponse } from "next/server";

/**
 * Social Media Reply API
 *
 * POST /api/social/reply
 * Body: { postId, platform, message, account }
 *
 * Replies to a specific post on Threads.
 */

const PAGES = {
    hellohouse: {
        threads: {
            userId: "72085024476",
            tokenEnv: "THREADS_USER_TOKEN_HELLOHOUSE",
        },
    },
    ruins: {
        threads: {
            userId: "67147415179",
            tokenEnv: "THREADS_USER_TOKEN_RUINS",
        },
    },
};

const API_SECRET = (process.env.META_APP_SECRET || "").trim();

// Default reply templates
const REPLY_TEMPLATES = {
    hellohouse: `推薦高雄鹽埕「你好哇寓所」🏠
可包棟最多38人，近駁二/愛河/西子灣
獨立空間超適合家族/團體旅遊！
👉 hellostay.tw`,
    ruins: `推薦高雄鹽埕「廢墟Bar」🍸
百年老屋改建的特色空間
適合派對/婚禮/慶生/各式包場活動！
👉 hellostay.tw/dazhi`,
};

// ---------------------------------------------------------------------------
// Reply to a Threads post
// ---------------------------------------------------------------------------
async function replyToThreads(
    userId: string,
    accessToken: string,
    replyToId: string,
    text: string,
) {
    // Step 1: Create reply container
    const createRes = await fetch(
        `https://graph.threads.net/v1.0/${userId}/threads`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                media_type: "TEXT",
                text,
                reply_to_id: replyToId,
                access_token: accessToken,
            }),
        },
    );
    const createData = await createRes.json();

    if (!createData.id) {
        return { success: false, error: createData.error || createData };
    }

    // Step 2: Publish the reply
    const publishRes = await fetch(
        `https://graph.threads.net/v1.0/${userId}/threads_publish`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                creation_id: createData.id,
                access_token: accessToken,
            }),
        },
    );
    const publishData = await publishRes.json();

    if (!publishData.id) {
        return { success: false, error: publishData.error || publishData };
    }

    return {
        success: true,
        replyId: publishData.id,
        repliedTo: replyToId,
    };
}

// ---------------------------------------------------------------------------
// POST handler
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

    const {
        postId,
        platform = "threads",
        message,
        account = "hellohouse",
    } = body;

    if (!postId) {
        return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const pageConfig = PAGES[account as keyof typeof PAGES];
    if (!pageConfig) {
        return NextResponse.json({ error: `Unknown account: ${account}` });
    }

    // Use provided message or default template
    const replyText = message || REPLY_TEMPLATES[account as keyof typeof REPLY_TEMPLATES] || "感謝分享！";

    if (platform === "threads") {
        const threadsToken = process.env[pageConfig.threads.tokenEnv]?.trim();
        if (!threadsToken) {
            return NextResponse.json({
                success: false,
                error: "Threads token not configured",
            });
        }

        const result = await replyToThreads(
            pageConfig.threads.userId,
            threadsToken,
            postId,
            replyText,
        );

        return NextResponse.json(result);
    }

    return NextResponse.json({
        error: `Platform '${platform}' reply not supported. Use 'threads'.`,
    });
}

// ---------------------------------------------------------------------------
// GET handler — usage info
// ---------------------------------------------------------------------------
export async function GET() {
    return NextResponse.json({
        usage: {
            method: "POST",
            headers: { "x-api-key": "your-api-secret" },
            body: {
                postId: "Threads post ID to reply to",
                platform: "threads (default)",
                message: "(可選) 自訂回覆內容，不填則使用預設推薦文案",
                account: "hellohouse | ruins (default: hellohouse)",
            },
        },
        defaultTemplates: REPLY_TEMPLATES,
    });
}
