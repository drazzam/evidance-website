import React, { useState, useEffect } from 'react';

const WhoWeAre = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      const data = JSON.parse(savedContent);
      setContent(data.whoWeAre || '');
    }
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
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            ) : (
              <>
                <h2>Our Story</h2>
                <p>
                  Evidance is a pioneering modified clinical research organization in Saudi Arabia, 
                  dedicated to bridging the gap between theoretical knowledge and practical research experience. 
                  We are committed to advancing healthcare research in alignment with Saudi Arabia's Vision 2030.
                </p>
                <h2>Our Team</h2>
                <p>
                  Our team consists of experienced clinical researchers, healthcare professionals, 
                  and education specialists dedicated to nurturing the next generation of clinical researchers.
                </p>
                <h2>Our Values</h2>
                <p>
                  Excellence, Innovation, Collaboration, and Impact drive everything we do at Evidance.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
