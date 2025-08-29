import React, { useState, useEffect } from 'react';

const WhoWeAre = () => {
  const [content, setContent] = useState({
    storyTitle: 'Our Story',
    storyContent: 'Evidance is a pioneering modified clinical research organization in Saudi Arabia, dedicated to bridging the gap between theoretical knowledge and practical research experience. We are committed to advancing healthcare research in alignment with Saudi Arabia\'s Vision 2030.',
    teamTitle: 'Our Team',
    teamContent: 'Our team consists of experienced clinical researchers, healthcare professionals, and education specialists dedicated to nurturing the next generation of clinical researchers.',
    valuesTitle: 'Our Values',
    valuesContent: 'Excellence, Innovation, Collaboration, and Impact drive everything we do at Evidance.'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('whoWeAreContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('whoWeAreContent');
      if (updatedContent) {
        try {
          setContent(JSON.parse(updatedContent));
        } catch (error) {
          console.error('Error updating content:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Who We Are</h1>
        <p>Learn about our mission, vision, and the team behind Evidance</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            <h2>{content.storyTitle}</h2>
            <p>{content.storyContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.teamTitle}</h2>
            <p>{content.teamContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.valuesTitle}</h2>
            <p>{content.valuesContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
