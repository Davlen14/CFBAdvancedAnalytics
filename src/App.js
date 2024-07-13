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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
            <Link to="/schedules" className="nav-button" onClick={toggleMenu}>Schedules</Link> {/* Added Schedules link */}
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




































