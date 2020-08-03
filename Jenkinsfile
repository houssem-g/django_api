pipeline {
  agent any
  stages {
    stage('scm') {
      environment {
        scm = 'dev'
      }
      steps {
        echo 'check git connection'
      }
    }

    stage('Build Django') {
      steps {
        sh 'docker-compose up django_back || exit 0'
      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}