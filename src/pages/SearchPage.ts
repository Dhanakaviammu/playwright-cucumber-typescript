import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * SearchPage - Page Object for search functionality
 * 
 * Extends BasePage to inherit common methods and follows the POM pattern.
 * 
 * Example usage in step definitions:
 * await this.searchPage.navigate();
 * await this.searchPage.search('playwright');
 * const visible = await this.searchPage.areResultsVisible();
 */
export class SearchPage extends BasePage {
  // Locator keys from UILocators.properties
  private readonly LOCATOR_SEARCH_INPUT = 'searchInput';
  private readonly LOCATOR_SEARCH_BUTTON = 'searchButton';
  private readonly LOCATOR_SEARCH_RESULTS = 'searchResults';
  private readonly LOCATOR_NO_RESULTS = 'noResultsMessage';
  private readonly LOCATOR_RESULT_ITEMS = 'resultItems';

  // Cached locators
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchResults: Locator;
  private readonly noResultsMessage: Locator;
  private readonly resultItems: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators from properties file using BasePage's helper
    this.searchInput = this.createLocator(this.getLocator(this.LOCATOR_SEARCH_INPUT)).first();
    this.searchButton = this.createLocator(this.getLocator(this.LOCATOR_SEARCH_BUTTON)).first();
    this.searchResults = this.createLocator(this.getLocator(this.LOCATOR_SEARCH_RESULTS)).first();
    this.noResultsMessage = this.createLocator(this.getLocator(this.LOCATOR_NO_RESULTS)).first();
    this.resultItems = this.createLocator(this.getLocator(this.LOCATOR_RESULT_ITEMS)).first();
  }

  /**
   * Search for a query and wait for results
   * @param query - Search term to use
   */
  async search(query: string) {
    await this.fill(this.searchInput, query);
    await this.click(this.searchButton);
    await this.waitForLoadState('networkidle');
  }

  /**
   * Fill search input without submitting
   */
  async fillSearchInput(query: string) {
    await this.fill(this.searchInput, query);
  }

  /**
   * Click search button
   */
  async clickSearchButton() {
    await this.click(this.searchButton);
  }

  /**
   * Get number of search results
   */
  async getResultsCount(): Promise<number> {
    return await this.getCount(this.resultItems);
  }

  /**
   * Get text of first search result
   */
  async getFirstResultText(): Promise<string> {
    return await this.getText(this.resultItems.first());
  }

  /**
   * Check if "no results" message is visible
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await this.isVisible(this.noResultsMessage);
  }

  /**
   * Check if search results are visible
   */
  async areResultsVisible(): Promise<boolean> {
    return await this.isVisible(this.searchResults);
  }

  /**
   * Click result by index
   */
  async clickResultByIndex(index: number) {
    await this.click(this.resultItems.nth(index));
  }

  /**
   * Clear search input
   */
  async clearSearch() {
    await this.searchInput.clear();
  }

  /**
   * Get search input value
   */
  async getSearchInputValue(): Promise<string> {
    return await this.getValue(this.searchInput);
  }

  /**
   * Wait for search results to appear
   */
  async waitForSearchResults(timeout = 10000) {
    await this.waitForVisible(this.searchResults, timeout);
  }

  /**
   * Wait for "no results" message to appear
   */
  async waitForNoResults(timeout = 10000) {
    await this.waitForVisible(this.noResultsMessage, timeout);
  }
}