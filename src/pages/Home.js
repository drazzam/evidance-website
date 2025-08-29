import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const [visible, setVisible] = useState({});
  const [publicationImages, setPublicationImages] = useState([]);

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

    const sections = document.querySelectorAll('.home-section');
    sections.forEach((section) => observer.observe(section));

    // Load publication images from localStorage (admin can update these)
    const savedImages = localStorage.getItem('publicationImages');
    if (savedImages) {
      setPublicationImages(JSON.parse(savedImages));
    } else {
      // Default placeholder images
      setPublicationImages([
        '/images/pub1.jpg',
        '/images/pub2.jpg',
        '/images/pub3.jpg',
        '/images/pub4.jpg',
        '/images/pub5.jpg'
      ]);
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="home">
      <Hero />
      
      <section id="section-1" className={`home-section recent-publications ${visible['section-1'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Recent Publications</h2>
              <p className="section-description">
                Explore our latest research contributions advancing healthcare knowledge. 
                Our team consistently publishes high-impact studies in leading medical journals, 
                showcasing innovative approaches to clinical research.
              </p>
              <Link to="/publications" className="btn btn-primary">
                See More Progress & Achievements
              </Link>
            </div>
            <div className="publications-carousel">
              <div className="carousel-container">
                <div className="carousel-track">
                  {publicationImages.map((img, index) => (
                    <div key={index} className="publication-slide">
                      <img src={process.env.PUBLIC_URL + img} alt={`Publication ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-btn prev" onClick={() => document.querySelector('.carousel-track').scrollBy(-300, 0)}>‹</button>
                <button className="carousel-btn next" onClick={() => document.querySelector('.carousel-track').scrollBy(300, 0)}>›</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-2" className={`home-section aims-goals ${visible['section-2'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content reverse">
            <div className="section-text">
              <h2 className="section-title">What Are Our Aims and Goals?</h2>
              <p className="section-description">
                We aim to transform clinical research education by providing hands-on experience 
                to healthcare students and practitioners. Our goal is to facilitate practical training 
                that leads to published research, not just theoretical knowledge.
              </p>
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
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Research Impact & Innovation</h2>
              <p className="section-description">
                Our research initiatives focus on addressing critical healthcare challenges in Saudi Arabia 
                and the broader region. Through collaborative partnerships and cutting-edge methodologies, 
                we're driving meaningful change in clinical practice and patient outcomes.
              </p>
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
                  <p>Strategic partnerships with leading academic institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-4" className={`home-section visionary-model ${visible['section-4'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content reverse">
            <div className="section-text">
              <h2 className="section-title">Our Visionary Model</h2>
              <p className="section-description">
                We implement a novel model of clinical research organization that aims mainly on digital 
                presence and over the network interconnection between healthcare practitioners, students, 
                and other individuals interested in clinical research for opportunities, we're revolutionizing 
                how clinical research is conducted in Saudi Arabia. Our innovative approach combines 
                high-quality research excellence with modern digital platforms, creating unprecedented 
                opportunities for collaboration and growth.
              </p>
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

      <section id="section-5" className={`home-section join-us ${visible['section-5'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="cta-section">
            <h2 className="cta-title">Join Us!</h2>
            <p className="cta-description">
              Be part of Saudi Arabia's clinical research transformation. Whether you're a healthcare student 
              seeking practical experience or a practitioner ready to contribute to groundbreaking research, 
              Evidance is your gateway to excellence in clinical research.
            </p>
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
