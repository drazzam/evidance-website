import React, { useState, useEffect } from 'react';
import './JoinUs.css';

const JoinUs = () => {
  const [joinUsData, setJoinUsData] = useState({
    title: 'Join Our Research Community',
    content: 'We welcome researchers, academics, and professionals who share our commitment to evidence-based methodologies. Join us in advancing the field of research and contributing to meaningful scientific discoveries.',
    contactInfo: {
      email: 'contact@evidance.org',
      phone: '+1 (555) 123-4567',
      address: '123 Research Avenue, Academic City, AC 12345'
    }
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
      
      const updatedData = {};
      
      if (data.joinUs) {
        updatedData.joinUs = {
          ...joinUsData,
          ...data.joinUs
        };
      }
      
      if (data.contactInfo) {
        updatedData.contactInfo = {
          ...joinUsData.contactInfo,
          ...data.contactInfo
        };
      }
      
      if (Object.keys(updatedData).length > 0) {
        setJoinUsData(prevData => ({
          ...prevData,
          ...updatedData.joinUs,
          contactInfo: updatedData.contactInfo || prevData.contactInfo
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_joinUsContent', JSON.stringify({
          joinUs: updatedData.joinUs,
          contactInfo: updatedData.contactInfo
        }));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch join us content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_joinUsContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setJoinUsData(prevData => ({
            ...prevData,
            ...parsedData.joinUs,
            contactInfo: parsedData.contactInfo || prevData.contactInfo
          }));
          console.log('Loaded join us content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached join us data:', parseErr);
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
      <div className="join-us-page">
        <div className="container">
          <div className="loading-spinner">Loading join us content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="join-us-page">
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
          <h1>{joinUsData.title}</h1>
        </header>

        <main className="page-content">
          <section className="content-section">
            <div className="section-content">
              <div className="content-text">
                {joinUsData.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="contact-section">
            <div className="section-content">
              <h2>Get In Touch</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p><a href={`mailto:${joinUsData.contactInfo.email}`}>{joinUsData.contactInfo.email}</a></p>
                </div>
                
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p><a href={`tel:${joinUsData.contactInfo.phone.replace(/\D/g, '')}`}>{joinUsData.contactInfo.phone}</a></p>
                </div>
                
                <div className="contact-item">
                  <h3>Address</h3>
                  <p>{joinUsData.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="section-content">
              <h2>Ready to Collaborate?</h2>
              <p>We're always looking for passionate researchers and collaborators to join our mission. Reach out to us to learn more about opportunities to get involved.</p>
              <div className="cta-buttons">
                <a href={`mailto:${joinUsData.contactInfo.email}?subject=Research Collaboration Inquiry`} className="btn btn-primary">
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default JoinUs;
