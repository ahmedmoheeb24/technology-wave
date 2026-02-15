from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta
import shutil
import os
import uuid

from config import settings
from database import engine, get_db, Base
from models import HeroBanner, AboutSection, Service, ShopSection, News
from schemas import (
    HeroBannerCreate, HeroBannerUpdate, HeroBannerResponse,
    AboutSectionCreate, AboutSectionUpdate, AboutSectionResponse,
    ServiceCreate, ServiceUpdate, ServiceResponse,
    ShopSectionCreate, ShopSectionUpdate, ShopSectionResponse,
    NewsCreate, NewsUpdate, NewsResponse,
    Token, LoginRequest
)
from auth import verify_password, create_access_token, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Technology Wave API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for static file serving
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# ============= AUTH ENDPOINTS =============

@app.post("/api/auth/login", response_model=Token)
def login(login_data: LoginRequest):
    """Admin login endpoint"""
    if not verify_password(login_data.password, login_data.username):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": login_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/verify")
def verify_auth(username: str = Depends(verify_token)):
    """Verify if token is valid"""
    return {"authenticated": True, "username": username}

# ============= FILE UPLOAD HELPER =============

async def save_upload_file(upload_file: UploadFile, folder: str) -> str:
    """Save uploaded file and return the file path"""
    if not upload_file:
        return None
    
    # Generate unique filename
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, folder, unique_filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    # Return relative path for URL
    return f"/uploads/{folder}/{unique_filename}"

# ============= HERO BANNER ENDPOINTS =============

@app.get("/api/hero-banners", response_model=List[HeroBannerResponse])
def get_hero_banners(db: Session = Depends(get_db)):
    """Get all active hero banners ordered by order field"""
    return db.query(HeroBanner).filter(HeroBanner.active == True).order_by(HeroBanner.order).all()

@app.get("/api/admin/hero-banners", response_model=List[HeroBannerResponse])
def get_all_hero_banners(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Get all hero banners (admin only)"""
    return db.query(HeroBanner).order_by(HeroBanner.order).all()

@app.post("/api/admin/hero-banners", response_model=HeroBannerResponse)
async def create_hero_banner(
    title: str = Form(...),
    subtitle: Optional[str] = Form(None),
    button_text: Optional[str] = Form(None),
    button_link: Optional[str] = Form(None),
    order: int = Form(0),
    active: bool = Form(True),
    background_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Create new hero banner (admin only)"""
    image_path = await save_upload_file(background_image, "hero") if background_image else None
    
    hero_banner = HeroBanner(
        title=title,
        subtitle=subtitle,
        button_text=button_text,
        button_link=button_link,
        background_image=image_path,
        order=order,
        active=active
    )
    db.add(hero_banner)
    db.commit()
    db.refresh(hero_banner)
    return hero_banner

@app.put("/api/admin/hero-banners/{banner_id}", response_model=HeroBannerResponse)
async def update_hero_banner(
    banner_id: int,
    title: Optional[str] = Form(None),
    subtitle: Optional[str] = Form(None),
    button_text: Optional[str] = Form(None),
    button_link: Optional[str] = Form(None),
    order: Optional[int] = Form(None),
    active: Optional[bool] = Form(None),
    background_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Update hero banner (admin only)"""
    hero_banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not hero_banner:
        raise HTTPException(status_code=404, detail="Hero banner not found")
    
    if title is not None:
        hero_banner.title = title
    if subtitle is not None:
        hero_banner.subtitle = subtitle
    if button_text is not None:
        hero_banner.button_text = button_text
    if button_link is not None:
        hero_banner.button_link = button_link
    if order is not None:
        hero_banner.order = order
    if active is not None:
        hero_banner.active = active
    if background_image:
        hero_banner.background_image = await save_upload_file(background_image, "hero")
    
    db.commit()
    db.refresh(hero_banner)
    return hero_banner

@app.delete("/api/admin/hero-banners/{banner_id}")
def delete_hero_banner(banner_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Delete hero banner (admin only)"""
    hero_banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not hero_banner:
        raise HTTPException(status_code=404, detail="Hero banner not found")
    
    db.delete(hero_banner)
    db.commit()
    return {"message": "Hero banner deleted successfully"}

# ============= ABOUT SECTION ENDPOINTS =============

@app.get("/api/about", response_model=AboutSectionResponse)
def get_about_section(db: Session = Depends(get_db)):
    """Get about section content"""
    about = db.query(AboutSection).first()
    if not about:
        raise HTTPException(status_code=404, detail="About section not found")
    return about

@app.post("/api/admin/about", response_model=AboutSectionResponse)
async def create_or_update_about(
    title: str = Form(...),
    content: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Create or update about section (admin only)"""
    about = db.query(AboutSection).first()
    
    image_path = await save_upload_file(image, "about") if image else None
    
    if about:
        about.title = title
        about.content = content
        if image_path:
            about.image = image_path
    else:
        about = AboutSection(title=title, content=content, image=image_path)
        db.add(about)
    
    db.commit()
    db.refresh(about)
    return about

# ============= SERVICES ENDPOINTS =============

@app.get("/api/services", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    """Get all active services"""
    return db.query(Service).filter(Service.active == True).order_by(Service.order).all()

@app.get("/api/admin/services", response_model=List[ServiceResponse])
def get_all_services(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Get all services (admin only)"""
    return db.query(Service).order_by(Service.order).all()

@app.post("/api/admin/services", response_model=ServiceResponse)
async def create_service(
    title: str = Form(...),
    description: str = Form(...),
    order: int = Form(0),
    active: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Create new service (admin only)"""
    image_path = await save_upload_file(image, "services") if image else None
    
    service = Service(
        title=title,
        description=description,
        image=image_path,
        order=order,
        active=active
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@app.put("/api/admin/services/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    order: Optional[int] = Form(None),
    active: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Update service (admin only)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    if title is not None:
        service.title = title
    if description is not None:
        service.description = description
    if order is not None:
        service.order = order
    if active is not None:
        service.active = active
    if image:
        service.image = await save_upload_file(image, "services")
    
    db.commit()
    db.refresh(service)
    return service

@app.delete("/api/admin/services/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Delete service (admin only)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(service)
    db.commit()
    return {"message": "Service deleted successfully"}

# ============= SHOP SECTION ENDPOINTS =============

@app.get("/api/shop", response_model=ShopSectionResponse)
def get_shop_section(db: Session = Depends(get_db)):
    """Get shop section content"""
    shop = db.query(ShopSection).first()
    if not shop:
        raise HTTPException(status_code=404, detail="Shop section not found")
    return shop

@app.post("/api/admin/shop", response_model=ShopSectionResponse)
async def create_or_update_shop(
    title: str = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Create or update shop section (admin only)"""
    shop = db.query(ShopSection).first()
    
    image_path = await save_upload_file(image, "shop") if image else None
    
    if shop:
        shop.title = title
        shop.description = description
        if image_path:
            shop.image = image_path
    else:
        shop = ShopSection(title=title, description=description, image=image_path)
        db.add(shop)
    
    db.commit()
    db.refresh(shop)
    return shop

# ============= NEWS ENDPOINTS =============

@app.get("/api/news/latest", response_model=List[NewsResponse])
def get_latest_news(limit: int = 6, offset: int = 0, db: Session = Depends(get_db)):
    """Get latest news with pagination"""
    return db.query(News).filter(News.active == True).order_by(News.date.desc()).offset(offset).limit(limit).all()

@app.get("/api/admin/news", response_model=List[NewsResponse])
def get_all_news(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Get all news (admin only)"""
    return db.query(News).order_by(News.date.desc()).all()

@app.post("/api/admin/news", response_model=NewsResponse)
async def create_news(
    title: str = Form(...),
    content: str = Form(...),
    active: bool = Form(True),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Create new news item (admin only)"""
    image_path = await save_upload_file(image, "news") if image else None
    
    news = News(
        title=title,
        content=content,
        image=image_path,
        active=active
    )
    db.add(news)
    db.commit()
    db.refresh(news)
    return news

@app.put("/api/admin/news/{news_id}", response_model=NewsResponse)
async def update_news(
    news_id: int,
    title: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    active: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _: str = Depends(verify_token)
):
    """Update news item (admin only)"""
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    if title is not None:
        news.title = title
    if content is not None:
        news.content = content
    if active is not None:
        news.active = active
    if image:
        news.image = await save_upload_file(image, "news")
    
    db.commit()
    db.refresh(news)
    return news

@app.delete("/api/admin/news/{news_id}")
def delete_news(news_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    """Delete news item (admin only)"""
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    db.delete(news)
    db.commit()
    return {"message": "News deleted successfully"}

# ============= HEALTH CHECK =============

@app.get("/")
def root():
    return {"message": "Technology Wave API - Running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
