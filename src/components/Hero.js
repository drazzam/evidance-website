import React, { useState, useEffect } from 'react';
import './Hero.css';

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
    // Check for updates every 30 seconds
    const interval = setInterval(loadContent, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = () => {
    try {
      // Load from localStorage (updated by Admin panel)
      const saved = localStorage.getItem('evidance_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.heroContent) {
          setContent(data.heroContent);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
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
