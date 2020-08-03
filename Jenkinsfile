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
      parallel {
        stage('Build Django') {
          steps {
            sh 'docker build -t django-backend -f Dockerfile.django .'
          }
        }

        stage('Build React') {
          steps {
            sh 'docker build -t react-frontend -f ./frontend/Dockerfile.react .'
          }
        }

      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}