import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';

const WhoWeAre = () => {
  const [content, setContent] = useState({
    storyTitle: 'Our Story',
    storyContent: 'Loading content...',
    teamTitle: 'Our Team',
    teamContent: 'Loading content...',
    valuesTitle: 'Our Values',
    valuesContent: 'Loading content...'
  });

  useEffect(() => {
    const loadContent = async () => {
      // First try local cache for instant load
      const cached = localStorage.getItem('whoWeAreContent');
      if (cached) {
        try {
          setContent(JSON.parse(cached));
        } catch (e) {}
      }

      // Then fetch from global database
      try {
        const data = await dataService.loadData();
        if (data && data.whoWeAre) {
          setContent(data.whoWeAre);
          localStorage.setItem('whoWeAreContent', JSON.stringify(data.whoWeAre));
        }
      } catch (error) {
        console.error('Error loading global content:', error);
      }
    };

    loadContent();
    
    // Refresh every 20 seconds for live updates
    const interval = setInterval(loadContent, 20000);
    return () => clearInterval(interval);
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
            <p>{content.storyContent || 'Content will appear here once updated via admin panel.'}</p>
          </div>
          <div className="content-section">
            <h2>{content.teamTitle}</h2>
            <p>{content.teamContent || 'Content will appear here once updated via admin panel.'}</p>
          </div>
          <div className="content-section">
            <h2>{content.valuesTitle}</h2>
            <p>{content.valuesContent || 'Content will appear here once updated via admin panel.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
