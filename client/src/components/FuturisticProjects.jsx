import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaShoppingCart, FaGavel, FaRecycle, FaShoppingBag } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiSpringboot } from 'react-icons/si';

const FuturisticProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Use environment variable for API URL, fallback to localhost for development
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

  const techIcons = {
    "React": SiReact,
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    "MongoDB": SiMongodb,
    "Spring Boot": SiSpringboot,
  };
  const projectIconMap = {
    "FaShoppingCart": FaShoppingCart,
    "FaGavel": FaGavel,
    "FaRecycle": FaRecycle,
    "FaShoppingBag": FaShoppingBag
  };
  if (loading) {
    return (
      <section id="projects" className="relative w-full min-h-screen py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900 overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
          />
        </div>
      </section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <section id="projects" className="relative w-full min-h-screen py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-cyan-400 text-xl">{error || 'No projects found'}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative w-full min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900">
      {/* Animated background with cohesive color scheme */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
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
              03. PORTFOLIO
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            FEATURED PROJECTS
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Showcasing innovative solutions built with cutting-edge technologies
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6"
          />
        </motion.div>

        {/* Project Cards Grid with Enhanced Design */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveProject(index)}
              className="group cursor-pointer h-full"
            >
              {/* Outer glow container */}
              <div className="relative h-full">
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  layoutId={`glow-${index}`}
                />

                {/* Main card */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border transition-all duration-300 rounded-2xl p-6 overflow-hidden ${
                    activeProject === index
                      ? 'border-cyan-400 shadow-2xl shadow-cyan-500/30'
                      : 'border-cyan-500/20 group-hover:border-cyan-400/60'
                  }`}
                >
                  {/* Neon top accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />

                  {/* Project number */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center text-sm font-bold text-cyan-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 space-y-4">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4">
                      {(() => {
                        const ProjectIcon = projectIconMap[project.icon];
                        const colorGradient = project.color || 'from-cyan-500 to-blue-500';
                        return ProjectIcon ? (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${colorGradient} flex items-center justify-center text-white text-xl shadow-lg`}
                          >
                            <ProjectIcon />
                          </motion.div>
                        ) : null;
                      })()}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-blue-400">{project.subtitle}</p>
                        <p className="text-xs text-slate-500 mt-1">{project.period}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies with animated badges */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {project.technologies.slice(0, 3).map((tech, idx) => {
                        const TechIcon = techIcons[tech];
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="px-2.5 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg flex items-center gap-1 hover:border-cyan-400 transition-all"
                          >
                            {TechIcon && <TechIcon className="text-cyan-400 text-xs" />}
                            <span className="text-xs text-cyan-300">{tech}</span>
                          </motion.div>
                        );
                      })}
                      {project.technologies.length > 3 && (
                        <div className="px-2.5 py-1.5 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-xs text-slate-300">
                          +{project.technologies.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Feature highlights */}
                    <div className="pt-2 border-t border-cyan-500/20">
                      <ul className="text-xs space-y-1">
                        {project.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="text-slate-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1.5">▸</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Links */}
                    <div className="flex gap-2 pt-4 group-hover:gap-3 transition-all">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-3 py-2 bg-slate-700/50 border border-cyan-500/40 text-cyan-400 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 text-sm hover:text-cyan-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub size={14} /> Code
                        </motion.a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/60 text-cyan-300 rounded-lg hover:from-cyan-500/50 hover:to-blue-500/50 transition-all flex items-center justify-center gap-2 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt size={14} /> Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-cyan-400">
              Detailed View: {projects[activeProject]?.title}
            </h3>
          </motion.div>

          <AnimatePresence mode="wait">
            {projects[activeProject] && (
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Large glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-3xl" />

                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 group-hover:border-cyan-500/60 transition-all duration-300">
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    layoutId="active-underline"
                  />

                  {/* Project Header with Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 pb-6 border-b border-cyan-500/20 flex items-start gap-4"
                  >
                    {(() => {
                      const ProjectIcon = projectIconMap[projects[activeProject].icon];
                      const colorGradient = projects[activeProject].color || 'from-cyan-500 to-blue-500';
                      return ProjectIcon ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center text-white text-3xl shadow-lg`}
                        >
                          <ProjectIcon />
                        </motion.div>
                      ) : null;
                    })()}
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-cyan-400 mb-1">{projects[activeProject].title}</h2>
                      <p className="text-blue-400 font-semibold">{projects[activeProject].subtitle}</p>
                    </div>
                  </motion.div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Project Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="lg:col-span-1 space-y-4"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Period</p>
                        <p className="text-lg text-slate-200">{projects[activeProject].period}</p>
                      </div>

                      <div className="pt-4 border-t border-cyan-500/20">
                        <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-3">Stats</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-400">Features</span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold">
                              {projects[activeProject].features.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-400">Technologies</span>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">
                              {projects[activeProject].technologies.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Middle: Description & Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="lg:col-span-1 space-y-4"
                    >
                      <div>
                        <h4 className="text-cyan-400 font-bold mb-2 uppercase text-xs tracking-wider">Overview</h4>
                        <p className="text-slate-300 leading-relaxed text-sm">
                          {projects[activeProject].description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-cyan-500/20">
                        <h4 className="text-blue-400 font-bold mb-3 uppercase text-xs tracking-wider">Key Features</h4>
                        <ul className="space-y-2">
                          {projects[activeProject].features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              className="text-slate-300 text-sm flex items-start gap-2"
                            >
                              <span className="text-cyan-400 font-bold">→</span>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Right: Tech Stack & Links */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="lg:col-span-1 space-y-4"
                    >
                      <div>
                        <h4 className="text-purple-400 font-bold mb-3 uppercase text-xs tracking-wider">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {projects[activeProject].technologies.map((tech, idx) => {
                            const TechIcon = techIcons[tech];
                            return (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="px-3 py-2 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border border-cyan-500/50 rounded-lg flex items-center gap-2 hover:border-cyan-400 transition-all group/tech cursor-default"
                              >
                                {TechIcon && <TechIcon className="text-cyan-400 text-lg" />}
                                <span className="text-xs font-semibold text-cyan-300">{tech}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cyan-500/20">
                        <h4 className="text-purple-400 font-bold mb-3 uppercase text-xs tracking-wider">Links</h4>
                        <div className="flex gap-3">
                          {projects[activeProject].github && (
                            <motion.a
                              href={projects[activeProject].github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 border border-cyan-500/50 text-cyan-400 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                              <FaGithub /> GitHub
                            </motion.a>
                          )}
                          {projects[activeProject].demo && projects[activeProject].demo !== '#' && (
                            <motion.a
                              href={projects[activeProject].demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                              <FaExternalLinkAlt /> Live
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FuturisticProjects;
