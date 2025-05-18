#!/bin/bash

set -e

# --------- CONFIG ---------
AWS_REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

BACKEND_IMAGE="user-document-service"
RAG_IMAGE="rag-python-api"
FRONTEND_IMAGE="frontend"

LOCAL_DIRS=("user-document-service" "rag-python-api" "frontend")
HELM_RELEASE="rag-app"
NAMESPACE="rag-app"

# --------- LOGIN TO ECR ---------
echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# --------- BUILD AND PUSH IMAGES ---------
for i in ${!LOCAL_DIRS[@]}; do
  DIR=${LOCAL_DIRS[$i]}
  REPO=${!i}
  REPO_NAME=$(basename ${LOCAL_DIRS[$i]})
  IMAGE_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"

  echo "Building $REPO_NAME..."
  docker build -t $REPO_NAME ./$DIR

  docker tag $REPO_NAME:latest $IMAGE_URI
  docker push $IMAGE_URI

  echo "Updating image reference in Helm values.yaml..."
  yq eval ".${REPO_NAME}.image = \"$IMAGE_URI\"" -i helm/values.yaml
done

# --------- DEPLOY USING HELM ---------
echo "🚀 Deploying via Helm..."
helm upgrade --install $HELM_RELEASE ./helm --namespace $NAMESPACE --create-namespace

# --------- FINAL OUTPUT ---------
echo ""
echo "Deployment complete!"
echo "Visit your app:"
echo " - Frontend:     http://rag.local/"
echo " - Backend API:  http://rag.local/api"
echo " - RAG Service:  http://rag.local/rag"
