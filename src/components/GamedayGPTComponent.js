import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../App.css'; // Ensure this path is correct

const GamedayGPTComponent = () => {
  const [teams, setTeams] = useState(['Ohio State', 'Alabama']);
  const [startYear, setStartYear] = useState(2010);
  const [endYear, setEndYear] = useState(2023);
  const [stat, setStat] = useState('wins');
  const [comparisonData, setComparisonData] = useState(null);

  const teamOptions = [
    'Alabama', 'Clemson', 'Florida', 'Georgia', 'LSU', 'Michigan', 'Notre Dame', 'Ohio State', 'Oklahoma', 'Texas',
    'Auburn', 'Florida State', 'Miami', 'Oregon', 'Penn State', 'USC', 'Wisconsin', 'Texas A&M', 'Iowa', 'Michigan State',
    'Nebraska', 'Tennessee', 'UCLA', 'Washington', 'Stanford', 'Virginia Tech', 'Mississippi State', 'Ole Miss', 'Arkansas', 'TCU',
    'Kansas State', 'Baylor', 'Oklahoma State', 'West Virginia', 'Utah', 'North Carolina', 'Kentucky', 'Missouri', 'South Carolina', 'Texas Tech',
    'Arizona State', 'BYU', 'Boise State', 'Pittsburgh', 'Louisville', 'Memphis', 'Houston', 'Cincinnati', 'UCF', 'Navy'
  ];

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

  const handleStartYearChange = (e) => {
    setStartYear(Number(e.target.value));
  };

  const handleEndYearChange = (e) => {
    setEndYear(Number(e.target.value));
  };

  const handleStatChange = (e) => {
    setStat(e.target.value);
  };

  const handleCompare = async () => {
    const response = await fetch(`https://my-betting-bot-davlen-2bc8e47f62ae.herokuapp.com/api/college-football/records?startYear=${startYear}&endYear=${endYear}&teams=${teams.join(',')}`);
    if (response.ok) {
      const data = await response.json();
      setComparisonData(processRecords(data, teams, stat));
    } else {
      console.error('Error fetching comparison data');
    }
  };

  const processRecords = (records, teams, stat) => {
    const years = Array.from(new Set(records.map(record => record.year))).sort((a, b) => a - b);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']; // Add more colors as needed
  
    const datasets = teams.map((team, index) => {
      const teamData = years.map(year => {
        const record = records.find(record => record.team === team && record.year === year);
        return record ? record[stat] : 0;
      });
      return {
        label: team,
        data: teamData,
        fill: false,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length]
      };
    });
  
    return { labels: years, datasets };
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
              {teamOptions.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
            <select className="year-selector" value={startYear} onChange={handleStartYearChange}>
              {Array.from({ length: 24 }, (_, i) => 2000 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select className="year-selector" value={endYear} onChange={handleEndYearChange}>
              {Array.from({ length: 24 }, (_, i) => 2000 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
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
            {comparisonData && <Line data={comparisonData} />}
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

