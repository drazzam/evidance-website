import React, { useState, useEffect } from 'react';
import './WhoWeAre.css';

const WhoWeAre = () => {
  const [whoWeAreData, setWhoWeAreData] = useState({
    storyTitle: 'Our Story',
    storyContent: 'Evidance was founded with a vision to transform research methodologies through evidence-based approaches. Our journey began with a commitment to advancing scientific rigor and improving research outcomes across various disciplines.',
    teamTitle: 'Our Team',
    teamContent: 'We are a diverse group of researchers, data scientists, and technology experts united by our passion for evidence-based research. Our multidisciplinary team brings together expertise in statistics, research methodology, and cutting-edge technology.',
    valuesTitle: 'Our Values',
    valuesContent: 'Integrity, innovation, and collaboration form the foundation of everything we do. We believe in transparency, rigorous methodology, and the power of evidence to drive meaningful change in research and society.'
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
      
      if (data.whoWeAre) {
        setWhoWeAreData(prevData => ({
          ...prevData,
          ...data.whoWeAre
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_whoWeAreContent', JSON.stringify(data.whoWeAre));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch who we are content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_whoWeAreContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setWhoWeAreData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded who we are content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached who we are data:', parseErr);
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
      <div className="who-we-are-page">
        <div className="container">
          <div className="loading-spinner">Loading who we are content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="who-we-are-page">
      <div className="container">
        {error && (
          <div className="error-notice" style={{ 
            backgroundColor: '#fff3cd', 
            color: '#856404', 
            padding: '15px', 
            borderRadius: '4px', 
            marginBottom: '30px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            Using cached content (GitHub data temporarily unavailable)
          </div>
        )}

        <header className="page-header">
          <h1>Who We Are</h1>
        </header>

        <main className="page-content">
          <section className="content-section">
            <div className="section-content">
              <h2>{whoWeAreData.storyTitle}</h2>
              <div className="content-text">
                {whoWeAreData.storyContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{whoWeAreData.teamTitle}</h2>
              <div className="content-text">
                {whoWeAreData.teamContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{whoWeAreData.valuesTitle}</h2>
              <div className="content-text">
                {whoWeAreData.valuesContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WhoWeAre;
