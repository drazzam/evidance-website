import React, { useState, useEffect } from 'react';

const VisionaryModel = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      const data = JSON.parse(savedContent);
      setContent(data.visionaryModel || '');
    }
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Visionary Model</h1>
        <p>Revolutionizing clinical research through innovation</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            ) : (
              <>
                <h2>Modified CRO Approach</h2>
                <p>
                  We implement a novel model of clinical research organization that aims mainly on digital 
                  presence and over the network interconnection between healthcare practitioners, students, 
                  and other individuals interested in clinical research for opportunities. Unlike traditional CROs, 
                  we focus on education, training, and hands-on experience alongside research execution.
                </p>
                <h2>Innovation Framework</h2>
                <p>
                  Our innovative framework combines cutting-edge digital platforms with personalized mentorship, 
                  creating a unique ecosystem where theoretical knowledge meets practical application. 
                  We leverage technology to connect researchers, share knowledge, and accelerate the research process 
                  while maintaining the highest standards of scientific rigor.
                </p>
                <h2>Digital Platform</h2>
                <p>
                  Our digital platform serves as the backbone of our operations, enabling seamless collaboration, 
                  resource sharing, and project management. Through our platform, participants can access training 
                  materials, connect with mentors, collaborate on projects, and track their progress toward 
                  becoming independent clinical researchers.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionaryModel;
