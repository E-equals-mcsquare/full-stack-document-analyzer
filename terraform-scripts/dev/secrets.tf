# Create a secret in AWS Secrets Manager
resource "aws_secretsmanager_secret" "rds_credentials" {
  name        = "rds/postgres/credentials"
  description = "Credentials for RDS PostgreSQL DB"

  tags = {
    Name = "rds-postgres-secret"
  }
}

# Define the secret value (username & password)
resource "aws_secretsmanager_secret_version" "rds_credentials_version" {
  secret_id = aws_secretsmanager_secret.rds_credentials.id
  secret_string = jsonencode({
    username = "dbadmin"
    password = "strongpassword123"
  })
}

# Output the secret name
output "secrets_manager_secret_name" {
  value = aws_secretsmanager_secret.rds_credentials.name
}
