# Technology Wave - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for Next.js frontend)
- Python 3.8+ (for FastAPI backend)

---

## 📦 Installation

### 1. Frontend Setup (Next.js)

```bash
cd client
npm install
```

**Environment Variables:**
Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Backend Setup (FastAPI)

```bash
cd server
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

**Environment Variables:**
Edit `server/.env`:
```env
SECRET_KEY=your-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
UPLOAD_DIR=uploads
CORS_ORIGINS=http://localhost:3000,https://www.technology-wave.com
```

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
venv\Scripts\activate  # Windows
uvicorn main:app --reload
```
Backend runs on: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:3000

---

## 🎨 UI/UX Features

### Modern Design Elements
✅ **Fixed Header** - Stays at top, doesn't block content
✅ **Responsive Navigation** - Mobile hamburger menu
✅ **Modern Backgrounds** - Gradients, patterns, and mesh effects
✅ **Smooth Animations** - Fade-ins, slides, hover effects
✅ **Mobile Optimized** - Separate views for mobile/desktop
✅ **SEO Optimized** - Meta tags, semantic HTML

### Color Scheme
- **Primary**: #0066CC (Blue)
- **Dark**: #0052A3
- **Light**: #E6F2FF
- **Background**: White with subtle patterns

---

## 🔐 Admin Dashboard

### Access
- **URL**: http://localhost:3000/admin
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

### Admin Features
1. **Hero Banners** - Manage slideshow banners
2. **About Section** - Edit about content and image
3. **Services** - Add/edit service cards
4. **Shop Section** - Manage shop preview
5. **News** - Create and manage news articles

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

The site automatically adjusts:
- Navigation (hamburger ↔ horizontal menu)
- Grid layouts (1 column ↔ 2-3 columns)
- Text sizes
- Image dimensions

---

## 🌐 Deployment

### Frontend (Vercel - for client preview)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-vps-domain.com
   NEXT_PUBLIC_SITE_URL=https://www.technology-wave.com
   ```
4. Deploy!

### Frontend (Cloudflare Pages - production)

1. Build the project:
   ```bash
   cd client
   npm run build
   ```
2. Upload `out/` folder to Cloudflare Pages
3. Set custom domain: www.technology-wave.com

### Backend (VPS)

1. Copy server files to VPS
2. Install dependencies
3. Set up systemd service or PM2
4. Configure nginx as reverse proxy
5. Set up SSL with Let's Encrypt

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📞 Contact Information

Displayed on website:
- **Phone**: +447488321411
- **Email**: info@technology-wave.com
- **Address**: 53 Northfield Park UB3 4NU London

---

## 🎯 Key Pages

### Public Pages
- **/** - Home (landing page with all sections)
- **/about** - About Us (placeholder)
- **/services** - Services listing (placeholder)
- **/events** - Events page (placeholder)
- **/shop** - Shop/Parts store (placeholder)
- **/contact** - Contact form (placeholder)

### Admin Pages
- **/admin** - Admin login
- **/admin/dashboard** - Dashboard overview
- **/admin/dashboard/hero-banners** - Hero management
- **/admin/dashboard/about** - About section
- **/admin/dashboard/services** - Services management
- **/admin/dashboard/shop** - Shop section
- **/admin/dashboard/news** - News management

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
netstat -ano | findstr :3000
# Kill the process
taskkill /PID <PID> /F
```

### Database Issues
Delete the database and restart:
```bash
cd server
rm technologywave.db
python main.py  # Will recreate database
```

### Frontend Build Errors
```bash
cd client
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Documentation Files

- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `USAGE_GUIDE.md` - How to use admin dashboard
- `UI_UX_IMPROVEMENTS.md` - UI/UX changes and features
- `QUICK_START_GUIDE.md` - This file

---

## 🎉 You're Ready!

The website is now set up with:
✅ Modern, responsive design
✅ Blue and white color scheme
✅ Fixed header that doesn't block content
✅ Mobile-optimized views
✅ Admin dashboard for content management
✅ SEO optimization
✅ Smooth animations and hover effects

**Next Steps:**
1. Customize placeholder content in About, Services, Events, Shop, Contact pages
2. Add your logo to `/client/public/assets/`
3. Upload hero banner images through admin dashboard
4. Add actual service and product data
5. Test on different devices
6. Deploy to Vercel (preview) → VPS (backend) → Cloudflare (production)

Need help? Check the documentation files or review the code!
