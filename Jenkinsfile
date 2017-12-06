pipeline {
	agent { node { label 'mocha-bdd' } }
	stages {
		stage('Install dependencies') {
			steps {
				sh 'npm install --verbose'
			}
		}
		stage('Run lint') {
			steps {
				sh 'npm run lint'
			}
		}
		stage('Run tests') {
			steps {
				sh 'npm run test'
				sh '''
				cp ~/.coveralls.yml-mocha-bdd .coveralls.yml
				npm run cover
				'''
			}
		}
	}
	post {
		success {
			githubNotify context: 'continuous-integration/jenkins/mocha-bdd', description: 'The build passed.', status: 'SUCCESS'
		}
		failure {
			githubNotify context: 'continuous-integration/jenkins/mocha-bdd', description: 'The build failed.', status: 'FAILURE'
		}
		aborted {
			githubNotify context: 'continuous-integration/jenkins/mocha-bdd', description: 'The build was aborted.', status: 'ERROR'
		}
	}
}
