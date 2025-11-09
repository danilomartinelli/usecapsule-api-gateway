# Capsule API Gateway

A modern API Gateway Platform-as-a-Service (PaaS) built with a high-performance architecture.

## Architecture

- **Data Plane (Rust)**: High-performance request routing, rate limiting, authentication, and plugin execution
- **Control Plane (Go)**: API management, configuration, analytics, and admin operations
- **Portal (React + Vite)**: Modern admin UI for gateway configuration and monitoring

## Project Structure

```text
usecapsule-api-gateway/
├── data-plane/          # Rust - High-performance request handling
├── control-plane/       # Go - Management and configuration API
├── portal/              # React + Vite - Admin UI
├── shared/              # Shared schemas, protobuf definitions
├── deployment/          # Kubernetes, Helm charts, Terraform
├── docs/                # Documentation
└── docker-compose.yml   # Local development setup
```

## Quick Start

### Prerequisites

- Rust 1.75+
- Go 1.21+
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Development Setup

```bash
# Start infrastructure services
docker-compose up -d postgres redis

# Run data plane
cd data-plane
cargo run

# Run control plane
cd control-plane
go run cmd/server/main.go

# Run portal
cd portal
npm install
npm run dev
```

## Features (Planned)

### Core Gateway Features

- [x] HTTP/HTTPS/HTTP2 routing
- [ ] Dynamic route configuration
- [ ] Load balancing (round-robin, least-conn, consistent hashing)
- [ ] Rate limiting (per-route, per-client)
- [ ] Authentication (JWT, API Keys, OAuth2)
- [ ] Request/Response transformation
- [ ] Circuit breaker
- [ ] Health checks

### Plugin System

- [ ] Custom plugin support (Rust + WASM)
- [ ] Plugin marketplace
- [ ] Hot reload plugins

### Observability

- [ ] Distributed tracing (OpenTelemetry)
- [ ] Metrics (Prometheus)
- [ ] Logging (structured JSON)
- [ ] Real-time analytics dashboard

### Multi-tenancy

- [ ] Organization/workspace support
- [ ] RBAC (Role-Based Access Control)
- [ ] API key management per tenant

## License

MIT
