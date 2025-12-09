import fs from 'fs';
import path from 'path';

/**
 * LocatorHelper - Manages locator loading from UILocators.properties file
 * Provides centralized access to all UI element locators
 */

class LocatorHelper {
  private locators: Map<string, string> = new Map();
  private readonly locatorFilePath = path.resolve(__dirname, '../locators/UILocators.properties');

  constructor() {
    this.loadLocators();
  }

  /**
   * Load locators from UILocators.properties file
   * Parses key=value pairs, ignoring comments and empty lines
   */
  private loadLocators(): void {
    try {
      if (!fs.existsSync(this.locatorFilePath)) {
        throw new Error(`Locator file not found: ${this.locatorFilePath}`);
      }

      const fileContent = fs.readFileSync(this.locatorFilePath, 'utf-8');
      const lines = fileContent.split('\n');

      lines.forEach((line, index) => {
        // Skip empty lines and comments
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) {
          return;
        }

        // Parse key=value pairs
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const cleanKey = key.trim();
          const cleanValue = valueParts.join('=').trim();
          this.locators.set(cleanKey, cleanValue);
        }
      });

      console.log(`✓ Loaded ${this.locators.size} locators from UILocators.properties`);
    } catch (error) {
      console.error(`✗ Error loading locators: ${error}`);
      throw error;
    }
  }

  /**
   * Get a locator by key
   * @param key - The locator key (e.g., 'searchInput')
   * @returns The locator selector string
   * @throws Error if key not found
   */
  public getLocator(key: string): string {
    const locator = this.locators.get(key);
    if (!locator) {
      throw new Error(`Locator not found: "${key}". Available locators: ${Array.from(this.locators.keys()).join(', ')}`);
    }
    return locator;
  }

  /**
   * Get multiple locators by keys
   * @param keys - Array of locator keys
   * @returns Object with keys mapped to locators
   */
  public getLocators(keys: string[]): Record<string, string> {
    const result: Record<string, string> = {};
    keys.forEach(key => {
      result[key] = this.getLocator(key);
    });
    return result;
  }

  /**
   * Check if a locator exists
   * @param key - The locator key
   * @returns true if locator exists, false otherwise
   */
  public hasLocator(key: string): boolean {
    return this.locators.has(key);
  }

  /**
   * Get all available locators (for debugging)
   * @returns Map of all locators
   */
  public getAllLocators(): Map<string, string> {
    return new Map(this.locators);
  }

  /**
   * Print all locators to console (useful for debugging)
   */
  public printAllLocators(): void {
    console.log('\n========== Available Locators ==========');
    Array.from(this.locators.entries()).forEach(([key, value]) => {
      //console.log(`${key}: ${value}`);
    });
    console.log('=========================================\n');
  }
}

// Export singleton instance
export const locatorHelper = new LocatorHelper();

export default locatorHelper;
