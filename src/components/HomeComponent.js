// src/components/HomeComponent.js
import React from 'react';
import '../App.css';

function HomeComponent() {
  return (
    <div className="home">
      <section className="hero-section">
        <h2>Welcome to Sports Betting Bot</h2>
        <p>Explore teams, players, and statistics of college football.</p>
      </section>
      <section id="statistics">
        <h2>Statistics</h2>
        <p>Here you can include some data visualizations or interesting statistics.</p>
      </section>
      <section id="news">
        <h2>Latest News</h2>
        <p>Include latest news articles or updates related to college football.</p>
      </section>
    </div>
  );
}

export default HomeComponent;