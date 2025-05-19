# RAG-Based Document Q&A Platform

This project is a complete full-stack implementation of a **RAG (Retrieval Augmented Generation)**-based document question-answering system. It allows users to upload documents, perform semantic search over embeddings, and query those documents through a natural language interface.

---

## Tech Stack

### Backend Services

- **Node.js + Express** for User/Auth/Document management
- **Python + FastAPI** for Ingestion and RAG-based Q&A
- **PostgreSQL** (Docker-based) for structured storage
- **Amazon S3** for document storage
- **LangChain + OpenAI** for embedding and Q&A logic

### Frontend

- **Next.js (with SCSS)**
- Auth + Upload + QA interface with minimal UI components

### Infrastructure

- **Terraform** for provisioning AWS resources:
  - VPC, EKS Cluster, RDS PostgreSQL, IAM, S3, ECR
- **EKS** for orchestrating microservices
- **Helm** for managing Kubernetes deployments
- **GitHub Actions** with **OIDC** for secure CI/CD

---

## Features

- JWT-based auth with role-based access (admin, editor, viewer)
- Secure document uploads (Multer → Python → S3)
- Embedding stored in PostgreSQL (no vector DB used)
- User-selectable document ingestion
- RAG-powered answers with OpenAI API

---

## Project Structure

```
- user-document-service   (Node.js backend)
- rag-service             (FastAPI backend)
- frontend                (Next.js frontend)
- helm/                   (Helm umbrella chart)
- terraform/              (Infrastructure as Code)
- .github/workflows/      (GitHub Actions CI/CD)
```

---

## Design Patterns & Architecture

### SOLID Principles

- **S**ingle Responsibility: Controllers vs Services in both Node and Python
- **O**pen/Closed: Strategy pattern used in FastAPI for pluggable embedders
- **L**iskov: Interface-based contracts for document processing
- **I**nterface Segregation: Python uses base interface `BaseEmbedder`
- **D**ependency Inversion: Services in Node inject models/interfaces

### Additional Design Patterns

- **Repository Pattern** used in `document.service.ts` and `user.service.ts`
- **Strategy Pattern** in FastAPI embedding architecture
- **Middleware Pattern** for role-based access control in Express

---

## CI/CD

Each service is deployed via GitHub Actions:

- Authenticated to AWS using **OIDC + IAM Role**
- Pushed to **Amazon ECR**
- Deployed to EKS using **Helm upgrade --install**

Workflows:

- `.github/workflows/user-document-service.yml`
- `.github/workflows/rag-service.yml`
- `.github/workflows/frontend.yml`

---

## 🛠 Deployment Commands

```bash
# Initial infra setup
cd terraform && terraform init && terraform apply

# Docker image builds
./deploy.sh  # Automates build → push → helm

# View services
kubectl get all -n rag-app
```

---

## URLs (via Ingress)

```
- Frontend:       http://rag.local/
- Backend API:    http://rag.local/api
- RAG API:        http://rag.local/rag
```

> Ensure DNS or /etc/hosts is mapped for `rag.local`

---

## Author

**Souvik Majumder**

---
