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

  // Split stats into categories
  const getCategorizedStats = (stats) => {
    return {
      passing: stats.filter(stat => ['COMPLETIONS', 'PASSING_TDS', 'PASSING_YARDS', 'PCT'].includes(stat.statType)),
      rushing: stats.filter(stat => ['RUSHING_ATTEMPTS', 'RUSHING_TDS', 'RUSHING_YARDS', 'YPC'].includes(stat.statType)),
      receiving: stats.filter(stat => ['RECEPTIONS', 'RECEIVING_TDS', 'RECEIVING_YARDS', 'YPR'].includes(stat.statType)),
    };
  };

  const homeTeamStats = getCategorizedStats(playerSeasonStats.filter(stat => stat.team === game.home_team.school));
  const awayTeamStats = getCategorizedStats(playerSeasonStats.filter(stat => stat.team === game.away_team.school));

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
            <h3>{game.home_team.school} Stats</h3>
            <div className="stats-section">
              <h4>Passing</h4>
              <div className="stats-column">
                {homeTeamStats.passing.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              <div className="stats-column">
                {homeTeamStats.rushing.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              <div className="stats-column">
                {homeTeamStats.receiving.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="team-stats away-team">
            <h3>{game.away_team.school} Stats</h3>
            <div className="stats-section">
              <h4>Passing</h4>
              <div className="stats-column">
                {awayTeamStats.passing.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              <div className="stats-column">
                {awayTeamStats.rushing.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              <div className="stats-column">
                {awayTeamStats.receiving.map((stat, index) => (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{stat.player}</h4>
                    <p>{stat.statType}: {stat.stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;









