import React, { useState, useEffect } from 'react';

const VisionaryModel = () => {
  const [content, setContent] = useState({
    approachTitle: 'Modified CRO Approach',
    approachContent: '',
    frameworkTitle: 'Innovation Framework',
    frameworkContent: '',
    platformTitle: 'Digital Platform',
    platformContent: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('evidance_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.visionaryModel) setContent(data.visionaryModel);
    }
  }, []);

  return (
    <div className="visionary-model-page">
      <div className="page-header">
        <h1>Our Visionary Model</h1>
        <p>Innovative approach to clinical research excellence</p>
      </div>
      <div className="container">
        <section className="content-section">
          <h2>{content.approachTitle}</h2>
          <p>{content.approachContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.frameworkTitle}</h2>
          <p>{content.frameworkContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.platformTitle}</h2>
          <p>{content.platformContent}</p>
        </section>
      </div>
    </div>
  );
};

export default VisionaryModel;
