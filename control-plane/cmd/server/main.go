package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func main() {
	// Initialize logger
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	logger.Info("Starting Capsule API Gateway - Control Plane")

	// Load configuration
	// cfg := config.Load()

	// Initialize database
	// db := database.Connect(cfg.DatabaseURL)

	// Initialize Redis
	// rdb := redis.NewClient(&redis.Options{Addr: cfg.RedisURL})

	// Setup router
	router := gin.Default()

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "control-plane",
			"version": "0.1.0",
		})
	})

	// API routes
	v1 := router.Group("/api/v1")
	{
		// Routes management
		v1.GET("/routes", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"routes": []string{}})
		})
		v1.POST("/routes", func(c *gin.Context) {
			c.JSON(http.StatusCreated, gin.H{"message": "Route created"})
		})
		v1.GET("/routes/:id", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"id": c.Param("id")})
		})
		v1.PUT("/routes/:id", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "Route updated"})
		})
		v1.DELETE("/routes/:id", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "Route deleted"})
		})

		// Services/Upstreams
		v1.GET("/services", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"services": []string{}})
		})
		v1.POST("/services", func(c *gin.Context) {
			c.JSON(http.StatusCreated, gin.H{"message": "Service created"})
		})

		// Plugins
		v1.GET("/plugins", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"plugins": []string{}})
		})

		// Analytics
		v1.GET("/analytics/requests", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"total_requests": 0})
		})
	}

	// Metrics endpoint
	router.GET("/metrics", func(c *gin.Context) {
		c.String(http.StatusOK, "# Metrics\n")
	})

	// Create server
	port := os.Getenv("CONTROL_PLANE_PORT")
	if port == "" {
		port = "9000"
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: router,
	}

	// Start server in goroutine
	go func() {
		logger.Info("Control plane listening", zap.String("port", port))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("Server forced to shutdown", zap.Error(err))
	}

	logger.Info("Server exited")
}
