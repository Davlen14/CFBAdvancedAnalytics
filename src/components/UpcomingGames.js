import React, { useState, useEffect } from 'react';
import WeekFilter from './WeekFilter';
import { getUpcomingGamesForWeek, getFBSTeams, getRecords, getGamesMedia } from '../services/CollegeFootballApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';

const UpcomingGamesComponent = ({ conference }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const fetchGamesAndLogos = async () => {
      setLoading(true);
      try {
        const [gamesData, fbsTeams, recordsData, gamesMediaData] = await Promise.all([
          getUpcomingGamesForWeek(currentWeek),
          getFBSTeams(),
          getRecords(),
          getGamesMedia() // Fetching the media information
        ]);

        const teamLogosMap = fbsTeams.reduce((acc, team) => {
          acc[team.id] = team.logos[0]; // Assuming the first logo is the primary one
          return acc;
        }, {});

        const teamRecordsMap = recordsData.reduce((acc, record) => {
          acc[record.teamId] = record;
          return acc;
        }, {});

        // Create a map for games media for easy lookup
        const gamesMediaMap = gamesMediaData.reduce((acc, media) => {
          acc[media.id] = media;
          return acc;
        }, {});

        // Extend gamesWithDetails to include new data
        const gamesWithDetails = gamesData.map((game) => {
          // Lookup media information using the game id
          const mediaInfo = gamesMediaMap[game.id];
          return {
            ...game,
            homeTeamLogo: teamLogosMap[game.home_id], // Adjust if necessary
            awayTeamLogo: teamLogosMap[game.away_id], // Adjust if necessary
            homeTeamRecord: teamRecordsMap[game.home_id]?.winsLosses, // Adjust if necessary
            awayTeamRecord: teamRecordsMap[game.away_id]?.winsLosses, // Adjust if necessary
            outlet: mediaInfo ? mediaInfo.outlet : 'Unknown Outlet',
            location: game.venue || 'Unknown Location', // Use venue from the game as the location
            homeWinProbability: game.home_post_win_prob || 'N/A',
            awayWinProbability: game.away_post_win_prob || 'N/A',
          };
        }).filter(game => game.homeTeamLogo && game.awayTeamLogo);

        // Log the gamesWithDetails for debugging
        console.log(gamesWithDetails);

        // Set the updated gamesWithDetails in state
        setGames(gamesWithDetails);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesAndLogos();
  }, [currentWeek]);

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
