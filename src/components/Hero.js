import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
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
            Advancing Healthcare Through
            <span className="text-gradient"> Innovative Research</span>
          </h1>
          
          <p className="hero-subtitle">
            Join Evidance, Saudi Arabia's pioneering modified clinical research organization, 
            where healthcare students and practitioners gain hands-on research experience 
            leading to published work.
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
              <h3>50+</h3>
              <p>Research Projects</p>
            </div>
            <div className="stat-item">
              <h3>250+</h3>
              <p>Trained Researchers</p>
            </div>
            <div className="stat-item">
              <h3>25+</h3>
              <p>Published Papers</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Accepted Papers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
