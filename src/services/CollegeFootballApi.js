import axios from 'axios';

// Base URL for your API
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001', // Fallback to localhost for development
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_CFB_API_KEY}`,
  },
});

async function makeGetRequest(endpoint) {
  try {
    const response = await apiClient.get(endpoint);
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
  // Include the year parameter in the URL
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

    const response = await apiClient.get('/api/college-football/upcoming-games', {
      params,
    });
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


