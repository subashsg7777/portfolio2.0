import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FuturisticHeader from './components/FuturisticHeader.jsx';
import FuturisticHero from './components/FuturisticHero.jsx';
import FuturisticAbout from './components/FuturisticAbout.jsx';
import FuturisticSkills from './components/FuturisticSkills.jsx';
import FuturisticProjects from './components/FuturisticProjects.jsx';
import FuturisticContact from './components/FuturisticContact.jsx';
import FuturisticFooter from './components/FuturisticFooter.jsx';
import AdminAddProject from './components/AdminAddProject.jsx';

// Main portfolio page with futuristic design
function Portfolio() {
  return (
    <>
      <FuturisticHeader />
      <main>
        <FuturisticHero />
        <FuturisticAbout />
        <FuturisticSkills />
        <FuturisticProjects />
        <FuturisticContact />
      </main>
      <FuturisticFooter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-b from-slate-900 to-black min-h-screen">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/add-project" element={<AdminAddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
