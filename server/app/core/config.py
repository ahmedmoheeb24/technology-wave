from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Store Admin API"
    DEBUG: bool = True
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database - Use /tmp for Vercel serverless (ephemeral)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "/tmp/store.db" if os.getenv("VERCEL") else "sqlite:///./store.db")
    
    # Format DATABASE_URL for SQLite if needed
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.DATABASE_URL.startswith(("sqlite://", "postgresql://", "mysql://")):
            # If it's just a file path, add sqlite:/// prefix
            self.DATABASE_URL = f"sqlite:///{self.DATABASE_URL}"
    
    # Admin User
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"
    
    # CORS - Support multiple origins for production and development
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001"
    
    # File Upload - Use /tmp for Vercel serverless
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "/tmp/uploads" if os.getenv("VERCEL") else "./uploads")
    MAX_FILE_SIZE: int = 5242880  # 5MB
    
    class Config:
        env_file = ".env"

settings = Settings()
