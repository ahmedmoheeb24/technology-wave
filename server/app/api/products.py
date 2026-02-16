from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import ProductResponse, ProductCreate, ProductUpdate
from app.api.deps import get_current_admin_user, get_current_user
from app.models.user import User
from app.utils.file_upload import save_upload_file, delete_file

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category and category != "All":
        query = query.filter(Product.category == category)
    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/slug/{slug}", response_model=ProductResponse)
async def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse)
async def create_product(
    title: str = Form(...),
    category: str = Form(...),
    price: float = Form(...),
    description: Optional[str] = Form(None),
    features: Optional[str] = Form(None),
    details: Optional[str] = Form(None),
    in_stock: bool = Form(True),
    featured: bool = Form(False),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    # Generate slug from title
    import re
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    
    # Ensure slug is unique
    base_slug = slug
    counter = 1
    while db.query(Product).filter(Product.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    
    # Save image if provided
    image_path = None
    if image:
        image_path = await save_upload_file(image, "products")
    
    product = Product(
        title=title,
        slug=slug,
        category=category,
        price=price,
        description=description,
        features=features,
        details=details,
        in_stock=in_stock,
        featured=featured,
        image=image_path
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    title: str = Form(...),
    category: str = Form(...),
    price: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update fields
    product.title = title
    product.category = category
    product.price = price
    
    # Update image if provided
    if image:
        # Delete old image
        if product.image:
            delete_file(product.image)
        # Save new image
        product.image = await save_upload_file(image, "products")
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Delete image if exists
    if product.image:
        delete_file(product.image)
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}
