import { google } from "googleapis";
import { getGoogleServiceAccountCredentials } from "../src/modules/seo/infrastructure/seo-google-service-account";

const TARGET_URLS = [
    "https://www.hello-stay.com/",
    "https://www.hello-stay.com/kaohsiung-whole-house",
    "https://www.hello-stay.com/hellohouse",
    "https://www.hello-stay.com/godin",
    "https://www.hello-stay.com/compare",
    "https://www.hello-stay.com/traffic",
    "https://www.hello-stay.com/explore/food",
    "https://www.hello-stay.com/blog/kaohsiung-mahjong-stay",
    "https://www.hello-stay.com/blog/kaohsiung-kitchen-bnb",
    "https://www.hello-stay.com/blog/pier2-accommodation",
    "https://www.hello-stay.com/blog/kaohsiung-group-trip",
    "https://www.hello-stay.com/blog/taiwan-travel-foreign-guide",
    "https://www.hello-stay.com/blog/taiwan-travel-subsidy-guide",
];

async function main() {
    console.log("🔍 正在檢查 Google Service Account 授權憑證...");
    const credentials = await getGoogleServiceAccountCredentials();

    if (!credentials) {
        console.log("ℹ️ 本地環境未設定 GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY。");
        console.log("👉 正式環境上線時，系統可透過 Service Account 自動向 Google Indexing API 推播。");
        console.log("📋 準備提交之核心 URL 清單：");
        TARGET_URLS.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
        return;
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: credentials.clientEmail,
            private_key: credentials.privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const indexing = google.indexing({ version: "v3", auth });

    console.log(`🚀 正在向 Google Indexing API 批次提交 ${TARGET_URLS.length} 個核心商業頁面...`);

    for (const url of TARGET_URLS) {
        try {
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url,
                    type: "URL_UPDATED",
                },
            });
            console.log(`✅ [Google Indexing] ${url} -> 狀態: ${res.status}`);
        } catch (error) {
            console.warn(`⚠️ [Google Indexing] ${url} 提交回應:`, (error as Error).message);
        }
    }
}

main().catch(console.error);
