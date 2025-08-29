import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h2 className="footer-logo-text">Evidance</h2>
            <p className="footer-description">
              Transforming clinical research in Saudi Arabia through innovative 
              collaboration and hands-on training experiences.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Get in Touch</h3>
            <p className="footer-contact">
              Ready to advance your research career? 
              Connect with us to learn more about our programs.
            </p>
            <a href="https://wa.me/00966549450781" target="_blank" rel="noopener noreferrer" className="btn btn-accent footer-cta">
              Contact Us!
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Evidance. All rights reserved. | Proudly supporting Saudi Vision 2030
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
