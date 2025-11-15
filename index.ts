/**
 * Tag Configuration System - Single Source of Truth
 * Central location for all test tags and npm script configurations
 */

// ============================================
// TAG CONSTANTS
// ============================================
export const ui = '@ui';
export const api = '@api';
export const smoke = '@smoke';
export const regression = '@regression';
export const sanity = '@sanity';
export const functionality = '@functionality';
export const edgeCase = '@edge-case';

// ============================================
// TAGS OBJECT (for backward compatibility)
// ============================================
export const TAGS = {
  UI: ui,
  API: api,
  SMOKE: smoke,
  REGRESSION: regression,
  SANITY: sanity,
  FUNCTIONALITY: functionality,
  EDGE_CASE: edgeCase,
};

// ============================================
// NPM SCRIPT DEFINITIONS (tag-based)
// ============================================
export const TAG_SCRIPTS = {
  'test:ui': `cucumber-js --tags "${ui}"`,
  'test:api': `cucumber-js --tags "${api}"`,
  'test:smoke': `cucumber-js --tags "${smoke}"`,
  'test:regression': `cucumber-js --tags "${regression}"`,
  'test:sanity': `cucumber-js --tags "${sanity}"`,
  'test:functionality': `cucumber-js --tags "${functionality}"`,
  'test:edge-case': `cucumber-js --tags "${edgeCase}"`,
};

// ============================================
// BASE NPM SCRIPT DEFINITIONS
// ============================================
export const BASE_SCRIPTS = {
  test: 'cucumber-js',
  'test:parallel': 'cucumber-js --parallel 2',
  'test:tags': 'cucumber-js --tags',
  report: 'open reports/cucumber-report.html',
};

// ============================================
// DEFAULT EXPORT
// ============================================
export default TAGS;

