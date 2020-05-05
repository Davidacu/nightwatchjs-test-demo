pipeline{
	agent {
          docker{
               image 'tmaier/docker-compose'          
          }
     }
	stages{
		stage('Test'){
			steps{
                    sh 'printenv'
                    sh 'docker-compose -f $WORKSPACE/docker-compose.yml up'

			}
		}
	}

}