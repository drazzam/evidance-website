import React, { useState, useEffect } from 'react';

const WhoWeAre = () => {
  const [content, setContent] = useState({
    storyTitle: 'Our Story',
    storyContent: 'Loading...',
    teamTitle: 'Our Team',
    teamContent: 'Loading...',
    valuesTitle: 'Our Values',
    valuesContent: 'Loading...'
  });

  useEffect(() => {
    loadContent();
    const interval = setInterval(loadContent, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = () => {
    try {
      const saved = localStorage.getItem('evidance_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.whoWeAre) {
          setContent(data.whoWeAre);
        }
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  return (
    <div className="who-we-are-page">
      <div className="page-header">
        <h1>Who We Are</h1>
        <p>Pioneering Clinical Research Excellence in Saudi Arabia</p>
      </div>
      
      <div className="container">
        <div className="content-sections">
          <section className="content-section">
            <div className="section-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/team-photo.png`}
                alt="Our Team" 
                className="section-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="section-content">
              <h2>{content.storyTitle}</h2>
              <p>{content.storyContent}</p>
            </div>
          </section>

          <section className="content-section reverse">
            <div className="section-content">
              <h2>{content.teamTitle}</h2>
              <p>{content.teamContent}</p>
            </div>
            <div className="section-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/research-team.png`}
                alt="Research Team" 
                className="section-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </section>

          <section className="content-section">
            <div className="section-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/values-graphic.png`}
                alt="Our Values" 
                className="section-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="section-content">
              <h2>{content.valuesTitle}</h2>
              <p>{content.valuesContent}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
