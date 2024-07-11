// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent'; // Import the new MetricsComponent

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <div className="title">NCAAF</div>
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={toggleMenu}>Home</Link>
            <Link to="/metrics" className="nav-button" onClick={toggleMenu}>Metrics</Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}>Teams</Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}>Games</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/teams" element={<TeamsComponent year={2023} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/metrics" element={<MetricsComponent />} /> {/* Add route for MetricsComponent */}
      </Routes>
    </Router>
  );
}

export default App;

























