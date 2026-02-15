import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaJs, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaGithub,
  FaDatabase,
  FaServer,
  FaCode,
  FaTools,
  FaLightbulb
} from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FaCode,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
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
      icon: FaServer,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      skills: [
        { name: "Node.js", icon: FaNodeJs, level: 80 },
        { name: "Express.js", icon: SiExpress, level: 75 },
        { name: "MongoDB", icon: SiMongodb, level: 70 },
      ]
    },
    {
      title: "Tools & Technologies",
      icon: FaTools,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 85 },
        { name: "GitHub", icon: FaGithub, level: 90 },
        { name: "Database Management", icon: FaDatabase, level: 75 },
        { name: "Network Management", icon: FaServer, level: 70 },
      ]
    },
    {
      title: "Soft Skills",
      icon: FaLightbulb,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      skills: [
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 85 },
        { name: "Communication", level: 80 },
        { name: "Adaptability", level: 88 },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary-800 mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and expertise in modern web development
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group card-hover`}
              >
                {/* Category Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-pulse-slow`}>
                    <category.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {skill.icon && (
                            <skill.icon className="text-primary-600 text-lg" />
                          )}
                          <span className="text-secondary-700 font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-secondary-500 font-medium">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-secondary-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: skillIndex * 0.2 }}
                          className={`h-3 rounded-full bg-gradient-to-r ${category.color} relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-secondary-800 text-center mb-8">
                Additional Expertise
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "MERN Stack Development",
                  "RESTful API Design",
                  "Responsive Web Design",
                  "User Authentication",
                  "State Management",
                  "Version Control",
                  "Agile Development",
                  "Cross-browser Compatibility",
                  "Performance Optimization"
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg hover:from-primary-100 hover:to-secondary-100 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
