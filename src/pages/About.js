import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBug, FaLock, FaCode, FaLinux, FaGraduationCap, FaBriefcase, FaCertificate } from 'react-icons/fa';
import { SiKalilinux, SiWireshark, SiPython, SiJavascript } from 'react-icons/si';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { aboutData, educationData, experienceData } = usePortfolio();



  return (
    <section id="about" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              {aboutData.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {aboutData.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                  MA
                </div>
                {/* Replace with actual image */}
                {/* <img 
                  src="/profile-image.jpg" 
                  alt="Your Name" 
                  className="w-full rounded-2xl shadow-2xl"
                /> */}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                My Journey
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {aboutData.journey.paragraph1}
                </p>
                <p>
                  {aboutData.journey.paragraph2}
                </p>
                <p>
                  {aboutData.journey.paragraph3}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Education Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Education
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              My academic background and professional certifications in cybersecurity
            </p>
          </motion.div>

          <div className="space-y-8">
            {educationData.map((edu, index) => {
              const IconComponent = edu.icon === 'FaGraduationCap' ? FaGraduationCap : FaCertificate;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card flex items-start space-x-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="text-red-500 text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                      <span className="text-red-400 font-medium">{edu.year}</span>
                    </div>
                    <h4 className="text-lg text-red-300 mb-3">{edu.institution}</h4>
                    <p className="text-gray-400 leading-relaxed">{edu.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Experience
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              My professional journey in cybersecurity and information security
            </p>
          </motion.div>

          <div className="space-y-8">
            {experienceData.map((exp, index) => {
              const IconComponent = FaBriefcase;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card flex items-start space-x-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="text-red-500 text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                      <span className="text-red-400 font-medium">{exp.year}</span>
                    </div>
                    <h4 className="text-lg text-red-300 mb-3">{exp.company}</h4>
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


    </section>
  );
};

export default About;