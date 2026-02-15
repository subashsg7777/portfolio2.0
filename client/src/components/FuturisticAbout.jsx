import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaCode, FaBrain, FaRocket, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FuturisticAbout = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Holographic effect on cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(card, {
          '--mouse-x': `${x}px`,
          '--mouse-y': `${y}px`,
          duration: 0.3
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const contactInfo = [
    { icon: FaPhone, text: '+91 9342479768', href: 'tel:+919342479768', color: 'from-green-500 to-emerald-500' },
    { icon: FaEnvelope, text: 'subashsg7777@gmail.com', href: 'mailto:subashsg7777@gmail.com', color: 'from-blue-500 to-cyan-500' },
    { icon: FaMapMarkerAlt, text: 'Chennai, India', href: null, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="px-4 py-2 text-sm font-bold text-cyan-400 border border-cyan-500/50 rounded-full bg-cyan-500/10 backdrop-blur-sm">
              01. ABOUT ME
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            DEVELOPER & INNOVATOR
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Summary */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400">Profile Summary</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                  I'm a passionate frontend developer with a strong foundation in React, JavaScript, and Tailwind CSS. 
                  I have hands-on experience building MERN stack projects, including an e-commerce platform with features 
                  like user authentication, product management, and search functionality.
                </p>
                <p className="text-slate-400 leading-relaxed mt-4 text-sm">
                  I'd like to keep learning, growing, and contributing as a member of a team where my skills may come 
                  together for great experiences. I look forward to an opportunity where I can grow in skill and make 
                  impact as a developer.
                </p>
              </div>
            </motion.div>

            {/* Key highlights */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: FaBrain, label: 'Solutions', value: '4' },
                { icon: FaRocket, label: 'Projects', value: '4' },
                { icon: FaCode, label: 'Technologies', value: '12+' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 text-center hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <item.icon className="text-cyan-400 text-2xl mx-auto mb-2 group-hover:text-cyan-300 transition-colors" />
                  <p className="text-cyan-300 font-bold text-xl">{item.value}</p>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-cyan-400 mb-8">Contact Information</h3>

            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  '--mouse-x': '0px',
                  '--mouse-y': '0px'
                }}
              >
                <a
                  href={contact.href || '#'}
                  className={`block relative bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden group`}
                >
                  {/* Holographic shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0,212,255,0.3), transparent 50%)',
                      pointerEvents: 'none'
                    }}
                  />

                  <div className="relative flex items-center gap-4">
                    <div className={`p-4 bg-gradient-to-br ${contact.color} rounded-lg`}>
                      <contact.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm uppercase tracking-wide">Contact</p>
                      <p className="text-cyan-300 text-lg font-semibold group-hover:text-cyan-200 transition-colors">
                        {contact.text}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {[
                { name: 'GitHub', url: '#' },
                { name: 'LinkedIn', url: '#' },
                { name: 'Twitter', url: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {social.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticAbout;
