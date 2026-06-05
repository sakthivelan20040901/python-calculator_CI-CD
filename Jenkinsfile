pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Node') {
            steps {
                dir('node') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Python') {
            steps {
                dir('python') {
                    sh 'pip3 install -r requirements.txt'
                }
            }
        }

        stage('Build Java') {
            steps {
                dir('java') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Go') {
            steps {
                dir('go') {
                    sh 'go build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }

    post {

        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}