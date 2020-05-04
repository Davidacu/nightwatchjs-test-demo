pipeline{
	agent {dockerfile true}
	stages{
		stage('Test'){
			steps{
			 step([$class: 'DockerComposeBuilder', dockerComposeFile: 'DockerCompose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])

			}
		}
	}

}