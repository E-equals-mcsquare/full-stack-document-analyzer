# Fetch EKS cluster info
data "aws_eks_cluster" "cluster" {
  name = aws_eks_cluster.k8s.name
}

# For CLI-based auth
data "aws_eks_cluster_auth" "cluster" {
  name = aws_eks_cluster.k8s.name
}

# Create OIDC provider 
resource "aws_iam_openid_connect_provider" "eks" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["9e99a48a9960b14926bb7f3b02e22da0ecd6c170"]
  url             = data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer
}

# IAM Role for IRSA
resource "aws_iam_role" "secrets_access_role" {
  name = "eks-secretsmanager-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Federated = aws_iam_openid_connect_provider.eks.arn
      },
      Action = "sts:AssumeRoleWithWebIdentity",
      Condition = {
        StringEquals = {
          "${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}:sub" = "system:serviceaccount:default:rds-secrets-sa"
        }
      }
    }]
  })
}

# Attach SecretsManager access
resource "aws_iam_role_policy_attachment" "secretsmanager_access" {
  role       = aws_iam_role.secrets_access_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

# Attach S3 access policy (defined elsewhere)
resource "aws_iam_role_policy_attachment" "irsa_s3_access" {
  role       = aws_iam_role.secrets_access_role.name
  policy_arn = aws_iam_policy.s3_bucket_access.arn
}

# Output
output "irsa_role_arn" {
  value = aws_iam_role.secrets_access_role.arn
}
