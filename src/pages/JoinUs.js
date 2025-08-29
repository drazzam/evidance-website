import React, { useState, useEffect } from 'react';

const JoinUs = () => {
  const [content, setContent] = useState({
    title: 'Join Our Research Community',
    content: '',
    contactInfo: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('evidance_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.joinUs) setContent(data.joinUs);
    }
  }, []);

  return (
    <div className="join-us-page">
      <div className="page-header">
        <h1>{content.title}</h1>
      </div>
      <div className="container">
        <div className="content">
          <p>{content.content}</p>
          <div className="contact-section">
            <p>{content.contactInfo}</p>
            <a href="https://wa.me/00966549450781" className="btn btn-primary">
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
