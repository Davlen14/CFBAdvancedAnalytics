import React from 'react';
import Slider from 'react-slick';
import '../App.css';
import aboutUsImage from '../assets/about.png';
import sandersImage from '../assets/Sanders.png'; // Deion Sanders image
import texImage from '../assets/Tex.png'; // Texas image
import osuImage from '../assets/OSU.png'; // Ohio State image
import twitterLogo from '../assets/twitter.png'; // Twitter logo
import instagramLogo from '../assets/instagram.png'; // Instagram logo
import facebookLogo from '../assets/facebook.png'; // Facebook logo
import googlePlayLogo from '../assets/google-play.png'; // Google Play logo
import appStoreLogo from '../assets/app-store.png'; // App Store logo
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
      <section id="news" className="content-section">
        <h2>Latest News</h2>
        <div className="home-news-container">
          <div className="home-news-card">
            <img src={sandersImage} alt="Deion Sanders" className="home-news-image" />
            <p><a href="https://glorycolorado.com/posts/deion-sanders-speaks-out-colorado-football-team-expectations-big-12-media-days">Deion Sanders speaks out on Colorado football team expectations at Big 12 Media Days</a></p>
          </div>
          <div className="home-news-card">
            <img src={texImage} alt="Texas SEC" className="home-news-image" />
            <p><a href="https://www.on3.com/teams/texas-longhorns/news/sec-media-days-storylines-former-southwest-conference-rivals-get-to-welcome-texas-to-the-sec">SEC Media Days storylines: Former Southwest Conference rivals get to welcome Texas to the SEC</a></p>
          </div>
          <div className="home-news-card">
            <img src={osuImage} alt="Ohio State Quarterback" className="home-news-image" />
            <p><a href="https://www.elevenwarriors.com/ohio-state-football/2024/07/147841/ohio-state-quarterback-will-howard-feeling-so-much-more-comfortable-after-six-months-with-the-buckeyes">Ohio State quarterback Will Howard feeling so much more comfortable after six months with the Buckeyes</a></p>
          </div>
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
      <footer className="footer-container">
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Support</a>
        </div>
        <div className="footer-socials">
          <a href="https://twitter.com"><img src={twitterLogo} alt="Twitter" /></a>
          <a href="https://instagram.com"><img src={instagramLogo} alt="Instagram" /></a>
          <a href="https://facebook.com"><img src={facebookLogo} alt="Facebook" /></a>
          <a href="https://play.google.com"><img src={googlePlayLogo} alt="Google Play" /></a>
          <a href="https://apps.apple.com"><img src={appStoreLogo} alt="App Store" /></a>
        </div>
        <div className="footer-disclaimer">
          <p>© 2024 Game Day Analytics</p>
          <p>Disclaimer: Game Day Analytics is not affiliated with or endorsed by the NCAA, any university, or any other sports league. This is not a gambling app and does not accept or place wagers of any kind.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeComponent;




