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
      agent {
        docker {
          image 'python:3.7.2'
        }

      }
      steps {
        sh 'docker build -t Django_Backend .'
      }
    }

  }
  post {
    always {
      cleanWs()
    }

  }
}