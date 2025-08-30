import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const [homeData, setHomeData] = useState({
    homeSections: {
      publicationsTitle: 'Publications',
      publicationsText: 'Explore our latest research findings and academic publications.',
      aimsTitle: 'Our Aims & Goals',
      aimsText: 'Discover our mission to advance evidence-based research methodologies.',
      researchTitle: 'Success Record',
      researchText: 'Review our track record of successful research projects and outcomes.',
      visionaryTitle: 'Visionary Model',
      visionaryText: 'Learn about our innovative approach to research and development.',
      joinUsTitle: 'Join Us',
      joinUsText: 'Become part of our research community and contribute to evidence-based solutions.'
    },
    publications: []
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
      
      if (data.homeSections) {
        updatedData.homeSections = {
          ...homeData.homeSections,
          ...data.homeSections
        };
      }
      
      if (data.publications) {
        updatedData.publications = data.publications;
      }
      
      if (Object.keys(updatedData).length > 0) {
        setHomeData(prevData => ({
          ...prevData,
          ...updatedData
        }));
        // Store in localStorage as backup
        localStorage.setItem('evidance_homeContent', JSON.stringify(updatedData));
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('Failed to fetch home content from GitHub:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('evidance_homeContent');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setHomeData(prevData => ({
            ...prevData,
            ...parsedData
          }));
          console.log('Loaded home content from cache');
        } catch (parseErr) {
          console.error('Error parsing cached home data:', parseErr);
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
      <div className="home-page">
        <Hero />
        <main className="main-content">
          <div className="loading-spinner">Loading home content...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Hero />
      
      <main className="main-content">
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

        <section className="home-sections">
          <div className="container">
            <div className="sections-grid">
              
              <Link to="/publications" className="section-card">
                <div className="section-content">
                  <h2>{homeData.homeSections.publicationsTitle}</h2>
                  <p>{homeData.homeSections.publicationsText}</p>
                  <div className="card-arrow">→</div>
                </div>
              </Link>

              <Link to="/aims-goals" className="section-card">
                <div className="section-content">
                  <h2>{homeData.homeSections.aimsTitle}</h2>
                  <p>{homeData.homeSections.aimsText}</p>
                  <div className="card-arrow">→</div>
                </div>
              </Link>

              <Link to="/success-record" className="section-card">
                <div className="section-content">
                  <h2>{homeData.homeSections.researchTitle}</h2>
                  <p>{homeData.homeSections.researchText}</p>
                  <div className="card-arrow">→</div>
                </div>
              </Link>

              <Link to="/visionary-model" className="section-card">
                <div className="section-content">
                  <h2>{homeData.homeSections.visionaryTitle}</h2>
                  <p>{homeData.homeSections.visionaryText}</p>
                  <div className="card-arrow">→</div>
                </div>
              </Link>

              <Link to="/join-us" className="section-card">
                <div className="section-content">
                  <h2>{homeData.homeSections.joinUsTitle}</h2>
                  <p>{homeData.homeSections.joinUsText}</p>
                  <div className="card-arrow">→</div>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {homeData.publications && homeData.publications.length > 0 && (
          <section className="featured-publications">
            <div className="container">
              <h2>Featured Publications</h2>
              <div className="publications-preview">
                {homeData.publications.slice(0, 3).map((publication) => (
                  <div key={publication.id} className="publication-preview-card">
                    {publication.image && (
                      <div className="publication-image">
                        <img src={publication.image} alt={publication.title} />
                      </div>
                    )}
                    <div className="publication-content">
                      <h3>{publication.title}</h3>
                      <p>{publication.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all-publications">
                <Link to="/publications" className="btn btn-primary">
                  View All Publications
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Home;
