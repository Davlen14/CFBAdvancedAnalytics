import React from 'react';
import '../App.css';

const PlayerStatsModal = ({ game, playerSeasonStats, closeModal }) => {
  return (
    <div className="player-modal">
      <div className="player-modal-content">
        <span className="player-modal-close" onClick={closeModal}>&times;</span>
        <h2>Player Season Stats for {game.home_team.school} vs {game.away_team.school}</h2>
        <div className="player-modal-stats-container">
          {playerSeasonStats.length > 0 ? (
            playerSeasonStats.map((stat, index) => (
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
  );
};

export default PlayerStatsModal;

