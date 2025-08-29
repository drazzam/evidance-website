import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const [content, setContent] = useState({
    publicationsTitle: 'Recent Publications',
    publicationsText: 'Explore our latest research publications and contributions to medical science.',
    aimsTitle: 'What Are Our Aims and Goals?',
    aimsText: 'We are committed to advancing clinical research in Saudi Arabia.',
    researchTitle: 'Research Impact & Innovation',
    researchText: 'Our research has contributed to significant advancements in healthcare.',
    visionaryTitle: 'Our Visionary Model',
    visionaryText: 'Our unique modified CRO model combines excellence with innovation.',
    joinUsTitle: 'Join Us!',
    joinUsText: 'Become part of Saudi Arabia\'s leading clinical research community.'
  });

  const [publications, setPublications] = useState([
    { id: 1, image: '', title: 'Research Publication 1', description: 'Description 1' },
    { id: 2, image: '', title: 'Research Publication 2', description: 'Description 2' },
    { id: 3, image: '', title: 'Research Publication 3', description: 'Description 3' },
    { id: 4, image: '', title: 'Research Publication 4', description: 'Description 4' },
    { id: 5, image: '', title: 'Research Publication 5', description: 'Description 5' },
    { id: 6, image: '', title: 'Research Publication 6', description: 'Description 6' }
  ]);

  useEffect(() => {
    loadContent();
    const interval = setInterval(loadContent, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = () => {
    try {
      const saved = localStorage.getItem('evidance_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.homeSections) setContent(data.homeSections);
        if (data.publications) setPublications(data.publications);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  // Default placeholder image for publications
  const getPublicationImage = (pub) => {
    if (pub.image) {
      return pub.image; // Base64 from admin panel
    }
    // Default placeholder image
    return `${process.env.PUBLIC_URL}/images/publication-placeholder.png`;
  };

  return (
    <div className="home">
      <Hero />
      
      <section className="publications-section">
        <div className="container">
          <h2 className="section-title">{content.publicationsTitle}</h2>
          <p className="section-subtitle">{content.publicationsText}</p>
          <div className="publications-grid">
            {publications.map((pub) => (
              <div key={pub.id} className="publication-card">
                <img 
                  src={getPublicationImage(pub)} 
                  alt={pub.title}
                  className="publication-image"
                  onError={(e) => {
                    e.target.src = `${process.env.PUBLIC_URL}/images/publication-placeholder.png`;
                  }}
                />
                <h3>{pub.title}</h3>
                <p>{pub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aims-section">
        <div className="container">
          <h2 className="section-title">{content.aimsTitle}</h2>
          <p className="section-text">{content.aimsText}</p>
          <a href="#/aims-goals" className="btn btn-primary">Learn More</a>
        </div>
      </section>

      <section className="research-section">
        <div className="container centered-content">
          <h2 className="section-title">{content.researchTitle}</h2>
          <p className="section-text">{content.researchText}</p>
          <div className="collaborations">
            <img 
              src={`${process.env.PUBLIC_URL}/images/Vision_2030.png`}
              alt="Vision 2030" 
              className="collab-logo"
            />
            <p className="collab-text">
              In alignment with Saudi Vision 2030, we're building research capacity
              and fostering innovation in healthcare across the Kingdom.
            </p>
          </div>
        </div>
      </section>

      <section className="visionary-section">
        <div className="container">
          <h2 className="section-title">{content.visionaryTitle}</h2>
          <p className="section-text">{content.visionaryText}</p>
          <a href="#/visionary-model" className="btn btn-secondary">Explore Our Model</a>
        </div>
      </section>

      <section className="join-section">
        <div className="container">
          <h2 className="section-title">{content.joinUsTitle}</h2>
          <p className="section-text">{content.joinUsText}</p>
          <a href="#/join-us" className="btn btn-accent">Get Started</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
