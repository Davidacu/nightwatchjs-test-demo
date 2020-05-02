pipeline {
    agent {
        dockerfile true
    }

    stages{
        stage('Build Image'){
            steps{
                checkout scm
                def image = docker.build("davidsk8910/nightwatchtests:latest")
                image.push()

            }
        }
    }
}