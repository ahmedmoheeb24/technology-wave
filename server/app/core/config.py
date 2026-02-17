from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Store Admin API"
    DEBUG: bool = True
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production-min-32-chars-long!")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database - PostgreSQL (Neon) for production, SQLite for local development
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:////tmp/store.db" if os.getenv("VERCEL") else "sqlite:///./store.db"
    )
    
    # Format DATABASE_URL if needed
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Handle various DATABASE_URL formats
        if self.DATABASE_URL and not self.DATABASE_URL.startswith(("sqlite://", "postgresql://", "mysql://", "postgres://")):
            # If it's just a file path, add sqlite:/// prefix
            self.DATABASE_URL = f"sqlite:///{self.DATABASE_URL}"
        
        # Convert postgres:// to postgresql:// for SQLAlchemy compatibility
        if self.DATABASE_URL and self.DATABASE_URL.startswith("postgres://"):
            self.DATABASE_URL = self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Admin User
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "admin123")
    
    # CORS - Support multiple origins for production and development
    ALLOWED_ORIGINS: str = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://localhost:3001,https://technologywave.vercel.app"
    )
    
    # File Upload - Use /tmp for Vercel serverless
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "/tmp/uploads" if os.getenv("VERCEL") else "./uploads")
    MAX_FILE_SIZE: int = 5242880  # 5MB
    
    class Config:
        env_file = ".env"

settings = Settings()
