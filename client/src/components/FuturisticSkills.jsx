import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaGithub, FaDatabase, FaServer, FaCode, FaTools
} from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiSpringboot } from 'react-icons/si';

const FuturisticSkills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      color: 'from-cyan-500 to-blue-500',
      icon: FaCode,
      skills: [
        { name: "React", icon: FaReact, level: 90 },
        { name: "JavaScript", icon: FaJs, level: 85 },
        { name: "HTML5", icon: FaHtml5, level: 90 },
        { name: "CSS3", icon: FaCss3Alt, level: 85 },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: 88 },
      ]
    },
    {
      title: "Backend Development",
      color: 'from-blue-500 to-purple-500',
      icon: FaServer,
      skills: [
        { name: "Node.js", icon: FaNodeJs, level: 80 },
        { name: "Express.js", icon: SiExpress, level: 75 },
        { name: "MongoDB", icon: SiMongodb, level: 70 },
        { name: "Spring Boot", icon: SiSpringboot, level: 65 },
      ]
    },
    {
      title: "Tools & Technologies",
      color: 'from-purple-500 to-cyan-500',
      icon: FaTools,
      skills: [
        { name: "Git", icon: FaGitAlt, level: 85 },
        { name: "GitHub", icon: FaGithub, level: 90 },
        { name: "Database Management", icon: FaDatabase, level: 75 },
        { name: "REST APIs", icon: FaServer, level: 80 },
      ]
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="relative w-full min-h-screen py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
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
              02. EXPERTISE
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            TECHNICAL ARSENAL
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group"
            >
              {/* Category header */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className={`flex items-center gap-3 mb-4 p-4 bg-gradient-to-r ${category.color} rounded-lg`}>
                  <category.icon className="text-white text-2xl" />
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </motion.div>

              {/* Skills list */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className="relative group/item"
                  >
                    {/* Skill card */}
                    <div className="relative bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg" />

                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <skill.icon className="text-cyan-400 text-xl" />
                            <span className="font-semibold text-slate-200">{skill.name}</span>
                          </div>
                          <span className="text-cyan-400 font-bold text-lg">{skill.level}%</span>
                        </div>

                        {/* Animated progress bar */}
                        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full shadow-lg`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: skillIndex * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                          {/* Animated glow */}
                          <motion.div
                            className={`absolute top-0 h-full w-8 bg-gradient-to-r ${category.color} blur-md opacity-60`}
                            animate={{ x: [0, 100, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>

                        {/* Level indicator */}
                        <div className="mt-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`h-1 flex-1 rounded-full ${
                                i < Math.ceil(skill.level / 20) 
                                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                                  : 'bg-slate-700'
                              }`}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: skillIndex * 0.1 + i * 0.05 }}
                              viewport={{ once: true }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-cyan-500/20">
                <p className="text-slate-400 text-sm text-center">
                  {category.skills.length} Skills • {Math.round(category.skills.reduce((a, b) => a + b.level, 0) / category.skills.length)}% Avg
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Overall stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 pt-20 border-t border-cyan-500/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Skills', value: '15+' },
              { label: 'Avg Proficiency', value: '82%' },
              { label: 'Technologies', value: '12+' },
              { label: 'Years Exp', value: '1+' }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <motion.p
                  className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-slate-400 text-sm uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FuturisticSkills;
