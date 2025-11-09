DROP TRIGGER IF EXISTS update_plugins_updated_at ON plugins;
DROP TRIGGER IF EXISTS update_routes_updated_at ON routes;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_workspaces_updated_at ON workspaces;

DROP FUNCTION IF EXISTS update_updated_at_column();

DROP INDEX IF EXISTS idx_plugins_workspace;
DROP INDEX IF EXISTS idx_plugins_service;
DROP INDEX IF EXISTS idx_plugins_route;
DROP INDEX IF EXISTS idx_services_workspace;
DROP INDEX IF EXISTS idx_routes_path;
DROP INDEX IF EXISTS idx_routes_service;
DROP INDEX IF EXISTS idx_routes_workspace;

DROP TABLE IF EXISTS plugins;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS workspaces;
