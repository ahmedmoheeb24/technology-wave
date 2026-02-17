from fastapi import FastAPI
from mangum import Mangum
import sys
import os
import traceback

# Add parent directory to path to import app modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Try to import and initialize, but don't crash if it fails
try:
    from app.core.config import settings
    from app.core.database import init_db
    from app.api import auth, products, services, hero_banners, about, orders
    from fastapi.middleware.cors import CORSMiddleware
    
    # Create uploads directory if it doesn't exist (only if not in serverless)
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    except Exception as e:
        print(f"⚠️  Upload directory creation skipped: {e}")
        pass
    
    config_loaded = True
except Exception as e:
    print(f"❌ Error loading configuration: {e}")
    print(traceback.format_exc())
    config_loaded = False
    # Set minimal settings to allow app to start
    class MinimalSettings:
        APP_NAME = "Store Admin API"
        ALLOWED_ORIGINS = "*"
    settings = MinimalSettings()

app = FastAPI(
    title=settings.APP_NAME if hasattr(settings, 'APP_NAME') else "Store Admin API",
    version="1.0.0"
)

# CORS Configuration
if config_loaded:
    try:
        origins = settings.ALLOWED_ORIGINS.split(",") if hasattr(settings, 'ALLOWED_ORIGINS') else ["*"]
        app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    except Exception as e:
        print(f"⚠️  CORS configuration error: {e}")
        # Add permissive CORS as fallback
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
else:
    # Minimal CORS if config failed
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers only if config loaded successfully
if config_loaded:
    try:
        app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
        app.include_router(products.router, prefix="/api/products", tags=["Products"])
        app.include_router(services.router, prefix="/api/services", tags=["Services"])
        app.include_router(hero_banners.router, prefix="/api/hero-banners", tags=["Hero Banners"])
        app.include_router(about.router, prefix="/api/about", tags=["About"])
        app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
        print("✅ All routers loaded successfully")
    except Exception as e:
        print(f"⚠️  Error loading routers: {e}")
        print(traceback.format_exc())

@app.get("/")
async def root():
    return {
        "message": "Store Admin API",
        "version": "1.0.0",
        "docs": "/docs",
        "config_loaded": config_loaded,
        "environment": "vercel" if os.getenv("VERCEL") else "local"
    }

@app.get("/health")
async def health_check():
    health_status = {
        "status": "healthy" if config_loaded else "degraded",
        "config_loaded": config_loaded,
        "database_url_set": bool(os.getenv("DATABASE_URL")),
        "vercel_env": bool(os.getenv("VERCEL"))
    }
    return health_status

# Startup event - only run if config loaded
if config_loaded:
    @app.on_event("startup")
    async def startup_event():
        try:
            print("🚀 Starting database initialization...")
            await init_db()
            print("✅ Database initialized successfully")
        except Exception as e:
            print(f"⚠️  Database initialization error: {e}")
            print(traceback.format_exc())
            # Don't crash the app, let it start anyway
            pass

# Mangum handler for Vercel
# lifespan="off" prevents Vercel serverless issues with async context managers
handler = Mangum(app, lifespan="off")
