import React, { useState, useEffect } from 'react';
import WeekFilter from './WeekFilter';
import { getUpcomingGamesForWeek, getFBSTeams, getRecords, getGamesMedia, getPregameWinProbabilityData } from '../services/CollegeFootballApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';

const UpcomingGamesComponent = ({ conference }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [year] = useState(2024); // Assuming year is 2024
  const [seasonType] = useState('regular'); // Assuming seasonType is 'regular', adjust as needed

  useEffect(() => {
    const fetchGamesAndLogos = async () => {
      setLoading(true);
      try {
        const [gamesData, fbsTeams, recordsData, gamesMediaData, pregameWinProbData] = await Promise.all([
          getUpcomingGamesForWeek(currentWeek),
          getFBSTeams(),
          getRecords(),
          getGamesMedia(),
          getPregameWinProbabilityData(year, currentWeek, null, seasonType) // Fetch pregame win probabilities
        ]);

        const teamLogosMap = fbsTeams.reduce((acc, team) => {
          acc[team.id] = team.logos[0];
          return acc;
        }, {});

        const teamRecordsMap = recordsData.reduce((acc, record) => {
          acc[record.teamId] = record;
          return acc;
        }, {});

        const gamesMediaMap = gamesMediaData.reduce((acc, media) => {
          acc[media.id] = media;
          return acc;
        }, {});

        const pregameWinProbMap = pregameWinProbData.reduce((acc, game) => {
          acc[game.gameId] = game;
          return acc;
        }, {});

        const gamesWithDetails = gamesData.map((game) => {
          const mediaInfo = gamesMediaMap[game.id];
          const pregameWinProb = pregameWinProbMap[game.id];
          return {
            ...game,
            homeTeamLogo: teamLogosMap[game.home_id],
            awayTeamLogo: teamLogosMap[game.away_id],
            homeTeamRecord: teamRecordsMap[game.home_id]?.winsLosses,
            awayTeamRecord: teamRecordsMap[game.away_id]?.winsLosses,
            outlet: mediaInfo ? mediaInfo.outlet : 'Unknown Outlet',
            location: game.venue || 'Unknown Location',
            homeWinProbability: pregameWinProb ? pregameWinProb.homeWinProb : 'N/A',
            awayWinProbability: pregameWinProb ? pregameWinProb.awayWinProb : 'N/A',
          };
        }).filter(game => game.homeTeamLogo && game.awayTeamLogo);

        console.log(gamesWithDetails);

        setGames(gamesWithDetails);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesAndLogos();
  }, [currentWeek, year, seasonType]);

  const handleWeekChange = (week) => {
    setCurrentWeek(week);
  };

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error loading games: {error.toString()}</p>;

  return (
    <div>
      <h2> Week {currentWeek}</h2>
      <WeekFilter currentWeek={currentWeek} onWeekChange={handleWeekChange} />
      <div className="scorecards-container">
        {games.map((game) => (
          <div key={game.id} className="scorecard">
            <div className="scorecard-final">Final</div>
            <div className="scorecard-time">{new Date(game.start_date).toLocaleTimeString()}</div>
            <div className="scorecard-media-type">
              <FontAwesomeIcon icon={faTv} /> {game.outlet} {/* TV Icon followed by the outlet name */}
            </div>
            <div className="scorecard-location">Location: {game.venue}</div>
            <div className="scorecard-probability">Home Win Probability: {game.homeWinProbability}</div>
            <div className="scorecard-probability">Away Win Probability: {game.awayWinProbability}</div>
            <div className="scorecard-competitors">
              <div className="scorecard-competitor">
                <img
                  src={game.homeTeamLogo}
                  alt={`${game.home_team.school} logo`}
                  className="scorecard-logo"
                />
                <div className="scorecard-team-name">{game.home_team ? game.home_team.school : 'Home Team'}</div>
                <div className="scorecard-score"><b>{game.homeScore}</b></div>
                <div className="scorecard-record">
                  {game.homeTeamRecord ? `${game.homeTeamRecord.total.wins}-${game.homeTeamRecord.total.losses} (${game.homeTeamRecord.conference})` : ''}
                </div>
              </div>
              <div className="scorecard-competitor">
                <img
                  src={game.awayTeamLogo}
                  alt={`${game.away_team.school} logo`}
                  className="scorecard-logo"
                />
                <div className="scorecard-team-name">{game.away_team ? game.away_team.school : 'Away Team'}</div>
                <div className="scorecard-score"><b>{game.awayScore}</b></div>
                <div className="scorecard-record">
                  {game.awayTeamRecord ? `${game.awayTeamRecord.total.wins}-${game.awayTeamRecord.total.losses} (${game.awayTeamRecord.conference})` : ''}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGamesComponent;


