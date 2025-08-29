import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('content');
  
  // Page content state
  const [content, setContent] = useState({
    whoWeAre: '',
    aimsGoals: '',
    successRecord: '',
    visionaryModel: '',
    joinUs: ''
  });

  // Hero section state
  const [heroContent, setHeroContent] = useState({
    title1: 'Advancing Healthcare Through',
    title2: 'Innovative Research',
    subtitle: "Join Evidance, Saudi Arabia's pioneering modified clinical research organization, where healthcare students and practitioners gain hands-on research experience leading to published work.",
    stat1Number: '50+',
    stat1Text: 'Research Projects',
    stat2Number: '250+',
    stat2Text: 'Trained Researchers',
    stat3Number: '25+',
    stat3Text: 'Published Papers',
    stat4Number: '15+',
    stat4Text: 'Accepted Papers'
  });

  // Home sections state
  const [homeSections, setHomeSections] = useState({
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

  // Images state
  const [images, setImages] = useState({
    publications: Array(5).fill(''),
    published: Array(10).fill(''),
    accepted: Array(4).fill(''),
    submitted: Array(5).fill('')
  });

  // Contact information
  const [contactInfo, setContactInfo] = useState({
    whatsappNumber: '00966549450781',
    email: 'info@evidance.sa',
    address: 'Riyadh, Saudi Arabia'
  });

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadAllContent();
    }
  }, []);

  const loadAllContent = () => {
    // Load page content
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }

    // Load hero content
    const savedHero = localStorage.getItem('heroContent');
    if (savedHero) {
      setHeroContent(JSON.parse(savedHero));
    }

    // Load home sections
    const savedSections = localStorage.getItem('homeSections');
    if (savedSections) {
      setHomeSections(JSON.parse(savedSections));
    }

    // Load images
    const savedImages = localStorage.getItem('publicationImages');
    if (savedImages) {
      setImages(prev => ({ ...prev, publications: JSON.parse(savedImages) }));
    }

    const savedPublications = localStorage.getItem('publicationsData');
    if (savedPublications) {
      const data = JSON.parse(savedPublications);
      setImages(prev => ({
        ...prev,
        published: data.published || Array(10).fill(''),
        accepted: data.accepted || Array(4).fill(''),
        submitted: data.submitted || Array(5).fill('')
      }));
    }

    // Load contact info
    const savedContact = localStorage.getItem('contactInfo');
    if (savedContact) {
      setContactInfo(JSON.parse(savedContact));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'AdminCNS12**') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadAllContent();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleContentChange = (page, value) => {
    setContent(prev => ({ ...prev, [page]: value }));
  };

  const handleHeroChange = (field, value) => {
    setHeroContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (field, value) => {
    setHomeSections(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (category, index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImages(prev => {
          const newImages = { ...prev };
          newImages[category][index] = imageUrl;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAllChanges = () => {
    // Save all content
    localStorage.setItem('pageContent', JSON.stringify(content));
    localStorage.setItem('heroContent', JSON.stringify(heroContent));
    localStorage.setItem('homeSections', JSON.stringify(homeSections));
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    localStorage.setItem('publicationImages', JSON.stringify(images.publications));
    localStorage.setItem('publicationsData', JSON.stringify({
      published: images.published,
      accepted: images.accepted,
      submitted: images.submitted
    }));
    
    alert('All changes saved successfully! Refresh the website to see updates.');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Evidance Admin Panel</h1>
        <div className="admin-header-actions">
          <button onClick={saveAllChanges} className="btn btn-success">Save All Changes</button>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'content' ? 'active' : ''} 
          onClick={() => setActiveTab('content')}
        >
          Page Content
        </button>
        <button 
          className={activeTab === 'hero' ? 'active' : ''} 
          onClick={() => setActiveTab('hero')}
        >
          Hero Section
        </button>
        <button 
          className={activeTab === 'home' ? 'active' : ''} 
          onClick={() => setActiveTab('home')}
        >
          Home Sections
        </button>
        <button 
          className={activeTab === 'images' ? 'active' : ''} 
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
        <button 
          className={activeTab === 'contact' ? 'active' : ''} 
          onClick={() => setActiveTab('contact')}
        >
          Contact Info
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'content' && (
          <section className="admin-section">
            <h2>Page Content Management</h2>
            
            <div className="content-editor">
              <h3>Who We Are Page</h3>
              <textarea
                value={content.whoWeAre}
                onChange={(e) => handleContentChange('whoWeAre', e.target.value)}
                placeholder="Enter content for Who We Are page..."
                rows="8"
              />
            </div>

            <div className="content-editor">
              <h3>Aims & Goals Page</h3>
              <textarea
                value={content.aimsGoals}
                onChange={(e) => handleContentChange('aimsGoals', e.target.value)}
                placeholder="Enter content for Aims & Goals page..."
                rows="8"
              />
            </div>

            <div className="content-editor">
              <h3>Success Record Page</h3>
              <textarea
                value={content.successRecord}
                onChange={(e) => handleContentChange('successRecord', e.target.value)}
                placeholder="Enter content for Success Record page..."
                rows="8"
              />
            </div>

            <div className="content-editor">
              <h3>Visionary Model Page</h3>
              <textarea
                value={content.visionaryModel}
                onChange={(e) => handleContentChange('visionaryModel', e.target.value)}
                placeholder="Enter content for Visionary Model page..."
                rows="8"
              />
            </div>

            <div className="content-editor">
              <h3>Join Us Page</h3>
              <textarea
                value={content.joinUs}
                onChange={(e) => handleContentChange('joinUs', e.target.value)}
                placeholder="Enter content for Join Us page..."
                rows="8"
              />
            </div>
          </section>
        )}

        {activeTab === 'hero' && (
          <section className="admin-section">
            <h2>Hero Section Management</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Title Line 1</label>
                <input
                  type="text"
                  value={heroContent.title1}
                  onChange={(e) => handleHeroChange('title1', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Title Line 2 (Blue)</label>
                <input
                  type="text"
                  value={heroContent.title2}
                  onChange={(e) => handleHeroChange('title2', e.target.value)}
                />
              </div>

              <div className="form-group full-width">
                <label>Subtitle</label>
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Stat 1 Number</label>
                <input
                  type="text"
                  value={heroContent.stat1Number}
                  onChange={(e) => handleHeroChange('stat1Number', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 1 Text</label>
                <input
                  type="text"
                  value={heroContent.stat1Text}
                  onChange={(e) => handleHeroChange('stat1Text', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 2 Number</label>
                <input
                  type="text"
                  value={heroContent.stat2Number}
                  onChange={(e) => handleHeroChange('stat2Number', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 2 Text</label>
                <input
                  type="text"
                  value={heroContent.stat2Text}
                  onChange={(e) => handleHeroChange('stat2Text', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 3 Number</label>
                <input
                  type="text"
                  value={heroContent.stat3Number}
                  onChange={(e) => handleHeroChange('stat3Number', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 3 Text</label>
                <input
                  type="text"
                  value={heroContent.stat3Text}
                  onChange={(e) => handleHeroChange('stat3Text', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 4 Number</label>
                <input
                  type="text"
                  value={heroContent.stat4Number}
                  onChange={(e) => handleHeroChange('stat4Number', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stat 4 Text</label>
                <input
                  type="text"
                  value={heroContent.stat4Text}
                  onChange={(e) => handleHeroChange('stat4Text', e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'home' && (
          <section className="admin-section">
            <h2>Home Page Sections</h2>
            
            <div className="content-editor">
              <h3>Recent Publications Section</h3>
              <input
                type="text"
                value={homeSections.publicationsTitle}
                onChange={(e) => handleSectionChange('publicationsTitle', e.target.value)}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.publicationsText}
                onChange={(e) => handleSectionChange('publicationsText', e.target.value)}
                placeholder="Section Description"
                rows="4"
              />
            </div>

            <div className="content-editor">
              <h3>Aims & Goals Section</h3>
              <input
                type="text"
                value={homeSections.aimsTitle}
                onChange={(e) => handleSectionChange('aimsTitle', e.target.value)}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.aimsText}
                onChange={(e) => handleSectionChange('aimsText', e.target.value)}
                placeholder="Section Description"
                rows="4"
              />
            </div>

            <div className="content-editor">
              <h3>Research Impact Section</h3>
              <input
                type="text"
                value={homeSections.researchTitle}
                onChange={(e) => handleSectionChange('researchTitle', e.target.value)}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.researchText}
                onChange={(e) => handleSectionChange('researchText', e.target.value)}
                placeholder="Section Description"
                rows="4"
              />
            </div>

            <div className="content-editor">
              <h3>Visionary Model Section</h3>
              <input
                type="text"
                value={homeSections.visionaryTitle}
                onChange={(e) => handleSectionChange('visionaryTitle', e.target.value)}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.visionaryText}
                onChange={(e) => handleSectionChange('visionaryText', e.target.value)}
                placeholder="Section Description"
                rows="4"
              />
            </div>

            <div className="content-editor">
              <h3>Join Us Section</h3>
              <input
                type="text"
                value={homeSections.joinUsTitle}
                onChange={(e) => handleSectionChange('joinUsTitle', e.target.value)}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.joinUsText}
                onChange={(e) => handleSectionChange('joinUsText', e.target.value)}
                placeholder="Section Description"
                rows="4"
              />
            </div>
          </section>
        )}

        {activeTab === 'images' && (
          <section className="admin-section">
            <h2>Image Management</h2>
            
            <div className="image-manager">
              <h3>Home Page Publication Carousel (5 images)</h3>
              <div className="image-grid">
                {images.publications.map((img, index) => (
                  <div key={index} className="image-upload-box">
                    <label>Image {index + 1}</label>
                    {img && <img src={img} alt={`Publication ${index + 1}`} className="preview-img" />}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('publications', index, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="image-manager">
              <h3>Published Papers (10 images)</h3>
              <div className="image-grid">
                {images.published.map((img, index) => (
                  <div key={index} className="image-upload-box">
                    <label>Published {index + 1}</label>
                    {img && <img src={img} alt={`Published ${index + 1}`} className="preview-img" />}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('published', index, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="image-manager">
              <h3>Accepted Papers (4 images)</h3>
              <div className="image-grid">
                {images.accepted.map((img, index) => (
                  <div key={index} className="image-upload-box">
                    <label>Accepted {index + 1}</label>
                    {img && <img src={img} alt={`Accepted ${index + 1}`} className="preview-img" />}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('accepted', index, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="image-manager">
              <h3>Submitted Papers (5 images)</h3>
              <div className="image-grid">
                {images.submitted.map((img, index) => (
                  <div key={index} className="image-upload-box">
                    <label>Submitted {index + 1}</label>
                    {img && <img src={img} alt={`Submitted ${index + 1}`} className="preview-img" />}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('submitted', index, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="admin-section">
            <h2>Contact Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input
                  type="text"
                  value={contactInfo.whatsappNumber}
                  onChange={(e) => handleContactChange('whatsappNumber', e.target.value)}
                  placeholder="e.g., 00966549450781"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="e.g., info@evidance.sa"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  placeholder="e.g., Riyadh, Saudi Arabia"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;
