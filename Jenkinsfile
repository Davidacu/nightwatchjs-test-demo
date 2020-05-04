pipeline{
	agent any
	stages{
		stage('Test'){
			steps{
                    step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: false])

			}
		}
	}

}