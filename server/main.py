from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import init_db
from app.api import auth, products, services, hero_banners, about, orders

# Ensure the physical path exists on your server
# If settings.UPLOAD_DIR is already "/server/assets", this works.
# Otherwise, you can explicitly set it here:
ASSETS_PATH = "/server/assets"
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

# Updated CORS Configuration
# It is vital that "https://technology-wave.com" is in your settings.ALLOWED_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
# We use "/uploads" as the URL path, but point it to the physical "/server/assets" folder
app.mount("/uploads", StaticFiles(directory=ASSETS_PATH), name="uploads")

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
    # Using 'main:app' assumes this file is named main.py
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)