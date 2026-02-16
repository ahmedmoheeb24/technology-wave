# Vercel Deployment - Quick Guide

## Backend (FastAPI/Python)

### Vercel Project Settings:
- **Framework Preset**: Other
- **Root Directory**: `server`
- **Build Command**: Leave **EMPTY** (Vercel auto-detects Python)
- **Output Directory**: Leave **EMPTY**
- **Install Command**: Leave **EMPTY** (auto-detected from requirements.txt)

### Environment Variables (Required):
```
SECRET_KEY=your-super-secret-key-generate-a-random-one
DATABASE_URL=/tmp/store.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
DEBUG=false
```

**Generate SECRET_KEY**: Use an online generator or run:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## Frontend (Next.js)

### Vercel Project Settings:
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `client`
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### Environment Variables (Required):
```
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

**Note**: Replace `your-backend-project` with your actual backend Vercel URL after deploying the backend first.

---

## Deployment Order

### Step 1: Deploy Backend First
1. Create a new Vercel project
2. Import your repository
3. Select `server` as root directory
4. Add environment variables (see above)
5. Deploy
6. Copy the backend URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Update Backend CORS
1. Go to backend project → Settings → Environment Variables
2. Update `ALLOWED_ORIGINS` to include your frontend URL:
   ```
   ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
   ```
3. Redeploy backend

### Step 3: Deploy Frontend
1. Create another new Vercel project
2. Import the same repository
3. Select `client` as root directory
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
   ```
5. Deploy
6. Your app is now live!

---

## Testing Your Deployment

### Backend Health Check:
Visit: `https://your-backend.vercel.app/health`

Expected response:
```json
{"status": "healthy"}
```

### Backend API Docs:
Visit: `https://your-backend.vercel.app/docs`

### Frontend:
Visit: `https://your-frontend.vercel.app`

### Admin Login:
Visit: `https://your-frontend.vercel.app/admin`

---

## Important Notes

⚠️ **SQLite on Vercel is EPHEMERAL**
- Data resets on each deployment
- Use for testing only
- For production, use PostgreSQL (Neon/Supabase) or MySQL (PlanetScale)

⚠️ **File Uploads on Vercel**
- Files stored in `/tmp` are temporary
- For production, use Cloudinary, AWS S3, or Vercel Blob

---

## Common Issues

**"Module not found" error**
- Make sure all dependencies are in `requirements.txt`
- Redeploy the project

**CORS errors**
- Verify backend `ALLOWED_ORIGINS` includes frontend URL
- No trailing slashes in URLs
- Redeploy backend after changing CORS settings

**"Failed to fetch" from frontend**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Ensure it starts with `https://`
- Redeploy frontend after changing env vars

**Database errors**
- SQLite resets on deployment - this is normal on Vercel
- Consider using a persistent database for production

---

## Quick Commands Summary

| Action | Backend | Frontend |
|--------|---------|----------|
| **Build Command** | Leave Empty | `npm run build` |
| **Output Directory** | Leave Empty | `.next` |
| **Install Command** | Leave Empty | `npm install` |
| **Root Directory** | `server` | `client` |

---

**Need Help?** Check the deployment logs in Vercel dashboard for detailed error messages.
