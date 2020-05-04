pipeline{
	agent {dockerfile true}
	stages{
		stage('Test'){
			steps{
			 step([$class: 'DockerComposeBuilder', dockerComposeFile: 'Dockercompose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])

			}
		}
	}

}