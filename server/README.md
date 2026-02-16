# FastAPI Backend for Store Admin

## Features

- ✅ JWT Authentication
- ✅ SQLite Database with SQLAlchemy ORM
- ✅ Image Upload & Optimization
- ✅ CORS Enabled
- ✅ Secure Password Hashing
- ✅ RESTful API Endpoints
- ✅ Automatic API Documentation (Swagger)

## Setup

### 1. Install Python Dependencies

```bash
cd server
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

**Important**: Change `SECRET_KEY` in production!

### 3. Run the Server

```bash
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products/` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Services
- `GET /api/services/` - Get all services
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services/` - Create service (Admin only)
- `PUT /api/services/{id}` - Update service (Admin only)
- `DELETE /api/services/{id}` - Delete service (Admin only)

### Hero Banners
- `GET /api/hero-banners/` - Get all hero banners
- `GET /api/hero-banners/{id}` - Get banner by ID
- `POST /api/hero-banners/` - Create banner (Admin only)
- `PUT /api/hero-banners/{id}` - Update banner (Admin only)
- `DELETE /api/hero-banners/{id}` - Delete banner (Admin only)

### About
- `GET /api/about/` - Get about image
- `POST /api/about/` - Upload about image (Admin only)
- `DELETE /api/about/` - Delete about image (Admin only)

## Authentication

All admin endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

### Default Credentials
- Username: `admin`
- Password: `admin123`

**⚠️ Change these in production!**

## Database

The application uses SQLite by default. The database file `store.db` will be created automatically on first run.

### Models
- **User** - Admin users
- **Product** - Product catalog
- **Service** - Service offerings
- **HeroBanner** - Hero slider banners
- **About** - About section image

## File Uploads

Images are uploaded to the `uploads/` directory with automatic:
- Validation (file type, size)
- Optimization (compression, resizing)
- Unique naming (UUID)

Maximum file size: 5MB

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected admin endpoints
- ✅ File upload validation
- ✅ CORS configuration
- ✅ SQL injection protection (SQLAlchemy ORM)

## Production Deployment

1. Change `SECRET_KEY` in `.env`
2. Change admin credentials
3. Use PostgreSQL instead of SQLite
4. Set `DEBUG=False`
5. Use proper file storage (S3, etc.)
6. Add rate limiting
7. Enable HTTPS
8. Use production ASGI server (Gunicorn + Uvicorn)

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL ORM
- **Pydantic** - Data validation
- **python-jose** - JWT handling
- **Passlib** - Password hashing
- **Pillow** - Image processing
- **Uvicorn** - ASGI server
