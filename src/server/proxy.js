const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const corsOptions = {
  origin: 'https://swaincfbanalytics.netlify.app', // Allow requests from your Netlify domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Enable CORS with specific options for all routes
app.options('*', cors(corsOptions)); // Handle preflight requests

// Setup axios instance with the base URL and headers for the College Football Data API
const apiClient = axios.create({
  baseURL: 'https://api.collegefootballdata.com',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_CFB_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Endpoint to get upcoming games
app.get('/api/college-football/upcoming-games', async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const seasonType = req.query.seasonType || 'regular';
    const week = req.query.week || 1;

    const [gamesResponse, teamsResponse] = await Promise.all([
      apiClient.get('/games', {
        params: { year, seasonType, week },
      }),
      apiClient.get('/teams/fbs'),
    ]);

    const teamsMap = teamsResponse.data.reduce((acc, team) => {
      acc[team.school] = team;
      return acc;
    }, {});

    const enrichedGames = gamesResponse.data.map(game => ({
      ...game,
      home_team: teamsMap[game.home_team] || null,
      away_team: teamsMap[game.away_team] || null,
      homeScore: game.home_points,
      awayScore: game.away_points,
    }));

    res.json(enrichedGames);
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get records
app.get('/api/college-football/records', async (req, res) => {
  try {
    const year = req.query.year || 2023;

    const response = await apiClient.get('/records', {
      params: { year },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get FBS teams
app.get('/api/college-football/teams-fbs', async (_req, res) => {
  try {
    const response = await apiClient.get('/teams/fbs');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from College Football Data API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get games media
app.get('/api/college-football/games/media', async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const seasonType = req.query.seasonType || 'regular';
    const week = req.query.week || 1;

    const response = await apiClient.get('/games/media', {
      params: { year, seasonType, week },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching media information for games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get team rosters
app.get('/api/college-football/roster', async (req, res) => {
  try {
    const teamId = req.query.teamId;
    if (!teamId) {
      return res.status(400).json({ error: 'teamId query parameter is required' });
    }

    const response = await apiClient.get('/roster', {
      params: { team: teamId },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching roster:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint to verify environment variable
app.get('/test-env', (req, res) => {
  res.send(`REACT_APP_API_BASE_URL: ${process.env.REACT_APP_API_BASE_URL}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});









