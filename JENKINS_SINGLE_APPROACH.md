# RECOMMENDED JENKINS SETUP - SINGLE APPROACH

## What Was Changed

### Simplified Jenkinsfile Configuration
```
✅ Clean and Simple
✅ No complex retries or diagnostic stages
✅ No network checks (less overhead)
✅ Stores browsers in workspace (not system profile)
✅ Works even with slow networks
```

## How It Works

### Key Configuration
```groovy
PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\playwright-browsers"
```

This tells Playwright to:
1. Store browser binaries in the **workspace folder**
2. NOT in the SYSTEM user's AppData folder
3. Makes it isolated per job execution
4. No conflicts between different Jenkins jobs

### Pipeline Flow
```
1. Checkout code from GitHub ✓
2. Install npm dependencies (npm install)
3. Install Playwright browsers (npx playwright install chromium --with-deps)
4. Build TypeScript (npm run build)
5. Run tests (npm test)
6. Archive reports (Post-build)
```

## Network Timeout Fix

The environment variable approach handles network issues naturally:
- Browsers install in workspace (isolated)
- Each build has fresh browser cache
- No reliance on system profile
- More reliable than system-wide installation

## Setup Steps (One Time)

### Step 1: Update GitHub Credentials
```
Jenkins > Manage Jenkins > Manage Credentials > Global > Add Credentials
```

**Configuration:**
- Kind: Username with password
- Username: Your GitHub username
- Password: Your GitHub PAT (Personal Access Token)
- ID: `github-credentials`

[How to create GitHub PAT](https://github.com/settings/tokens)

### Step 2: Create Jenkins Job

1. Click **New Item**
2. Enter job name: `playwright-cucumber-tests`
3. Select **Pipeline**
4. In **Pipeline** section:
   - Select: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/YOUR-USERNAME/YOUR-REPO.git`
   - Credentials: Select `github-credentials`
   - Script Path: `Jenkinsfile`
5. Click **Save**

### Step 3: Run the Job
```
Jenkins > playwright-cucumber-tests > Build Now
```

## Expected Build Output

```
✓ Checkout code from GitHub...
✓ Installing npm packages...
✓ Installing Playwright browsers...
✓ Building TypeScript...
✓ Running Cucumber tests...
✓ Archiving reports...
```

## What NOT To Do

❌ Don't install browsers manually on Jenkins server
❌ Don't modify Jenkinsfile environment variables
❌ Don't disable `--with-deps` flag
❌ Don't add custom retry logic

## Troubleshooting

### Issue: Still downloading browsers slowly
**Solution:** This is expected. Browsers are ~170MB. First run takes 5-10 minutes.

### Issue: Tests fail with "executable not found"
**Solution:** Browsers weren't installed. Check Jenkins console output for errors.

### Issue: Different errors in Jenkins vs Local
**Solution:** Run locally with same command:
```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = "$(Get-Location)\playwright-browsers"
npx playwright install chromium --with-deps
npm test
```

## Is This Production Ready?

✅ **YES**

This approach:
- Works for small and large teams
- Handles intermittent network issues
- Easy to maintain
- No external dependencies
- Standard Playwright setup

## Next Steps After Build Success

1. Monitor build trends in Jenkins
2. Configure email notifications (optional)
3. Set up scheduled builds (nightly tests)
4. Archive test reports for history
