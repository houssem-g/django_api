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
    stage('Quality code') {
      agent {
        docker {
          image 'python:3.7.2'
        }

      }
      steps {
        sh 'pip install pipenv'
        sh 'pipenv install --dev'
        sh 'pylint ./backend/django_project --load-plugins pylint_django || exit 0'
      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}