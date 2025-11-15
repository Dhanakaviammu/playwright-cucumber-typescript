# Test Tag Configuration Guide

## Overview
This project uses Cucumber tags to organize and run specific test suites. Tags help you run tests selectively based on their type or purpose.

## Tag Configuration Files

### 1. **Tag Definitions** (`src/config/tags/index.ts`)
Centralized location for all tag constants:
```typescript
export const TAGS = {
  UI: '@ui',
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  SANITY: '@sanity',
  FUNCTIONALITY: '@functionality',
  EDGE_CASE: '@edge-case',
};
```

## How to Use Tags

### In Feature Files
Add tags above feature or scenario:
```gherkin
@ui @smoke
Feature: Search Functionality

  @smoke
  Scenario: Navigate to playwright homepage
    Given I am on the search page
    Then the page should load successfully
```

### Available NPM Commands

Run tests by specific tags:

```bash
# Run all tests (no tag filter)
npm test

# Run UI tests only
npm run test:ui

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run sanity tests only
npm run test:sanity

# Run functionality tests only
npm run test:functionality

# Run edge case tests only
npm run test:edge-case

# Run all tests in parallel (2 workers)
npm run test:parallel

# View test report
npm run report
```

## Tag Combinations (Advanced)

You can also run tests with multiple tags using the `test:tags` script:

```bash
# Run tests with @ui AND @smoke
npm run test:tags "@ui and @smoke"

# Run tests with @ui OR @smoke
npm run test:tags "@ui or @smoke"

# Run tests that have @ui but NOT @smoke
npm run test:tags "@ui and not @smoke"
```

## Current Test Setup

**Feature File:** `src/features/search_test.feature`
- Tags: `@ui`, `@smoke`
- Tests: 2 scenarios (Navigate & Check Title)
- Status: ✅ All passing

## Best Practices

1. **Always tag your features/scenarios** - Makes test management easier
2. **Use consistent tag names** - Defined in `src/config/tags/index.ts`
3. **Combine tags semantically** - Use `@ui` for UI tests, `@smoke` for quick checks
4. **Run tag-specific tests in CI/CD** - Improves test execution efficiency

## Adding New Tags

1. Add the new tag to `src/config/tags/index.ts`:
   ```typescript
   export const TAGS = {
     // ... existing tags
     PERFORMANCE: '@performance',
   };
   ```

2. Add npm script in `package.json`:
   ```json
   "test:performance": "cucumber-js --tags \"@performance\""
   ```

3. Use the tag in feature files:
   ```gherkin
   @performance
   Scenario: Load test page
   ```

## Example Workflow

```bash
# 1. Run quick smoke tests during development
npm run test:smoke

# 2. Run full UI tests before push
npm run test:ui

# 3. Run regression tests before release
npm run test:regression

# 4. View test report
npm run report
```
