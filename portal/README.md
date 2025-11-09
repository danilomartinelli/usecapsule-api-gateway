# Portal (React + Vite)

Modern admin UI for managing Capsule API Gateway.

## Architecture

The portal is built with React, TypeScript, and Vite for a fast, modern development experience. It provides:

- Dashboard with key metrics
- Route management (CRUD operations)
- Service configuration
- Plugin marketplace and configuration
- Real-time analytics and monitoring
- Workspace and user management

## Key Dependencies

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **TanStack Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form validation
- **Recharts**: Data visualization
- **Radix UI**: Accessible UI components
- **Axios**: HTTP client

## Running

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The dev server runs on <http://localhost:3000> and proxies API requests to the control plane at <http://localhost:9000>.

## Project Structure

```text
src/
├── components/     # Reusable UI components
├── pages/          # Page components (routes)
├── lib/            # Utility functions
├── hooks/          # Custom React hooks
├── api/            # API client and endpoints
├── types/          # TypeScript type definitions
└── stores/         # Zustand state stores
```

## Features

### Dashboard

- Real-time metrics overview
- Request volume charts
- Latency monitoring
- Quick actions

### Route Management

- List all routes
- Create/edit/delete routes
- Configure route plugins
- Test routes

### Service Management

- Upstream service configuration
- Health check configuration
- Load balancing settings

### Plugin System

- Browse available plugins
- Install and configure plugins
- Per-route or global plugins
- Custom plugin upload (WASM)

### Analytics

- Request volume over time
- Latency percentiles
- Error rates by route
- Geographic distribution

## Architecture Decisions

### Why React + Vite?

- Fast development with HMR
- Modern build tooling
- Excellent TypeScript support
- Large ecosystem

### State Management

- TanStack Query for server state (caching, refetching)
- Zustand for client state (UI state, user preferences)
- Separation of concerns

### Styling

- TailwindCSS for rapid development
- Radix UI for accessible components
- Custom design system with CSS variables
