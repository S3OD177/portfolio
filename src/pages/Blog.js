import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTags, FaArrowRight, FaSearch } from 'react-icons/fa';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Cybersecurity Practices for Small Businesses',
      excerpt: 'Learn the fundamental security measures every small business should implement to protect against cyber threats and data breaches.',
      content: 'In today\'s digital landscape, cybersecurity is not just a concern for large corporations...',
      category: 'Cybersecurity',
      author: 'Saud Albin Zaid',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['Security', 'Business', 'Best Practices'],
      featured: true
    },
    {
      id: 2,
      title: 'Cloud Migration: A Step-by-Step Guide',
      excerpt: 'Discover the essential steps and considerations for successfully migrating your business infrastructure to the cloud.',
      content: 'Cloud migration has become a critical strategy for businesses looking to improve scalability...',
      category: 'Cloud Computing',
      author: 'Saud Albin Zaid',
      date: '2024-01-10',
      readTime: '8 min read',
      tags: ['Cloud', 'Migration', 'AWS', 'Azure'],
      featured: false
    },
    {
      id: 3,
      title: 'Network Optimization Techniques for Better Performance',
      excerpt: 'Explore advanced network optimization strategies to improve your organization\'s connectivity and performance.',
      content: 'Network performance is crucial for business operations in the modern digital workplace...',
      category: 'Networking',
      author: 'Saud Albin Zaid',
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['Networking', 'Performance', 'Optimization'],
      featured: false
    },
    {
      id: 4,
      title: 'The Future of IT Support: Automation and AI',
      excerpt: 'How artificial intelligence and automation are transforming the IT support landscape and what it means for businesses.',
      content: 'The IT support industry is undergoing a significant transformation with the integration of AI...',
      category: 'IT Support',
      author: 'Saud Albin Zaid',
      date: '2023-12-28',
      readTime: '7 min read',
      tags: ['AI', 'Automation', 'Support', 'Future'],
      featured: true
    },
    {
      id: 5,
      title: 'Building Resilient IT Infrastructure',
      excerpt: 'Learn how to design and implement IT infrastructure that can withstand failures and ensure business continuity.',
      content: 'Business continuity depends heavily on having resilient IT infrastructure that can handle...',
      category: 'Infrastructure',
      author: 'Saud Albin Zaid',
      date: '2023-12-20',
      readTime: '9 min read',
      tags: ['Infrastructure', 'Resilience', 'Business Continuity'],
      featured: false
    },
    {
      id: 6,
      title: 'Web Development Trends in 2024',
      excerpt: 'Stay ahead of the curve with the latest web development trends and technologies shaping the industry.',
      content: 'The web development landscape continues to evolve rapidly with new frameworks and technologies...',
      category: 'Web Development',
      author: 'Saud Albin Zaid',
      date: '2023-12-15',
      readTime: '4 min read',
      tags: ['Web Development', 'Trends', '2024', 'Technology'],
      featured: false
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest Insights & Articles
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights in technology and IT
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-8">Featured Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-red-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm">
                        <FaUser className="mr-2" />
                        <span className="mr-4">{post.author}</span>
                        <FaCalendarAlt className="mr-2" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <button className="text-red-400 hover:text-red-300 transition-colors duration-300">
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h3>
            <span className="text-gray-400">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 hover:text-red-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-gray-400 text-xs mb-2">
                      <FaUser className="mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <FaCalendarAlt className="mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-xs">
                      <FaTags className="mr-2" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-gray-500">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">
                    Read More <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg p-8 mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to get the latest articles and insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;