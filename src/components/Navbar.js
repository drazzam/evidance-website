import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#/" className="navbar-brand" onClick={closeMenu}>
          Evidance
        </a>
        
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>
        
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#/" className="navbar-link" onClick={closeMenu}>Home</a>
          </li>
          <li className="navbar-item">
            <a href="#/who-we-are" className="navbar-link" onClick={closeMenu}>Who We Are</a>
          </li>
          <li className="navbar-item">
            <a href="#/aims-goals" className="navbar-link" onClick={closeMenu}>Aims & Goals</a>
          </li>
          <li className="navbar-item">
            <a href="#/success-record" className="navbar-link" onClick={closeMenu}>Success Record</a>
          </li>
          <li className="navbar-item">
            <a href="#/visionary-model" className="navbar-link" onClick={closeMenu}>Visionary Model</a>
          </li>
          <li className="navbar-item">
            <a href="#/publications" className="navbar-link" onClick={closeMenu}>Publications</a>
          </li>
          <li className="navbar-item">
            <a href="#/join-us" className="navbar-link navbar-cta" onClick={closeMenu}>Join Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
