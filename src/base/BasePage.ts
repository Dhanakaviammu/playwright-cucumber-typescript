import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';
import { locatorHelper } from '../utils/locatorHelper';

/**
 * BasePage - Base class for all page objects
 * 
 * Provides common methods and utilities that all pages inherit.
 * Implements the Page Object Model (POM) pattern for reusability.
 * 
 * Benefits:
 * - Centralized common actions (click, fill, navigate, etc.)
 * - Consistent error handling and logging
 * - Built-in wait strategies
 * - Easy to extend with new page objects
 * 
 * Usage:
 * export class LoginPage extends BasePage {
 *   constructor(page: Page) {
 *     super(page);
 *   }
 * }
 */
export class BasePage {
  protected page: Page;
  protected readonly baseUrl = config.baseUrl;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   * @param waitUntil - Wait condition: 'domcontentloaded' | 'load' | 'networkidle'
   */
  async navigate(url: string = this.baseUrl, waitUntil: 'domcontentloaded' | 'load' | 'networkidle' = 'load') {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto(url, { waitUntil });
        console.log(`[OK] Successfully navigated to: ${url}`);
        return;
      } catch (error) {
        console.warn(`[WARNING] Navigation attempt ${attempt}/${maxAttempts} failed for ${url}`);
        if (attempt === maxAttempts) {
          throw new Error(`Failed to navigate to ${url} after ${maxAttempts} attempts: ${error}`);
        }
        // Exponential backoff: 1s, 2s, 3s
        await this.page.waitForTimeout(1000 * attempt);
      }
    }
  }

  /**
   * Navigate back in browser history
   */
  async goBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate forward in browser history
   */
  async goForward() {
    await this.page.goForward();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Refresh the current page
   */
  async refresh() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  // ============================================
  // ELEMENT INTERACTION METHODS
  // ============================================

  /**
   * Click on an element
   * @param locator - Element to click
   * @param waitForNavigation - Whether to wait for navigation to complete
   */
  async click(locator: string | Locator, waitForNavigation = false) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    
    if (waitForNavigation) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle' }),
        element.click()
      ]);
    } else {
      await element.click();
    }
  }

  /**
   * Double-click on an element
   */
  async doubleClick(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.dblclick();
  }

  /**
   * Right-click on an element
   */
  async rightClick(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click({ button: 'right' });
  }

  /**
   * Fill text input with value
   * @param locator - Input element to fill
   * @param value - Value to fill
   * @param clearFirst - Clear field before filling (default: true)
   */
  async fill(locator: string | Locator, value: string, clearFirst = true) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    
    if (clearFirst) {
      await element.clear();
    }
    await element.fill(value);
  }

  /**
   * Type text character by character (slower, more realistic)
   */
  async type(locator: string | Locator, value: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.type(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: string | Locator, value: string | { label?: string; value?: string; index?: number }) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
  }

  /**
   * Check a checkbox
   */
  async check(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.check();
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(locator: string | Locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.uncheck();
  }

  /**
   * Press keyboard keys
   */
  async press(key: string) {
    await this.page.press('body', key);
  }

  /**
   * Press keyboard keys on specific element
   */
  async pressKey(locator: string | Locator, key: string) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.press(key);
  }

  // ============================================
  // TEXT & VALUE RETRIEVAL METHODS
  // ============================================

  /**
   * Get text content of element
   */
  async getText(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const text = await element.textContent();
    return text?.trim() || '';
  }

  /**
   * Get value of input element
   */
  async getValue(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.inputValue();
  }

  /**
   * Get attribute value
   */
  async getAttribute(locator: string | Locator, attribute: string): Promise<string | null> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.getAttribute(attribute);
  }

  /**
   * Get all text content from elements matching selector
   */
  async getAllText(locator: string | Locator): Promise<string[]> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.allTextContents();
  }

  // ============================================
  // VISIBILITY & STATE CHECKING METHODS
  // ============================================

  /**
   * Check if element is visible
   */
  async isVisible(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    try {
      return await element.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if element exists in DOM
   */
  async isPresent(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    try {
      return (await element.count()) > 0;
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isEnabled();
  }

  /**
   * Check if element is disabled
   */
  async isDisabled(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return !(await element.isEnabled());
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isChecked(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isChecked();
  }

  /**
   * Count elements matching selector
   */
  async getCount(locator: string | Locator): Promise<number> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.count();
  }

  // ============================================
  // WAIT METHODS
  // ============================================

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: string | Locator, timeout = 10000) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: string | Locator, timeout = 10000) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   */
  async waitForPresent(locator: string | Locator, timeout = 10000) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for URL to change
   */
  async waitForURL(url: string | RegExp, timeout = 10000) {
    await this.page.waitForURL(url, { timeout });
  }

  /**
   * Wait for URL to contain text
   */
  async waitForURLToContain(text: string, timeout = 10000) {
    await this.page.waitForURL(new RegExp(text), { timeout });
  }

  /**
   * Wait for page load state
   */
  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for specific time (use sparingly)
   */
  async waitFor(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  // ============================================
  // PAGE CONTENT METHODS
  // ============================================

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Check if page contains text
   */
  async pageContainsText(text: string): Promise<boolean> {
    try {
      await this.page.locator(`text=${text}`).first().isVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all text on page
   */
  async getPageText(): Promise<string> {
    return await this.page.textContent('body') || '';
  }

  /**
   * Execute JavaScript on page
   */
  async executeScript<T = any>(script: string, ...args: any[]): Promise<T> {
    return await this.page.evaluate(script, ...args);
  }

  // ============================================
  // SCREENSHOT & DEBUGGING METHODS
  // ============================================

  /**
   * Take screenshot of page
   */
  async takeScreenshot(name: string = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `reports/screenshots/${name}_${timestamp}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    console.log(`✓ Screenshot saved: ${filename}`);
  }

  /**
   * Take screenshot of specific element
   */
  async takeElementScreenshot(locator: string | Locator, name: string = 'element') {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `reports/screenshots/${name}_${timestamp}.png`;
    await element.screenshot({ path: filename });
    console.log(`✓ Element screenshot saved: ${filename}`);
  }

  /**
   * Get page source HTML
   */
  async getPageSource(): Promise<string> {
    return await this.page.content();
  }

  // ============================================
  // LOCATOR HELPER METHODS
  // ============================================

  /**
   * Get locator from properties file
   */
  protected getLocator(key: string): string {
    return locatorHelper.getLocator(key);
  }

  /**
   * Get multiple locators from properties file
   */
  protected getLocators(keys: string[]): Record<string, string> {
    return locatorHelper.getLocators(keys);
  }

  /**
   * Create Playwright locator object
   */
  protected createLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get page object for method chaining
   */
  getPage(): Page {
    return this.page;
  }
}
