import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaLock, FaEdit, FaPlus, FaTrash, FaSave, FaEye, FaSignOutAlt,
  FaHome, FaInfoCircle, FaCogs, FaBriefcase, FaGraduationCap, 
  FaEnvelope, FaTimes,
  FaEyeSlash, FaArrowUp, FaArrowDown, FaCog, FaGripVertical
} from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Admin = () => {
  const { 
    homeData, aboutData, skillsData, experienceData, educationData, 
    projectsData, contactData, updateHomeData, updateAboutData, 
    updateSkillsData, updateExperienceData, updateEducationData, 
    updateProjectsData, updateContactData 
  } = usePortfolio();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('home');
  const [editMode, setEditMode] = useState({});
  const [sectionVisibility, setSectionVisibility] = useState({
    home: true,
    about: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    contact: true
  });
  const [sectionOrder, setSectionOrder] = useState([
    'home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'
  ]);



  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin/admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  const toggleEditMode = (section, id = null) => {
    const key = id ? `${section}_${id}` : section;
    setEditMode(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Update functions for each section (now using context)
  const handleUpdateHomeData = (field, value) => {
    updateHomeData({ ...homeData, [field]: value });
  };

  const handleUpdateAboutData = (field, value) => {
    updateAboutData({ ...aboutData, [field]: value });
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: 'New Skill',
      level: 50,
      category: 'General',
      icon: 'FaCog'
    };
    updateSkillsData([...skillsData, newSkill]);
  };

  const updateSkill = (id, field, value) => {
    const updatedSkills = skillsData.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateSkillsData(updatedSkills);
  };

  const deleteSkill = (id) => {
    const updatedSkills = skillsData.filter(skill => skill.id !== id);
    updateSkillsData(updatedSkills);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: 'New Position',
      company: 'Company Name',
      period: '2024 - Present',
      description: 'Job description',
      responsibilities: ['Responsibility 1']
    };
    updateExperienceData([...experienceData, newExp]);
  };

  const updateExperience = (id, field, value) => {
    const updatedExperience = experienceData.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperienceData(updatedExperience);
  };

  const deleteExperience = (id) => {
    const updatedExperience = experienceData.filter(exp => exp.id !== id);
    updateExperienceData(updatedExperience);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      technologies: ['Technology'],
      link: '#',
      github: '#',
      status: 'Planning',
      category: 'General'
    };
    updateProjectsData([...projectsData, newProject]);
  };

  const updateProject = (id, field, value) => {
    const updatedProjects = projectsData.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    updateProjectsData(updatedProjects);
  };

  const deleteProject = (id) => {
    const updatedProjects = projectsData.filter(project => project.id !== id);
    updateProjectsData(updatedProjects);
  };



  const handleUpdateContactData = (field, value) => {
    updateContactData({ ...contactData, [field]: value });
  };

  // Section management functions
  const toggleSectionVisibility = (sectionId) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const moveSectionUp = (sectionId) => {
    const currentIndex = sectionOrder.indexOf(sectionId);
    if (currentIndex > 0) {
      const newOrder = [...sectionOrder];
      [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
      setSectionOrder(newOrder);
    }
  };

  const moveSectionDown = (sectionId) => {
    const currentIndex = sectionOrder.indexOf(sectionId);
    if (currentIndex < sectionOrder.length - 1) {
      const newOrder = [...sectionOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      setSectionOrder(newOrder);
    }
  };

  const moveSkillUp = (skillId) => {
    const currentIndex = skillsData.findIndex(skill => skill.id === skillId);
    if (currentIndex > 0) {
      const newSkills = [...skillsData];
      [newSkills[currentIndex - 1], newSkills[currentIndex]] = [newSkills[currentIndex], newSkills[currentIndex - 1]];
      updateSkillsData(newSkills);
    }
  };

  const moveSkillDown = (skillId) => {
    const currentIndex = skillsData.findIndex(skill => skill.id === skillId);
    if (currentIndex < skillsData.length - 1) {
      const newSkills = [...skillsData];
      [newSkills[currentIndex], newSkills[currentIndex + 1]] = [newSkills[currentIndex + 1], newSkills[currentIndex]];
      updateSkillsData(newSkills);
    }
  };

  const moveProjectUp = (projectId) => {
    const currentIndex = projectsData.findIndex(project => project.id === projectId);
    if (currentIndex > 0) {
      const newProjects = [...projectsData];
      [newProjects[currentIndex - 1], newProjects[currentIndex]] = [newProjects[currentIndex], newProjects[currentIndex - 1]];
      updateProjectsData(newProjects);
    }
  };

  const moveProjectDown = (projectId) => {
    const currentIndex = projectsData.findIndex(project => project.id === projectId);
    if (currentIndex < projectsData.length - 1) {
      const newProjects = [...projectsData];
      [newProjects[currentIndex], newProjects[currentIndex + 1]] = [newProjects[currentIndex + 1], newProjects[currentIndex]];
      updateProjectsData(newProjects);
    }
  };



  // Education functions
  const handleUpdateEducationData = (field, value) => {
    updateEducationData({ ...educationData, [field]: value });
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: 'New Certification',
      issuer: 'Issuer Name',
      year: '2024'
    };
    updateEducationData({
      ...educationData,
      certifications: [...educationData.certifications, newCert]
    });
  };

  const updateCertification = (id, field, value) => {
    updateEducationData({
      ...educationData,
      certifications: educationData.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const deleteCertification = (id) => {
    updateEducationData({
      ...educationData,
      certifications: educationData.certifications.filter(cert => cert.id !== id)
    });
  };





  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <FaLock className="text-red-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">Access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300 text-sm mb-2">Demo Credentials:</p>
            <p className="text-gray-400 text-xs">Username: admin</p>
            <p className="text-gray-400 text-xs">Password: admin123</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'layout', label: 'Layout Manager', icon: FaCog },
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'about', label: 'About', icon: FaInfoCircle },
    { id: 'skills', label: 'Skills', icon: FaCogs },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'projects', label: 'Projects', icon: FaEdit },
    { id: 'contact', label: 'Contact', icon: FaEnvelope },
    { id: 'preview', label: 'Preview', icon: FaEye }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Portfolio Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 text-sm ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <IconComponent className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Layout Manager Tab */}
        {activeTab === 'layout' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Section Layout Manager</h2>
              <p className="text-gray-300 mb-6">Manage section visibility and order for your portfolio</p>
            </div>

            <div className="space-y-4">
              {sectionOrder.map((sectionId, index) => {
                const sectionNames = {
                  home: 'Home',
                  about: 'About',
                  skills: 'Skills',
                  experience: 'Experience',
                  education: 'Education',
                  projects: 'Projects',
                  contact: 'Contact'
                };
                
                return (
                  <div key={sectionId} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaGripVertical className="text-gray-400 mr-3" />
                        <span className="text-white font-medium">{sectionNames[sectionId]}</span>
                        <span className="ml-2 text-gray-400 text-sm">#{index + 1}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          onClick={() => toggleSectionVisibility(sectionId)}
                          className={`p-2 rounded transition-colors duration-300 ${
                            sectionVisibility[sectionId]
                              ? 'text-green-400 hover:text-green-300'
                              : 'text-red-400 hover:text-red-300'
                          }`}
                          title={sectionVisibility[sectionId] ? 'Hide Section' : 'Show Section'}
                        >
                          {sectionVisibility[sectionId] ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        
                        {/* Move Up */}
                        <button
                          onClick={() => moveSectionUp(sectionId)}
                          disabled={index === 0}
                          className={`p-2 rounded transition-colors duration-300 ${
                            index === 0
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-blue-400 hover:text-blue-300'
                          }`}
                          title="Move Up"
                        >
                          <FaArrowUp />
                        </button>
                        
                        {/* Move Down */}
                        <button
                          onClick={() => moveSectionDown(sectionId)}
                          disabled={index === sectionOrder.length - 1}
                          className={`p-2 rounded transition-colors duration-300 ${
                            index === sectionOrder.length - 1
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-blue-400 hover:text-blue-300'
                          }`}
                          title="Move Down"
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        sectionVisibility[sectionId]
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {sectionVisibility[sectionId] ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Use the eye icon to show/hide sections on your portfolio</li>
                <li>• Use arrow buttons to reorder sections</li>
                <li>• Changes are applied immediately to your portfolio</li>
                <li>• Hidden sections won't appear in navigation or content</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Home Tab */}
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Home Section</h2>
              <button
                onClick={() => toggleEditMode('home')}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                {editMode.home ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(homeData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {editMode.home ? (
                    key === 'description' ? (
                      <textarea
                        value={value}
                        onChange={(e) => handleUpdateHomeData(key, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                        rows="3"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleUpdateHomeData(key, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                      />
                    )
                  ) : (
                    <div className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300">
                      {value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">About Section</h2>
              <button
                onClick={() => toggleEditMode('about')}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                {editMode.about ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(aboutData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {editMode.about ? (
                    key === 'description' ? (
                      <textarea
                        value={value}
                        onChange={(e) => handleUpdateAboutData(key, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                        rows="4"
                      />
                    ) : key === 'journey' ? (
                      <div className="space-y-3">
                        {Object.entries(value).map(([paragraphKey, paragraphValue]) => (
                          <div key={paragraphKey}>
                            <label className="block text-gray-400 mb-1 text-sm capitalize">{paragraphKey.replace(/([A-Z])/g, ' $1')}</label>
                            <textarea
                              value={paragraphValue}
                              onChange={(e) => handleUpdateAboutData('journey', { ...value, [paragraphKey]: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                              rows="3"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleUpdateAboutData(key, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                      />
                    )
                  ) : (
                    <div className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300">
                      {key === 'journey' ? (
                        <div className="space-y-2">
                          {Object.entries(value).map(([paragraphKey, paragraphValue]) => (
                            <div key={paragraphKey}>
                              <div className="text-gray-400 text-sm mb-1 capitalize">{paragraphKey.replace(/([A-Z])/g, ' $1')}</div>
                              <div className="text-gray-300">{paragraphValue}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        value
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Skills Management</h2>
              <button
                onClick={addSkill}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                Add Skill
              </button>
            </div>

            <div className="space-y-4">
               {skillsData.map((skill, index) => (
                 <div key={skill.id} className="bg-gray-700 rounded-lg p-4">
                   <div className="flex justify-between items-start">
                     <div className="flex items-center mr-4">
                       <FaGripVertical className="text-gray-400 mr-2" />
                       <span className="text-gray-400 text-sm">#{index + 1}</span>
                     </div>
                     <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {editMode[`skills_${skill.id}`] ? (
                        <>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Skill name"
                          />
                          <input
                            type="number"
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            min="0"
                            max="100"
                          />
                          <input
                            type="text"
                            value={skill.category}
                            onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Category"
                          />
                        </>
                      ) : (
                        <>
                          <div className="text-white font-medium">{skill.name}</div>
                          <div className="text-gray-300">{skill.level}%</div>
                          <div className="text-gray-400">{skill.category}</div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                       {/* Reorder buttons */}
                       <button
                         onClick={() => moveSkillUp(skill.id)}
                         disabled={index === 0}
                         className={`transition-colors duration-300 ${
                           index === 0
                             ? 'text-gray-500 cursor-not-allowed'
                             : 'text-blue-400 hover:text-blue-300'
                         }`}
                         title="Move Up"
                       >
                         <FaArrowUp />
                       </button>
                       <button
                         onClick={() => moveSkillDown(skill.id)}
                         disabled={index === skillsData.length - 1}
                         className={`transition-colors duration-300 ${
                           index === skillsData.length - 1
                             ? 'text-gray-500 cursor-not-allowed'
                             : 'text-blue-400 hover:text-blue-300'
                         }`}
                         title="Move Down"
                       >
                         <FaArrowDown />
                       </button>
                       
                       {/* Edit and Delete buttons */}
                       <button
                         onClick={() => toggleEditMode('skills', skill.id)}
                         className="text-green-400 hover:text-green-300 transition-colors duration-300"
                       >
                         {editMode[`skills_${skill.id}`] ? <FaSave /> : <FaEdit />}
                       </button>
                       <button
                         onClick={() => deleteSkill(skill.id)}
                         className="text-red-400 hover:text-red-300 transition-colors duration-300"
                       >
                         <FaTrash />
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Projects Management</h2>
              <button
                onClick={addProject}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                Add Project
              </button>
            </div>

            <div className="space-y-4">
              {projectsData.map((project, index) => (
                <div key={project.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      {editMode[`projects_${project.id}`] ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Project title"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            rows="3"
                            placeholder="Project description"
                          />
                          <input
                            type="text"
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', '))}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Technologies (comma separated)"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={project.link}
                              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                              placeholder="Live link"
                            />
                            <input
                              type="text"
                              value={project.github}
                              onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                              placeholder="GitHub link"
                            />
                            <select
                              value={project.category}
                              onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            >
                              <option value="Infrastructure">Infrastructure</option>
                              <option value="Security">Security</option>
                              <option value="Development">Development</option>
                              <option value="Cloud">Cloud</option>
                              <option value="General">General</option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-300 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                              {project.category}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                              {project.status}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                       {/* Reorder buttons */}
                       <button
                         onClick={() => moveProjectUp(project.id)}
                         disabled={index === 0}
                         className={`transition-colors duration-300 ${
                           index === 0
                             ? 'text-gray-500 cursor-not-allowed'
                             : 'text-blue-400 hover:text-blue-300'
                         }`}
                         title="Move Up"
                       >
                         <FaArrowUp />
                       </button>
                       <button
                         onClick={() => moveProjectDown(project.id)}
                         disabled={index === projectsData.length - 1}
                         className={`transition-colors duration-300 ${
                           index === projectsData.length - 1
                             ? 'text-gray-500 cursor-not-allowed'
                             : 'text-blue-400 hover:text-blue-300'
                         }`}
                         title="Move Down"
                       >
                         <FaArrowDown />
                       </button>
                       
                       {/* Edit and Delete buttons */}
                       <button
                         onClick={() => toggleEditMode('projects', project.id)}
                         className="text-green-400 hover:text-green-300 transition-colors duration-300"
                       >
                         {editMode[`projects_${project.id}`] ? <FaSave /> : <FaEdit />}
                       </button>
                       <button
                         onClick={() => deleteProject(project.id)}
                         className="text-red-400 hover:text-red-300 transition-colors duration-300"
                       >
                         <FaTrash />
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Experience Management</h2>
              <button
                onClick={addExperience}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <div key={exp.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center mr-4">
                      <FaGripVertical className="text-gray-400 mr-2" />
                      <span className="text-gray-400 text-sm">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      {editMode[`experience_${exp.id}`] ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Job title"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Company name"
                          />
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Period (e.g., 2023 - Present)"
                          />
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                            rows="3"
                            placeholder="Job description"
                          />
                          <div>
                            <label className="block text-gray-300 mb-2">Responsibilities (one per line)</label>
                            <textarea
                              value={exp.responsibilities.join('\n')}
                              onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n'))}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                              rows="4"
                              placeholder="Enter responsibilities, one per line"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{exp.title}</h3>
                          <p className="text-red-400 mb-1">{exp.company}</p>
                          <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                          <p className="text-gray-300 mb-3">{exp.description}</p>
                          <div className="space-y-1">
                            {exp.responsibilities.map((resp, idx) => (
                              <div key={idx} className="text-gray-400 text-sm flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                {resp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleEditMode('experience', exp.id)}
                        className="text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        {editMode[`experience_${exp.id}`] ? <FaSave /> : <FaEdit />}
                      </button>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Education Management</h2>
              <button
                onClick={() => toggleEditMode('education')}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                {editMode.education ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Main Education */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Degree Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(educationData).filter(([key]) => key !== 'certifications').map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                      {editMode.education ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleUpdateEducationData(key, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-red-500"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-600 rounded text-gray-300">{value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Certifications</h3>
                  <button
                    onClick={addCertification}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-300 text-sm"
                  >
                    <FaPlus className="mr-1" />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {educationData.certifications.map((cert, index) => (
                    <div key={cert.id} className="bg-gray-600 rounded p-3">
                      {editMode[`cert_${cert.id}`] ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                            className="px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Certification name"
                          />
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            className="px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Issuer"
                          />
                          <input
                            type="text"
                            value={cert.year}
                            onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                            className="px-3 py-2 bg-gray-500 border border-gray-400 rounded text-white focus:outline-none focus:border-red-500"
                            placeholder="Year"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{cert.name}</p>
                            <p className="text-gray-300 text-sm">{cert.issuer} • {cert.year}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => toggleEditMode('cert', cert.id)}
                          className="text-green-400 hover:text-green-300 transition-colors duration-300 text-sm"
                        >
                          {editMode[`cert_${cert.id}`] ? <FaSave /> : <FaEdit />}
                        </button>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}





        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Contact Information</h2>
              <button
                onClick={() => toggleEditMode('contact')}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                {editMode.contact ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(contactData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {editMode.contact ? (
                    <input
                      type={key === 'email' ? 'email' : key.includes('link') ? 'url' : 'text'}
                      value={value}
                      onChange={(e) => handleUpdateContactData(key, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300">
                      {value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <h2 className="text-xl font-bold text-white mb-4">Preview Portfolio</h2>
            <p className="text-gray-300 mb-6">
              Click the button below to open your portfolio in a new tab
            </p>
            <button
              onClick={() => window.open('/', '_blank')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Open Portfolio
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;