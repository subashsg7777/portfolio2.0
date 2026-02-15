import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const FuturisticContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 9342479768",
      href: "tel:+919342479768",
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "subashsg7777@gmail.com",
      href: "mailto:subashsg7777@gmail.com",
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Chennai, India",
      href: null,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/contact`, formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
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
              04. GET IN TOUCH
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            LET'S CONNECT
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Have a project in mind? Let's talk about how I can help bring your ideas to life.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mt-6"
          />
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info and socials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            {/* Contact cards */}
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href || '#'}
                variants={itemVariants}
                whileHover={{ translateX: 10 }}
                className={`block relative group rounded-lg overflow-hidden ${!contact.href ? 'cursor-default' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 group-hover:border-cyan-500/60 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 bg-gradient-to-br ${contact.color} rounded-lg`}>
                      <contact.icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">
                        {contact.title}
                      </h3>
                      <p className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-cyan-500/20">
              <h3 className="text-cyan-400 font-bold text-lg mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', url: '#' },
                  { name: 'LinkedIn', url: '#' },
                  { name: 'Twitter', url: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 text-cyan-400 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 text-sm font-semibold"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6 relative"
            >
              {/* Form background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Name input */}
                <motion.div variants={itemVariants} className="group">
                  <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-focus-within:w-full w-0 transition-all duration-300" />
                  </div>
                </motion.div>

                {/* Email input */}
                <motion.div variants={itemVariants} className="group">
                  <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-focus-within:w-full w-0 transition-all duration-300" />
                  </div>
                </motion.div>

                {/* Message input */}
                <motion.div variants={itemVariants} className="group">
                  <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows="5"
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300 resize-none"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-focus-within:w-full w-0 transition-all duration-300" />
                  </div>
                </motion.div>

                {/* Submit button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
                >
                  <FaPaperPlane />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Status messages */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: submitStatus ? 1 : 0, y: submitStatus ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : submitStatus === 'error'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : ''
                  }`}
                >
                  {submitStatus === 'success' && (
                    <>
                      <FaCheckCircle /> Message sent successfully!
                    </>
                  )}
                  {submitStatus === 'error' && (
                    <>Error sending message. Please try again.</>
                  )}
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 pt-20 border-t border-cyan-500/20 text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-cyan-400 mb-4"
          >
            Ready to Work Together?
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            I'm always interested in hearing about new projects and opportunities.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="mailto:subashsg7777@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50"
          >
            Start a Conversation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FuturisticContact;
