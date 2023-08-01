use axum::{
    routing::{get, post},
    http::StatusCode,
    response::IntoResponse,
    Json, Router,
};

//use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

pub mod chess;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    //let db = pg::initialize_pg().await.unwrap();
    let app = Router::new()
        .route("/board", post());
    // Enables logging. Use `RUST_LOG=tower_http=debug`
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}

async fn new_game() {
    println!("WHADDDUP!");
}

async fn board(){
    
}
