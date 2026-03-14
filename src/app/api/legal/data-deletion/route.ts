import { NextResponse } from "next/server";

export async function GET() {
    const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>資料刪除說明 | Hello Stay</title>
    <style>
        body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #333; }
        h1 { border-bottom: 2px solid #6c63ff; padding-bottom: 12px; }
        h2 { color: #6c63ff; margin-top: 32px; }
        .steps { background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 16px 0; }
        .steps li { margin: 8px 0; }
    </style>
</head>
<body>
    <h1>資料刪除說明 Data Deletion Instructions</h1>
    <p>最後更新日期：2025 年 3 月 14 日</p>

    <h2>如何要求刪除您的資料</h2>
    <p>如果您希望刪除我們儲存的與您 Threads 帳戶相關的所有資料，請依以下步驟操作：</p>

    <div class="steps">
        <ol>
            <li>發送電子郵件到 <strong>hellohouse2017@gmail.com</strong></li>
            <li>主旨請註明：<strong>「資料刪除請求」</strong></li>
            <li>內容中請提供您的 Threads 用戶名稱</li>
            <li>我們將在收到請求後 <strong>30 天內</strong> 完成資料刪除，並以電子郵件通知您</li>
        </ol>
    </div>

    <h2>自動刪除</h2>
    <p>您也可以透過以下方式自行撤銷存取權限：</p>
    <div class="steps">
        <ol>
            <li>開啟 Threads App</li>
            <li>前往「設定」→「安全性」→「應用程式和網站」</li>
            <li>找到「Hello Stay 發文排程」並點擊「移除」</li>
            <li>撤銷後，我們將無法存取您的帳戶資料</li>
        </ol>
    </div>

    <h2>刪除的資料範圍</h2>
    <p>刪除將包含以下資料：</p>
    <ul>
        <li>您的 Threads 存取權杖</li>
        <li>與您帳戶關聯的所有設定</li>
        <li>所有搜尋和回覆活動記錄</li>
    </ul>

    <h2>聯絡方式</h2>
    <p>Email: hellohouse2017@gmail.com<br>電話: 0932-828922</p>
</body>
</html>`;
    return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
