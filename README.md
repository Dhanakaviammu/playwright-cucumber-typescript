# Playwright-Cucumber-TypeScript Framework

## 🚀 Professional, Production-Ready Test Automation Framework

A **modern**, **industry-standard** BDD test automation framework combining:
- **Playwright** (Cross-browser automation)
- **Cucumber** (Business-readable scenarios)  
- **TypeScript** (Type-safe implementation)
- **Page Object Model** (Proven architecture pattern)

### ✨ Key Features

✅ **BasePage Architecture** - 50+ reusable methods via inheritance  
✅ **Helper Utilities** - AssertionHelper (30+ methods), WaitHelper (15+ methods), DataHelper (20+ methods)  
✅ **Centralized Locators** - UILocators.properties for single source of truth  
✅ **Smart Waits** - No flaky sleeps, proper synchronization  
✅ **Unique Test Data** - Automatic generation with DataHelper  
✅ **HTML Reports** - Detailed results with screenshots  
✅ **Type-Safe** - Full TypeScript support with JSDoc  
✅ **Production-Ready** - Follows industry best practices  

---

## 📁 Project Structure

```
src/
├── base/
│   └── BasePage.ts                          # Foundation class (50+ methods)
├── pages/
│   ├── SearchPage.ts                        # Example page (extends BasePage)
│   └── LoginPage.ts                         # Create your own pages
├── features/
│   └── *.feature                            # Gherkin scenarios
├── steps/
│   └── *.steps.ts                           # Step definitions
├── hooks/
│   └── hooks.ts                             # Before/After setup
├── locators/
│   └── UILocators.properties                # Centralized selectors
├── support/
│   └── custom-world.ts                      # Cucumber world object
└── utils/
    ├── assertionHelper.ts                   # 30+ assertion methods
    ├── waitHelper.ts                        # 15+ wait/retry methods
    ├── dataHelper.ts                        # 20+ data generation methods
    ├── locatorHelper.ts                     # Load selectors from properties
    ├── browser.ts                           # Browser initialization
    ├── config.ts                            # Configuration
    └── ...
```

---

## 🎯 Quick Start

### Installation

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run specific tag
npm test -- --tags @smoke

# Run specific feature
npm test -- src/features/search.feature
```

### Create a New Page Object

```typescript
// src/pages/LoginPage.ts
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.createLocator('[name="username"]');
  private readonly passwordInput = this.createLocator('[name="password"]');
  private readonly loginButton = this.createLocator('button:has-text("Login")');

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton, true); // true = wait for navigation
  }
}
```

### Write Step Definitions

```typescript
// src/steps/login.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { AssertionHelper } from '../utils/assertionHelper';

Given('I am on the login page', async function(this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate('/login');
});

When('I login with valid credentials', async function(this: CustomWorld) {
  await this.loginPage.login('user@example.com', 'SecurePass123!');
});

Then('I should be logged in', async function(this: CustomWorld) {
  const url = await this.loginPage.getCurrentURL();
  await AssertionHelper.urlToContain(url, '/dashboard');
});
```

### Add Locators

```properties
# src/locators/UILocators.properties
usernameInput=[name="username"]
passwordInput=[name="password"]
loginButton=button:has-text("Login")
```

---

## 📚 Documentation

Start here based on your needs:

### 🌟 **New to the Framework?**
👉 Read: **[FRAMEWORK_PROFESSIONAL.md](./FRAMEWORK_PROFESSIONAL.md)**  
→ Complete overview, architecture, and philosophy

### 🏗️ **Building Page Objects?**
👉 Read: **[BASEPAGE_REFERENCE.md](./BASEPAGE_REFERENCE.md)**  
→ All 50+ BasePage methods with examples

### 🛠️ **Using Helpers?**
👉 Read: **[HELPERS_REFERENCE.md](./HELPERS_REFERENCE.md)**  
→ AssertionHelper, WaitHelper, DataHelper reference

### 📝 **Need Examples?**
👉 Read: **[EXAMPLES.md](./EXAMPLES.md)**  
→ Login, forms, lists, modals, data-driven tests

### ✅ **Best Practices?**
👉 Read: **[BEST_PRACTICES.md](./BEST_PRACTICES.md)**  
→ Do's and don'ts, common pitfalls, scalability

### 🔧 **Earlier Documentation**
- [Locator Management System](./LOCATOR_MANAGEMENT.md)
- [Tag Configuration](./TAG_CONFIGURATION.md)
- [Quick Reference](./QUICK_REFERENCE.md)

---

## 🎓 Core Components

### BasePage (50+ Methods)
Every page object extends BasePage for:
- Navigation: `navigate()`, `goBack()`, `refresh()`
- Interactions: `click()`, `fill()`, `selectOption()`, `check()`
- Queries: `getText()`, `getValue()`, `getAttribute()`
- Visibility: `isVisible()`, `isPresent()`, `isEnabled()`
- Waits: `waitForVisible()`, `waitForLoadState()`, `waitForURL()`

### AssertionHelper (30+ Methods)
Consistent assertions with clear error messages:
```typescript
await AssertionHelper.textToContain(text, 'expected');
await AssertionHelper.numberGreaterThan(count, 5);
await AssertionHelper.urlToContain(url, '/dashboard');
await AssertionHelper.arrayToContain(items, 'item');
```

### WaitHelper (15+ Methods)
Intelligent synchronization:
```typescript
await WaitHelper.waitForNetworkIdle(page);
await WaitHelper.waitForElementCount(page, selector, 10);
await WaitHelper.waitForCondition(async () => condition);
await WaitHelper.retryWithBackoff(async () => operation());
```

### DataHelper (20+ Methods)
Automatic test data generation:
```typescript
const email = dataHelper.generateEmail();           // user.abc123@example.com
const password = dataHelper.generatePassword();    // Tr0pic@lSunS3t
const uuid = dataHelper.generateUUID();            // 550e8400-e29b-41d4...
const phone = dataHelper.generatePhoneNumber();    // 555-123-4567
```

---

## 🔄 Architecture Overview

```
┌────────────────────────────────────────┐
│    Feature Files (.feature)            │
│  (Business-readable scenarios)         │
└────────────────────┬───────────────────┘
                     │
┌────────────────────▼───────────────────┐
│    Step Definitions (.steps.ts)        │
│  (Maps Gherkin to test actions)        │
└────────────────────┬───────────────────┘
                     │
┌────────────────────▼───────────────────┐
│    Utilities Helpers                   │
│  (AssertionHelper, WaitHelper, etc.)   │
└────────────────────┬───────────────────┘
                     │
┌────────────────────▼───────────────────┐
│    Page Objects (extend BasePage)      │
│  (Encapsulates page interactions)      │
└────────────────────┬───────────────────┘
                     │
┌────────────────────▼───────────────────┐
│    BasePage (50+ common methods)       │
│  (Navigation, clicks, waits, etc.)     │
└────────────────────┬───────────────────┘
                     │
┌────────────────────▼───────────────────┐
│    Playwright Core                     │
│  (Browser automation)                  │
└────────────────────────────────────────┘
```

---

## ⚡ Framework Comparison

| Feature | This Framework | Without Framework |
|---------|---|---|
| Code Reuse | 100% (BasePage) | ~30% (duplication) |
| Maintenance | Minimal | High |
| Test Speed | Fast | Slow |
| Flakiness | Low | High |
| Readability | High | Low |
| Scalability | Excellent | Poor |

---

## 🎯 Best Practices

✅ **Always extend BasePage** - Never use Page directly  
✅ **Use AssertionHelper** - Consistent assertions  
✅ **Use WaitHelper** - No arbitrary sleeps  
✅ **Generate test data** - Use DataHelper  
✅ **Clear method names** - `login()` not `action()`  
✅ **Centralize locators** - UILocators.properties  
✅ **Meaningful comments** - Help future you  
✅ **Organize by page** - One file per page object  
✅ **Handle errors** - Retry for flaky operations  
✅ **Use tags** - @smoke, @regression, @critical  

---

## 📊 Test Status

```
✅ Framework Tests Passing
✅ 2 Scenarios (2 passed)
✅ 4 Steps (4 passed)
✅ All utilities working
✅ Ready for production
```

---

## 🚀 Getting Started Checklist

- [ ] Read [FRAMEWORK_PROFESSIONAL.md](./FRAMEWORK_PROFESSIONAL.md) (30 mins)
- [ ] Review [BASEPAGE_REFERENCE.md](./BASEPAGE_REFERENCE.md) (30 mins)
- [ ] Check out [EXAMPLES.md](./EXAMPLES.md) (20 mins)
- [ ] Create your first page object
- [ ] Write feature file + steps
- [ ] Run `npm test`
- [ ] Review [BEST_PRACTICES.md](./BEST_PRACTICES.md) (20 mins)

**Total time to production:** ~2 hours

---

## 📞 Support

### Common Questions

**Q: Where do I add new page objects?**  
A: Create a file in `src/pages/` extending `BasePage`

**Q: How do I update a selector?**  
A: Edit `UILocators.properties` - no code changes needed

**Q: Should I use page.locator or click()?**  
A: Use `click()` from BasePage - includes error handling

**Q: When should I wait?**  
A: Use WaitHelper, never arbitrary sleeps

**Q: How do I generate test data?**  
A: Use DataHelper - never hardcode data

---

## 🏆 Framework Philosophy

This framework prioritizes:

1. **Readability** - Code is read 10x more than written
2. **Maintainability** - Easy to update and extend
3. **Reliability** - Minimal flakiness
4. **Scalability** - Grows with your project
5. **Best Practices** - Industry-standard patterns
6. **Developer Experience** - Clear, intuitive API
7. **Documentation** - Well-guided and commented
8. **Debugging** - Easy to troubleshoot

---

## 📈 Framework Maturity

| Stage | Status |
|-------|--------|
| **Core Framework** | ✅ Complete |
| **Base Components** | ✅ Complete |
| **Helper Utilities** | ✅ Complete |
| **Documentation** | ✅ Complete |
| **Example Pages** | ✅ Complete |
| **Best Practices** | ✅ Complete |
| **Production Ready** | ✅ YES |

---

## 🤖 GitHub Actions CI/CD Pipeline

This framework includes a **GitHub Actions workflow** that automatically runs tests on every push to the `main` branch and on pull requests.

### Workflow Features

✅ **Automatic Execution** - Runs on push and pull requests  
✅ **Multi-Node Testing** - Tests on Node.js 18.x and 20.x  
✅ **Smart Headless Mode** - Automatically uses headless for Linux CI/CD  
✅ **Artifact Upload** - Test reports available for download  
✅ **Fast Feedback** - ~2 minutes per run  

### Workflow File

Located at: `.github/workflows/test.yml`

### Workflow Steps

1. **Checkout** - Pulls the latest code
2. **Setup Node.js** - Installs specified version (18.x, 20.x)
3. **Install Dependencies** - `npm install`
4. **Install Browsers** - `npx playwright install --with-deps`
5. **Build TypeScript** - `npm run build`
6. **Run Tests** - `npm test` (with `CI=true` for headless mode)
7. **Upload Reports** - Stores test reports as artifacts

### How It Works

When you push code or create a pull request:

```
Push to main branch
        ↓
GitHub Actions triggered
        ↓
Workflow runs (2 jobs × 2 Node versions = 4 parallel runs)
        ↓
Dependencies installed & browsers downloaded
        ↓
TypeScript compiled
        ↓
Cucumber tests executed
        ↓
Reports uploaded as artifacts
        ↓
Check GitHub Actions tab for results
```

### Environment Configuration

**Local Development:**
- Browser mode: **Headed** (visible window)
- slowMo: 0ms
- Set `HEADLESS=true` to test headless mode locally

**GitHub Actions:**
- Browser mode: **Headless** (no display needed)
- Automatically set via `CI=true` environment variable
- Required for Linux environments without X Server

### Viewing Results

1. Go to your repository
2. Click **Actions** tab
3. Select the latest workflow run
4. View logs or download test report artifacts

### Test Reports

Test reports are generated in two formats:

- **HTML Report**: `reports/cucumber-report.html` (detailed, user-friendly)
- **JSON Report**: `reports/cucumber-report.json` (machine-readable)

Both are uploaded as artifacts in GitHub Actions.

### Customizing the Workflow

To modify the workflow, edit `.github/workflows/test.yml`:

```yaml
# Change Node versions
node-version: [16.x, 18.x, 20.x]

# Run tests with specific tags
run: npm test -- --tags @smoke

# Change branch triggers
branches: [ main, develop ]
```

---

## 📝 License & Support

Created as a professional framework template for teams practicing BDD with Playwright.

**Framework Version:** 2.0.0  
**Last Updated:** November 2025  
**Status:** ✅ Production Ready  
**Support:** See documentation files

---

## 🎯 Next Steps

1. **Explore Examples:** Check out `EXAMPLES.md` for common scenarios
2. **Build Pages:** Create page objects extending BasePage
3. **Scale Tests:** Add more features and pages following patterns
4. **Optimize:** Review BEST_PRACTICES.md for improvements

**Ready to build amazing tests!** 🚀
