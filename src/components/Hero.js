import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title1: 'Evidance',
    title2: 'Research Platform',
    subtitle: 'Advancing evidence-based research methodologies',
    stat1Number: '100+',
    stat1Text: 'Research Projects',
    stat2Number: '50+',
    stat2Text: 'Publications',
    stat3Number: '25+',
    stat3Text: 'Partner Organizations',
    stat4Number: '1000+',
    stat4Text: 'Citations'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContent = async () => {
    try {
      setError(null);
      const response = await fetch(`${process.env.PUBLIC_URL}/data/website-content.json?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.heroContent) {
        setHeroData(prevData => ({
          ...prevData,
          ...data.heroContent
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_heroContent', JSON.stringify(data.heroContent));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch hero content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_heroContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setHeroData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded hero content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached hero data:', parseErr);
        }
      }
      
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
    
    // Set up auto-refresh every 60 seconds
    const refreshInterval = setInterval(loadContent, 60000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          {error && (
            <div className="error-notice" style={{ 
              backgroundColor: '#fff3cd', 
              color: '#856404', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              Using cached content (GitHub data temporarily unavailable)
            </div>
          )}
          
          <h1 className="hero-title">
            <span className="title-part-1">{heroData.title1}</span>
            <span className="title-part-2">{heroData.title2}</span>
          </h1>
          
          <p className="hero-subtitle">{heroData.subtitle}</p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{heroData.stat1Number}</div>
              <div className="stat-text">{heroData.stat1Text}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{heroData.stat2Number}</div>
              <div className="stat-text">{heroData.stat2Text}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{heroData.stat3Number}</div>
              <div className="stat-text">{heroData.stat3Text}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{heroData.stat4Number}</div>
              <div className="stat-text">{heroData.stat4Text}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
