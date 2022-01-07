pipeline {
    agent any
    stages {
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t shanem/spring-petclinic:latest .'
                sh 'docker run -d shanem/spring-petclinic:latest -p 80:3000'
            }
        }
    }
}