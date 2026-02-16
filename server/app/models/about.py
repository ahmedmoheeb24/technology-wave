from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from datetime import datetime
from app.core.database import Base

class About(Base):
    __tablename__ = "about"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    mission = Column(Text, nullable=True)
    vision = Column(Text, nullable=True)
    values = Column(JSON, nullable=True)  # Store array of {title, description} objects
    team_title = Column(String, nullable=True)
    team_description = Column(Text, nullable=True)
    images = Column(JSON, nullable=True)  # Store array of image paths
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
