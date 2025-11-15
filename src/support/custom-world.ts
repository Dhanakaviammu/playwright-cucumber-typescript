import { World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

export class CustomWorld extends World {
  // Page objects - Direct POM access
  public page!: Page;
  public searchPage!: SearchPage;

  // Test data
  public pageTitle?: string;
  public searchResults?: any;
  public errorMessage?: string;
  public welcomeMessage?: string;
  public resultsCount?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}