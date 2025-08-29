import React, { useState, useEffect } from 'react';

const SuccessRecord = () => {
  const [content, setContent] = useState({
    achievementsTitle: 'Key Achievements',
    achievementsContent: '',
    publicationsTitle: 'Research Publications',
    publicationsContent: '',
    storiesTitle: 'Success Stories',
    storiesContent: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('evidance_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.successRecord) setContent(data.successRecord);
    }
  }, []);

  return (
    <div className="success-record-page">
      <div className="page-header">
        <h1>Success Record</h1>
        <p>Our achievements and impact in clinical research</p>
      </div>
      <div className="container">
        <section className="content-section">
          <h2>{content.achievementsTitle}</h2>
          <p>{content.achievementsContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.publicationsTitle}</h2>
          <p>{content.publicationsContent}</p>
        </section>
        <section className="content-section">
          <h2>{content.storiesTitle}</h2>
          <p>{content.storiesContent}</p>
        </section>
      </div>
    </div>
  );
};

export default SuccessRecord;
