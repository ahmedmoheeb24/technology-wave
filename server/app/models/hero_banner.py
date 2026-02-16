from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.core.database import Base

class HeroBanner(Base):
    __tablename__ = "hero_banners"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subtitle = Column(String)
    description = Column(Text)
    button_text = Column(String)
    button_link = Column(String)
    bg_color = Column(String)
    image = Column(String, nullable=True)  # Store file path
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
