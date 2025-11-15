import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('I am on the search page', async function (this: CustomWorld) {
  await this.searchPage.navigate();
});

When('I search for {string}', async function (this: CustomWorld, query: string) {
  await this.searchPage.search(query);
});

Then('the page should load successfully', async function (this: CustomWorld) {
  const pageTitle = await this.page.title();
  expect(pageTitle).toBeTruthy();
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedText: string) {
  const pageTitle = await this.page.title();
  expect(pageTitle).toContain(expectedText);
});

Then('I should see search results', async function (this: CustomWorld) {
  const areResultsVisible = await this.searchPage.areResultsVisible();
  expect(areResultsVisible).toBeTruthy();
});

Then('results count should be greater than {int}', async function (this: CustomWorld, count: number) {
  this.resultsCount = await this.searchPage.getResultsCount();
  expect(this.resultsCount).toBeGreaterThan(count);
});

Then('I should see {string} message', async function (this: CustomWorld, message: string) {
  const isNoResultsVisible = await this.searchPage.isNoResultsVisible();
  expect(isNoResultsVisible).toBeTruthy();
});