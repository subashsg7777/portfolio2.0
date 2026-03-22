import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaTag } from 'react-icons/fa';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/api';

const ICON_OPTIONS = [
  { value: 'FaShoppingCart', label: 'Shopping Cart' },
  { value: 'FaGavel', label: 'Gavel' },
  { value: 'FaRecycle', label: 'Recycle' },
  { value: 'FaShoppingBag', label: 'Shopping Bag' },
  { value: 'FaTag', label: 'Price Tag' }
];

const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { value: 'from-green-500 to-emerald-500', label: 'Green to Emerald' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink to Rose' }
];

const createInitialFormData = (id = '') => ({
  id,
  title: '',
  subtitle: '',
  period: '',
  description: '',
  image: '',
  technologies: [],
  features: [],
  github: '',
  demo: '',
  icon: ICON_OPTIONS[0].value,
  color: COLOR_OPTIONS[0].value
});

const AdminAddProject = () => {
  const [formData, setFormData] = useState(createInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [isLoadingId, setIsLoadingId] = useState(true);

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

  const loadNextProjectId = async () => {
    try {
      setIsLoadingId(true);
      const apiUrl = getApiBaseUrl();
      const response = await axios.get(`${apiUrl}/api/admin/next-project-id`);
      const nextId = String(response.data.nextId ?? '');

      setFormData(prev => ({
        ...prev,
        id: nextId
      }));
    } catch (error) {
      console.error('Error fetching next project ID:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Could not auto-fill the next project ID. You can still enter it manually.'
      });
    } finally {
      setIsLoadingId(false);
    }
  };

  useEffect(() => {
    loadNextProjectId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (formData.technologies.length === 0 || formData.features.length === 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Add at least one technology and one feature before submitting.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = getApiBaseUrl();
      const payload = {
        ...formData,
        id: Number(formData.id),
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        period: formData.period.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        github: formData.github.trim(),
        demo: formData.demo.trim()
      };

      await axios.post(`${apiUrl}/api/admin/projects`, payload);
      setSubmitStatus({
        type: 'success',
        message: 'Project added successfully!'
      });
      setFormData(createInitialFormData());
      setTechInput('');
      setFeatureInput('');
      await loadNextProjectId();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error adding project:', error);
      const backendMessage = error.response?.data?.missingFields?.length
        ? `Missing fields: ${error.response.data.missingFields.join(', ')}`
        : error.response?.data?.error || 'Error adding project. Please try again.';
      setSubmitStatus({
        type: 'error',
        message: backendMessage
      });
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
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Project ID
                </label>
                <input
                  type="number"
                  name="id"
                  min="0"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Auto-filled from backend"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300"
                />
                <p className="mt-2 text-xs text-slate-500">
                  {isLoadingId ? 'Fetching the next available ID...' : 'Adjust only if you need a specific project order.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="group"
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Project Period
                </label>
                <input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="2026 - Present"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/80 transition-all duration-300"
                />
              </motion.div>
            </div>

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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="group"
            >
              <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Project Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Short summary shown under the title"
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

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/project-myapp.svg"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <p className="mt-2 text-xs text-slate-500">Use a public asset path that exists in the frontend.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Project Icon
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {ICON_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

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
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Demo Link
                </label>
                <input
                  type="url"
                  name="demo"
                  value={formData.demo}
                  onChange={handleChange}
                  placeholder="https://your-project.com"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Accent Gradient
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {COLOR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

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
              {isSubmitting ? 'Adding Project...' : 'Add Project to Portfolio'}
            </motion.button>

            {/* Status Message */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: submitStatus ? 1 : 0, y: submitStatus ? 0 : -10 }}
              className={`text-center py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                submitStatus?.type === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : submitStatus?.type === 'error'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : ''
              }`}
            >
              {submitStatus?.type === 'success' && (
                <>
                  <FaCheckCircle /> {submitStatus.message}
                </>
              )}
              {submitStatus?.type === 'error' && (
                <>{submitStatus.message}</>
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAddProject;
