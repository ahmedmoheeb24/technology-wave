# Admin Dashboard Guide

## 🔐 Admin Access

### Login Credentials
- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in `client/app/admin/page.jsx` for production use.

---

## 📊 Dashboard Overview

After logging in, you'll see the main dashboard at `/admin/dashboard` with:
- Statistics overview (Products, Services, Hero Slides count)
- Quick access cards to all management sections

---

## 🛍️ Managing Products

**Path**: `/admin/dashboard/products`

### Adding a Product
1. Click **"+ Add Product"** button
2. Fill in the form:
   - **Product Title**: Name of your product
   - **Category**: Select from dropdown (Electronics, Fashion, Home, Sports, Accessories, Travel, Wearables)
   - **Price**: Enter price (e.g., $99)
   - **Product Image**: Upload an image file
3. Click **"Add Product"**

### Editing a Product
1. Find the product in the list
2. Click **"Edit"** button
3. Update the fields
4. Click **"Update Product"**

### Deleting a Product
1. Find the product in the list
2. Click **"Delete"** button
3. Confirm deletion

**Note**: Products are automatically displayed on:
- Homepage (first 8 products)
- `/products` page (all products with category filter)

---

## 🎯 Managing Services

**Path**: `/admin/dashboard/services`

### Adding a Service
1. Click **"+ Add Service"** button
2. Fill in the form:
   - **Icon**: Use emoji (e.g., 🚚 🔒 ↩️ 💬 ✨ 🎁)
   - **Service Title**: Name of the service
   - **Description**: Brief description
3. Click **"Add Service"**

### Editing/Deleting Services
- Same process as products

**Note**: Services are displayed on:
- Homepage (first 6 services)
- `/services` page (all services)

---

## 🎨 Managing Hero Banners

**Path**: `/admin/dashboard/hero`

### Adding a Hero Slide
1. Click **"+ Add Slide"** button
2. Fill in the form:
   - **Title**: Main heading (e.g., "Welcome to Our Store")
   - **Subtitle**: Secondary heading (e.g., "Discover Amazing Products")
   - **Description**: Short description
   - **Button Text**: CTA button text (e.g., "Shop Now")
   - **Button Link**: Where the button should link (e.g., #products, /products)
   - **Background Gradient**: Choose from predefined gradients
   - **Background Image** (Optional): Upload a background image
3. Click **"Add Slide"**

### Features
- Auto-playing carousel (5-second intervals)
- Navigation arrows
- Slide indicators
- Background image support with gradient overlay

**Note**: Hero slides are displayed on the homepage at the top.

---

## 🖼️ Managing About Section Image

**Path**: `/admin/dashboard/about`

### Uploading About Image
1. Click **"Choose Image"** button
2. Select an image file
3. Preview the image
4. Click **"Save Image"**

### Removing About Image
1. Click **"Remove Image"** button
2. Confirm removal

**Note**: 
- The image appears on the `/about` page
- Recommended size: 800x600px
- If no image is uploaded, a default placeholder is shown

---

## 💾 Data Storage

### How It Works
- All data is stored in **browser's localStorage**
- Data persists across browser sessions
- Data is specific to each browser/device

### Storage Keys
- `adminLoggedIn`: Authentication status
- `adminProducts`: Product data
- `adminServices`: Service data
- `adminHeroSlides`: Hero banner slides
- `adminAboutImage`: About section image

### Backup Your Data
To backup your data:
1. Open browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage"
4. Copy the values of the admin keys

### Restore Data
1. Open browser DevTools
2. Go to "Console" tab
3. Paste and run:
```javascript
localStorage.setItem('adminProducts', 'YOUR_BACKUP_DATA_HERE')
```

---

## 🚀 Going Live

### Important Steps Before Production

1. **Change Admin Credentials**
   - Edit `client/app/admin/page.jsx`
   - Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`

2. **Secure the Admin Panel**
   - Consider implementing proper backend authentication
   - Use environment variables for credentials
   - Add rate limiting to prevent brute force attacks

3. **Database Integration**
   - Current setup uses localStorage (client-side only)
   - For production, integrate with a database (MongoDB, PostgreSQL, etc.)
   - Set up API routes for CRUD operations

4. **Image Hosting**
   - Upload images to a CDN or cloud storage (Cloudinary, AWS S3, etc.)
   - Store only URLs in the database

---

## 🔧 Troubleshooting

### Can't Login?
- Clear browser cache and localStorage
- Check credentials in `client/app/admin/page.jsx`

### Data Not Showing?
- Check browser console for errors
- Verify localStorage has data
- Try refreshing the page

### Images Not Loading?
- Check if image file size is reasonable (< 5MB recommended)
- Ensure browser supports the image format
- Check browser console for errors

---

## 📱 Features Overview

### ✅ What's Included
- Product management with image upload
- Service management
- Hero banner slider with image support
- About section image management
- Real-time preview
- Responsive admin interface
- Authentication system
- Data persistence with localStorage

### 🎨 Frontend Integration
- All frontend components automatically load admin data
- Fallback to default data if no admin data exists
- Real-time updates (refresh page to see changes)

---

## 🎯 Next Steps

### Recommended Enhancements
1. Add user roles and permissions
2. Implement proper backend API
3. Add image optimization
4. Add bulk upload functionality
5. Add export/import data functionality
6. Add analytics dashboard
7. Add email notifications
8. Add inventory management

---

## 📞 Support

For issues or questions:
- Check this guide first
- Review browser console for errors
- Clear cache and try again

---

**Last Updated**: February 2026
