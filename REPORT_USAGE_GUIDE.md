# How to Use the Fixed Cucumber Reports

## Quick Start

After your tests run (either locally or in Jenkins), the HTML report is automatically generated with all test results.

### Local Testing

```bash
# Run tests and generate report
npm test

# Or run specific test suites
npm run test:smoke
npm run test:ui
npm run test:api

# View the report
npm run report
```

### Jenkins Pipeline

The Jenkins pipeline automatically:
1. Runs all tests with `npx cucumber-js`
2. Generates the HTML report from JSON results
3. Archives the report as a build artifact

The report is accessible at: `${BUILD_URL}artifact/reports/cucumber-report.html`

## Report Features

The generated HTML report includes:

✓ **Summary Statistics**
- Total scenarios and steps
- Pass/Fail/Skip counts
- Duration information

✓ **Interactive Features**
- Expandable scenario details
- Step-by-step execution flow
- Error messages and stack traces
- Screenshot references

✓ **Test Organization**
- Grouped by feature file
- Filtered by tags (@smoke, @ui, @api, etc.)
- Color-coded status indicators

✓ **Full Context**
- Step definitions and locations
- Hook execution details
- Timing information for each step

## Important Notes

1. **JSON Report Must Exist**: The HTML generation script reads from `reports/cucumber-report.json`
   - This is automatically created by cucumber-js during test execution

2. **Automatic Generation**: All npm test commands now automatically generate the HTML report
   - No manual steps needed

3. **Jenkins Integration**: The Jenkinsfile has a dedicated "Generate Report" stage
   - Runs after "Run Tests" stage
   - Ensures report is always generated before archival

## Troubleshooting

### Report appears empty
- Ensure tests have actually run (check for `reports/cucumber-report.json`)
- Check that the JSON file contains test data
- Run `npm run generate:report` manually to regenerate

### Report not showing in Jenkins
- Verify the report file is being archived in the "Archive artifacts" stage
- Check Jenkins build logs for any errors
- Ensure `reports/**/*` is in the archiveArtifacts path

### Report generation fails
- Check that `@cucumber/html-formatter` is installed: `npm ls @cucumber/html-formatter`
- Verify the JSON file is valid: `npm run generate:report`
- Check Node.js version (requires Node 14+)

## Customizing Reports

To modify report generation:

1. Edit `scripts/generate-html-report.js` for custom logic
2. Modify `cucumber.js` to change test output formats
3. Update npm scripts in `package.json` to change automation

## Report Location

- **Local**: `./reports/cucumber-report.html`
- **Jenkins**: Available as artifact in build details
- **Jenkins URL**: `http://localhost:8080/job/[JOB_NAME]/[BUILD_NUMBER]/artifact/reports/cucumber-report.html`
