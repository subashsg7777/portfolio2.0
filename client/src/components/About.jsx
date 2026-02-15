import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const About = () => {
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
    { icon: FaPhone, text: '+91 9342479768', href: 'tel:+919342479768' },
    { icon: FaEnvelope, text: 'subashsg7777@gmail.com', href: 'mailto:subashsg7777@gmail.com' },
    { icon: FaMapMarkerAlt, text: 'Chennai, India', href: null },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
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
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 mx-auto rounded-full animate-pulse"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Profile Summary */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <FaCode className="text-primary-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary-800">Profile Summary</h3>
                </div>
                
                <div className="space-y-4 text-secondary-600 leading-relaxed">
                  <p>
                    I'm a passionate frontend developer with a strong foundation in React, JavaScript, and Tailwind CSS. 
                    I have hands-on experience building MERN stack projects, including an e-commerce platform with features 
                    like user authentication, product management, and search functionality.
                  </p>
                  <p>
                    I'd like to keep learning, growing, and contributing as a member of a team where my skills may come 
                    together for great experiences. I look forward to an opportunity where I can grow in skill and make 
                    impact as a developer.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-secondary-800 mb-4">Contact Information</h4>
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-secondary-600"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <contact.icon className="text-primary-600" />
                    </div>
                    {contact.href ? (
                      <a 
                        href={contact.href}
                        className="hover:text-primary-600 transition-colors duration-300"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span>{contact.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Education & Languages */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Education */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg animate-pulse-slow">
                    <FaGraduationCap className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary-800">Education</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <div className="text-primary-600 font-semibold">2022 - 2026</div>
                    <div className="text-xl font-semibold text-secondary-800">B.Tech Computer Science Engineering</div>
                    <div className="text-secondary-600">Dr. MGR University, Chennai-95</div>
                    <div className="text-sm text-secondary-500 mt-1">Currently pursuing 3rd Year</div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-2xl card-hover">
                <h3 className="text-2xl font-semibold text-secondary-800 mb-6">Languages</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700 font-medium">English</span>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-secondary-300 rounded-full"></div>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600">Intermediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700 font-medium">Tamil</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600">Fluent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
