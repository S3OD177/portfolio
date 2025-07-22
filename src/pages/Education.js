import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import { SiCisco, SiGoogle } from 'react-icons/si';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Information Technology',
      institution: 'King Faisal University',
      location: 'Al-Ahsa, Saudi Arabia',
      period: '2018 - 2022',
      type: 'Bachelor\'s Degree',
      description: [
        'Comprehensive study of information technology fundamentals',
        'Focus on system administration and network management',
        'Hands-on experience with various programming languages',
        'Capstone project in IT infrastructure optimization',
        'Active participation in technology clubs and events'
      ],
      gpa: '3.8/4.0',
      icon: FaGraduationCap
    }
  ];

  const certifications = [
    {
      name: 'ITIL® 4 Foundation',
      issuer: 'AXELOS',
      date: '2023',
      description: 'IT Service Management best practices and framework',
      icon: FaCertificate,
      color: 'blue'
    },
    {
      name: 'Cisco Certified Network Associate (CCNA)',
      issuer: 'Cisco Systems',
      date: '2022',
      description: 'Network fundamentals, routing and switching technologies',
      icon: SiCisco,
      color: 'blue'
    },
    {
      name: 'Google Technical Support Fundamentals',
      issuer: 'Google',
      date: '2022',
      description: 'Technical support principles and customer service excellence',
      icon: SiGoogle,
      color: 'green'
    },
    {
      name: 'CompTIA Security+ (In Progress)',
      issuer: 'CompTIA',
      date: '2024',
      description: 'Cybersecurity fundamentals and risk management',
      icon: FaCertificate,
      color: 'red'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Academic foundation and professional certifications that drive my expertise
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-red-400 mb-8 text-center">Academic Background</h3>
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <IconComponent className="text-red-500 text-3xl mr-4" />
                    <div>
                      <h4 className="text-2xl font-bold text-white">{edu.degree}</h4>
                      <p className="text-red-400 font-semibold">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-300 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center text-gray-300 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{edu.location}</span>
                    </div>

                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">Key Achievements:</h5>
                  <ul className="space-y-2">
                    {edu.description.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <span className="text-red-400 mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-red-400 mb-8 text-center">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              const colorClasses = {
                blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
                green: 'from-green-500/20 to-green-600/20 border-green-500/30',
                red: 'from-red-500/20 to-red-600/20 border-red-500/30'
              };
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${colorClasses[cert.color]} border rounded-lg p-6 hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className={`text-${cert.color}-400 text-2xl mr-3`} />
                    <div>
                      <h4 className="text-white font-bold text-lg">{cert.name}</h4>
                      <p className="text-gray-300 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`bg-${cert.color}-500/20 text-${cert.color}-400 px-3 py-1 rounded-full text-xs`}>
                      {cert.date}
                    </span>
                    <FaCertificate className={`text-${cert.color}-400`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Education;