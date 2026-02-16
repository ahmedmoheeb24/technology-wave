from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.about import About
from app.api.deps import get_current_admin_user
from app.models.user import User
from app.utils.file_upload import save_upload_file, delete_file

router = APIRouter()

@router.get("/")
async def get_about_image(db: Session = Depends(get_db)):
    about = db.query(About).first()
    if not about:
        return {"image": None}
    return {"image": about.image}

@router.post("/")
async def upload_about_image(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    # Save new image
    image_path = await save_upload_file(image, "about")
    
    # Check if about record exists
    about = db.query(About).first()
    
    if about:
        # Delete old image
        if about.image:
            delete_file(about.image)
        # Update image
        about.image = image_path
    else:
        # Create new record
        about = About(image=image_path)
        db.add(about)
    
    db.commit()
    db.refresh(about)
    return {"image": about.image}

@router.delete("/")
async def delete_about_image(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    about = db.query(About).first()
    if not about:
        raise HTTPException(status_code=404, detail="No about image found")
    
    # Delete image file
    if about.image:
        delete_file(about.image)
    
    db.delete(about)
    db.commit()
    return {"message": "About image deleted successfully"}
