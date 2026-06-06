# 🚀 PolyShop - Microservices CI/CD Project

## 📌 Project Overview

PolyShop is a cloud-native microservices application built to demonstrate modern DevOps practices including containerization, continuous integration, continuous deployment, service orchestration, and infrastructure automation.

The application consists of multiple independent services developed using different programming languages and deployed using Docker containers.

---

## 🏗️ Architecture

PolyShop follows a microservices architecture:

```text
User
  │
  ▼
Node.js Gateway Service
  │
  ├── Java Product Service
  ├── Python Recommendation Service
  ├── Go Inventory Service
  ├── PHP Billing Service
  └── MySQL Database
```

---

## 🛠 Technology Stack

| Component              | Technology         |
| ---------------------- | ------------------ |
| API Gateway            | Node.js            |
| Product Service        | Spring Boot (Java) |
| Recommendation Service | Python Flask       |
| Inventory Service      | Go                 |
| Billing Service        | PHP                |
| Database               | MySQL              |
| Containerization       | Docker             |
| Orchestration          | Docker Compose     |
| CI/CD                  | Jenkins            |
| Source Control         | Git & GitHub       |

---

## 📦 Microservices

### Node.js Gateway

* Central API Gateway
* Routes requests to backend services
* Handles authentication
* Integrates all services

### Java Product Service

* Product catalog management
* Product details API
* Category-based products

### Python Recommendation Service

* Product recommendation engine
* Cross-selling suggestions

### Go Inventory Service

* Stock management
* Warehouse information
* Inventory availability

### PHP Billing Service

* Tax calculation
* Shipping calculation
* Dynamic discounts
* Total order cost calculation

### MySQL Database

* User accounts
* Orders
* Delivery addresses
* Authentication data

---

## 🐳 Docker Containerization

Each service runs in an isolated Docker container.

### Services

```yaml
node-service
java-service
python-service
go-service
php-service
mysql-db
```

### Build Containers

```bash
docker compose build
```

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

---

## ⚙️ Jenkins CI/CD Pipeline

The Jenkins pipeline automates the complete deployment workflow.

### Pipeline Stages

#### 1. Checkout

```bash
git clone repository
```

#### 2. Validate Docker Compose

```bash
docker compose config
```

#### 3. Build Images

```bash
docker compose build
```

#### 4. Deploy Services

```bash
docker compose up -d
```

#### 5. Health Checks

```bash
curl http://localhost:3000/api/products
curl http://localhost:8080/products
curl http://localhost:5000/recommend/1
curl http://localhost:8081/inventory/1
curl http://localhost:8082
```

#### 6. Verify Containers

```bash
docker compose ps
```

---

## 🔄 CI/CD Workflow

```text
Developer Push
      │
      ▼
GitHub Repository
      │
      ▼
Jenkins Pipeline
      │
      ├── Checkout Source Code
      ├── Validate Compose File
      ├── Build Docker Images
      ├── Deploy Containers
      ├── Run Health Checks
      └── Verify Services
      │
      ▼
Production Environment
```

---

## 🔍 Deployment Verification

Verify all services are running:

```bash
docker ps
```

Expected containers:

```text
node-service
java-service
python-service
go-service
php-service
mysql-db
```

---

## 📈 DevOps Practices Demonstrated

* Microservices Architecture
* API Gateway Pattern
* Docker Containerization
* Docker Compose Orchestration
* Continuous Integration
* Continuous Deployment
* Automated Health Checks
* Infrastructure as Code
* Service Isolation
* Multi-language Service Management
* Jenkins Pipeline Automation

---

## 🚀 Future Enhancements

* Kubernetes Deployment
* Helm Charts
* Prometheus Monitoring
* Grafana Dashboards
* ELK Stack Logging
* SonarQube Code Quality
* GitHub Actions Integration
* AWS Deployment
* Terraform Infrastructure
* ArgoCD GitOps Workflow

---

## 👨‍💻 Author

**Sakthivelan**

DevOps Enthusiast | Cloud Learner | Open Source Contributor

Built as a hands-on DevOps project to demonstrate CI/CD automation, Docker containerization, and microservices deployment using Jenkins.
