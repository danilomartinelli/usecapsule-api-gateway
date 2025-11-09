use axum::http::StatusCode;

pub async fn metrics() -> (StatusCode, String) {
    // TODO: Implement Prometheus metrics collection
    (StatusCode::OK, "# Metrics endpoint\n".to_string())
}
