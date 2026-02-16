from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.models.hero_banner import HeroBanner
from app.schemas.hero_banner import HeroBannerResponse, HeroBannerCreate, HeroBannerUpdate
from app.api.deps import get_current_admin_user
from app.models.user import User
from app.utils.file_upload import save_upload_file, delete_file

router = APIRouter()

@router.get("/", response_model=List[HeroBannerResponse])
async def get_hero_banners(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    banners = db.query(HeroBanner).offset(skip).limit(limit).all()
    return banners

@router.get("/{banner_id}", response_model=HeroBannerResponse)
async def get_hero_banner(banner_id: int, db: Session = Depends(get_db)):
    banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Hero banner not found")
    return banner

@router.post("/", response_model=HeroBannerResponse)
async def create_hero_banner(
    title: str = Form(...),
    subtitle: str = Form(...),
    description: str = Form(...),
    button_text: str = Form(...),
    button_link: str = Form(...),
    bg_color: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    # Save image if provided
    image_path = None
    if image:
        image_path = await save_upload_file(image, "hero")
    
    banner = HeroBanner(
        title=title,
        subtitle=subtitle,
        description=description,
        button_text=button_text,
        button_link=button_link,
        bg_color=bg_color,
        image=image_path
    )
    db.add(banner)
    db.commit()
    db.refresh(banner)
    return banner

@router.put("/{banner_id}", response_model=HeroBannerResponse)
async def update_hero_banner(
    banner_id: int,
    title: str = Form(...),
    subtitle: str = Form(...),
    description: str = Form(...),
    button_text: str = Form(...),
    button_link: str = Form(...),
    bg_color: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Hero banner not found")
    
    # Update fields
    banner.title = title
    banner.subtitle = subtitle
    banner.description = description
    banner.button_text = button_text
    banner.button_link = button_link
    banner.bg_color = bg_color
    
    # Update image if provided
    if image:
        # Delete old image
        if banner.image:
            delete_file(banner.image)
        # Save new image
        banner.image = await save_upload_file(image, "hero")
    
    db.commit()
    db.refresh(banner)
    return banner

@router.delete("/{banner_id}")
async def delete_hero_banner(
    banner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Hero banner not found")
    
    # Delete image if exists
    if banner.image:
        delete_file(banner.image)
    
    db.delete(banner)
    db.commit()
    return {"message": "Hero banner deleted successfully"}
