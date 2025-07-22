import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBug, FaLock, FaCode, FaLinux } from 'react-icons/fa';
import { SiKalilinux, SiWireshark, SiPython, SiJavascript } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'System Administration', icon: FaShieldAlt, level: 90, category: 'Infrastructure' },
    { name: 'Technical Support', icon: FaBug, level: 95, category: 'Support' },
    { name: 'Network Configuration', icon: FaLock, level: 85, category: 'Networking' },
    { name: 'Troubleshooting', icon: FaBug, level: 92, category: 'Support' },
    { name: 'E-Learning Platforms', icon: FaCode, level: 88, category: 'Education' },
    { name: 'SQL Programming', icon: SiPython, level: 80, category: 'Programming' },
    { name: 'Web Development', icon: SiJavascript, level: 75, category: 'Programming' },
    { name: 'Cloud Computing', icon: FaShieldAlt, level: 78, category: 'Cloud' },
    { name: 'Cyber Threat Management', icon: FaLock, level: 82, category: 'Security' },
    { name: 'Linux Administration', icon: FaLinux, level: 80, category: 'Infrastructure' },
    { name: 'Endpoint Security', icon: FaShieldAlt, level: 85, category: 'Security' },
    { name: 'IT Project Management', icon: FaCode, level: 83, category: 'Management' },
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <IconComponent className="text-red-500 text-2xl mr-3" />
                        <h4 className="text-white font-semibold">{skill.name}</h4>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              }
            </div>
          </motion.div>
        ))}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg p-8 mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">{skills.length}+</h4>
              <p className="text-gray-300">Technical Skills</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">{categories.length}</h4>
              <p className="text-gray-300">Skill Categories</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">4+</h4>
              <p className="text-gray-300">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;