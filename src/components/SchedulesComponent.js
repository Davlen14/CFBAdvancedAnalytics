import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getFBSTeams, getGames } from '../services/CollegeFootballApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';

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

const SchedulesComponent = () => {
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const year = 2023;
  const seasonType = 'regular';

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await getFBSTeams(year);
        setTeams(fetchedTeams);
        setIsLoading(false);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [year]);

  useEffect(() => {
    const fetchGamesAndLogos = async () => {
      setIsLoading(true);
      try {
        const gamesData = await getGames({ year, seasonType, division: 'fbs' });

        const teamLogosMap = teams.reduce((acc, team) => {
          acc[team.id] = team.logos[0];
          return acc;
        }, {});

        const gamesWithDetails = gamesData.map((game) => {
          return {
            ...game,
            homeTeamLogo: teamLogosMap[game.home_id],
            awayTeamLogo: teamLogosMap[game.away_id],
          };
        }).filter(game => game.homeTeamLogo && game.awayTeamLogo);

        setSchedules(gamesWithDetails);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamesAndLogos();
  }, [year, seasonType, teams]);

  const filteredSchedules = schedules.filter(game => {
    const gameDate = new Date(game.start_date).toLocaleDateString();
    return (
      (selectedTeam && (game.home_team === selectedTeam || game.away_team === selectedTeam)) ||
      (selectedConference && teams.find(team => team.school === game.home_team)?.conference === selectedConference) ||
      (selectedDate && gameDate === selectedDate)
    );
  });

  const teamOptions = teams.map(team => ({
    value: team.school,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={team.logos[0]} alt={team.school} style={{ width: 20, height: 20, marginRight: 10 }} />
        {team.school}
      </div>
    )
  }));

  const conferenceOptions = Array.from(new Set(teams.map(team => team.conference))).map(conference => ({
    value: conference,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={conferenceLogos[conference]} alt={conference} style={{ width: 20, height: 20, marginRight: 10 }} />
        {conference}
      </div>
    )
  }));

  return (
    <div className="schedules-container">
      <h2>Team Schedules</h2>
      <Select
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option ? option.value : null)}
        placeholder="Select a team"
        isClearable
        className="dropdown"
        classNamePrefix="dropdown"
      />
      <Select
        options={conferenceOptions}
        onChange={(option) => setSelectedConference(option ? option.value : null)}
        placeholder="Select a conference"
        isClearable
        className="dropdown"
        classNamePrefix="dropdown"
      />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-input"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredSchedules.length === 0 ? (
        <p>No schedules found</p>
      ) : (
        <ul className="schedule-list">
          {filteredSchedules.map((game, index) => (
            <li key={index} className="schedule-item">
              <div>
                <img src={teams.find(team => team.school === game.home_team)?.logos[0]} alt={game.home_team} className="team-logo" />
                {game.home_team}
              </div>
              <div>
                vs
              </div>
              <div>
                <img src={teams.find(team => team.school === game.away_team)?.logos[0]} alt={game.away_team} className="team-logo" />
                {game.away_team}
              </div>
              <div>
                on {new Date(game.start_date).toLocaleDateString()}
              </div>
              <div>
                <FontAwesomeIcon icon={faTv} /> {game.outlet}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchedulesComponent;

