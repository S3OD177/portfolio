import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFilter, FaShieldAlt, FaBug, FaLock } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { projectsData } = usePortfolio();

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'security', name: 'Security' },
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  const featuredProjects = projectsData.filter(project => project.featured);

  const ProjectCard = ({ project, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="card group hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <div className="w-full h-48 bg-gradient-to-br from-red-900/20 to-gray-900/40 flex items-center justify-center">
            <div className="text-center">
              {project.category === 'web-development' && <FaShieldAlt className="text-red-500 text-4xl mx-auto mb-2" />}
              {project.category === 'infrastructure' && <FaBug className="text-red-500 text-4xl mx-auto mb-2" />}
              {project.category === 'security' && <FaLock className="text-red-500 text-4xl mx-auto mb-2" />}
              <span className="text-red-400 text-lg font-semibold">
                {project.title}
              </span>
            </div>
          </div>
          {/* Replace with actual image */}
          {/* <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          /> */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-gray-300 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-4 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center"
              >
                <FaGithub /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              IT Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A collection of IT and technology projects I've developed, showcasing my expertise in
              system administration, web development, and technology solution implementation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-400">
                Advanced IT solutions and technology projects that demonstrate my expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              All Projects
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    filter === category.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                  }`}
                >
                  <FaFilter size={14} />
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>


    </section>
  );
};

export default Projects;