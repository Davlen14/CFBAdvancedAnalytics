import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';
import { getFBSTeams, getRecords } from '../services/CollegeFootballApi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
    try {
      const years = selectedYears.map(year => year.value);
      const teams = selectedTeams.map(team => team.value);

      const data = await fetchTeamData(teams, years);
      if (!data || data.length === 0) {
        console.error('No data returned from API');
        return;
      }
      const chartData = generateChartData(data);
      setComparisonData(chartData);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  };

  const fetchTeamData = async (teams, years) => {
    const promises = [];
    years.forEach(year => {
      promises.push(getRecords(year, year, teams));
    });
    const results = await Promise.all(promises);
    return results.flat();
  };

  const generateChartData = (data) => {
    const years = Array.from(new Set(data.map(record => record.year)));
    const datasets = selectedTeams.map(team => {
      return {
        label: team.label.props.children[1], // Extract the team name from the label
        data: years.map(year => {
          const record = data.find(d => d.year === year && d.team === team.value);
          return record ? record.total.wins : 0;
        }),
        fill: false,
        borderColor: team.color, // Use team color
        backgroundColor: team.alt_color, // Use alt color if needed
        pointStyle: new Image(),
        pointRadius: 5 // Adjust point radius
      };
    });

    // Setting team logos for pointStyle
    datasets.forEach((dataset, index) => {
      const img = new Image();
      img.src = selectedTeams[index]?.label.props.children[0].props.src || ''; // Safely access logos
      img.width = 20; // Adjust width
      img.height = 20; // Adjust height
      dataset.pointStyle = img;
    });

    return { labels: years, datasets };
  };

  const teamOptions = teams.map(team => ({
    value: team.school,
    label: (
      <div className="team-option">
        <img src={team.logos[0]} alt={`${team.school} logo`} className="team-logo" />
        {team.school}
      </div>
    ),
    color: team.color,
    alt_color: team.alt_color
  }));

  const yearOptions = Array.from({ length: (2023 - 2010 + 1) }, (_, i) => i + 2010).map(year => ({
    value: year,
    label: year.toString()
  }));

  return (
    <div className="gamedaygpt-page main-content">
      <div className="gamedaygpt-intro">
        <h2>GameDay GPT - Your College Football AI Companion</h2>
        <p>Get personalized insights and analytics for all things college football.</p>
        <p>Ask me anything about college football, or compare teams and their stats over the years.</p>
      </div>

      <div className="gamedaygpt-container">
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
            <h4>Wins Over Years Comparison Plot</h4>
            {comparisonData && <Line data={comparisonData} options={{
              plugins: {
                legend: {
                  labels: {
                    generateLabels: (chart) => {
                      const originalLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                      originalLabels.forEach(label => {
                        const team = selectedTeams.find(team => team.label.props.children[1] === label.text);
                        if (team && team.logos) {
                          const img = new Image();
                          img.src = team.logos[0];
                          img.width = 15; // Adjust width for smaller image
                          img.height = 15; // Adjust height for smaller image
                          label.text = team.label.props.children[1]; // Show team name in legend
                          label.pointStyle = img;
                        }
                      });
                      return originalLabels;
                    }
                  }
                }
              }
            }} />}
            <div className="key-insights">
              <h4>Key Insights</h4>
              <p>Insights derived from the comparison will be displayed here.</p>
            </div>
          </div>
        </div>

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









