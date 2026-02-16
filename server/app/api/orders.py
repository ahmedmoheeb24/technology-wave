from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import secrets

from app.core.database import get_db
from app.models.order import Order, OrderItem
from app.schemas.order import OrderCreate, OrderResponse, OrderUpdate
from app.api.deps import get_current_admin_user
from app.models.user import User

router = APIRouter()

def generate_order_number():
    """Generate unique order number"""
    timestamp = datetime.utcnow().strftime('%Y%m%d')
    random = secrets.token_hex(4).upper()
    return f"ORD-{timestamp}-{random}"

@router.post("/", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db)
):
    """Create a new order (public endpoint - no auth required)"""
    # Generate unique order number
    order_number = generate_order_number()
    
    # Create order
    order = Order(
        order_number=order_number,
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        shipping_address=order_data.shipping_address,
        shipping_city=order_data.shipping_city,
        shipping_postal_code=order_data.shipping_postal_code,
        shipping_country=order_data.shipping_country,
        total_amount=order_data.total_amount,
        payment_method=order_data.payment_method,
        notes=order_data.notes
    )
    
    db.add(order)
    db.flush()  # Get order.id before adding items
    
    # Create order items
    for item_data in order_data.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data.product_id,
            product_name=item_data.product_name,
            product_price=item_data.product_price,
            product_image=item_data.product_image,
            quantity=item_data.quantity,
            subtotal=item_data.subtotal
        )
        db.add(order_item)
    
    db.commit()
    db.refresh(order)
    
    return order

@router.get("/", response_model=List[OrderResponse])
async def get_orders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all orders (admin only)"""
    query = db.query(Order)
    
    if status:
        query = query.filter(Order.status == status)
    
    orders = query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get order by ID (admin only)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/track/{order_number}", response_model=OrderResponse)
async def track_order(
    order_number: str,
    db: Session = Depends(get_db)
):
    """Track order by order number (public endpoint)"""
    order = db.query(Order).filter(Order.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update order status/details (admin only)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Update fields
    if order_update.status is not None:
        order.status = order_update.status
    if order_update.payment_status is not None:
        order.payment_status = order_update.payment_status
    if order_update.tracking_number is not None:
        order.tracking_number = order_update.tracking_number
    if order_update.notes is not None:
        order.notes = order_update.notes
    
    order.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}")
async def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete order (admin only)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db.delete(order)
    db.commit()
    return {"message": "Order deleted successfully"}
