# Tag Configuration System

## Architecture Overview

This project uses a **centralized tag configuration** where all test tags and their corresponding npm scripts are defined in **`src/config/tags/index.ts`** (PRIMARY CONFIGURATION FILE).

### File Structure

```
playwright-cucumber-typescript/
├── package.json                      # References tags defined in index.ts
├── src/
│   ├── config/
│   │   └── tags/
│   │       └── index.ts             # 📌 CENTRAL CONFIG (Single Source of Truth)
│   └── features/
│       └── search_test.feature      # Uses tags defined in index.ts
└── ...
```

## How It Works

### 1. **Primary Configuration** (`src/config/tags/index.ts`)

All tags and commands are defined in one place:

```typescript
export const TAGS = {
  UI: '@ui',
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  // ... more tags
};

export const TAG_SCRIPTS = {
  'test:ui': `cucumber-js --tags "${TAGS.UI}"`,
  'test:smoke': `cucumber-js --tags "${TAGS.SMOKE}"`,
  // ... more scripts
};
```

### 2. **Package.json References**

NPM scripts use the tag definitions from `index.ts`:

```json
{
  "scripts": {
    "test:ui": "cucumber-js --tags \"@ui\"",
    "test:smoke": "cucumber-js --tags \"@smoke\""
  }
}
```

### 3. **Feature Files Use Tags**

```gherkin
@ui @smoke
Feature: Search Functionality

  @smoke
  Scenario: Navigate to playwright homepage
    ...
```

## Single Source of Truth

When you need to **change or add a tag**, you update **`src/config/tags/index.ts`**

### Example: Adding a new tag

1. **Update `src/config/tags/index.ts`:**
   ```typescript
   export const TAGS = {
     UI: '@ui',
     PERFORMANCE: '@performance',  // ← NEW
   };
   
   export const TAG_SCRIPTS = {
     'test:performance': `cucumber-js --tags "${TAGS.PERFORMANCE}"`,  // ← NEW
   };
   ```

2. **Add/Update in `package.json`:**
   ```json
   "test:performance": "cucumber-js --tags \"@performance\""
   ```

3. **Use in feature files:**
   ```gherkin
   @performance
   Scenario: Performance test
   ```

## Available Commands

All commands defined in `src/config/tags/index.ts`:

```bash
npm run test              # Run all tests
npm run test:ui           # Run @ui tagged tests
npm run test:smoke        # Run @smoke tagged tests
npm run test:regression   # Run @regression tagged tests
npm run test:sanity       # Run @sanity tagged tests
npm run test:functionality # Run @functionality tagged tests
npm run test:edge-case    # Run @edge-case tagged tests
npm run test:parallel     # Run tests in parallel (2 workers)
npm run report            # Open test report
```

## Benefits of This Approach

✅ **DRY (Don't Repeat Yourself)** - Tags defined once, exported from index.ts  
✅ **Easy Maintenance** - Change tags in one place  
✅ **Consistency** - All scripts use the same tag values  
✅ **Scalability** - Easy to add new tags and commands  
✅ **TypeScript-First** - Primary config is in TypeScript  
✅ **Single File** - Everything in `src/config/tags/index.ts`

## TypeScript Usage Example

Import tags directly in your TypeScript code:

```typescript
import { TAGS, TAG_SCRIPTS } from './src/config/tags/index';

// Use the tag constants
console.log(TAGS.UI);              // '@ui'
console.log(TAG_SCRIPTS['test:ui']); // 'cucumber-js --tags "@ui"'
```

## Configuration Reference

### TAGS Object
Contains all tag definitions used in feature files:
- `TAGS.UI` → `'@ui'`
- `TAGS.SMOKE` → `'@smoke'`
- `TAGS.REGRESSION` → `'@regression'`
- `TAGS.SANITY` → `'@sanity'`
- `TAGS.FUNCTIONALITY` → `'@functionality'`
- `TAGS.EDGE_CASE` → `'@edge-case'`

### TAG_SCRIPTS Object
Contains npm script definitions for each tag:
- `TAG_SCRIPTS['test:ui']` → `'cucumber-js --tags "@ui"'`
- `TAG_SCRIPTS['test:smoke']` → `'cucumber-js --tags "@smoke"'`
- etc.

### BASE_SCRIPTS Object
Contains standard test commands not related to tags:
- `BASE_SCRIPTS.test` → `'cucumber-js'`
- `BASE_SCRIPTS['test:parallel']` → `'cucumber-js --parallel 2'`
- etc.

