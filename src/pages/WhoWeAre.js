import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const WhoWeAre = () => {
  const [content, setContent] = useState({
    storyTitle: 'Our Story',
    storyContent: 'Loading...',
    teamTitle: 'Our Team',
    teamContent: 'Loading...',
    valuesTitle: 'Our Values',
    valuesContent: 'Loading...'
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'whoWeAre'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data());
      }
    }, (error) => {
      console.error('Error fetching content:', error);
    });

    return () => unsubscribe();
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
            <p>{content.storyContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.teamTitle}</h2>
            <p>{content.teamContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.valuesTitle}</h2>
            <p>{content.valuesContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
