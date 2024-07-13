// src/components/HomeComponent.js
import React from 'react';
import '../App.css';

function HomeComponent() {
  return (
    <div className="home">
      <section className="hero-section">
        <h2>Welcome to Game Day Analytics</h2>
        <p>Unleash the power of data to predict college football outcomes and enhance your betting strategy.</p>
      </section>
      <section id="about" className="content-section">
        <h2>About Us</h2>
        <p>Game Day Analytics is your go-to platform for advanced college football analytics. Our tools and metrics are designed to provide deep insights into team and player performances, helping you make informed betting decisions.</p>
      </section>
      <section id="features" className="content-section">
        <h2>Our Features</h2>
        <ul>
          <li>Comprehensive player and team statistics</li>
          <li>Game predictions based on a trained analytical model</li>
          <li>Detailed box scores and performance metrics</li>
          <li>Up-to-date schedules and upcoming game information</li>
          <li>Interactive data visualizations and charts</li>
        </ul>
      </section>
      <section id="statistics" className="content-section">
        <h2>Statistics</h2>
        <p>Dive into our extensive database of college football statistics, with visualizations and analysis to help you spot trends and make data-driven decisions.</p>
      </section>
      <section id="how-it-works" className="content-section">
        <h2>How It Works</h2>
        <p>Our platform uses a trained analytical model that leverages historical data and advanced metrics to predict game outcomes and player performances. By understanding the key factors that influence games, you can place smarter bets and improve your chances of success.</p>
      </section>
      <section id="news" className="content-section">
        <h2>Latest News</h2>
        <p>Stay updated with the latest news and developments in college football. From game highlights to player updates, we bring you the most relevant information to keep you informed.</p>
      </section>
    </div>
  );
}

export default HomeComponent;
