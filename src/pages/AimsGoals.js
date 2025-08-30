import React, { useState, useEffect } from 'react';
import './AimsGoals.css';

const AimsGoals = () => {
  const [aimsGoalsData, setAimsGoalsData] = useState({
    objectivesTitle: 'Our Objectives',
    objectivesContent: 'We strive to advance evidence-based research methodologies by developing innovative tools and frameworks that enhance the quality and reliability of scientific inquiry across diverse fields.',
    goalsTitle: 'Our Goals',
    goalsContent: 'Our primary goals include establishing robust research standards, fostering collaboration among researchers, and creating accessible resources that promote evidence-based decision making in academia and industry.',
    visionTitle: 'Our Vision',
    visionContent: 'We envision a future where evidence-based research is the standard across all disciplines, where researchers have access to cutting-edge tools and methodologies, and where scientific findings drive positive change in society.'
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
      
      if (data.aimsGoals) {
        setAimsGoalsData(prevData => ({
          ...prevData,
          ...data.aimsGoals
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_aimsGoalsContent', JSON.stringify(data.aimsGoals));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch aims goals content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_aimsGoalsContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setAimsGoalsData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded aims goals content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached aims goals data:', parseErr);
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
      <div className="aims-goals-page">
        <div className="container">
          <div className="loading-spinner">Loading aims and goals content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="aims-goals-page">
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
          <h1>Our Aims & Goals</h1>
        </header>

        <main className="page-content">
          <section className="content-section">
            <div className="section-content">
              <h2>{aimsGoalsData.objectivesTitle}</h2>
              <div className="content-text">
                {aimsGoalsData.objectivesContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{aimsGoalsData.goalsTitle}</h2>
              <div className="content-text">
                {aimsGoalsData.goalsContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{aimsGoalsData.visionTitle}</h2>
              <div className="content-text">
                {aimsGoalsData.visionContent.split('\n').map((paragraph, index) => (
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

export default AimsGoals;
