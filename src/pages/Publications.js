import React, { useState, useEffect } from 'react';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState([
    { id: 1, image: '', title: 'Research Publication 1', description: 'Description of publication 1' },
    { id: 2, image: '', title: 'Research Publication 2', description: 'Description of publication 2' },
    { id: 3, image: '', title: 'Research Publication 3', description: 'Description of publication 3' },
    { id: 4, image: '', title: 'Research Publication 4', description: 'Description of publication 4' },
    { id: 5, image: '', title: 'Research Publication 5', description: 'Description of publication 5' },
    { id: 6, image: '', title: 'Research Publication 6', description: 'Description of publication 6' }
  ]);

  useEffect(() => {
    loadPublications();
    const interval = setInterval(loadPublications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadPublications = () => {
    try {
      const saved = localStorage.getItem('evidance_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.publications) {
          setPublications(data.publications);
        }
      }
    } catch (error) {
      console.error('Error loading publications:', error);
    }
  };

  // Get publication image with fallback
  const getPublicationImage = (pub) => {
    if (pub.image) {
      return pub.image; // Base64 from admin panel
    }
    // Default placeholder image
    return `${process.env.PUBLIC_URL}/images/publication-placeholder.png`;
  };

  return (
    <div className="publications-page">
      <div className="page-header">
        <h1>Our Publications</h1>
        <p>Discover our contributions to clinical research and medical science</p>
      </div>
      
      <div className="container">
        <div className="publications-grid">
          {publications.map((pub) => (
            <div key={pub.id} className="publication-card">
              <div className="publication-image-container">
                <img 
                  src={getPublicationImage(pub)} 
                  alt={pub.title}
                  className="publication-image"
                  onError={(e) => {
                    e.target.src = `${process.env.PUBLIC_URL}/images/publication-placeholder.png`;
                  }}
                />
              </div>
              <div className="publication-content">
                <h3 className="publication-title">{pub.title}</h3>
                <p className="publication-description">{pub.description}</p>
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
