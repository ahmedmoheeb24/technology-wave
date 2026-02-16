# FastAPI Backend Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
cd server
pip install -r requirements.txt
```

### 2. Run the Server

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Or directly:**
```bash
python run.py
```

The server will start at: **http://localhost:8000**

### 3. Test the API

Open your browser and go to:
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## Frontend Integration

### 1. Install Frontend Dependencies

The frontend already has the API client configured.

### 2. Start Both Servers

**Terminal 1 (Backend):**
```bash
cd server
python run.py
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:8000

## API Testing with Swagger

1. Go to http://localhost:8000/docs
2. Click "Authorize" button
3. Login first at `/api/auth/login`:
   - Username: `admin`
   - Password: `admin123`
4. Copy the `access_token` from response
5. Click "Authorize" and enter: `Bearer <your-token>`
6. Now you can test all endpoints!

## Database

The SQLite database (`store.db`) will be created automatically on first run.

### Reset Database

To reset the database:
```bash
rm store.db
python run.py
```

This will create a fresh database with the admin user.

## Environment Variables

Edit `.env` file to configure:

```env
# Security (CHANGE IN PRODUCTION!)
SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Database
DATABASE_URL=sqlite:///./store.db

# CORS - Add your frontend URL
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# File Upload
MAX_FILE_SIZE=5242880  # 5MB
```

## Production Deployment

### Using Docker (Recommended)

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t store-api .
docker run -p 8000:8000 store-api
```

### Using Gunicorn + Uvicorn

Install:
```bash
pip install gunicorn
```

Run:
```bash
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Environment Setup

1. **Change SECRET_KEY**: Generate a new secret key
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```

2. **Change Admin Credentials** in `.env`

3. **Use PostgreSQL** instead of SQLite:
   ```env
   DATABASE_URL=postgresql://user:password@localhost/dbname
   ```

4. **Set Production Settings**:
   ```env
   DEBUG=False
   ```

5. **Use Cloud Storage** for uploads (AWS S3, Cloudinary, etc.)

## Troubleshooting

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:8000 | xargs kill -9
```

### Database Locked Error

Stop all running instances and restart:
```bash
rm store.db
python run.py
```

### CORS Errors

Add your frontend URL to `ALLOWED_ORIGINS` in `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Image Upload Fails

Check:
1. `uploads/` directory exists and is writable
2. Image size is under 5MB
3. Image format is supported (jpg, jpeg, png, gif, webp)

## API Endpoints Reference

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Products (Protected)
- `GET /api/products/` - List products
- `POST /api/products/` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Services (Protected)
- `GET /api/services/` - List services
- `POST /api/services/` - Create service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service

### Hero Banners (Protected)
- `GET /api/hero-banners/` - List banners
- `POST /api/hero-banners/` - Create banner
- `PUT /api/hero-banners/{id}` - Update banner
- `DELETE /api/hero-banners/{id}` - Delete banner

### About (Protected)
- `GET /api/about/` - Get about image
- `POST /api/about/` - Upload about image
- `DELETE /api/about/` - Delete about image

## Security Checklist

- [ ] Changed SECRET_KEY
- [ ] Changed admin credentials
- [ ] Using HTTPS in production
- [ ] Using production database (PostgreSQL)
- [ ] Added rate limiting
- [ ] Set DEBUG=False
- [ ] Using environment variables for secrets
- [ ] Configured proper CORS
- [ ] Using cloud storage for files
- [ ] Enabled logging and monitoring

## Next Steps

1. ✅ Backend is ready to use
2. Frontend admin panel will automatically use the API
3. All data is now stored in database
4. Images are stored on server

Test everything works by:
1. Login to admin panel
2. Add a product with image
3. Check it appears on the frontend
4. Verify image loads correctly
