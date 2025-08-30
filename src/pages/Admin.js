import React, { useState, useEffect } from 'react';
import githubDataService from '../services/githubDataService';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  // Content state
  const [content, setContent] = useState({
    whoWeAre: {
      storyTitle: 'Our Story',
      storyContent: 'Evidance is Saudi Arabia\'s pioneering modified clinical research organization, established to bridge the gap between academic knowledge and practical research experience.',
      teamTitle: 'Our Team',
      teamContent: 'Our team consists of experienced researchers, healthcare professionals, and educators dedicated to advancing clinical research in the Kingdom.',
      valuesTitle: 'Our Values',
      valuesContent: 'We are committed to advancing clinical research in Saudi Arabia by providing comprehensive research education, facilitating innovative studies, and building a community of skilled healthcare researchers.'
    },
    aimsGoals: {
      objectivesTitle: 'Our Objectives',
      objectivesContent: 'We strive to advance evidence-based research methodologies by developing innovative tools and frameworks that enhance the quality and reliability of scientific inquiry across diverse fields.',
      goalsTitle: 'Our Goals',
      goalsContent: 'Our primary goals include establishing robust research standards, fostering collaboration among researchers, and creating accessible resources that promote evidence-based decision making in academia and industry.',
      visionTitle: 'Our Vision',
      visionContent: 'We envision a future where evidence-based research is the standard across all disciplines, where researchers have access to cutting-edge tools and methodologies, and where scientific findings drive positive change in society.'
    },
    successRecord: {
      achievementsTitle: 'Our Achievements',
      achievementsContent: 'Over the years, we have successfully completed numerous research projects, contributing to significant advancements in evidence-based methodologies and establishing new standards for research excellence.',
      publicationsTitle: 'Publications & Research',
      publicationsContent: 'Our team has published extensively in peer-reviewed journals, presenting our findings at international conferences, and contributing to the global research community through high-impact publications.',
      storiesTitle: 'Success Stories',
      storiesContent: 'We have partnered with leading institutions and organizations to implement evidence-based solutions, resulting in improved outcomes, enhanced methodologies, and measurable positive impacts across various sectors.'
    },
    visionaryModel: {
      approachTitle: 'Our Approach',
      approachContent: 'Our unique modified CRO model combines traditional clinical research excellence with innovative educational approaches, creating opportunities for healthcare professionals to engage in meaningful research while maintaining their clinical practice.',
      frameworkTitle: 'Our Framework',
      frameworkContent: 'We have developed a comprehensive framework that integrates cutting-edge technology with proven research principles, creating a systematic approach to evidence-based research that can be adapted across various disciplines and contexts.',
      platformTitle: 'Our Platform',
      platformContent: 'Our research platform provides researchers with advanced tools and resources needed to conduct high-quality, evidence-based studies, featuring state-of-the-art analytics, collaboration features, and comprehensive data management capabilities.'
    },
    joinUs: {
      title: 'Join Our Research Community',
      content: 'Become part of Saudi Arabia\'s leading clinical research community. Whether you\'re a healthcare student, practitioner, or researcher, we provide the training, mentorship, and resources you need to succeed in clinical research.'
    },
    heroContent: {
      title1: 'Evidance',
      title2: 'Research Platform',
      subtitle: 'Advancing Clinical Research in Saudi Arabia',
      stat1Number: '50+',
      stat1Text: 'Research Projects',
      stat2Number: '25+',
      stat2Text: 'Publications',
      stat3Number: '15+',
      stat3Text: 'Partner Organizations',
      stat4Number: '500+',
      stat4Text: 'Researchers Trained'
    },
    homeSections: {
      publicationsTitle: 'Recent Publications',
      publicationsText: 'Explore our latest research publications and contributions to medical science. Our work spans multiple disciplines including clinical trials, public health studies, and innovative healthcare solutions.',
      aimsTitle: 'What Are Our Aims and Goals?',
      aimsText: 'We are committed to advancing clinical research in Saudi Arabia by providing comprehensive research education, facilitating innovative studies, and building a community of skilled healthcare researchers.',
      researchTitle: 'Research Impact & Innovation',
      researchText: 'Our research has contributed to significant advancements in healthcare delivery across the Kingdom. Through collaborative efforts with leading institutions, we have pioneered new methodologies and established best practices in clinical research.',
      visionaryTitle: 'Our Visionary Model',
      visionaryText: 'Our unique modified CRO model combines traditional clinical research excellence with innovative educational approaches, creating opportunities for healthcare professionals to engage in meaningful research while maintaining their clinical practice.',
      joinUsTitle: 'Join Us!',
      joinUsText: 'Become part of Saudi Arabia\'s leading clinical research community. Whether you\'re a healthcare student, practitioner, or researcher, we provide the training, mentorship, and resources you need to succeed in clinical research.'
    },
    publications: [
      {
        id: 1,
        image: 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=COVID-19+Study',
        title: 'COVID-19 Vaccine Efficacy Study',
        description: 'A comprehensive analysis of vaccine effectiveness in the Saudi population',
        authors: 'Dr. Ahmed Al-Rashid, Dr. Sarah Al-Mansouri',
        journal: 'Saudi Medical Journal',
        date: '2024',
        doi: '10.15537/smj.2024.01.001'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/300x200/50b3a2/ffffff?text=Diabetes+Research',
        title: 'Diabetes Management Innovations',
        description: 'Novel approaches to Type 2 diabetes management in the Middle East',
        authors: 'Dr. Fatima Al-Zahra, Dr. Mohammed Al-Ghamdi',
        journal: 'Middle East Journal of Diabetes',
        date: '2024',
        doi: '10.5144/0256-4947.2024.102'
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Pediatric+Health',
        title: 'Pediatric Health Outcomes',
        description: 'Improving childhood health outcomes through evidence-based interventions',
        authors: 'Dr. Norah Al-Sudairy, Dr. Khalid Al-Otaibi',
        journal: 'Pediatric Research International',
        date: '2024',
        doi: '10.1038/s41390-024-03001-1'
      }
    ],
    contactInfo: {
      email: 'info@evidance.org.sa',
      phone: '+966 11 123 4567',
      address: 'Riyadh, Saudi Arabia'
    }
  });

  useEffect(() => {
    // Check if GitHub token is already stored
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setGithubToken(storedToken);
      setIsAuthenticated(true);
      githubDataService.setToken(storedToken);
    }

    // Load existing content
    loadCurrentContent();
  }, []);

  const loadCurrentContent = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/website-content.json?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setContent(prevContent => ({
          ...prevContent,
          ...data
        }));
      }
    } catch (error) {
      console.log('Could not load current content:', error);
    }
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (githubToken.trim()) {
      localStorage.setItem('github_token', githubToken);
      githubDataService.setToken(githubToken);
      setIsAuthenticated(true);
      setSaveStatus('Token saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setGithubToken('');
    setIsAuthenticated(false);
    setSaveStatus('Logged out successfully');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleInputChange = (section, field, value) => {
    setContent(prevContent => ({
      ...prevContent,
      [section]: {
        ...prevContent[section],
        [field]: value
      }
    }));
  };

  const handlePublicationChange = (index, field, value) => {
    setContent(prevContent => ({
      ...prevContent,
      publications: prevContent.publications.map((pub, i) => 
        i === index ? { ...pub, [field]: value } : pub
      )
    }));
  };

  const addPublication = () => {
    const newId = Math.max(...content.publications.map(p => p.id)) + 1;
    setContent(prevContent => ({
      ...prevContent,
      publications: [
        ...prevContent.publications,
        {
          id: newId,
          image: '',
          title: '',
          description: '',
          authors: '',
          journal: '',
          date: '',
          doi: ''
        }
      ]
    }));
  };

  const removePublication = (index) => {
    setContent(prevContent => ({
      ...prevContent,
      publications: prevContent.publications.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setSaveStatus('Please set up GitHub token first');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    setIsSaving(true);
    setSaveStatus('Saving to GitHub...');

    try {
      const success = await githubDataService.saveContent(content);
      if (success) {
        setSaveStatus('✅ Content saved successfully to GitHub!');
        setLastSaved(new Date());
      } else {
        setSaveStatus('❌ Failed to save content. Please check your token and try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus(`❌ Error: ${error.message}`);
    }

    setIsSaving(false);
    setTimeout(() => setSaveStatus(''), 5000);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="auth-form">
          <h2>GitHub Authentication Required</h2>
          <p>Please enter your GitHub Personal Access Token to manage website content.</p>
          <form onSubmit={handleTokenSubmit}>
            <input
              type="password"
              placeholder="GitHub Personal Access Token"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              required
            />
            <button type="submit">Authenticate</button>
          </form>
          {saveStatus && <div className="status-message">{saveStatus}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Website Content Management</h1>
        <div className="admin-controls">
          {lastSaved && (
            <span className="last-saved">
              Last saved: {lastSaved.toLocaleString()}
            </span>
          )}
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="save-btn"
          >
            {isSaving ? 'Saving...' : 'Save to GitHub'}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {saveStatus && <div className="status-message">{saveStatus}</div>}

      {/* Hero Content */}
      <section className="admin-section">
        <h2>Hero Section</h2>
        <div className="form-group">
          <label>Title 1:</label>
          <input
            type="text"
            value={content.heroContent.title1}
            onChange={(e) => handleInputChange('heroContent', 'title1', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Title 2:</label>
          <input
            type="text"
            value={content.heroContent.title2}
            onChange={(e) => handleInputChange('heroContent', 'title2', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subtitle:</label>
          <input
            type="text"
            value={content.heroContent.subtitle}
            onChange={(e) => handleInputChange('heroContent', 'subtitle', e.target.value)}
          />
        </div>
        {/* Stats */}
        <div className="stats-grid">
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="stat-group">
              <label>Stat {num} Number:</label>
              <input
                type="text"
                value={content.heroContent[`stat${num}Number`]}
                onChange={(e) => handleInputChange('heroContent', `stat${num}Number`, e.target.value)}
              />
              <label>Stat {num} Text:</label>
              <input
                type="text"
                value={content.heroContent[`stat${num}Text`]}
                onChange={(e) => handleInputChange('heroContent', `stat${num}Text`, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Home Sections */}
      <section className="admin-section">
        <h2>Home Page Sections</h2>
        {Object.entries(content.homeSections).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange('homeSections', key, e.target.value)}
              rows="3"
            />
          </div>
        ))}
      </section>

      {/* Who We Are */}
      <section className="admin-section">
        <h2>Who We Are Page</h2>
        {Object.entries(content.whoWeAre).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange('whoWeAre', key, e.target.value)}
              rows="3"
            />
          </div>
        ))}
      </section>

      {/* Publications */}
      <section className="admin-section">
        <h2>Publications</h2>
        {content.publications.map((pub, index) => (
          <div key={pub.id} className="publication-form">
            <h3>Publication {index + 1}</h3>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={pub.title}
                onChange={(e) => handlePublicationChange(index, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={pub.description}
                onChange={(e) => handlePublicationChange(index, 'description', e.target.value)}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="url"
                value={pub.image}
                onChange={(e) => handlePublicationChange(index, 'image', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Authors:</label>
              <input
                type="text"
                value={pub.authors}
                onChange={(e) => handlePublicationChange(index, 'authors', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Journal:</label>
              <input
                type="text"
                value={pub.journal}
                onChange={(e) => handlePublicationChange(index, 'journal', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="text"
                value={pub.date}
                onChange={(e) => handlePublicationChange(index, 'date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>DOI:</label>
              <input
                type="text"
                value={pub.doi}
                onChange={(e) => handlePublicationChange(index, 'doi', e.target.value)}
              />
            </div>
            <button 
              type="button" 
              onClick={() => removePublication(index)}
              className="remove-btn"
            >
              Remove Publication
            </button>
          </div>
        ))}
        <button onClick={addPublication} className="add-btn">
          Add New Publication
        </button>
      </section>

      {/* Contact Info */}
      <section className="admin-section">
        <h2>Contact Information</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={content.contactInfo.email}
            onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={content.contactInfo.phone}
            onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={content.contactInfo.address}
            onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
          />
        </div>
      </section>

      <div className="admin-footer">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="save-btn primary"
        >
          {isSaving ? '💾 Saving to GitHub...' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default Admin;
