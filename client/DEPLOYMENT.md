# Portfolio Frontend - Deployment Ready 🚀

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🔧 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Create Environment File:**
   Copy `.env.example` to `.env` and update the API URL:
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

   Server runs at: `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

Build output: `dist/` directory

## 👀 Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your backend API URL (e.g., `https://your-backend.onrender.com`)
7. Click "Deploy"

## 📦 Environment Variables

Create `.env` file with:

```env
VITE_API_URL=https://your-backend-api-url.com
```

**For Vercel:** Add this in Project Settings → Environment Variables

## 🎨 Features

- ✅ Cyber-tech 3D mesh network animation
- ✅ Dynamic project showcase with icons
- ✅ Responsive design
- ✅ Contact form with email integration
- ✅ Admin panel for adding projects
- ✅ Smooth animations with Framer Motion
- ✅ Three.js 3D graphics

## 📁 Project Structure

```
client/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── vercel.json      # Vercel configuration
├── .env.example     # Example environment file
└── package.json     # Dependencies
```

## 🔗 Backend Setup Required

Your frontend expects a backend API at the URL specified in `VITE_API_URL`.

Backend endpoints needed:
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Add new project (admin)
- `POST /api/contact` - Send contact form email

## 🐛 Troubleshooting

**Projects not loading:**
- Check if backend server is running
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors

**Build errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear cache: `npm cache clean --force`

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API URL updated
- [ ] Build runs successfully (`npm run build`)
- [ ] Backend deployed and running
- [ ] CORS configured on backend for frontend domain
- [ ] All API endpoints working

## 🎉 Your Portfolio is Ready!

Live URL after deployment: `https://your-portfolio.vercel.app`

---

Built with ❤️ using React + Vite + Three.js + Tailwind CSS
