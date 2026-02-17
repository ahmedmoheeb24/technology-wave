# 🔧 Quick Fix Guide - Admin Login Issue

## Problem
You're getting connection errors when trying to login to the admin dashboard:
- Frontend trying to connect to `localhost:8000` (wrong)
- Backend returning 500 errors (missing/incorrect environment variables)

## Solution - Step by Step

### 🎯 Step 1: Fix Backend Environment Variables (Vercel)

1. Go to your **backend** Vercel project: `technologywave-kgyc`
2. Navigate to: **Settings** → **Environment Variables**
3. Add/Update these variables for **Production, Preview, and Development**:

```bash
SECRET_KEY=your-super-secret-key-minimum-32-characters-long-change-this
DATABASE_URL=postgresql://neondb_owner:npg_qCgex7Xz9EHl@ep-wispy-forest-a15q48ld-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ALLOWED_ORIGINS=https://technologywave.vercel.app,http://localhost:3000,http://localhost:3001
UPLOAD_DIR=/tmp/uploads
DEBUG=False
```

4. **Redeploy** the backend after adding these variables

### 🎯 Step 2: Fix Frontend Environment Variables (Vercel)

1. Go to your **frontend** Vercel project: `technologywave`
2. Navigate to: **Settings** → **Environment Variables**
3. Add this variable for **Production, Preview, and Development**:

```bash
NEXT_PUBLIC_API_URL=https://technologywave-kgyc.vercel.app
```

4. **Redeploy** the frontend after adding this variable

### 🎯 Step 3: Verify the Fix

After redeploying both projects:

1. **Check backend health**:
   - Visit: https://technologywave-kgyc.vercel.app/health
   - Should return: `{"status": "healthy"}`

2. **Check frontend**:
   - Visit: https://technologywave.vercel.app/admin
   - Login with: `admin` / `admin123`

## 📋 Checklist

- [ ] Backend environment variables added in Vercel
- [ ] Backend redeployed
- [ ] Frontend environment variable added in Vercel
- [ ] Frontend redeployed
- [ ] Backend health check passes
- [ ] Admin login works

## 🚨 Important Notes

### Secret Key
Generate a secure SECRET_KEY (minimum 32 characters):
```bash
# You can use this command or generate your own:
openssl rand -hex 32
```

### CORS Security
The `ALLOWED_ORIGINS` must match exactly (no trailing slashes):
- ✅ `https://technologywave.vercel.app`
- ❌ `https://technologywave.vercel.app/`

### Environment Variable Scope
When adding variables in Vercel, select all three environments:
- ✅ Production
- ✅ Preview  
- ✅ Development

## 🔍 Troubleshooting

### Still getting "Failed to fetch"?
1. Open browser DevTools (F12)
2. Check Console for the actual API URL being called
3. If it still shows `localhost:8000`, clear your browser cache and hard reload (Ctrl+Shift+R)

### Backend 500 errors?
1. Check Vercel backend logs: https://vercel.com/dashboard → technologywave-kgyc → Deployments → (latest) → Logs
2. Look for errors related to:
   - Missing SECRET_KEY
   - Database connection issues
   - CORS errors

### CORS errors in browser console?
1. Verify `ALLOWED_ORIGINS` in backend includes your frontend URL
2. Ensure no trailing slashes in the URL
3. Redeploy backend after changing

## 📞 Need More Help?

If you're still having issues after following these steps, check:
1. Backend logs in Vercel dashboard
2. Browser console for specific error messages
3. Network tab in DevTools to see the actual request/response
