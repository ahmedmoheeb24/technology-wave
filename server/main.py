from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import init_db
from app.api import auth, products, services, hero_banners, about, orders

# Define the physical path where your PDF and assets live
# Based on your server structure: /var/www/fastapi-app/technology-wave/server/assets
script_dir = os.path.dirname(os.path.abspath(__file__))
ASSETS_PATH = os.path.join(script_dir, "assets")

# Ensure the directory exists
os.makedirs(ASSETS_PATH, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown
    pass

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Mount /assets for the Download Button
# This matches the frontend link: /assets/Certificate of Incorporation...
app.mount("/assets", StaticFiles(directory=ASSETS_PATH), name="assets")

# 2. Keep /uploads if your product images or other files use that prefix
# Pointing to the 'uploads' folder seen in your directory listing
UPLOADS_PATH = os.path.join(script_dir, "uploads")
os.makedirs(UPLOADS_PATH, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOADS_PATH), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(services.router, prefix="/api/services", tags=["Services"])
app.include_router(hero_banners.router, prefix="/api/hero-banners", tags=["Hero Banners"])
app.include_router(about.router, prefix="/api/about", tags=["About"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])

@app.get("/")
async def root():
    return {
        "message": "Store Admin API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)