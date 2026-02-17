# Vercel Deployment Fix Guide

## Issue Fixed
The serverless function was crashing on Vercel with `FUNCTION_INVOCATION_FAILED` error.

## Root Cause
The backend was failing to start because:
1. Missing or incorrect `DATABASE_URL` environment variable
2. The app was crashing during initialization instead of handling errors gracefully
3. SQLite database path was not configured for Vercel's `/tmp` directory

## Changes Made

### 1. Updated `server/api/index.py`
- Added comprehensive error handling to prevent crashes during startup
- App now starts even if database initialization fails
- Added detailed health check endpoint showing configuration status
- Added traceback logging for debugging

### 2. Updated `server/app/core/config.py`
- Fixed DATABASE_URL handling to use `/tmp/store.db` on Vercel for SQLite
- Added support for `postgres://` URL format (converts to `postgresql://`)
- Better error handling for missing environment variables

## Next Steps - Configure Vercel Environment Variables

### Option 1: Use PostgreSQL (Recommended for Production)

1. **Go to your backend Vercel project dashboard:**
   https://vercel.com/dashboard → Select your project → Settings → Environment Variables

2. **Add these environment variables:**
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_qCgex7Xz9EHl@ep-wispy-forest-a15q48ld-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   SECRET_KEY=generate-a-secure-random-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ALLOWED_ORIGINS=https://technologywave.vercel.app,http://localhost:3000
   UPLOAD_DIR=/tmp/uploads
   DEBUG=false
   ```

3. **Generate a secure SECRET_KEY:**
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

4. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on the latest deployment
   - Select "Redeploy"

### Option 2: Use SQLite (For Testing Only)

**⚠️ WARNING:** SQLite on Vercel uses ephemeral `/tmp` storage. Data will be lost between deployments and cold starts!

1. **Add minimal environment variables:**
   ```
   SECRET_KEY=generate-a-secure-random-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ALLOWED_ORIGINS=https://technologywave.vercel.app,http://localhost:3000
   UPLOAD_DIR=/tmp/uploads
   ```

2. **Redeploy** as described above.

## Verify the Fix

### 1. Check Root Endpoint
Visit: https://technologywave-kgyc.vercel.app/

Expected response:
```json
{
  "message": "Store Admin API",
  "version": "1.0.0",
  "docs": "/docs",
  "config_loaded": true,
  "environment": "vercel"
}
```

### 2. Check Health Endpoint
Visit: https://technologywave-kgyc.vercel.app/health

Expected response:
```json
{
  "status": "healthy",
  "config_loaded": true,
  "database_url_set": true,
  "vercel_env": true
}
```

### 3. Check API Documentation
Visit: https://technologywave-kgyc.vercel.app/docs

You should see the interactive API documentation.

## Troubleshooting

### Still Getting 500 Error?
1. Check Vercel function logs:
   - Go to your project dashboard
   - Click "Deployments" → Select latest deployment
   - Click "Functions" tab
   - Check the logs for error messages

2. Ensure environment variables are set correctly:
   - Go to Settings → Environment Variables
   - Verify all required variables are present
   - Check for typos in variable names

### Database Connection Errors?
- **PostgreSQL:** Verify the DATABASE_URL is exactly as provided by Neon
- **SQLite:** This is normal on first deployment - data resets on each cold start

### CORS Errors?
- Ensure `ALLOWED_ORIGINS` includes your frontend URL without trailing slash
- Example: `https://technologywave.vercel.app` (not `https://technologywave.vercel.app/`)

## Important Notes

1. **PostgreSQL is Required for Production:** Use Neon, Supabase, or another cloud PostgreSQL provider
2. **File Uploads:** Files uploaded to `/tmp` are ephemeral and will be lost. Use cloud storage (S3, Cloudinary, etc.) for production
3. **Environment Variables:** Must be set through Vercel dashboard, not in code
4. **Redeployment:** Required after changing environment variables

## Success Indicators

✅ Backend URL returns JSON (not 500 error)
✅ Health check shows `"status": "healthy"`
✅ API docs are accessible at `/docs`
✅ Frontend can connect to backend API

---

**Need Help?**
- Check the Vercel function logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure you've redeployed after making changes
