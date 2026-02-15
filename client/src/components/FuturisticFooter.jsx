import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FuturisticFooter = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/subashsg7777', label: 'GitHub', color: 'from-slate-400 to-slate-600' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/subash-anandaraj/', label: 'LinkedIn', color: 'from-blue-400 to-blue-600' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'from-cyan-400 to-blue-500' },
    { icon: FaEnvelope, url: 'mailto:subashsg7777@gmail.com', label: 'Email', color: 'from-purple-400 to-pink-500' },
    { icon: FaPhone, url: 'tel:+919342479768', label: 'Phone', color: 'from-green-400 to-emerald-500' },
    { icon: FaMapMarkerAlt, url: '#', label: 'Location', color: 'from-orange-400 to-red-500' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-slate-900 to-black overflow-hidden pt-20 pb-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto px-4 mb-16 grid md:grid-cols-4 gap-12"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-4">
            <motion.a
              className="flex items-center gap-3 relative group w-fit"
              whileHover={{ scale: 1.05 }}
            >
              {/* Glitch Effect Background */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-magenta-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300 pointer-events-none" />
              
              {/* Icon Box */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-pink-500 via-magenta-500 to-cyan-500 rounded-md shadow-lg shadow-pink-500/70 transform group-hover:scale-110 transition-transform">
                <div className="absolute inset-0.5 bg-slate-950 rounded-sm" />
                <div className="absolute inset-1 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-black text-pink-400">▧</span>
                </div>
              </div>

              {/* Text */}
              <div className="relative flex flex-col">
                <span className="text-sm tracking-widest font-mono font-bold text-pink-400" style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)' }}>
                  &lt; SUBASH /&gt;
                </span>
                <span className="text-xs tracking-wider font-mono text-cyan-300" style={{ textShadow: '0 0 5px rgba(0, 255, 136, 0.6)' }}>
                  DEV.ARCHITECT
                </span>
              </div>
            </motion.a>
            <p className="text-slate-400 text-sm">
              Full Stack Developer passionate about creating beautiful and functional digital experiences.
            </p>
            <div className="flex gap-3 pt-2 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 flex items-center justify-center bg-gradient-to-br ${social.color} rounded-lg text-white hover:shadow-lg transition-all hover:shadow-cyan-500/30`}
                  title={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="spacey-4">
            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <FaCode /> Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Tech Stack</h3>
            <ul className="space-y-2 text-sm">
              {['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'GSAP', 'Three.js'].map((tech, index) => (
                <li key={index}>
                  <span className="text-slate-400 hover:text-cyan-400 transition-colors cursor-default">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+919342479768"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  +91 9342479768
                </a>
              </li>
              <li>
                <a
                  href="mailto:subashsg7777@gmail.com"
                  className="text-slate-400 hover:text-cyan-400 transition-colors break-all"
                >
                  subashsg7777@gmail.com
                </a>
              </li>
              <li className="text-slate-400">Chennai, India</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 border-t border-cyan-500/20"
        />

        {/* Bottom footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <motion.p variants={itemVariants} className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} SUBASH. All rights reserved.
          </motion.p>
          <motion.p variants={itemVariants} className="text-slate-500 text-sm text-center md:text-right">
            Designed & Developed with precision for the future
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FuturisticFooter;
