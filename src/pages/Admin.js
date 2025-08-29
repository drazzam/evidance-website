import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  
  // All your existing state variables remain the same
  const [whoWeAre, setWhoWeAre] = useState({
    storyTitle: 'Our Story',
    storyContent: '',
    teamTitle: 'Our Team',
    teamContent: '',
    valuesTitle: 'Our Values',
    valuesContent: ''
  });

  const [aimsGoals, setAimsGoals] = useState({
    objectivesTitle: 'Primary Objectives',
    objectivesContent: '',
    goalsTitle: 'Strategic Goals',
    goalsContent: '',
    visionTitle: 'Future Vision',
    visionContent: ''
  });

  const [successRecord, setSuccessRecord] = useState({
    achievementsTitle: 'Key Achievements',
    achievementsContent: '',
    publicationsTitle: 'Research Publications',
    publicationsContent: '',
    storiesTitle: 'Success Stories',
    storiesContent: ''
  });

  const [visionaryModel, setVisionaryModel] = useState({
    approachTitle: 'Modified CRO Approach',
    approachContent: '',
    frameworkTitle: 'Innovation Framework',
    frameworkContent: '',
    platformTitle: 'Digital Platform',
    platformContent: ''
  });

  const [joinUs, setJoinUs] = useState({
    title: 'Join Our Research Community',
    content: '',
    contactInfo: ''
  });

  const [heroContent, setHeroContent] = useState({
    title1: 'Advancing Healthcare Through',
    title2: 'Innovative Research',
    subtitle: '',
    stat1Number: '50+',
    stat1Text: 'Research Projects',
    stat2Number: '250+',
    stat2Text: 'Trained Researchers',
    stat3Number: '25+',
    stat3Text: 'Published Papers',
    stat4Number: '15+',
    stat4Text: 'Accepted Papers'
  });

  const [homeSections, setHomeSections] = useState({
    publicationsTitle: 'Recent Publications',
    publicationsText: '',
    aimsTitle: 'What Are Our Aims and Goals?',
    aimsText: '',
    researchTitle: 'Research Impact & Innovation',
    researchText: '',
    visionaryTitle: 'Our Visionary Model',
    visionaryText: '',
    joinUsTitle: 'Join Us!',
    joinUsText: ''
  });

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
      // Load from Firebase
      const whoWeAreDoc = await getDoc(doc(db, 'content', 'whoWeAre'));
      if (whoWeAreDoc.exists()) setWhoWeAre(whoWeAreDoc.data());

      const aimsGoalsDoc = await getDoc(doc(db, 'content', 'aimsGoals'));
      if (aimsGoalsDoc.exists()) setAimsGoals(aimsGoalsDoc.data());

      const successRecordDoc = await getDoc(doc(db, 'content', 'successRecord'));
      if (successRecordDoc.exists()) setSuccessRecord(successRecordDoc.data());

      const visionaryModelDoc = await getDoc(doc(db, 'content', 'visionaryModel'));
      if (visionaryModelDoc.exists()) setVisionaryModel(visionaryModelDoc.data());

      const joinUsDoc = await getDoc(doc(db, 'content', 'joinUs'));
      if (joinUsDoc.exists()) setJoinUs(joinUsDoc.data());

      const heroDoc = await getDoc(doc(db, 'content', 'heroContent'));
      if (heroDoc.exists()) setHeroContent(heroDoc.data());

      const sectionsDoc = await getDoc(doc(db, 'content', 'homeSections'));
      if (sectionsDoc.exists()) setHomeSections(sectionsDoc.data());

      const imagesDoc = await getDoc(doc(db, 'content', 'images'));
      if (imagesDoc.exists()) setImages(imagesDoc.data());
    } catch (error) {
      console.error('Error loading content:', error);
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

  const handleImageUpload = async (category, index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
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
      // Save all content to Firebase
      await setDoc(doc(db, 'content', 'whoWeAre'), whoWeAre);
      await setDoc(doc(db, 'content', 'aimsGoals'), aimsGoals);
      await setDoc(doc(db, 'content', 'successRecord'), successRecord);
      await setDoc(doc(db, 'content', 'visionaryModel'), visionaryModel);
      await setDoc(doc(db, 'content', 'joinUs'), joinUs);
      await setDoc(doc(db, 'content', 'heroContent'), heroContent);
      await setDoc(doc(db, 'content', 'homeSections'), homeSections);
      await setDoc(doc(db, 'content', 'images'), images);
      
      alert('All changes saved globally! Updates are now live for all devices.');
    } catch (error) {
      alert('Error saving changes: ' + error.message);
      console.error('Save error:', error);
    }
    setLoading(false);
  };

  // Keep all your existing JSX exactly the same, just add loading indicator
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

  // Rest of your component JSX remains exactly the same, just add loading state
  return (
    <div className="admin-panel">
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '18px'
          }}>
            Loading...
          </div>
        </div>
      )}
      {/* Keep all your existing admin panel JSX here */}
    </div>
  );
};

export default Admin;
