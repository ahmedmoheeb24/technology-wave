from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class OrderItemCreate(BaseModel):
    product_id: int
    product_name: str
    product_price: float
    product_image: Optional[str] = None
    quantity: int
    subtotal: float

class OrderItemResponse(OrderItemCreate):
    id: int
    order_id: int
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    shipping_address: str
    shipping_city: str
    shipping_postal_code: str
    shipping_country: str
    total_amount: float
    payment_method: str = "cod"
    notes: Optional[str] = None
    items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    tracking_number: Optional[str] = None
    notes: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    customer_email: str
    customer_phone: str
    shipping_address: str
    shipping_city: str
    shipping_postal_code: str
    shipping_country: str
    total_amount: float
    status: str
    payment_method: str
    payment_status: str
    notes: Optional[str]
    tracking_number: Optional[str]
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse]
    
    class Config:
        from_attributes = True
