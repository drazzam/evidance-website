import React, { useState, useEffect } from 'react';

const AimsGoals = () => {
  const [content, setContent] = useState({
    objectivesTitle: 'Primary Objectives',
    objectivesContent: '',
    goalsTitle: 'Strategic Goals',
    goalsContent: '',
    visionTitle: 'Future Vision',
    visionContent: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('evidance_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.aimsGoals) setContent(data.aimsGoals);
    }
  }, []);

  return (
    <div className="aims-goals-page">
      <div className="page-header">
        <h1>Aims & Goals</h1>
        <p>Our objectives and vision for clinical research excellence</p>
      </div>
      <div className="container">
        <section className="content-section">
          <h2>{content.objectivesTitle}</h2>
          <p>{content.objectivesContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.goalsTitle}</h2>
          <p>{content.goalsContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.visionTitle}</h2>
          <p>{content.visionContent}</p>
        </section>
      </div>
    </div>
  );
};

export default AimsGoals;
