import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
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
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 9342479768",
      href: "tel:+919342479768",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "subashsg7777@gmail.com",
      href: "mailto:subashsg7777@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Chennai, India",
      href: null,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/subashsg7777",
      label: "GitHub",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/subash-anandaraj/",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/contact', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary-50 via-accent-50/30 to-secondary-50 bg-pattern">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary-800 mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 mx-auto rounded-full mb-6 animate-pulse"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. Let's connect!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-secondary-800 mb-6">
                  Let's Connect
                </h3>
                <p className="text-secondary-600 mb-8 leading-relaxed">
                  I'm currently looking for new opportunities and would love to hear from you. 
                  Whether you have a question, want to work together, or just want to say hi, 
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-800">{contact.title}</h4>
                      {contact.href ? (
                        <a 
                          href={contact.href}
                          className="text-secondary-600 hover:text-primary-600 transition-colors duration-300"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-secondary-600">{contact.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-secondary-800 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-xl card-hover">
              <h3 className="text-2xl font-semibold text-secondary-800 mb-6">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shimmer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="animate-bounce" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
