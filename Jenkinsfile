pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        NODE_ENV = 'jenkins'
        WORKSPACE_PATH = "${WORKSPACE}"
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.playwright"
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = 'false'
        NODE_TLS_MIN_VERSION = 'TLSv1.2'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "=========================================="
                echo "STAGE: Checking out code from GitHub..."
                echo "=========================================="
                
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Dhanakaviammu/playwright-cucumber-typescript.git',
                        credentialsId: 'github-credentials'
                    ]],
                    extensions: [
                        [$class: 'CloneOption', noTags: false, shallow: false],
                        [$class: 'CheckoutOption', timeout: 60]
                    ]
                ])
                
                echo "✓ Code checked out successfully"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "=========================================="
                echo "STAGE: Installing dependencies..."
                echo "=========================================="
                
                bat '''
                    echo Installing npm packages...
                    call npm install
                    
                    if %errorlevel% neq 0 (
                        echo ERROR: npm install failed
                        exit /b 1
                    )
                    
                    echo.
                    echo Installing Playwright browsers with extended timeout...
                    
                    REM Set extended timeout for large downloads
                    set PLAYWRIGHT_DOWNLOAD_PROXY=
                    set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=false
                    
                    REM Retry loop for browser installation
                    set RETRY_COUNT=0
                    :retry_install
                    if %RETRY_COUNT% geq 3 (
                        echo ERROR: Failed to install Playwright after 3 retries
                        exit /b 1
                    )
                    
                    set /a RETRY_COUNT=%RETRY_COUNT%+1
                    echo Attempt %RETRY_COUNT% of 3...
                    
                    call npx playwright install chromium --with-deps
                    
                    if %errorlevel% neq 0 (
                        echo WARNING: Attempt %RETRY_COUNT% failed, retrying...
                        timeout /t 10
                        goto retry_install
                    )
                    
                    echo.
                    echo Verifying Playwright installation...
                    call npx playwright --version
                '''
                
                echo "✓ Dependencies and browsers installed successfully"
            }
        }

        stage('Build') {
            steps {
                echo "Building TypeScript..."
                bat 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Cucumber tests..."
                bat 'npm test'
            }
        }

        stage('Generate Report') {
            steps {
                echo "Tests completed. Reports generated at reports/cucumber-report.html"
            }
        }
    }

    post {
        always {
            echo "=========================================="
            echo "POST-BUILD ACTIONS STARTING"
            echo "=========================================="
            
            // Archive all test artifacts
            echo "Step 1: Archiving test reports and screenshots..."
            archiveArtifacts artifacts: 'reports/**/*,screenshots/**/*', 
                             allowEmptyArchive: true,
                             fingerprint: true
            
            echo "Step 2: Test reports and artifacts archived successfully"
            
            echo "=========================================="
            echo "POST-BUILD ACTIONS COMPLETED"
            echo "=========================================="
        }

        success {
            echo ""
            echo "╔════════════════════════════════════════╗"
            echo "║  ✓ ALL TESTS PASSED SUCCESSFULLY!      ║"
            echo "╚════════════════════════════════════════╝"
            echo "Build Status: SUCCESS"
            echo "Test Reports available at: ${BUILD_URL}artifact/reports/"
        }

        unstable {
            echo ""
            echo "⚠ TESTS RAN BUT SOME FAILED"
            echo "Build Status: UNSTABLE"
            echo "Test Reports available at: ${BUILD_URL}artifact/reports/"
        }

        failure {
            echo ""
            echo "╔════════════════════════════════════════╗"
            echo "║  ✗ BUILD FAILED - TESTS DID NOT PASS   ║"
            echo "╚════════════════════════════════════════╝"
            echo "Build Status: FAILURE"
            echo "Test Reports available at: ${BUILD_URL}artifact/reports/"
            echo "Please check the console output and test artifacts."
        }

        cleanup {
            echo "Final cleanup: Workspace preserved for debugging"
        }
    }
}
