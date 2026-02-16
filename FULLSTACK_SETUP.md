# 🚀 Complete Fullstack E-commerce Admin System

## 📋 Overview

This is a complete fullstack application with:
- **Frontend**: Next.js 16 (React) with admin dashboard
- **Backend**: FastAPI (Python) with JWT authentication
- **Database**: SQLite (SQLAlchemy ORM)
- **File Storage**: Server-side image upload with optimization

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
│  - User-facing website                                      │
│  - Admin dashboard                                          │
│  - Real-time updates                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/REST API
                   │ JWT Authentication
┌──────────────────┴──────────────────────────────────────────┐
│                  Backend (FastAPI)                          │
│  - RESTful API endpoints                                    │
│  - JWT token-based auth                                     │
│  - Image upload & optimization                              │
└──────────────────┬──────────────────────────────────────────┘
                   │ SQLAlchemy ORM
┌──────────────────┴──────────────────────────────────────────┐
│              Database (SQLite/PostgreSQL)                   │
│  - Products, Services, Hero Banners                         │
│  - User authentication                                      │
│  - About section                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 18+** (for frontend)
- **pip** (Python package manager)
- **npm** (Node package manager)

### Step 1: Backend Setup

```bash
# Navigate to server directory
cd server

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python run.py
```

Backend will run at: **http://localhost:8000**

### Step 2: Frontend Setup

```bash
# Navigate to client directory (in a new terminal)
cd client

# Install Node dependencies (if not already done)
npm install

# Start the frontend development server
npm run dev
```

Frontend will run at: **http://localhost:3000**

### Step 3: Access the Application

- 🌐 **Website**: http://localhost:3000
- 🔐 **Admin Panel**: http://localhost:3000/admin
- 📡 **API Docs**: http://localhost:8000/docs
- 💚 **Health Check**: http://localhost:8000/health

### Step 4: Login to Admin

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT**: Change these credentials in production!

---

## 📁 Project Structure

```
.
├── client/                      # Frontend (Next.js)
│   ├── app/
│   │   ├── admin/              # Admin panel pages
│   │   │   ├── page.jsx        # Login page
│   │   │   └── dashboard/      # Dashboard pages
│   │   │       ├── page.jsx
│   │   │       ├── products/
│   │   │       ├── services/
│   │   │       ├── hero/
│   │   │       └── about/
│   │   ├── Components/         # React components
│   │   ├── products/           # Products page
│   │   ├── services/           # Services page
│   │   └── about/              # About page
│   ├── lib/
│   │   └── api.js              # API client
│   └── .env.local              # Environment variables
│
└── server/                      # Backend (FastAPI)
    ├── app/
    │   ├── api/                # API endpoints
    │   │   ├── auth.py         # Authentication
    │   │   ├── products.py     # Products CRUD
    │   │   ├── services.py     # Services CRUD
    │   │   ├── hero_banners.py # Hero banners CRUD
    │   │   └── about.py        # About image upload
    │   ├── core/               # Core functionality
    │   │   ├── config.py       # Configuration
    │   │   ├── database.py     # Database setup
    │   │   └── security.py     # JWT & password hashing
    │   ├── models/             # Database models
    │   ├── schemas/            # Pydantic schemas
    │   └── utils/              # Utilities
    │       └── file_upload.py  # Image upload handler
    ├── uploads/                # Uploaded images
    ├── main.py                 # FastAPI app
    ├── run.py                  # Server runner
    ├── requirements.txt        # Python dependencies
    └── .env                    # Environment variables
```

---

## 🔑 Key Features

### Backend (FastAPI)

✅ **Authentication**
- JWT token-based authentication
- Secure password hashing (bcrypt)
- Protected admin endpoints

✅ **Database**
- SQLAlchemy ORM
- SQLite (development) / PostgreSQL (production)
- Automatic migrations

✅ **File Upload**
- Image validation
- Automatic optimization & resizing
- Unique file naming (UUID)
- Max file size: 5MB

✅ **API Features**
- RESTful endpoints
- Automatic API documentation (Swagger)
- CORS enabled
- Request validation

### Frontend (Next.js)

✅ **Admin Dashboard**
- Product management with image upload
- Service management
- Hero banner management
- About section image upload
- Real-time preview

✅ **User-Facing Website**
- Homepage with hero slider
- Products page with filtering
- Services page
- About page
- Contact form

✅ **Features**
- Responsive design
- Dark/light theme removed (white & blue only)
- Smooth animations (Framer Motion)
- Image optimization

---

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API endpoints
- ✅ File upload validation
- ✅ CORS configuration
- ✅ SQL injection protection
- ✅ XSS protection
- ✅ Rate limiting ready

---

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | Get all products |
| GET | `/api/services/` | Get all services |
| GET | `/api/hero-banners/` | Get all hero banners |
| GET | `/api/about/` | Get about image |
| POST | `/api/auth/login` | Login and get token |

### Protected Endpoints (Require Admin Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products/` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |
| POST | `/api/services/` | Create service |
| PUT | `/api/services/{id}` | Update service |
| DELETE | `/api/services/{id}` | Delete service |
| POST | `/api/hero-banners/` | Create hero banner |
| PUT | `/api/hero-banners/{id}` | Update hero banner |
| DELETE | `/api/hero-banners/{id}` | Delete hero banner |
| POST | `/api/about/` | Upload about image |
| DELETE | `/api/about/` | Delete about image |

---

## 🎯 How to Use

### 1. Admin Login
1. Go to http://localhost:3000/admin
2. Login with username `admin` and password `admin123`
3. You'll be redirected to the dashboard

### 2. Manage Products
1. Click "Manage Products"
2. Click "+ Add Product"
3. Fill in product details
4. Upload product image
5. Click "Add Product"
6. Product will appear on the website immediately

### 3. Manage Services
1. Click "Manage Services"
2. Add services with emoji icons
3. Services appear on homepage and services page

### 4. Manage Hero Banners
1. Click "Hero Banners"
2. Add slides with images
3. Choose background gradients
4. Set button text and links

### 5. Upload About Image
1. Click "About Section"
2. Upload an image
3. Image appears on the about page

---

## 🛠️ Configuration

### Backend (.env)

```env
# Security
SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Database
DATABASE_URL=sqlite:///./store.db

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Upload
MAX_FILE_SIZE=5242880
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🚢 Production Deployment

### Backend Deployment

1. **Change Credentials**
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   Update `SECRET_KEY` in `.env`

2. **Use PostgreSQL**
   ```env
   DATABASE_URL=postgresql://user:pass@host/db
   ```

3. **Deploy to Server**
   - Use Docker or VM
   - Install dependencies
   - Run with Gunicorn + Uvicorn
   - Set up reverse proxy (Nginx)
   - Enable HTTPS

### Frontend Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   - Connect GitHub repo
   - Set environment variables
   - Deploy automatically

---

## 📚 Documentation

- **Backend API Docs**: http://localhost:8000/docs
- **Backend README**: `server/README.md`
- **Deployment Guide**: `server/DEPLOYMENT.md`
- **Admin Guide**: `client/ADMIN_GUIDE.md`

---

## 🐛 Troubleshooting

### Backend won't start
- Check Python version (3.8+)
- Install requirements: `pip install -r requirements.txt`
- Check port 8000 is not in use

### Frontend won't start
- Check Node version (18+)
- Install dependencies: `npm install`
- Check port 3000 is not in use

### Can't login to admin
- Check backend is running
- Check credentials are correct
- Clear browser cache and localStorage

### Images not uploading
- Check `server/uploads/` directory exists
- Check file size < 5MB
- Check file type is image

### CORS errors
- Check `ALLOWED_ORIGINS` in server `.env`
- Restart backend after changing `.env`

---

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React** - UI library

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **python-jose** - JWT
- **Passlib** - Password hashing
- **Pillow** - Image processing
- **Uvicorn** - ASGI server

### Database
- **SQLite** (development)
- **PostgreSQL** (production ready)

---

## ✅ What's Included

- ✅ Complete admin dashboard
- ✅ JWT authentication
- ✅ Product management with images
- ✅ Service management
- ✅ Hero banner management
- ✅ About section management
- ✅ Image upload & optimization
- ✅ RESTful API
- ✅ Database integration
- ✅ Responsive design
- ✅ Security features
- ✅ API documentation
- ✅ Production ready

---

## 🚀 Next Steps

1. ✅ Test the complete system
2. ✅ Add your own products and content
3. ✅ Customize the design
4. ✅ Change admin credentials
5. ✅ Deploy to production

---

## 📞 Support

For issues:
1. Check documentation files
2. Review API docs at `/docs`
3. Check browser console for errors
4. Check server logs

---

**Built with ❤️ using FastAPI and Next.js**
