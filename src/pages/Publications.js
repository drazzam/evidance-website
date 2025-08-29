import React, { useState, useEffect } from 'react';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState({
    published: [],
    accepted: [],
    submitted: []
  });

  useEffect(() => {
    // Load publications from localStorage (admin can update these)
    const savedPublications = localStorage.getItem('publicationsData');
    if (savedPublications) {
      setPublications(JSON.parse(savedPublications));
    } else {
      // Default placeholder data
      setPublications({
        published: Array(10).fill('/images/pub-placeholder.jpg'),
        accepted: Array(4).fill('/images/pub-placeholder.jpg'),
        submitted: Array(5).fill('/images/pub-placeholder.jpg')
      });
    }
  }, []);

  const scrollLeft = (category) => {
    document.getElementById(`${category}-track`).scrollBy(-300, 0);
  };

  const scrollRight = (category) => {
    document.getElementById(`${category}-track`).scrollBy(300, 0);
  };

  return (
    <div className="publications-page">
      <div className="page-header">
        <h1>Progress & Achievements</h1>
        <p>Explore our research contributions and ongoing work</p>
      </div>

      <div className="publications-content">
        <section className="publication-section">
          <div className="container">
            <h2 className="section-title">Selected Recent Publications Published</h2>
            <p className="section-subtitle">
              Our most impactful research contributions published in leading medical journals
            </p>
            <div className="gallery-container">
              <button className="gallery-btn prev" onClick={() => scrollLeft('published')}>‹</button>
              <div className="gallery-track" id="published-track">
                {publications.published.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <img src={process.env.PUBLIC_URL + img} alt={`Published ${index + 1}`} />
                    <div className="item-overlay">
                      <span>Publication {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="gallery-btn next" onClick={() => scrollRight('published')}>›</button>
            </div>
          </div>
        </section>

        <section className="publication-section alt-bg">
          <div className="container">
            <h2 className="section-title">Among Accepted Papers Recently</h2>
            <p className="section-subtitle">
              Papers accepted for publication in peer-reviewed journals
            </p>
            <div className="gallery-container">
              <button className="gallery-btn prev" onClick={() => scrollLeft('accepted')}>‹</button>
              <div className="gallery-track" id="accepted-track">
                {publications.accepted.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <img src={process.env.PUBLIC_URL + img} alt={`Accepted ${index + 1}`} />
                    <div className="item-overlay">
                      <span>Accepted Paper {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="gallery-btn next" onClick={() => scrollRight('accepted')}>›</button>
            </div>
          </div>
        </section>

        <section className="publication-section">
          <div className="container">
            <h2 className="section-title">Among Recently Submitted Papers</h2>
            <p className="section-subtitle">
              Our latest research submissions currently under review
            </p>
            <div className="gallery-container">
              <button className="gallery-btn prev" onClick={() => scrollLeft('submitted')}>‹</button>
              <div className="gallery-track" id="submitted-track">
                {publications.submitted.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <img src={process.env.PUBLIC_URL + img} alt={`Submitted ${index + 1}`} />
                    <div className="item-overlay">
                      <span>Submitted Paper {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="gallery-btn next" onClick={() => scrollRight('submitted')}>›</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Publications;
