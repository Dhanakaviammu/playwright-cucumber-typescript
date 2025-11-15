import { expect, Page } from '@playwright/test';

/**
 * AssertionHelper - Centralized assertions for tests
 * 
 * Provides common assertion methods with helpful error messages.
 * Makes assertions more readable and maintainable.
 * 
 * Benefits:
 * - Consistent assertion syntax across all tests
 * - Better error messages for debugging
 * - Easy to add custom assertions
 * - Centralized assertion logic
 * 
 * Usage:
 * await assertionHelper.textToBeVisible(page, 'Login');
 * await assertionHelper.urlToContain('localhost:3000');
 */

export class AssertionHelper {
  /**
   * Assert element text equals expected value
   */
  static async textToEqual(actualText: string, expectedText: string, message = '') {
    expect(actualText, `${message} - Expected text to equal '${expectedText}'`).toBe(expectedText);
  }

  /**
   * Assert element text contains expected value
   */
  static async textToContain(actualText: string, expectedText: string, message = '') {
    expect(actualText, `${message} - Expected text to contain '${expectedText}'`).toContain(expectedText);
  }

  /**
   * Assert element text does not contain value
   */
  static async textNotToContain(actualText: string, unexpectedText: string, message = '') {
    expect(actualText, `${message} - Expected text NOT to contain '${unexpectedText}'`).not.toContain(unexpectedText);
  }

  /**
   * Assert text matches regex pattern
   */
  static async textToMatch(actualText: string, pattern: RegExp, message = '') {
    expect(actualText, `${message} - Expected text to match pattern ${pattern}`).toMatch(pattern);
  }

  /**
   * Assert value equals expected
   */
  static async toEqual<T>(actual: T, expected: T, message = '') {
    expect(actual, `${message}`).toBe(expected);
  }

  /**
   * Assert value does not equal expected
   */
  static async notToEqual<T>(actual: T, notExpected: T, message = '') {
    expect(actual, `${message}`).not.toBe(notExpected);
  }

  /**
   * Assert value is true
   */
  static async toBeTrue(actual: boolean, message = '') {
    expect(actual, `${message} - Expected to be true`).toBe(true);
  }

  /**
   * Assert value is false
   */
  static async toBeFalse(actual: boolean, message = '') {
    expect(actual, `${message} - Expected to be false`).toBe(false);
  }

  /**
   * Assert value is null
   */
  static async toBeNull(actual: any, message = '') {
    expect(actual, `${message} - Expected to be null`).toBeNull();
  }

  /**
   * Assert value is not null
   */
  static async notToBeNull(actual: any, message = '') {
    expect(actual, `${message} - Expected not to be null`).not.toBeNull();
  }

  /**
   * Assert value is undefined
   */
  static async toBeUndefined(actual: any, message = '') {
    expect(actual, `${message} - Expected to be undefined`).toBeUndefined();
  }

  /**
   * Assert array contains value
   */
  static async arrayToContain(array: any[], value: any, message = '') {
    expect(array, `${message} - Expected array to contain '${value}'`).toContain(value);
  }

  /**
   * Assert array does not contain value
   */
  static async arrayNotToContain(array: any[], value: any, message = '') {
    expect(array, `${message} - Expected array NOT to contain '${value}'`).not.toContain(value);
  }

  /**
   * Assert array has specific length
   */
  static async arrayLength(array: any[], length: number, message = '') {
    expect(array, `${message} - Expected array length to be ${length}`).toHaveLength(length);
  }

  /**
   * Assert number is greater than value
   */
  static async numberGreaterThan(actual: number, value: number, message = '') {
    expect(actual, `${message} - Expected ${actual} to be greater than ${value}`).toBeGreaterThan(value);
  }

  /**
   * Assert number is greater than or equal to value
   */
  static async numberGreaterThanOrEqual(actual: number, value: number, message = '') {
    expect(actual, `${message} - Expected ${actual} >= ${value}`).toBeGreaterThanOrEqual(value);
  }

  /**
   * Assert number is less than value
   */
  static async numberLessThan(actual: number, value: number, message = '') {
    expect(actual, `${message} - Expected ${actual} to be less than ${value}`).toBeLessThan(value);
  }

  /**
   * Assert number is less than or equal to value
   */
  static async numberLessThanOrEqual(actual: number, value: number, message = '') {
    expect(actual, `${message} - Expected ${actual} <= ${value}`).toBeLessThanOrEqual(value);
  }

  /**
   * Assert object contains property
   */
  static async objectToHaveProperty(obj: any, property: string, message = '') {
    expect(obj, `${message}`).toHaveProperty(property);
  }

  /**
   * Assert URL equals
   */
  static async urlToEqual(actualUrl: string, expectedUrl: string, message = '') {
    expect(actualUrl, `${message} - Expected URL to equal '${expectedUrl}'`).toBe(expectedUrl);
  }

  /**
   * Assert URL contains value
   */
  static async urlToContain(actualUrl: string, expectedText: string, message = '') {
    expect(actualUrl, `${message} - Expected URL to contain '${expectedText}'`).toContain(expectedText);
  }

  /**
   * Assert URL matches pattern
   */
  static async urlToMatch(actualUrl: string, pattern: RegExp, message = '') {
    expect(actualUrl, `${message}`).toMatch(pattern);
  }
}

export const assertionHelper = new AssertionHelper();

export default AssertionHelper;
