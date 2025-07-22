import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaShieldAlt, FaBug, FaLock, FaCode } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Home = () => {
  const { homeData } = usePortfolio();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: FaShieldAlt,
      title: 'System Administration',
      description: 'Managing and maintaining IT infrastructure and systems',
    },
    {
      icon: FaBug,
      title: 'Technical Support',
      description: 'Troubleshooting and resolving technical issues efficiently',
    },
    {
      icon: FaLock,
      title: 'Network Configuration',
      description: 'Setting up and optimizing network systems and security',
    },
    {
      icon: FaCode,
      title: 'Programming & Development',
      description: 'SQL database management and web development skills',
    },
  ];

  return (
    <section id="home" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-custom text-center relative z-10 max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <motion.p 
              variants={itemVariants}
              className="text-red-400 text-lg mb-4 font-medium"
            >
              👋 Hello, I'm
            </motion.p>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">Saud Albin</span>{' '}
              <span className="text-red-500">Zaid</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300 mb-6 font-light"
            >
              {homeData.title}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {homeData.description}
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              {homeData.ctaText} <FaArrowRight />
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
            >
              Download CV <FaDownload />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              About me
            </h2>
            <div className="text-left space-y-6 text-gray-300 leading-relaxed">
              <p>
                After graduating with a degree in Computer Science from King Faisal University, I decided to pursue my passion for IT and technology. 
                I gained hands-on experience as an IT Specialist at SyncStore and earned cybersecurity certifications 
                to enhance my technical expertise.
              </p>
              <p>
                My favorite part of IT is the problem-solving aspect and the opportunity to help users overcome technical challenges. 
                I love the feeling of successfully resolving complex system issues or 
                implementing solutions that improve organizational efficiency.
              </p>
              <p>
                My core expertise includes system administration, technical support, network configuration, 
                and e-learning technology. I am also familiar with various programming languages including SQL and web technologies. 
                I am always looking to learn about new technologies and innovative solutions.
              </p>
              <p>
                I am currently looking for opportunities to grow as an IT professional and contribute to technology-driven organizations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
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
              My expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore my diverse skill set spanning various security domains, tools, and methodologies. 
              My technical skills are designed to deliver robust security solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors duration-300">
                    <IconComponent className="text-red-500 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


    </section>
  );
};

export default Home;