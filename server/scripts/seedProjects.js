const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('../models/Project');

const projectsData = [
  {
    id: 0,
    title: "G-Mart",
    subtitle: "React Based E-Commerce Platform",
    period: "2024 - Present",
    description: "A full-stack e-commerce platform built with the MERN stack, featuring user authentication, product management, and a smooth shopping experience.",
    image: "/project-gmart.svg",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "User Authentication & Authorization",
      "Product Management System",
      "Advanced Search & Filtering",
      "Shopping Cart Functionality",
      "Product Reviews & Ratings",
      "Category-based Organization",
      "Responsive Design"
    ],
    github: "https://github.com/subashsg7777",
    demo: "#",
    icon: "FaShoppingCart",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 1,
    title: "Servify",
    subtitle: "MERN Based Auction Platform",
    period: "2025 - Present",
    description: "A comprehensive bidding platform that connects clients with skilled professionals through real-time bidding and automated notifications.",
    image: "/project-servify.svg",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Real-time Communication"],
    features: [
      "Real-time Bidding System",
      "User Authentication & OTP Verification",
      "Project Posting & Management",
      "Automated Email Notifications",
      "Professional Profile Management",
      "Bid Tracking & History",
      "Secure Payment Integration"
    ],
    github: "https://github.com/subashsg7777",
    demo: "#",
    icon: "FaGavel",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "SG_Disposals",
    subtitle: "Comprehensive Waste Management Platform",
    period: "2025 - Present",
    description: "A comprehensive waste management platform that empowers clients to schedule eco-friendly disposal services with real-time tracking, secure verification, and automated notifications.",
    image: "/project-sgdisposals.svg",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "Real-time Communication"],
    features: [
      "Service Booking & Scheduling",
      "Real-time Disposal Tracking",
      "User Authentication & OTP Verification",
      "Automated Email Notifications",
      "Eco-Friendly Recycling Management",
      "Customer Profile & History Management",
      "Secure Payment Integration",
      "Location-based Pincode-to-State Conversion",
      "GST-Compliant Tax Calculations"
    ],
    github: "https://github.com/subashsg7777",
    demo: "#",
    icon: "FaRecycle",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "BOLT & BROOK",
    subtitle: "Full-Stack E-Commerce Platform",
    period: "2024 - 2025",
    description: "Developed a full-stack e-commerce platform for selling dresses, featuring a seamless shopping experience and integrated Razorpay payment gateway (test mode).",
    image: "/project-boltbrook.svg",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Razorpay Payment Gateway"],
    features: [
      "Product Listing & Categorization",
      "Shopping Cart & Checkout Flow",
      "User Authentication & Secure Login",
      "Razorpay Payment Integration (Test Mode)",
      "Order Management & Tracking",
      "Responsive UI/UX Design",
      "Admin Dashboard for Product & Inventory Management"
    ],
    github: "https://github.com/subashsg7777",
    demo: "#",
    icon: "FaShoppingBag",
    color: "from-pink-500 to-rose-500"
  }
];

const seedProjects = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const inserted = await Project.insertMany(projectsData);
    console.log(`Successfully seeded ${inserted.length} projects`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProjects();
