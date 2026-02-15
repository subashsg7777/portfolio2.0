# 🚀 Deploy Backend to Render

Quick guide to deploy your portfolio backend to Render.

---

## **Step 1: Create Render Account**

1. Go to [render.com](https://render.com)
2. Click **"Get Started"** → Sign up with GitHub
3. Authorize Render to access your repositories

---

## **Step 2: Deploy Backend**

### **Option A: Using Dashboard (Recommended)**

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect Account"** if needed, then find your `portfolio2.0` repo
3. Click **"Connect"**

4. **Configure Service:**
   ```
   Name: portfolio-backend
   Region: Oregon (US West)
   Branch: master
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Select Plan:**
   - Choose **"Free"** plan (0.1 CPU, 512 MB RAM)
   - Note: Free services spin down after 15 min of inactivity

6. **Add Environment Variables** (click "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://subashsg7777_db_user:AqjxKqMiw6DlOMgU@cluster0.a0nrawg.mongodb.net/portfolio?retryWrites=true&w=majority
   FRONTEND_URL = https://portfolio2-0.vercel.app
   ```

   **Optional (for contact form):**
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-app-password
   EMAIL_TO = your-email@gmail.com
   ```

7. Click **"Create Web Service"**

8. **Wait for deployment** (2-3 minutes)
   - Watch the logs for "Server is running on port 5000"
   - Your URL will be: `https://portfolio-backend-xxxx.onrender.com`

---

### **Option B: Using render.yaml (Automatic)**

The `render.yaml` file in your repo root will auto-configure everything.

1. Go to Render Dashboard
2. Click **"New +"** → **"Blueprint"**
3. Select your `portfolio2.0` repository
4. Render will detect `render.yaml` and configure automatically
5. Just add the secret environment variables (MONGODB_URI, emails)
6. Click **"Apply"**

---

## **Step 3: Test Backend**

Once deployed, test these endpoints:

```bash
# Replace with your actual Render URL
export BACKEND_URL="https://portfolio-backend-xxxx.onrender.com"

# Health check
curl $BACKEND_URL/

# API health
curl $BACKEND_URL/api/health

# Get projects
curl $BACKEND_URL/api/projects
```

**Expected responses:**
- `/` → JSON with status, version, timestamp ✅
- `/api/health` → `{ message: 'Portfolio API is running!' }` ✅
- `/api/projects` → Array of 4 projects ✅

---

## **Step 4: Update Frontend (Vercel)**

Now connect your deployed backend to the frontend:

1. Go to **Vercel Dashboard** → Your project
2. Click **"Settings"** → **"Environment Variables"**
3. Find `VITE_API_URL` or add it:
   ```
   Name: VITE_API_URL
   Value: https://portfolio-backend-xxxx.onrender.com
   ```
   ⚠️ **Important:** No trailing slash!

4. Click **"Save"**
5. Go to **"Deployments"** tab
6. Click **"⋯"** on latest deployment → **"Redeploy"**
7. Wait for redeployment (~1-2 minutes)

---

## **Step 5: Verify Everything Works**

1. Open your Vercel URL: `https://portfolio2-0.vercel.app`
2. Check **Projects section** - should load 4 projects from Atlas DB
3. Test **Contact Form** - submit a test message
4. Check browser console - no CORS errors ✅

---

## **⚙️ Important Render Settings**

### **Auto-Deploy on Push**
- Enabled by default
- Push to GitHub → Render auto-redeploys

### **Health Checks**
- Path: `/api/health`
- Render pings every few minutes
- Restarts service if unhealthy

### **Free Tier Limitations**
- ⏰ **Spins down after 15 min** of inactivity
- ⏳ **First request takes 30-60 seconds** (cold start)
- 💾 **750 hours/month free**
- 🚫 **No credit card required**

### **Prevent Sleep (Optional)**
Add a cron job to ping your backend every 10 minutes:
- Use [cron-job.org](https://cron-job.org)
- URL: `https://your-backend.onrender.com/api/health`
- Schedule: `*/10 * * * *` (every 10 minutes)

---

## **🔧 MongoDB Atlas Configuration**

Make sure MongoDB Atlas allows Render connections:

1. Go to **MongoDB Atlas Dashboard**
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Choose **"Allow Access from Anywhere"** → `0.0.0.0/0`
5. Click **"Confirm"**

---

## **📊 Monitoring & Logs**

### **View Logs:**
1. Render Dashboard → Your service
2. Click **"Logs"** tab
3. See real-time console output

### **Shell Access:**
1. Click **"Shell"** tab
2. Run commands directly on your server
   ```bash
   node --version
   npm list
   cat package.json
   ```

---

## **🐛 Troubleshooting**

### **"Build failed"**
- Check `server/package.json` exists
- Verify all dependencies are listed
- Check build logs for errors

### **"Cannot connect to MongoDB"**
- Verify `MONGODB_URI` is set correctly in environment variables
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Test connection string format

### **"CORS error in frontend"**
- Verify `FRONTEND_URL` environment variable matches your Vercel URL exactly
- Check no trailing slash in URLs
- Verify CORS regex in `server/index.js` includes `.vercel.app$`

### **"Service keeps sleeping"**
- This is normal on free tier
- First request after sleep takes 30-60 seconds
- Consider using cron-job to keep alive (see above)

---

## **🔄 Update Backend After Changes**

```bash
# Make changes to server code
git add server/
git commit -m "Update backend"
git push

# Render automatically redeploys from GitHub
# Watch logs in Render Dashboard
```

---

## **💰 Pricing**

- **Free Tier**: $0/month
  - 750 hours/month
  - Spins down after inactivity
  - Perfect for portfolios

- **Starter**: $7/month
  - Always-on
  - No cold starts
  - Better performance

---

## **✅ Deployment Checklist**

- [x] Backend code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Render account created
- [ ] Web service deployed on Render
- [ ] Environment variables added (MONGODB_URI, FRONTEND_URL)
- [ ] MongoDB Atlas network access configured (0.0.0.0/0)
- [ ] Backend tested (health, projects endpoints)
- [ ] VITE_API_URL updated in Vercel
- [ ] Frontend redeployed
- [ ] Full app tested (projects load, contact form works)

---

## **🎉 Success!**

Your backend should now be:
- ✅ Deployed on Render (Free tier)
- ✅ Connected to MongoDB Atlas
- ✅ Serving API to Vercel frontend
- ✅ Auto-deploying on Git push

**Backend URL:** `https://portfolio-backend-xxxx.onrender.com`
**Frontend URL:** `https://portfolio2-0.vercel.app`

---

## **📞 Support Resources**

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

**Need help? Check the logs first, then review this guide!** 🚀
