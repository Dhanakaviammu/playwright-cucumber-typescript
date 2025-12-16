module.exports = {
  default: {
    require: ['src/support/**/*.ts', 'src/hooks/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress', 
      'html:reports/cucumber-report.html', 
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 1,
    paths: ['src/features/**/*.feature'],
    strict: true,
    dryRun: false,
    failFast: false,
    retry: 0,
    timeout: 60000  // Set Cucumber step timeout to 60 seconds (matches Playwright timeout)
  }
};