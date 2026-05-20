import { chromium } from 'playwright';
import fs from 'fs/promises';

async function main() {
  console.log("Connecting to existing Chrome instance on port 9222...");
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  
  // Find an existing page or create a new one in an existing context
  const contexts = browser.contexts();
  const context = contexts[0];
  const page = await context.newPage();

  console.log("Navigating to Google Analytics...");
  await page.goto('https://analytics.google.com/analytics/web/', { waitUntil: 'networkidle' });
  
  console.log("Waiting for GA4 to load and reveal Property ID in URL...");
  // Sometimes it redirects to a default property.
  await page.waitForTimeout(8000); 
  
  const url = page.url();
  console.log("Current URL:", url);
  
  const match = url.match(/\/p(\d+)/);
  if (match) {
    const propertyId = match[1];
    console.log(`\n✅ FOUND GA4 PROPERTY ID: ${propertyId}\n`);
    
    // Save to the .env in Hellostay官網
    const envPath = '/Users/tangyukao/Documents/Antigravity/官網/Hellostay官網/.env';
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
    console.log(`Saved to ${envPath}`);
  } else {
    console.log("Could not find property ID in URL. The user might have multiple properties.");
    // Maybe try to find it in the DOM
  }

  // Don't close the browser, just close the page we created
  await page.close();
  // We can't close CDP browser if we want to keep it open for the user.
}

main().catch(console.error);