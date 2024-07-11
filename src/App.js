import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent'; // Import MetricsComponent
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import logo from '/Users/davlenswain/my-betting-bot/public/Game Day.png'; // Correct path

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null); // State for selected team

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="GameDay Logo" className="logo" />
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={toggleMenu}>Home</Link>
            <Link to="/metrics" className="nav-button" onClick={toggleMenu}>Metrics</Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}>Teams</Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}>Games</Link>
            <button className="theme-toggle-button" onClick={ThemeToggle}>
              <FontAwesomeIcon icon={faMoon} />
            </button>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/teams" element={<TeamsComponent year={2023} setSelectedTeam={setSelectedTeam} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/metrics" element={<MetricsComponent selectedTeam={selectedTeam} />} />
      </Routes>
    </Router>
  );
}

export default App;
































