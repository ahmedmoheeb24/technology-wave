from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    price: float
    description: Optional[str] = None
    features: Optional[str] = None
    details: Optional[str] = None
    in_stock: Optional[bool] = True
    featured: Optional[bool] = False

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
