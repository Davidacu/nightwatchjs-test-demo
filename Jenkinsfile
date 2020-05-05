pipeline{
	agent{
          docker{
               image 'tmaier/docker-compose'
               args '--rm --detach --privileged --network jenkins --network-alias docker --env DOCKER_TLS_CERTDIR=/certs --volume jenkins-docker-certs:/certs/client --volume jenkins-data:/var/jenkins_home --publish 2376:2376'
          }
     }

	stages{
		stage('Test'){
			steps{
                    sh 'printenv'
                    sh 'docker info'
                    sh 'docker-compose --version'
                    sh 'docker-compose -f $WORKSPACE/docker-compose.yml up'

			}
		}
	}

}