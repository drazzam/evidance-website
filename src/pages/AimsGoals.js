import React, { useState, useEffect } from 'react';

const AimsGoals = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      const data = JSON.parse(savedContent);
      setContent(data.aimsGoals || '');
    }
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
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            ) : (
              <>
                <h2>Primary Objectives</h2>
                <p>
                  Our primary aim is to transform clinical research education by providing hands-on 
                  experience to healthcare students and practitioners. We focus on practical training 
                  that leads to published research, moving beyond theoretical knowledge to real-world application.
                </p>
                <h2>Strategic Goals</h2>
                <p>
                  We strive to establish Saudi Arabia as a leading hub for clinical research in the region, 
                  develop a sustainable pipeline of skilled clinical researchers, and facilitate 
                  high-impact research that addresses local and regional healthcare challenges.
                </p>
                <h2>Future Vision</h2>
                <p>
                  By 2030, we envision Evidance as the premier clinical research organization in the Middle East, 
                  having trained thousands of researchers and contributed to hundreds of published studies 
                  that improve healthcare outcomes across the region.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AimsGoals;
