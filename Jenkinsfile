pipeline {
    agent any
    tools (nodejs "node")

    stages {
        stage('Build') {
            steps {
                nodejs('NodeJS 19.0.0') {
                    bat "npm -v"
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
