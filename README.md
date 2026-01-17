#Sassify Backened

A **production-ready, multi-tenant SaaS backend** built with **NestJS**, **PostgreSQL**, and **Prisma**, following clean architecture principles.  
The project demonstrates authentication, authorization, pagination, validation, Dockerization, and CI/CD — designed to scale in real-world environments.


## Features

- JWT Authentication (Signup & Login)
- Role-Based Access Control (RBAC)
- Multi-Tenancy using Organizations
- Pagination, Filtering & Sorting
- Runtime Validation using Zod
- Swagger API Documentation
- Clean Architecture (Controller → Service → Repository)
- Dockerized Application & Database
- CI Pipeline with GitHub Actions

---

## Architecture Overview

The backend follows a **layered, scalable architecture**:
Controller → Service → Repository → Database
│ │ │
│ │ └─ Prisma ORM
│ └─ Business Logic
└─ HTTP / Validation / Guards


### Key Design Principles

- **Thin Controllers** – handle HTTP concerns only
- **Services** – contain business logic
- **Repositories** – handle data access
- **DTOs + Zod** – runtime-safe request validation
- **Guards & Decorators** – authentication and authorization

---

## Tech Stack

| Layer | Technology |
|-----|-----------|
| Backend Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Auth | JWT |
| API Docs | Swagger |
| Containerization | Docker & Docker Compose |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure


src/
├── auth/ # Authentication & authorization
├── users/ # Users module
├── organizations/ # Multi-tenancy support
├── common/ # Shared utilities (pagination, guards, pipes)
├── database/ # Prisma service & DB module
├── config/ # Configuration module
├── main.ts # App bootstrap
prisma/
├── schema.prisma # Database schema


## Getting Started (Docker – Recommended)

### 1️ Clone the repository
```bash
git clone https://github.com/your-username/saasify-backend.git
cd saasify-backend

cp .env.example .env

docker compose up --build




The API will be available at:

API → http://localhost:3000/api

Swagger Docs → http://localhost:3000/api/docs





API Documentation

Swagger UI is available at:

http://localhost:3000/api/docs


It includes:

Request & response schemas

Example payloads

JWT authentication support

Role-protected endpoints




Authentication Flow

User signs up → Organization is created

User logs in → Receives JWT access token

JWT is required for protected routes

Role-based guards enforce permissions




Pagination Example

Response format:

{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "role": "ADMIN",
      "organizationId": "uuid"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 57,
    "totalPages": 6
  }
}



CI/CD Pipeline

The project includes a GitHub Actions CI pipeline that runs on every push and pull request:

Install dependencies

TypeScript build

Docker image build

This ensures:

Type safety

Build reliability

Deployment readiness




Future Improvements

Refresh tokens

Rate limiting

Redis caching

Background jobs (BullMQ)

API versioning

AWS ECS deployment



 Author

Built by [Sampat]
Backend Engineer (NestJS, Node.js, PostgreSQL)
