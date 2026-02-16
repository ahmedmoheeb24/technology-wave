# Minimal Vercel handler for FastAPI
# Imports are deferred to avoid Vercel runtime conflicts

def create_app():
    """Create and configure the FastAPI application"""
    import sys
    import os
    
    # Add parent directory to path
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Set environment defaults
    os.environ.setdefault("DATABASE_URL", "sqlite:////tmp/store.db")
    
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from app.core.config import settings
    from app.core.database import init_db
    from app.api import auth, products, services, hero_banners, about, orders
    
    # Create uploads directory
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    except Exception:
        pass
    
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0"
    )
    
    @app.on_event("startup")
    async def startup_event():
        await init_db()
    
    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS.split(",") if settings.ALLOWED_ORIGINS else ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
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

# Lazy-load app and handler to avoid import-time issues
_app = None
_handler = None

def get_handler():
    """Lazy initialization of the handler"""
    global _app, _handler
    if _handler is None:
        _app = create_app()
        from mangum import Mangum
        _handler = Mangum(_app, lifespan="off")
    return _handler

# For Vercel, we need a callable or the handler instance
# Try exposing both approaches
app = lambda: get_handler()
handler = lambda *args, **kwargs: get_handler()(*args, **kwargs)
