# Playwright + Cucumber + TypeScript BDD Framework

Complete BDD testing framework using Playwright with Cucumber and TypeScript.

## Prerequisites
- Node.js (v16 or higher)
- Git

## Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Project Structure
```
playwright-cucumber-typescript/
├── src/
│   ├── features/          # Feature files (.feature)
│   ├── steps/             # Step definitions
│   ├── pages/             # Page Object Models
│   ├── hooks/             # Cucumber hooks
│   └── utils/             # Utility functions & fixtures
├── reports/               # Test reports
├── cucumber.js            # Cucumber configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Running Tests
```bash
# Run all tests
npm test

# Run specific feature
npx cucumber-js src/features/homepage.feature

# Run by tags
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@homepage and @smoke"

# Run in parallel
npm run test:parallel
```

## Fixtures

The framework uses fixtures to manage page objects:
```typescript
// Available fixtures in step definitions:
this.fixtures.homePage
this.fixtures.loginPage
this.fixtures.dashboardPage
this.fixtures.searchPage
```

## Available Tags
- `@smoke` - Smoke tests
- `@regression` - Regression tests
- `@homepage` - Homepage tests
- `@login` - Login tests
- `@search` - Search tests
- `@negative` - Negative test cases

## Reports
- HTML Report: `reports/cucumber-report.html`
- JSON Report: `reports/cucumber-report.json`
- Screenshots (on failure): `reports/screenshots/`

## Features
✅ Page Object Model (POM)
✅ Fixture-based architecture
✅ TypeScript support
✅ Cucumber BDD
✅ Multiple browser support
✅ Screenshot on failure
✅ HTML & JSON reports
✅ Parallel execution
✅ Tag-based execution