# Locator Management - Quick Reference

## Files Added

```
src/
├── locators/
│   └── UILocators.properties          # All UI locators (key=value format)
└── utils/
    └── locatorHelper.ts               # Helper to read locators from properties file
```

## Files Modified

- `src/pages/SearchPage.ts` - Updated to use `locatorHelper.getLocator()` instead of hardcoded selectors

## How It Works

### 1. Define Locators (UILocators.properties)

```properties
searchInput=[placeholder*="search"], [placeholder*="Search"], input[type="text"]
searchButton=button:has-text("Search"), [role="button"]:has-text("search")
searchResults=main
noResultsMessage=text=/no.*result/i
resultItems=a[href*="/docs"], article, [role="article"]
```

### 2. Create Page Object with LocatorHelper

```typescript
import { locatorHelper } from '../utils/locatorHelper';

export class SearchPage {
  constructor(page: Page) {
    this.searchInput = page.locator(locatorHelper.getLocator('searchInput')).first();
    this.searchButton = page.locator(locatorHelper.getLocator('searchButton')).first();
  }
}
```

### 3. Use in Step Definitions (No Changes Needed)

```typescript
Given('I am on the search page', async function (this: CustomWorld) {
  await this.searchPage.navigate();  // Works as before!
});
```

## LocatorHelper API

| Method | Purpose | Example |
|--------|---------|---------|
| `getLocator(key)` | Get selector by key | `locatorHelper.getLocator('searchInput')` |
| `getLocators(keys)` | Get multiple selectors | `locatorHelper.getLocators(['searchInput', 'searchButton'])` |
| `hasLocator(key)` | Check if key exists | `locatorHelper.hasLocator('searchInput')` |
| `getAllLocators()` | Get all locators as Map | `locatorHelper.getAllLocators()` |
| `printAllLocators()` | Print to console | `locatorHelper.printAllLocators()` |

## Adding New Locators

### Step 1: Add to UILocators.properties
```properties
loginButton=[role="button"]:has-text("Login")
```

### Step 2: Use in Page Object
```typescript
this.loginButton = page.locator(locatorHelper.getLocator('loginButton')).first();
```

### Step 3: Create Method
```typescript
async clickLogin() {
  await this.loginButton.click();
}
```

## Benefits

✅ **No Hardcoding** - Selectors in one place  
✅ **Easy Updates** - Change selectors without code changes  
✅ **Reusable** - Use same locator in multiple page objects  
✅ **Maintainable** - All selectors tracked centrally  
✅ **Testable** - Can mock locators for unit tests  

## File Structure

```
src/
├── features/
│   └── search_test.feature          # Feature files (unchanged)
├── steps/
│   └── search.steps.ts              # Step definitions (unchanged)
├── pages/
│   └── SearchPage.ts                # Page objects (UPDATED)
├── hooks/
│   └── hooks.ts                     # Hooks (unchanged)
├── support/
│   └── custom-world.ts              # World object (unchanged)
├── locators/                        # NEW
│   └── UILocators.properties        # NEW - All selectors
└── utils/
    ├── config.ts                    # Config (unchanged)
    ├── browser.ts                   # Browser (unchanged)
    ├── fixtures.ts                  # Fixtures (unchanged)
    └── locatorHelper.ts             # NEW - Helper function
```

## Test Results

```
✓ Loaded 18 locators from UILocators.properties
✓ 2 scenarios (2 passed)
✓ 4 steps (4 passed)
```

All tests passing! ✅

## Documentation

For detailed documentation, see:
- `LOCATOR_MANAGEMENT.md` - Complete guide with best practices
- `README.md` - Updated with locator system overview

---

**Quick Start:** Add locators to `src/locators/UILocators.properties`, then use `locatorHelper.getLocator('key')` in page objects!
