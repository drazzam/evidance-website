import React, { useState, useEffect } from 'react';

const SuccessRecord = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      const data = JSON.parse(savedContent);
      setContent(data.successRecord || '');
    }
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
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            ) : (
              <>
                <h2>Key Achievements</h2>
                <p>
                  Since our inception, Evidance has successfully completed over 50 research projects, 
                  trained more than 250 healthcare professionals and students, and contributed to 
                  25+ published papers in peer-reviewed journals, with 15+ additional papers accepted for publication.
                </p>
                <h2>Research Publications</h2>
                <p>
                  Our research has been published in leading medical journals, covering diverse areas 
                  including clinical trials, epidemiological studies, health services research, 
                  and systematic reviews. Our work has been cited hundreds of times, demonstrating 
                  its impact on the global research community.
                </p>
                <h2>Success Stories</h2>
                <p>
                  Many of our trainees have gone on to pursue successful careers in clinical research, 
                  with several now leading their own research teams or pursuing advanced degrees 
                  at prestigious institutions worldwide. Their success is a testament to the quality 
                  of training and mentorship provided at Evidance.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRecord;
