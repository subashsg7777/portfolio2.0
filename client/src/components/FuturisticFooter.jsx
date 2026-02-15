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
            <div className="flex items-center gap-2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-lg shadow-lg shadow-cyan-500/50" />
              SUBASH
            </div>
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
