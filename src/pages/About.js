import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBug, FaLock, FaCode, FaLinux, FaGraduationCap, FaBriefcase, FaCertificate } from 'react-icons/fa';
import { SiKalilinux, SiWireshark, SiPython, SiJavascript } from 'react-icons/si';

const About = () => {
  const skills = [
    { name: 'System Administration', icon: FaShieldAlt, level: 90 },
    { name: 'Technical Support', icon: FaBug, level: 95 },
    { name: 'Network Configuration', icon: FaLock, level: 85 },
    { name: 'Troubleshooting', icon: FaBug, level: 92 },
    { name: 'E-Learning Platforms', icon: FaCode, level: 88 },
    { name: 'SQL Programming', icon: SiPython, level: 80 },
    { name: 'Web Development', icon: SiJavascript, level: 75 },
    { name: 'Cloud Computing', icon: FaShieldAlt, level: 78 },
    { name: 'Cyber Threat Management', icon: FaLock, level: 82 },
    { name: 'Linux Administration', icon: FaLinux, level: 80 },
    { name: 'Endpoint Security', icon: FaShieldAlt, level: 85 },
    { name: 'IT Project Management', icon: FaCode, level: 83 },
  ];

  const education = [
    {
      year: '2024',
      institution: 'King Faisal University',
      degree: 'Bachelor of Computer Science',
      description: 'ABET-accredited degree program focusing on computer science fundamentals, programming, and technology solutions.',
      icon: FaGraduationCap
    },
    {
      year: '2025',
      institution: 'PeopleCert',
      degree: 'ITIL® 4 Foundation',
      description: 'Comprehensive certification in IT service management best practices and frameworks.',
      icon: FaCertificate
    },
    {
      year: '2024',
      institution: 'Cisco',
      degree: 'Cyber Threat Management',
      description: 'Specialized certification focusing on identifying, analyzing, and managing cybersecurity threats.',
      icon: FaCertificate
    },
    {
      year: '2024',
      institution: 'Cisco',
      degree: 'Endpoint Security',
      description: 'Advanced certification covering endpoint protection strategies and security implementation.',
      icon: FaCertificate
    },
    {
      year: '2022',
      institution: 'Google via Coursera',
      degree: 'Technical Support Fundamentals',
      description: 'Foundation certification in technical support principles and troubleshooting methodologies.',
      icon: FaCertificate
    }
  ];

  const experience = [
    {
      year: 'March 2020 - Present',
      company: 'Al-Matjar Al-Mutazamin Commercial (SyncStore)',
      position: 'IT Specialist (Part Time)',
      description: 'Providing technical support and troubleshooting, configuring and managing systems and network infrastructure, ensuring system performance through monitoring and maintenance.',
      icon: FaBriefcase
    },
    {
      year: 'June 2024 - August 2024',
      company: 'King Faisal University',
      position: 'Cooperative Training - E-Learning & IT',
      description: 'Managed e-learning platforms, provided technical support, collaborated with faculty on LMS materials, analyzed engagement data, and supported faculty training programs.',
      icon: FaBriefcase
    }
  ];

  const interests = [
    {
      title: 'Technology Innovation',
      description: 'Always exploring new technologies, tools, and innovative solutions for IT challenges.',
      emoji: '🔍',
    },
    {
      title: 'Professional Development',
      description: 'Passionate about pursuing certifications and expanding technical expertise.',
      emoji: '🏆',
    },
    {
      title: 'Continuous Learning',
      description: 'Staying updated with the latest IT trends, cybersecurity practices, and emerging technologies.',
      emoji: '📚',
    },
    {
      title: 'Problem Solving',
      description: 'Enjoying the challenge of troubleshooting complex technical issues and finding efficient solutions.',
      emoji: '🌟',
    },
  ];

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
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a proactive Computer Science graduate from King Faisal University with experience in IT support,
              systems administration, and e-learning technology. Skilled in troubleshooting, system configuration,
              and network management, committed to enhancing system performance and reliability.
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
                  My journey into IT started during my computer science studies at King Faisal University, where I discovered
                  my passion for technology and problem-solving. What began as academic curiosity has evolved into practical
                  experience in IT support, systems administration, and cybersecurity.
                </p>
                <p>
                  I specialize in technical support, system administration, and network configuration. I'm always
                  eager to learn about new technologies and innovative solutions. I believe in continuous learning
                  and staying updated with the latest industry trends to provide the best technical solutions.
                </p>
                <p>
                  When I'm not working on technical projects, you can find me researching new IT tools,
                  pursuing professional certifications, or collaborating with teams to improve technology
                  infrastructure and user experience.
                </p>
              </div>
            </motion.div>
          </div>
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
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Here are some of the security tools and technologies I work with regularly
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-4">
                    <IconComponent className="text-4xl text-red-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2 block">{skill.level}%</span>
                </motion.div>
              );
            })}
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
            {education.map((edu, index) => {
              const IconComponent = edu.icon;
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
            {experience.map((exp, index) => {
              const IconComponent = exp.icon;
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

      {/* Interests Section */}
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
              Interests & Passions
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Beyond cybersecurity, here's what drives and inspires me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{interest.emoji}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {interest.title}
                    </h3>
                    <p className="text-gray-400">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;