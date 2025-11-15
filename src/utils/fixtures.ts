import { Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

export class PageFixtures {
  public page: Page;
  public searchPage: SearchPage;

  constructor(page: Page) {
    this.page = page;
    this.searchPage = new SearchPage(page);
  }
}