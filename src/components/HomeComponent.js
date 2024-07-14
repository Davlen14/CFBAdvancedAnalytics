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
      <section id="about" className="content-section two-column">
        <div className="text-content">
          <h2>About Us</h2>
          <p>Game Day Analytics is your go-to platform for advanced college football analytics. Our tools and metrics are designed to provide deep insights into team and player performances, helping you make informed betting decisions.</p>
        </div>
        <div className="image-content">
          <img src="path_to_your_image" alt="About Us" className="about-image" />
        </div>
      </section>
      <section id="features" className="content-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <p>Comprehensive player and team statistics</p>
          </div>
          <div className="feature-card">
            <p>Game predictions based on a trained analytical model</p>
          </div>
          <div className="feature-card">
            <p>Detailed box scores and performance metrics</p>
          </div>
          <div className="feature-card">
            <p>Up-to-date schedules and upcoming game information</p>
          </div>
          <div className="feature-card">
            <p>Interactive data visualizations and charts</p>
          </div>
        </div>
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

