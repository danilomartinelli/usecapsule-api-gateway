use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
    pub port: u16,
    pub database_url: String,
    pub redis_url: String,
    pub log_level: String,
    pub control_plane_url: String,
}

impl Config {
    pub fn load() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();

        let config = Self {
            port: std::env::var("DATA_PLANE_PORT")
                .unwrap_or_else(|_| "8000".to_string())
                .parse()?,
            database_url: std::env::var("DATABASE_URL")
                .unwrap_or_else(|_| "postgres://capsule:capsule_dev@localhost/capsule_gateway".to_string()),
            redis_url: std::env::var("REDIS_URL")
                .unwrap_or_else(|_| "redis://localhost:6379".to_string()),
            log_level: std::env::var("LOG_LEVEL")
                .unwrap_or_else(|_| "info".to_string()),
            control_plane_url: std::env::var("CONTROL_PLANE_URL")
                .unwrap_or_else(|_| "http://localhost:9000".to_string()),
        };

        Ok(config)
    }
}
