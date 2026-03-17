from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import re

from app.core.database import get_db
from app.models.service import Service
from app.schemas.service import ServiceResponse, ServiceCreate, ServiceUpdate
from app.api.deps import get_current_admin_user
from app.models.user import User
from app.utils.file_upload import save_upload_file, delete_file

router = APIRouter()

@router.get("/", response_model=List[ServiceResponse])
async def get_services(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    services = db.query(Service).offset(skip).limit(limit).all()
    return services

@router.get("/{service_id}", response_model=ServiceResponse)
async def get_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.get("/slug/{slug}", response_model=ServiceResponse)
async def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("/", response_model=ServiceResponse)
async def create_service(
    title: str = Form(...),
    description: str = Form(...),
    detailed_description: Optional[str] = Form(None),
    features: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    # Generate slug from title
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    
    # Ensure slug is unique
    base_slug = slug
    counter = 1
    while db.query(Service).filter(Service.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    
    # Save image if provided
    image_path = None
    if image:
        image_path = await save_upload_file(image, "services")
    
    service = Service(
        title=title,
        slug=slug,
        description=description,
        detailed_description=detailed_description,
        features=features,
        image=image_path
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: int,
    title: str = Form(...),
    description: str = Form(...),
    detailed_description: Optional[str] = Form(None),
    features: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Update fields
    service.title = title
    service.description = description
    service.detailed_description = detailed_description
    service.features = features
    
    # Update slug if title changed
    new_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    if new_slug != service.slug:
        base_slug = new_slug
        counter = 1
        while db.query(Service).filter(Service.slug == new_slug, Service.id != service_id).first():
            new_slug = f"{base_slug}-{counter}"
            counter += 1
        service.slug = new_slug
    
    # Update image if provided
    if image:
        # Delete old image
        if service.image:
            delete_file(service.image)
        # Save new image
        service.image = await save_upload_file(image, "services")
    
    db.commit()
    db.refresh(service)
    return service

@router.delete("/{service_id}")
async def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Delete image if exists
    if service.image:
        delete_file(service.image)
    
    db.delete(service)
    db.commit()
    return {"message": "Service deleted successfully"}
