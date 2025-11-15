# Playwright-Cucumber-TypeScript BDD Framework

A comprehensive **Behavior-Driven Development (BDD)** test automation framework combining **Playwright**, **Cucumber**, and **TypeScript** with the **Page Object Model (POM)** design pattern.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Page Object Model (POM) Logic](#page-object-model-pom-logic)
- [Locator Management System](#locator-management-system)
- [Running Tests](#running-tests)
- [Tag-Based Test Execution](#tag-based-test-execution)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This framework provides a robust testing infrastructure for web automation using:

- **Playwright**: Modern cross-browser automation library
- **Cucumber**: BDD framework supporting Gherkin syntax
- **TypeScript**: Type-safe development experience
- **Page Object Model**: Maintainable test code structure

### Key Features

✅ **BDD Approach**: Write tests in human-readable Gherkin language  
✅ **Page Object Model**: Organized, maintainable test code  
✅ **Centralized Locators**: Manage selectors in UILocators.properties file  
✅ **Tag-Based Execution**: Run specific test groups easily  
✅ **Environment Configuration**: Manage settings via `.env` file  
✅ **Retry Logic**: Automatic navigation retry for flaky networks  
✅ **Screenshot Capture**: Automatic screenshots on test failure  
✅ **HTML Reports**: Beautiful test execution reports  
✅ **TypeScript Support**: Full type safety and IDE support  

---

## 📁 Project Structure

```
playwright-cucumber-typescript/
├── src/
│   ├── features/              # Gherkin feature files
│   │   └── search_test.feature
│   ├── steps/                 # Step definitions (Gherkin implementations)
│   │   └── search.steps.ts
│   ├── pages/                 # Page Object Model classes
│   │   └── SearchPage.ts
│   ├── hooks/                 # Cucumber hooks (Before/After)
│   │   └── hooks.ts
│   ├── support/               # Cucumber world configuration
│   │   └── custom-world.ts
│   └── utils/                 # Utility functions
│       ├── config.ts          # Environment configuration
│       ├── browser.ts         # Browser initialization
│       └── fixtures.ts        # Test fixtures
├── reports/                   # Test execution reports
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   └── screenshots/           # Failed test screenshots
├── index.ts                   # Centralized tag configuration
├── package.json               # npm dependencies and scripts
├── cucumber.js                # Cucumber configuration
├── tsconfig.json              # TypeScript configuration
├── .env                       # Environment variables (local)
├── .env.example              # Environment variables template
└── README.md                  # This file
```

### Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `src/features/` | Gherkin feature files defining test scenarios |
| `src/steps/` | Step definition implementations |
| `src/pages/` | Page Object Model classes encapsulating page interactions |
| `src/hooks/` | Before/After hooks for test setup and teardown |
| `src/support/` | CustomWorld class defining world object properties |
| `src/utils/` | Utility functions for configuration, browser, and fixtures |
| `reports/` | Generated test reports and screenshots |

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v14+)
- **npm** (v6+)
- **Git**

### Steps

1. **Clone the repository** (if applicable):
   ```powershell
   git clone https://github.com/Dhanakaviammu/playwright-cucumber-typescript.git
   cd playwright-cucumber-typescript
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Create environment file** (copy from template):
   ```powershell
   Copy-Item -Path .env.example -Destination .env
   ```

4. **Update `.env`** with your test configuration:
   ```env
   TEST_BASE_URL=https://playwright.dev/
   TEST_ENV=development
   HEADLESS=false
   SLOW_MO=100
   PAGE_TIMEOUT=30000
   NAVIGATION_TIMEOUT=30000
   ```

---

## ⚙️ Configuration

### Environment Variables (`.env` file)

The `.env` file controls runtime behavior:

| Variable | Default | Purpose |
|----------|---------|---------|
| `TEST_BASE_URL` | `https://playwright.dev/` | Base URL for test application |
| `TEST_ENV` | `development` | Test environment identifier |
| `HEADLESS` | `false` | Run browser in headless mode |
| `SLOW_MO` | `100` | Slow down actions by N milliseconds |
| `PAGE_TIMEOUT` | `30000` | Page operation timeout in ms |
| `NAVIGATION_TIMEOUT` | `30000` | Navigation timeout in ms |

### Cucumber Configuration (`cucumber.js`)

```javascript
module.exports = {
  default: {
    require: ['src/support/**/*.ts', 'src/hooks/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress', 
      'html:reports/cucumber-report.html', 
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 1,
    paths: ['src/features/**/*.feature']
  }
};
```

**Key Points:**
- `require` order is critical: **support → hooks → steps** (ensures CustomWorld is registered before use)
- `ts-node/register` enables TypeScript compilation on the fly
- Reports are generated in HTML and JSON formats
- `parallel: 1` runs tests sequentially (change to `2+` for parallel execution)

### Tag Configuration (`index.ts`)

Centralized tag definitions for tag-based test execution:

```typescript
export const ui = '@ui';
export const api = '@api';
export const smoke = '@smoke';
export const regression = '@regression';
export const sanity = '@sanity';
export const functionality = '@functionality';
export const edgeCase = '@edge-case';
```

---

## 🏗️ Architecture & Design Patterns

### 1. **Page Object Model (POM)**

The POM pattern encapsulates page interactions into reusable classes, improving maintainability and reducing duplication.

#### How It Works

```typescript
// src/pages/SearchPage.ts - Encapsulates all search page interactions
export class SearchPage {
  private page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[placeholder*="search"]');
    this.searchButton = page.getByRole('button', { name: /search/i });
  }

  async navigate(url: string = config.baseUrl) {
    // Navigate with retry logic
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
```

#### Benefits

✅ **Maintainability**: Locators defined in one place  
✅ **Reusability**: Methods can be used across multiple tests  
✅ **Readability**: Clear method names describe actions  
✅ **Reduced Duplication**: No repeated locator definitions  
✅ **Easy Updates**: Change locators in one file, affects all tests  

---

### 2. **CustomWorld Pattern**

The `CustomWorld` class extends Cucumber's `World` class to hold test context and page objects.

```typescript
// src/support/custom-world.ts
export class CustomWorld extends World {
  public page!: Page;                    // Playwright Page object
  public searchPage!: SearchPage;        // POM instance
  public pageTitle?: string;             // Test data
  public searchResults?: any;            // Test data
  
  constructor(options: IWorldOptions) {
    super(options);
  }
}
```

#### Direct POM Access Pattern

Step definitions access page objects directly from the world:

```typescript
// ❌ OLD WAY (wrapper pattern)
await this.fixtures.searchPage.navigate();

// ✅ NEW WAY (direct access)
await this.searchPage.navigate();
```

**Advantages:**
- Simpler syntax
- Fewer indirection levels
- Better IDE autocompletion
- Cleaner, more readable code

---

### 3. **Hooks Lifecycle** - Detailing:
   - Before/After hook flow
   - Setup and teardown process

---

## 🎯 Locator Management System

The framework includes a centralized locator management system to keep all UI element selectors in one place.

### Structure

```
src/
├── locators/
│   └── UILocators.properties      # All UI element selectors (key=value pairs)
└── utils/
    └── locatorHelper.ts           # Helper function to read locators
```

### UILocators.properties Format

```properties
# Search Page Locators
searchInput=[placeholder*="search"], [placeholder*="Search"], input[type="text"]
searchButton=button:has-text("Search"), [role="button"]:has-text("search")
searchResults=main
noResultsMessage=text=/no.*result/i
resultItems=a[href*="/docs"], article, [role="article"]
```

### Using Locators in Page Objects

**Before (Hardcoded Selectors):**
```typescript
export class SearchPage {
  constructor(page: Page) {
    // Selectors hardcoded - difficult to update
    this.searchInput = page.locator('[placeholder*="search"]').first();
    this.searchButton = page.getByRole('button', { name: /search/i }).first();
  }
}
```

**After (Using LocatorHelper):**
```typescript
import { locatorHelper } from '../utils/locatorHelper';

export class SearchPage {
  constructor(page: Page) {
    // Locators loaded from properties file
    this.searchInput = page.locator(locatorHelper.getLocator('searchInput')).first();
    this.searchButton = page.locator(locatorHelper.getLocator('searchButton')).first();
  }
}
```

### LocatorHelper Methods

```typescript
// Get a single locator
locatorHelper.getLocator('searchInput');

// Get multiple locators
locatorHelper.getLocators(['searchInput', 'searchButton']);

// Check if locator exists
locatorHelper.hasLocator('searchInput');

// Get all locators
locatorHelper.getAllLocators();

// Debug - print all locators to console
locatorHelper.printAllLocators();
```

### Benefits

✅ **Centralized Management**: All selectors in one file  
✅ **Easy Updates**: Change selectors without modifying code  
✅ **Reduced Duplication**: Reuse locators across page objects  
✅ **Better Maintainability**: Track all selectors in one place  
✅ **Single Responsibility**: Page objects focus on behavior  

For detailed documentation, see [LOCATOR_MANAGEMENT.md](./LOCATOR_MANAGEMENT.md)

---

## 📄 Page Object Model (POM) Logic - Detailed Explanation

### Core POM Principles

The Page Object Model treats each page as an object with:
- **Properties**: Page elements (locators)
- **Methods**: Page interactions (actions)

### SearchPage Implementation

```typescript
export class SearchPage {
  private page: Page;
  
  // Locators are private - encapsulated
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators once during initialization
    this.searchInput = page.locator('[placeholder*="search"]');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.searchResults = page.locator('main').first();
  }

  // Public methods expose actions
  async navigate(url: string = config.baseUrl) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async areResultsVisible(): Promise<boolean> {
    try {
      return await this.searchResults.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }
}
```

### POM vs Non-POM Comparison

#### ❌ Without POM (Anti-pattern)

```typescript
// Locators scattered in step definitions
Given('I search for {string}', async function (this: CustomWorld, query: string) {
  await this.page.locator('[placeholder*="search"]').fill(query);
  await this.page.getByRole('button', { name: /search/i }).click();
  await this.page.waitForLoadState('networkidle');
});

When('I view results', async function (this: CustomWorld) {
  await this.page.locator('[placeholder*="search"]').fill('test');  // DUPLICATE!
  // Hard to maintain, locator changes require multiple edits
});
```

#### ✅ With POM (Best Practice)

```typescript
// Locators in one place, methods in step definitions
Given('I search for {string}', async function (this: CustomWorld, query: string) {
  await this.searchPage.search(query);
});

When('I view results', async function (this: CustomWorld) {
  const visible = await this.searchPage.areResultsVisible();
  expect(visible).toBeTruthy();
});
```

### POM Benefits Summary

| Aspect | Benefit |
|--------|---------|
| **Maintainability** | Change locator in SearchPage, all tests update automatically |
| **Readability** | `searchPage.search()` is clearer than `locator.fill().click()` |
| **Reusability** | Methods can be used by multiple step definitions |
| **Scalability** | Easy to add new pages and methods |
| **Testing** | Page logic can be unit tested separately |
| **DRY Principle** | No duplicate locator definitions |

---

## 🧪 Running Tests

### Run All Tests

```powershell
npm test
```

Runs all scenarios in all feature files.

### Run Tests in Parallel

```powershell
npm run test:parallel
```

Executes tests in parallel (configured for 2 workers).

### Generate Test Report

```powershell
npm run report
```

Opens the HTML test report in your default browser.

---

## 🏷️ Tag-Based Test Execution

### Available Tags

| Tag | Purpose | Command |
|-----|---------|---------|
| `@ui` | UI/Frontend tests | `npm run test:ui` |
| `@api` | API tests | `npm run test:api` |
| `@smoke` | Quick smoke tests | `npm run test:smoke` |
| `@regression` | Full regression suite | `npm run test:regression` |
| `@sanity` | Basic functionality | `npm run test:sanity` |
| `@functionality` | Feature functionality | `npm run test:functionality` |
| `@edge-case` | Edge case tests | `npm run test:edge-case` |

### Running Tag-Specific Tests

```powershell
# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run smoke tests
npm run test:smoke
```

### Combining Tags in Feature Files

```gherkin
# Run with: npm run test:ui
@ui @smoke
Feature: Search Functionality

  @smoke
  Scenario: Navigate to playwright homepage
    Given I am on the search page
    Then the page should load successfully

  @smoke @api
  Scenario: Check page title
    Given I am on the search page
    Then the page title should contain "Playwright"
```

### Tag Configuration Management

Tags are defined in `index.ts` (single source of truth):

```typescript
// index.ts
export const ui = '@ui';
export const api = '@api';
export const smoke = '@smoke';

// These constants are exported for use in code
export const TAGS = {
  UI: ui,
  API: api,
  SMOKE: smoke,
};
```

**Important Note:** `package.json` scripts have hard-coded tag values and must be kept synchronized with `index.ts` when adding new tags.

---

## ✍️ Writing Tests

### Step 1: Create Feature File

```gherkin
# src/features/login_test.feature
@ui @regression
Feature: Login Functionality

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should see the dashboard
```

### Step 2: Create Page Object

```typescript
// src/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.page.locator('h1:has-text("Dashboard")').isVisible();
  }
}
```

### Step 3: Update CustomWorld

```typescript
// src/support/custom-world.ts
import { LoginPage } from '../pages/LoginPage';

export class CustomWorld extends World {
  public page!: Page;
  public searchPage!: SearchPage;
  public loginPage!: LoginPage;  // Add new page object
  
  // ... rest of properties
}
```

### Step 4: Update Hooks

```typescript
// src/hooks/hooks.ts
Before(async function (this: CustomWorld) {
  const { page } = await launchBrowser();
  this.page = page;
  this.searchPage = new SearchPage(page);
  this.loginPage = new LoginPage(page);  // Initialize new page
});
```

### Step 5: Write Step Definitions

```typescript
// src/steps/login.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate(`${config.baseUrl}/login`);
});

When('I enter valid credentials', async function (this: CustomWorld) {
  await this.loginPage.login('testuser', 'password123');
});

Then('I should see the dashboard', async function (this: CustomWorld) {
  const isDashboardVisible = await this.loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});
```

---

## 🎯 Best Practices

### 1. **Page Object Guidelines**

✅ **DO:**
- Create a separate class for each page/section
- Use descriptive method names
- Keep locators private
- Use readonly for locators
- Group related locators together

❌ **DON'T:**
- Put logic in step definitions
- Share locators across page objects
- Use generic locators like `.first()`
- Mix different page interactions in one method

### 2. **Step Definition Guidelines**

✅ **DO:**
- Use page object methods
- Keep step definitions clean and simple
- Use meaningful assertions
- Follow Given-When-Then pattern

❌ **DON'T:**
- Define locators in step definitions
- Chain multiple actions in one step
- Use generic step definitions
- Ignore error messages

### 3. **Feature File Guidelines**

✅ **DO:**
- Use clear, business-readable language
- Follow Gherkin syntax strictly
- Use appropriate tags
- Group related scenarios
- Use data tables for multiple values

❌ **DON'T:**
- Write technical implementation details
- Use ambiguous step definitions
- Create overly complex scenarios
- Mix multiple features in one file

### 4. **Environment Configuration**

✅ **DO:**
- Use `.env` for all configuration
- Keep `.env.example` updated
- Use meaningful variable names
- Document required variables

❌ **DON'T:**
- Hard-code URLs or credentials
- Commit `.env` file to git
- Use production credentials in development
- Mix environment configs with code

---

## 🐛 Troubleshooting

### Issue: "Undefined step" error

**Cause:** Step definition not matching feature file step.

**Solution:**
```typescript
// Make sure step definition matches feature file exactly
// Feature: "Given I am on the search page"
Given('I am on the search page', async function (this: CustomWorld) {
  // implementation
});
```

### Issue: CustomWorld is undefined

**Cause:** Incorrect `cucumber.js` require order.

**Solution:** Ensure `cucumber.js` requires in correct order:
```javascript
require: ['src/support/**/*.ts', 'src/hooks/**/*.ts', 'src/steps/**/*.ts']
```

The `CustomWorld` must be registered (in support) BEFORE steps are loaded.

### Issue: Navigation timeout

**Cause:** Network delays or page loading issues.

**Solution:** SearchPage includes automatic retry logic:
```typescript
async navigate(url: string = config.baseUrl) {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
      return;
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      await this.page.waitForTimeout(1000 * attempt);
    }
  }
}
```

Adjust timeouts in `.env` if needed:
```env
NAVIGATION_TIMEOUT=45000
PAGE_TIMEOUT=45000
```

### Issue: Locators not finding elements

**Cause:** Incorrect selectors or timing issues.

**Solution:**
```typescript
// Use more robust selectors
// Instead of: page.locator('button')  // Too generic
// Use: page.getByRole('button', { name: 'Submit' })  // More specific

// Add appropriate waits
await this.page.waitForSelector('[name="username"]');
await this.page.waitForLoadState('networkidle');
```

### Issue: Tests pass locally but fail in CI/CD

**Cause:** Environmental differences or timing issues.

**Solution:**
- Increase timeouts in `.env` for CI environment
- Use explicit waits instead of implicit sleeps
- Ensure test data is available in CI environment
- Check network conditions in CI

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

---

## 📝 License

ISC

---

## 👥 Contributing

Contributions are welcome! Please follow the best practices outlined in this README and ensure all tests pass before submitting pull requests.

---

**Last Updated:** November 15, 2025  
**Framework Version:** 1.0.0
