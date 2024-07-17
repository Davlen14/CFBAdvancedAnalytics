import React, { useState } from 'react';
import '../App.css';

const GamedayGPTComponent = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for future API call
    setResponse(`You asked: ${query}`);
  };

  return (
    <div className="gamedaygpt-page">
      <div className="gamedaygpt-intro">
        <h2>GameDay GPT - Your College Football AI Companion</h2>
        <p>Get personalized insights and analytics for all things college football.</p>
        <p>Ask me anything about college football, or compare teams and their stats over the years.</p>
      </div>

      <div className="gamedaygpt-container">
        <div className="gamedaygpt-chat">
          <h3>Chat Interface</h3>
          <form onSubmit={handleSubmit} className="gamedaygpt-form">
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Ask me anything about college football..."
              className="gamedaygpt-input"
            />
            <button type="submit" className="gamedaygpt-submit">Ask</button>
          </form>
          {response && <div className="gamedaygpt-response">{response}</div>}
          <div className="example-questions">
            <h4>Example Questions:</h4>
            <ul>
              <li>Which team has the most wins in the last decade?</li>
              <li>Compare Ohio State and Alabama's performance.</li>
              <li>What are the key stats for the 2023 season?</li>
            </ul>
          </div>
        </div>

        <div className="gamedaygpt-comparison">
          <h3>Team Comparison Tool</h3>
          <div className="filters-section">
            <select className="team-selection">
              <option value="">Select a team</option>
              <option value="Ohio State">Ohio State</option>
              <option value="Alabama">Alabama</option>
              {/* Add more teams as needed */}
            </select>
            <select className="season-range-selector">
              <option value="">Select season range</option>
              <option value="2010-2020">2010-2020</option>
              <option value="2000-2023">2000-2023</option>
              {/* Add more ranges as needed */}
            </select>
            <select className="statistics-dropdown">
              <option value="">Select statistics</option>
              <option value="wins">Wins</option>
              <option value="points">Points Scored</option>
              {/* Add more statistics as needed */}
            </select>
            <button className="compare-button">Compare</button>
          </div>
          <div className="comparison-results">
            <h4>Comparison Plot</h4>
            {/* Placeholder for comparison plot */}
            <div className="comparison-plot">Comparison Plot will be displayed here</div>
            <div className="key-insights">
              <h4>Key Insights</h4>
              <p>Insights derived from the comparison will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="additional-insights">
        <h3>Additional Insights</h3>
        <div className="trending-analyses">
          <h4>Trending Analyses</h4>
          <p>Popular or recent team comparisons.</p>
        </div>
        <div className="featured-metrics">
          <h4>Featured Metrics</h4>
          <p>Interesting statistics or records.</p>
        </div>
      </div>

      <div className="interactive-features">
        <h3>Interactive Features</h3>
        <div className="recent-analyses">
          <h4>Recent Analyses</h4>
          <p>Showcase recent analyses done by users or trending comparisons.</p>
        </div>
        <div className="user-interaction-history">
          <h4>User Interaction History</h4>
          <p>View past interactions and comparisons.</p>
        </div>
        <div className="leaderboard-records">
          <h4>Leaderboard and Records</h4>
          <p>Highlight top-performing teams, best seasons, etc.</p>
        </div>
        <div className="community-insights">
          <h4>Community Insights</h4>
          <p>Section where users can share their insights or comments on the analyses.</p>
        </div>
      </div>
    </div>
  );
};

export default GamedayGPTComponent;
