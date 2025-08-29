// src/pages/AimsGoals.js
import React, { useState, useEffect } from 'react';

const AimsGoals = () => {
  const [content, setContent] = useState({
    objectivesTitle: 'Primary Objectives',
    objectivesContent: '',
    goalsTitle: 'Strategic Goals',
    goalsContent: '',
    visionTitle: 'Future Vision',
    visionContent: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('evidance_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.aimsGoals) setContent(data.aimsGoals);
    }
  }, []);

  return (
    <div className="aims-goals-page">
      <div className="page-header">
        <h1>Aims & Goals</h1>
      </div>
      <div className="container">
        <section>
          <h2>{content.objectivesTitle}</h2>
          <p>{content.objectivesContent}</p>
        </section>
        <section>
          <h2>{content.goalsTitle}</h2>
          <p>{content.goalsContent}</p>
        </section>
        <section>
          <h2>{content.visionTitle}</h2>
          <p>{content.visionContent}</p>
        </section>
      </div>
    </div>
  );
};

export default AimsGoals;

// ===============================================

// src/pages/SuccessRecord.js
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
      </div>
      <div className="container">
        <section>
          <h2>{content.achievementsTitle}</h2>
          <p>{content.achievementsContent}</p>
        </section>
        <section>
          <h2>{content.publicationsTitle}</h2>
          <p>{content.publicationsContent}</p>
        </section>
        <section>
          <h2>{content.storiesTitle}</h2>
          <p>{content.storiesContent}</p>
        </section>
      </div>
    </div>
  );
};

export default SuccessRecord;

// ===============================================

// src/pages/VisionaryModel.js
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
      </div>
      <div className="container">
        <section>
          <h2>{content.approachTitle}</h2>
          <p>{content.approachContent}</p>
        </section>
        <section>
          <h2>{content.frameworkTitle}</h2>
          <p>{content.frameworkContent}</p>
        </section>
        <section>
          <h2>{content.platformTitle}</h2>
          <p>{content.platformContent}</p>
        </section>
      </div>
    </div>
  );
};

export default VisionaryModel;

// ===============================================

// src/pages/JoinUs.js
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
