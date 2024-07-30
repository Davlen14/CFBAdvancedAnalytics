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

// Function to get the leader for a specific stat type, ensuring unique entries
const getUniqueLeaders = (stats, statTypes) => {
    const leaders = {};
    statTypes.forEach(statType => {
      const filteredStats = stats.filter(stat => stat.statType === statType);
      if (filteredStats.length > 0) {
        const leader = filteredStats.reduce((max, stat) => (stat.stat > max.stat ? stat : max), filteredStats[0]);
        if (!leaders[statType] || leader.stat !== leaders[statType].stat) {
          leaders[statType] = leader;
        }
      }
    });
    return Object.values(leaders);
  };
  

  const statTypes = [
    'PASS_COMPLETIONS', 'PASS_INT', 'PASS_PCT', 'PASS_TD', 'PASS_YPA', 'PASS_YDS',
    'RUSH_ATT', 'RUSH_CAR', 'RUSH_LONG', 'RUSH_YPC', 'RUSH_YDS', 'RUSH_TD',
    'REC', 'REC_YPR', 'REC_YDS', 'REC_TD', 'LONG', 'YDS'
  ];

  // Get leaders for each stat type without repetition
const homeTeamLeaders = getUniqueLeaders(playerSeasonStats.filter(stat => stat.team === game.home_team.school), statTypes);
const awayTeamLeaders = getUniqueLeaders(playerSeasonStats.filter(stat => stat.team === game.away_team.school), statTypes);

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









