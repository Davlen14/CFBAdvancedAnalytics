import React, { useState, useEffect } from 'react';
import { getSpRatings, getHistoricalSRSRatings, getHistoricalSPRatingsByConference, getHistoricalEloRatings, getHistoricalFPIRatings, getPredictedPoints, getPPATeamData, getPPAGameData, getPPAPlayerGameData, getPPAPlayerSeasonData, getFieldGoalEP, getWinProbabilityChartData, getPregameWinProbabilityData, getTeamStatsBySeason, getAdvancedTeamMetricsBySeason, getAdvancedTeamMetricsByGame, getTeamStatCategories, getHistoricalRankings } from '../api'; // Update with your actual import path
import './App.css'; // Import the existing CSS file

const MetricsComponent = () => {
  const [metrics, setMetrics] = useState({
    spRatings: [],
    historicalSRS: [],
    historicalSPConference: [],
    historicalElo: [],
    historicalFPI: [],
    predictedPoints: [],
    ppaTeams: [],
    ppaGames: [],
    ppaPlayersGames: [],
    ppaPlayersSeason: [],
    fgEP: [],
    winProbChart: [],
    pregameWinProb: [],
    teamStats: [],
    advancedTeamMetricsSeason: [],
    advancedTeamMetricsGame: [],
    teamStatCategories: [],
    historicalRankings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spRatings = await getSpRatings(2023);
        const historicalSRS = await getHistoricalSRSRatings();
        const historicalSPConference = await getHistoricalSPRatingsByConference();
        const historicalElo = await getHistoricalEloRatings();
        const historicalFPI = await getHistoricalFPIRatings();
        const predictedPoints = await getPredictedPoints();
        const ppaTeams = await getPPATeamData();
        const ppaGames = await getPPAGameData();
        const ppaPlayersGames = await getPPAPlayerGameData();
        const ppaPlayersSeason = await getPPAPlayerSeasonData();
        const fgEP = await getFieldGoalEP();
        const winProbChart = await getWinProbabilityChartData();
        const pregameWinProb = await getPregameWinProbabilityData(2023, 1, null, 'regular');
        const teamStats = await getTeamStatsBySeason();
        const advancedTeamMetricsSeason = await getAdvancedTeamMetricsBySeason();
        const advancedTeamMetricsGame = await getAdvancedTeamMetricsByGame();
        const teamStatCategories = await getTeamStatCategories();
        const historicalRankings = await getHistoricalRankings();

        setMetrics({
          spRatings,
          historicalSRS,
          historicalSPConference,
          historicalElo,
          historicalFPI,
          predictedPoints,
          ppaTeams,
          ppaGames,
          ppaPlayersGames,
          ppaPlayersSeason,
          fgEP,
          winProbChart,
          pregameWinProb,
          teamStats,
          advancedTeamMetricsSeason,
          advancedTeamMetricsGame,
          teamStatCategories,
          historicalRankings
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="metrics-container">
      <h1 className="metrics-section-title">Advanced Metrics</h1>
      <section className="metric-section" id="overview">
        <h2 className="metrics-section-title">Overview</h2>
        {/* Overview content */}
      </section>
      <section className="metric-section" id="team-performance">
        <h2 className="metrics-section-title">Team Performance</h2>
        {/* Team performance content */}
      </section>
      <section className="metric-section" id="player-performance">
        <h2 className="metrics-section-title">Player Performance</h2>
        {/* Player performance content */}
      </section>
      <section className="metric-section" id="game-metrics">
        <h2 className="metrics-section-title">Game Metrics</h2>
        {/* Game metrics content */}
      </section>
      <section className="metric-section" id="historical-data">
        <h2 className="metrics-section-title">Historical Data</h2>
        {/* Historical data content */}
      </section>
      <section className="metric-section" id="advanced-metrics">
        <h2 className="metrics-section-title">Advanced Metrics</h2>
        {/* Advanced metrics content */}
      </section>
    </div>
  );
};

export default MetricsComponent;

