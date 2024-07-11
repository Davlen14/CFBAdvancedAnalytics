import React, { useEffect, useState } from 'react';
import { getFBSTeams, getGameMedia } from '../services/CollegeFootballApi';
import '../App.css';

const SchedulesComponent = () => {
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsAndSchedules = async () => {
      try {
        const year = 2023;
        const teamsData = await getFBSTeams(year);
        setTeams(teamsData);
        
        const schedulePromises = teamsData.map(team => 
          getGameMedia(year, null, 'regular', team.school)
        );
        
        const schedulesData = await Promise.all(schedulePromises);
        setSchedules(schedulesData.flat());
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamsAndSchedules();
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
      ) : filteredSchedules.length === 0 ? (
        <p>No schedules found</p>
      ) : (
        <ul>
          {filteredSchedules.map((game, index) => (
            <li key={index}>
              <div className="game-item">
                <img src={game.home_team_logo} alt={`${game.home_team} logo`} className="team-logo" />
                <span className="team-name">{game.home_team}</span> vs
                <img src={game.away_team_logo} alt={`${game.away_team} logo`} className="team-logo" />
                <span className="team-name">{game.away_team}</span>
                on {new Date(game.start_date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchedulesComponent;



