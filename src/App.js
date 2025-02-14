import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent';
import SchedulesComponent from './components/SchedulesComponent';
import GamedayGPTComponent from './components/GamedayGPTComponent'; // Import GamedayGPTComponent
import './App.css';

// Icons for buttons
import { FaHome, FaChartBar, FaUsers, FaFootballBall, FaCalendarAlt, FaRobot } from 'react-icons/fa';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Game Day Analytics</h1>
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={toggleMenu}>
              <FaHome /> Home
            </Link>
            <Link to="/metrics" className="nav-button" onClick={toggleMenu}>
              <FaChartBar /> Metrics
            </Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}>
              <FaUsers /> Teams
            </Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}>
              <FaFootballBall /> Games
            </Link>
            <Link to="/schedules" className="nav-button" onClick={toggleMenu}>
              <FaCalendarAlt /> Schedules
            </Link>
            <Link to="/gamedaygpt" className="nav-button gamedaygpt-button" onClick={toggleMenu}>
              <FaRobot /> GameDay GPT
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/teams" element={<TeamsComponent year={2023} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/metrics" element={<MetricsComponent />} />
        <Route path="/schedules" element={<SchedulesComponent />} />
        <Route path="/gamedaygpt" element={<GamedayGPTComponent />} />
      </Routes>
    </Router>
  );
}

export default App;








































