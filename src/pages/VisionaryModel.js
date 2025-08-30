import React, { useState, useEffect } from 'react';
import './VisionaryModel.css';

const VisionaryModel = () => {
  const [visionaryModelData, setVisionaryModelData] = useState({
    approachTitle: 'Our Approach',
    approachContent: 'Our visionary model is built on a foundation of innovative research methodologies that prioritize evidence-based decision making, rigorous data analysis, and collaborative problem-solving approaches.',
    frameworkTitle: 'Our Framework',
    frameworkContent: 'We have developed a comprehensive framework that integrates cutting-edge technology with proven research principles, creating a systematic approach to evidence-based research that can be adapted across various disciplines and contexts.',
    platformTitle: 'Our Platform',
    platformContent: 'Our research platform provides researchers with advanced tools and resources needed to conduct high-quality, evidence-based studies, featuring state-of-the-art analytics, collaboration features, and comprehensive data management capabilities.'
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
      
      if (data.visionaryModel) {
        setVisionaryModelData(prevData => ({
          ...prevData,
          ...data.visionaryModel
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_visionaryModelContent', JSON.stringify(data.visionaryModel));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch visionary model content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_visionaryModelContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setVisionaryModelData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded visionary model content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached visionary model data:', parseErr);
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
      <div className="visionary-model-page">
        <div className="container">
          <div className="loading-spinner">Loading visionary model content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="visionary-model-page">
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
          <h1>Visionary Model</h1>
        </header>

        <main className="page-content">
          <section className="content-section">
            <div className="section-content">
              <h2>{visionaryModelData.approachTitle}</h2>
              <div className="content-text">
                {visionaryModelData.approachContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{visionaryModelData.frameworkTitle}</h2>
              <div className="content-text">
                {visionaryModelData.frameworkContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{visionaryModelData.platformTitle}</h2>
              <div className="content-text">
                {visionaryModelData.platformContent.split('\n').map((paragraph, index) => (
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

export default VisionaryModel;
