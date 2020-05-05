pipeline{
	agent {
          docker{
               image 'tmaier/docker-compose'          
          }
     }
	stages{
		stage('Test'){
			steps{
                    sh 'docker-compose up'
			}
		}
	}

}