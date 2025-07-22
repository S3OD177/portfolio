import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  // Home data
  const [homeData, setHomeData] = useState({
    title: 'IT Specialist & Computer Science Graduate',
    subtitle: 'Proactive Computer Science graduate with experience in IT support, systems administration, and e-learning technology.',
    description: 'Skilled in troubleshooting, system configuration, and network management with cybersecurity certifications. I help organizations enhance system performance and drive innovation in technology solutions.',
    ctaText: 'Contact me here'
  });

  // About data
  const [aboutData, setAboutData] = useState({
    title: 'About Me',
    description: 'I\'m a proactive Computer Science graduate from King Faisal University with experience in IT support, systems administration, and e-learning technology. Skilled in troubleshooting, system configuration, and network management, committed to enhancing system performance and reliability.',
    journey: {
      paragraph1: 'My journey into IT started during my computer science studies at King Faisal University, where I discovered my passion for technology and problem-solving. What began as academic curiosity has evolved into practical experience in IT support, systems administration, and cybersecurity.',
      paragraph2: 'I specialize in technical support, system administration, and network configuration. I\'m always eager to learn about new technologies and innovative solutions. I believe in continuous learning and staying updated with the latest industry trends to provide the best technical solutions.',
      paragraph3: 'When I\'m not working on technical projects, you can find me researching new IT tools, pursuing professional certifications, or collaborating with teams to improve technology infrastructure and user experience.'
    }
  });

  // Skills data
  const [skillsData, setSkillsData] = useState([
    { id: 1, name: 'System Administration', icon: 'FaShieldAlt', level: 90, category: 'Infrastructure' },
    { id: 2, name: 'Technical Support', icon: 'FaBug', level: 95, category: 'Support' },
    { id: 3, name: 'Network Configuration', icon: 'FaLock', level: 85, category: 'Networking' },
    { id: 4, name: 'Troubleshooting', icon: 'FaBug', level: 92, category: 'Support' },
    { id: 5, name: 'E-Learning Platforms', icon: 'FaCode', level: 88, category: 'Education' },
    { id: 6, name: 'SQL Programming', icon: 'SiPython', level: 80, category: 'Programming' },
    { id: 7, name: 'Web Development', icon: 'SiJavascript', level: 75, category: 'Programming' },
    { id: 8, name: 'Cloud Computing', icon: 'FaShieldAlt', level: 78, category: 'Cloud' },
    { id: 9, name: 'Cyber Threat Management', icon: 'FaLock', level: 82, category: 'Security' },
    { id: 10, name: 'Linux Administration', icon: 'FaLinux', level: 80, category: 'Infrastructure' },
    { id: 11, name: 'Endpoint Security', icon: 'FaShieldAlt', level: 85, category: 'Security' },
    { id: 12, name: 'IT Project Management', icon: 'FaCode', level: 83, category: 'Management' }
  ]);

  // Education data
  const [educationData, setEducationData] = useState([
    {
      id: 1,
      year: '2024',
      institution: 'King Faisal University',
      degree: 'Bachelor of Computer Science',
      description: 'ABET-accredited degree program focusing on computer science fundamentals, programming, and technology solutions.',
      icon: 'FaGraduationCap'
    },
    {
      id: 2,
      year: '2025',
      institution: 'PeopleCert',
      degree: 'ITIL® 4 Foundation',
      description: 'Comprehensive certification in IT service management best practices and frameworks.',
      icon: 'FaCertificate'
    },
    {
      id: 3,
      year: '2024',
      institution: 'Cisco',
      degree: 'Cyber Threat Management',
      description: 'Specialized certification focusing on identifying, analyzing, and managing cybersecurity threats.',
      icon: 'FaCertificate'
    },
    {
      id: 4,
      year: '2024',
      institution: 'Cisco',
      degree: 'Endpoint Security',
      description: 'Advanced certification covering endpoint protection strategies and security implementation.',
      icon: 'FaCertificate'
    },
    {
      id: 5,
      year: '2022',
      institution: 'Google via Coursera',
      degree: 'Technical Support Fundamentals',
      description: 'Foundation certification in technical support principles and troubleshooting methodologies.',
      icon: 'FaCertificate'
    }
  ]);

  // Experience data
  const [experienceData, setExperienceData] = useState([
    {
      id: 1,
      year: 'March 2020 - Present',
      company: 'Al-Matjar Al-Mutazamin Commercial (SyncStore)',
      position: 'IT Specialist (Part Time)',
      description: 'Providing technical support and troubleshooting, configuring and managing systems and network infrastructure, ensuring system performance through monitoring and maintenance.',
      icon: 'FaBriefcase'
    },
    {
      id: 2,
      year: 'June 2024 - August 2024',
      company: 'King Faisal University',
      position: 'Cooperative Training - E-Learning & IT',
      description: 'Managed e-learning platforms, provided technical support, collaborated with faculty on LMS materials, analyzed engagement data, and supported faculty training programs.',
      icon: 'FaBriefcase'
    }
  ]);

  // Projects data
  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: 'Student Activity Management System',
      description: 'A comprehensive web-based system for managing student activities, events, and participation tracking. Features include event registration, attendance monitoring, and activity reporting for educational institutions.',
      image: '/api/placeholder/400/250',
      technologies: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP'],
      category: 'web-development',
      githubUrl: 'https://github.com/saudalbin/student-activity-management',
      liveUrl: 'https://student-activities-demo.netlify.app',
      featured: true
    },
    {
      id: 2,
      title: 'IT Infrastructure Monitoring Dashboard',
      description: 'Real-time monitoring dashboard for IT infrastructure including server health, network performance, and security alerts. Built with modern web technologies for responsive design.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      category: 'infrastructure',
      githubUrl: 'https://github.com/saudalbin/infrastructure-monitor',
      liveUrl: 'https://it-monitor-demo.netlify.app',
      featured: true
    },
    {
      id: 3,
      title: 'Network Security Assessment Tool',
      description: 'Automated network security assessment tool that scans for vulnerabilities and generates comprehensive reports. Includes penetration testing capabilities and security recommendations.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Nmap', 'Wireshark', 'Linux'],
      category: 'security',
      githubUrl: 'https://github.com/saudalbin/security-assessment',
      liveUrl: '#',
      featured: false
    }
  ]);

  // Contact data
  const [contactData, setContactData] = useState({
    contactInfo: [
      {
        icon: 'FaEnvelope',
        title: 'Email',
        value: 'salbinzaid@gmail.com',
        link: 'mailto:salbinzaid@gmail.com'
      },
      {
        icon: 'FaPhone',
        title: 'Phone',
        value: '+966 535 787 635',
        link: 'tel:+966535787635'
      },
      {
        icon: 'FaMapMarkerAlt',
        title: 'Location',
        value: 'Saudi Arabia'
      }
    ],
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/saudalbin',
        icon: 'FaGithub',
        color: 'hover:text-gray-300'
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/saud-albin-zaid',
        icon: 'FaLinkedin',
        color: 'hover:text-blue-400'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/saud_albin_zaid',
        icon: 'FaTwitter',
        color: 'hover:text-blue-400'
      }
    ]
  });

  // Update functions
  const updateHomeData = (newData) => setHomeData(newData);
  const updateAboutData = (newData) => setAboutData(newData);
  const updateSkillsData = (newData) => setSkillsData(newData);
  const updateEducationData = (newData) => setEducationData(newData);
  const updateExperienceData = (newData) => setExperienceData(newData);
  const updateProjectsData = (newData) => setProjectsData(newData);
  const updateContactData = (newData) => setContactData(newData);

  const value = {
    homeData,
    aboutData,
    skillsData,
    educationData,
    experienceData,
    projectsData,
    contactData,
    updateHomeData,
    updateAboutData,
    updateSkillsData,
    updateEducationData,
    updateExperienceData,
    updateProjectsData,
    updateContactData
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};