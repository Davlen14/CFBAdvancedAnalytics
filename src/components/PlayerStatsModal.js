import React from 'react';
import '../App.css';

const PlayerStatsModal = ({ game, playerSeasonStats, closeModal }) => {
  const getTeamLogo = (teamName) => {
    const teamLogosMap = {
      [game.home_team.school]: game.homeTeamLogo,
      [game.away_team.school]: game.awayTeamLogo,
    };
    return teamLogosMap[teamName];
  };

  // Function to get top performer in a category
  const getTopPerformers = (stats, category) => {
    if (stats.length === 0) return [];
    // Find the player with the max value for the given category
    const topPlayer = stats.reduce((top, stat) => (stat[category] > top[category] ? stat : top), stats[0]);
    return [topPlayer];
  };

  // Categorize stats by team and type
  const categorizeStats = (stats) => {
    const categories = { passing: [], rushing: [], receiving: [] };
    stats.forEach(stat => {
      if (stat.category === 'passing') categories.passing.push(stat);
      if (stat.category === 'rushing') categories.rushing.push(stat);
      if (stat.category === 'receiving') categories.receiving.push(stat);
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
              {getTopPerformers(homeTeamStats.passing, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {getTopPerformers(homeTeamStats.rushing, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {getTopPerformers(homeTeamStats.receiving, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="team-stats away-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {getTopPerformers(awayTeamStats.passing, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {getTopPerformers(awayTeamStats.rushing, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {getTopPerformers(awayTeamStats.receiving, 'yards').map((stat, index) => (
                <div key={index} className="stat-box">
                  <p><strong>{stat.player}</strong></p>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;












