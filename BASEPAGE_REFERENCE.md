# BasePage Reference Guide

Complete documentation of all 50+ methods available in the BasePage class. Every page object extends BasePage and inherits these methods automatically.

---

## 📖 Table of Contents

1. [Navigation Methods](#navigation-methods)
2. [Element Interaction Methods](#element-interaction-methods)
3. [Text & Value Retrieval](#text--value-retrieval)
4. [Visibility & State Checks](#visibility--state-checks)
5. [Wait Methods](#wait-methods)
6. [Page Information](#page-information)
7. [Advanced Methods](#advanced-methods)
8. [Locator Management](#locator-management)
9. [Screenshot Methods](#screenshot-methods)

---

## Navigation Methods

### navigate(url?, waitUntil?)
Navigate to a URL with retry logic.

```typescript
// Navigate to absolute URL
await page.navigate('https://example.com');

// Navigate to relative URL (uses baseUrl from config)
await page.navigate('/login');

// Specify wait condition
await page.navigate('/dashboard', 'networkidle');
await page.navigate('/home', 'load');
```

**Parameters:**
- `url`: string (optional) - URL to navigate to, defaults to baseUrl
- `waitUntil`: 'load' | 'networkidle' | 'commit' (optional) - Load condition

**Returns:** Promise<void>

**Behavior:**
- ✅ Retries 3 times with exponential backoff if navigation fails
- ✅ Logs navigation details to console
- ✅ Handles timeout gracefully
- ✅ Waits for specified load condition

---

### goBack()
Navigate back in browser history.

```typescript
await page.goBack();
```

**Returns:** Promise<void>

---

### goForward()
Navigate forward in browser history.

```typescript
await page.goForward();
```

**Returns:** Promise<void>

---

### reload()
Reload the current page.

```typescript
await page.reload();
```

**Returns:** Promise<void>

---

### refresh()
Alias for reload(). Refresh the current page.

```typescript
await page.refresh();
```

**Returns:** Promise<void>

---

## Element Interaction Methods

### click(locator, waitForNavigation?)
Click an element with safety checks.

```typescript
// Simple click
await page.click('button:has-text("Submit")');

// Click and wait for navigation
await page.click('a[href="/dashboard"]', true);

// Click with locator object
const button = this.page.locator('button');
await page.click(button);
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Playwright Locator
- `waitForNavigation`: boolean (optional) - Wait for page navigation after click

**Returns:** Promise<void>

**Behavior:**
- ✅ Scrolls element into view
- ✅ Ensures element is visible
- ✅ Ensures element is enabled
- ✅ Retries if element not ready
- ✅ Logs clicks to console

---

### fill(locator, value, clearFirst?)
Fill an input field with text.

```typescript
// Simple fill
await page.fill('[name="email"]', 'user@example.com');

// Clear then fill
await page.fill('[name="password"]', 'SecurePass123', true);

// Fill with locator object
const input = this.page.locator('[name="search"]');
await page.fill(input, 'playwright');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `value`: string - Text to enter
- `clearFirst`: boolean (optional, default: true) - Clear field before filling

**Returns:** Promise<void>

**Behavior:**
- ✅ Scrolls into view
- ✅ Waits for element to be ready
- ✅ Optionally clears existing content
- ✅ Logs fill operations

---

### type(locator, value)
Type text character by character (slower, more natural).

```typescript
// Type slowly (simulates real user typing)
await page.type('[name="search"]', 'my search query');

// Good for slow animations that watch for keystrokes
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `value`: string - Text to type

**Returns:** Promise<void>

**Behavior:**
- ✅ Types character by character
- ✅ Triggers keystroke events
- ✅ Slower than fill() (simulates real typing)

---

### clear(locator)
Clear the value of an input field.

```typescript
// Clear a text input
await page.clear('[name="search"]');

// Clear a textarea
await page.clear('textarea');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### selectOption(locator, value)
Select an option from a dropdown.

```typescript
// Select by value
await page.selectOption('[name="country"]', 'US');

// Select by label
await page.selectOption('select#language', 'English');

// Select multiple (for multi-select dropdowns)
await page.selectOption('[name="colors"]', ['red', 'blue']);
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `value`: string | string[] - Option value(s) to select

**Returns:** Promise<void>

---

### check(locator)
Check a checkbox or radio button.

```typescript
// Check a checkbox
await page.check('[name="terms"]');

// Check a radio button
await page.check('input[value="option1"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### uncheck(locator)
Uncheck a checkbox.

```typescript
// Uncheck a checkbox
await page.uncheck('[name="remember"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### press(locator, key)
Press a keyboard key on an element.

```typescript
// Press Enter on search input
await page.press('[name="search"]', 'Enter');

// Press Tab
await page.press('[name="username"]', 'Tab');

// Other keys: ArrowDown, ArrowUp, Escape, Delete, Backspace, etc.
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `key`: string - Key name to press

**Returns:** Promise<void>

---

### pressKey(key)
Press a keyboard key globally.

```typescript
// Press Escape globally
await page.pressKey('Escape');

// Press Enter
await page.pressKey('Enter');
```

**Parameters:**
- `key`: string - Key name to press

**Returns:** Promise<void>

---

### hover(locator)
Hover over an element.

```typescript
// Hover to show tooltip or submenu
await page.hover('[class="dropdown-trigger"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### focus(locator)
Focus on an element.

```typescript
// Focus on input field
await page.focus('[name="email"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

## Text & Value Retrieval

### getText(locator)
Get visible text content of an element.

```typescript
// Get button text
const buttonText = await page.getText('button');

// Get error message
const errorMsg = await page.getText('[role="alert"]');

// Returns empty string if element not found or hidden
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<string>

**Behavior:**
- ✅ Returns only visible text
- ✅ Trims whitespace
- ✅ Returns empty string if not found
- ✅ Includes text from all child elements

---

### getValue(locator)
Get the value of an input element.

```typescript
// Get input value
const email = await page.getValue('[name="email"]');

// Get textarea value
const message = await page.getValue('textarea');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<string>

---

### getAttribute(locator, attribute)
Get an attribute value from an element.

```typescript
// Get href from link
const link = await page.getAttribute('a.primary', 'href');

// Get placeholder from input
const placeholder = await page.getAttribute('[name="search"]', 'placeholder');

// Get data attribute
const userId = await page.getAttribute('[data-user-id]', 'data-user-id');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `attribute`: string - Attribute name to retrieve

**Returns:** Promise<string>

---

### getInnerText(locator)
Get inner text of an element (same as getText).

```typescript
const text = await page.getInnerText('h1');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<string>

---

### getAllText(locator)
Get text from all matching elements.

```typescript
// Get text from all list items
const itemTexts = await page.getAllText('li');

// Get all button labels
const buttons = await page.getAllText('button');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<string[]>

---

## Visibility & State Checks

### isVisible(locator)
Check if an element is visible on the page.

```typescript
// Check if submit button is visible
const isVisible = await page.isVisible('button[type="submit"]');

if (isVisible) {
  await page.click('button[type="submit"]');
}
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

**Behavior:**
- ✅ Returns false if element not found
- ✅ Returns false if element is hidden (display: none, etc.)
- ✅ Returns false if element is outside viewport
- ✅ Safe - no errors thrown

---

### isPresent(locator)
Check if an element exists in the DOM.

```typescript
// Check if element exists
const exists = await page.isPresent('[class="error-message"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

**Behavior:**
- ✅ Returns true if element exists (even if hidden)
- ✅ Returns false if element doesn't exist
- ✅ Does not check visibility

---

### isHidden(locator)
Check if an element is hidden (not visible).

```typescript
// Check if error message is hidden
const isHidden = await page.isHidden('[role="alert"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

---

### isEnabled(locator)
Check if an element is enabled (not disabled).

```typescript
// Check if button is enabled
const isEnabled = await page.isEnabled('button[type="submit"]');

if (!isEnabled) {
  // Button is disabled, user probably missed filling a field
}
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

---

### isDisabled(locator)
Check if an element is disabled.

```typescript
// Check if submit button is disabled
const isDisabled = await page.isDisabled('button[type="submit"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

---

### isChecked(locator)
Check if a checkbox or radio button is checked.

```typescript
// Check if terms checkbox is checked
const isChecked = await page.isChecked('[name="agree-terms"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

---

### isEditable(locator)
Check if an input element is editable.

```typescript
// Check if field can be edited
const isEditable = await page.isEditable('[name="email"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<boolean>

---

## Wait Methods

### waitForVisible(locator, timeout?)
Wait for an element to become visible.

```typescript
// Wait up to 10 seconds (default)
await page.waitForVisible('[class="loader"]');

// Wait up to 30 seconds
await page.waitForVisible('[class="modal"]', 30000);

// Wait for dynamic element to appear
await page.waitForVisible('[role="dialog"]', 5000);
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `timeout`: number (optional, default: 10000ms) - Maximum wait time

**Returns:** Promise<void>

**Throws:** Error if element not visible within timeout

---

### waitForHidden(locator, timeout?)
Wait for an element to disappear or become hidden.

```typescript
// Wait for loader to disappear
await page.waitForHidden('[class="spinner"]');

// Wait up to 20 seconds
await page.waitForHidden('[role="alert"]', 20000);
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `timeout`: number (optional) - Maximum wait time

**Returns:** Promise<void>

---

### waitForEnabled(locator, timeout?)
Wait for an element to become enabled.

```typescript
// Wait for submit button to be enabled
await page.waitForEnabled('button[type="submit"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `timeout`: number (optional) - Maximum wait time

**Returns:** Promise<void>

---

### waitForLoadState(state?)
Wait for page to reach a specific load state.

```typescript
// Wait for page to fully load
await page.waitForLoadState('load');

// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for DOM to be ready
await page.waitForLoadState('domcontentloaded');
```

**Parameters:**
- `state`: 'load' | 'networkidle' | 'domcontentloaded' (optional)

**Returns:** Promise<void>

---

### waitForURL(url, timeout?)
Wait for page to navigate to a specific URL.

```typescript
// Wait for exact URL
await page.waitForURL('https://example.com/dashboard');

// Wait for URL pattern
await page.waitForURL(/\/dashboard/);

// Wait up to 20 seconds
await page.waitForURL('/login', 20000);
```

**Parameters:**
- `url`: string | RegExp - URL to wait for
- `timeout`: number (optional) - Maximum wait time

**Returns:** Promise<void>

---

## Page Information

### getTitle()
Get the page title.

```typescript
// Get current page title
const title = await page.getTitle();
console.log(title); // "Welcome to Example.com"
```

**Returns:** Promise<string>

---

### getCurrentURL()
Get the current page URL.

```typescript
// Get current URL
const url = await page.getCurrentURL();
console.log(url); // "https://example.com/dashboard"
```

**Returns:** Promise<string>

---

### getPageContent()
Get all text content of the page.

```typescript
// Get all page text for assertions
const pageText = await page.getPageContent();
```

**Returns:** Promise<string>

---

### getPageURL()
Alias for getCurrentURL(). Get the current page URL.

```typescript
const url = await page.getPageURL();
```

**Returns:** Promise<string>

---

## Advanced Methods

### executeScript(script, args?)
Execute JavaScript code in the browser context.

```typescript
// Get window title
const result = await page.executeScript('return window.title');

// Get local storage value
const value = await page.executeScript(
  'return localStorage.getItem("key")'
);

// Execute with arguments
const result = await page.executeScript(
  'return arguments[0] + arguments[1]',
  [5, 3]
);
// Returns: 8
```

**Parameters:**
- `script`: string - JavaScript code to execute
- `args`: any[] (optional) - Arguments to pass to script

**Returns:** Promise<any>

**Behavior:**
- ✅ Executes in browser context
- ✅ Can access window, document, etc.
- ✅ Returns serializable results
- ✅ Can pass arguments as array

---

### scrollIntoView(locator)
Scroll an element into view.

```typescript
// Scroll element into view
await page.scrollIntoView('[class="footer"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### getElementCount(locator)
Count elements matching a selector.

```typescript
// Count list items
const count = await page.getElementCount('li');

// Count form errors
const errorCount = await page.getElementCount('[role="alert"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<number>

---

### doubleClick(locator)
Double-click an element.

```typescript
// Double-click to select text
await page.doubleClick('input[type="text"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### rightClick(locator)
Right-click (context menu) on an element.

```typescript
// Right-click to show context menu
await page.rightClick('[class="file-item"]');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator

**Returns:** Promise<void>

---

### uploadFile(locator, filePath)
Upload a file through a file input.

```typescript
// Upload a file
await page.uploadFile('[name="attachment"]', 'path/to/file.pdf');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `filePath`: string - Path to file to upload

**Returns:** Promise<void>

---

## Locator Management

### createLocator(selectorString)
Create a Locator object from a selector string.

```typescript
// Create locator from string
const button = this.createLocator('button:has-text("Submit")');

// Use in interactions
await this.click(button);
```

**Parameters:**
- `selectorString`: string - CSS selector

**Returns:** Locator

---

### getLocator(key)
Get a locator from properties file.

```typescript
// Get locator from UILocators.properties
const selector = this.getLocator('searchButton');
// Returns: 'button:has-text("Search")'
```

**Parameters:**
- `key`: string - Locator key

**Returns:** string

---

## Screenshot Methods

### takeScreenshot(fileName?)
Capture a screenshot of the page.

```typescript
// Take screenshot with auto-generated name
await page.takeScreenshot();
// Saves: screenshots/screenshot-2025-01-15-10-30-45.png

// Take screenshot with custom name
await page.takeScreenshot('login-page');
// Saves: screenshots/login-page-2025-01-15-10-30-45.png
```

**Parameters:**
- `fileName`: string (optional) - Custom screenshot name

**Returns:** Promise<void>

**Behavior:**
- ✅ Auto-generates timestamp
- ✅ Saves to `reports/screenshots/` directory
- ✅ Useful for debugging and reports

---

### takeElementScreenshot(locator, fileName?)
Capture a screenshot of a specific element.

```typescript
// Screenshot of specific element
await page.takeElementScreenshot('[role="dialog"]', 'modal');
```

**Parameters:**
- `locator`: string | Locator - CSS selector or Locator
- `fileName`: string (optional) - Custom screenshot name

**Returns:** Promise<void>

---

## Quick Reference Table

| Method | Purpose | Returns |
|--------|---------|---------|
| `navigate()` | Go to URL | void |
| `click()` | Click element | void |
| `fill()` | Enter text | void |
| `getText()` | Get element text | string |
| `isVisible()` | Check visibility | boolean |
| `waitForVisible()` | Wait for visibility | void |
| `waitForLoadState()` | Wait for page load | void |
| `getTitle()` | Get page title | string |
| `getCurrentURL()` | Get current URL | string |
| `executeScript()` | Run JavaScript | any |
| `takeScreenshot()` | Capture screenshot | void |

---

## Usage Examples

### Common Patterns

**Login Flow:**
```typescript
async login(username: string, password: string) {
  await this.navigate('/login');
  await this.fill('input[name="username"]', username);
  await this.fill('input[name="password"]', password);
  await this.click('button[type="submit"]', true); // wait for nav
  await this.waitForURL('/dashboard');
}
```

**Search:**
```typescript
async search(query: string) {
  await this.fill('[name="search"]', query);
  await this.click('button:has-text("Search")');
  await this.waitForLoadState('networkidle');
}
```

**Form with Validation:**
```typescript
async fillForm(data: FormData) {
  await this.fill('[name="email"]', data.email);
  await this.fill('[name="password"]', data.password);
  await this.check('[name="agree"]');
  await this.click('button[type="submit"]', true);
  await this.waitForVisible('[class="success"]');
}
```

**Conditional Actions:**
```typescript
async acceptCookiesIfPresent() {
  const visible = await this.isVisible('[class="cookie-banner"]');
  if (visible) {
    await this.click('button:has-text("Accept")');
    await this.waitForHidden('[class="cookie-banner"]');
  }
}
```

---

**Total Methods Available:** 50+  
**All methods are:** Documented, Type-safe, Production-ready

Every page object automatically inherits all these methods!
