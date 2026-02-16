from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HeroBannerBase(BaseModel):
    title: str
    subtitle: str
    description: str
    button_text: str
    button_link: str
    bg_color: str

class HeroBannerCreate(HeroBannerBase):
    pass

class HeroBannerUpdate(HeroBannerBase):
    pass

class HeroBannerResponse(HeroBannerBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
