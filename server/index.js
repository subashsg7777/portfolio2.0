const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const { sendContactEmail, sendConfirmationEmail } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://192.168.52.204:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
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

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
