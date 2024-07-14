// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import HomeComponent from './components/HomeComponent';
import MetricsComponent from './components/MetricsComponent';
import SchedulesComponent from './components/SchedulesComponent'; // Import SchedulesComponent
import logo from './assets/Game Day.png'; // Updated path to the logo
import './App.css'; // Ensure this path is correct
import { FaHome, FaChartBar, FaUsers, FaGamepad, FaCalendarAlt } from 'react-icons/fa'; // Import icons

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-title">
          <img src={logo} alt="GDA Logo" className="navbar-logo" />
          Game Day Analytics
        </div>
        <div className="navbar-links">
          <div className="btn-group">
            <Link to="/" className="nav-button" onClick={toggleMenu}><FaHome /> Home</Link>
            <Link to="/metrics" className="nav-button" onClick={toggleMenu}><FaChartBar /> Metrics</Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}><FaUsers /> Teams</Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}><FaGamepad /> Games</Link>
            <Link to="/schedules" className="nav-button" onClick={toggleMenu}><FaCalendarAlt /> Schedules</Link> {/* Added Schedules link */}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/teams" element={<TeamsComponent year={2023} />} />
        <Route path="/games" element={<UpcomingGames />} />
        <Route path="/metrics" element={<MetricsComponent />} />
        <Route path="/schedules" element={<SchedulesComponent />} /> {/* Added Schedules route */}
      </Routes>
    </Router>
  );
}

export default App;





































