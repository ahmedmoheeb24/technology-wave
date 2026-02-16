from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean
from datetime import datetime
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    category = Column(String, index=True)
    price = Column(Float)
    description = Column(Text, nullable=True)
    features = Column(Text, nullable=True)  # Store as JSON string or comma-separated
    details = Column(Text, nullable=True)
    image = Column(String, nullable=True)  # Store file path
    in_stock = Column(Boolean, default=True)
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
