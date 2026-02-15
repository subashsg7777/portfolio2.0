import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const AdminAddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    features: [],
    github: '',
    live: '',
    icon: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/projects`, formData);
      setSubmitStatus('success');
      setFormData({
        title: '',
        description: '',
        technologies: [],
        features: [],
        github: '',
        live: '',
        icon: ''
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error adding project:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black py-16 px-4">
      {/* Back button */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto mb-8 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <FaArrowLeft /> Back to Portfolio
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Add New Project
          </h1>
          <p className="text-slate-400">Showcase your latest work and achievements</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300"
              />
            </motion.div>

            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project"
                rows="4"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300 resize-none"
              />
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="Add technology and press Enter"
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full flex items-center gap-2 text-sm text-cyan-300"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-xs hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Features
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add feature and press Enter"
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="px-3 py-2 bg-slate-800/30 border border-cyan-500/30 rounded-lg flex items-center justify-between text-sm text-slate-300"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-xs hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                GitHub Link
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </motion.div>

            {/* Live Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Live Demo Link
              </label>
              <input
                type="url"
                name="live"
                value={formData.live}
                onChange={handleChange}
                placeholder="https://your-project.com"
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Adding Project...' : '✨ Add Project to Portfolio'}
            </motion.button>

            {/* Status Message */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: submitStatus ? 1 : 0, y: submitStatus ? 0 : -10 }}
              className={`text-center py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                submitStatus === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : submitStatus === 'error'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : ''
              }`}
            >
              {submitStatus === 'success' && (
                <>
                  <FaCheckCircle /> Project added successfully!
                </>
              )}
              {submitStatus === 'error' && (
                <>Error adding project. Please try again.</>
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAddProject;
