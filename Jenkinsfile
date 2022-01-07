pipeline {
    agent any
    tools {nodejs "node"}

    stages {
        stage('Build') {
            agent {
                docker {
                    image '.'
                    reuseNode true
                }
            }
        }
    }
}