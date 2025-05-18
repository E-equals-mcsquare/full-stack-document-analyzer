resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"] # GitHub's SHA-1 thumbprint
}


data "aws_iam_policy_document" "github_oidc_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:E-equals-mcsquare/full-stack-document-analyzer:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_oidc_deploy_role" {
  name               = "github-actions-deploy-role"
  assume_role_policy = data.aws_iam_policy_document.github_oidc_assume.json
}


resource "aws_iam_role_policy" "github_oidc_deploy_role_policy" {
  name = "github-actions-deploy-role-policy"
  role = aws_iam_role.github_oidc_deploy_role.id

  policy = data.aws_iam_policy_document.github_oidc_permissions.json
}

data "aws_iam_policy_document" "github_oidc_permissions" {
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:ListObjectsV2",
      "s3:DeleteObject"
    ]
    resources = [
      aws_s3_bucket.document_bucket.arn
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }
}


