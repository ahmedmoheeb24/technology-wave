from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Hero Banner Schemas
class HeroBannerBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    background_image: Optional[str] = None
    order: int = 0
    active: bool = True

class HeroBannerCreate(HeroBannerBase):
    pass

class HeroBannerUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    background_image: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

class HeroBannerResponse(HeroBannerBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# About Section Schemas
class AboutSectionBase(BaseModel):
    title: str
    content: str
    image: Optional[str] = None

class AboutSectionCreate(AboutSectionBase):
    pass

class AboutSectionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None

class AboutSectionResponse(AboutSectionBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    description: str
    image: Optional[str] = None
    order: int = 0
    active: bool = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Shop Section Schemas
class ShopSectionBase(BaseModel):
    title: str
    description: str
    image: Optional[str] = None

class ShopSectionCreate(ShopSectionBase):
    pass

class ShopSectionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

class ShopSectionResponse(ShopSectionBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# News Schemas
class NewsBase(BaseModel):
    title: str
    content: str
    image: Optional[str] = None
    active: bool = True

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    active: Optional[bool] = None

class NewsResponse(NewsBase):
    id: int
    date: datetime
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str
