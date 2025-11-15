import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { PageFixtures } from './fixtures';
import { config } from './config';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let fixtures: PageFixtures;

export async function launchBrowser(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium') {
  switch (browserType) {
    case 'firefox':
      browser = await firefox.launch({ 
        headless: config.headless,
        slowMo: config.slowMo 
      });
      break;
    case 'webkit':
      browser = await webkit.launch({ 
        headless: config.headless,
        slowMo: config.slowMo 
      });
      break;
    default:
      browser = await chromium.launch({ 
        headless: config.headless,
        slowMo: config.slowMo 
      });
  }
  
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  page = await context.newPage();
  page.setDefaultTimeout(config.pageTimeout);
  page.setDefaultNavigationTimeout(config.navigationTimeout);
  
  fixtures = new PageFixtures(page);
  
  return { page, fixtures };
}

export async function closeBrowser() {
  if (page) await page.close();
  if (context) await context.close();
  if (browser) await browser.close();
}

export function getPage(): Page {
  return page;
}

export function getFixtures(): PageFixtures {
  return fixtures;
}