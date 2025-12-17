#!/usr/bin/env node

/**
 * Generate HTML report from Cucumber NDJSON report
 * Uses @cucumber/html-formatter to convert NDJSON to interactive HTML
 */

const fs = require('fs');
const path = require('path');

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

  // Load and instantiate the HTML formatter
  const CucumberHtmlFormatter = require('@cucumber/html-formatter').default;
  const htmlFormatter = new CucumberHtmlFormatter();

  // Collect all HTML output
  let htmlContent = '';
  htmlFormatter.on('data', (chunk) => {
    htmlContent += chunk.toString();
  });

  htmlFormatter.on('end', () => {
    if (!htmlContent || htmlContent.trim().length === 0) {
      console.error('[ERROR] HTML formatter produced empty output');
      process.exit(1);
    }
    
    fs.writeFileSync(htmlReportPath, htmlContent);
    const fileSizeKb = (htmlContent.length / 1024).toFixed(2);
    console.log(`[OK] HTML report generated successfully: ${fileSizeKb} KB`);
    console.log(`[OK] Report saved to: ${htmlReportPath}`);
  });

  htmlFormatter.on('error', (error) => {
    console.error('[ERROR] Formatter error:', error.message);
    process.exit(1);
  });

  // Pipe the NDJSON file directly to the formatter
  // The formatter expects the raw NDJSON stream
  const ndjsonStream = fs.createReadStream(ndjsonReportPath);
  
  ndjsonStream.on('error', (error) => {
    console.error('[ERROR] Failed to read NDJSON file:', error.message);
    process.exit(1);
  });

  // Pipe NDJSON stream directly to formatter
  ndjsonStream.pipe(htmlFormatter);

} catch (error) {
  console.error('[ERROR]', error.message);
  process.exit(1);
}
