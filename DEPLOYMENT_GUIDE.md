# Technology Wave - Deployment Guide

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change admin username and password in `server/.env`
- [ ] Generate new SECRET_KEY for production
- [ ] Update CORS_ORIGINS to include production domains
- [ ] Enable HTTPS for all production domains
- [ ] Review file upload size limits

### Configuration
- [ ] Set production API URL in frontend `.env`
- [ ] Configure domain DNS settings
- [ ] Set up SSL certificates

## 🖥️ Backend Deployment (VPS)

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.8+
sudo apt install python3 python3-pip python3-venv -y

# Install nginx
sudo apt install nginx -y
```

### 2. Application Setup

```bash
# Clone repository
git clone <your-repo-url>
cd technologywave/server

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
nano .env  # Update with production values
```

### 3. Configure Systemd Service

Create `/etc/systemd/system/technologywave.service`:

```ini
[Unit]
Description=Technology Wave API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/technologywave/server
Environment="PATH=/path/to/technologywave/server/venv/bin"
ExecStart=/path/to/technologywave/server/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable technologywave
sudo systemctl start technologywave
sudo systemctl status technologywave
```

### 4. Configure Nginx

Create `/etc/nginx/sites-available/technologywave-api`:

```nginx
server {
    listen 80;
    server_name api.technology-wave.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        alias /path/to/technologywave/server/uploads/;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/technologywave-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.technology-wave.com
```

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended for Preview)

```bash
cd client

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables in Vercel:**
- `NEXT_PUBLIC_API_URL`: `https://api.technology-wave.com`
- `NEXT_PUBLIC_SITE_URL`: `https://technology-wave.vercel.app`

### Option 2: Cloudflare Pages (Production)

1. **Connect Repository**
   - Go to Cloudflare Pages dashboard
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `client`
   - Framework preset: `Next.js`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://api.technology-wave.com
   NEXT_PUBLIC_SITE_URL=https://www.technology-wave.com
   ```

4. **Custom Domain**
   - Add `www.technology-wave.com`
   - Add `technology-wave.com` (redirect to www)
   - Cloudflare will handle SSL automatically

### Option 3: Self-Hosted on VPS

```bash
cd client
npm run build

# Using PM2
npm install -g pm2
pm2 start npm --name "technologywave-frontend" -- start
pm2 save
pm2 startup
```

**Nginx config** `/etc/nginx/sites-available/technologywave-web`:

```nginx
server {
    listen 80;
    server_name www.technology-wave.com technology-wave.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔄 DNS Configuration

### A Records (VPS Deployment)
```
Type: A
Name: @
Value: <your-vps-ip>

Type: A
Name: www
Value: <your-vps-ip>

Type: A
Name: api
Value: <your-vps-ip>
```

### CNAME Records (Cloudflare Pages)
```
Type: CNAME
Name: www
Value: <cloudflare-pages-url>

Type: CNAME
Name: @
Value: www.technology-wave.com
```

## 📊 Post-Deployment

### 1. Test API
```bash
curl https://api.technology-wave.com/health
```

### 2. Test Frontend
Visit https://www.technology-wave.com

### 3. Test Admin Login
Visit https://www.technology-wave.com/admin

### 4. Upload Test Content
- Login to admin dashboard
- Add a hero banner
- Add a service
- Add a news item
- Verify images upload correctly

## 🔧 Maintenance

### Update Backend
```bash
cd /path/to/technologywave/server
git pull
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart technologywave
```

### Update Frontend (Vercel/Cloudflare)
- Push to main branch
- Automatic deployment

### Backup Database
```bash
cp /path/to/technologywave/server/technologywave.db \
   /path/to/backups/technologywave-$(date +%Y%m%d).db
```

### View Logs
```bash
# Backend logs
sudo journalctl -u technologywave -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🚨 Troubleshooting

### Backend not starting
```bash
sudo systemctl status technologywave
sudo journalctl -u technologywave -n 50
```

### Permission issues
```bash
sudo chown -R www-data:www-data /path/to/technologywave/server/uploads
sudo chmod -R 755 /path/to/technologywave/server/uploads
```

### CORS errors
- Check `CORS_ORIGINS` in `server/.env`
- Ensure frontend URL is included

### Image upload fails
- Check file permissions
- Verify `client_max_body_size` in nginx
- Check upload directory exists

## 📈 Performance Optimization

### Backend
- Use Gunicorn with multiple workers
- Enable nginx caching
- Compress responses

### Frontend
- Enable Next.js image optimization
- Use CDN for static assets
- Enable gzip compression

## 🔐 Security Best Practices

1. **Firewall**: Only open ports 80, 443, 22
2. **SSH**: Use key-based authentication
3. **Regular Updates**: Keep system and dependencies updated
4. **Monitoring**: Set up uptime monitoring
5. **Backups**: Daily database backups
6. **Rate Limiting**: Implement on API endpoints
7. **File Validation**: Validate uploaded file types and sizes
