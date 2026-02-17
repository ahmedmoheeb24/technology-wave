# Frontend Environment Setup for Vercel

## Critical: Set Environment Variable in Vercel

Your frontend needs to know where the backend API is located. Follow these steps:

### Step 1: Configure Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Select your **FRONTEND** project (technologywave)
3. Go to **Settings** → **Environment Variables**
4. Add this variable:

```
Name: NEXT_PUBLIC_API_URL
Value: https://technologywave-kgyc.vercel.app
Environment: Production, Preview, Development (check all)
```

5. Click **Save**

### Step 2: Redeploy Frontend

After adding the environment variable:

1. Go to **Deployments** tab
2. Click "..." menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (~1-2 minutes)

### Step 3: Test

After redeployment, visit:
- https://technologywave.vercel.app/admin
- Try logging in with your admin credentials

## Current Status

✅ Backend is working: https://technologywave-kgyc.vercel.app/
❌ Frontend can't connect because environment variable is not set in Vercel

## Why This Is Needed

The frontend (Next.js) needs to know the backend URL at **build time**. Environment variables in `.env.production` are only used during local builds. For Vercel deployments, you must set them in the Vercel dashboard.

## Alternative: Update Without Redeploying

If you don't want to set environment variables, I can modify the code to auto-detect the backend URL based on the current domain.
