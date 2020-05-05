pipeline{
	agent any
     
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