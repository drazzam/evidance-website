import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import AimsGoals from './pages/AimsGoals';
import SuccessRecord from './pages/SuccessRecord';
import VisionaryModel from './pages/VisionaryModel';
import JoinUs from './pages/JoinUs';

function App() {
  return (
    <Router basename="/evidance-website">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/aims-goals" element={<AimsGoals />} />
          <Route path="/success-record" element={<SuccessRecord />} />
          <Route path="/visionary-model" element={<VisionaryModel />} />
          <Route path="/join-us" element={<JoinUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
