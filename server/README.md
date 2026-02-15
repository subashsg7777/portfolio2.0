# Portfolio Backend Deployment Guide

## 🚀 Quick Start

This backend is ready for deployment to **Railway**, **Render**, or **Heroku**.

---

## 📋 Prerequisites

Before deploying, you need:
1. **MongoDB Atlas** account (free tier available)
2. **Deployment platform** account (Railway/Render/Heroku)
3. **GitHub** repository with your code

---

## 🗄️ Step 1: Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster (M0 Free Tier)
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `portfolio`

**Example:**
```
mongodb+srv://subash:myPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## 🚂 Option 1: Deploy to Railway (Recommended)

### Using Railway Dashboard:

1. **Go to [railway.app](https://railway.app)**
2. Click **"Login"** → Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your `portfolio2.0` repository
5. Click **"Add variables"** and configure:

   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://portfolio2-0.vercel.app
   EMAIL_USER=your-email@gmail.com (optional)
   EMAIL_PASS=your-app-password (optional)
   EMAIL_TO=your-email@gmail.com (optional)
   ```

6. **Under Settings:**
   - **Root Directory**: `server`
   - **Start Command**: `npm start` (auto-detected)
   - **Build Command**: `npm install` (auto-detected)

7. Click **"Deploy"**

8. Once deployed, copy your Railway URL (e.g., `https://your-app.up.railway.app`)

### Using Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to server folder
cd server

# Initialize and deploy
railway init
railway up

# Add environment variables
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set FRONTEND_URL="https://portfolio2-0.vercel.app"
railway variables set NODE_ENV="production"
```

---

## 🎨 Option 2: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add **Environment Variables** (same as Railway above)
6. Click **"Create Web Service"**
7. Copy your Render URL (e.g., `https://portfolio-backend.onrender.com`)

---

## 🔧 Step 2: Update Frontend

After backend is deployed, update your Vercel environment variable:

1. Go to **Vercel Dashboard** → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Add or update:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app` (or Render URL)
4. Click **"Save"**
5. Go to **"Deployments"** → Click **"Redeploy"** on latest deployment

---

## ✅ Step 3: Test Your Deployment

Test these endpoints:

```bash
# Health check
curl https://your-backend-url.railway.app/

# Get projects
curl https://your-backend-url.railway.app/api/projects

# Health endpoint
curl https://your-backend-url.railway.app/api/health
```

Expected responses:
- `/` → JSON with status, message, version, timestamp
- `/api/projects` → Array of your projects
- `/api/health` → `{ message: 'Portfolio API is running!' }`

---

## 📧 Email Configuration (Optional)

For contact form to work:

1. **Gmail App Password** (if using Gmail):
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to App Passwords → Generate new password
   - Copy the 16-character password

2. **Add to environment variables:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_TO=where-to-receive-messages@gmail.com
   ```

---

## 🔒 Security Checklist

- ✅ MongoDB Atlas: Whitelist Railway/Render IPs (or allow from anywhere: `0.0.0.0/0`)
- ✅ Environment variables: Never commit `.env` file
- ✅ CORS: Frontend URL added to allowed origins
- ✅ Connection string: Contains correct username/password

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
- Verify connection string format
- Check username/password don't have special characters that need encoding

### "CORS error in frontend"
- Verify `FRONTEND_URL` environment variable is set correctly
- Check frontend URL matches exactly (https/http, no trailing slash)

### "Module not found"
- Make sure `package.json` is in the `server` folder
- Check all dependencies are listed in `dependencies`, not `devDependencies`

---

## 📊 Monitoring

- **Railway**: Built-in logs and metrics in dashboard
- **Render**: Logs tab shows all server output
- **MongoDB Atlas**: Monitor in Atlas dashboard

---

## 🔄 Updating After Changes

```bash
# Make changes to code
git add .
git commit -m "Update backend"
git push

# Railway/Render will auto-redeploy from GitHub
```

---

## 💰 Cost Estimate

- **MongoDB Atlas**: FREE (M0 cluster, 512MB)
- **Railway**: FREE ($5/month credit, ~500 hours)
- **Render**: FREE (spins down after inactivity)
- **Vercel Frontend**: FREE (100GB bandwidth)

**Total: $0/month** 🎉

---

## 📞 Support

If you encounter issues:
1. Check deployment logs in Railway/Render dashboard
2. Test endpoints using curl or Postman
3. Verify all environment variables are set correctly
4. Check MongoDB Atlas connection

---

**Your backend is now production-ready!** 🚀
