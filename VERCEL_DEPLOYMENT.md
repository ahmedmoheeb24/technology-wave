# Vercel Deployment Guide

This guide will help you deploy both the frontend (Next.js) and backend (FastAPI) to Vercel.

## Prerequisites

- A Vercel account (free tier works fine)
- GitHub/GitLab account with your code repository
- Basic understanding of environment variables

---

## Part 1: Deploy Backend (FastAPI) First

### Step 1: Push Backend to Repository

1. Create a **separate repository** for your backend or use a monorepo structure
2. Make sure your `server/` folder is at the root or adjust paths accordingly

### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select your backend repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `server` (if using monorepo)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

### Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
SECRET_KEY=your-super-secret-random-string-here
DATABASE_URL=sqlite:///./store.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
UPLOAD_DIR=/tmp/uploads
DEBUG=false
```

**Important Notes:**
- Generate a strong `SECRET_KEY` (use: `openssl rand -hex 32`)
- **SQLite limitations on Vercel**: SQLite uses ephemeral storage on Vercel (resets on each deployment). For production, consider:
  - **Neon** (PostgreSQL) - Free tier available
  - **PlanetScale** (MySQL) - Free tier available  
  - **Supabase** (PostgreSQL) - Free tier available
  - **MongoDB Atlas** - Free tier available

### Step 4: Deploy Backend

1. Click **"Deploy"**
2. Wait for deployment to complete
3. Note your backend URL: `https://your-backend-project.vercel.app`
4. Test it by visiting: `https://your-backend-project.vercel.app/health`

---

## Part 2: Deploy Frontend (Next.js)

### Step 1: Update Frontend Configuration

1. Create `.env.local` in your `client/` folder:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

2. Update backend CORS settings:
   - Go to Backend Vercel Project → Settings → Environment Variables
   - Update `ALLOWED_ORIGINS` to include your frontend URL:
   ```
   ALLOWED_ORIGINS=https://your-frontend-project.vercel.app,http://localhost:3000
   ```
   - Redeploy the backend

### Step 2: Import Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select your frontend repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `client` (if using monorepo)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

### Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Wait for deployment to complete
3. Your app is now live at: `https://your-frontend-project.vercel.app`

---

## Part 3: Post-Deployment Setup

### 1. Create Admin User

Since you're using SQLite (which resets on Vercel), you'll need to:

**Option A: Create admin on first run** (if you have migration scripts)
- Access your backend: `https://your-backend-project.vercel.app/docs`
- The admin user should be auto-created based on your `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars

**Option B: Use a persistent database** (Recommended for Production)

For **Neon PostgreSQL** (Free):
1. Sign up at [Neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your backend environment variables:
   ```
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```
5. Update `server/requirements.txt` to use PostgreSQL:
   ```
   psycopg2-binary==2.9.9
   ```
6. Redeploy backend

### 2. Configure File Uploads

⚠️ **Important**: Vercel's `/tmp` storage is ephemeral (files are deleted after function execution).

**For Production File Storage, use:**

- **Cloudinary** (Images/Media) - Free tier: 25GB
- **AWS S3** - Pay as you go
- **Vercel Blob** - Paid service
- **Supabase Storage** - Free tier: 1GB

### 3. Test Your Application

1. Visit your frontend URL
2. Test the admin login at `/admin`
3. Create some products/services
4. Verify everything works end-to-end

---

## Troubleshooting

### Backend Issues

**Error: "Module not found"**
- Ensure all dependencies are in `requirements.txt`
- Redeploy the project

**Error: "Database locked" or "Database file not found"**
- SQLite is not ideal for serverless. Migrate to PostgreSQL/MySQL

**CORS Errors**
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check if URLs have trailing slashes (should not)

### Frontend Issues

**Error: "Failed to fetch"**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is deployed and accessible

**Environment variables not working**
- Ensure variables are prefixed with `NEXT_PUBLIC_`
- Redeploy after adding environment variables

---

## Recommended Production Setup

For a production-ready deployment:

1. **Database**: Use Neon PostgreSQL (free) or PlanetScale MySQL (free)
2. **File Storage**: Use Cloudinary for images (free tier)
3. **Environment Variables**: Set different values for production
4. **Custom Domain**: Add your custom domain in Vercel settings
5. **Monitoring**: Enable Vercel Analytics

---

## Cost Estimate

**Free Tier (Hobby)**:
- Frontend: Free (Vercel)
- Backend: Free (Vercel)
- Database: Free (Neon/PlanetScale)
- File Storage: Free tier (Cloudinary - 25GB)

**Total: $0/month** for small to medium projects

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI on Vercel](https://vercel.com/guides/python-fastapi)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Neon PostgreSQL](https://neon.tech/docs/introduction)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review function logs in Vercel dashboard
3. Test API endpoints using `/docs` on your backend URL

---

**Happy Deploying! 🚀**
