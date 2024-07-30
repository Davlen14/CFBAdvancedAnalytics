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

  // Split stats into home and away team arrays
  const homeTeamStats = playerSeasonStats.filter(stat => stat.team === game.home_team.school);
  const awayTeamStats = playerSeasonStats.filter(stat => stat.team === game.away_team.school);

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
          <div className="team-stats">
            <h3>{game.home_team.school}</h3>
            {homeTeamStats.length > 0 ? (
              homeTeamStats.map((stat, index) => (
                <div key={index} className="player-modal-stat-entry">
                  <h3>{stat.player}</h3>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))
            ) : (
              <p>No player stats available.</p>
            )}
          </div>
          <div className="team-stats">
            <h3>{game.away_team.school}</h3>
            {awayTeamStats.length > 0 ? (
              awayTeamStats.map((stat, index) => (
                <div key={index} className="player-modal-stat-entry">
                  <h3>{stat.player}</h3>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              ))
            ) : (
              <p>No player stats available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;





