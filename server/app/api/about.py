from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import json
import json

from app.core.database import get_db
from app.models.about import About
from app.api.deps import get_current_admin_user
from app.models.user import User
from app.utils.file_upload import save_upload_file, delete_file

router = APIRouter()

@router.get("/")
async def get_about(db: Session = Depends(get_db)):
    """Get all about entries (typically just one)"""
    about_list = db.query(About).all()
    return [
        {
            "id": about.id,
            "title": about.title,
            "subtitle": about.subtitle,
            "description": about.description,
            "mission": about.mission,
            "vision": about.vision,
            "values": about.values or [],
            "team_title": about.team_title,
            "team_description": about.team_description,
            "images": about.images or [],
            "created_at": about.created_at,
            "updated_at": about.updated_at
        }
        for about in about_list
    ]

@router.post("/")
async def create_about(
    title: str = Form(...),
    description: str = Form(...),
    subtitle: Optional[str] = Form(None),
    mission: Optional[str] = Form(None),
    vision: Optional[str] = Form(None),
    values: Optional[str] = Form(None),  # JSON string
    team_title: Optional[str] = Form(None),
    team_description: Optional[str] = Form(None),
    images: List[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new about entry"""
    # Save uploaded images
    image_paths = []
    if images:
        for image in images:
            image_path = await save_upload_file(image, "about")
            image_paths.append(image_path)
    
    # Parse values JSON if provided
    values_json = None
    if values:
        try:
            values_json = json.loads(values)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid values JSON format")
    
    # Create new about record
    about = About(
        title=title,
        subtitle=subtitle,
        description=description,
        mission=mission,
        vision=vision,
        values=values_json,
        team_title=team_title,
        team_description=team_description,
        images=image_paths
    )
    db.add(about)
    db.commit()
    db.refresh(about)
    
    return {
        "id": about.id,
        "title": about.title,
        "subtitle": about.subtitle,
        "description": about.description,
        "mission": about.mission,
        "vision": about.vision,
        "values": about.values or [],
        "team_title": about.team_title,
        "team_description": about.team_description,
        "images": about.images or [],
        "created_at": about.created_at,
        "updated_at": about.updated_at
    }

@router.put("/{about_id}")
async def update_about(
    about_id: int,
    title: str = Form(...),
    description: str = Form(...),
    subtitle: Optional[str] = Form(None),
    mission: Optional[str] = Form(None),
    vision: Optional[str] = Form(None),
    values: Optional[str] = Form(None),
    team_title: Optional[str] = Form(None),
    team_description: Optional[str] = Form(None),
    images: List[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update an existing about entry"""
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=404, detail="About entry not found")
    
    # Parse values JSON if provided
    values_json = None
    if values:
        try:
            values_json = json.loads(values)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid values JSON format")
    
    # Update text fields
    about.title = title
    about.subtitle = subtitle
    about.description = description
    about.mission = mission
    about.vision = vision
    about.values = values_json
    about.team_title = team_title
    about.team_description = team_description
    
    # Handle new images
    if images:
        # Delete old images
        if about.images:
            for old_image in about.images:
                delete_file(old_image)
        
        # Save new images
        image_paths = []
        for image in images:
            image_path = await save_upload_file(image, "about")
            image_paths.append(image_path)
        about.images = image_paths
    
    db.commit()
    db.refresh(about)
    
    return {
        "id": about.id,
        "title": about.title,
        "subtitle": about.subtitle,
        "description": about.description,
        "mission": about.mission,
        "vision": about.vision,
        "values": about.values,
        "team_title": about.team_title,
        "team_description": about.team_description,
        "images": about.images or [],
        "created_at": about.created_at,
        "updated_at": about.updated_at
    }

@router.delete("/{about_id}")
async def delete_about(
    about_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete an about entry"""
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=404, detail="About entry not found")
    
    # Delete all images
    if about.images:
        for image in about.images:
            delete_file(image)
    
    db.delete(about)
    db.commit()
    return {"message": "About entry deleted successfully"}
