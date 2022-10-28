pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                node {
                    sh 'npm --version'
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
