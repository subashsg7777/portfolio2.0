import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/subashsg7777', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/subash-anandaraj/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:subashsg7777@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gradient-to-r from-secondary-800 via-secondary-900 to-secondary-800 text-white">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold font-display gradient-text">
                  Subash A
                </h3>
                <p className="text-secondary-300 leading-relaxed max-w-md">
                  A passionate React Frontend Developer creating beautiful, responsive web experiences 
                  with modern technologies and best practices.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gradient-to-r from-secondary-700 to-secondary-600 rounded-lg hover:from-primary-500 hover:to-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="animate-pulse" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-secondary-300 hover:text-primary-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold">Contact Info</h4>
                <div className="space-y-2 text-secondary-300">
                  <p>+91 9342479768</p>
                  <p>subashsg7777@gmail.com</p>
                  <p>Chennai, India</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-secondary-700 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-secondary-300">
              <span>© {currentYear} Subash A. Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>and</span>
              <FaCode className="text-primary-400" />
            </div>
            <div className="text-secondary-400 text-sm">
              All rights reserved
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
