from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import init_db
from app.api import auth, products, services, hero_banners, about, orders

# Define physical paths on the server
# Path: /var/www/fastapi-app/technology-wave/server/
script_dir = os.path.dirname(os.path.abspath(__file__))

# Assets folder for the Incorporation Certificate and other static files
ASSETS_PATH = os.path.join(script_dir, "assets")
os.makedirs(ASSETS_PATH, exist_ok=True)

# Uploads folder for product and service images
UPLOADS_PATH = os.path.join(script_dir, "uploads")
os.makedirs(UPLOADS_PATH, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database connection
    await init_db()
    yield
    # Shutdown: Clean up resources if necessary
    pass

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
# Ensure settings.ALLOWED_ORIGINS includes your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- STATIC FILE MOUNTING ---

# 1. Mount /assets for the Download Button
# Frontend URL: /assets/certificate.pdf
app.mount("/assets", StaticFiles(directory=ASSETS_PATH), name="assets")

# 2. Mount /uploads for dynamic content (images, etc.)
# Frontend URL: /uploads/image-name.jpg
app.mount("/uploads", StaticFiles(directory=UPLOADS_PATH), name="uploads")

# --- API ROUTERS ---

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(services.router, prefix="/api/services", tags=["Services"])
app.include_router(hero_banners.router, prefix="/api/hero-banners", tags=["Hero Banners"])
app.include_router(about.router, prefix="/api/about", tags=["About"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])

@app.get("/")
async def root():
    return {
        "message": "Technology Wave API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    # Using 'main:app' assumes this file is named main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)