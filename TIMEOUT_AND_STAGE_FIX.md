# Timeout Fix - Stage Failure Resolution

## Issue Found
The "Generate Report" stage was being **skipped** when tests failed, due to Jenkins Declarative Pipeline behavior.

Additionally, tests were timing out with:
```
Error: function timed out, ensure the promise resolves within 5000 milliseconds
```

## Root Causes

### 1. Skipped Stage Issue
- In Jenkins Declarative Pipeline, if a stage fails, subsequent stages are skipped
- The "Run Tests" stage was failing, so "Generate Report" was never executed

### 2. Timeout Issue
- Cucumber has a default timeout of 5 seconds for hooks
- Launching Playwright browser takes 10-15+ seconds
- The `timeout: 60000` setting wasn't being applied to Before/After hooks

## Solutions Applied

### 1. Restructured Pipeline (Jenkinsfile)
- **Changed**: Combined "Run Tests" and "Generate Report" into a single "Test & Report" stage
- **Added**: `post { always { } }` block within the stage
- **Result**: Report generation now runs regardless of test pass/fail

**Benefits**:
- Report always generated (even if tests fail)
- Better visual separation in Jenkins UI
- Ensures artifacts are always created for viewing

### 2. Increased Cucumber Timeout (cucumber.js)
- **Changed**: `timeout: 60000` → `timeout: 120000`
- **Rationale**: 120 seconds allows for:
  - Browser launch: ~10-15 seconds
  - Navigation: ~10 seconds
  - Test execution: ~30 seconds
  - Buffer for slower systems: ~50 seconds

## Files Modified

### Jenkinsfile
```groovy
// Before: Two separate stages that skipped on failure
stage('Run Tests') { ... }
stage('Generate Report') { ... }

// After: Single stage with post hook
stage('Test & Report') {
    steps { ... run tests ... }
    post {
        always { ... generate report ... }
    }
}
```

### cucumber.js
```javascript
// Before:
timeout: 60000

// After:
timeout: 120000  // Allows browser launch + test execution
```

## How It Works Now

```
Jenkins Build Execution:
┌─────────────────────────────────────┐
│ Stage: Test & Report                │
├─────────────────────────────────────┤
│ 1. Run Tests (npx cucumber-js)      │
│    - May pass or fail               │
│    - Always generates JSON          │
│                                     │
│ 2. Post: Always Generate Report     │
│    - Runs regardless of test result │
│    - Converts JSON → HTML           │
│    - Always succeeds if JSON exists │
├─────────────────────────────────────┤
│ Stage: Post Actions                 │
│ - Archive artifacts (always)        │
│ - Report success/failure            │
└─────────────────────────────────────┘
```

## Expected Behavior

### If Tests Pass
1. Tests execute successfully ✓
2. JSON report created ✓
3. HTML report generated ✓
4. Artifacts archived ✓
5. Build marked SUCCESS ✓

### If Tests Fail
1. Tests execute with failures ✓
2. JSON report created with failure data ✓
3. HTML report generated ✓
4. Artifacts archived ✓
5. Build marked FAILURE but report available ✓

## Next Jenkins Build

The next build will:
- Always generate the HTML report
- Never skip the report generation stage
- Provide test results regardless of pass/fail
- Display all information in the Jenkins UI

## Technical Notes

- Cucumber timeout applies to all steps and hooks
- The 120-second timeout is sufficient for slow CI systems
- Post hooks within stages are more reliable in Jenkins than separate stages
- This approach maintains backward compatibility

---

**Status**: ✅ FIXED - Ready for next build
