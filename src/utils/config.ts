import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  baseUrl: process.env.TEST_BASE_URL || 'https://playwright.dev/',
  testEnv: process.env.TEST_ENV || 'development',
  // Use headless: true in CI environments, false for local development
  headless: process.env.CI === 'true' ? true : process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  pageTimeout: parseInt(process.env.PAGE_TIMEOUT || '30000', 10),
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),
};

export default config;
