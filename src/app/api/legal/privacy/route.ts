import { NextResponse } from "next/server";

export async function GET() {
    const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>隱私權政策 | Hello Stay</title>
    <style>
        body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #333; }
        h1 { border-bottom: 2px solid #6c63ff; padding-bottom: 12px; }
        h2 { color: #6c63ff; margin-top: 32px; }
    </style>
</head>
<body>
    <h1>隱私權政策 Privacy Policy</h1>
    <p>最後更新日期：2025 年 3 月 14 日</p>

    <h2>1. 資料蒐集</h2>
    <p>本應用程式（Hello Stay 社群管理工具）透過 Meta Threads API 存取以下資料：</p>
    <ul>
        <li>您的 Threads 帳號基本資訊（用戶名稱、用戶 ID）</li>
        <li>您授權搜尋的公開 Threads 貼文內容</li>
        <li>您透過本工具發佈或回覆的貼文內容</li>
    </ul>

    <h2>2. 資料使用目的</h2>
    <p>我們僅將蒐集的資料用於：</p>
    <ul>
        <li>搜尋 Threads 平台上與您業務相關的公開貼文</li>
        <li>協助您回覆公開貼文以推廣您的業務</li>
        <li>協助您同步發佈內容至多個社群平台</li>
    </ul>

    <h2>3. 資料儲存與保護</h2>
    <p>我們不會永久儲存您搜尋到的貼文資料。您的存取權杖（Access Token）以加密方式儲存於 Vercel 環境變數中，僅用於 API 存取。本應用程式不會將您的資料分享給任何第三方。</p>

    <h2>4. 資料刪除</h2>
    <p>您可以隨時要求刪除您的資料。請參閱我們的<a href="/api/legal/data-deletion">資料刪除說明</a>。</p>

    <h2>5. Cookie 政策</h2>
    <p>本應用程式不使用 Cookie 追蹤使用者行為。</p>

    <h2>6. 聯絡方式</h2>
    <p>如有任何隱私權相關問題，請聯繫：<br>Email: hellohouse2017@gmail.com<br>電話: 0932-828922</p>

    <h2>7. 政策更新</h2>
    <p>我們可能會不定期更新本隱私權政策。更新後的政策將於本頁面公佈。</p>
</body>
</html>`;
    return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
