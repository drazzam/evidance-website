import React, { useState, useEffect } from 'react';

const VisionaryModel = () => {
  const [content, setContent] = useState({
    approachTitle: 'Modified CRO Approach',
    approachContent: 'We implement a novel model of clinical research organization that aims mainly on digital presence and over the network interconnection between healthcare practitioners, students, and other individuals interested in clinical research for opportunities. Unlike traditional CROs, we focus on education, training, and hands-on experience alongside research execution.',
    frameworkTitle: 'Innovation Framework',
    frameworkContent: 'Our innovative framework combines cutting-edge digital platforms with personalized mentorship, creating a unique ecosystem where theoretical knowledge meets practical application. We leverage technology to connect researchers, share knowledge, and accelerate the research process while maintaining the highest standards of scientific rigor.',
    platformTitle: 'Digital Platform',
    platformContent: 'Our digital platform serves as the backbone of our operations, enabling seamless collaboration, resource sharing, and project management. Through our platform, participants can access training materials, connect with mentors, collaborate on projects, and track their progress toward becoming independent clinical researchers.'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('visionaryModelContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('visionaryModelContent');
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
        <h1>Our Visionary Model</h1>
        <p>Revolutionizing clinical research through innovation</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            <h2>{content.approachTitle}</h2>
            <p>{content.approachContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.frameworkTitle}</h2>
            <p>{content.frameworkContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.platformTitle}</h2>
            <p>{content.platformContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionaryModel;
