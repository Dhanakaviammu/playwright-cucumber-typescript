@echo off
echo ================================================
echo Installing Playwright Browsers for Jenkins
echo ================================================

REM Navigate to project directory
cd /d %~dp0

REM Install dependencies
echo Installing npm dependencies...
call npm install

REM Install Playwright browsers with system dependencies
echo Installing Playwright browsers for SYSTEM user...
call npx playwright install chromium --with-deps
call npx playwright install firefox --with-deps
call npx playwright install webkit --with-deps

echo ================================================
echo Playwright installation completed successfully
echo ================================================

REM Verify installation
echo.
echo Checking installed browsers:
call npx playwright install --with-deps
