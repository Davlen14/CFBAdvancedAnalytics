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
    const topPerformer = (players, statType) => 
      players.filter(player => player.statType === statType)
             .sort((a, b) => parseFloat(b.stat) - parseFloat(a.stat))[0];
  
    return {
      passing: {
        player: topPerformer(stats.passing, 'YDS'),
        completions: topPerformer(stats.passing, 'COMPLETIONS'),
        touchdowns: topPerformer(stats.passing, 'TD'),
        attempts: topPerformer(stats.passing, 'ATT'),
        interceptions: topPerformer(stats.passing, 'INT')
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
          </div>
          <div className="separator">
            <h2>vs</h2>
          </div>
          <div className="team-header">
            <img src={getTeamLogo(game.away_team.school)} alt={`${game.away_team.school} logo`} className="team-logo" />
          </div>
        </div>
        <div className="player-modal-stats-container">
          <div className="team-stats home-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {homeTeamStats.passing && homeTeamStats.passing.player ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.passing.player.player}</strong></p>
                  <p>YDS: {homeTeamStats.passing.player.stat}</p>
                  <p>TD: {homeTeamStats.passing.touchdowns ? homeTeamStats.passing.touchdowns.stat : 'N/A'}</p>
                  <p>COMPLETIONS: {homeTeamStats.passing.completions ? homeTeamStats.passing.completions.stat : 'N/A'}</p>
                  <p>ATT: {homeTeamStats.passing.attempts ? homeTeamStats.passing.attempts.stat : 'N/A'}</p>
                  <p>INT: {homeTeamStats.passing.interceptions ? homeTeamStats.passing.interceptions.stat : 'N/A'}</p>
                </div>
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {homeTeamStats.rushing && homeTeamStats.rushing.player ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.rushing.player.player}</strong></p>
                  <p>YDS: {homeTeamStats.rushing.player.stat}</p>
                  <p>TD: {homeTeamStats.rushing.touchdowns ? homeTeamStats.rushing.touchdowns.stat : 'N/A'}</p>
                  <p>CAR: {homeTeamStats.rushing.attempts ? homeTeamStats.rushing.attempts.stat : 'N/A'}</p>
                </div>
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {homeTeamStats.receiving && homeTeamStats.receiving.player ? (
                <div className="stat-box">
                  <p><strong>{homeTeamStats.receiving.player.player}</strong></p>
                  <p>YDS: {homeTeamStats.receiving.player.stat}</p>
                  <p>TD: {homeTeamStats.receiving.touchdowns ? homeTeamStats.receiving.touchdowns.stat : 'N/A'}</p>
                  <p>REC: {homeTeamStats.receiving.receptions ? homeTeamStats.receiving.receptions.stat : 'N/A'}</p>
                </div>
              ) : (
                <p>No receiving stats available.</p>
              )}
            </div>
          </div>
          <div className="team-stats away-team">
            <div className="stats-section">
              <h4>Passing</h4>
              {awayTeamStats.passing && awayTeamStats.passing.player ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.passing.player.player}</strong></p>
                  <p>YDS: {awayTeamStats.passing.player.stat}</p>
                  <p>TD: {awayTeamStats.passing.touchdowns ? awayTeamStats.passing.touchdowns.stat : 'N/A'}</p>
                  <p>COMPLETIONS: {awayTeamStats.passing.completions ? awayTeamStats.passing.completions.stat : 'N/A'}</p>
                  <p>ATT: {awayTeamStats.passing.attempts ? awayTeamStats.passing.attempts.stat : 'N/A'}</p>
                  <p>INT: {awayTeamStats.passing.interceptions ? awayTeamStats.passing.interceptions.stat : 'N/A'}</p>
                </div>
              ) : (
                <p>No passing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Rushing</h4>
              {awayTeamStats.rushing && awayTeamStats.rushing.player ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.rushing.player.player}</strong></p>
                  <p>YDS: {awayTeamStats.rushing.player.stat}</p>
                  <p>TD: {awayTeamStats.rushing.touchdowns ? awayTeamStats.rushing.touchdowns.stat : 'N/A'}</p>
                  <p>CAR: {awayTeamStats.rushing.attempts ? awayTeamStats.rushing.attempts.stat : 'N/A'}</p>
                </div>
              ) : (
                <p>No rushing stats available.</p>
              )}
            </div>
            <div className="stats-section">
              <h4>Receiving</h4>
              {awayTeamStats.receiving && awayTeamStats.receiving.player ? (
                <div className="stat-box">
                  <p><strong>{awayTeamStats.receiving.player.player}</strong></p>
                  <p>YDS: {awayTeamStats.receiving.player.stat}</p>
                  <p>TD: {awayTeamStats.receiving.touchdowns ? awayTeamStats.receiving.touchdowns.stat : 'N/A'}</p>
                  <p>REC: {awayTeamStats.receiving.receptions ? awayTeamStats.receiving.receptions.stat : 'N/A'}</p>
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













