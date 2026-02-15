# Portfolio Projects System - Setup Guide

## What's New

Your portfolio projects section is now **dynamic with MongoDB**! All projects are stored in a database and fetched dynamically.

## Changes Made

### 1. **Database Setup**
- Created `server/models/Project.js` - Mongoose model for projects
- Updated `server/index.js` - Added MongoDB connection and `/api/projects` endpoint
- Created `server/scripts/seedProjects.js` - Script to populate the database with projects

### 2. **Frontend Updates**
- Updated `client/src/components/Projects.jsx` - Fetches projects from API instead of hardcoded data
- Added loading and error states with user-friendly messages

### 3. **Configuration**
- Updated `env.example` - Added `MONGODB_URI` configuration
- Updated `package.json` - Added mongoose dependency and seed script

### 4. **Projects Added**
The system now includes 4 projects:
1. **G-Mart** - React Based E-Commerce Platform (existing)
2. **Servify** - MERN Based Auction Platform (existing)
3. **SG_Disposals** - Comprehensive Waste Management Platform (NEW)
4. **BOLT & BROOK** - Full-Stack E-Commerce Platform (NEW)

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

This installs mongoose and other required packages.

### Step 2: Configure MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. In `.env` file (create if doesn't exist), add:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a cluster and database user
3. Get your connection string
4. In `.env` file, add your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Step 3: Seed the Database
```bash
npm run seed
```

This populates your database with all 4 projects.

### Step 4: Start the Application
```bash
npm run dev
```

This starts both the Node.js server and React client.

## API Endpoint

**GET `/api/projects`** - Returns all projects from MongoDB

Response format:
```json
[
  {
    "_id": "...",
    "id": 0,
    "title": "G-Mart",
    "subtitle": "React Based E-Commerce Platform",
    "period": "2024 - Present",
    "description": "...",
    "image": "/project-gmart.svg",
    "technologies": ["React", "Node.js", ...],
    "features": [...],
    "github": "https://github.com/...",
    "demo": "#",
    "icon": "FaShoppingCart",
    "color": "from-blue-500 to-cyan-500"
  },
  ...
]
```

## How It Works

1. **Frontend** (`Projects.jsx`):
   - Fetches projects from `/api/projects` on component mount
   - Displays loading spinner while fetching
   - Shows error message if API fails
   - Dynamically renders project tabs and details

2. **Backend** (`server/index.js`):
   - Connects to MongoDB when server starts
   - Provides `/api/projects` endpoint that queries the database
   - Returns projects sorted by ID

3. **Database** (`server/models/Project.js`):
   - Mongoose schema with all project fields
   - Validates data structure

## Troubleshooting

### "Failed to load projects" error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env` file
- Check server console for connection errors

### Projects not showing up
- Run `npm run seed` to populate the database
- Check MongoDB connection is active
- Verify projects exist in database

### Adding New Projects
Edit `server/scripts/seedProjects.js` to add projects, then run:
```bash
npm run seed
```

Or manually add to MongoDB using a GUI tool like MongoDB Compass.

## File Structure

```
portfolio/
├── server/
│   ├── models/
│   │   └── Project.js          (NEW - Mongoose model)
│   ├── scripts/
│   │   └── seedProjects.js     (NEW - Database seeding)
│   └── index.js                (UPDATED - API endpoint)
├── client/
│   └── src/
│       └── components/
│           └── Projects.jsx    (UPDATED - Dynamic fetching)
├── env.example                 (UPDATED - MongoDB config)
├── package.json                (UPDATED - Dependencies & scripts)
└── README.md
```

## Next Steps

- Customize project details directly in MongoDB
- Add edit/delete functionality via admin panel
- Implement project filtering by technology
- Add pagination for large project lists
