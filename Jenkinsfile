pipeline {
    agent {
        docker {
            image 'python:3.12'
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                pip install -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                pytest -v
                '''
            }
        }

        stage('Generate Coverage Report') {
            steps {
                sh '''
                pytest --cov=calculator --cov-report=xml
                '''
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                python calculator.py
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}