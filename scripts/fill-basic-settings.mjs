#!/usr/bin/env node
import puppeteer from "puppeteer";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SHOT = (n) => `/Users/tangyukao/hello-stay-next/scripts/app-review-screenshots/${n}.png`;

async function main() {
  const browser = await puppeteer.connect({ browserURL: "http://127.0.0.1:9222", defaultViewport: null });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('developers.facebook')) || pages[0];
  await page.bringToFront();
  await sleep(1000);

  // Use window.location instead of page.goto (faster, no waiting for all resources)
  console.log("1. 前往使用案例...");
  await page.evaluate(() => { window.location.href = 'https://developers.facebook.com/apps/917849677648910/use-cases/'; });
  await sleep(8000);
  await page.screenshot({ path: SHOT("uc1") });
  
  const text1 = await page.evaluate(() => document.body.innerText.substring(0, 600));
  console.log("Page:", text1.substring(0, 300));

  // Find and click 自訂 button near "存取 Threads API"
  console.log("\n2. 找自訂按鈕...");
  const customBtn = await page.evaluate(() => {
    const all = document.querySelectorAll('a, button');
    for (const el of all) {
      const t = el.textContent?.trim();
      if ((t === '自訂' || t === 'Customize') && el.offsetHeight > 0) {
        // Check if near Threads
        const parent = el.closest('[class]')?.parentElement;
        if (parent?.textContent?.includes('Threads')) {
          el.scrollIntoView({ block: 'center' });
          const r = el.getBoundingClientRect();
          return { x: r.x + r.width/2, y: r.y + r.height/2, text: t };
        }
      }
    }
    // Fallback: just find any 自訂 button
    for (const el of all) {
      const t = el.textContent?.trim();
      if ((t === '自訂' || t === 'Customize') && el.offsetHeight > 0) {
        el.scrollIntoView({ block: 'center' });
        const r = el.getBoundingClientRect();
        return { x: r.x + r.width/2, y: r.y + r.height/2, text: t };
      }
    }
    return null;
  });
  console.log("  btn:", JSON.stringify(customBtn));

  if (customBtn) {
    await sleep(300);
    await page.mouse.click(customBtn.x, customBtn.y);
    await sleep(5000);
    await page.screenshot({ path: SHOT("uc2") });
  }

  // Now we should be on the permissions page for Threads
  // List all permissions and their status
  console.log("\n3. 權限列表...");
  const perms = await page.evaluate(() => {
    const text = document.body.innerText;
    const permNames = ['threads_delete', 'threads_keyword_search', 'threads_manage_replies', 
                       'threads_manage_insights', 'threads_content_publish', 'threads_basic'];
    return permNames.map(p => {
      const idx = text.indexOf(p);
      if (idx < 0) return { name: p, found: false };
      const context = text.substring(idx, Math.min(text.length, idx + 100)).replace(/\n/g, ' | ');
      return { name: p, found: true, context };
    });
  });
  perms.forEach(p => console.log(`  ${p.found ? '✅' : '❌'} ${p.name}: ${p.context || 'not found'}`));

  // Find remove/delete buttons for threads_delete and threads_manage_insights
  console.log("\n4. 移除不需要的權限...");
  for (const permToRemove of ['threads_delete', 'threads_manage_insights']) {
    console.log(`  移除 ${permToRemove}...`);
    
    // Find the permission row and look for a remove/delete/trash button
    const removeBtn = await page.evaluate((perm) => {
      const all = document.querySelectorAll('*');
      let permEl = null;
      for (const el of all) {
        if (el.textContent?.trim() === perm && el.childElementCount === 0) {
          permEl = el;
          break;
        }
      }
      if (!permEl) return { found: false, reason: 'perm not found' };
      
      // Look for nearby remove/delete button or trash icon
      let container = permEl.parentElement;
      for (let i = 0; i < 8 && container; i++) {
        const btns = container.querySelectorAll('a, button, [role="button"]');
        for (const btn of btns) {
          const t = btn.textContent?.trim();
          const aria = btn.getAttribute('aria-label') || '';
          if (t === '移除' || t === 'Remove' || t === '刪除' || t === 'Delete' || 
              aria.includes('remove') || aria.includes('delete') || aria.includes('移除') ||
              t === '✕' || t === '×' || t === 'X') {
            btn.scrollIntoView({ block: 'center' });
            const r = btn.getBoundingClientRect();
            return { found: true, x: r.x + r.width/2, y: r.y + r.height/2, text: t || aria };
          }
        }
        container = container.parentElement;
      }
      
      // Also check for trash icon (svg)
      container = permEl.parentElement;
      for (let i = 0; i < 8 && container; i++) {
        const svgs = container.querySelectorAll('svg, i, [data-testid]');
        for (const svg of svgs) {
          const testid = svg.getAttribute('data-testid') || '';
          if (testid.includes('trash') || testid.includes('delete') || testid.includes('remove')) {
            svg.scrollIntoView({ block: 'center' });
            const r = svg.getBoundingClientRect();
            return { found: true, x: r.x + r.width/2, y: r.y + r.height/2, text: 'icon:' + testid };
          }
        }
        container = container.parentElement;
      }
      
      return { found: false, reason: 'no remove button found near perm' };
    }, permToRemove);
    
    console.log(`    ${JSON.stringify(removeBtn)}`);
    
    if (removeBtn.found) {
      await sleep(300);
      await page.mouse.click(removeBtn.x, removeBtn.y);
      await sleep(2000);
      
      // Confirm if dialog appears
      const confirmBtn = await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          const t = b.textContent?.trim();
          if (t === '確認' || t === 'Confirm' || t === '移除' || t === 'Remove') {
            const r = b.getBoundingClientRect();
            if (r.width > 0) return { x: r.x + r.width/2, y: r.y + r.height/2, text: t };
          }
        }
        return null;
      });
      if (confirmBtn) {
        await page.mouse.click(confirmBtn.x, confirmBtn.y);
        console.log(`    confirmed: ${confirmBtn.text}`);
        await sleep(2000);
      }
    }
  }

  await page.screenshot({ path: SHOT("uc3-after-remove") });
  
  // Check final state
  const finalPerms = await page.evaluate(() => {
    const text = document.body.innerText;
    return ['threads_delete', 'threads_keyword_search', 'threads_manage_replies', 
            'threads_manage_insights', 'threads_content_publish', 'threads_basic']
      .map(p => ({ name: p, present: text.includes(p) }));
  });
  console.log("\n5. 最終權限:");
  finalPerms.forEach(p => console.log(`  ${p.present ? '✅' : '❌'} ${p.name}`));

  browser.disconnect();
  console.log("\n✅ Done");
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
