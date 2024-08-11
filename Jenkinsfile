pipeline {
    agent any
    environment {
        ACR_NAME = 'akasbiacrpfa'
        ACR_URL = "${ACR_NAME}.azurecr.io"
        SONARQUBE_ENV = 'SonarQube'
        SONARQUBE_TOKEN = 'squ_be323c1480893e4211190de55cf4978d45266d1b'
        SLACK_CHANNEL = '#pfa'
        SLACK_WEBHOOK_URL = credentials('slack-webhook')
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
        ARGOCD_SERVER = '20.164.51.113'
        ARGOCD_TOKEN = credentials('argocd-token')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AkasbiYasser/scrum-app.git', credentialsId: 'github-token'
            }
        }

        stage('Pre-Build SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE_ENV) {
                    dir('scrum-backend') {
                        sh '''
                            export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
                            export PATH=$JAVA_HOME/bin:$PATH
                            sonar-scanner -Dsonar.projectKey=scrum-backend-prebuild -Dsonar.sources=. -Dsonar.host.url=http://4.221.188.204:9000 -Dsonar.login=${SONARQUBE_TOKEN}
                        '''
                    }
                    dir('scrum-frontend') {
                        sh '''
                            export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
                            export PATH=$JAVA_HOME/bin:$PATH
                            sonar-scanner -Dsonar.projectKey=scrum-frontend-prebuild -Dsonar.sources=. -Dsonar.host.url=http://4.221.188.204:9000 -Dsonar.login=${SONARQUBE_TOKEN}
                        '''
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the images with Docker Compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Post-Build SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE_ENV) {
                    dir('scrum-backend') {
                        sh '''
                            export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
                            export PATH=$JAVA_HOME/bin:$PATH
                            sonar-scanner -Dsonar.projectKey=scrum-backend-postbuild -Dsonar.sources=. -Dsonar.host.url=http://4.221.188.204:9000 -Dsonar.login=${SONARQUBE_TOKEN}
                        '''
                    }
                    dir('scrum-frontend') {
                        sh '''
                            export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
                            export PATH=$JAVA_HOME/bin:$PATH
                            sonar-scanner -Dsonar.projectKey=scrum-frontend-postbuild -Dsonar.sources=. -Dsonar.host.url=http://4.221.188.204:9000 -Dsonar.login=${SONARQUBE_TOKEN}
                        '''
                    }
                }
            }
        }

        stage('Push Docker Images to ACR') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'ACR_PASSWORD', usernameVariable: 'ACR_USERNAME')]) {
                        // Push the backend image
                        sh 'docker login ${ACR_URL} -u ${ACR_USERNAME} -p ${ACR_PASSWORD}'
                        sh 'docker tag scrum-backend:latest ${ACR_URL}/scrum-backend:latest'
                        sh 'docker push ${ACR_URL}/scrum-backend:latest'
                        
                        // Push the frontend image
                        sh 'docker tag scrum-frontend:latest ${ACR_URL}/scrum-frontend:latest'
                        sh 'docker push ${ACR_URL}/scrum-frontend:latest'
                    }
                }
            }
        }

        stage('Deploy to AKS') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'aks-cluster', variable: 'KUBECONFIG')]) {
                        sh 'kubectl apply -f k8s/scrum-backend-deployment.yaml --kubeconfig=$KUBECONFIG'
                        sh 'kubectl apply -f k8s/scrum-frontend-deployment.yaml --kubeconfig=$KUBECONFIG'
                        sh 'kubectl apply -f k8s/scrum-mongo-deployment.yaml --kubeconfig=$KUBECONFIG'
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                sh 'curl -X POST -H "Content-type: application/json" --data \'{"text":"Build and deployment successful."}\' ${SLACK_WEBHOOK_URL}'
            }
        }
        failure {
            script {
                sh 'curl -X POST -H "Content-type: application/json" --data \'{"text":"Build and deployment failed."}\' ${SLACK_WEBHOOK_URL}'
            }
        }
    }
}
