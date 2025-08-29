import React, { useState, useEffect } from 'react';

const AimsGoals = () => {
  const [content, setContent] = useState({
    objectivesTitle: 'Primary Objectives',
    objectivesContent: 'Our primary aim is to transform clinical research education by providing hands-on experience to healthcare students and practitioners. We focus on practical training that leads to published research, moving beyond theoretical knowledge to real-world application.',
    goalsTitle: 'Strategic Goals',
    goalsContent: 'We strive to establish Saudi Arabia as a leading hub for clinical research in the region, develop a sustainable pipeline of skilled clinical researchers, and facilitate high-impact research that addresses local and regional healthcare challenges.',
    visionTitle: 'Future Vision',
    visionContent: 'By 2030, we envision Evidance as the premier clinical research organization in the Middle East, having trained thousands of researchers and contributed to hundreds of published studies that improve healthcare outcomes across the region.'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('aimsGoalsContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('aimsGoalsContent');
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
        <h1>Our Aims and Goals</h1>
        <p>Discover our objectives and how we're transforming clinical research</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            <h2>{content.objectivesTitle}</h2>
            <p>{content.objectivesContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.goalsTitle}</h2>
            <p>{content.goalsContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.visionTitle}</h2>
            <p>{content.visionContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AimsGoals;
