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

  // Function to get the leader for a specific stat type
  const getLeader = (stats, statType) => {
    return stats
      .filter(stat => stat.statType === statType)
      .reduce((leader, current) => (current.stat > leader.stat ? current : leader), stats[0]);
  };

  // Define all stat types to display
  const statTypes = [
    'COMPLETIONS', 'INT', 'PCT', 'TD', 'YPA', 'YDS', 'ATT', 'CAR', 'LONG',
    'YPC', 'REC', 'YPR', 'YPC', 'TD', 'LONG', 'YDS'
  ];

  // Get leaders for each stat type
  const homeTeamLeaders = statTypes.map(statType => getLeader(playerSeasonStats.filter(stat => stat.team === game.home_team.school), statType));
  const awayTeamLeaders = statTypes.map(statType => getLeader(playerSeasonStats.filter(stat => stat.team === game.away_team.school), statType));

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
            <h3>{game.home_team.school} Leaders</h3>
            <div className="stats-column">
              {homeTeamLeaders.map((leader, index) => (
                leader ? (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{leader.player}</h4>
                    <p>{leader.statType}: {leader.stat}</p>
                  </div>
                ) : (
                  <p key={index}>No leader available for {statTypes[index]}</p>
                )
              ))}
            </div>
          </div>
          <div className="team-stats away-team">
            <h3>{game.away_team.school} Leaders</h3>
            <div className="stats-column">
              {awayTeamLeaders.map((leader, index) => (
                leader ? (
                  <div key={index} className="player-modal-stat-entry">
                    <h4>{leader.player}</h4>
                    <p>{leader.statType}: {leader.stat}</p>
                  </div>
                ) : (
                  <p key={index}>No leader available for {statTypes[index]}</p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsModal;









