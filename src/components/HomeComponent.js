import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../App.css';
import aboutUsImage from '../assets/about.png';
import sandersImage from '../assets/Sanders.png';
import texImage from '../assets/Tex.png';
import osuImage from '../assets/OSU.png';
import twitterLogo from '../assets/twitter.png';
import instagramLogo from '../assets/instagram.png';
import facebookLogo from '../assets/facebook.png';
import googlePlayLogo from '../assets/google-play.png';
import appStoreLogo from '../assets/app-store.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getFBSTeams, getSpRatings, getUpcomingGamesForWeek, getGamesMedia } from '../services/CollegeFootballApi';
import WeekFilter from './WeekFilter';

function HomeComponent() {
  const [topTeams, setTopTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTeams = async () => {
      try {
        const spRatings = await getSpRatings(2023);
        const teams = await getFBSTeams();
        const teamsMap = teams.reduce((acc, team) => {
          acc[team.school] = team;
          return acc;
        }, {});

        const sortedTeams = spRatings
          .filter((team) => team.team !== 'nationalAverages')
          .sort((a, b) => a.ranking - b.ranking)
          .slice(0, 10);

        const enrichedTeams = sortedTeams.map(team => ({
          ...team,
          logo: teamsMap[team.team]?.logos[0] || null,
        }));

        setTopTeams(enrichedTeams);
      } catch (error) {
        console.error('Error fetching top teams:', error);
      }
    };

    const fetchGamesAndLogos = async () => {
      try {
        const [gamesData, fbsTeams, gamesMediaData] = await Promise.all([
          getUpcomingGamesForWeek(currentWeek),
          getFBSTeams(),
          getGamesMedia()
        ]);

        const teamLogosMap = fbsTeams.reduce((acc, team) => {
          acc[team.id] = team.logos[0].replace('http://', 'https://');
          return acc;
        }, {});

        const gamesMediaMap = gamesMediaData.reduce((acc, media) => {
          acc[media.id] = media;
          return acc;
        }, {});

        const gamesWithDetails = gamesData.map((game) => {
          const mediaInfo = gamesMediaMap[game.id];
          return {
            id: game.id,
            homeTeamLogo: teamLogosMap[game.home_id],
            awayTeamLogo: teamLogosMap[game.away_id],
            homeTeam: game.home_team,
            awayTeam: game.away_team,
            startDate: game.start_date,
            outlet: mediaInfo ? mediaInfo.outlet : 'Unknown Outlet',
          };
        }).filter(game => game.homeTeamLogo && game.awayTeamLogo);

        setGames(gamesWithDetails);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTeams();
    fetchGamesAndLogos();
  }, [currentWeek]);

  const handleWeekChange = (week) => {
    setCurrentWeek(week);
  };

  const settings = {
    dots: false,  // Removed dots for a cleaner look
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
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
  {/* Week Filter and Scoreboard Section */}
  <section className="week-filter-section">
    <div className="week-filter">
      <WeekFilter currentWeek={currentWeek} onWeekChange={handleWeekChange} />
    </div>
    <div className="scoreboard-section">
      {loading && <p>Loading games...</p>}
      {error && <p>Error loading games: {error.toString()}</p>}
      <div className="scoreboard-container">
        {games.map((game) => (
          <div key={game.id} className="scoreboard-item">
            <div className="team-logos">
              <div className="team">
                <img src={game.homeTeamLogo} alt="Home Team Logo" />
                <div className="team-names">{game.homeTeam ? game.homeTeam.school : 'Home Team'}</div>
              </div>
              <div className="team">
                <img src={game.awayTeamLogo} alt="Away Team Logo" />
                <div className="team-names">{game.awayTeam ? game.awayTeam.school : 'Away Team'}</div>
              </div>
            </div>
            <div className="game-info">
              <span>{new Date(game.startDate).toLocaleTimeString()}</span>
              <span>{game.outlet}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
      
      {/* Hero Section */}
      <section className="hero-section">
        <h2>Welcome to Game Day Analytics</h2>
        <p>Unleash the power of data to predict college football outcomes and enhance your betting strategy.</p>
      </section>

      {/* Top 10 Teams Section */}
      <section id="top-teams" className="content-section">
        <h2>Top 10 Teams</h2>
        <ul className="top-teams-list">
          {topTeams.map((team) => (
            <li key={team.team} className="top-team-item">
              <img src={team.logo} alt={`${team.team} logo`} className="team-logo" />
              <div className="team-info">
                <span className="team-name">{team.team}</span>
                <div className="team-stats">
                  <span className="team-ranking">Overall Rank: {team.ranking}</span>
                  <span className="team-offense">Offense Rank: {team.offense.ranking}</span>
                  <span className="team-defense">Defense Rank: {team.defense.ranking}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* About Us Section */}
      <section id="about" className="content-section two-column">
        <div className="text-content">
          <h2>About Us</h2>
          <p>Game Day Analytics is your go-to platform for advanced college football analytics. Our tools and metrics are designed to provide deep insights into team and player performances, helping you make informed betting decisions.</p>
        </div>
        <div className="image-content">
          <img src={aboutUsImage} alt="About Us" className="about-image" />
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="content-section">
        <h2>Latest News</h2>
        <div className="home-news-container">
          <div className="home-news-card">
            <img src={sandersImage} alt="Deion Sanders" className="home-news-image" />
            <p className="home-news-title">Deion Sanders speaks out on Colorado football team expectations at Big 12 Media Days</p>
            <a href="https://glorycolorado.com/posts/deion-sanders-speaks-out-colorado-football-team-expectations-big-12-media-days" className="news-link-button">Read more</a>
          </div>
          <div className="home-news-card">
            <img src={texImage} alt="Texas SEC" className="home-news-image" />
            <p className="home-news-title">SEC Media Days storylines: Former Southwest Conference rivals get to welcome Texas to the SEC</p>
            <a href="https://www.on3.com/teams/texas-longhorns/news/sec-media-days-storylines-former-southwest-conference-rivals-get-to-welcome-texas-to-the-sec" className="news-link-button">Read more</a>
          </div>
          <div className="home-news-card">
            <img src={osuImage} alt="Ohio State Quarterback" className="home-news-image" />
            <p className="home-news-title">Ohio State quarterback Will Howard feeling so much more comfortable after six months with the Buckeyes</p>
            <a href="https://www.elevenwarriors.com/ohio-state-football/2024/07/147841/ohio-state-quarterback-will-howard-feeling-so-much-more-comfortable-after-six-months-with-the-buckeyes" className="news-link-button">Read more</a>
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
          <a href="https://www.instagram.com/gdanalytics?igsh=MXI0bTNybDBxcWIzNQ%3D%3D&utm_source=qr"><img src={instagramLogo} alt="Instagram" /></a>
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







