# Subash A - Portfolio Website

A modern, responsive portfolio website built with **Vite + React**, Tailwind CSS, and Express.js. This portfolio showcases the work and skills of Subash A, a React Frontend Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Interactive**: Smooth scrolling, hover effects, and transitions
- **Contact Form**: Working contact form with backend integration
- **Project Showcase**: Detailed project descriptions with live demos
- **Skills Section**: Comprehensive skills overview with progress bars
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Fast Development**: Vite-powered with instant hot module replacement

## 🛠️ Tech Stack

### Frontend
- **Vite** - Lightning-fast build tool and dev server
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemailer** - Email functionality (ready for implementation)

## 📁 Project Structure

```
portfolio/
├── client/                 # Vite + React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components (.jsx)
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # Vite HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── postcss.config.js  # PostCSS configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
├── server/                # Express backend
│   └── index.js          # Server configuration
├── package.json          # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the development server**
   ```bash
   # Start both frontend (Vite) and backend
   npm run dev
   
   # Or start individually
   npm run client  # Vite dev server (port 3000)
   npm run server  # Express server (port 5000)
   ```

4. **Open your browser**
   - Frontend (Vite): http://localhost:3000
   - Backend API: http://localhost:5000

### Vite Benefits
- ⚡ **Lightning fast** cold start and hot module replacement
- 🔥 **Instant updates** without losing state
- 📦 **Optimized builds** with automatic code splitting
- 🛠️ **Better developer experience** with faster feedback loops

## 📱 Sections

### 1. Hero Section
- Eye-catching introduction
- Call-to-action buttons
- Animated background elements

### 2. About Section
- Personal information
- Education details
- Contact information
- Language proficiency

### 3. Skills Section
- Technical skills with progress bars
- Categorized by technology type
- Interactive skill cards

### 4. Projects Section
- Featured project showcase
- Detailed project descriptions
- Technology stack display
- Live demo and GitHub links

### 5. Contact Section
- Contact form with validation
- Contact information
- Social media links

## 🎨 Customization

### Colors
The color scheme can be customized in `client/tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary color palette
  },
  secondary: {
    // Your secondary color palette
  }
}
```

### Content
Update the content in each component file:
- Personal information in `About.js`
- Skills in `Skills.js`
- Projects in `Projects.js`
- Contact information in `Contact.js`

### Styling
Global styles can be modified in `client/src/index.css`.

## 🚀 Deployment

### Frontend (Vite + React)
1. Build the Vite app:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Backend (Express)
1. Deploy to your preferred hosting service (Heroku, Railway, etc.)
2. Update the API endpoints in the frontend if needed

## 📧 Contact Form Setup

The contact form is ready for backend integration. To enable email functionality:

1. Install nodemailer (already included)
2. Configure email settings in `server/index.js`
3. Add environment variables for email credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Subash A**
- Email: subashsg7777@gmail.com
- LinkedIn: [subash-anandaraj](https://www.linkedin.com/in/subash-anandaraj/)
- GitHub: [subashsg7777](https://github.com/subashsg7777)

---

Made with ❤️ and React
