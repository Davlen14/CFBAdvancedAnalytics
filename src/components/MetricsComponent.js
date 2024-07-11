import React from 'react';
import '../App.css'; // Ensure this path is correct

const MetricsComponent = () => {
  return (
    <div className="metrics-container">
      <h1 className="metrics-section-title">Advanced Metrics</h1>
      
      <section className="metric-section" id="overview">
        <h2 className="metrics-section-title">Overview</h2>
        <div className="metric-card">
          <h3>Overall Performance</h3>
          <p>Overview content goes here...</p>
        </div>
      </section>
      
      <section className="metric-section" id="team-performance">
        <h2 className="metrics-section-title">Team Performance</h2>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Team A</td>
              <td>10</td>
              <td>2</td>
              <td>83.3%</td>
            </tr>
            <tr>
              <td>Team B</td>
              <td>8</td>
              <td>4</td>
              <td>66.7%</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="metric-section" id="player-performance">
        <h2 className="metrics-section-title">Player Performance</h2>
        <div className="metric-card">
          <h3>Top Players</h3>
          <p>Player performance content goes here...</p>
        </div>
      </section>
      
      <section className="metric-section" id="game-metrics">
        <h2 className="metrics-section-title">Game Metrics</h2>
        <div className="chart-container">
          <p>Chart content goes here...</p>
        </div>
      </section>
      
      <section className="metric-section" id="historical-data">
        <h2 className="metrics-section-title">Historical Data</h2>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Season</th>
              <th>Champion</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022</td>
              <td>Team C</td>
              <td>11</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2021</td>
              <td>Team D</td>
              <td>12</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="metric-section" id="advanced-metrics">
        <h2 className="metrics-section-title">Advanced Metrics</h2>
        <div className="metric-card">
          <h3>Advanced Metric 1</h3>
          <p>Advanced metrics content goes here...</p>
        </div>
      </section>
    </div>
  );
};

export default MetricsComponent;



