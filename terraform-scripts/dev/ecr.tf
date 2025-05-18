resource "aws_ecr_repository" "rag_python_api" {
  name = "rag-python-api"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name        = "rag-python-api"
    Environment = "dev"
  }
}

resource "aws_ecr_repository" "user_document_service" {
  name = "user-document-service"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name        = "user-document-service"
    Environment = "dev"
  }
}

resource "aws_ecr_repository" "frontend" {
  name = "frontend"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name        = "frontend"
    Environment = "dev"
  }
}

resource "aws_ecr_lifecycle_policy" "rag_python_api_policy" {
  repository = aws_ecr_repository.rag_python_api.name
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only last 3 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 3
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_ecr_lifecycle_policy" "user_document_service_policy" {
  repository = aws_ecr_repository.user_document_service.name
  policy     = aws_ecr_lifecycle_policy.rag_python_api_policy.policy
}

resource "aws_ecr_lifecycle_policy" "frontend_policy" {
  repository = aws_ecr_repository.frontend.name
  policy     = aws_ecr_lifecycle_policy.rag_python_api_policy.policy
}


output "aws_ecr_repository_rag_python_api" {
  description = "The URL of the rag-python-api ECR repository"
  value       = aws_ecr_repository.rag_python_api.repository_url
}

output "aws_ecr_repository_user_document_service" {
  description = "The URL of the user-document-service ECR repository"
  value       = aws_ecr_repository.user_document_service.repository_url
}

output "aws_ecr_repository_frontend" {
  description = "The URL of the rag-frontend ECR repository"
  value       = aws_ecr_repository.frontend.repository_url
}
