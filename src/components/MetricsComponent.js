import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure this path is correct
import { getFBSTeams, getSpRatings, getUpcomingGamesForWeek } from '../services/CollegeFootballApi'; // Import the functions

const conferenceLogos = {
  "ACC": "/conference-logos/ACC.png",
  "American Athletic": "/conference-logos/American Athletic.png",
  "Big 12": "/conference-logos/Big 12.png",
  "Big Ten": "/conference-logos/Big Ten.png",
  "Conference USA": "/conference-logos/Conference USA.png",
  "FBS Independents": "/conference-logos/FBS Independents.png",
  "Mid-American": "/conference-logos/Mid-American.png",
  "Mountain West": "/conference-logos/Mountain West.png",
  "Pac-12": "/conference-logos/Pac-12.png",
  "SEC": "/conference-logos/SEC.png",
  "Sun Belt": "/conference-logos/Sun Belt.png"
};

const MetricsComponent = ({ selectedTeam }) => {
  const [year, setYear] = useState(2023);
  const [conference, setConference] = useState('');
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spRating, setSpRating] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getFBSTeams(year);
        setTeams(teamsData);
        setIsLoading(false);
      } catch (error) {
        setError(`Error fetching teams: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [year]);

  useEffect(() => {
    const fetchSpRating = async () => {
      try {
        if (team) {
          const spRatingData = await getSpRatings(year, team);
          setSpRating(spRatingData.find(data => data.team === team));
        }
      } catch (error) {
        setError(`Error fetching SP+ ratings: ${error.message}`);
      }
    };

    fetchSpRating();
  }, [year, team]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (team) {
          const gamesData = await getUpcomingGamesForWeek(1); // Adjust week as needed
          const teamGames = gamesData.filter(game => game.home_team === team || game.away_team === team);
          setSchedule(teamGames);
        }
      } catch (error) {
        setError(`Error fetching schedule: ${error.message}`);
      }
    };

    fetchSchedule();
  }, [year, team]);

  useEffect(() => {
    if (selectedTeam) {
      setTeam(selectedTeam.school);
      setConference(selectedTeam.conference);
    }
  }, [selectedTeam]);

  const handleTeamChange = (school) => {
    const selected = teams.find(team => team.school === school);
    setTeam(school);
    setConference(selected.conference);
  };

  return (
    <div className="metrics-container">
      <h1 className="metrics-section-title">Advanced Metrics</h1>
      
      <div className="filters">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          {/* Add more years as needed */}
        </select>
        
        <select value={conference} onChange={(e) => setConference(e.target.value)}>
          <option value="">All Conferences</option>
          <option value="ACC">ACC</option>
          <option value="American Athletic">American Athletic</option>
          <option value="Big 12">Big 12</option>
          <option value="Big Ten">Big Ten</option>
          <option value="Conference USA">Conference USA</option>
          <option value="FBS Independents">FBS Independents</option>
          <option value="Mid-American">Mid-American</option>
          <option value="Mountain West">Mountain West</option>
          <option value="Pac-12">Pac-12</option>
          <option value="SEC">SEC</option>
          <option value="Sun Belt">Sun Belt</option>
          {/* Add more conferences as needed */}
        </select>
        
        <select value={team} onChange={(e) => handleTeamChange(e.target.value)}>
          <option value="">Select Team</option>
          {teams
            .filter(team => !conference || team.conference === conference)
            .map(team => (
              <option key={team.id} value={team.school}>
                {team.school}
              </option>
          ))}
        </select>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      <section className="metric-section" id="overview">
        <h2 className="metrics-section-title">Overview</h2>
        {team ? (
          <div className="metric-card">
            <h3>{team}</h3>
            {teams.find(t => t.school === team)?.logos && (
              <img src={teams.find(t => t.school === team).logos[0]} alt={`${team} logo`} className="team-logo" />
            )}
            {conference && (
              <img src={conferenceLogos[conference]} alt={`${conference} logo`} className="conference-logo" />
            )}
            {spRating && (
              <div>
                <p>SP+ Rating: {spRating.rating}</p>
                <p>SP+ Rank: {spRating.ranking}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Select a team to view its overview.</p>
        )}
      </section>
      
      <section className="metric-section" id="schedule">
        <h2 className="metrics-section-title">Schedule</h2>
        {schedule.length > 0 ? (
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Opponent</th>
                <th>Media</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((game) => (
                <tr key={game.id}>
                  <td>{game.week}</td>
                  <td>{new Date(game.start_date).toLocaleDateString()}</td>
                  <td>{game.home_team === team ? game.away_team : game.home_team}</td>
                  <td>{game.outlet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No schedule available for the selected team.</p>
        )}
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













