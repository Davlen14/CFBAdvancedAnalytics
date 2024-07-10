// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as ProjectionsIcon } from './icons/projections.svg';
import { ReactComponent as TeamsIcon } from './icons/teams.svg';
import { ReactComponent as GamesIcon } from './icons/games.svg';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <div className="title">
            <img src="/logo.png" alt="CFB Data Vault Logo" />
            NCAAF
          </div>
          <button className="hamburger-menu" onClick={toggleMenu}>
            &#9776;
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={toggleMenu}>
              <HomeIcon /> Home
            </Link>
            <Link to="/projections" className="nav-button" onClick={toggleMenu}>
              <ProjectionsIcon /> Projections
            </Link>
            <Link to="/teams" className="nav-button" onClick={toggleMenu}>
              <TeamsIcon /> Teams
            </Link>
            <Link to="/games" className="nav-button" onClick={toggleMenu}>
              <GamesIcon /> Games
            </Link>
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

























