
 node{
    checkout scm
    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {

         def image = docker.build("davidsk8910/nightwatchtests:latest")
         image.push()
    }
}
