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

const apiClient = axios.create({
  baseURL: 'https://api.collegefootballdata.com',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_CFB_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

let allTeams = [];

const loadAllTeams = async () => {
  try {
    const response = await apiClient.get('/teams/fbs');
    allTeams = response.data.map(team => team.school);
    console.log('All teams loaded:', allTeams);
  } catch (error) {
    console.error('Error fetching all teams:', error);
  }
};

// Call loadAllTeams when the server starts
loadAllTeams();

const extractTeamsFromQuestion = (question) => {
  return allTeams.filter(team => question.toLowerCase().includes(team.toLowerCase()));
};

const getTeamRecord = async (team, year) => {
  try {
    const response = await apiClient.get('/records', { params: { year } });
    const data = response.data;
    const teamData = data.find(d => d.team.toLowerCase() === team.toLowerCase());
    if (!teamData) {
      return `No data found for ${team} in ${year}.`;
    }
    return `${team}'s record in ${year}: ${teamData.total.wins} wins, ${teamData.total.losses} losses, ${teamData.total.ties} ties.`;
  } catch (error) {
    console.error('Error fetching team record:', error);
    return 'Internal server error';
  }
};

const compareRecords = async (team1, team2, year) => {
  try {
    const response = await apiClient.get('/records', { params: { year } });
    const data = response.data;
    const team1Data = data.find(d => d.team.toLowerCase() === team1.toLowerCase());
    const team2Data = data.find(d => d.team.toLowerCase() === team2.toLowerCase());

    if (!team1Data || !team2Data) {
      return 'Unable to find data for one or both teams.';
    }

    return `
      Comparison of ${team1} and ${team2} records in ${year}:
      - ${team1}: ${team1Data.total.wins} wins, ${team1Data.total.losses} losses, ${team1Data.total.ties} ties
      - ${team2}: ${team2Data.total.wins} wins, ${team2Data.total.losses} losses, ${team2Data.total.ties} ties
    `;
  } catch (error) {
    console.error('Error comparing records:', error);
    return 'Internal server error';
  }
};

const processQuestion = async (question) => {
  console.log('Received question:', question);
  if (!allTeams.length) {
    console.error('All teams not loaded yet.');
    return 'The server is still loading team data, please try again in a moment.';
  }

  const yearMatch = question.match(/\b\d{4}\b/);
  const year = yearMatch ? yearMatch[0] : new Date().getFullYear();
  const teams = extractTeamsFromQuestion(question);

  if (question.includes('compare') || question.includes('vs')) {
    console.log('Extracted teams for comparison:', teams);
    if (teams.length === 2) {
      const result = await compareRecords(teams[0], teams[1], year);
      console.log('Comparison result:', result);
      return result;
    } else {
      return 'Please specify two teams to compare.';
    }
  } else if (question.includes('record') || question.includes('wins') || question.includes('losses')) {
    console.log('Extracted teams for record retrieval:', teams);
    if (teams.length === 1) {
      const result = await getTeamRecord(teams[0], year);
      return result;
    } else {
      return 'Please specify one team to get the record.';
    }
  }

  return 'Sorry, I can only compare teams or provide team records for now.';
};

app.post('/api/chatbot', async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await processQuestion(question);
    res.json({ answer });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Other existing endpoints
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

app.get('/api/college-football/teams-fbs', async (_req, res) => {
  try {
    const response = await apiClient.get('/teams/fbs');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from College Football Data API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

app.get('/api/ratings/srs', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/srs');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SRS ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ratings/sp/conferences', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/sp/conferences');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching SP+ ratings by conference:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ratings/elo', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/elo');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Elo ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ratings/fpi', async (_req, res) => {
  try {
    const response = await apiClient.get('/ratings/fpi');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching FPI ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ppa/predicted', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/predicted');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching predicted points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ppa/teams', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/teams');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching PPA data by team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ppa/games', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/games');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching PPA data by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ppa/players/games', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/players/games');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player PPA data by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ppa/players/season', async (_req, res) => {
  try {
    const response = await apiClient.get('/ppa/players/season');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player PPA data by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/metrics/fg/ep', async (_req, res) => {
  try {
    const response = await apiClient.get('/metrics/fg/ep');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching field goal expected points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/metrics/wp', async (_req, res) => {
  try {
    const response = await apiClient.get('/metrics/wp');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching win probability chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

app.get('/api/stats/season', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/season');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team statistics by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stats/season/advanced', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/season/advanced');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching advanced team metrics by season:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stats/game/advanced', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/game/advanced');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching advanced team metrics by game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stats/categories', async (_req, res) => {
  try {
    const response = await apiClient.get('/stats/categories');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team stat categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/rankings', async (_req, res) => {
  try {
    const response = await apiClient.get('/rankings');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical rankings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

app.get('/api/college-football/lines', async (req, res) => {
  try {
    const { year, seasonType, week, team } = req.query;
    if (!year || !seasonType) {
      return res.status(400).json({ error: 'year and seasonType query parameters are required' });
    }

    const params = { year, seasonType };
    if (week) params.week = week;
    if (team) params.team = team;

    const response = await apiClient.get('/lines', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game lines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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













