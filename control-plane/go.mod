module github.com/usecapsule/api-gateway/control-plane

go 1.21

require (
	// Web framework
	github.com/gin-gonic/gin v1.10.0

	// Database
	github.com/jackc/pgx/v5 v5.5.1
	github.com/jmoiron/sqlx v1.3.5

	// Migrations
	github.com/golang-migrate/migrate/v4 v4.17.0

	// Redis
	github.com/redis/go-redis/v9 v9.4.0

	// Configuration
	github.com/spf13/viper v1.18.2

	// Validation
	github.com/go-playground/validator/v10 v10.18.0

	// Authentication
	github.com/golang-jwt/jwt/v5 v5.2.0
	golang.org/x/crypto v0.18.0

	// Observability
	go.uber.org/zap v1.26.0
	github.com/prometheus/client_golang v1.18.0
	go.opentelemetry.io/otel v1.22.0
	go.opentelemetry.io/otel/trace v1.22.0
	go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc v1.22.0

	// Utilities
	github.com/google/uuid v1.5.0

	// Testing
	github.com/stretchr/testify v1.8.4
)
