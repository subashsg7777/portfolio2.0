const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const { sendContactEmail, sendConfirmationEmail } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  'https://portfolio2-0.vercel.app',
  /\.vercel\.app$/  // Allow all Vercel preview deployments
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

console.log('🔄 Starting MongoDB connection...');
console.log('URI:', mongoUri.replace(/:[^:]*@/, ':****@')); // Log masked URI

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  retryReads: true,
  w: 'majority',
  family: 4 // Force IPv4
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('Full error:', err);
    // Don't exit, allow graceful degradation
  });

// Monitor connection
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose disconnected from MongoDB');
});

// Routes
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    message: 'Portfolio API is running!',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch projects',
      message: error.message
    });
  }
});

// Admin: Add new project
app.post('/api/admin/projects', async (req, res) => {
  try {
    const projectData = req.body;
    
    // Validate required fields
    const requiredFields = ['id', 'title', 'subtitle', 'period', 'description', 'image', 'technologies', 'features', 'github', 'demo', 'icon', 'color'];
    const missingFields = requiredFields.filter(field => !projectData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Check if project with same ID already exists
    const existingProject = await Project.findOne({ id: projectData.id });
    if (existingProject) {
      return res.status(400).json({ 
        error: 'A project with this ID already exists. Please use a different ID.' 
      });
    }

    // Create new project
    const newProject = new Project(projectData);
    await newProject.save();

    res.status(201).json({ 
      success: true, 
      message: 'Project added successfully!',
      project: newProject
    });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ 
      error: 'Failed to add project',
      details: error.message 
    });
  }
});

// Admin: Get next available project ID
app.get('/api/admin/next-project-id', async (req, res) => {
  try {
    const lastProject = await Project.findOne().sort({ id: -1 });
    const nextId = lastProject ? lastProject.id + 1 : 0;
    res.json({ nextId });
  } catch (error) {
    console.error('Error getting next project ID:', error);
    res.status(500).json({ error: 'Failed to get next project ID' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  // Message length validation
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters long' });
  }

  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not configured. Logging submission instead.');
      console.log('Contact form submission:', { name, email, message });
      return res.json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      });
    }

    // Send contact email to admin
    await sendContactEmail(name, email, message);
    
    // Send confirmation email to sender
    await sendConfirmationEmail(name, email);

    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon. A confirmation email has been sent to your inbox.' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Health check for deployment platforms
app.get('/', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'Portfolio API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB: ${mongoUri.includes('localhost') ? 'Local' : 'Cloud'}`);
});
