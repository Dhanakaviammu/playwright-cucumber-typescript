# Utilities Helpers Reference Guide

Complete documentation of helper utilities: **AssertionHelper**, **WaitHelper**, **DataHelper**, and **LocatorHelper**.

---

## 📋 Table of Contents

1. [AssertionHelper](#assertionhelper)
2. [WaitHelper](#waithelper)
3. [DataHelper](#datahelper)
4. [LocatorHelper](#locatorhelper)

---

## AssertionHelper

**Location:** `src/utils/assertionHelper.ts`

A static helper class providing consistent assertion methods with clear error messages.

### Text Assertions

#### textToEqual(actual, expected, message?)
Assert that text exactly equals expected value.

```typescript
const text = await page.getText('h1');
await AssertionHelper.textToEqual(text, 'Welcome to Dashboard');
```

**Parameters:**
- `actual`: string - Actual text
- `expected`: string - Expected text
- `message`: string (optional) - Custom error message

**Throws:** Error if texts don't match

---

#### textToContain(actual, expectedSubstring, message?)
Assert that text contains a substring.

```typescript
const message = await page.getText('[role="alert"]');
await AssertionHelper.textToContain(message, 'Success');

// Good for partial assertions
const url = await page.getCurrentURL();
await AssertionHelper.textToContain(url, '/dashboard');
```

**Parameters:**
- `actual`: string - Actual text
- `expectedSubstring`: string - Substring to find
- `message`: string (optional) - Custom error message

**Throws:** Error if substring not found

---

#### textNotToContain(actual, substring, message?)
Assert that text does NOT contain a substring.

```typescript
const errorText = await page.getText('[class="error"]');
await AssertionHelper.textNotToContain(errorText, 'Failed');
```

**Parameters:**
- `actual`: string - Actual text
- `substring`: string - Substring that should NOT be present
- `message`: string (optional) - Custom error message

**Throws:** Error if substring found

---

#### textToMatch(actual, pattern, message?)
Assert that text matches a regex pattern.

```typescript
const email = await page.getValue('[name="email"]');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
await AssertionHelper.textToMatch(email, emailRegex);

// Good for format validation
const phone = await page.getText('[class="phone"]');
await AssertionHelper.textToMatch(phone, /\d{3}-\d{3}-\d{4}/);
```

**Parameters:**
- `actual`: string - Actual text
- `pattern`: RegExp - Pattern to match
- `message`: string (optional) - Custom error message

**Throws:** Error if pattern doesn't match

---

### Value Assertions

#### toBeTrue(value, message?)
Assert that value is true.

```typescript
const isVisible = await page.isVisible('button');
await AssertionHelper.toBeTrue(isVisible, 'Button should be visible');
```

**Parameters:**
- `value`: boolean - Value to check
- `message`: string (optional) - Custom error message

**Throws:** Error if value is not true

---

#### toBeFalse(value, message?)
Assert that value is false.

```typescript
const isDisabled = await page.isDisabled('button');
await AssertionHelper.toBeFalse(isDisabled, 'Button should be enabled');
```

**Parameters:**
- `value`: boolean - Value to check
- `message`: string (optional) - Custom error message

**Throws:** Error if value is not false

---

#### toBeNull(value, message?)
Assert that value is null.

```typescript
const result = someFunction();
await AssertionHelper.toBeNull(result);
```

**Parameters:**
- `value`: any - Value to check
- `message`: string (optional) - Custom error message

---

#### toBeUndefined(value, message?)
Assert that value is undefined.

```typescript
const result = await page.getAttribute('element', 'nonexistent');
await AssertionHelper.toBeUndefined(result);
```

**Parameters:**
- `value`: any - Value to check
- `message`: string (optional) - Custom error message

---

### Numeric Assertions

#### numberGreaterThan(actual, expected, message?)
Assert that number is greater than expected value.

```typescript
const count = await page.getElementCount('li');
await AssertionHelper.numberGreaterThan(count, 5, 'Should have more than 5 items');
```

**Parameters:**
- `actual`: number - Actual value
- `expected`: number - Minimum value
- `message`: string (optional) - Custom error message

**Throws:** Error if actual <= expected

---

#### numberLessThan(actual, expected, message?)
Assert that number is less than expected value.

```typescript
const errorCount = await page.getElementCount('[role="alert"]');
await AssertionHelper.numberLessThan(errorCount, 1, 'Should have no errors');
```

**Parameters:**
- `actual`: number - Actual value
- `expected`: number - Maximum value
- `message`: string (optional) - Custom error message

---

#### numberEqual(actual, expected, message?)
Assert that numbers are equal.

```typescript
const count = await page.getElementCount('[data-item]');
await AssertionHelper.numberEqual(count, 10, 'Should have exactly 10 items');
```

**Parameters:**
- `actual`: number - Actual value
- `expected`: number - Expected value
- `message`: string (optional) - Custom error message

---

### Array Assertions

#### arrayToContain(array, expectedValue, message?)
Assert that array contains expected value.

```typescript
const texts = await page.getAllText('button');
await AssertionHelper.arrayToContain(texts, 'Submit', 'Should have Submit button');
```

**Parameters:**
- `array`: any[] - Array to check
- `expectedValue`: any - Value to find
- `message`: string (optional) - Custom error message

---

#### arrayLength(array, expectedLength, message?)
Assert that array has expected length.

```typescript
const items = await page.getAllText('[class="item"]');
await AssertionHelper.arrayLength(items, 5, 'Should have 5 items');
```

**Parameters:**
- `array`: any[] - Array to check
- `expectedLength`: number - Expected length
- `message`: string (optional) - Custom error message

---

### URL Assertions

#### urlToEqual(actual, expected, message?)
Assert that URL exactly equals expected value.

```typescript
const currentUrl = await page.getCurrentURL();
await AssertionHelper.urlToEqual(
  currentUrl,
  'https://example.com/dashboard'
);
```

**Parameters:**
- `actual`: string - Actual URL
- `expected`: string - Expected URL
- `message`: string (optional) - Custom error message

---

#### urlToContain(actual, expectedPart, message?)
Assert that URL contains expected path/domain.

```typescript
const currentUrl = await page.getCurrentURL();
await AssertionHelper.urlToContain(currentUrl, '/dashboard');

// Check domain
await AssertionHelper.urlToContain(currentUrl, 'example.com');
```

**Parameters:**
- `actual`: string - Actual URL
- `expectedPart`: string - Part URL should contain
- `message`: string (optional) - Custom error message

---

#### urlToMatch(actual, pattern, message?)
Assert that URL matches regex pattern.

```typescript
const currentUrl = await page.getCurrentURL();
const pattern = /^https:\/\/example\.com\/user\/\d+$/;
await AssertionHelper.urlToMatch(currentUrl, pattern);
```

**Parameters:**
- `actual`: string - Actual URL
- `pattern`: RegExp - Pattern to match
- `message`: string (optional) - Custom error message

---

### Usage Examples

```typescript
// Step definition example
Given('I am on the login page', async function(this: CustomWorld) {
  await this.loginPage.navigate('/login');
  const title = await this.loginPage.getTitle();
  await AssertionHelper.textToContain(title, 'Login');
});

When('I login with valid credentials', async function(this: CustomWorld) {
  await this.loginPage.login('user@example.com', 'Pass123!');
  await WaitHelper.waitForNetworkIdle(this.page);
});

Then('I should see dashboard', async function(this: CustomWorld) {
  const isVisible = await this.dashboardPage.isVisible('[role="main"]');
  await AssertionHelper.toBeTrue(isVisible);
  
  const itemCount = await this.dashboardPage.getElementCount('[data-item]');
  await AssertionHelper.numberGreaterThan(itemCount, 0);
  
  const url = await this.dashboardPage.getCurrentURL();
  await AssertionHelper.urlToContain(url, '/dashboard');
});
```

---

## WaitHelper

**Location:** `src/utils/waitHelper.ts`

A static helper class providing intelligent wait strategies and retry mechanisms.

### Basic Waits

#### waitForTimeout(ms)
Wait for specified milliseconds.

```typescript
// Simple delay (use sparingly!)
await WaitHelper.waitForTimeout(2000); // 2 seconds

// Good for deliberate pauses where timing matters
await WaitHelper.waitForTimeout(500); // Between animation frames
```

**Parameters:**
- `ms`: number - Milliseconds to wait

**Returns:** Promise<void>

**Note:** Avoid using this for synchronization - use specific wait methods instead.

---

### Element Waits

#### waitForElementCount(page, selector, expectedCount, timeout?)
Wait for element count to match expected value.

```typescript
// Wait for exactly 5 items to load
await WaitHelper.waitForElementCount(page, '[class="item"]', 5);

// Wait with custom timeout
await WaitHelper.waitForElementCount(
  page,
  '[data-result]',
  10,
  30000 // 30 seconds
);
```

**Parameters:**
- `page`: Page - Playwright page object
- `selector`: string - Element selector
- `expectedCount`: number - Expected element count
- `timeout`: number (optional, default: 10000ms) - Max wait time

**Returns:** Promise<void>

**Throws:** Error if count doesn't match within timeout

---

### Text Waits

#### waitForText(page, text, timeout?)
Wait for text to appear anywhere on page.

```typescript
// Wait for success message
await WaitHelper.waitForText(page, 'Profile updated successfully');

// Wait for dynamic content
await WaitHelper.waitForText(page, 'Order #12345');
```

**Parameters:**
- `page`: Page - Playwright page object
- `text`: string - Text to wait for
- `timeout`: number (optional) - Max wait time

**Returns:** Promise<void>

---

### Condition Waits

#### waitForCondition(condition, timeout?, interval?)
Wait for custom async condition to return true.

```typescript
// Wait for API call to complete
await WaitHelper.waitForCondition(async () => {
  return apiCallCompleted === true;
}, 10000);

// Wait for element to have specific text
await WaitHelper.waitForCondition(async () => {
  const text = await page.getText('[role="status"]');
  return text.includes('Ready');
}, 5000);

// Custom business logic
await WaitHelper.waitForCondition(async () => {
  const balance = await page.getText('[class="balance"]');
  return parseInt(balance) > 100;
}, 15000, 500); // Check every 500ms
```

**Parameters:**
- `condition`: () => Promise<boolean> - Async function returning boolean
- `timeout`: number (optional, default: 10000ms) - Max wait time
- `interval`: number (optional, default: 100ms) - Check interval

**Returns:** Promise<void>

**Throws:** Error if condition never becomes true

---

### Retry Logic

#### retryWithBackoff(operation, maxAttempts?, initialDelay?)
Retry operation with exponential backoff.

```typescript
// Retry flaky operation
await WaitHelper.retryWithBackoff(async () => {
  return await page.click('[class="unstable-button"]');
});

// Retry with custom attempts
await WaitHelper.retryWithBackoff(
  async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API failed');
    return response.json();
  },
  5,        // Max 5 attempts
  1000      // Start with 1 second delay
);
```

**Parameters:**
- `operation`: () => Promise<T> - Async function to retry
- `maxAttempts`: number (optional, default: 3) - Max retry attempts
- `initialDelay`: number (optional, default: 100ms) - Initial delay

**Returns:** Promise<T>

**Behavior:**
- ✅ Exponential backoff: 100ms → 200ms → 400ms → 800ms
- ✅ Returns on first success
- ✅ Throws error if all attempts fail

---

### Network Waits

#### waitForNetworkIdle(page, timeout?)
Wait for network requests to complete.

```typescript
// Wait for search results to load
await page.fill('[name="search"]', 'query');
await page.click('button[type="submit"]');
await WaitHelper.waitForNetworkIdle(page);

// Results are now loaded, no more network activity
```

**Parameters:**
- `page`: Page - Playwright page object
- `timeout`: number (optional) - Max wait time

**Returns:** Promise<void>

---

#### waitForPageLoad(page, timeout?)
Wait for page to fully load (load event).

```typescript
// Wait after navigation
await page.navigate('/dashboard');
await WaitHelper.waitForPageLoad(page);
```

**Parameters:**
- `page`: Page - Playwright page object
- `timeout`: number (optional) - Max wait time

**Returns:** Promise<void>

---

#### waitForDOMContentLoaded(page, timeout?)
Wait for DOM content to be loaded.

```typescript
// DOM ready (before images/styles finish)
await WaitHelper.waitForDOMContentLoaded(page);
```

**Parameters:**
- `page`: Page - Playwright page object
- `timeout`: number (optional) - Max wait time

**Returns:** Promise<void>

---

### Attribute Waits

#### waitForAttribute(page, selector, attribute, value, timeout?)
Wait for element attribute to have specific value.

```typescript
// Wait for input to be enabled
await WaitHelper.waitForAttribute(page, '[name="submit"]', 'disabled', null);

// Wait for data attribute to be set
await WaitHelper.waitForAttribute(
  page,
  '[data-status]',
  'data-status',
  'ready'
);
```

**Parameters:**
- `page`: Page - Playwright page object
- `selector`: string - Element selector
- `attribute`: string - Attribute name
- `value`: string | null - Expected value (null = attribute should not exist)
- `timeout`: number (optional) - Max wait time

**Returns:** Promise<void>

---

### Usage Examples

```typescript
// Step definitions using WaitHelper
When('I perform a search', async function(this: CustomWorld) {
  const query = dataHelper.generateRandomString(5);
  await this.searchPage.search(query);
  
  // Wait for results to load
  await WaitHelper.waitForNetworkIdle(this.page);
  await WaitHelper.waitForElementCount(this.page, '[class="result"]', 10);
});

Then('results should load', async function(this: CustomWorld) {
  // Wait for specific text to appear
  await WaitHelper.waitForText(this.page, 'Results for');
  
  // Or wait for custom condition
  await WaitHelper.waitForCondition(async () => {
    const count = await this.searchPage.getResultsCount();
    return count > 0;
  });
});

Given('I wait for element to be ready', async function(this: CustomWorld) {
  await WaitHelper.waitForCondition(async () => {
    return await this.page.isVisible('[role="button"]');
  }, 5000);
});

// Retry flaky operations
When('I click with retry', async function(this: CustomWorld) {
  await WaitHelper.retryWithBackoff(async () => {
    await this.page.click('[class="sometimes-missing"]');
  }, 5); // Retry up to 5 times
});
```

---

## DataHelper

**Location:** `src/utils/dataHelper.ts`

A static helper class providing test data generation utilities.

### Credential Generation

#### generateEmail()
Generate a random email address.

```typescript
const email = dataHelper.generateEmail();
// Returns: test.user.abc123@example.com

// Good for registration tests
await page.fill('[name="email"]', dataHelper.generateEmail());
```

**Returns:** string (format: `test.user.[random]@example.com`)

---

#### generateUsername()
Generate a random username.

```typescript
const username = dataHelper.generateUsername();
// Returns: testuser_a1b2c3

// Good for signup forms
await page.fill('[name="username"]', dataHelper.generateUsername());
```

**Returns:** string (format: `testuser_[random]`)

---

#### generatePassword()
Generate a secure random password.

```typescript
const password = dataHelper.generatePassword();
// Returns: Tr0pic@lSunS3t

// Good for user creation
await loginPage.signup(dataHelper.generateEmail(), dataHelper.generatePassword());
```

**Returns:** string (strong password with uppercase, lowercase, numbers, special chars)

---

### Personal Information

#### generateFullName()
Generate a random full name.

```typescript
const name = dataHelper.generateFullName();
// Returns: John Martinez
```

**Returns:** string

---

#### generateFirstName()
Generate a random first name.

```typescript
const firstName = dataHelper.generateFirstName();
// Returns: Maria
```

**Returns:** string

---

#### generateLastName()
Generate a random last name.

```typescript
const lastName = dataHelper.generateLastName();
// Returns: Johnson
```

**Returns:** string

---

#### generatePhoneNumber()
Generate a random phone number.

```typescript
const phone = dataHelper.generatePhoneNumber();
// Returns: 555-123-4567

// Good for contact forms
await page.fill('[name="phone"]', dataHelper.generatePhoneNumber());
```

**Returns:** string (format: `xxx-xxx-xxxx`)

---

### Random Data

#### generateRandomString(length?)
Generate random string of specified length.

```typescript
const code = dataHelper.generateRandomString(6);
// Returns: a7k9m2

const token = dataHelper.generateRandomString(20);
// Returns: a7k9m2p5x8q1r4v7j3l6
```

**Parameters:**
- `length`: number (optional, default: 10) - String length

**Returns:** string

---

#### generateRandomNumber(max?, min?)
Generate random number within range.

```typescript
const count = dataHelper.generateRandomNumber(100);
// Returns: 0-100

const id = dataHelper.generateRandomNumber(9999, 1000);
// Returns: 1000-9999 (4-digit number)
```

**Parameters:**
- `max`: number (optional, default: 100) - Maximum value
- `min`: number (optional, default: 0) - Minimum value

**Returns:** number

---

#### generateUUID()
Generate a random UUID (Universally Unique Identifier).

```typescript
const id = dataHelper.generateUUID();
// Returns: 550e8400-e29b-41d4-a716-446655440000

// Good for creating unique identifiers
await database.create({ id: dataHelper.generateUUID() });
```

**Returns:** string (UUID v4 format)

---

#### generateBoolean()
Generate random boolean value.

```typescript
const isActive = dataHelper.generateBoolean();
// Returns: true or false

// Good for toggle fields
if (dataHelper.generateBoolean()) {
  await page.check('[name="newsletter"]');
}
```

**Returns:** boolean

---

### Date/Time Generation

#### generateDate(daysFromNow?)
Generate a date N days from today.

```typescript
const today = dataHelper.generateDate();
const nextWeek = dataHelper.generateDate(7);
const yesterday = dataHelper.generateDate(-1);

// Good for date picker tests
await page.fill('[name="birthdate"]', dataHelper.generateDate(-20));
```

**Parameters:**
- `daysFromNow`: number (optional, default: 0) - Offset from today

**Returns:** Date object

---

#### generateTimestamp()
Generate current timestamp.

```typescript
const timestamp = dataHelper.generateTimestamp();
// Returns: 1705347045000

// Good for API requests
const request = { createdAt: dataHelper.generateTimestamp() };
```

**Returns:** number (milliseconds since epoch)

---

### Array Utilities

#### getRandomItem(array)
Get random item from array.

```typescript
const countries = ['USA', 'Canada', 'Mexico', 'UK'];
const country = dataHelper.getRandomItem(countries);
// Returns: one of the countries randomly

// Good for form selection
const options = ['Option A', 'Option B', 'Option C'];
await page.selectOption('[name="choice"]', dataHelper.getRandomItem(options));
```

**Parameters:**
- `array`: any[] - Array to pick from

**Returns:** any

---

#### shuffleArray(array)
Shuffle array randomly.

```typescript
const numbers = [1, 2, 3, 4, 5];
const shuffled = dataHelper.shuffleArray(numbers);
// Returns: shuffled version (e.g., [3, 1, 5, 2, 4])

// Good for randomizing test order
const testItems = ['A', 'B', 'C'];
const randomOrder = dataHelper.shuffleArray(testItems);
```

**Parameters:**
- `array`: any[] - Array to shuffle

**Returns:** any[] (new shuffled array)

---

### Formatting

#### formatCurrency(amount, currency?)
Format number as currency.

```typescript
const price = dataHelper.formatCurrency(99.99, 'USD');
// Returns: $99.99

const eur = dataHelper.formatCurrency(50, 'EUR');
// Returns: €50.00
```

**Parameters:**
- `amount`: number - Amount to format
- `currency`: string (optional, default: 'USD') - Currency code

**Returns:** string (formatted currency)

---

### Usage Examples

```typescript
// Complete registration test
When('I register as new user', async function(this: CustomWorld) {
  const email = dataHelper.generateEmail();
  const password = dataHelper.generatePassword();
  const name = dataHelper.generateFullName();
  
  await this.registerPage.fillForm({
    name: name,
    email: email,
    password: password,
    phone: dataHelper.generatePhoneNumber()
  });
  
  await this.registerPage.submit();
});

// Use random data for variations
Given('I create test data', async function(this: CustomWorld) {
  this.testData = {
    email: dataHelper.generateEmail(),
    password: dataHelper.generatePassword(),
    firstName: dataHelper.generateFirstName(),
    lastNamedataHelper.generateLastName(),
    age: dataHelper.generateRandomNumber(50, 18),
    isActive: dataHelper.generateBoolean(),
    joinDate: dataHelper.generateDate(-30),
    uniqueId: dataHelper.generateUUID()
  };
});

// Form with random selections
When('I fill form with random data', async function(this: CustomWorld) {
  const options = ['Red', 'Green', 'Blue', 'Yellow'];
  await page.selectOption('[name="color"]', dataHelper.getRandomItem(options));
  
  // Shuffle and pick random items
  const shuffled = dataHelper.shuffleArray([1, 2, 3, 4, 5]);
  for (const item of shuffled.slice(0, 3)) {
    await page.check(`input[value="${item}"]`);
  }
});
```

---

## LocatorHelper

**Location:** `src/utils/locatorHelper.ts`

Loads and manages locators from the centralized properties file.

### Locator Management

#### getLocator(key)
Get locator value from properties file.

```typescript
const searchButton = locatorHelper.getLocator('searchButton');
// Returns: 'button:has-text("Search")'

// Use in page objects
private readonly searchButton = this.createLocator(
  this.getLocator('searchButton')
);
```

**Parameters:**
- `key`: string - Locator key

**Returns:** string (CSS selector)

**Throws:** Error if key not found

---

#### getLocators(keys)
Get multiple locators at once.

```typescript
const [input, button, results] = locatorHelper.getLocators([
  'searchInput',
  'searchButton',
  'searchResults'
]);
```

**Parameters:**
- `keys`: string[] - Array of locator keys

**Returns:** string[] (Array of CSS selectors)

---

#### hasLocator(key)
Check if locator exists.

```typescript
if (locatorHelper.hasLocator('loginButton')) {
  // Use it
}
```

**Parameters:**
- `key`: string - Locator key

**Returns:** boolean

---

#### getAllLocators()
Get all loaded locators.

```typescript
const allLocators = locatorHelper.getAllLocators();
console.log(allLocators);
// {
//   searchInput: "[placeholder*='search']",
//   searchButton: "button:has-text('Search')",
//   ...
// }
```

**Returns:** { [key: string]: string } (All locators)

---

#### printAllLocators()
Print all locators to console (useful for debugging).

```typescript
locatorHelper.printAllLocators();
// Outputs:
// ====== ALL LOCATORS ======
// searchInput: [placeholder*="search"]
// searchButton: button:has-text("Search")
// ...
```

**Returns:** void

---

### UILocators.properties Format

**Location:** `src/locators/UILocators.properties`

Centralized selector management file.

```properties
# ============================================
# Search Page Locators
# ============================================
searchInput=[placeholder*="search"]
searchButton=button:has-text("Search")
searchResults=div[role="region"]
noResultsMessage=.no-results
resultItems=.search-result-item

# ============================================
# Login Page Locators
# ============================================
usernameInput=[name="username"]
passwordInput=[name="password"]
loginButton=[role="button"]:has-text("Login")
errorMessage=[role="alert"]

# ============================================
# Common Locators
# ============================================
header=header
footer=footer
sidebar=[role="navigation"]
mainContent=main
```

**Benefits:**
- ✅ Single source of truth
- ✅ Easy to update selectors
- ✅ Reuse across pages
- ✅ No hardcoded selectors

---

## Quick Reference Table

| Helper | Method | Purpose |
|--------|--------|---------|
| **AssertionHelper** | `textToContain()` | Check text includes substring |
| | `numberGreaterThan()` | Compare numbers |
| | `arrayToContain()` | Find item in array |
| | `urlToContain()` | Check URL path |
| **WaitHelper** | `waitForNetworkIdle()` | Wait for network requests |
| | `waitForCondition()` | Wait for custom logic |
| | `retryWithBackoff()` | Retry with exponential backoff |
| | `waitForElementCount()` | Wait for specific element count |
| **DataHelper** | `generateEmail()` | Create unique email |
| | `generatePassword()` | Create secure password |
| | `generateUUID()` | Create unique ID |
| | `generateRandomNumber()` | Random number in range |
| | `getRandomItem()` | Pick random from array |
| **LocatorHelper** | `getLocator()` | Load selector from properties |
| | `getAllLocators()` | Get all available locators |
| | `hasLocator()` | Check if locator exists |

---

## Integration Example

```typescript
// Complete step using all helpers
When('I search and verify results', async function(this: CustomWorld) {
  // Use DataHelper for test data
  const query = dataHelper.generateRandomString(10);
  
  // Use BasePage to perform actions
  await this.searchPage.search(query);
  
  // Use WaitHelper for synchronization
  await WaitHelper.waitForNetworkIdle(this.page);
  
  // Use AssertionHelper for verification
  const resultCount = await this.searchPage.getResultsCount();
  await AssertionHelper.numberGreaterThan(resultCount, 0);
  
  const firstResult = await this.searchPage.getFirstResultText();
  await AssertionHelper.textNotToContain(firstResult, 'error');
});
```

---

**Total Helper Methods:** 50+  
**All methods are:** Static, Type-safe, Documented, Production-ready

Helpers make tests cleaner, more maintainable, and more reliable!
