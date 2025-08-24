import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/evidance-website/images/evidance_logo.PNG" alt="Evidance" className="logo-img" />
          <span className="logo-text">Evidance</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-links ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/who-we-are" 
              className={`nav-links ${location.pathname === '/who-we-are' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Who We Are
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/aims-goals" 
              className={`nav-links ${location.pathname === '/aims-goals' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Aims & Goals
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/success-record" 
              className={`nav-links ${location.pathname === '/success-record' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Success Record
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/visionary-model" 
              className={`nav-links ${location.pathname === '/visionary-model' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Visionary Model
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/join-us" 
              className={`nav-links nav-links-cta ${location.pathname === '/join-us' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Join Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
