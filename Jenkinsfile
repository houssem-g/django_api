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

    stage('Unit Test') {
      steps {
        sh 'docker-compose up django_back'
      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}