import React, { useState, useEffect } from 'react';

const JoinUs = () => {
  const [content, setContent] = useState({
    title: 'Join Our Research Community',
    content: 'Be part of Saudi Arabia\'s clinical research transformation. Whether you\'re a healthcare student seeking practical experience or a practitioner ready to contribute to groundbreaking research, Evidance is your gateway to excellence in clinical research. We offer comprehensive training programs, mentorship from experienced researchers, and opportunities to work on real-world research projects that make a difference.',
    contactInfo: 'Ready to start your journey? Contact us via WhatsApp at +966 54 945 0781 or email us at info@evidance.sa'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('joinUsContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('joinUsContent');
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
        <h1>Join Us!</h1>
        <p>Start your journey in clinical research with Evidance</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            <h2>{content.title}</h2>
            <p>{content.content}</p>
            <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: '500' }}>{content.contactInfo}</p>
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <a 
                href="https://wa.me/00966549450781" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ padding: '15px 40px', fontSize: '18px', marginRight: '20px' }}
              >
                Contact Us on WhatsApp
              </a>
              <a 
                href="mailto:info@evidance.sa" 
                className="btn btn-secondary"
                style={{ padding: '15px 40px', fontSize: '18px' }}
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
