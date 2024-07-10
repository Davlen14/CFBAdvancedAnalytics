import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <div className="title" style={{ textAlign: menuOpen ? 'center' : 'left' }}>NCAAF</div>
          <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-button" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/projections" className="nav-button" onClick={() => setMenuOpen(false)}>Projections</Link>
            <Link to="/teams" className="nav-button" onClick={() => setMenuOpen(false)}>Teams</Link>
            <Link to="/games" className="nav-button" onClick={() => setMenuOpen(false)}>Games</Link>
          </div>
        </div>
        <ThemeToggle />
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























