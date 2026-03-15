#!/usr/bin/env node
/**
 * App Review Screencast Recorder
 * 
 * 自動錄製 Dashboard 操作流程，產出 App Review 需要的影片。
 * 
 * 用法：
 *   API_KEY=你的key node scripts/record-screencast.mjs
 *   或 source .env.production.local && API_KEY="$META_APP_SECRET" node scripts/record-screencast.mjs
 * 
 * 產出：
 *   scripts/screencast.mp4
 */

import puppeteer from "puppeteer";
import { writeFile, mkdir, rm } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = join(__dirname, "screencast-frames");
const OUTPUT_PATH = join(__dirname, "screencast.mp4");

const DASHBOARD_URL = "https://hello-stay-next.vercel.app/admin/social";
const API_KEY = process.env.API_KEY || process.env.META_APP_SECRET;

if (!API_KEY) {
  console.error("❌ 請設定 API_KEY 環境變數");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Helper: find and click button by text content
async function clickButton(page, textMatch, options = {}) {
  const { scroll = false, timeout = 5000 } = options;
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    try {
      const text = await btn.evaluate((el) => el.textContent || "");
      if (text.includes(textMatch)) {
        if (scroll) {
          await btn.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
          await sleep(500);
        }
        await btn.evaluate((el) => el.click()); // Use JS click instead of Puppeteer click
        return true;
      }
    } catch { /* element might be stale */ }
  }
  console.log(`  ⚠️ 找不到按鈕「${textMatch}」`);
  return false;
}

async function main() {
  console.log("🚀 啟動瀏覽器...");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ["--window-size=1280,900", "--no-sandbox"],
  });

  const page = await browser.newPage();

  // Setup CDP screencast
  const client = await page.createCDPSession();
  const frames = [];

  await client.send("Page.startScreencast", {
    format: "png",
    quality: 80,
    maxWidth: 1280,
    maxHeight: 800,
    everyNthFrame: 1,
  });

  client.on("Page.screencastFrame", async (event) => {
    frames.push(Buffer.from(event.data, "base64"));
    try {
      await client.send("Page.screencastFrameAck", { sessionId: event.sessionId });
    } catch { /* ignore */ }
  });

  try {
    // ========================================
    // Scene 1: 登入
    // ========================================
    console.log("📱 Scene 1: Dashboard 登入...");
    await page.goto(DASHBOARD_URL, { waitUntil: "networkidle2", timeout: 30000 });
    await sleep(2000);

    // 輸入 API Key（用 JS 直接設定 value，再 dispatch event）
    console.log("🔑 輸入 API Key...");
    await page.evaluate((key) => {
      const input = document.querySelector('input[type="password"]');
      if (input) {
        // Simulate typing effect visually
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(input, key);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, API_KEY);
    await sleep(1500);

    // 登入
    console.log("🔓 登入...");
    await clickButton(page, "登入");
    await sleep(2500);

    // ========================================
    // Scene 2: 搜尋
    // ========================================
    console.log("🔍 Scene 2: 搜尋功能...");
    
    // 清除並輸入關鍵字
    await page.evaluate(() => {
      const input = document.querySelector('input[placeholder*="搜尋"]');
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(input, '高雄包棟');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await sleep(1000);

    // 點搜尋
    console.log("🔎 執行搜尋...");
    await clickButton(page, "搜尋");
    
    // 等結果
    console.log("⏳ 等待搜尋結果...");
    await sleep(6000);

    // 滾動
    console.log("📜 滾動展示結果...");
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 250));
      await sleep(1500);
    }

    // ========================================
    // Scene 3: 回覆功能
    // ========================================
    console.log("💬 Scene 3: 回覆功能...");
    
    // 滾回上面
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);
    
    const clicked = await clickButton(page, "回覆這篇", { scroll: true });
    
    if (clicked) {
      console.log("📝 展示 Modal...");
      await sleep(2500);

      // 切換模板
      await clickButton(page, "平價訴求");
      await sleep(1500);
      
      await clickButton(page, "家庭客");
      await sleep(1500);

      // 切換帳號
      console.log("🔄 切換帳號...");
      await page.evaluate(() => {
        const selects = document.querySelectorAll('select');
        for (const select of selects) {
          const opts = select.querySelectorAll('option');
          for (const opt of opts) {
            if (opt.value === 'ruins') {
              select.value = 'ruins';
              select.dispatchEvent(new Event('change', { bubbles: true }));
              break;
            }
          }
        }
      });
      await sleep(2000);

      // 關閉 modal
      await clickButton(page, "取消");
      await sleep(1000);
    }

    // ========================================
    // Scene 4: 發文 Tab
    // ========================================
    console.log("📝 Scene 4: 發文功能...");
    await clickButton(page, "發文");
    await sleep(3000);

    // 回到搜尋
    await clickButton(page, "搜尋");
    await sleep(2000);

    console.log("✅ 錄製完成！");
  } catch (err) {
    console.error("⚠️ 操作中有錯誤（影片仍會儲存）:", err.message);
  } finally {
    // Stop recording
    try {
      await client.send("Page.stopScreencast");
    } catch { /* ignore */ }

    console.log(`📸 共錄製 ${frames.length} 幀`);

    if (frames.length > 0) {
      // Clean up old frames
      try { await rm(FRAMES_DIR, { recursive: true }); } catch { /* ignore */ }
      await mkdir(FRAMES_DIR, { recursive: true });

      console.log("💾 儲存畫面幀...");
      for (let i = 0; i < frames.length; i++) {
        await writeFile(
          join(FRAMES_DIR, `frame-${String(i).padStart(5, "0")}.png`),
          frames[i]
        );
      }

      console.log("🎬 合成影片...");
      try {
        execSync(
          `ffmpeg -y -framerate 10 -i "${FRAMES_DIR}/frame-%05d.png" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 "${OUTPUT_PATH}"`,
          { stdio: "inherit" }
        );
        console.log(`\n✅ 影片已儲存: ${OUTPUT_PATH}`);
        
        // Clean up frames
        await rm(FRAMES_DIR, { recursive: true });
        console.log("🧹 已清理暫存幀");
      } catch (e) {
        console.error("❌ ffmpeg 失敗:", e.message);
        console.log(`   畫面幀在: ${FRAMES_DIR}`);
      }
    }

    await browser.close();
  }
}

main().catch((err) => {
  console.error("❌ 錯誤:", err);
  process.exit(1);
});
