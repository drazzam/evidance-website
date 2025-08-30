import React, { useState, useEffect } from 'react';
import './SuccessRecord.css';

const SuccessRecord = () => {
  const [successRecordData, setSuccessRecordData] = useState({
    achievementsTitle: 'Our Achievements',
    achievementsContent: 'Over the years, we have successfully completed numerous research projects, contributing to significant advancements in evidence-based methodologies and establishing new standards for research excellence.',
    publicationsTitle: 'Publications & Research',
    publicationsContent: 'Our team has published extensively in peer-reviewed journals, presenting our findings at international conferences, and contributing to the global research community through high-impact publications.',
    storiesTitle: 'Success Stories',
    storiesContent: 'We have partnered with leading institutions and organizations to implement evidence-based solutions, resulting in improved outcomes, enhanced methodologies, and measurable positive impacts across various sectors.'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContent = async () => {
    try {
      setError(null);
      const response = await fetch(`${process.env.PUBLIC_URL}/data/website-content.json?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.successRecord) {
        setSuccessRecordData(prevData => ({
          ...prevData,
          ...data.successRecord
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_successRecordContent', JSON.stringify(data.successRecord));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch success record content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_successRecordContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setSuccessRecordData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded success record content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached success record data:', parseErr);
        }
      }
      
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
    
    // Set up auto-refresh every 60 seconds
    const refreshInterval = setInterval(loadContent, 60000);
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="success-record-page">
        <div className="container">
          <div className="loading-spinner">Loading success record content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-record-page">
      <div className="container">
        {error && (
          <div className="error-notice" style={{ 
            backgroundColor: '#fff3cd', 
            color: '#856404', 
            padding: '15px', 
            borderRadius: '4px', 
            marginBottom: '30px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            Using cached content (GitHub data temporarily unavailable)
          </div>
        )}

        <header className="page-header">
          <h1>Success Record</h1>
        </header>

        <main className="page-content">
          <section className="content-section">
            <div className="section-content">
              <h2>{successRecordData.achievementsTitle}</h2>
              <div className="content-text">
                {successRecordData.achievementsContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{successRecordData.publicationsTitle}</h2>
              <div className="content-text">
                {successRecordData.publicationsContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-content">
              <h2>{successRecordData.storiesTitle}</h2>
              <div className="content-text">
                {successRecordData.storiesContent.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SuccessRecord;
