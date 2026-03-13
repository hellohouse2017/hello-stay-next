import { NextRequest, NextResponse } from "next/server";

/**
 * Threads OAuth Callback Handler
 *
 * 使用方式：
 * 1. 在 Meta Developer Console → Threads API → 設定
 *    設定 Redirect URI 為: https://hello-stay-next.vercel.app/api/auth/threads/callback
 *
 * 2. 在瀏覽器開啟以下網址進行授權：
 *    https://threads.net/oauth/authorize?client_id=832940979835089&redirect_uri=https://hello-stay-next.vercel.app/api/auth/threads/callback&scope=threads_basic,threads_content_publish&response_type=code
 *
 * 3. 授權後會自動換取 access token 並顯示在頁面上
 */

const THREADS_APP_ID = process.env.THREADS_APP_ID || "832940979835089";
const THREADS_APP_SECRET = process.env.THREADS_APP_SECRET || "";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
        return NextResponse.json({
            error: "Authorization denied",
            detail: req.nextUrl.searchParams.get("error_description"),
        });
    }

    if (!code) {
        // Step 1: Show instructions
        const redirectUri = `${req.nextUrl.origin}/api/auth/threads/callback`;
        const authUrl = `https://threads.net/oauth/authorize?client_id=${THREADS_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=threads_basic,threads_content_publish&response_type=code`;

        return new NextResponse(
            `<!DOCTYPE html>
<html><head><title>Threads OAuth Setup</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px">
  <h1>🧵 Threads OAuth 設定</h1>
  <p>點擊下方按鈕授權 Threads 帳號：</p>
  <a href="${authUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:8px;font-size:16px">
    授權 Threads 帳號
  </a>
  <hr>
  <p style="color:#666;font-size:14px">
    注意：你需要先在 Meta Developer Console → Threads API → 設定 中，<br>
    將 Redirect URI 設定為：<br>
    <code>${redirectUri}</code>
  </p>
</body></html>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
    }

    // Step 2: Exchange code for short-lived token
    if (!THREADS_APP_SECRET) {
        return NextResponse.json({
            error: "THREADS_APP_SECRET not configured in environment",
            hint: "Set THREADS_APP_SECRET in Vercel env vars",
        });
    }

    const redirectUri = `${req.nextUrl.origin}/api/auth/threads/callback`;

    try {
        // Exchange auth code for short-lived token
        const tokenRes = await fetch(
            "https://graph.threads.net/oauth/access_token",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    client_id: THREADS_APP_ID,
                    client_secret: THREADS_APP_SECRET,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: redirectUri,
                }),
            },
        );
        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            return NextResponse.json({
                error: "Failed to get short-lived token",
                data: tokenData,
            });
        }

        // Exchange short-lived token for long-lived token (60 days)
        const longLivedRes = await fetch(
            `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${THREADS_APP_SECRET}&access_token=${tokenData.access_token}`,
        );
        const longLivedData = await longLivedRes.json();

        // Get user profile info
        const profileRes = await fetch(
            `https://graph.threads.net/v1.0/me?fields=id,username,threads_profile_picture_url&access_token=${longLivedData.access_token || tokenData.access_token}`,
        );
        const profileData = await profileRes.json();

        return new NextResponse(
            `<!DOCTYPE html>
<html><head><title>Threads Token 完成</title></head>
<body style="font-family:sans-serif;max-width:700px;margin:40px auto;padding:20px">
  <h1>✅ Threads Token 取得成功！</h1>
  <h2>帳號資訊</h2>
  <table border="1" cellpadding="8" style="border-collapse:collapse">
    <tr><td><strong>User ID</strong></td><td><code>${profileData.id || tokenData.user_id}</code></td></tr>
    <tr><td><strong>Username</strong></td><td>${profileData.username || "N/A"}</td></tr>
  </table>

  <h2>環境變數</h2>
  <p>請將以下值設定到 Vercel 環境變數：</p>
  <table border="1" cellpadding="8" style="border-collapse:collapse;word-break:break-all">
    <tr>
      <td><strong>THREADS_USER_ID_???</strong></td>
      <td><code>${profileData.id || tokenData.user_id}</code></td>
    </tr>
    <tr>
      <td><strong>THREADS_USER_TOKEN_???</strong></td>
      <td><code>${longLivedData.access_token || tokenData.access_token}</code></td>
    </tr>
  </table>
  <p style="color:#666">
    Long-lived token 有效期：${longLivedData.expires_in ? Math.floor(longLivedData.expires_in / 86400) + " 天" : "未知"}<br>
    ⚠️ 請複製 token 後立即設定到 Vercel，此頁面不會保存 token。
  </p>
</body></html>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
        );
    } catch (e) {
        return NextResponse.json({
            error: "Token exchange failed",
            detail: String(e),
        });
    }
}
