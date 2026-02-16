from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True)
    
    # Customer Information
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    
    # Shipping Address
    shipping_address = Column(Text, nullable=False)
    shipping_city = Column(String, nullable=False)
    shipping_postal_code = Column(String, nullable=False)
    shipping_country = Column(String, nullable=False)
    
    # Order Details
    total_amount = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, processing, shipped, delivered, cancelled
    payment_method = Column(String, default="cod")  # cod, card, paypal
    payment_status = Column(String, default="pending")  # pending, paid, failed
    
    # Additional Info
    notes = Column(Text, nullable=True)
    tracking_number = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    
    # Product Information (snapshot at time of order)
    product_id = Column(Integer, nullable=False)
    product_name = Column(String, nullable=False)
    product_price = Column(Float, nullable=False)
    product_image = Column(String, nullable=True)
    
    quantity = Column(Integer, nullable=False, default=1)
    subtotal = Column(Float, nullable=False)
    
    # Relationships
    order = relationship("Order", back_populates="items")
