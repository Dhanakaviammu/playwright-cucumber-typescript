import { Page, Locator } from '@playwright/test';

/**
 * WaitHelper - Centralized wait/delay utilities
 * 
 * Provides common wait strategies and delay utilities.
 * Useful for synchronization without hardcoded waits.
 * 
 * Benefits:
 * - Consistent wait strategies
 * - Reduce flakiness in tests
 * - Better than arbitrary sleep times
 * - Centralized timeout management
 * 
 * Usage:
 * await waitHelper.waitForTimeout(2000);
 * await waitHelper.waitForElementCount(page, 'button', 5);
 */

export class WaitHelper {
  /**
   * Wait for specified milliseconds
   * @param ms - Milliseconds to wait
   */
  static async waitForTimeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Wait for element count to match expected count
   */
  static async waitForElementCount(
    page: Page,
    selector: string,
    expectedCount: number,
    timeout = 10000
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const count = await page.locator(selector).count();
      if (count === expectedCount) {
        return;
      }
      await this.waitForTimeout(100);
    }
    const message = `Expected ${expectedCount} elements with selector "${selector}", but found different count after ${timeout}ms`;
    throw new Error(message);
  }

  /**
   * Wait for text to appear on page
   */
  static async waitForText(
    page: Page,
    text: string,
    timeout = 10000
  ): Promise<void> {
    await page.waitForSelector(`text=${text}`, { timeout });
  }

  /**
   * Wait for text to appear in specific element
   */
  static async waitForElementWithText(
    page: Page,
    selector: string,
    text: string,
    timeout = 10000
  ): Promise<void> {
    await page.waitForSelector(`${selector}:has-text("${text}")`, { timeout });
  }

  /**
   * Wait for function to return true
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout = 10000,
    interval = 100
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.waitForTimeout(interval);
    }
    throw new Error(`Condition was not met within ${timeout}ms`);
  }

  /**
   * Wait for multiple conditions
   */
  static async waitForConditions(
    conditions: Array<() => Promise<boolean>>,
    timeout = 10000,
    interval = 100
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const results = await Promise.all(conditions.map(cond => cond()));
      if (results.every(result => result === true)) {
        return;
      }
      await this.waitForTimeout(interval);
    }
    throw new Error(`Not all conditions were met within ${timeout}ms`);
  }

  /**
   * Wait with exponential backoff
   */
  static async waitWithBackoff(
    condition: () => Promise<boolean>,
    maxAttempts = 3,
    initialDelay = 1000
  ): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        if (await condition()) {
          return;
        }
      } catch (error) {
        lastError = error as Error;
      }

      if (attempt < maxAttempts) {
        const delayMs = initialDelay * attempt;
        await this.waitForTimeout(delayMs);
      }
    }

    throw lastError || new Error(`Condition failed after ${maxAttempts} attempts`);
  }

  /**
   * Retry operation with backoff
   */
  static async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxAttempts = 3,
    initialDelay = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.warn(`Attempt ${attempt}/${maxAttempts} failed: ${lastError.message}`);

        if (attempt < maxAttempts) {
          const delayMs = initialDelay * attempt;
          console.log(`Waiting ${delayMs}ms before retry...`);
          await this.waitForTimeout(delayMs);
        }
      }
    }

    throw lastError || new Error(`Operation failed after ${maxAttempts} attempts`);
  }

  /**
   * Wait for element to be removed from DOM
   */
  static async waitForElementRemoved(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Wait for element to have specific attribute value
   */
  static async waitForAttributeValue(
    page: Page,
    selector: string,
    attribute: string,
    value: string,
    timeout = 10000
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const attrValue = await page.locator(selector).getAttribute(attribute);
      if (attrValue === value) {
        return;
      }
      await this.waitForTimeout(100);
    }
    const message = `Attribute "${attribute}" did not equal "${value}" within ${timeout}ms`;
    throw new Error(message);
  }

  /**
   * Wait for element to have specific class
   */
  static async waitForClass(
    page: Page,
    selector: string,
    className: string,
    timeout = 10000
  ): Promise<void> {
    await this.waitForAttributeValue(page, selector, 'class', className, timeout);
  }

  /**
   * Wait for network idle
   */
  static async waitForNetworkIdle(
    page: Page,
    timeout = 10000
  ): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for page load
   */
  static async waitForPageLoad(
    page: Page,
    timeout = 10000
  ): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Wait for DOM content loaded
   */
  static async waitForDOMContentLoaded(
    page: Page,
    timeout = 10000
  ): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }
}

export const waitHelper = new WaitHelper();

export default WaitHelper;
