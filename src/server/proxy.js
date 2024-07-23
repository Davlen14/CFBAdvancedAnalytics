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

// Endpoint to get detailed game stats by year, seasonType, and week
app.get('/api/college-football/games/teams', async (req, res) => {
  try {
    const { year, seasonType, week, classification } = req.query;
    if (!year || !seasonType || !week || !classification) {
      return res.status(400).json({ error: 'year, seasonType, week, and classification query parameters are required' });
    }

    const response = await apiClient.get('/games/teams', {
      params: { year, seasonType, week, classification },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// Endpoint to get games
app.get('/api/college-football/games', async (req, res) => {
  try {
    const { year, seasonType, week, division } = req.query;
    const response = await apiClient.get('/games', {
      params: { year, seasonType, week, division },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
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

// New endpoint to get SP+ ratings
app.get('/api/ratings/sp', async (req, res) => {
  try {
    const { year, team } = req.query;
    const params = {};
    if (year) params.year = year;
    if (team) params.team = team;

    const response = await apiClient.get('/ratings/sp', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SP+ ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New endpoints for additional metrics and ratings data

// Endpoint to get historical SRS ratings
app.get('/api/ratings/srs', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/srs');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SRS ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get historical SP+ ratings by conference
app.get('/api/ratings/sp/conferences', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/sp/conferences');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SP+ ratings by conference:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get historical Elo ratings
app.get('/api/ratings/elo', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/elo');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Elo ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get historical FPI ratings
app.get('/api/ratings/fpi', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/fpi');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching FPI ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get predicted points (EP)
app.get('/api/ppa/predicted', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/predicted');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching predicted points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get Predicted Points Added (PPA/EPA) data by team
app.get('/api/ppa/teams', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/teams');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching PPA data by team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get Team Predicted Points Added (PPA/EPA) by game
app.get('/api/ppa/games', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/games');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching PPA data by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get Player Predicted Points Added (PPA/EPA) by game
app.get('/api/ppa/players/games', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/players/games');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player PPA data by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get Player Predicted Points Added (PPA/EPA) by season
app.get('/api/ppa/players/season', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/players/season');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player PPA data by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get field goal expected points
app.get('/api/metrics/fg/ep', async (_req, res) => {
  try {
    const response = await apiClient.get('/metrics/fg/ep');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching field goal expected points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get win probability chart data
app.get('/api/metrics/wp', async (_req, res) => {
  try {
    const response = await apiClient.get('/metrics/wp');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching win probability chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get pregame win probability data
app.get('/api/metrics/wp/pregame', async (req, res) => {
  try {
    const { year, week, seasonType } = req.query;
    const response = await apiClient.get('/metrics/wp/pregame', {
      params: { year, week, seasonType },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching pregame win probability data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get team statistics by season
app.get('/api/stats/season', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/season');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team statistics by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get advanced team metrics by season
app.get('/api/stats/season/advanced', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/season/advanced');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching advanced team metrics by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get advanced team metrics by game
app.get('/api/stats/game/advanced', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/game/advanced');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching advanced team metrics by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get team stat categories
app.get('/api/stats/categories', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/categories');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team stat categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get historical polls and rankings
app.get('/api/rankings', async (_req, res) => {
  try {
    const response = await apiClient.get('/rankings');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical rankings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get player stats
app.get('/api/stats/player/season', async (req, res) => {
  try {
    const { year, team, seasonType, category } = req.query;
    if (!year || !team || !seasonType || !category) {
      return res.status(400).json({ error: 'year, team, seasonType, and category query parameters are required' });
    }

    const response = await apiClient.get('/stats/player/season', {
      params: { year, team, seasonType, category },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get player game stats
app.get('/api/stats/player/game', async (req, res) => {
  const { year, week, seasonType, team, conference, category, gameId } = req.query;
  try {
    const response = await apiClient.get('/games/players', { params: { year, week, seasonType, team, conference, category, gameId } });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player game stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to get advanced box score data
app.get('/api/college-football/game/box/advanced', async (req, res) => {
  try {
    const { gameId } = req.query;
    if (!gameId) {
      return res.status(400).json({ error: 'gameId query parameter is required' });
    }

    const response = await apiClient.get('/game/box/advanced', {
      params: { gameId },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching advanced box score data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint to verify environment variable
app.get('/test-env', (_req, res) => {
  res.send(`REACT_APP_API_BASE_URL: ${process.env.REACT_APP_API_BASE_URL}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











