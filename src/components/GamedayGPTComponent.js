import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import '../App.css';
import { getFBSTeams, getRecords } from '../services/CollegeFootballApi'; // Ensure you have these functions

const GamedayGPTComponent = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsData = await getFBSTeams();
      setTeams(teamsData);
    };
    fetchTeams();
  }, []);

  const handleTeamChange = (selectedOptions) => {
    setSelectedTeams(selectedOptions);
  };

  const handleYearChange = (selectedOptions) => {
    setSelectedYears(selectedOptions);
  };

  const handleCompare = async () => {
    const years = selectedYears.map(year => year.value);
    const teams = selectedTeams.map(team => team.value);
    const data = await getRecords(Math.min(...years), Math.max(...years), teams);
    const chartData = generateChartData(data);
    setComparisonData(chartData);
  };

  const generateChartData = (data) => {
    const years = selectedYears.map(year => year.value);
    const datasets = data.map(teamData => {
      return {
        label: teamData.team,
        data: years.map(year => teamData.total[year] ? teamData.total[year].wins : 0),
        fill: false,
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor()
      };
    });
    return { labels: years, datasets };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const teamOptions = teams.map(team => ({
    value: team.school,
    label: (
      <div className="team-option">
        <img src={team.logos[0]} alt={`${team.school} logo`} className="team-logo" />
        {team.school}
      </div>
    )
  }));

  const yearOptions = Array.from({ length: 24 }, (_, i) => i + 2000).map(year => ({
    value: year,
    label: year
  }));

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
            <Select
              isMulti
              className="team-selection"
              options={teamOptions}
              onChange={handleTeamChange}
              value={selectedTeams}
            />
            <Select
              isMulti
              className="year-selection"
              options={yearOptions}
              onChange={handleYearChange}
              value={selectedYears}
            />
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



