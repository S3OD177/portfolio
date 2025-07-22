import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Admin from './pages/Admin';
import './index.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Home />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Projects />
                <Services />
                <Testimonials />
                <Blog />
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;