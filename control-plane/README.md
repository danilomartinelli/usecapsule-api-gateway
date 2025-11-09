# Control Plane (Go)

Management API and configuration service for Capsule API Gateway.

## Architecture

The control plane is built with Go for excellent concurrency support and ease of development. It handles:

- Gateway configuration management
- Route and service CRUD operations
- Plugin configuration
- User and workspace management
- Analytics and reporting
- API key management
- Real-time configuration sync to data plane

## Key Dependencies

- **gin**: Fast HTTP web framework
- **sqlx**: SQL toolkit with PostgreSQL driver
- **go-redis**: Redis client for caching
- **golang-migrate**: Database migrations
- **zap**: Structured logging
- **viper**: Configuration management
- **prometheus**: Metrics collection

## Running

```bash
# Install dependencies
make deps

# Run migrations
make migrate-up

# Development
make run

# Production build
make build
./bin/control-plane
```

## API Endpoints

### Routes

- `GET /api/v1/routes` - List all routes
- `POST /api/v1/routes` - Create a route
- `GET /api/v1/routes/:id` - Get route details
- `PUT /api/v1/routes/:id` - Update route
- `DELETE /api/v1/routes/:id` - Delete route

### Services

- `GET /api/v1/services` - List all services
- `POST /api/v1/services` - Create a service
- `GET /api/v1/services/:id` - Get service details
- `PUT /api/v1/services/:id` - Update service
- `DELETE /api/v1/services/:id` - Delete service

### Plugins

- `GET /api/v1/plugins` - List available plugins
- `POST /api/v1/plugins` - Configure plugin
- `GET /api/v1/plugins/:id` - Get plugin config
- `PUT /api/v1/plugins/:id` - Update plugin
- `DELETE /api/v1/plugins/:id` - Remove plugin

### Analytics

- `GET /api/v1/analytics/requests` - Request metrics
- `GET /api/v1/analytics/latency` - Latency metrics
- `GET /api/v1/analytics/errors` - Error rates

## Database Migrations

```bash
# Create new migration
make migrate-create name=create_routes_table

# Apply migrations
make migrate-up

# Rollback migrations
make migrate-down
```

## Architecture Decisions

### Why Go?

- Excellent standard library for HTTP and networking
- Fast compilation and execution
- Built-in concurrency with goroutines
- Strong ecosystem for web services
- Easy to deploy (single binary)

### Communication with Data Plane

- Configuration pushed to Redis for data plane to consume
- Data plane polls Redis for route/plugin updates
- Real-time sync using Redis pub/sub
- Fallback to database if Redis unavailable
