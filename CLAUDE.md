# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Capsule is an API Gateway Platform-as-a-Service (PaaS) built with a three-tier architecture:

- **Data Plane (Rust)** - Port 8000: High-performance request routing, proxying, rate limiting, authentication, and plugin execution
- **Control Plane (Go)** - Port 9000: Management API for configuring routes, services, plugins, and analytics
- **Portal (React + Vite)** - Port 3000: Admin UI for gateway configuration and monitoring

## Development Commands

### Infrastructure Setup

```bash
# Start required services (PostgreSQL, Redis, Prometheus, Jaeger)
docker-compose up -d postgres redis

# Stop infrastructure
docker-compose down

# Include observability stack
docker-compose up -d
```

### Data Plane (Rust)

```bash
cd data-plane

# Run in development
cargo run

# Build for production
cargo build --release

# Run with WASM plugin support
cargo run --features wasm-plugins

# Run tests
cargo test

# Configuration
cp .env.example .env
# Edit .env with: DATA_PLANE_PORT, DATABASE_URL, REDIS_URL, CONTROL_PLANE_URL
```

### Control Plane (Go)

```bash
cd control-plane

# Install dependencies
make deps

# Run database migrations
make migrate-up

# Rollback migrations
make migrate-down

# Create new migration
make migrate-create name=your_migration_name

# Run in development
make run

# Build binary
make build

# Run tests
make test

# Lint code
make lint

# Configuration
cp .env.example .env
# Edit .env with: CONTROL_PLANE_PORT, DATABASE_URL, REDIS_URL, JWT_SECRET
```

### Portal (React + Vite)

```bash
cd portal

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Configuration
cp .env.example .env
# Edit .env with: VITE_API_URL
```

## Architecture

### Data Flow

1. **Request Path**: Client → Data Plane (port 8000) → Upstream Service
2. **Configuration Path**: Portal (port 3000) → Control Plane (port 9000) → PostgreSQL
3. **Sync Path**: Control Plane → Redis → Data Plane (polls for config updates)

### Data Plane Architecture

- **Framework**: Axum (built on Tokio and Hyper)
- **Entry point**: `data-plane/src/main.rs` - Axum router with fallback to `proxy_handler`
- **Module structure**:
  - `handlers/` - HTTP handlers (health, metrics, proxy)
  - `middleware/` - Auth, rate limiting, CORS, circuit breaker
  - `plugins/` - WASM-based plugin system (optional feature)
  - `config.rs` - Environment-based configuration loading
  - `metrics/` - Prometheus metrics collection

**Critical**: Data plane uses Redis for distributed rate limiting state and to poll configuration changes. Route matching should use trie-based data structures for performance.

### Control Plane Architecture

- **Framework**: Gin (Go web framework)
- **Entry point**: `control-plane/cmd/server/main.go`
- **Module structure**:
  - `internal/models/` - Data models (Route, Service, Plugin, Workspace)
  - `internal/api/` - HTTP handlers and routes
  - `internal/db/` - Database access layer
  - `internal/services/` - Business logic
  - `migrations/` - SQL migrations using golang-migrate

**Critical**: All configuration changes must be pushed to Redis pub/sub for data plane to consume. Database schema uses workspace-based multi-tenancy with cascade deletes.

### Database Schema

Core entities with relationships:

- **Workspaces** (1) → (N) **Services** → (N) **Routes**
- **Plugins** can attach to Routes, Services, or be Global
- All tables include `workspace_id` for multi-tenancy
- Automatic `updated_at` timestamp via PostgreSQL triggers

### Portal Architecture

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router with layout wrapper
- **State Management**:
  - TanStack Query for server state (API data)
  - Zustand for client state (UI preferences)
- **API Client**: Axios with interceptors in `src/api/client.ts`
- **Key pages**: Dashboard, Routes, Services, Plugins, Analytics
- **UI Components**: Radix UI primitives + TailwindCSS

**Critical**: Portal proxies `/api` requests to control plane (port 9000) via Vite dev server. All API calls use `/api/v1` prefix.

## Key Concepts

### Multi-tenancy

All entities are scoped to `workspace_id`. Every API operation must validate workspace ownership.

### Configuration Sync

Control plane writes configuration to both PostgreSQL (source of truth) and Redis (fast access for data plane). Data plane polls Redis every N seconds for updates and uses Redis pub/sub for immediate notification.

### Plugin System

Plugins execute in priority order (lower number = higher priority). They can be:

- **Global**: Apply to all routes
- **Service-scoped**: Apply to all routes of a service
- **Route-scoped**: Apply to specific route

Data plane loads plugins as WASM modules when `wasm-plugins` feature is enabled.

### Request Processing Flow (Data Plane)

1. Receive request at fallback handler
2. Match route from cached config (from Redis/DB)
3. Execute middleware chain (auth, rate limit, CORS)
4. Execute plugins in priority order
5. Proxy to upstream service (from Service config)
6. Apply response transformations
7. Return response
8. Record metrics

## Environment Variables

### Required for Local Development

```bash
# Data Plane
DATA_PLANE_PORT=8000
DATABASE_URL=postgres://capsule:capsule_dev@localhost:5432/capsule_gateway
REDIS_URL=redis://localhost:6379
CONTROL_PLANE_URL=http://localhost:9000

# Control Plane
CONTROL_PLANE_PORT=9000
DATABASE_URL=postgres://capsule:capsule_dev@localhost:5432/capsule_gateway?sslmode=disable
REDIS_URL=localhost:6379
JWT_SECRET=your-secret-key-change-in-production

# Portal
VITE_API_URL=http://localhost:9000
```

## Common Workflows

### Adding a New Route (via Control Plane API)

1. Create or reference existing Service (upstream target)
2. POST to `/api/v1/routes` with: name, path, methods, service_id
3. Control plane saves to PostgreSQL and pushes to Redis
4. Data plane polls Redis and updates routing table

### Creating a New Migration

```bash
cd control-plane
make migrate-create name=add_column_to_routes
# Edit files in migrations/
make migrate-up
```

### Adding a New Plugin Type

1. Define plugin type in `control-plane/internal/models/route.go`
2. Implement plugin logic in `data-plane/src/plugins/`
3. Register plugin in data plane's plugin registry
4. Add UI configuration in Portal

## Testing Strategy

- **Data Plane**: Unit tests with `cargo test`, integration tests with mockito
- **Control Plane**: Unit tests with `go test`, use testify for assertions
- **Portal**: Component tests (to be added)
- **E2E**: Manual testing via Portal or API clients

## Performance Considerations

- Data plane optimizes for low latency on hot path (route matching, proxying)
- Use connection pooling for upstream services (reqwest in Rust)
- Redis caching reduces database load for route lookups
- Metrics collection should not block request processing
- Plugin execution isolated via WASM for safety and performance

## Task Master AI Instructions

**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
