import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [content, setContent] = useState({
    whoWeAre: '',
    aimsGoals: '',
    successRecord: '',
    visionaryModel: ''
  });
  const [images, setImages] = useState({
    publications: Array(5).fill(''),
    published: Array(10).fill(''),
    accepted: Array(4).fill(''),
    submitted: Array(5).fill('')
  });

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const loadContent = () => {
    // Load existing content from localStorage
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }

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
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'AdminCNS12**') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadContent();
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

  const saveChanges = () => {
    // Save content
    localStorage.setItem('pageContent', JSON.stringify(content));
    
    // Save publication images for home carousel
    localStorage.setItem('publicationImages', JSON.stringify(images.publications));
    
    // Save publications data for publications page
    localStorage.setItem('publicationsData', JSON.stringify({
      published: images.published,
      accepted: images.accepted,
      submitted: images.submitted
    }));
    
    alert('Changes saved successfully! Refresh the website to see updates.');
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
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>Page Content Management</h2>
          
          <div className="content-editor">
            <h3>Who We Are Page</h3>
            <textarea
              value={content.whoWeAre}
              onChange={(e) => handleContentChange('whoWeAre', e.target.value)}
              placeholder="Enter content for Who We Are page..."
              rows="6"
            />
          </div>

          <div className="content-editor">
            <h3>Aims & Goals Page</h3>
            <textarea
              value={content.aimsGoals}
              onChange={(e) => handleContentChange('aimsGoals', e.target.value)}
              placeholder="Enter content for Aims & Goals page..."
              rows="6"
            />
          </div>

          <div className="content-editor">
            <h3>Success Record Page</h3>
            <textarea
              value={content.successRecord}
              onChange={(e) => handleContentChange('successRecord', e.target.value)}
              placeholder="Enter content for Success Record page..."
              rows="6"
            />
          </div>

          <div className="content-editor">
            <h3>Visionary Model Page</h3>
            <textarea
              value={content.visionaryModel}
              onChange={(e) => handleContentChange('visionaryModel', e.target.value)}
              placeholder="Enter content for Visionary Model page..."
              rows="6"
            />
          </div>
        </section>

        <section className="admin-section">
          <h2>Publication Images Management</h2>
          
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

        <div className="admin-actions">
          <button onClick={saveChanges} className="btn btn-primary btn-large">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
