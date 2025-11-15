import { Before, After, BeforeAll, AfterAll, Status, setWorldConstructor } from '@cucumber/cucumber';
import { launchBrowser, closeBrowser, getPage } from '../utils/browser';
import { CustomWorld } from '../support/custom-world';
import { SearchPage } from '../pages/SearchPage';

// Set the custom world constructor
setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  console.log('Test Suite Started');
});

Before(async function (this: CustomWorld) {
  const { page, fixtures } = await launchBrowser();
  
  // Assign page directly to world
  this.page = page;
  
  // Initialize page objects directly on world (POM Pattern)
  this.searchPage = new SearchPage(page);
});

After(async function (this: CustomWorld, { pickle, result }) {
  try {
    const page = getPage();
    
    if (result?.status === Status.FAILED && page) {
      const screenshot = await page.screenshot({ 
        path: `reports/screenshots/${pickle.name.replace(/\s+/g, '_')}.png`,
        fullPage: true 
      });
      this.attach(screenshot, 'image/png');
    }
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
  }
  
  try {
    await closeBrowser();
  } catch (error) {
    console.error('Failed to close browser:', error);
  }
});

AfterAll(async function () {
  console.log('Test Suite Completed');
});