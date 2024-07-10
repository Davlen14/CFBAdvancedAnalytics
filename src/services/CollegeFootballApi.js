import axios from 'axios';

// Base URL for your API
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001', // Fallback to localhost for development
});

async function makeGetRequest(endpoint, params = {}) {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

// Function to get teams list via your proxy server
export async function getTeams() {
  return makeGetRequest('/api/college-football/teams');
}

// Function to get FBS team list via your proxy server
export async function getFBSTeams(year = 2023) {
  return makeGetRequest(`/api/college-football/teams-fbs?year=${year}`);
}

// Function to get team rosters via your proxy server
export async function getTeamRosters(teamId) {
  return makeGetRequest(`/api/college-football/roster?teamId=${teamId}`);
}

// Function to get upcoming games for the current year and regular season
export async function getUpcomingGamesForWeek(week) {
  try {
    const params = {
      year: new Date().getFullYear(),
      seasonType: 'regular',
      week,
    };

    const response = await apiClient.get('/api/college-football/upcoming-games', { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching upcoming games for week ${week}:`, error);
    throw error;
  }
}

export async function getRecords(year = 2023) {
  return makeGetRequest(`/api/college-football/records?year=${year}`);
}

export async function getGamesMedia() {
  return makeGetRequest('/api/college-football/games/media');
}

// New functions for fetching additional metrics and ratings data

// Function to get SP+ ratings
export async function getSpRatings(year, team) {
  const params = {};
  if (year) params.year = year;
  if (team) params.team = team;
  return makeGetRequest('/api/ratings/sp', params);
}

// Function to get historical SRS ratings
export async function getHistoricalSRSRatings() {
  return makeGetRequest('/api/ratings/srs');
}

// Function to get historical SP+ ratings by conference
export async function getHistoricalSPRatingsByConference() {
  return makeGetRequest('/api/ratings/sp/conferences');
}

// Function to get historical Elo ratings
export async function getHistoricalEloRatings() {
  return makeGetRequest('/api/ratings/elo');
}

// Function to get historical FPI ratings
export async function getHistoricalFPIRatings() {
  return makeGetRequest('/api/ratings/fpi');
}

// Function to get predicted points (EP)
export async function getPredictedPoints() {
  return makeGetRequest('/api/ppa/predicted');
}

// Function to get Predicted Points Added (PPA/EPA) data by team
export async function getPPATeamData() {
  return makeGetRequest('/api/ppa/teams');
}

// Function to get Team Predicted Points Added (PPA/EPA) by game
export async function getPPAGameData() {
  return makeGetRequest('/api/ppa/games');
}

// Function to get Player Predicted Points Added (PPA/EPA) by game
export async function getPPAPlayerGameData() {
  return makeGetRequest('/api/ppa/players/games');
}

// Function to get Player Predicted Points Added (PPA/EPA) by season
export async function getPPAPlayerSeasonData() {
  return makeGetRequest('/api/ppa/players/season');
}

// Function to get field goal expected points
export async function getFieldGoalEP() {
  return makeGetRequest('/api/metrics/fg/ep');
}

// Function to get win probability chart data
export async function getWinProbabilityChartData() {
  return makeGetRequest('/api/metrics/wp');
}

// Function to get pregame win probability data
export async function getPregameWinProbabilityData() {
  return makeGetRequest('/api/metrics/wp/pregame');
}

// Function to get team statistics by season
export async function getTeamStatsBySeason() {
  return makeGetRequest('/api/stats/season');
}

// Function to get advanced team metrics by season
export async function getAdvancedTeamMetricsBySeason() {
  return makeGetRequest('/api/stats/season/advanced');
}

// Function to get advanced team metrics by game
export async function getAdvancedTeamMetricsByGame() {
  return makeGetRequest('/api/stats/game/advanced');
}

// Function to get team stat categories
export async function getTeamStatCategories() {
  return makeGetRequest('/api/stats/categories');
}

// Function to get historical polls and rankings
export async function getHistoricalRankings() {
  return makeGetRequest('/api/rankings');
}

