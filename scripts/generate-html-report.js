#!/usr/bin/env node

/**
 * Generate HTML report from Cucumber JSON report
 * Usage: node scripts/generate-html-report.js
 */

const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const CucumberHtmlFormatter = require('@cucumber/html-formatter').default;

try {
  const reportsDir = path.join(__dirname, '..', 'reports');
  const jsonReportPath = path.join(reportsDir, 'cucumber-report.json');
  const htmlReportPath = path.join(reportsDir, 'cucumber-report.html');

  // Check if JSON report exists
  if (!fs.existsSync(jsonReportPath)) {
    console.log('⚠️  JSON report not found at:', jsonReportPath);
    console.log('Please run tests first: npm test');
    process.exit(1);
  }

  // Read the JSON report
  const jsonData = fs.readFileSync(jsonReportPath, 'utf8');
  const messages = JSON.parse(jsonData);

  // Create a readable stream from messages
  const messageStream = Readable.from(
    messages.map(msg => JSON.stringify(msg) + '\n')
  );

  // Create the HTML formatter stream (it's a class, so use 'new')
  const htmlStream = new CucumberHtmlFormatter();

  // Collect the HTML output
  let htmlContent = '';
  
  htmlStream.on('data', (chunk) => {
    htmlContent += chunk.toString();
  });

  htmlStream.on('end', () => {
    // Write to file
    fs.writeFileSync(htmlReportPath, htmlContent);
    console.log('✓ HTML report generated successfully at:', htmlReportPath);
  });

  htmlStream.on('error', (error) => {
    console.error('✗ Error generating HTML report:', error);
    process.exit(1);
  });

  // Pipe the messages through the HTML stream
  messageStream.pipe(htmlStream);

} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
