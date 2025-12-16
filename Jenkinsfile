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
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\playwright-browsers"
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
                    
                    echo.
                    echo Installing Playwright browsers...
                    echo Browser cache location: %PLAYWRIGHT_BROWSERS_PATH%
                    
                    call npx playwright install chromium --with-deps
                    
                    echo.
                    echo Verifying installation...
                    call npx playwright --version
                '''
                
                echo "✓ Dependencies installed successfully"
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
