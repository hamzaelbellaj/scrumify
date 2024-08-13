pipeline {
    agent any
    environment {
        ACR_NAME = 'scrumifyacr'
        ACR_URL = "${ACR_NAME}.azurecr.io"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/hamzaelbellaj/scrumify.git', credentialsId: 'github-token'
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

        stage('Push Docker Images to ACR') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'ACR_PASSWORD', usernameVariable: 'ACR_USERNAME')]) {
                        // Push the backend image
                        sh "docker login ${ACR_URL} -u ${ACR_USERNAME} -p ${ACR_PASSWORD}"
                        sh "docker tag scrum-backend:latest ${ACR_URL}/scrum-backend:latest"
                        sh "docker push ${ACR_URL}/scrum-backend:latest"
                        
                        // Push the frontend image
                        sh "docker tag scrum-frontend:latest ${ACR_URL}/scrum-frontend:latest"
                        sh "docker push ${ACR_URL}/scrum-frontend:latest"
                    }
                }
            }
        }

        stage('Deploy to AKS') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'aks-cluster', variable: 'KUBECONFIG')]) {
                        sh "kubectl apply -f k8s/scrum-backend-deployment.yaml --kubeconfig=$KUBECONFIG"
                        sh "kubectl apply -f k8s/scrum-frontend-deployment.yaml --kubeconfig=$KUBECONFIG"
                        sh "kubectl apply -f k8s/scrum-mongo-deployment.yaml --kubeconfig=$KUBECONFIG"
                    }
                }
            }
        }
    }
}