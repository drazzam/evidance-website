import React, { useEffect, useState } from 'react';
import dataService from '../services/dataService';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [heroData, setHeroData] = useState({
    title1: 'Advancing Healthcare Through',
    title2: 'Innovative Research',
    subtitle: "Join Evidance, Saudi Arabia's pioneering modified clinical research organization",
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
    setLoaded(true);
    
    const loadHeroContent = async () => {
      // Check local cache first
      const cached = localStorage.getItem('heroContent');
      if (cached) {
        try {
          setHeroData(JSON.parse(cached));
        } catch (e) {}
      }

      // Load from global database
      try {
        const data = await dataService.loadData();
        if (data && data.heroContent) {
          setHeroData(data.heroContent);
          localStorage.setItem('heroContent', JSON.stringify(data.heroContent));
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    };

    loadHeroContent();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadHeroContent, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`hero ${loaded ? 'loaded' : ''}`}>
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-logo-container">
            <img 
              src={process.env.PUBLIC_URL + '/images/evidance_logo_transparent.png'} 
              alt="Evidance" 
              className="hero-logo"
            />
          </div>
          
          <h1 className="hero-title">
            {heroData.title1}
            <span className="text-gradient"> {heroData.title2}</span>
          </h1>
          
          <p className="hero-subtitle">
            {heroData.subtitle}
          </p>
          
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Expert Supervision</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Practical Training</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Published Research</span>
            </div>
          </div>
          
          <div className="hero-cta">
            <a href="#section-1" className="btn btn-primary btn-large">
              Explore Our Vision
            </a>
            <a href="#/join-us" className="btn btn-secondary btn-large">
              Get Started Today
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>{heroData.stat1Number}</h3>
              <p>{heroData.stat1Text}</p>
            </div>
            <div className="stat-item">
              <h3>{heroData.stat2Number}</h3>
              <p>{heroData.stat2Text}</p>
            </div>
            <div className="stat-item">
              <h3>{heroData.stat3Number}</h3>
              <p>{heroData.stat3Text}</p>
            </div>
            <div className="stat-item">
              <h3>{heroData.stat4Number}</h3>
              <p>{heroData.stat4Text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
