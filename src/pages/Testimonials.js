import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      position: 'IT Manager',
      company: 'Tech Solutions KSA',
      image: null,
      rating: 5,
      text: 'Saud provided exceptional technical support for our company. His expertise in system administration and network configuration helped us optimize our IT infrastructure significantly. Highly recommended!',
      project: 'Network Infrastructure Upgrade'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      position: 'Operations Director',
      company: 'Digital Innovations Ltd',
      image: null,
      rating: 5,
      text: 'Working with Saud was a game-changer for our organization. His cybersecurity consulting helped us identify and fix critical vulnerabilities. Professional, knowledgeable, and reliable.',
      project: 'Security Assessment & Implementation'
    },
    {
      id: 3,
      name: 'Mohammed Al-Otaibi',
      position: 'CEO',
      company: 'StartUp Hub',
      image: null,
      rating: 5,
      text: 'Saud\'s cloud migration services were exactly what we needed. He made the transition seamless and provided excellent training for our team. Outstanding technical skills and communication.',
      project: 'Cloud Migration to AWS'
    },
    {
      id: 4,
      name: 'Sarah Al-Mansouri',
      position: 'Project Manager',
      company: 'Enterprise Solutions',
      image: null,
      rating: 5,
      text: 'The web development project exceeded our expectations. Saud delivered a responsive, secure, and user-friendly application on time and within budget. Excellent attention to detail.',
      project: 'Custom Web Application'
    },
    {
      id: 5,
      name: 'Khalid Al-Harbi',
      position: 'IT Coordinator',
      company: 'Educational Institute',
      image: null,
      rating: 5,
      text: 'Saud\'s IT training sessions were incredibly valuable for our staff. His ability to explain complex technical concepts in simple terms made learning enjoyable and effective.',
      project: 'Staff IT Training Program'
    },
    {
      id: 6,
      name: 'Nora Al-Qahtani',
      position: 'Business Owner',
      company: 'Retail Solutions',
      image: null,
      rating: 5,
      text: 'The technical support services provided by Saud have been exceptional. Quick response times, effective solutions, and professional service. Our business operations run smoothly thanks to his expertise.',
      project: 'Ongoing Technical Support'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            What clients say about working with me and the results we've achieved together
          </p>
        </motion.div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-8 md:p-12 relative overflow-hidden">
            <FaQuoteLeft className="absolute top-6 left-6 text-red-500/20 text-4xl" />
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                    "{testimonials[currentIndex].text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                    <FaUser className="text-red-400 text-2xl" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-red-400 font-semibold">
                      {testimonials[currentIndex].position}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500/20 hover:bg-red-500/40 text-red-400 p-3 rounded-full transition-colors duration-300"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500/20 hover:bg-red-500/40 text-red-400 p-3 rounded-full transition-colors duration-300"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="flex justify-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                "{testimonial.text.substring(0, 120)}..."
              </p>
              <div className="text-center">
                <h5 className="text-white font-semibold text-sm">{testimonial.name}</h5>
                <p className="text-red-400 text-xs">{testimonial.position}</p>
                <p className="text-gray-400 text-xs">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-gray-800/20 rounded-lg p-8 mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">50+</h4>
              <p className="text-gray-300">Happy Clients</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">99%</h4>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">5.0</h4>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-red-400 mb-2">24h</h4>
              <p className="text-gray-300">Response Time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;