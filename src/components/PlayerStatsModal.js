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

  const getTopPerformers = (stats) => {
    const topPerformer = (players, key) => players.sort((a, b) => b[key] - a[key])[0];
  
    return {
      passing: {
        player: topPerformer(stats.passing, 'YDS'),
        completions: topPerformer(stats.passing, 'COMPLETIONS'),
        touchdowns: topPerformer(stats.passing, 'TD'),
        attempts: topPerformer(stats.passing, 'ATT')
      },
      rushing: {
        player: topPerformer(stats.rushing, 'YDS'),
        touchdowns: topPerformer(stats.rushing, 'TD'),
        attempts: topPerformer(stats.rushing, 'CAR')
      },
      receiving: {
        player: topPerformer(stats.receiving, 'YDS'),
        touchdowns: topPerformer(stats.receiving, 'TD'),
        receptions: topPerformer(stats.receiving, 'REC')
      }
    };
  };
  
  const homeTeamStats = getTopPerformers(categorizeStats(playerSeasonStats.filter(stat => stat.team === game.home_team.school)));
  const awayTeamStats = getTopPerformers(categorizeStats(playerSeasonStats.filter(stat => stat.team === game.away_team.school)));
  

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
              {homeTeamStats.passing ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.passing.player}</strong></p>
                  <p>YDS: {homeTeamStats.passing.YDS}</p>
                  <p>TD: {homeTeamStats.passing.TD}</p>
                </div>
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {homeTeamStats.rushing ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.rushing.player}</strong></p>
                  <p>YDS: {homeTeamStats.rushing.YDS}</p>
                  <p>TD: {homeTeamStats.rushing.TD}</p>
                </div>
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {homeTeamStats.receiving ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.receiving.player}</strong></p>
                  <p>YDS: {homeTeamStats.receiving.YDS}</p>
                  <p>TD: {homeTeamStats.receiving.TD}</p>
                </div>
              ) : (
                <p>No receiving stats available.</p>
              )}
            </div>
          </div>
          <div className="team-stats away-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {awayTeamStats.passing ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.passing.player}</strong></p>
                  <p>YDS: {awayTeamStats.passing.YDS}</p>
                  <p>TD: {awayTeamStats.passing.TD}</p>
                </div>
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {awayTeamStats.rushing ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.rushing.player}</strong></p>
                  <p>YDS: {awayTeamStats.rushing.YDS}</p>
                  <p>TD: {awayTeamStats.rushing.TD}</p>
                </div>
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {awayTeamStats.receiving ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.receiving.player}</strong></p>
                  <p>YDS: {awayTeamStats.receiving.YDS}</p>
                  <p>TD: {awayTeamStats.receiving.TD}</p>
                </div>
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












