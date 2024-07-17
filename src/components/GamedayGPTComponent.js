import React, { useState } from 'react';
import '../App.css'; // Ensure this path is correct

const GamedayGPTComponent = () => {
  const [teams, setTeams] = useState(['Ohio State', 'Alabama']);
  const [seasonRange, setSeasonRange] = useState('2010-2023');
  const [stat, setStat] = useState('wins');
  const [comparisonPlot, setComparisonPlot] = useState('');

  const handleTeamChange = (e) => {
    const options = e.target.options;
    const selectedTeams = [];
    for (const option of options) {
      if (option.selected) {
        selectedTeams.push(option.value);
      }
    }
    setTeams(selectedTeams);
  };

  const handleSeasonRangeChange = (e) => {
    setSeasonRange(e.target.value);
  };

  const handleStatChange = (e) => {
    setStat(e.target.value);
  };

  const handleCompare = async () => {
    const seasonRangeArray = seasonRange.split('-').map(Number);
    const response = await fetch('https://my-betting-bot-davlen-2bc8e47f62ae.herokuapp.com/compare-teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teams, season_range: seasonRangeArray, stat }),
    });

    if (response.ok) {
      const imageUrl = await response.blob();
      setComparisonPlot(URL.createObjectURL(imageUrl));
    } else {
      console.error('Error fetching comparison plot');
    }
  };

  return (
    <div className="gamedaygpt-page main-content">
      <div className="gamedaygpt-intro">
        <h2>GameDay GPT - Your College Football AI Companion</h2>
        <p>Get personalized insights and analytics for all things college football.</p>
        <p>Ask me anything about college football, or compare teams and their stats over the years.</p>
      </div>

      <div className="gamedaygpt-container">
        <div className="gamedaygpt-chat">
          <h3>Chat Interface</h3>
          <form className="gamedaygpt-form">
            <input
              type="text"
              placeholder="Ask me anything about college football..."
              className="gamedaygpt-input"
            />
            <button type="submit" className="gamedaygpt-submit">Ask</button>
          </form>
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
            <select multiple={true} className="team-selection" onChange={handleTeamChange}>
              <option value="Ohio State">Ohio State</option>
              <option value="Alabama">Alabama</option>
              <option value="Michigan">Michigan</option>
              <option value="Georgia">Georgia</option>
              <option value="Clemson">Clemson</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Notre Dame">Notre Dame</option>
              <option value="LSU">LSU</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              {/* Add more teams as needed */}
            </select>
            <select className="season-range-selector" onChange={handleSeasonRangeChange}>
              <option value="2000-2023">2000-2023</option>
              <option value="2010-2023">2010-2023</option>
              {/* Add more ranges as needed */}
            </select>
            <select className="statistics-dropdown" onChange={handleStatChange}>
              <option value="wins">Wins</option>
              <option value="points">Points Scored</option>
              {/* Add more statistics as needed */}
            </select>
            <button className="compare-button" onClick={handleCompare}>Compare</button>
          </div>
          <div className="comparison-results">
            <h4>Comparison Plot</h4>
            {comparisonPlot && <img src={comparisonPlot} alt="Comparison Plot" className="comparison-plot" />}
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




