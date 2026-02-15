# Technology Wave - Usage Guide

## 🎯 Getting Started

### For Developers

1. **Clone the repository**
```bash
git clone <repo-url>
cd technologywave
```

2. **Start Backend**
```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

3. **Start Frontend**
```bash
cd client
npm install
npm run dev
```

4. **Access**
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin
- API Docs: http://localhost:8000/docs

## 🔑 Admin Dashboard Guide

### Logging In

1. Navigate to `http://localhost:3000/admin` or `www.technology-wave.com/admin`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123` (change in production!)
3. Click "Login"

### Dashboard Overview

The admin dashboard provides six management sections:

1. **Hero Banners** - Homepage slideshow
2. **About Section** - Company information
3. **Services** - Service offerings
4. **Shop Section** - Shop preview content
5. **Latest News** - News articles
6. **Orders** - (Future feature)

## 📝 Managing Content

### Hero Banners

**Purpose**: Create rotating banners on the homepage

**How to Add:**
1. Click "Hero Banners" from dashboard
2. Click "+ Add New Banner"
3. Fill in the form:
   - **Title** (required): Main headline
   - **Subtitle**: Additional text below title
   - **Button Text**: Call-to-action button text
   - **Button Link**: Where button should navigate
   - **Order**: Display order (0 = first)
   - **Background Image**: Upload banner image
   - **Active**: Toggle visibility
4. Click "Create Banner"

**Tips:**
- Use high-quality images (1920x1080 recommended)
- Keep titles concise (under 60 characters)
- Set different order numbers for multiple banners
- Banners auto-rotate every 5 seconds

**Example:**
```
Title: "Premium Aerospace Services"
Subtitle: "Your trusted partner for aviation excellence"
Button Text: "Learn More"
Button Link: "/services"
Order: 0
Active: ✓
```

### About Section

**Purpose**: Tell visitors about your company

**How to Update:**
1. Click "About Section" from dashboard
2. Fill in:
   - **Title**: Section heading
   - **Content**: Full description (can be multi-paragraph)
   - **Image**: Company photo or relevant image
3. Click "Update About Section"

**Tips:**
- Write 2-4 paragraphs
- Include company history, mission, values
- Use professional image
- Update regularly

### Services

**Purpose**: Showcase what you offer

**How to Add:**
1. Click "Services" from dashboard
2. Click "+ Add New Service"
3. Fill in:
   - **Title**: Service name
   - **Description**: What you offer
   - **Order**: Display order
   - **Image**: Service illustration
   - **Active**: Show/hide
4. Click "Create Service"

**How to Edit:**
- Click "Edit" on any service card
- Update information
- Click "Update Service"

**How to Delete:**
- Click "Delete" on service card
- Confirm deletion

**Tips:**
- Add 3-6 services for homepage
- Use clear, descriptive titles
- Include benefits in description
- Use relevant images

### Shop Section

**Purpose**: Promote your parts inventory

**How to Update:**
1. Click "Shop Section" from dashboard
2. Fill in:
   - **Title**: Shop heading
   - **Description**: What you sell
   - **Image**: Product showcase image
3. Click "Update Shop Section"

**Tips:**
- Highlight key product categories
- Include quality/authenticity assurances
- Use attractive product imagery

### Latest News

**Purpose**: Share updates, achievements, industry news

**How to Add:**
1. Click "Latest News" from dashboard
2. Click "+ Add News"
3. Fill in:
   - **Title**: News headline
   - **Content**: Full article
   - **Image**: News image (optional)
   - **Active**: Publish/unpublish
4. Click "Create News"

**How to Edit/Delete:**
- Same as Services section

**Tips:**
- Post regularly (weekly/monthly)
- Use engaging titles
- Include relevant images
- Keep content newsworthy

## 📸 Image Guidelines

### Recommended Sizes
- **Hero Banners**: 1920x1080px (landscape)
- **About Section**: 800x600px (landscape)
- **Services**: 600x400px (landscape)
- **Shop Section**: 800x600px (landscape)
- **News**: 600x400px (landscape)

### File Requirements
- **Format**: JPG, PNG, WebP
- **Max Size**: 5MB per image
- **Naming**: Use descriptive names (e.g., `aircraft-maintenance.jpg`)

### Best Practices
- Use high-quality, professional photos
- Optimize images before upload (compress)
- Ensure images are relevant
- Use consistent style/branding

## 🎨 Design Customization

### Color Scheme
The website uses:
- **Primary**: #0066CC (Blue)
- **Primary Dark**: #0052A3
- **Background**: #FFFFFF (White)
- **Text**: #1A1A1A (Dark Gray)

### Typography
- **Font**: Geist Sans
- **Headings**: Bold, large sizes
- **Body**: Regular weight, readable size

## 📱 Mobile Optimization

The website automatically adapts to:
- **Mobile phones** (< 640px)
- **Tablets** (640px - 1024px)
- **Desktops** (> 1024px)

No additional configuration needed!

## 🔄 Content Update Workflow

### Regular Updates (Recommended)

**Weekly:**
- Check for new news to post
- Review and update service descriptions if needed

**Monthly:**
- Update about section if business changes
- Refresh hero banners for seasonal promotions
- Review all images for relevance

**Quarterly:**
- Audit all content for accuracy
- Update contact information if changed
- Check broken links

## 🆘 Common Tasks

### Change Admin Password

1. Edit `server/.env` file
2. Update `ADMIN_PASSWORD` value
3. Restart backend server
4. Use new password to login

### Add New Admin User

Currently supports single admin. For multiple admins, contact developer for custom implementation.

### Backup Content

**Manual Backup:**
1. Access VPS or server
2. Copy `server/technologywave.db`
3. Copy `server/uploads/` folder
4. Store securely

**Automated Backup:**
Set up daily cron job (see DEPLOYMENT_GUIDE.md)

### Restore Content

1. Stop backend server
2. Replace `technologywave.db` with backup
3. Replace `uploads/` folder with backup
4. Restart backend server

## 📞 Support

For technical support:
- **Email**: info@technology-wave.com
- **Phone**: +44 748 832 1411

## 📚 Additional Resources

- **API Documentation**: http://localhost:8000/docs
- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Tailwind CSS**: https://tailwindcss.com/docs
