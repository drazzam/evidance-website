import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import AimsGoals from './pages/AimsGoals';
import SuccessRecord from './pages/SuccessRecord';
import VisionaryModel from './pages/VisionaryModel';
import JoinUs from './pages/JoinUs';
import Publications from './pages/Publications';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/aims-goals" element={<AimsGoals />} />
            <Route path="/success-record" element={<SuccessRecord />} />
            <Route path="/visionary-model" element={<VisionaryModel />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/admin-panel-2024" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
