pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs('NodeJS 19.0.0') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Publish') {
            steps {
                echo 'Publishing....'
            }
        }
    }
}
