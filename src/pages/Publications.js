import React, { useState, useEffect } from 'react';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200',
      title: 'Evidence-Based Research Methodologies in Modern Science',
      description: 'A comprehensive analysis of contemporary research approaches and their impact on scientific discovery.'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200',
      title: 'Statistical Frameworks for Rigorous Data Analysis',
      description: 'Exploring advanced statistical methods for enhancing research reliability and validity.'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x200',
      title: 'Collaborative Research Models in Academic Settings',
      description: 'Investigating the effectiveness of collaborative approaches in academic research environments.'
    }
  ]);
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
      
      if (data.publications && Array.isArray(data.publications) && data.publications.length > 0) {
        setPublications(data.publications);
        // Store in localStorage as backup
        localStorage.setItem('evidance_publicationsContent', JSON.stringify(data.publications));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch publications content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_publicationsContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setPublications(parsedData);
            console.log('Loaded publications content from cache');
          }
        } catch (parseErr) {
          console.error('Error parsing cached publications data:', parseErr);
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
      <div className="publications-page">
        <div className="container">
          <div className="loading-spinner">Loading publications content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="publications-page">
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
          <h1>Publications</h1>
          <p>Explore our latest research findings and academic contributions</p>
        </header>

        <main className="page-content">
          {publications && publications.length > 0 ? (
            <section className="publications-grid">
              {publications.map((publication) => (
                <article key={publication.id} className="publication-card">
                  {publication.image && (
                    <div className="publication-image">
                      <img 
                        src={publication.image} 
                        alt={publication.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Publication+Image';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="publication-content">
                    <h2>{publication.title}</h2>
                    <p>{publication.description}</p>
                    
                    {publication.authors && (
                      <div className="publication-authors">
                        <strong>Authors:</strong> {publication.authors}
                      </div>
                    )}
                    
                    {publication.journal && (
                      <div className="publication-journal">
                        <strong>Published in:</strong> {publication.journal}
                      </div>
                    )}
                    
                    {publication.date && (
                      <div className="publication-date">
                        <strong>Date:</strong> {publication.date}
                      </div>
                    )}
                    
                    {publication.doi && (
                      <div className="publication-doi">
                        <strong>DOI:</strong> <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                          {publication.doi}
                        </a>
                      </div>
                    )}
                    
                    {publication.url && (
                      <div className="publication-link">
                        <a href={publication.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          Read Publication
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="no-publications">
              <p>No publications are currently available. Please check back later.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Publications;
