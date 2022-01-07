pipeline {
    agent any
    stages {
        stage('Docker Build') {
            agent any
            stage('Build image') {
                docker.build("getintodevops/hellonode")
            }
            stage('Run image') {
                docker.run("getintodevops/hellonode -p 80:3000")
            }
        }
    }
}