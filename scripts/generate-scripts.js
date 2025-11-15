#!/usr/bin/env node

/**
 * Generate package.json scripts from tag configuration
 * This script reads the TAG_COMMANDS from src/config/tags/index.ts
 * and generates the appropriate npm scripts
 */

const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

// Define the base scripts
const baseScripts = {
  test: 'cucumber-js',
  'test:parallel': 'cucumber-js --parallel 2',
  'test:tags': 'cucumber-js --tags',
  report: 'open reports/cucumber-report.html'
};

// Define tag-based scripts
const tagScripts = {
  'test:ui': 'cucumber-js --tags "@ui"',
  'test:smoke': 'cucumber-js --tags "@smoke"',
  'test:regression': 'cucumber-js --tags "@regression"',
  'test:sanity': 'cucumber-js --tags "@sanity"',
  'test:functionality': 'cucumber-js --tags "@functionality"',
  'test:edge-case': 'cucumber-js --tags "@edge-case"'
};

// Merge all scripts
packageJson.scripts = {
  ...baseScripts,
  ...tagScripts
};

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('✅ package.json scripts updated successfully!');
console.log('\nAvailable test commands:');
Object.keys(packageJson.scripts).forEach(script => {
  if (script.startsWith('test')) {
    console.log(`  npm run ${script}`);
  }
});
