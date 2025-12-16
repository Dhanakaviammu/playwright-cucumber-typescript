# Playwright Install Command Comparison

## Quick Reference

```bash
# BASIC INSTALL - Browser binaries only
npx playwright install

# FULL INSTALL - Browsers + System Dependencies (RECOMMENDED FOR CI/CD)
npx playwright install --with-deps

# SPECIFIC BROWSER - Faster, smaller download
npx playwright install chromium --with-deps
```

---

## Detailed Explanation

### 1. `npx playwright install`
- **Downloads:** Only browser binaries (Chromium, Firefox, WebKit)
- **Size:** ~340 MB total
- **Time:** ~5-10 minutes
- **Best For:** Local machines with pre-installed system libraries
- **Fails on:** Minimal/fresh Windows/Linux installations

### 2. `npx playwright install --with-deps` 
- **Downloads:** Browsers + all system-level dependencies
- **Size:** ~400-500 MB (includes deps)
- **Time:** ~10-15 minutes
- **Best For:** CI/CD, Docker, Clean servers, Jenkins
- **Handles:** Missing Visual C++, GTK libs, fonts, etc.

### 3. `npx playwright install chromium --with-deps`
- **Downloads:** Only Chromium browser + dependencies
- **Size:** ~200-250 MB
- **Time:** ~5-7 minutes
- **Best For:** When you only need one browser
- **Recommended For:** Jenkins (faster!)

---

## Windows SYSTEM User Context

Jenkins running as SYSTEM user means:
- ❌ NO user-specific environment variables
- ❌ NO installed applications (Visual C++, etc.)
- ❌ NO user profile settings
- ✅ Only OS-level system files available

This is why `--with-deps` is **critical** - it ensures the browser has everything needed to run.

---

## Test Locally (Before Jenkins)

```powershell
# Try basic install first
npx playwright install

# If that fails or Jenkins fails, use:
npx playwright install --with-deps

# Or install just Chromium (faster):
npx playwright install chromium --with-deps
```

---

## Environment Variables

You can control which browser to install:

```bash
# Skip Firefox & WebKit, install only Chromium
set PLAYWRIGHT_BROWSERS=chromium

npx playwright install --with-deps
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `Executable doesn't exist` | Add `--with-deps` flag |
| `ECONNRESET timeout` | Network issue, not command issue |
| `Permission denied` | Run as Administrator |
| `Missing .so files` | Add `--with-deps` flag |

