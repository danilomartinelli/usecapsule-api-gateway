# Data Plane (Rust)

High-performance request routing and processing engine for Capsule API Gateway.

## Architecture

The data plane is built with Rust for maximum performance and safety. It handles:

- HTTP/HTTPS/HTTP2 request routing
- Authentication and authorization
- Rate limiting
- Request/response transformation
- Plugin execution (WASM-based)
- Circuit breaking
- Metrics collection

## Key Dependencies

- **axum**: Modern web framework built on tokio and hyper
- **tower**: Middleware and service abstraction
- **sqlx**: Async PostgreSQL driver
- **redis**: Cache and rate limiting storage
- **reqwest**: HTTP client for proxying requests
- **wasmtime**: WASM runtime for plugins (optional)
- **governor**: Rate limiting implementation
- **opentelemetry**: Distributed tracing

## Running

```bash
# Development
cargo run

# Production build
cargo build --release
./target/release/data-plane

# With WASM plugin support
cargo run --features wasm-plugins
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Architecture Decisions

### Why Rust?

- Zero-cost abstractions for high performance
- Memory safety without garbage collection
- Excellent async/await support with Tokio
- Strong type system prevents common bugs
- Low resource usage

### Hot Path Optimization

- Route matching uses efficient trie-based data structures
- Plugin execution isolated via WASM for safety
- Connection pooling for upstream services
- Redis for distributed rate limiting state
