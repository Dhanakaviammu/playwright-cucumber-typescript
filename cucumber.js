module.exports = {
  default: {
    require: ['src/support/**/*.ts', 'src/hooks/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress', 
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 1,
    paths: ['src/features/**/*.feature'],
    strict: true,
    dryRun: false,
    failFast: false,
    retry: 0,
    timeout: 120000  // Set Cucumber timeout to 120 seconds (includes browser launch time + Playwright timeout)
  }
};