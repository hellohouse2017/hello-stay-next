/* eslint-disable @typescript-eslint/no-require-imports */
// 寫在 workspace 專案目錄下的 scripts 中

async function runPlaywright() {
  const { chromium } = require('playwright');
  console.log("Launching Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();
  console.log("Navigating to Threads...");
  await page.goto('https://www.threads.net/@darkseoking/post/DYelET5EzVO', { waitUntil: 'networkidle' });
  console.log("Waiting 5s for dynamic content...");
  await page.waitForTimeout(5000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log("--- Playwright Scrape Success ---");
  console.log(text);
  await browser.close();
}

async function runPuppeteer() {
  const puppeteer = require('puppeteer');
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
  console.log("Navigating to Threads...");
  await page.goto('https://www.threads.net/@darkseoking/post/DYelET5EzVO', { waitUntil: 'networkidle2' });
  console.log("Waiting 5s for dynamic content...");
  await new Promise(r => setTimeout(r, 5000));
  const text = await page.evaluate(() => document.body.innerText);
  console.log("--- Puppeteer Scrape Success ---");
  console.log(text);
  await browser.close();
}

(async () => {
  try {
    await runPlaywright();
  } catch (pwError) {
    console.log("Playwright failed:", pwError.message);
    try {
      await runPuppeteer();
    } catch (pupError) {
      console.log("Puppeteer failed:", pupError.message);
    }
  }
})();
