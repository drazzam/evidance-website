import React, { useState, useEffect } from 'react';
import './Hero.css';

// JSONBin configuration (same as Admin.js)
const JSONBIN_CONFIG = {
  BIN_ID: '68b175b643b1c97be92f274d',
  MASTER_KEY: '$2a$10$WWXSel9VjGXEalWwyvd2P.t/EYY8DpBCWilIR1zqhYkVEFqt.1R4y',
  BASE_URL: 'https://api.jsonbin.io/v3'
};

const Hero = () => {
  const [content, setContent] = useState({
    title1: 'Advancing Healthcare Through',
    title2: 'Innovative Research',
    subtitle: "Join Evidance, Saudi Arabia's pioneering modified clinical research organization, where healthcare students and practitioners gain hands-on research experience leading to published work.",
    stat1Number: '50+',
    stat1Text: 'Research Projects',
    stat2Number: '250+',
    stat2Text: 'Trained Researchers',
    stat3Number: '25+',
    stat3Text: 'Published Papers',
    stat4Number: '15+',
    stat4Text: 'Accepted Papers'
  });

  useEffect(() => {
    loadContent();
    // Auto-refresh content every 30 seconds
    const interval = setInterval(loadContent, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = async () => {
    try {
      // First check localStorage cache
      const cached = localStorage.getItem('evidance_data_cache');
      const lastUpdate = localStorage.getItem('evidance_last_update');
      
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (data.heroContent) {
            setContent(data.heroContent);
          }
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }

      // Then fetch from JSONBin for latest updates
      const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/b/${JSONBIN_CONFIG.BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY
        }
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.record;
        
        if (data && data.heroContent) {
          setContent(data.heroContent);
          // Update cache
          localStorage.setItem('evidance_data_cache', JSON.stringify(data));
          localStorage.setItem('evidance_last_update', new Date().toISOString());
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Continue using cached or default content
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-logo-container">
          <img 
            src={`${process.env.PUBLIC_URL}/images/evidance_logo_transparent.png`}
            alt="Evidance Logo" 
            className="hero-logo"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">{content.title1}</span>
            <span className="title-line primary-gradient">{content.title2}</span>
          </h1>
          <p className="hero-subtitle">
            {content.subtitle}
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{content.stat1Number}</span>
              <span className="stat-text">{content.stat1Text}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{content.stat2Number}</span>
              <span className="stat-text">{content.stat2Text}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{content.stat3Number}</span>
              <span className="stat-text">{content.stat3Text}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{content.stat4Number}</span>
              <span className="stat-text">{content.stat4Text}</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#/who-we-are" className="btn btn-primary">Discover Our Mission</a>
            <a href="#/join-us" className="btn btn-secondary">Join Our Research Community</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
