import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';
import { locatorHelper } from '../utils/locatorHelper';

export class SearchPage {
  private page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchResults: Locator;
  private readonly noResultsMessage: Locator;
  private readonly resultItems: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators from UILocators.properties file
    this.searchInput = page.locator(locatorHelper.getLocator('searchInput')).first();
    this.searchButton = page.locator(locatorHelper.getLocator('searchButton')).first();
    this.searchResults = page.locator(locatorHelper.getLocator('searchResults')).first();
    this.noResultsMessage = page.locator(locatorHelper.getLocator('noResultsMessage')).first();
    this.resultItems = page.locator(locatorHelper.getLocator('resultItems')).first();
  }

  async navigate(url: string = config.baseUrl) {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto(url, { waitUntil: 'networkidle' });
        return;
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        // brief backoff before retrying
        await this.page.waitForTimeout(1000 * attempt);
      }
    }
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillSearchInput(query: string) {
    await this.searchInput.fill(query);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async getResultsCount(): Promise<number> {
    return await this.resultItems.count();
  }

  async getFirstResultText(): Promise<string> {
    return await this.resultItems.first().textContent() || '';
  }

  async isNoResultsVisible(): Promise<boolean> {
    try {
      return await this.noResultsMessage.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async areResultsVisible(): Promise<boolean> {
    try {
      return await this.searchResults.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async clickResultByIndex(index: number) {
    await this.resultItems.nth(index).click();
  }
}