import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { AssertionHelper } from '../utils/assertionHelper';
import { WaitHelper } from '../utils/waitHelper';
import { dataHelper } from '../utils/dataHelper';

/**
 * Search Step Definitions
 * 
 * Demonstrates the use of:
 * - BasePage methods (inherited by SearchPage)
 * - AssertionHelper for consistent assertions
 * - WaitHelper for proper synchronization
 * - DataHelper for test data
 */

Given('I am on the search page', async function (this: CustomWorld) {
  await this.searchPage.navigate();
  
  // Verify page loaded successfully
  const title = await this.searchPage.getTitle();
  expect(title).toBeTruthy();
});

When('I search for {string}', async function (this: CustomWorld, query: string) {
  // Use inherited fill and click methods from BasePage
  await this.searchPage.search(query);
  
  // Wait for results to load
  await WaitHelper.waitForNetworkIdle(this.page);
});

When('I fill the search input with {string}', async function (this: CustomWorld, query: string) {
  await this.searchPage.fillSearchInput(query);
});

When('I click the search button', async function (this: CustomWorld) {
  await this.searchPage.clickSearchButton();
});

Then('the page should load successfully', async function (this: CustomWorld) {
  const pageTitle = await this.searchPage.getTitle();
  
  // Use AssertionHelper for cleaner assertions
  await AssertionHelper.toBeTrue(pageTitle.length > 0, 'Page title should not be empty');
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedText: string) {
  const pageTitle = await this.searchPage.getTitle();
  
  // Use AssertionHelper for consistent assertion syntax
  await AssertionHelper.textToContain(pageTitle, expectedText, 'Page title');
});

Then('I should see search results', async function (this: CustomWorld) {
  // Use inherited isVisible method from BasePage
  const areVisible = await this.searchPage.areResultsVisible();
  
  await AssertionHelper.toBeTrue(areVisible, 'Search results should be visible');
});

Then('results count should be greater than {int}', async function (this: CustomWorld, expectedCount: number) {
  // Get results count using inherited method
  const resultsCount = await this.searchPage.getResultsCount();
  
  // Store in world for later use
  this.resultsCount = resultsCount;
  
  // Use AssertionHelper for number comparison
  await AssertionHelper.numberGreaterThan(resultsCount, expectedCount, 'Results count');
});

Then('I should see {string} message', async function (this: CustomWorld, message: string) {
  const isNoResultsVisible = await this.searchPage.isNoResultsVisible();
  
  await AssertionHelper.toBeTrue(isNoResultsVisible, `Should see "${message}" message`);
});

Then('the search input should contain {string}', async function (this: CustomWorld, expectedValue: string) {
  const inputValue = await this.searchPage.getSearchInputValue();
  
  await AssertionHelper.textToEqual(inputValue, expectedValue, 'Search input value');
});

Then('search results should be {int} or more', async function (this: CustomWorld, minCount: number) {
  // Use WaitHelper to wait for results to appear
  await WaitHelper.waitForNetworkIdle(this.page);
  
  const resultsCount = await this.searchPage.getResultsCount();
  await AssertionHelper.numberGreaterThanOrEqual(resultsCount, minCount, 'Results count');
});

Then('I wait for search results to load', async function (this: CustomWorld) {
  await this.searchPage.waitForSearchResults(10000);
  
  console.log('✓ Search results loaded');
});

Then('I clear the search input', async function (this: CustomWorld) {
  await this.searchPage.clearSearch();
  
  // Verify it's cleared
  const value = await this.searchPage.getSearchInputValue();
  await AssertionHelper.textToEqual(value, '', 'Search input should be cleared.');
});