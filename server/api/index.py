import os
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

def create_app():
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    
    from app.core.config import settings
    from app.core.database import init_db
    from app.api import auth, products, services, hero_banners, about, orders
    
    # Create uploads directory if it doesn't exist
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    except Exception:
        pass  # Ignore errors in serverless environment
    
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0"
    )
    
    @app.on_event("startup")
    async def startup_event():
        """Initialize database on startup"""
        await init_db()
    
    # CORS Configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS.split(","),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Note: StaticFiles mounting is removed for Vercel serverless compatibility
    # For production file uploads, consider using external storage (S3, Cloudinary, etc.)
    
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
    
    return app

# Create app instance
app = create_app()

# Vercel serverless function handler using Mangum
from mangum import Mangum
handler = Mangum(app, lifespan="off")
