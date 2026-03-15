#!/usr/bin/env node
/**
 * 填入 Meta App 基本設定 + 建立 App Review 提交
 * 
 * 1. 填入隱私政策 URL、資料刪除 URL、上傳 App Icon、選擇類別
 * 2. 到 Threads API 權限頁面申請 threads_keyword_search Advanced Access
 * 3. 建立 App Review 提交
 * 
 * 用法：node scripts/submit-app-review.mjs
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "app-review-screenshots");
const APP_ICON_PATH = join(__dirname, "app-icon-1024.png");
const SCREENCAST_PATH = join(__dirname, "screencast.mp4");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const APP_ID = "917849677648910";
const PRIVACY_URL = "https://hello-stay-next.vercel.app/api/legal/privacy";
const DATA_DELETION_URL = "https://hello-stay-next.vercel.app/api/legal/data-deletion";

function askUser(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function takeScreenshot(page, name) {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  const path = join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`📸 ${path}`);
}

async function waitForLoad(page, ms = 8000) {
  await sleep(ms);
  // Wait for spinners to disappear
  try {
    await page.waitForFunction(() => {
      const spinners = document.querySelectorAll('[role="progressbar"], .loading, .spinner');
      return spinners.length === 0;
    }, { timeout: 5000 });
  } catch { /* ignore timeout */ }
}

async function setInputValue(page, selector, value) {
  return await page.evaluate((sel, val) => {
    const input = document.querySelector(sel);
    if (!input) return false;
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeSetter.call(input, val);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return true;
  }, selector, value);
}

async function setInputByLabel(page, labelText, value) {
  return await page.evaluate((label, val) => {
    // Find label element
    const labels = document.querySelectorAll('label, span, div');
    for (const lbl of labels) {
      if (lbl.textContent?.trim().includes(label)) {
        // Find nearest input
        const parent = lbl.closest('[class]')?.parentElement || lbl.parentElement;
        if (!parent) continue;
        const input = parent.querySelector('input, textarea');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const proto = input.tagName === 'TEXTAREA' 
            ? window.HTMLTextAreaElement.prototype 
            : window.HTMLInputElement.prototype;
          const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value').set;
          nativeSetter.call(input, val);
          input.dispatchEvent(new Event('focus', { bubbles: true }));
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('blur', { bubbles: true }));
          return true;
        }
      }
    }
    return false;
  }, labelText, value);
}

async function clickByText(page, text, waitMs = 2000) {
  const clicked = await page.evaluate((searchText) => {
    const selectors = 'button, a, [role="button"], [role="tab"], [role="link"], span[tabindex], div[tabindex]';
    const elements = document.querySelectorAll(selectors);
    for (const el of elements) {
      const elText = el.textContent?.trim() || "";
      if (elText === searchText || elText.includes(searchText)) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => el.click(), 300);
          return true;
        }
      }
    }
    return false;
  }, text);
  
  if (clicked) {
    console.log(`  ✅ 點擊「${text}」`);
    await sleep(waitMs);
  } else {
    console.log(`  ⚠️ 找不到「${text}」`);
  }
  return clicked;
}

async function main() {
  console.log("🔗 連接瀏覽器...");
  
  let browser;
  try {
    browser = await puppeteer.connect({
      browserURL: "http://127.0.0.1:9222",
      defaultViewport: null,
    });
  } catch (err) {
    console.error("❌ 無法連接:", err.message);
    process.exit(1);
  }
  console.log("✅ 已連接\n");

  const pages = await browser.pages();
  let page = null;
  for (const p of pages) {
    if (p.url().includes("developers.facebook.com")) {
      page = p;
      break;
    }
  }
  if (!page) page = pages[0];

  // ==================================================
  // STEP 1: 填寫基本設定
  // ==================================================
  console.log("=".repeat(50));
  console.log("📝 Step 1: 填寫基本設定");
  console.log("=".repeat(50));

  await page.goto(`https://developers.facebook.com/apps/${APP_ID}/settings/basic/`, {
    waitUntil: "networkidle2", timeout: 30000
  });
  await page.bringToFront();
  await waitForLoad(page);
  await takeScreenshot(page, "fill-01-basic-before");

  // 1a. 隱私政策網址
  console.log("\n🔗 [1a] 填入隱私政策網址...");
  let filled = await setInputByLabel(page, "隱私政策網址", PRIVACY_URL);
  if (!filled) filled = await setInputByLabel(page, "Privacy Policy URL", PRIVACY_URL);
  if (!filled) {
    // Try finding by placeholder
    filled = await page.evaluate((url) => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        const placeholder = input.placeholder || "";
        if (placeholder.includes("隱私") || placeholder.includes("privacy") || placeholder.includes("Privacy")) {
          const nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, 'value'
          ).set;
          nativeSetter.call(input, url);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
      }
      return false;
    }, PRIVACY_URL);
  }
  console.log(`  隱私政策: ${filled ? '✅' : '⚠️ 需手動填入'}`);

  // 1b. 用戶資料刪除 
  console.log("\n🔗 [1b] 填入資料刪除指示...");
  // First select the dropdown to "Data Deletion Instructions URL"
  const dropdownChanged = await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    for (const select of selects) {
      for (const opt of select.options) {
        if (opt.text.includes("資料刪除指示網址") || opt.text.includes("Data Deletion") || opt.value.includes("url")) {
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
      }
    }
    return false;
  });
  if (dropdownChanged) {
    await sleep(1000);
  }
  
  filled = await setInputByLabel(page, "資料刪除", DATA_DELETION_URL);
  if (!filled) filled = await setInputByLabel(page, "Data Deletion", DATA_DELETION_URL);
  if (!filled) {
    // Try finding by looking for inputs near "刪除" text
    filled = await page.evaluate((url) => {
      const inputs = document.querySelectorAll('input');
      for (const input of inputs) {
        const parent = input.closest('div[class]');
        if (parent && (parent.textContent?.includes('刪除') || parent.textContent?.includes('deletion'))) {
          const placeholder = input.placeholder || '';
          if (placeholder.includes('http') || placeholder.includes('url') || placeholder.includes('URL') || placeholder.includes('網址')) {
            const nativeSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype, 'value'
            ).set;
            nativeSetter.call(input, url);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
        }
      }
      return false;
    }, DATA_DELETION_URL);
  }
  console.log(`  資料刪除: ${filled ? '✅' : '⚠️ 需手動填入'}`);

  // 1c. 類別  
  console.log("\n📂 [1c] 選擇類別...");
  const categorySet = await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    for (const select of selects) {
      // Look for category select (typically has options like "Business", "Education", etc.)
      for (const opt of select.options) {
        if (opt.text.includes("商業") || opt.text.includes("Business") || opt.value.includes("BUSINESS")) {
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
      }
    }
    return false;
  });
  console.log(`  類別: ${categorySet ? '✅ 設為商業' : '⚠️ 需手動選擇'}`);

  // 1d. 上傳 App Icon
  console.log("\n🖼️ [1d] 上傳應用程式圖示 (1024x1024)...");
  const fileInputs = await page.$$('input[type="file"]');
  console.log(`  找到 ${fileInputs.length} 個檔案上傳欄位`);
  
  if (fileInputs.length > 0) {
    try {
      // Meta might have the file input hidden, need to make it visible
      await page.evaluate(() => {
        const inputs = document.querySelectorAll('input[type="file"]');
        inputs.forEach(input => {
          input.style.display = 'block';
          input.style.visibility = 'visible';
          input.style.opacity = '1';
        });
      });
      await sleep(500);
      
      await fileInputs[0].uploadFile(APP_ICON_PATH);
      console.log("  ✅ 已上傳 App Icon");
      await sleep(3000); // Wait for upload processing
    } catch (e) {
      console.log(`  ❌ 上傳失敗: ${e.message}`);
    }
  } else {
    console.log("  ⚠️ 找不到檔案上傳欄位");
    // Try scrolling down to find it
    await page.evaluate(() => window.scrollBy(0, 500));
    await sleep(1000);
    const iconInputs = await page.$$('input[type="file"]');
    if (iconInputs.length > 0) {
      try {
        await iconInputs[0].uploadFile(APP_ICON_PATH);
        console.log("  ✅ 滾動後找到並上傳了 App Icon");
        await sleep(3000);
      } catch (e) {
        console.log(`  ❌ 上傳失敗: ${e.message}`);
      }
    }
  }

  await takeScreenshot(page, "fill-02-basic-filled");

  // 1e. Save
  console.log("\n💾 [1e] 儲存設定...");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1000);
  await takeScreenshot(page, "fill-02b-before-save");
  
  let saved = await clickByText(page, "儲存變更", 3000);
  if (!saved) saved = await clickByText(page, "Save Changes", 3000);
  if (!saved) saved = await clickByText(page, "儲存", 3000);
  if (!saved) saved = await clickByText(page, "Save", 3000);
  
  if (saved) {
    await sleep(3000);
    await takeScreenshot(page, "fill-03-saved");
    console.log("  ✅ 已儲存");
  } else {
    console.log("  ⚠️ 找不到儲存按鈕");
  }

  // ==================================================
  // STEP 2: 到 Threads API 權限頁 — 申請 Advanced Access  
  // ==================================================
  console.log("\n" + "=".repeat(50));
  console.log("🔐 Step 2: 申請 threads_keyword_search Advanced Access");
  console.log("=".repeat(50));

  await page.goto(`https://developers.facebook.com/apps/${APP_ID}/use_cases/customize/?use_case_enum=THREADS_API`, {
    waitUntil: "networkidle2", timeout: 30000
  });
  await waitForLoad(page);
  
  // Click on "權限和功能"
  await clickByText(page, "權限和功能", 3000);
  await waitForLoad(page, 3000);
  await takeScreenshot(page, "fill-04-threads-permissions");
  
  // Look for the page text to find keyword_search and its row
  const permText = await page.evaluate(() => document.body?.innerText || "");
  
  if (permText.includes("threads_keyword_search")) {
    console.log("  ✅ 找到 threads_keyword_search");
    
    // Scroll down to find it
    await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        if (el.textContent?.includes('threads_keyword_search') && el.offsetParent !== null) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    });
    await sleep(1000);
    await takeScreenshot(page, "fill-04b-keyword-search");
    
    // Find the "操作" (Actions) dropdown near threads_keyword_search and click it
    const clickedAction = await page.evaluate(() => {
      // Find all rows/containers that contain keyword_search  
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (el.textContent?.includes('threads_keyword_search') && 
            !el.textContent?.includes('threads_manage') &&
            el.offsetParent !== null) {
          // Look for action button in same row
          const row = el.closest('tr, [class*="row"], [class*="Row"]') || el.parentElement;
          if (row) {
            const buttons = row.querySelectorAll('button, [role="button"]');
            for (const btn of buttons) {
              if (btn.textContent?.includes('操作') || btn.textContent?.includes('Action') ||
                  btn.textContent?.includes('Get') || btn.textContent?.includes('取得')) {
                btn.click();
                return `Clicked: ${btn.textContent?.trim()}`;
              }
            }
          }
        }
      }
      return null;
    });
    
    if (clickedAction) {
      console.log(`  ${clickedAction}`);
      await sleep(2000);
      await takeScreenshot(page, "fill-04c-action-menu");
      
      // Look for "取得進階存取權限" / "Get Advanced Access"
      let advClicked = await clickByText(page, "取得進階存取權限", 3000);
      if (!advClicked) advClicked = await clickByText(page, "Get Advanced Access", 3000);
      if (!advClicked) advClicked = await clickByText(page, "Get advanced access", 3000);
      
      if (advClicked) {
        await sleep(2000);
        await takeScreenshot(page, "fill-04d-advanced-access-dialog");
        console.log("  ✅ 打開了 Advanced Access 對話框");
        
        // Check for any confirmation needed
        const dialogText = await page.evaluate(() => document.body?.innerText || "");
        if (dialogText.includes("確認") || dialogText.includes("Confirm") || dialogText.includes("同意") || dialogText.includes("Agree")) {
          await clickByText(page, "確認", 2000);
          await clickByText(page, "Confirm", 2000);
          await clickByText(page, "同意", 2000);
        }
        
        // Check for application review requirement
        if (dialogText.includes("應用程式審查") || dialogText.includes("App Review")) {
          console.log("  ℹ️ 需要 App Review — 會自動加入提交清單");
        }
      }
    } else {
      console.log("  ⚠️ 找不到 keyword_search 的操作按鈕");
    }
  } else {
    console.log("  ⚠️ 在權限頁面沒找到 threads_keyword_search");
  }
  
  await takeScreenshot(page, "fill-05-after-advanced");

  // ==================================================
  // STEP 3: 檢查最終狀態
  // ==================================================
  console.log("\n" + "=".repeat(50));
  console.log("✅ Step 3: 檢查最終狀態");
  console.log("=".repeat(50));

  // Go back to basic settings to verify
  await page.goto(`https://developers.facebook.com/apps/${APP_ID}/settings/basic/`, {
    waitUntil: "networkidle2", timeout: 30000
  });
  await waitForLoad(page);
  
  const finalText = await page.evaluate(() => document.body?.innerText || "");
  if (finalText.includes("不符合提交資格")) {
    console.log("  ⚠️ 仍然不符合提交資格");
    const lines = finalText.split('\n').filter(l => l.includes('缺少') || l.includes('圖示') || l.includes('隱私') || l.includes('刪除') || l.includes('類別'));
    lines.forEach(l => console.log(`    → ${l.trim()}`));
  } else {
    console.log("  ✅ 基本設定已完成！");
  }
  
  await takeScreenshot(page, "fill-06-final-basic");

  // Check App Review
  await page.goto(`https://developers.facebook.com/apps/${APP_ID}/app-review/submissions/`, {
    waitUntil: "networkidle2", timeout: 30000
  });
  await waitForLoad(page);
  
  const reviewText = await page.evaluate(() => document.body?.innerText || "");
  
  if (reviewText.includes("threads_keyword_search")) {
    console.log("  ✅ threads_keyword_search 在提交清單中！");
  } else {
    console.log("  ⚠️ threads_keyword_search 不在提交清單中");
  }
  
  await takeScreenshot(page, "fill-07-final-review");
  
  // Final summary
  console.log("\n" + "=".repeat(50));
  console.log("📋 完成！請檢查瀏覽器確認所有設定");
  console.log("=".repeat(50));
  console.log("\n如有欄位未自動填入，請手動完成以下：");
  console.log(`  隱私政策網址: ${PRIVACY_URL}`);
  console.log(`  資料刪除網址: ${DATA_DELETION_URL}`);
  console.log("  類別: 商業 (Business)");
  console.log(`  App 圖示: ${APP_ICON_PATH}`);
  
  await askUser("\n按 Enter 結束...");
  browser.disconnect();
}

main().catch((err) => {
  console.error("❌ 錯誤:", err);
  process.exit(1);
});
