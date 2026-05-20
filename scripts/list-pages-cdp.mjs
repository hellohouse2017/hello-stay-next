import { chromium } from 'playwright';

async function main() {
  console.log("Connecting to port 9222 to list open pages...");
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  
  const contexts = browser.contexts();
  for (const context of contexts) {
      const pages = context.pages();
      for (const page of pages) {
          console.log("Page URL:", page.url());
          const match = page.url().match(/\/p(\d+)/);
          if (match) {
              console.log(`\n✅ FOUND GA4 PROPERTY ID IN OPEN TAB: ${match[1]}\n`);
          }
      }
  }
  await browser.close();
}

main().catch(console.error);