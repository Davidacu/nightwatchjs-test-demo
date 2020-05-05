pipeline{
	agent {
          docker{
               image 'tmaier/docker-compose'          
          }
     }
	stages{
		stage('Test'){
			steps{
                    sh 'sudo docker-compose up'
			}
		}
	}

}