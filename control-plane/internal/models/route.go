package models

import (
	"time"

	"github.com/google/uuid"
)

type Route struct {
	ID          uuid.UUID         `json:"id" db:"id"`
	Name        string            `json:"name" db:"name" validate:"required"`
	Path        string            `json:"path" db:"path" validate:"required"`
	Methods     []string          `json:"methods" db:"methods"`
	ServiceID   uuid.UUID         `json:"service_id" db:"service_id"`
	Plugins     []string          `json:"plugins" db:"plugins"`
	Enabled     bool              `json:"enabled" db:"enabled"`
	Metadata    map[string]string `json:"metadata" db:"metadata"`
	CreatedAt   time.Time         `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at" db:"updated_at"`
	WorkspaceID uuid.UUID         `json:"workspace_id" db:"workspace_id"`
}

type Service struct {
	ID             uuid.UUID         `json:"id" db:"id"`
	Name           string            `json:"name" db:"name" validate:"required"`
	Protocol       string            `json:"protocol" db:"protocol"` // http, https, grpc
	Host           string            `json:"host" db:"host" validate:"required"`
	Port           int               `json:"port" db:"port" validate:"required,min=1,max=65535"`
	Path           string            `json:"path" db:"path"`
	Retries        int               `json:"retries" db:"retries"`
	ConnectTimeout int               `json:"connect_timeout" db:"connect_timeout"` // milliseconds
	WriteTimeout   int               `json:"write_timeout" db:"write_timeout"`
	ReadTimeout    int               `json:"read_timeout" db:"read_timeout"`
	Enabled        bool              `json:"enabled" db:"enabled"`
	Metadata       map[string]string `json:"metadata" db:"metadata"`
	CreatedAt      time.Time         `json:"created_at" db:"created_at"`
	UpdatedAt      time.Time         `json:"updated_at" db:"updated_at"`
	WorkspaceID    uuid.UUID         `json:"workspace_id" db:"workspace_id"`
}

type Plugin struct {
	ID          uuid.UUID         `json:"id" db:"id"`
	Name        string            `json:"name" db:"name" validate:"required"`
	Type        string            `json:"type" db:"type"` // auth, rate-limit, transform, etc.
	Config      map[string]any    `json:"config" db:"config"`
	Enabled     bool              `json:"enabled" db:"enabled"`
	Priority    int               `json:"priority" db:"priority"` // Execution order
	RouteID     *uuid.UUID        `json:"route_id,omitempty" db:"route_id"`
	ServiceID   *uuid.UUID        `json:"service_id,omitempty" db:"service_id"`
	Global      bool              `json:"global" db:"global"` // Apply to all routes
	CreatedAt   time.Time         `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at" db:"updated_at"`
	WorkspaceID uuid.UUID         `json:"workspace_id" db:"workspace_id"`
}

type Workspace struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Name      string    `json:"name" db:"name" validate:"required"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}
