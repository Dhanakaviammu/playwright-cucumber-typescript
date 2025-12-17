#!/usr/bin/env node

/**
 * Generate HTML report from Cucumber NDJSON report
 * NDJSON (newline-delimited JSON) is the proper format for Cucumber messages
 * Usage: node scripts/generate-html-report.js
 */

const fs = require('fs');
const path = require('path');
const { createReadStream } = require('fs');
const CucumberHtmlFormatter = require('@cucumber/html-formatter').default;

try {
  const reportsDir = path.join(__dirname, '..', 'reports');
  const ndjsonReportPath = path.join(reportsDir, 'cucumber-report.ndjson');
  const htmlReportPath = path.join(reportsDir, 'cucumber-report.html');

  // Check if NDJSON report exists
  if (!fs.existsSync(ndjsonReportPath)) {
    console.log('[WARNING] NDJSON report not found at:', ndjsonReportPath);
    console.log('Please run tests first: npm test');
    process.exit(1);
  }

  // Verify the file has content
  const stats = fs.statSync(ndjsonReportPath);
  if (stats.size === 0) {
    console.error('[ERROR] NDJSON report is empty');
    process.exit(1);
  }

  console.log(`[INFO] Processing NDJSON report (${(stats.size / 1024).toFixed(2)} KB)...`);

  // Create a read stream from the NDJSON file (messages are already in NDJSON format)
  const messageStream = createReadStream(ndjsonReportPath, { encoding: 'utf-8' });

  // Create the HTML formatter stream
  const htmlStream = new CucumberHtmlFormatter();

  // Collect the HTML output
  let htmlContent = '';
  
  htmlStream.on('data', (chunk) => {
    htmlContent += chunk.toString();
  });

  htmlStream.on('end', () => {
    // Verify we have HTML content
    if (!htmlContent || htmlContent.trim().length === 0) {
      console.error('[ERROR] HTML formatter produced empty output');
      process.exit(1);
    }
    
    // Write to file
    fs.writeFileSync(htmlReportPath, htmlContent);
    const fileSizeKb = (htmlContent.length / 1024).toFixed(2);
    console.log(`[OK] HTML report generated successfully: ${fileSizeKb} KB`);
    console.log(`[OK] Report saved to: ${htmlReportPath}`);
  });

  htmlStream.on('error', (error) => {
    console.error('[ERROR] Error generating HTML report:', error.message);
    process.exit(1);
  });

  messageStream.on('error', (error) => {
    console.error('[ERROR] Error reading NDJSON file:', error.message);
    process.exit(1);
  });

  // Pipe the NDJSON messages through the HTML formatter
  messageStream.pipe(htmlStream);

} catch (error) {
  console.error('[ERROR] Error:', error.message);
  process.exit(1);
}
