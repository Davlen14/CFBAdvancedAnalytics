import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent'; // Import the MetricsComponent

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null); // State to hold the selected team

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team); // Update the selected team
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
        <Route path="/teams" element={<TeamsComponent onTeamSelect={handleTeamSelect} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/metrics" element={<MetricsComponent selectedTeam={selectedTeam} />} />
      </Routes>
    </Router>
  );
}

export default App;





























