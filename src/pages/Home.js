import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const [visible, setVisible] = useState({});

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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="home">
      <Hero />
      
      <section id="section-1" className={`home-section who-we-are ${visible['section-1'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Who We Are?</h2>
              <p className="section-description">
                Evidance is a pioneering modified clinical research organization in Saudi Arabia, 
                dedicated to bridging the gap between theoretical knowledge and practical research experience. 
                We are committed to advancing healthcare research in alignment with Saudi Arabia's Vision 2030.
              </p>
              <Link to="/who-we-are" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className="section-image">
              <div className="image-placeholder research-team"></div>
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

      <section id="section-3" className={`home-section success-record ${visible['section-3'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Demonstrated Success Record</h2>
              <p className="section-description">
                Our track record speaks for itself. We've successfully mentored numerous healthcare 
                professionals, facilitated groundbreaking research projects, and contributed to 
                advancing clinical research standards in the Kingdom.
              </p>
              <Link to="/success-record" className="btn btn-primary">
                View Our Achievements
              </Link>
            </div>
            <div className="section-image">
              <div className="image-placeholder success-metrics"></div>
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
                As a modified CRO, we're revolutionizing how clinical research is conducted in academic centers. 
                Our innovative approach combines traditional research excellence with modern digital platforms, 
                creating unprecedented opportunities for collaboration and growth.
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
              <Link to="/join-us" className="btn btn-accent">
                Start Your Journey
              </Link>
              <Link to="/who-we-are" className="btn btn-secondary">
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
              src="/evidance-website/images/Vision_2030.PNG" 
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
