// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <div className="title">NCAAF</div>
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/projections" className="nav-button">Projections</Link>
            <Link to="/teams" className="nav-button">Teams</Link>
            <Link to="/games" className="nav-button">Games</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/teams" element={<TeamsComponent year={2023} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/projections" element={<div>Projections Page Under Construction</div>} />
      </Routes>
    </Router>
  );
}

export default App;






















