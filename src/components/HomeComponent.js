import React from 'react';
import Slider from 'react-slick';
import '../App.css';
import aboutUsImage from '../assets/about.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
          <img src={aboutUsImage} alt="About Us" className="about-image" />
        </div>
      </section>
      <section id="features" className="content-section">
        <h2>Our Features</h2>
        <Slider {...settings}>
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
        </Slider>
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


