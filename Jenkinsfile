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
        sh 'docker build -t django-backend -f Dockerfile.django .'
      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}