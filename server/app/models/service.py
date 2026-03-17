from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.core.database import Base

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)  # Short description for cards
    detailed_description = Column(Text, nullable=True)  # Full content for detail page
    features = Column(Text, nullable=True)  # Comma-separated or JSON string
    image = Column(String, nullable=True)  # Service image
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
