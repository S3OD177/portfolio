import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaShieldAlt, FaCode, FaUsers, FaTools, FaCloud, FaNetworkWired, FaHeadset } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaServer,
      title: 'System Administration',
      description: 'Complete server management, maintenance, and optimization for Windows and Linux environments.',
      features: [
        'Server Setup & Configuration',
        'Performance Monitoring',
        'System Updates & Patches',
        'Backup & Recovery Solutions'
      ],
      price: 'Starting at $500/month'
    },
    {
      icon: FaHeadset,
      title: 'Technical Support',
      description: 'Comprehensive IT support services to keep your business running smoothly.',
      features: [
        '24/7 Help Desk Support',
        'Remote Troubleshooting',
        'Hardware & Software Issues',
        'User Training & Documentation'
      ],
      price: 'Starting at $300/month'
    },
    {
      icon: FaNetworkWired,
      title: 'Network Configuration',
      description: 'Design, implement, and maintain secure and efficient network infrastructures.',
      features: [
        'Network Design & Planning',
        'Router & Switch Configuration',
        'VPN Setup & Management',
        'Network Security Implementation'
      ],
      price: 'Starting at $800/project'
    },
    {
      icon: FaShieldAlt,
      title: 'Cybersecurity Consulting',
      description: 'Protect your business with comprehensive security assessments and solutions.',
      features: [
        'Security Audits & Assessments',
        'Vulnerability Testing',
        'Security Policy Development',
        'Incident Response Planning'
      ],
      price: 'Starting at $1200/project'
    },
    {
      icon: FaCloud,
      title: 'Cloud Solutions',
      description: 'Migrate and manage your infrastructure in the cloud for better scalability.',
      features: [
        'Cloud Migration Planning',
        'AWS/Azure Implementation',
        'Cloud Security Configuration',
        'Cost Optimization'
      ],
      price: 'Starting at $1000/project'
    },
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Custom web applications and websites tailored to your business needs.',
      features: [
        'Responsive Web Design',
        'Database Integration',
        'E-commerce Solutions',
        'API Development'
      ],
      price: 'Starting at $1500/project'
    },
    {
      icon: FaUsers,
      title: 'IT Training',
      description: 'Comprehensive training programs for your team on various IT topics.',
      features: [
        'Customized Training Programs',
        'Hands-on Workshops',
        'Certification Preparation',
        'Online Learning Platforms'
      ],
      price: 'Starting at $200/session'
    },
    {
      icon: FaTools,
      title: 'IT Consulting',
      description: 'Strategic IT consulting to help optimize your technology infrastructure.',
      features: [
        'Technology Assessment',
        'Digital Transformation',
        'Process Optimization',
        'Technology Roadmap'
      ],
      price: 'Starting at $150/hour'
    }
  ];

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
    <section id="services" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Professional Services
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive IT solutions and services to help your business thrive in the digital age
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-red-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start">
                        <span className="text-red-400 mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="text-center">
                    <p className="text-red-400 font-bold text-lg">{service.price}</p>
                    <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg p-8 mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every business is unique. Let's discuss your specific requirements and create a tailored solution that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg transition-colors duration-300">
              Schedule Consultation
            </button>
            <button className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-3 px-8 rounded-lg transition-colors duration-300">
              View Portfolio
            </button>
          </div>
        </motion.div>

        {/* Service Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          <div>
            <h4 className="text-3xl font-bold text-red-400 mb-2">50+</h4>
            <p className="text-gray-300">Projects Completed</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-400 mb-2">24/7</h4>
            <p className="text-gray-300">Support Available</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-400 mb-2">99%</h4>
            <p className="text-gray-300">Client Satisfaction</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-400 mb-2">4+</h4>
            <p className="text-gray-300">Years Experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;