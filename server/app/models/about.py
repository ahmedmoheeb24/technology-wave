from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class About(Base):
    __tablename__ = "about"
    
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String)  # Store file path
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
