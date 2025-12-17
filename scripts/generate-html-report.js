#!/usr/bin/env node

/**
 * Generate HTML report from Cucumber NDJSON report
 * Uses @cucumber/html-formatter to convert NDJSON message format to interactive HTML
 */

const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

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

  // Load the HTML formatter
  const CucumberHtmlFormatter = require('@cucumber/html-formatter').default;

  // Read NDJSON file as text and create a readable stream
  const ndjsonContent = fs.readFileSync(ndjsonReportPath, 'utf-8');
  const ndjsonStream = Readable.from([ndjsonContent]);

  // Create the HTML formatter (it expects a text stream with NDJSON lines)
  const htmlFormatter = new CucumberHtmlFormatter();

  // Collect HTML output
  let htmlContent = '';
  
  htmlFormatter.on('data', (chunk) => {
    htmlContent += chunk.toString();
  });

  htmlFormatter.on('end', () => {
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

  htmlFormatter.on('error', (error) => {
    console.error('[ERROR] Error generating HTML report:', error.message);
    console.error('[ERROR] Stack:', error.stack);
    process.exit(1);
  });

  ndjsonStream.on('error', (error) => {
    console.error('[ERROR] Error reading NDJSON file:', error.message);
    process.exit(1);
  });

  // Pipe the NDJSON stream directly to the formatter
  ndjsonStream.pipe(htmlFormatter);

} catch (error) {
  console.error('[ERROR] Error:', error.message);
  process.exit(1);
}
