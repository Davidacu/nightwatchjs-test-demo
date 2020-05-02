pipeline {
    agent {
        dockerfile true
    }

    stages{
        stage('Build Image'){
            node{
                checkout scm
                def image = docker.build("davidsk8910/nightwatchtests:latest")
                image.push()

            }
        }
    }
}