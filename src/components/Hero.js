import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const [visible, setVisible] = useState({});
  const [publicationImages, setPublicationImages] = useState([]);
  const [sections, setSections] = useState({
    publicationsTitle: 'Recent Publications',
    publicationsText: 'Explore our latest research contributions advancing healthcare knowledge. Our team consistently publishes high-impact studies in leading medical journals, showcasing innovative approaches to clinical research.',
    aimsTitle: 'What Are Our Aims and Goals?',
    aimsText: 'We aim to transform clinical research education by providing hands-on experience to healthcare students and practitioners. Our goal is to facilitate practical training that leads to published research, not just theoretical knowledge.',
    researchTitle: 'Research Impact & Innovation',
    researchText: 'Our research initiatives focus on addressing critical healthcare challenges in Saudi Arabia and the broader region. Through collaborative partnerships and cutting-edge methodologies, we\'re driving meaningful change in clinical practice and patient outcomes.',
    visionaryTitle: 'Our Visionary Model',
    visionaryText: 'We implement a novel model of clinical research organization that aims mainly on digital presence and over the network interconnection between healthcare practitioners, students, and other individuals interested in clinical research for opportunities.',
    joinUsTitle: 'Join Us!',
    joinUsText: 'Be part of Saudi Arabia\'s clinical research transformation. Whether you\'re a healthcare student seeking practical experience or a practitioner ready to contribute to groundbreaking research, Evidance is your gateway to excellence in clinical research.'
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionElements = document.querySelectorAll('.home-section');
    sectionElements.forEach((section) => observer.observe(section));

    // Load home sections content
    const savedSections = localStorage.getItem('homeSections');
    if (savedSections) {
      try {
        setSections(JSON.parse(savedSections));
      } catch (error) {
        console.error('Error loading sections:', error);
      }
    }

    // Load publication images
    const savedImages = localStorage.getItem('publicationImages');
    if (savedImages) {
      try {
        const images = JSON.parse(savedImages);
        // Filter out empty strings
        const validImages = images.filter(img => img && img.length > 0);
        if (validImages.length > 0) {
          setPublicationImages(validImages);
        } else {
          setPublicationImages(['/images/pub-placeholder.jpg']);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        setPublicationImages(['/images/pub-placeholder.jpg']);
      }
    } else {
      setPublicationImages(['/images/pub-placeholder.jpg']);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedSections = localStorage.getItem('homeSections');
      if (updatedSections) {
        try {
          setSections(JSON.parse(updatedSections));
        } catch (error) {
          console.error('Error updating sections:', error);
        }
      }

      const updatedImages = localStorage.getItem('publicationImages');
      if (updatedImages) {
        try {
          const images = JSON.parse(updatedImages);
          const validImages = images.filter(img => img && img.length > 0);
          if (validImages.length > 0) {
            setPublicationImages(validImages);
          }
        } catch (error) {
          console.error('Error updating images:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const scrollCarousel = (direction) => {
    const track = document.querySelector('.carousel-track');
    if (track) {
      const scrollAmount = direction === 'next' ? 300 : -300;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      <Hero />
      
      <section id="section-1" className={`home-section recent-publications ${visible['section-1'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">{sections.publicationsTitle}</h2>
              <p className="section-description">{sections.publicationsText}</p>
              <Link to="/publications" className="btn btn-primary">
                See More Progress & Achievements
              </Link>
            </div>
            <div className="publications-carousel">
              <div className="carousel-container">
                <div className="carousel-track">
                  {publicationImages.map((img, index) => (
                    <div key={index} className="publication-slide">
                      {img.startsWith('data:') ? (
                        <img src={img} alt={`Publication ${index + 1}`} />
                      ) : (
                        <img src={process.env.PUBLIC_URL + img} alt={`Publication ${index + 1}`} />
                      )}
                    </div>
                  ))}
                </div>
                <button className="carousel-btn prev" onClick={() => scrollCarousel('prev')}>‹</button>
                <button className="carousel-btn next" onClick={() => scrollCarousel('next')}>›</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-2" className={`home-section aims-goals ${visible['section-2'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content reverse">
            <div className="section-text">
              <h2 className="section-title">{sections.aimsTitle}</h2>
              <p className="section-description">{sections.aimsText}</p>
              <Link to="/aims-goals" className="btn btn-secondary">
                Explore Our Mission
              </Link>
            </div>
            <div className="section-image">
              <div className="image-placeholder goals-vision"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-3" className={`home-section research-impact ${visible['section-3'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content-centered">
            <div className="section-text-centered">
              <h2 className="section-title">{sections.researchTitle}</h2>
              <p className="section-description">{sections.researchText}</p>
            </div>
            <div className="impact-highlights">
              <div className="impact-item">
                <span className="impact-icon">🔬</span>
                <h4>Clinical Trials</h4>
                <p>Leading innovative clinical trials in multiple therapeutic areas</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">📊</span>
                <h4>Data Analytics</h4>
                <p>Leveraging advanced analytics for evidence-based insights</p>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🤝</span>
                <h4>Collaborations</h4>
                <p>Strategic partnerships with leading clinical researchers and academic consultants from different institutions in Saudi Arabia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-4" className={`home-section visionary-model ${visible['section-4'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content reverse">
            <div className="section-text">
              <h2 className="section-title">{sections.visionaryTitle}</h2>
              <p className="section-description">{sections.visionaryText}</p>
              <Link to="/visionary-model" className="btn btn-secondary">
                Discover Our Approach
              </Link>
            </div>
            <div className="section-image">
              <div className="image-placeholder innovation-model"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-5" className={`home-section join-us-section ${visible['section-5'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="cta-section">
            <h2 className="cta-title">{sections.joinUsTitle}</h2>
            <p className="cta-description">{sections.joinUsText}</p>
            <div className="cta-buttons">
              <a href="https://wa.me/00966549450781" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Contact Us!
              </a>
              <Link to="/who-we-are" className="btn btn-secondary-white">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-2030-section">
        <div className="container">
          <div className="vision-content">
            <img 
              src={process.env.PUBLIC_URL + '/images/Vision_2030.png'} 
              alt="Saudi Vision 2030" 
              className="vision-logo"
            />
            <div className="vision-text">
              <h3>Aligned with Vision 2030</h3>
              <p>
                Evidance proudly supports Saudi Arabia's Vision 2030 by fostering innovation, 
                developing local talent, and advancing the Kingdom's position as a leader in 
                healthcare research and development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
