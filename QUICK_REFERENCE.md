## Quick Reference: Tag Configuration System

### 🎯 Run Tests by Tag
```bash
npm run test:ui              # Run @ui tagged tests
npm run test:smoke           # Run @smoke tagged tests
npm run test:regression      # Run @regression tagged tests
npm run test:sanity          # Run @sanity tagged tests
npm run test:functionality   # Run @functionality tagged tests
npm run test:edge-case       # Run @edge-case tagged tests
```

### 📝 Feature File Example
```gherkin
@ui @smoke
Feature: Search Functionality

  @smoke
  Scenario: Navigate to playwright homepage
    Given I am on the search page
    Then the page should load successfully
```

### ⚙️ Add a New Tag

1. **Edit `config.tags.js`:**
   ```javascript
   TAGS: {
     UI: '@ui',
     PERFORMANCE: '@performance'  // ← ADD
   }
   ```

2. **Add npm script in same file:**
   ```javascript
   TAG_SCRIPTS: {
     'test:ui': 'cucumber-js --tags "@ui"',
     'test:performance': 'cucumber-js --tags "@performance"'  // ← ADD
   }
   ```

3. **Use in feature file:**
   ```gherkin
   @performance
   Scenario: ...
   ```

4. **Run it:**
   ```bash
   npm run test:performance
   ```

### 📂 Key Files
- **`config.tags.js`** - Central config (single source of truth)
- **`src/config/tags/index.ts`** - TypeScript wrapper
- **`package.json`** - NPM scripts
- **`src/features/search_test.feature`** - Feature file with tags

### ✅ All Tags Synchronized
Change tags in `config.tags.js` → Everything updates automatically ✨
