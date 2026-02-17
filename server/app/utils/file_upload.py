import os
import base64
import io
from fastapi import UploadFile, HTTPException
from PIL import Image
from app.core.config import settings

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

def validate_image(file: UploadFile):
    # Check file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Check content type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )

async def save_upload_file(file: UploadFile, folder: str = "") -> str:
    """
    Save file as base64 data URL for Vercel serverless compatibility.
    Returns a data URL string that can be stored directly in the database.
    """
    validate_image(file)
    
    # Read file contents
    contents = await file.read()
    
    # Check file size (3MB max for base64 to avoid DB bloat)
    max_size = 3 * 1024 * 1024  # 3MB
    if len(contents) > max_size:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size: {max_size / 1024 / 1024}MB"
        )
    
    # Optimize and compress image
    try:
        img = Image.open(io.BytesIO(contents))
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Resize if too large (max 1200px width for web optimization)
        max_width = 1200
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Save optimized image to bytes
        output = io.BytesIO()
        img.save(output, format='JPEG', quality=85, optimize=True)
        output.seek(0)
        optimized_contents = output.read()
        
        # Convert to base64 data URL
        base64_data = base64.b64encode(optimized_contents).decode('utf-8')
        data_url = f"data:image/jpeg;base64,{base64_data}"
        
        return data_url
        
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error processing image: {str(e)}"
        )

def delete_file(file_path: str):
    """
    No-op for base64 data URLs since they're stored in the database.
    Kept for backward compatibility.
    """
    pass
