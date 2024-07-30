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

  return (
    <div className="player-modal">
      <div className="player-modal-content">
        <span className="player-modal-close" onClick={closeModal}>&times;</span>
        <h2>Player Season Stats for {game.home_team.school} vs {game.away_team.school}</h2>
        <div className="player-modal-stats-container">
          {playerSeasonStats.length > 0 ? (
            playerSeasonStats.map((stat, index) => (
              <div key={index} className="player-modal-stat-entry">
                <img
                  src={getTeamLogo(stat.team)}
                  alt={`${stat.team} logo`}
                  className="player-modal-team-logo"
                />
                <div className="player-stat-info">
                  <h3>{stat.player}</h3>
                  <p>{stat.statType}: {stat.stat}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No player stats available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;



