import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  
  // Who We Are page structured content
  const [whoWeAre, setWhoWeAre] = useState({
    storyTitle: 'Our Story',
    storyContent: '',
    teamTitle: 'Our Team',
    teamContent: '',
    valuesTitle: 'Our Values',
    valuesContent: ''
  });

  // Aims & Goals page structured content
  const [aimsGoals, setAimsGoals] = useState({
    objectivesTitle: 'Primary Objectives',
    objectivesContent: '',
    goalsTitle: 'Strategic Goals',
    goalsContent: '',
    visionTitle: 'Future Vision',
    visionContent: ''
  });

  // Success Record page structured content
  const [successRecord, setSuccessRecord] = useState({
    achievementsTitle: 'Key Achievements',
    achievementsContent: '',
    publicationsTitle: 'Research Publications',
    publicationsContent: '',
    storiesTitle: 'Success Stories',
    storiesContent: ''
  });

  // Visionary Model page structured content
  const [visionaryModel, setVisionaryModel] = useState({
    approachTitle: 'Modified CRO Approach',
    approachContent: '',
    frameworkTitle: 'Innovation Framework',
    frameworkContent: '',
    platformTitle: 'Digital Platform',
    platformContent: ''
  });

  // Join Us page content
  const [joinUs, setJoinUs] = useState({
    title: 'Join Our Research Community',
    content: '',
    contactInfo: ''
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
    publicationsText: 'Explore our latest research contributions advancing healthcare knowledge.',
    aimsTitle: 'What Are Our Aims and Goals?',
    aimsText: 'We aim to transform clinical research education by providing hands-on experience.',
    researchTitle: 'Research Impact & Innovation',
    researchText: 'Our research initiatives focus on addressing critical healthcare challenges.',
    visionaryTitle: 'Our Visionary Model',
    visionaryText: 'We implement a novel model of clinical research organization.',
    joinUsTitle: 'Join Us!',
    joinUsText: 'Be part of Saudi Arabia\'s clinical research transformation.'
  });

  // Images state
  const [images, setImages] = useState({
    publications: Array(5).fill(''),
    published: Array(10).fill(''),
    accepted: Array(4).fill(''),
    submitted: Array(5).fill('')
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadAllContent();
    }
  }, []);

  const loadAllContent = async () => {
    setLoading(true);
    try {
      // Load Who We Are content
      const whoWeAreDoc = await getDoc(doc(db, 'content', 'whoWeAre'));
      if (whoWeAreDoc.exists()) {
        setWhoWeAre(whoWeAreDoc.data());
      }

      // Load Aims & Goals content
      const aimsGoalsDoc = await getDoc(doc(db, 'content', 'aimsGoals'));
      if (aimsGoalsDoc.exists()) {
        setAimsGoals(aimsGoalsDoc.data());
      }

      // Load Success Record content
      const successRecordDoc = await getDoc(doc(db, 'content', 'successRecord'));
      if (successRecordDoc.exists()) {
        setSuccessRecord(successRecordDoc.data());
      }

      // Load Visionary Model content
      const visionaryModelDoc = await getDoc(doc(db, 'content', 'visionaryModel'));
      if (visionaryModelDoc.exists()) {
        setVisionaryModel(visionaryModelDoc.data());
      }

      // Load Join Us content
      const joinUsDoc = await getDoc(doc(db, 'content', 'joinUs'));
      if (joinUsDoc.exists()) {
        setJoinUs(joinUsDoc.data());
      }

      // Load Hero content
      const heroDoc = await getDoc(doc(db, 'content', 'heroContent'));
      if (heroDoc.exists()) {
        setHeroContent(heroDoc.data());
      }

      // Load Home sections
      const sectionsDoc = await getDoc(doc(db, 'content', 'homeSections'));
      if (sectionsDoc.exists()) {
        setHomeSections(sectionsDoc.data());
      }

      // Load Images
      const imagesDoc = await getDoc(doc(db, 'content', 'images'));
      if (imagesDoc.exists()) {
        setImages(imagesDoc.data());
      }
    } catch (error) {
      console.error('Error loading content from Firebase:', error);
    }
    setLoading(false);
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

  const handleImageUpload = (category, index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImages(prev => {
          const newImages = { ...prev };
          newImages[category][index] = imageData;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAllChanges = async () => {
    setLoading(true);
    try {
      // Save all content to Firebase Firestore
      await setDoc(doc(db, 'content', 'whoWeAre'), whoWeAre);
      await setDoc(doc(db, 'content', 'aimsGoals'), aimsGoals);
      await setDoc(doc(db, 'content', 'successRecord'), successRecord);
      await setDoc(doc(db, 'content', 'visionaryModel'), visionaryModel);
      await setDoc(doc(db, 'content', 'joinUs'), joinUs);
      await setDoc(doc(db, 'content', 'heroContent'), heroContent);
      await setDoc(doc(db, 'content', 'homeSections'), homeSections);
      await setDoc(doc(db, 'content', 'images'), images);
      
      alert('All changes saved globally! Updates are now live for all devices worldwide.');
    } catch (error) {
      alert('Error saving changes: ' + error.message);
      console.error('Firebase save error:', error);
    }
    setLoading(false);
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
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            fontSize: '18px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
              <div>Saving to Cloud...</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="admin-header">
        <h1>Evidance Admin Panel</h1>
        <div className="admin-header-actions">
          <button onClick={saveAllChanges} className="btn btn-success">
            💾 Save All Changes Globally
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
          Page Content
        </button>
        <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>
          Hero Section
        </button>
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
          Home Sections
        </button>
        <button className={activeTab === 'images' ? 'active' : ''} onClick={() => setActiveTab('images')}>
          Images
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'content' && (
          <section className="admin-section">
            <h2>Page Content Management</h2>
            
            {/* Who We Are Section */}
            <div className="page-editor">
              <h3>📄 Who We Are Page</h3>
              <div className="subsection-grid">
                <div className="subsection">
                  <label>Story Title</label>
                  <input
                    type="text"
                    value={whoWeAre.storyTitle}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, storyTitle: e.target.value }))}
                  />
                  <label>Story Content</label>
                  <textarea
                    value={whoWeAre.storyContent}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, storyContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Team Title</label>
                  <input
                    type="text"
                    value={whoWeAre.teamTitle}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, teamTitle: e.target.value }))}
                  />
                  <label>Team Content</label>
                  <textarea
                    value={whoWeAre.teamContent}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, teamContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Values Title</label>
                  <input
                    type="text"
                    value={whoWeAre.valuesTitle}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, valuesTitle: e.target.value }))}
                  />
                  <label>Values Content</label>
                  <textarea
                    value={whoWeAre.valuesContent}
                    onChange={(e) => setWhoWeAre(prev => ({ ...prev, valuesContent: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Aims & Goals Section */}
            <div className="page-editor">
              <h3>🎯 Aims & Goals Page</h3>
              <div className="subsection-grid">
                <div className="subsection">
                  <label>Objectives Title</label>
                  <input
                    type="text"
                    value={aimsGoals.objectivesTitle}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, objectivesTitle: e.target.value }))}
                  />
                  <label>Objectives Content</label>
                  <textarea
                    value={aimsGoals.objectivesContent}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, objectivesContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Goals Title</label>
                  <input
                    type="text"
                    value={aimsGoals.goalsTitle}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, goalsTitle: e.target.value }))}
                  />
                  <label>Goals Content</label>
                  <textarea
                    value={aimsGoals.goalsContent}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, goalsContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Vision Title</label>
                  <input
                    type="text"
                    value={aimsGoals.visionTitle}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, visionTitle: e.target.value }))}
                  />
                  <label>Vision Content</label>
                  <textarea
                    value={aimsGoals.visionContent}
                    onChange={(e) => setAimsGoals(prev => ({ ...prev, visionContent: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Success Record Section */}
            <div className="page-editor">
              <h3>🏆 Success Record Page</h3>
              <div className="subsection-grid">
                <div className="subsection">
                  <label>Achievements Title</label>
                  <input
                    type="text"
                    value={successRecord.achievementsTitle}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, achievementsTitle: e.target.value }))}
                  />
                  <label>Achievements Content</label>
                  <textarea
                    value={successRecord.achievementsContent}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, achievementsContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Publications Title</label>
                  <input
                    type="text"
                    value={successRecord.publicationsTitle}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, publicationsTitle: e.target.value }))}
                  />
                  <label>Publications Content</label>
                  <textarea
                    value={successRecord.publicationsContent}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, publicationsContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Stories Title</label>
                  <input
                    type="text"
                    value={successRecord.storiesTitle}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, storiesTitle: e.target.value }))}
                  />
                  <label>Stories Content</label>
                  <textarea
                    value={successRecord.storiesContent}
                    onChange={(e) => setSuccessRecord(prev => ({ ...prev, storiesContent: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Visionary Model Section */}
            <div className="page-editor">
              <h3>💡 Visionary Model Page</h3>
              <div className="subsection-grid">
                <div className="subsection">
                  <label>Approach Title</label>
                  <input
                    type="text"
                    value={visionaryModel.approachTitle}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, approachTitle: e.target.value }))}
                  />
                  <label>Approach Content</label>
                  <textarea
                    value={visionaryModel.approachContent}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, approachContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Framework Title</label>
                  <input
                    type="text"
                    value={visionaryModel.frameworkTitle}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, frameworkTitle: e.target.value }))}
                  />
                  <label>Framework Content</label>
                  <textarea
                    value={visionaryModel.frameworkContent}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, frameworkContent: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Platform Title</label>
                  <input
                    type="text"
                    value={visionaryModel.platformTitle}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, platformTitle: e.target.value }))}
                  />
                  <label>Platform Content</label>
                  <textarea
                    value={visionaryModel.platformContent}
                    onChange={(e) => setVisionaryModel(prev => ({ ...prev, platformContent: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Join Us Section */}
            <div className="page-editor">
              <h3>🤝 Join Us Page</h3>
              <div className="subsection-grid">
                <div className="subsection">
                  <label>Page Title</label>
                  <input
                    type="text"
                    value={joinUs.title}
                    onChange={(e) => setJoinUs(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <label>Main Content</label>
                  <textarea
                    value={joinUs.content}
                    onChange={(e) => setJoinUs(prev => ({ ...prev, content: e.target.value }))}
                    rows="4"
                  />
                </div>
                <div className="subsection">
                  <label>Contact Information</label>
                  <textarea
                    value={joinUs.contactInfo}
                    onChange={(e) => setJoinUs(prev => ({ ...prev, contactInfo: e.target.value }))}
                    rows="4"
                  />
                </div>
              </div>
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
                  onChange={(e) => setHeroContent(prev => ({ ...prev, title1: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Title Line 2 (Blue)</label>
                <input
                  type="text"
                  value={heroContent.title2}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, title2: e.target.value }))}
                />
              </div>
              <div className="form-group full-width">
                <label>Subtitle</label>
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, subtitle: e.target.value }))}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Stat 1 Number</label>
                <input
                  type="text"
                  value={heroContent.stat1Number}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat1Number: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 1 Text</label>
                <input
                  type="text"
                  value={heroContent.stat1Text}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat1Text: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 2 Number</label>
                <input
                  type="text"
                  value={heroContent.stat2Number}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat2Number: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 2 Text</label>
                <input
                  type="text"
                  value={heroContent.stat2Text}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat2Text: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 3 Number</label>
                <input
                  type="text"
                  value={heroContent.stat3Number}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat3Number: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 3 Text</label>
                <input
                  type="text"
                  value={heroContent.stat3Text}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat3Text: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 4 Number</label>
                <input
                  type="text"
                  value={heroContent.stat4Number}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat4Number: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Stat 4 Text</label>
                <input
                  type="text"
                  value={heroContent.stat4Text}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, stat4Text: e.target.value }))}
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
                onChange={(e) => setHomeSections(prev => ({ ...prev, publicationsTitle: e.target.value }))}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.publicationsText}
                onChange={(e) => setHomeSections(prev => ({ ...prev, publicationsText: e.target.value }))}
                placeholder="Section Description"
                rows="4"
              />
            </div>
            <div className="content-editor">
              <h3>Aims & Goals Section</h3>
              <input
                type="text"
                value={homeSections.aimsTitle}
                onChange={(e) => setHomeSections(prev => ({ ...prev, aimsTitle: e.target.value }))}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.aimsText}
                onChange={(e) => setHomeSections(prev => ({ ...prev, aimsText: e.target.value }))}
                placeholder="Section Description"
                rows="4"
              />
            </div>
            <div className="content-editor">
              <h3>Research Impact Section</h3>
              <input
                type="text"
                value={homeSections.researchTitle}
                onChange={(e) => setHomeSections(prev => ({ ...prev, researchTitle: e.target.value }))}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.researchText}
                onChange={(e) => setHomeSections(prev => ({ ...prev, researchText: e.target.value }))}
                placeholder="Section Description"
                rows="4"
              />
            </div>
            <div className="content-editor">
              <h3>Visionary Model Section</h3>
              <input
                type="text"
                value={homeSections.visionaryTitle}
                onChange={(e) => setHomeSections(prev => ({ ...prev, visionaryTitle: e.target.value }))}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.visionaryText}
                onChange={(e) => setHomeSections(prev => ({ ...prev, visionaryText: e.target.value }))}
                placeholder="Section Description"
                rows="4"
              />
            </div>
            <div className="content-editor">
              <h3>Join Us Section</h3>
              <input
                type="text"
                value={homeSections.joinUsTitle}
                onChange={(e) => setHomeSections(prev => ({ ...prev, joinUsTitle: e.target.value }))}
                placeholder="Section Title"
                className="mb-2"
              />
              <textarea
                value={homeSections.joinUsText}
                onChange={(e) => setHomeSections(prev => ({ ...prev, joinUsText: e.target.value }))}
                placeholder="Section Description"
                rows="4"
              />
            </div>
          </section>
        )}

        {activeTab === 'images' && (
          <section className="admin-section">
            <h2>Image Management</h2>
            <p className="info-text">Upload images for publication galleries. Images are saved as base64 data and synced globally.</p>
            
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
                    {img && (
                      <button 
                        className="btn-remove"
                        onClick={() => setImages(prev => {
                          const newImages = { ...prev };
                          newImages.publications[index] = '';
                          return newImages;
                        })}
                      >
                        Remove
                      </button>
                    )}
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
                    {img && (
                      <button 
                        className="btn-remove"
                        onClick={() => setImages(prev => {
                          const newImages = { ...prev };
                          newImages.published[index] = '';
                          return newImages;
                        })}
                      >
                        Remove
                      </button>
                    )}
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
                    {img && (
                      <button 
                        className="btn-remove"
                        onClick={() => setImages(prev => {
                          const newImages = { ...prev };
                          newImages.accepted[index] = '';
                          return newImages;
                        })}
                      >
                        Remove
                      </button>
                    )}
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
                    {img && (
                      <button 
                        className="btn-remove"
                        onClick={() => setImages(prev => {
                          const newImages = { ...prev };
                          newImages.submitted[index] = '';
                          return newImages;
                        })}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;
