import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getFBSTeams, getGames } from '../services/CollegeFootballApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import AdvancedBoxScoreModal from './AdvancedBoxScoreModal'; // Import the modal component

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
  const [selectedYear, setSelectedYear] = useState(2023); // Default year
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null); // State for selected game
  const seasonType = 'regular';

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await getFBSTeams(selectedYear);
        setTeams(fetchedTeams);
        setIsLoading(false);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [selectedYear]);

  useEffect(() => {
    if (selectedTeam) {
      const fetchGamesAndLogos = async () => {
        setIsLoading(true);
        try {
          const gamesData = await getGames({ year: selectedYear, seasonType, division: 'fbs', team: selectedTeam });

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
    }
  }, [selectedTeam, selectedYear, seasonType, teams]);

  const filteredSchedules = schedules.filter(game => {
    return (
      (selectedTeam && (game.home_team === selectedTeam || game.away_team === selectedTeam)) ||
      (selectedConference && teams.find(team => team.school === game.home_team)?.conference === selectedConference)
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

  const yearOptions = [
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' }
  ];

  const handleGameClick = (gameId) => {
    setSelectedGame(gameId);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="schedules-container">
      <Select
        options={yearOptions}
        onChange={(option) => setSelectedYear(option ? option.value : 2023)}
        defaultValue={yearOptions[0]}
        placeholder="Select a year"
        className="dropdown"
        classNamePrefix="dropdown"
      />
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
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredSchedules.length === 0 ? (
        <p>No schedules found</p>
      ) : (
        <ul className="schedule-list">
          {filteredSchedules.map((game, index) => (
            <li key={index} className="schedule-item" onClick={() => handleGameClick(game.id)}>
              <div className="game-info">
                <div className="team">
                  <img src={game.homeTeamLogo} alt={game.home_team} className="team-logo" />
                  <span className="team-name">{game.home_team}</span>
                  <span className="team-record">({game.home_points})</span>
                </div>
                <div className="vs">vs</div>
                <div className="team">
                  <img src={game.awayTeamLogo} alt={game.away_team} className="team-logo" />
                  <span className="team-name">{game.away_team}</span>
                  <span className="team-record">({game.away_points})</span>
                </div>
                <div className="game-details">
                  <span className="game-date">{new Date(game.start_date).toLocaleDateString()}</span>
                  <span className="game-time">{new Date(game.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="game-venue">{game.venue}</span>
                  <span className="game-tv">
                    <FontAwesomeIcon icon={faTv} /> {game.outlet}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedGame && (
        <AdvancedBoxScoreModal gameId={selectedGame} onClose={closeModal} />
      )}
    </div>
  );
};

export default SchedulesComponent;





