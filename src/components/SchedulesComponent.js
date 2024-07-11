// src/components/SchedulesComponent.js

import React, { useEffect, useState } from 'react';
import { getFBSTeams } from '../services/CollegeFootballApi';

const SchedulesComponent = () => {
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await getFBSTeams(2023);
        setTeams(teamsData);

        const response = await fetch('https://api.collegefootballdata.com/games?year=2023');
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSchedules = schedules.filter(game => {
    const gameDate = new Date(game.start_date).toLocaleDateString();
    return (
      game.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedDate && gameDate === selectedDate)
    );
  });

  return (
    <div className="schedules-container">
      <h2>Team Schedules</h2>
      <input
        type="text"
        placeholder="Search by team"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredSchedules.length === 0 ? (
        <p>No schedules found</p>
      ) : (
        <ul>
          {filteredSchedules.map((game, index) => (
            <li key={index}>
              {game.home_team} vs {game.away_team} on {new Date(game.start_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchedulesComponent;





