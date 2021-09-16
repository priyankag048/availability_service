pipeline {
  agent any
  parameters {
    booleanParam(name: 'SCAN_DOCKER', defaultValue: false, description: 'Scan docker image')
  }
  stages {
    stage("init") {
      steps {
        echo 'Initializing Continuous Integration'
          checkout([$class: 'GitSCM',
                    branches: [[name: "origin/main"]],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'LocalBranch']],
                    submoduleCfg: []])
          sh 'git branch'
      }
    }
    stage("test") {
      steps {
        echo 'Unit test'
        script {
          docker.image('node:14-alpine').inside {
            sh '''
              yarn install
              yarn test
              COVERAGE=$(node bin/calculateCoverage.js)
              echo "Total coverage: ${COVERAGE}"
              if [ ${COVERAGE} -gt 90 ]; then
                echo "Threshold exceeded"
                exit 1
              fi
            '''
          }
        }
        script {
          archiveArtifacts artifacts: 'coverage/coverage-summary.json', fingerprint: true
        }
      }
    }
    stage("static code checks") {
      steps {
        echo 'Static Code Checks'
        script {
          docker.image('node:14-alpine').inside {
            sh '''
              yarn install
              yarn lint
            '''
          }
        }
      }
    }
    stage("build") {
      steps {
        script{
          echo "Build docker image"
          docker.build("availability:2")
        }
      }
    }
    stage("package") {
      steps {
        echo 'push to docker hub'
        script{
          sh 'docker tag availability:2 priyankaguha/availability:2'
          sh 'docker push priyankaguha/availability:2'
        }
        script {
          sh '''docker inspect -f '{{.RepoDigests}}' $image_name priyankaguha/availability:2 > dockerImage.txt'''
          archiveArtifacts artifacts: 'dockerImage.txt', fingerprint: true
        }
      }
    }
    stage("scan") {
      when {
        expression { SCAN_DOCKER == true }
      }
      steps {
        echo "Scan Dockerfile"
        script {
          sh 'docker scan -f Dockerfile priyankaguha/availability:2'
        }
      }
    }
  }
  post {
    always {
      cleanWs(
          deleteDirs: true
        )
    }
  }
}
