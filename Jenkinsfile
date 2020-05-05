pipeline{
	agent {
          docker{
               image 'tmaier/docker-compose'      
               args  '--env DOCKER_HOST=tcp://docker:2376 --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1'    
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