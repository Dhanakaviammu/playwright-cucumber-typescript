# First Commit Guide

This guide provides the step-by-step instructions to commit and push your Playwright-Cucumber-TypeScript BDD framework project to GitHub.

## Prerequisites

Before proceeding, ensure:
- ✅ You have a GitHub account
- ✅ You have created a new repository on GitHub (without README, .gitignore, or license)
- ✅ Git is installed on your system
- ✅ You are in the project directory: `playwright-cucumber-typescript`

## Step-by-Step Instructions

### Step 1: Stage All Files
Add all untracked files and changes to the staging area:

```powershell
git add .
```

This command stages all files in the current directory and subdirectories for commit.

---

### Step 2: Create Initial Commit
Create your first commit with a descriptive message:

```powershell
git commit -m "Initial commit: Playwright-Cucumber-TypeScript BDD framework with tag-based test execution"
```

This commits all staged files with a clear description of what's included.

---

### Step 3: Add GitHub Remote
Link your local repository to your GitHub repository. Replace `<YOUR_USERNAME>` and `<YOUR_REPO_NAME>` with your actual GitHub username and repository name:

```powershell
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
```

**Example:**
```powershell
git remote add origin https://github.com/Dhanakaviammu/playwright-cucumber-typescript.git
```

---

### Step 4: Rename Branch to main (If Needed)
Ensure your default branch is named `main`:

```powershell
git branch -M main
```

---

### Step 5: Push to GitHub
Push your commits to the GitHub repository:

```powershell
git push -u origin main
```

The `-u` flag sets the upstream tracking, so future pushes only require `git push`.

---

## Complete Command Sequence (Copy & Paste)

Run these commands in PowerShell in your project directory:

```powershell
git add .
git commit -m "Initial commit: Playwright-Cucumber-TypeScript BDD framework with tag-based test execution"
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

---

## Verification

After pushing, verify the upload:

1. Go to `https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>`
2. You should see all your project files
3. The commit message should appear in the commit history

---

## What's Included in This Commit

This initial commit includes the complete Playwright-Cucumber-TypeScript BDD framework with:

- **Feature Files**: BDD scenarios in Gherkin syntax
- **Step Definitions**: TypeScript implementations of Gherkin steps
- **Page Object Model**: SearchPage with Playwright automation
- **Hooks & Setup**: Before/After hooks and CustomWorld configuration
- **Configuration**: 
  - `index.ts`: Centralized tag configuration
  - `package.json`: npm scripts for tag-based test execution
  - `.env`: Environment variables for test configuration
  - `tsconfig.json`: TypeScript compilation settings
  - `cucumber.js`: Cucumber configuration with proper file loading order
- **Utilities**: Browser initialization, config management, fixtures
- **Documentation**: README, TAGS, TAG_CONFIGURATION, QUICK_REFERENCE guides
- **Scripts**: Helper scripts for test automation

---

## Troubleshooting

### Error: "fatal: not a git repository"
**Solution**: Ensure you're in the correct directory. Run:
```powershell
cd "C:\Users\Dhanapal T\playwright-cucumber-typescript"
```

### Error: "remote origin already exists"
**Solution**: If origin is already configured, skip Step 3 or update it:
```powershell
git remote set-url origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
```

### Error: "Authentication failed"
**Solution**: Use a GitHub Personal Access Token instead of password. Generate one at GitHub → Settings → Developer settings → Personal access tokens.

### Error: "refusing to merge unrelated histories"
**Solution**: If your GitHub repo has files, use:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Future Commits

After the initial commit, use these commands for subsequent changes:

```powershell
git add .
git commit -m "Your commit message here"
git push
```

---

## Notes

- The `-u` flag in `git push -u origin main` sets tracking, making future pushes simpler
- Always write clear, descriptive commit messages
- Commit frequently for better version control history
- The `.gitignore` file should exclude node_modules, .env (keep .env.example), and build files

---

**Happy coding!** 🚀
