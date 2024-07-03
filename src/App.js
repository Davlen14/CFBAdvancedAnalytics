// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsComponent from './components/TeamsComponent';
import UpcomingGames from './components/UpcomingGames';
import ThemeToggle from './components/ThemeToggle';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <Router>
      <div className="navbar">
        <div className="navbar-content">
          <div className="title">NCAAF</div>
          <div className="nav-buttons">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/projections" className="nav-button">Projections</Link>
            <Link to="/teams" className="nav-button">Teams</Link>
            <Link to="/games" className="nav-button">Games</Link>
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





















