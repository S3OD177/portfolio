import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBug, FaLock, FaCode, FaLinux } from 'react-icons/fa';
import { SiKalilinux, SiWireshark, SiPython, SiJavascript } from 'react-icons/si';
import { usePortfolio } from '../context/PortfolioContext';

const Skills = () => {
  const { skillsData } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  // Icon mapping
  const iconMap = {
    'FaShieldAlt': FaShieldAlt,
    'FaBug': FaBug,
    'FaLock': FaLock,
    'FaCode': FaCode,
    'FaLinux': FaLinux,
    'SiPython': SiPython,
    'SiJavascript': SiJavascript,
    'SiKalilinux': SiKalilinux,
    'SiWireshark': SiWireshark
  };

  const categories = [...new Set(skillsData.map(skill => skill.category))];
  const filteredSkills = activeFilter === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeFilter);

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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A comprehensive overview of my technical expertise, tools, and technologies I work with regularly
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'All'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-red-400 mb-2">
              {activeFilter === 'All' ? 'All Skills' : activeFilter}
            </h3>
            <p className="text-gray-300">
              Showing {filteredSkills.length} of {skillsData.length} skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={activeFilter}>
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || FaCode;
              return (
                <div
                  key={skill.name}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="text-red-500 text-2xl mr-3" />
                    <div>
                      <h4 className="text-white font-semibold">{skill.name}</h4>
                      <span className="text-xs text-gray-400">{skill.category}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
              <h4 className="text-3xl font-bold text-red-400 mb-2">{filteredSkills.length}+</h4>
              <p className="text-gray-300">{activeFilter === 'All' ? 'Total Skills' : `${activeFilter} Skills`}</p>
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