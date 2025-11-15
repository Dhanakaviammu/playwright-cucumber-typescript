/**
 * DataHelper - Utilities for test data generation and management
 * 
 * Provides methods to generate random and test data.
 * Useful for creating unique test data for each test run.
 * 
 * Benefits:
 * - Generate unique test data
 * - Consistent data formatting
 * - Centralized test data management
 * - Easy to extend with custom data generators
 * 
 * Usage:
 * const email = dataHelper.generateEmail();
 * const phoneNumber = dataHelper.generatePhoneNumber();
 */

export class DataHelper {
  /**
   * Generate random string
   */
  static generateRandomString(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min = 1, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate unique email
   */
  static generateEmail(): string {
    return `test.user.${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Generate username
   */
  static generateUsername(prefix = 'user'): string {
    return `${prefix}_${this.generateRandomString(8)}`;
  }

  /**
   * Generate password
   */
  static generatePassword(length = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*';

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    const allChars = uppercase + lowercase + numbers + special;
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Generate phone number
   */
  static generatePhoneNumber(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    return `${areaCode}-${exchange}-${lineNumber}`;
  }

  /**
   * Generate first name
   */
  static generateFirstName(): string {
    const names = [
      'John',
      'Jane',
      'Robert',
      'Mary',
      'Michael',
      'Patricia',
      'James',
      'Jennifer',
      'David',
      'Linda'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate last name
   */
  static generateLastName(): string {
    const names = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate full name
   */
  static generateFullName(): string {
    return `${this.generateFirstName()} ${this.generateLastName()}`;
  }

  /**
   * Generate date in format YYYY-MM-DD
   */
  static generateDate(daysFromNow = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  /**
   * Generate timestamp
   */
  static generateTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Generate UUID
   */
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Generate random boolean
   */
  static generateBoolean(): boolean {
    return Math.random() > 0.5;
  }

  /**
   * Get random item from array
   */
  static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Shuffle array
   */
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Format currency
   */
  static formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Delay in milliseconds (promise based)
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const dataHelper = new DataHelper();

export default DataHelper;
