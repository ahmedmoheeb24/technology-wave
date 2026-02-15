from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    SECRET_KEY: str
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    UPLOAD_DIR: str = "uploads"
    CORS_ORIGINS: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

settings = Settings()

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/hero", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/about", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/services", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/shop", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/news", exist_ok=True)
