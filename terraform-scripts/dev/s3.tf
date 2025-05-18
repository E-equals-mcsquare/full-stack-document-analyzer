# S3 bucket to store uploaded documents
resource "aws_s3_bucket" "document_bucket" {
  bucket        = "document-analyzer-document-bucket-${random_id.suffix.hex}"
  force_destroy = true # Auto-delete objects when destroying infra (for dev only)

  tags = {
    Name        = "document-storage"
    Environment = "dev"
  }
}

# Random suffix to ensure unique bucket name
resource "random_id" "suffix" {
  byte_length = 4
}

# Enable versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.document_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Block public access for private buckets
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.document_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable server-side encryption (SSE-S3)
resource "aws_s3_bucket_server_side_encryption_configuration" "documents" {
  bucket = aws_s3_bucket.document_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# IAM Role for EKS to access S3 bucket
resource "aws_iam_policy" "s3_bucket_access" {
  name        = "eks-s3-document-access"
  description = "Allow EKS pods to read/write to the document bucket"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ],
        Resource = "${aws_s3_bucket.document_bucket.arn}/*"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:ListBucket"
        ],
        Resource = aws_s3_bucket.document_bucket.arn
      }
    ]
  })
}

# Attach the policy to the EKS role
resource "aws_iam_role_policy_attachment" "s3_bucket_access" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = aws_iam_policy.s3_bucket_access.arn
}

# Output the S3 bucket name
output "s3_bucket_name" {
  value = aws_s3_bucket.document_bucket.bucket
}
