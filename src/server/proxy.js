const express = require('express');
const axios = require('axios').default;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const corsOptions = {
  origin: 'https://swaincfbanalytics.netlify.app', // replace with your Netlify domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Enable CORS with specific options for all routes
app.options('*', cors(corsOptions)); // Handle preflight requests

// Setup axios instance with the base URL and headers for the College Football Data API
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.collegefootballdata.com',
  headers: {
    'Authorization': 'Bearer XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ',
    'Content-Type': 'application/json',
  },
});

// Proxy endpoint to forward requests to the Heroku CDN
app.use('/proxy/heroku-cdn/*', async (req, res) => {
  try {
    const url = `https://my-betting-bot-davlen.herokuapp.com/${req.params[0]}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: 'Bearer XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ',
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
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
        params: {
          year,
          seasonType,
          week,
        },
      }),
      apiClient.get('/teams/fbs'),
    ]);

    // Create a map of teams keyed by team name
    const teamsMap = teamsResponse.data.reduce((acc, team) => {
      acc[team.school] = team;
      return acc;
    }, {});

    // Enrich the games data with team details and include scores
    const enrichedGames = gamesResponse.data.map(game => {
      const homeTeamData = teamsMap[game.home_team] || null;
      const awayTeamData = teamsMap[game.away_team] || null;

      return {
        ...game,
        home_team: homeTeamData,
        away_team: awayTeamData,
        homeScore: game.home_points, // Replace with actual field name if different
        awayScore: game.away_points  // Replace with actual field name if different
      };
    });

    res.json(enrichedGames);
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get records
app.get('/api/college-football/records', async (req, res) => {
  try {
    const year = req.query.year || 2023; // Use the provided year or set a default (2023 in this case)

    const response = await apiClient.get('/records', {
      params: {
        year, // Include the year parameter
      },
    });

    res.json(response.data); // Send the fetched data back to the client
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
      params: {
        year,
        seasonType,
        week,
      },
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

    const response = await apiClient.get(`/roster`, {
      params: {
        team: teamId, // Include the teamId parameter
      },
    });

    res.json(response.data); // Send the fetched data back to the client
  } catch (error) {
    console.error('Error fetching roster:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






