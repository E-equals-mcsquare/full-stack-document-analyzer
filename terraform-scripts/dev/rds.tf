# DB Subnet Group
resource "aws_db_subnet_group" "rds_subnet_group" {
  name = "rds-subnet-group"
  subnet_ids = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]

  tags = {
    Name = "rds-subnet-group"
  }
}

# RDS Security Group
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg"
  description = "Allow access to RDS from EKS"
  vpc_id      = aws_vpc.main.id

  # Allow access from EKS SG
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_cluster_sg.id]
    description     = "Allow Postgres from EKS Cluster"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

# Fetch the latest secret version
data "aws_secretsmanager_secret_version" "rds_creds" {
  secret_id = aws_secretsmanager_secret.rds_credentials.id
}

# Parse the secret values
locals {
  rds_secret = jsondecode(data.aws_secretsmanager_secret_version.rds_creds.secret_string)
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier             = "document-analyzer-postgres-db"
  engine                 = "postgres"
  instance_class         = "db.t3.medium"
  allocated_storage      = 20
  max_allocated_storage  = 100
  storage_type           = "gp2"
  username               = local.rds_secret.username
  password               = local.rds_secret.password
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false
  skip_final_snapshot    = true
  deletion_protection    = false

  tags = {
    Name = "document-analyzer-postgres-db"
  }
}

# Output the RDS endpoint
output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
