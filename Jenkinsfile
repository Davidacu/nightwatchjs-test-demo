
 node{
    checkout scm
    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {

         def image = docker.build("davidsk8910/nightwatchtests:latest")
         image.push()
         image.inside{
              sh 'docker compose -f Dockercompose.yml up'
         }
    }
}
