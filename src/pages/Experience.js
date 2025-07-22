import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: 'IT Specialist',
      company: 'Al-Matjar Al-Mutazamin Commercial',
      location: 'Saudi Arabia',
      period: '2022 - Present',
      type: 'Full-time',
      description: [
        'Managed and maintained IT infrastructure for commercial operations',
        'Provided technical support to end-users and resolved system issues',
        'Implemented network configurations and security protocols',
        'Collaborated with cross-functional teams to optimize IT processes',
        'Conducted system troubleshooting and performance optimization'
      ],
      technologies: ['Windows Server', 'Network Administration', 'Technical Support', 'System Maintenance']
    },
    {
      title: 'Cooperative Training Student',
      company: 'King Faisal University',
      location: 'Al-Ahsa, Saudi Arabia',
      period: '2021 - 2022',
      type: 'Internship',
      description: [
        'Gained hands-on experience in IT operations and system administration',
        'Assisted in network configuration and maintenance tasks',
        'Participated in technical support activities',
        'Learned industry best practices and professional development',
        'Contributed to various IT projects and initiatives'
      ],
      technologies: ['Linux', 'Network Configuration', 'System Administration', 'Technical Documentation']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My journey in IT and technology, building expertise through hands-on experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-300 hidden md:block"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative mb-12 md:ml-16"
            >
              {/* Timeline dot */}
              <div className="absolute -left-20 top-6 w-4 h-4 bg-red-500 rounded-full border-4 border-gray-900 hidden md:block"></div>
              
              <div className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <div className="flex items-center text-red-400 mb-2">
                      <FaBriefcase className="mr-2" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-300 mb-1">
                      <FaCalendarAlt className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-300 mb-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                    <span className="inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <span className="text-red-400 mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies & Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-red-500/20 hover:text-red-400 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg p-8 mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FaBriefcase className="text-4xl text-red-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-2">2+</h4>
              <p className="text-gray-300">Years of Experience</p>
            </div>
            <div>
              <FaGraduationCap className="text-4xl text-red-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-2">Multiple</h4>
              <p className="text-gray-300">Certifications</p>
            </div>
            <div>
              <FaMapMarkerAlt className="text-4xl text-red-400 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-2">Saudi Arabia</h4>
              <p className="text-gray-300">Based Location</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;