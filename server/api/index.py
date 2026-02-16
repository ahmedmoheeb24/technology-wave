"""
Vercel serverless handler for FastAPI application.
This handler uses delayed imports to avoid Vercel runtime scanning issues.
"""

# Absolute minimal imports at module level
import sys
import os

# Setup paths
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DATABASE_URL", "sqlite:////tmp/store.db")

# Create the app at module level but with delayed imports inside
def _create_application():
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from app.core.config import settings
    from app.core.database import init_db
    from app.api import auth, products, services, hero_banners, about, orders
    
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    except:
        pass
    
    application = FastAPI(title=settings.APP_NAME, version="1.0.0")
    
    @application.on_event("startup")
    async def startup():
        await init_db()
    
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS.split(",") if settings.ALLOWED_ORIGINS else ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    application.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
    application.include_router(products.router, prefix="/api/products", tags=["Products"])
    application.include_router(services.router, prefix="/api/services", tags=["Services"])
    application.include_router(hero_banners.router, prefix="/api/hero-banners", tags=["Hero Banners"])
    application.include_router(about.router, prefix="/api/about", tags=["About"])
    application.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
    
    @application.get("/")
    async def root():
        return {"message": "Store Admin API", "version": "1.0.0", "docs": "/docs"}
    
    @application.get("/health")
    async def health():
        return {"status": "healthy"}
    
    return application

# Initialize app
app = _create_application()

# Wrap with Mangum for Vercel
from mangum import Mangum
handler = Mangum(app, lifespan="off")
