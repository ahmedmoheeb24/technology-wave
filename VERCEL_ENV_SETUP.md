# Vercel Environment Variables Setup

## Backend Environment Variables

Go to your backend Vercel project: https://vercel.com/dashboard
Navigate to: **Settings → Environment Variables**

Add the following variables:

### Required Variables:

```bash
# Security - Generate a random secret key
SECRET_KEY=your-super-secret-key-generate-a-random-one

# Database - Neon PostgreSQL (Pooled Connection)
DATABASE_URL=postgresql://neondb_owner:npg_qCgex7Xz9EHl@ep-wispy-forest-a15q48ld-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# CORS - Allow your frontend
ALLOWED_ORIGINS=https://technologywave.vercel.app,http://localhost:3000

# File Upload
UPLOAD_DIR=/tmp/uploads

# App Settings
DEBUG=false
```

### Generate a Secure SECRET_KEY:

**Option 1 - Python:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Option 2 - Online:**
Visit: https://randomkeygen.com/ and use a 256-bit key

**Option 3 - OpenSSL:**
```bash
openssl rand -base64 32
```

---

## Frontend Environment Variables

Go to your frontend Vercel project: https://vercel.com/dashboard
Navigate to: **Settings → Environment Variables**

Add the following variable:

```bash
NEXT_PUBLIC_API_URL=https://technologywave-kgyc.vercel.app
```

**Important:** Don't include a trailing slash!

---

## After Adding Environment Variables

1. **Backend:** Redeploy to apply changes
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"

2. **Frontend:** Redeploy to apply changes
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"

---

## Verify Setup

### Test Backend:
Visit: https://technologywave-kgyc.vercel.app/health

Expected response:
```json
{"status": "healthy"}
```

### Test API Docs:
Visit: https://technologywave-kgyc.vercel.app/docs

### Test Frontend:
Visit: https://technologywave.vercel.app

### Test Admin Login:
Visit: https://technologywave.vercel.app/admin

Login with:
- Username: `admin`
- Password: `admin123` (or whatever you set in ADMIN_PASSWORD)

---

## Database Migration (First Time)

When you first deploy with the new PostgreSQL database, the tables will be created automatically on the first request due to the `init_db()` function in the lifespan event.

The admin user will also be created automatically based on your `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables.

---

## Important Security Notes

⚠️ **Change Default Credentials:**
After deployment, immediately change:
1. `ADMIN_PASSWORD` to a strong, unique password
2. Redeploy the backend after changing

⚠️ **Keep Credentials Secret:**
- Never commit `.env` files to Git (already in `.gitignore`)
- Never share your `SECRET_KEY` or database credentials
- Use Vercel's environment variables for all secrets

---

## Troubleshooting

**Issue:** CORS errors
- **Solution:** Ensure `ALLOWED_ORIGINS` includes `https://technologywave.vercel.app` (no trailing slash)
- Redeploy backend after changing

**Issue:** Database connection errors
- **Solution:** Check `DATABASE_URL` is exactly as provided by Neon
- Ensure `?sslmode=require` is at the end
- Use the pooled connection URL (with `-pooler` in hostname)

**Issue:** Frontend can't reach backend
- **Solution:** Verify `NEXT_PUBLIC_API_URL=https://technologywave-kgyc.vercel.app`
- Redeploy frontend after changing

**Issue:** Admin login not working
- **Solution:** Check backend logs in Vercel dashboard
- Ensure admin user was created (check function logs)
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly

---

## Files Created

✅ `server/.env` - Backend environment variables (for local development)
✅ `client/.env.local` - Frontend environment variables (for local development)

**Note:** These `.env` files are for **local development only**. For Vercel deployment, you must add the variables through the Vercel dashboard.

---

## Quick Copy-Paste for Vercel Dashboard

### Backend (.env format for easy copy-paste):
```
SECRET_KEY=generate-your-own-secret-key-here
DATABASE_URL=postgresql://neondb_owner:npg_qCgex7Xz9EHl@ep-wispy-forest-a15q48ld-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ALLOWED_ORIGINS=https://technologywave.vercel.app,http://localhost:3000
UPLOAD_DIR=/tmp/uploads
DEBUG=false
```

### Frontend (.env format):
```
NEXT_PUBLIC_API_URL=https://technologywave-kgyc.vercel.app
```

---

**Ready to Deploy! 🚀**
