import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Redis from 'ioredis';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OMDB_API_KEY = process.env.OMDB_API_KEY; // Set your key in .env (e.g. OMDB_API_KEY=your_key)
const CACHE_EXPIRATION = 3600; // Cache TTL in seconds (1 hour)

app.use(cors());
app.use(express.json());

// -----------------------------------------------------------------------------
// 1. Database Setup (SQLite)
// -----------------------------------------------------------------------------
const db = new Database('movies.db');

// Create table matching OMDb API response structure
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
  )
`);

// Prepared statement for SQL Injection protection and fast inserts
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

// -----------------------------------------------------------------------------
// 2. Redis Cache Setup
// -----------------------------------------------------------------------------
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

redis.on('error', (err) => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Connected to Redis'));

// -----------------------------------------------------------------------------
// 3. API Endpoints
// -----------------------------------------------------------------------------

/**
 * GET /api/movies/search?s=batman
 * Search movies by keyword via OMDb
 */
app.get('/api/movies/search', async (req, res) => {
  const searchTerm = req.query.s || req.query.query;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Query parameter "s" or "query" is required' });
  }

  const cacheKey = `omdb:search:${searchTerm.toLowerCase().trim()}`;

  try {
    // Step 1: Check Redis Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[REDIS HIT] Search query: "${searchTerm}"`);
      return res.json(JSON.parse(cachedData));
    }

    console.log(`[REDIS MISS] Querying OMDb API: "${searchTerm}"`);

    // Step 2: Query OMDb API
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '74efadf3',
        s: searchTerm,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error || 'No movies found' });
    }

    const moviesList = response.data.Search;

    // Step 3: Cache result in Redis
    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(moviesList));

    return res.json(moviesList);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies from server' });
  }
});

/**
 * GET /api/movies/:id
 * Get detailed movie info by IMDb ID (e.g., /api/movies/tt0371746)
 */
app.get('/api/movies/:id', async (req, res) => {
  const imdbID = req.params.id;
  const cacheKey = `omdb:movie:${imdbID}`;

  try {
    // Step 1: Check Redis Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[REDIS HIT] Movie ID: ${imdbID}`);
      return res.json(JSON.parse(cachedData));
    }

    // Step 2: Check Local SQLite Database
    const localMovie = db.prepare('SELECT * FROM movies WHERE imdbID = ?').get(imdbID);
    if (localMovie) {
      console.log(`[SQLITE HIT] Movie ID: ${imdbID}`);
      // Populate Redis cache for subsequent fast reads
      await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(localMovie));
      return res.json(localMovie);
    }

    console.log(`[API FETCH] Querying OMDb API for ID: ${imdbID}`);

    // Step 3: Fetch fresh data from OMDb API
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '74efadf3',
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

    // Step 4: Persist in SQLite
    upsertMovieStmt.run(movieData);

    // Step 5: Store in Redis Cache
    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(movieData));

    return res.json(movieData);
  } catch (error) {
    console.error(`Error fetching movie ${imdbID}:`, error.message);
    res.status(500).json({ error: 'Server error retrieving movie details' });
  }
});

// -----------------------------------------------------------------------------
// 4. Server Start
// -----------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
