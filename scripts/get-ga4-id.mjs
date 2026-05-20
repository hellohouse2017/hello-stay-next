import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function main() {
  console.log("Launching browser with persistent context...");
  const userDataDir = '/Users/tangyukao/.chrome-flow-profile'; // Try this profile
  
  if (!fs.existsSync(userDataDir)) {
      console.log("User data dir does not exist:", userDataDir);
      return;
  }

  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = browser.pages()[0] || await browser.newPage();
  console.log("Navigating to Google Analytics...");
  
  await page.goto('https://analytics.google.com/analytics/web/', { waitUntil: 'networkidle' });
  
  console.log("Waiting for page load...");
  await page.waitForTimeout(5000); 
  
  const url = page.url();
  console.log("Current URL:", url);
  
  if (url.includes('signin/identifier')) {
      console.log("Not logged in with this profile.");
  } else {
      const match = url.match(/\/p(\d+)/);
      if (match) {
        console.log(`\n✅ FOUND GA4 PROPERTY ID: ${match[1]}\n`);
        const envPath = path.join('/Users/tangyukao/Documents/Antigravity/官網/Hellostay官網/.env');
        const propertyId = match[1];
        
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
            if (envContent.includes('GOOGLE_ANALYTICS_PROPERTY_ID=')) {
                envContent = envContent.replace(/GOOGLE_ANALYTICS_PROPERTY_ID=.*/, `GOOGLE_ANALYTICS_PROPERTY_ID=${propertyId}`);
            } else {
                envContent += `\nGOOGLE_ANALYTICS_PROPERTY_ID=${propertyId}\n`;
            }
        } else {
            envContent = `GOOGLE_ANALYTICS_PROPERTY_ID=${propertyId}\n`;
        }
        fs.writeFileSync(envPath, envContent);
        console.log("Saved to .env");
      }
  }
  
  await browser.close();
}

main().catch(console.error);
