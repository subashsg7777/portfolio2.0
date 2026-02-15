import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const FuturisticHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const menuVariants = {
    closed: { opacity: 0, width: 0 },
    open: { opacity: 1, width: 'auto' }
  };

  const linkVariants = {
    closed: { x: -50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-lg border-b border-cyan-500/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Cyberpunk Style */}
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#home"
          className="flex items-center gap-3 relative group"
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 text-slate-300 hover:text-cyan-300 transition-colors relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/50"
        >
          Let's Talk
        </motion.a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400 text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className="md:hidden absolute top-16 right-0 w-full bg-slate-900/95 backdrop-blur-lg border-b border-cyan-500/20"
      >
        <div className="flex flex-col items-end gap-2 p-4">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              variants={linkVariants}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setIsOpen(false)}
            variants={linkVariants}
            transition={{ delay: navItems.length * 0.1 }}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg mt-2"
          >
            Let's Talk
          </motion.a>
        </div>
      </motion.div>
    </header>
  );
};

export default FuturisticHeader;
