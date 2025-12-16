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
                echo "Installing dependencies..."
                bat 'npm install'
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
            
            // Publish HTML Cucumber Report
            echo "Step 2: Publishing Cucumber HTML report..."
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Report',
                includes: '**/*.html, **/*.css, **/*.js'
            ])
            
            // Publish JSON report for trend analysis
            echo "Step 3: Processing JSON test results..."
            step([$class: 'CucumberTestResultPublisher',
                  fileIncludePattern: 'reports/cucumber-report.json',
                  fileExcludePattern: '',
                  failedFeaturesNumber: 0,
                  failedScenariosNumber: 0,
                  skippedFeaturesNumber: 0,
                  skippedScenariosNumber: 0,
                  pendingFeaturesNumber: 0,
                  pendingScenariosNumber: 0,
                  undefinedFeaturesNumber: 0,
                  undefinedScenariosNumber: 0])
            
            // Clean up node_modules to save space (optional)
            echo "Step 4: Cleaning up workspace..."
            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules/**', type: 'INCLUDE'],
                    [pattern: '.playwright/**', type: 'INCLUDE']
                ]
            )
            
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
            echo "Test Reports: ${BUILD_URL}Cucumber_Report/"
            
            // Optional: Send email on success
            // mail to: 'team@example.com',
            //     subject: "Jenkins Build Successful: ${JOB_NAME} - ${BUILD_NUMBER}",
            //     body: """Build succeeded!\n\nJob: ${JOB_NAME}\nBuild: ${BUILD_NUMBER}\nURL: ${BUILD_URL}"""
        }

        unstable {
            echo ""
            echo "⚠ TESTS RAN BUT SOME FAILED"
            echo "Build Status: UNSTABLE"
            echo "Test Reports: ${BUILD_URL}Cucumber_Report/"
            
            // Optional: Send email on failure
            // mail to: 'team@example.com',
            //     subject: "Jenkins Build Unstable: ${JOB_NAME} - ${BUILD_NUMBER}",
            //     body: """Tests failed!\n\nJob: ${JOB_NAME}\nBuild: ${BUILD_NUMBER}\nURL: ${BUILD_URL}\n\nPlease review the test reports."""
        }

        failure {
            echo ""
            echo "╔════════════════════════════════════════╗"
            echo "║  ✗ BUILD FAILED - TESTS DID NOT PASS   ║"
            echo "╚════════════════════════════════════════╝"
            echo "Build Status: FAILURE"
            echo "Test Reports: ${BUILD_URL}Cucumber_Report/"
            echo "Please check the console output and test artifacts."
            
            // Optional: Send email on failure
            // mail to: 'team@example.com',
            //     subject: "Jenkins Build Failed: ${JOB_NAME} - ${BUILD_NUMBER}",
            //     body: """Build failed!\n\nJob: ${JOB_NAME}\nBuild: ${BUILD_NUMBER}\nURL: ${BUILD_URL}\n\nPlease check the test reports immediately."""
        }

        cleanup {
            echo "Final cleanup: Removing temporary files..."
            deleteDir()
        }
    }
}
