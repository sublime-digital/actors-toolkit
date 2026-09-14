import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Redis from 'ioredis';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OMDB_API_KEY = process.env.OMDB_API_KEY || '74efadf3';
const CACHE_EXPIRATION = 3600;

app.use(cors());
app.use(express.json());

const db = new Database('movies.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    imdbID TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    year TEXT,
    rated TEXT,
    released TEXT,
    runtime TEXT,
    genre TEXT,
    director TEXT,
    actors TEXT,
    plot TEXT,
    poster TEXT,
    imdbRating TEXT,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS acting_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    role_type TEXT CHECK(role_type IN ('Lead', 'Supporting', 'Background', 'Voiceover', 'Commercial')),
    production_type TEXT CHECK(production_type IN ('Film', 'TV', 'Theater', 'Commercial', 'Voiceover', 'Live Show')),
    pay_rate TEXT NOT NULL,
    location TEXT NOT NULL,
    submission_deadline DATE NOT NULL,
    status TEXT DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const existingGigsCount = db.prepare('SELECT COUNT(*) AS count FROM acting_jobs').get().count;
if (existingGigsCount === 0) {
  const seedGig = db.prepare(`
    INSERT INTO acting_jobs (title, role_type, production_type, pay_rate, location, submission_deadline)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const mockGigs = [
    ['Neon Nights (Indie Feature)', 'Lead', 'Film', '$650/day', 'Los Angeles, CA', '2026-10-15'],
    ['Commercial: Tech Wearables', 'Commercial', 'Commercial', '$1,200 total', 'Los Angeles, CA', '2026-09-30'],
    ['Subway Chronicles (Off-Broadway)', 'Supporting', 'Theater', '$850/wk', 'NYC, NY', '2026-10-01'],
    ['Voiceover: Animated Pilot', 'Voiceover', 'Voiceover', '$400/hr', 'NYC, NY', '2026-09-28'],
    ['Southern Gothic Drama - Season 2', 'Supporting', 'TV', '$1,100/day', 'Atlanta, GA', '2026-10-10'],
    ['Action Thriller Background Talent', 'Background', 'Film', '$220/day', 'Atlanta, GA', '2026-09-25'],
    ['Historical Drama Revival', 'Lead', 'Theater', '$700/wk', 'Philadelphia, PA', '2026-10-20'],
    ['Immersive Hotel Show Cast', 'Lead', 'Live Show', '$1,500/wk', 'Las Vegas, NV', '2026-11-01'],
    ['Hospitality National Spot', 'Commercial', 'Commercial', '$900/day', 'Houston, TX', '2026-10-05']
  ];

  for (const gig of mockGigs) {
    seedGig.run(...gig);
  }
  console.log('Successfully seeded database with acting gigs across target cities.');
}

const upsertMovieStmt = db.prepare(`
  INSERT INTO movies (imdbID, title, year, rated, released, runtime, genre, director, actors, plot, poster, imdbRating)
  VALUES (@imdbID, @title, @year, @rated, @released, @runtime, @genre, @director, @actors, @plot, @poster, @imdbRating)
  ON CONFLICT(imdbID) DO UPDATE SET
    title = excluded.title,
    year = excluded.year,
    rated = excluded.rated,
    released = excluded.released,
    runtime = excluded.runtime,
    genre = excluded.genre,
    director = excluded.director,
    actors = excluded.actors,
    plot = excluded.plot,
    poster = excluded.poster,
    imdbRating = excluded.imdbRating,
    updatedAt = CURRENT_TIMESTAMP
`);

function requireProTier(req, res, next) {
  const userTier = req.headers['x-user-tier'];
  if (userTier !== 'pro') {
    return res.status(403).json({ error: 'Access denied. Pro tier subscription required.' });
  }
  next();
}

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

redis.on('error', (err) => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Connected to Redis'));

app.get('/api/gigs', requireProTier, (req, res) => {
  try {
    const { city, search } = req.query;
    let query = 'SELECT * FROM acting_jobs WHERE 1=1';
    const params = [];

    if (city && city !== 'ALL') {
      query += ' AND location LIKE ?';
      params.push(`%${city}%`);
    }

    if (search) {
      query += ' AND (title LIKE ? OR role_type LIKE ? OR production_type LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY submission_deadline ASC';

    const stmt = db.prepare(query);
    const jobs = stmt.all(...params);
    return res.json(jobs);
  } catch (err) {
    console.error('Error fetching acting jobs:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve acting jobs.' });
  }
});

app.get('/api/movies/search', async (req, res) => {
  const searchTerm = req.query.s || req.query.query;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Query parameter "s" or "query" is required' });
  }

  const cacheKey = `omdb:search:${searchTerm.toLowerCase().trim()}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[REDIS HIT] Search query: "${searchTerm}"`);
      return res.json(JSON.parse(cachedData));
    }

    console.log(`[REDIS MISS] Querying OMDb API: "${searchTerm}"`);

    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: searchTerm,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error || 'No movies found' });
    }

    const moviesList = response.data.Search;
    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(moviesList));
    return res.json(moviesList);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies from server' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const imdbID = req.params.id;
  const cacheKey = `omdb:movie:${imdbID}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[REDIS HIT] Movie ID: ${imdbID}`);
      return res.json(JSON.parse(cachedData));
    }

    const localMovie = db.prepare('SELECT * FROM movies WHERE imdbID = ?').get(imdbID);
    if (localMovie) {
      console.log(`[SQLITE HIT] Movie ID: ${imdbID}`);
      await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(localMovie));
      return res.json(localMovie);
    }

    console.log(`[API FETCH] Querying OMDb API for ID: ${imdbID}`);

    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error || 'Movie not found' });
    }

    const movieData = {
      imdbID: response.data.imdbID,
      title: response.data.Title,
      year: response.data.Year,
      rated: response.data.Rated,
      released: response.data.Released,
      runtime: response.data.Runtime,
      genre: response.data.Genre,
      director: response.data.Director,
      actors: response.data.Actors,
      plot: response.data.Plot,
      poster: response.data.Poster !== 'N/A' ? response.data.Poster : null,
      imdbRating: response.data.imdbRating,
    };

    upsertMovieStmt.run(movieData);
    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(movieData));
    return res.json(movieData);
  } catch (error) {
    console.error(`Error fetching movie ${imdbID}:`, error.message);
    res.status(500).json({ error: 'Server error retrieving movie details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
