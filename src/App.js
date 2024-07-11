import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent';
import logo from './assets/Game Day.png'; // Updated path to the logo
import './App.css'; // Ensure this path is correct

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="GDA Logo" className="logo" />
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={toggleMenu}>Home</Link>
            <Link to="/metrics" className="nav-button" onClick={toggleMenu}>Metrics</Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}>Teams</Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}>Games</Link>
            <ThemeToggle toggleTheme={toggleTheme} />
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






























