import React, { useState, useEffect } from 'react';

const SuccessRecord = () => {
  const [content, setContent] = useState({
    achievementsTitle: 'Key Achievements',
    achievementsContent: 'Since our inception, Evidance has successfully completed over 50 research projects, trained more than 250 healthcare professionals and students, and contributed to 25+ published papers in peer-reviewed journals, with 15+ additional papers accepted for publication.',
    publicationsTitle: 'Research Publications',
    publicationsContent: 'Our research has been published in leading medical journals, covering diverse areas including clinical trials, epidemiological studies, health services research, and systematic reviews. Our work has been cited hundreds of times, demonstrating its impact on the global research community.',
    storiesTitle: 'Success Stories',
    storiesContent: 'Many of our trainees have gone on to pursue successful careers in clinical research, with several now leading their own research teams or pursuing advanced degrees at prestigious institutions worldwide. Their success is a testament to the quality of training and mentorship provided at Evidance.'
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('successRecordContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content:', error);
      }
    }

    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem('successRecordContent');
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
        <h1>Demonstrated Success Record</h1>
        <p>Explore our achievements and impact in clinical research</p>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="content-section">
            <h2>{content.achievementsTitle}</h2>
            <p>{content.achievementsContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.publicationsTitle}</h2>
            <p>{content.publicationsContent}</p>
          </div>
          <div className="content-section">
            <h2>{content.storiesTitle}</h2>
            <p>{content.storiesContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRecord;
