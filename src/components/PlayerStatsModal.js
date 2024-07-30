import React from 'react';
import '../App.css';

const PlayerStatsModal = ({ game, playerSeasonStats, closeModal }) => {
  // Function to get the team logo based on the team name
  const getTeamLogo = (teamName) => {
    const teamLogosMap = {
      [game.home_team.school]: game.homeTeamLogo,
      [game.away_team.school]: game.awayTeamLogo,
    };
    return teamLogosMap[teamName];
  };

  // Split stats into categories and team arrays
  const categorizeStats = (stats) => {
    const categories = { passing: [], rushing: [], receiving: [] };

    stats.forEach(stat => {
      switch (stat.category) {
        case 'passing':
          categories.passing.push(stat);
          break;
        case 'rushing':
          categories.rushing.push(stat);
          break;
        case 'receiving':
          categories.receiving.push(stat);
          break;
        default:
          break;
      }
    });

    return categories;
  };

  const homeTeamStats = categorizeStats(playerSeasonStats.filter(stat => stat.team === game.home_team.school));
  const awayTeamStats = categorizeStats(playerSeasonStats.filter(stat => stat.team === game.away_team.school));

  return (
    <div className="player-modal">
      <div className="player-modal-content">
        <span className="player-modal-close" onClick={closeModal}>&times;</span>
        <div className="modal-header">
          <div className="team-header">
            <img src={getTeamLogo(game.home_team.school)} alt={`${game.home_team.school} logo`} className="team-logo" />
            <h2>{game.home_team.school}</h2>
          </div>
          <div className="separator">
            <h2>vs</h2>
          </div>
          <div className="team-header">
            <img src={getTeamLogo(game.away_team.school)} alt={`${game.away_team.school} logo`} className="team-logo" />
            <h2>{game.away_team.school}</h2>
          </div>
        </div>
        <div className="player-modal-stats-container">
          <div className="team-stats home-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {homeTeamStats.passing.length > 0 ? (
                homeTeamStats.passing.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {homeTeamStats.rushing.length > 0 ? (
                homeTeamStats.rushing.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {homeTeamStats.receiving.length > 0 ? (
                homeTeamStats.receiving.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No receiving stats available.</p>
              )}
            </div>
          </div>
          <div className="team-stats away-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {awayTeamStats.passing.length > 0 ? (
                awayTeamStats.passing.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {awayTeamStats.rushing.length > 0 ? (
                awayTeamStats.rushing.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {awayTeamStats.receiving.length > 0 ? (
                awayTeamStats.receiving.map((stat, index) => (
                  <div key={index} className="stat-box">
                    <p><strong>{stat.player}</strong></p>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))
              ) : (
                <p>No receiving stats available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;











