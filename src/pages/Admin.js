import React, { useState, useEffect } from 'react';
import './Admin.css';

// JSONBin configuration
const JSONBIN_CONFIG = {
  BIN_ID: '68b175b643b1c97be92f274d',
  MASTER_KEY: '$2a$10$WWXSel9VjGXEalWwyvd2P.t/EYY8DpBCWilIR1zqhYkVEFqt.1R4y',
  ACCESS_KEY: '$2a$10$fo2nyFgpKh.7vGOagvtbNuy2pSUNpDjClzarA1EVdylXC6Gk6FC1C',
  BASE_URL: 'https://api.jsonbin.io/v3'
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('content');
  
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
    publicationsText: 'Explore our latest research publications and contributions to medical science. Our work spans multiple disciplines including clinical trials, public health studies, and innovative healthcare solutions.',
    aimsTitle: 'What Are Our Aims and Goals?',
    aimsText: 'We are committed to advancing clinical research in Saudi Arabia by providing comprehensive research education, facilitating innovative studies, and building a community of skilled healthcare researchers.',
    researchTitle: 'Research Impact & Innovation',
    researchText: 'Our research has contributed to significant advancements in healthcare delivery across the Kingdom. Through collaborative efforts with leading institutions, we have pioneered new methodologies and established best practices in clinical research.',
    visionaryTitle: 'Our Visionary Model',
    visionaryText: 'Our unique modified CRO model combines traditional clinical research excellence with innovative educational approaches, creating opportunities for healthcare professionals to engage in meaningful research while maintaining their clinical practice.',
    joinUsTitle: 'Join Us!',
    joinUsText: 'Become part of Saudi Arabia\'s leading clinical research community. Whether you\'re a healthcare student, practitioner, or researcher, we provide the training, mentorship, and resources you need to succeed in clinical research.'
  });

  // Publications state
  const [publications, setPublications] = useState([
    { id: 1, image: '', title: 'Research Publication 1', description: 'Description of publication 1' },
    { id: 2, image: '', title: 'Research Publication 2', description: 'Description of publication 2' },
    { id: 3, image: '', title: 'Research Publication 3', description: 'Description of publication 3' },
    { id: 4, image: '', title: 'Research Publication 4', description: 'Description of publication 4' },
    { id: 5, image: '', title: 'Research Publication 5', description: 'Description of publication 5' },
    { id: 6, image: '', title: 'Research Publication 6', description: 'Description of publication 6' }
  ]);

  // Contact info state
  const [contactInfo, setContactInfo] = useState({
    email: 'info@evidance.com',
    phone: '+966 54 945 0781',
    address: 'Riyadh, Kingdom of Saudi Arabia'
  });

  // Load data from JSONBin
  const loadFromJSONBin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/b/${JSONBIN_CONFIG.BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY
        }
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.record;
        
        if (data) {
          if (data.whoWeAre) setWhoWeAre(data.whoWeAre);
          if (data.aimsGoals) setAimsGoals(data.aimsGoals);
          if (data.successRecord) setSuccessRecord(data.successRecord);
          if (data.visionaryModel) setVisionaryModel(data.visionaryModel);
          if (data.joinUs) setJoinUs(data.joinUs);
          if (data.heroContent) setHeroContent(data.heroContent);
          if (data.homeSections) setHomeSections(data.homeSections);
          if (data.publications) setPublications(data.publications);
          if (data.contactInfo) setContactInfo(data.contactInfo);
        }
      }
    } catch (error) {
      console.error('Error loading from JSONBin:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save data to JSONBin
  const saveToJSONBin = async () => {
    try {
      setLoading(true);
      setSaveStatus('Saving changes globally...');
      
      const allData = {
        whoWeAre,
        aimsGoals,
        successRecord,
        visionaryModel,
        joinUs,
        heroContent,
        homeSections,
        publications,
        contactInfo,
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/b/${JSONBIN_CONFIG.BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
          'X-Bin-Versioning': 'false'
        },
        body: JSON.stringify(allData)
      });

      if (response.ok) {
        // Also save to localStorage for faster initial load
        localStorage.setItem('evidance_data_cache', JSON.stringify(allData));
        localStorage.setItem('evidance_last_update', new Date().toISOString());
        
        setSaveStatus('✓ Changes saved successfully! All devices will see the updates.');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Error saving changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving to JSONBin:', error);
      setSaveStatus('Error saving changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadFromJSONBin();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'AdminCNS12**') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadFromJSONBin();
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setCredentials({ username: '', password: '' });
  };

  const handleImageUpload = (pubId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPublications(prev => prev.map(pub => 
          pub.id === pubId ? { ...pub, image: reader.result } : pub
        ));
      };
      reader.readAsDataURL(file);
    }
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
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
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
          <button 
            onClick={saveToJSONBin} 
            className="btn btn-accent"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save All Changes Globally'}
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      {saveStatus && (
        <div className={`save-status ${saveStatus.includes('✓') ? 'success' : 'error'}`}>
          {saveStatus}
        </div>
      )}

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
          className={activeTab === 'publications' ? 'active' : ''} 
          onClick={() => setActiveTab('publications')}
        >
          Publications
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
          <div className="content-tab">
            {/* Who We Are Section */}
            <section className="admin-section">
              <h2>Who We Are Page</h2>
              <div className="subsection-grid">
                <div className="subsection">
                  <h3>Our Story</h3>
                  <input 
                    type="text" 
                    placeholder="Story Title"
                    value={whoWeAre.storyTitle}
                    onChange={(e) => setWhoWeAre({...whoWeAre, storyTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Story Content"
                    value={whoWeAre.storyContent}
                    onChange={(e) => setWhoWeAre({...whoWeAre, storyContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Our Team</h3>
                  <input 
                    type="text" 
                    placeholder="Team Title"
                    value={whoWeAre.teamTitle}
                    onChange={(e) => setWhoWeAre({...whoWeAre, teamTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Team Content"
                    value={whoWeAre.teamContent}
                    onChange={(e) => setWhoWeAre({...whoWeAre, teamContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Our Values</h3>
                  <input 
                    type="text" 
                    placeholder="Values Title"
                    value={whoWeAre.valuesTitle}
                    onChange={(e) => setWhoWeAre({...whoWeAre, valuesTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Values Content"
                    value={whoWeAre.valuesContent}
                    onChange={(e) => setWhoWeAre({...whoWeAre, valuesContent: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Aims & Goals Section */}
            <section className="admin-section">
              <h2>Aims & Goals Page</h2>
              <div className="subsection-grid">
                <div className="subsection">
                  <h3>Primary Objectives</h3>
                  <input 
                    type="text" 
                    placeholder="Objectives Title"
                    value={aimsGoals.objectivesTitle}
                    onChange={(e) => setAimsGoals({...aimsGoals, objectivesTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Objectives Content"
                    value={aimsGoals.objectivesContent}
                    onChange={(e) => setAimsGoals({...aimsGoals, objectivesContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Strategic Goals</h3>
                  <input 
                    type="text" 
                    placeholder="Goals Title"
                    value={aimsGoals.goalsTitle}
                    onChange={(e) => setAimsGoals({...aimsGoals, goalsTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Goals Content"
                    value={aimsGoals.goalsContent}
                    onChange={(e) => setAimsGoals({...aimsGoals, goalsContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Future Vision</h3>
                  <input 
                    type="text" 
                    placeholder="Vision Title"
                    value={aimsGoals.visionTitle}
                    onChange={(e) => setAimsGoals({...aimsGoals, visionTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Vision Content"
                    value={aimsGoals.visionContent}
                    onChange={(e) => setAimsGoals({...aimsGoals, visionContent: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Success Record Section */}
            <section className="admin-section">
              <h2>Success Record Page</h2>
              <div className="subsection-grid">
                <div className="subsection">
                  <h3>Key Achievements</h3>
                  <input 
                    type="text" 
                    placeholder="Achievements Title"
                    value={successRecord.achievementsTitle}
                    onChange={(e) => setSuccessRecord({...successRecord, achievementsTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Achievements Content"
                    value={successRecord.achievementsContent}
                    onChange={(e) => setSuccessRecord({...successRecord, achievementsContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Research Publications</h3>
                  <input 
                    type="text" 
                    placeholder="Publications Title"
                    value={successRecord.publicationsTitle}
                    onChange={(e) => setSuccessRecord({...successRecord, publicationsTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Publications Content"
                    value={successRecord.publicationsContent}
                    onChange={(e) => setSuccessRecord({...successRecord, publicationsContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Success Stories</h3>
                  <input 
                    type="text" 
                    placeholder="Stories Title"
                    value={successRecord.storiesTitle}
                    onChange={(e) => setSuccessRecord({...successRecord, storiesTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Stories Content"
                    value={successRecord.storiesContent}
                    onChange={(e) => setSuccessRecord({...successRecord, storiesContent: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Visionary Model Section */}
            <section className="admin-section">
              <h2>Visionary Model Page</h2>
              <div className="subsection-grid">
                <div className="subsection">
                  <h3>Modified CRO Approach</h3>
                  <input 
                    type="text" 
                    placeholder="Approach Title"
                    value={visionaryModel.approachTitle}
                    onChange={(e) => setVisionaryModel({...visionaryModel, approachTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Approach Content"
                    value={visionaryModel.approachContent}
                    onChange={(e) => setVisionaryModel({...visionaryModel, approachContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Innovation Framework</h3>
                  <input 
                    type="text" 
                    placeholder="Framework Title"
                    value={visionaryModel.frameworkTitle}
                    onChange={(e) => setVisionaryModel({...visionaryModel, frameworkTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Framework Content"
                    value={visionaryModel.frameworkContent}
                    onChange={(e) => setVisionaryModel({...visionaryModel, frameworkContent: e.target.value})}
                  />
                </div>
                <div className="subsection">
                  <h3>Digital Platform</h3>
                  <input 
                    type="text" 
                    placeholder="Platform Title"
                    value={visionaryModel.platformTitle}
                    onChange={(e) => setVisionaryModel({...visionaryModel, platformTitle: e.target.value})}
                  />
                  <textarea
                    rows="4"
                    placeholder="Platform Content"
                    value={visionaryModel.platformContent}
                    onChange={(e) => setVisionaryModel({...visionaryModel, platformContent: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Join Us Section */}
            <section className="admin-section">
              <h2>Join Us Page</h2>
              <div className="content-editor">
                <h3>Page Title</h3>
                <input 
                  type="text" 
                  placeholder="Join Us Title"
                  value={joinUs.title}
                  onChange={(e) => setJoinUs({...joinUs, title: e.target.value})}
                />
              </div>
              <div className="content-editor">
                <h3>Main Content</h3>
                <textarea
                  rows="6"
                  placeholder="Join Us Content"
                  value={joinUs.content}
                  onChange={(e) => setJoinUs({...joinUs, content: e.target.value})}
                />
              </div>
              <div className="content-editor">
                <h3>Contact Information</h3>
                <textarea
                  rows="4"
                  placeholder="Contact details and instructions"
                  value={joinUs.contactInfo}
                  onChange={(e) => setJoinUs({...joinUs, contactInfo: e.target.value})}
                />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'hero' && (
          <section className="admin-section">
            <h2>Hero Section Content</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Title Line 1</label>
                <input 
                  type="text" 
                  value={heroContent.title1}
                  onChange={(e) => setHeroContent({...heroContent, title1: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Title Line 2</label>
                <input 
                  type="text" 
                  value={heroContent.title2}
                  onChange={(e) => setHeroContent({...heroContent, title2: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <textarea
                rows="3"
                value={heroContent.subtitle}
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
              />
            </div>
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-editor">
                <input 
                  type="text" 
                  placeholder="Number"
                  value={heroContent.stat1Number}
                  onChange={(e) => setHeroContent({...heroContent, stat1Number: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Text"
                  value={heroContent.stat1Text}
                  onChange={(e) => setHeroContent({...heroContent, stat1Text: e.target.value})}
                />
              </div>
              <div className="stat-editor">
                <input 
                  type="text" 
                  placeholder="Number"
                  value={heroContent.stat2Number}
                  onChange={(e) => setHeroContent({...heroContent, stat2Number: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Text"
                  value={heroContent.stat2Text}
                  onChange={(e) => setHeroContent({...heroContent, stat2Text: e.target.value})}
                />
              </div>
              <div className="stat-editor">
                <input 
                  type="text" 
                  placeholder="Number"
                  value={heroContent.stat3Number}
                  onChange={(e) => setHeroContent({...heroContent, stat3Number: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Text"
                  value={heroContent.stat3Text}
                  onChange={(e) => setHeroContent({...heroContent, stat3Text: e.target.value})}
                />
              </div>
              <div className="stat-editor">
                <input 
                  type="text" 
                  placeholder="Number"
                  value={heroContent.stat4Number}
                  onChange={(e) => setHeroContent({...heroContent, stat4Number: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Text"
                  value={heroContent.stat4Text}
                  onChange={(e) => setHeroContent({...heroContent, stat4Text: e.target.value})}
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'home' && (
          <section className="admin-section">
            <h2>Home Page Sections</h2>
            
            <div className="content-editor">
              <h3>Publications Section</h3>
              <input 
                type="text" 
                placeholder="Section Title"
                value={homeSections.publicationsTitle}
                onChange={(e) => setHomeSections({...homeSections, publicationsTitle: e.target.value})}
              />
              <textarea
                rows="4"
                placeholder="Section Text"
                value={homeSections.publicationsText}
                onChange={(e) => setHomeSections({...homeSections, publicationsText: e.target.value})}
              />
            </div>

            <div className="content-editor">
              <h3>Aims & Goals Section</h3>
              <input 
                type="text" 
                placeholder="Section Title"
                value={homeSections.aimsTitle}
                onChange={(e) => setHomeSections({...homeSections, aimsTitle: e.target.value})}
              />
              <textarea
                rows="4"
                placeholder="Section Text"
                value={homeSections.aimsText}
                onChange={(e) => setHomeSections({...homeSections, aimsText: e.target.value})}
              />
            </div>

            <div className="content-editor">
              <h3>Research Impact Section</h3>
              <input 
                type="text" 
                placeholder="Section Title"
                value={homeSections.researchTitle}
                onChange={(e) => setHomeSections({...homeSections, researchTitle: e.target.value})}
              />
              <textarea
                rows="4"
                placeholder="Section Text"
                value={homeSections.researchText}
                onChange={(e) => setHomeSections({...homeSections, researchText: e.target.value})}
              />
            </div>

            <div className="content-editor">
              <h3>Visionary Model Section</h3>
              <input 
                type="text" 
                placeholder="Section Title"
                value={homeSections.visionaryTitle}
                onChange={(e) => setHomeSections({...homeSections, visionaryTitle: e.target.value})}
              />
              <textarea
                rows="4"
                placeholder="Section Text"
                value={homeSections.visionaryText}
                onChange={(e) => setHomeSections({...homeSections, visionaryText: e.target.value})}
              />
            </div>

            <div className="content-editor">
              <h3>Join Us Section</h3>
              <input 
                type="text" 
                placeholder="Section Title"
                value={homeSections.joinUsTitle}
                onChange={(e) => setHomeSections({...homeSections, joinUsTitle: e.target.value})}
              />
              <textarea
                rows="4"
                placeholder="Section Text"
                value={homeSections.joinUsText}
                onChange={(e) => setHomeSections({...homeSections, joinUsText: e.target.value})}
              />
            </div>
          </section>
        )}

        {activeTab === 'publications' && (
          <section className="admin-section">
            <h2>Manage Publications</h2>
            <div className="publications-grid">
              {publications.map((pub) => (
                <div key={pub.id} className="publication-editor">
                  <h4>Publication {pub.id}</h4>
                  <input 
                    type="text" 
                    placeholder="Title"
                    value={pub.title}
                    onChange={(e) => setPublications(prev => prev.map(p => 
                      p.id === pub.id ? {...p, title: e.target.value} : p
                    ))}
                  />
                  <textarea
                    rows="3"
                    placeholder="Description"
                    value={pub.description}
                    onChange={(e) => setPublications(prev => prev.map(p => 
                      p.id === pub.id ? {...p, description: e.target.value} : p
                    ))}
                  />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(pub.id, e)}
                  />
                  {pub.image && (
                    <img src={pub.image} alt={pub.title} style={{width: '100%', marginTop: '10px'}} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="admin-section">
            <h2>Contact Information</h2>
            <div className="content-editor">
              <h3>Email</h3>
              <input 
                type="email" 
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
              />
            </div>
            <div className="content-editor">
              <h3>Phone</h3>
              <input 
                type="text" 
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
              />
            </div>
            <div className="content-editor">
              <h3>Address</h3>
              <textarea
                rows="3"
                value={contactInfo.address}
                onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;
