import Database from 'better-sqlite3';

const db = new Database('database.sqlite');

// 1. Create Gigs Table
db.exec(`
  CREATE TABLE IF NOT EXISTS acting_gigs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    role_type TEXT NOT NULL,
    production_type TEXT NOT NULL,
    pay_rate TEXT NOT NULL,
    location TEXT NOT NULL,
    submission_deadline TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. Mock Data Array across target cities
const mockGigs = [
  // Los Angeles, CA
  {
    title: 'Neon Nights (Indie Feature)',
    role_type: 'Lead',
    production_type: 'Film',
    pay_rate: '$650/day',
    location: 'Los Angeles, CA',
    submission_deadline: '2026-10-15'
  },
  {
    title: 'Commercial: Tech Wearables',
    role_type: 'Commercial',
    production_type: 'Commercial',
    pay_rate: '$1,200 total',
    location: 'Los Angeles, CA',
    submission_deadline: '2026-09-30'
  },

  // New York, NY
  {
    title: 'Subway Chronicles (Off-Broadway)',
    role_type: 'Supporting',
    production_type: 'Theater',
    pay_rate: '$850/wk',
    location: 'NYC, NY',
    submission_deadline: '2026-10-01'
  },
  {
    title: 'Voiceover: Animated Pilot',
    role_type: 'Voiceover',
    production_type: 'Voiceover',
    pay_rate: '$400/hr',
    location: 'NYC, NY',
    submission_deadline: '2026-09-28'
  },

  // Atlanta, GA
  {
    title: 'Southern Gothic Drama - Season 2',
    role_type: 'Supporting',
    production_type: 'TV',
    pay_rate: '$1,100/day',
    location: 'Atlanta, GA',
    submission_deadline: '2026-10-10'
  },
  {
    title: 'Action Thriller Background Talent',
    role_type: 'Background',
    production_type: 'Film',
    pay_rate: '$220/day',
    location: 'Atlanta, GA',
    submission_deadline: '2026-09-25'
  },

  // Philadelphia, PA
  {
    title: 'Historical Drama Revival',
    role_type: 'Lead',
    production_type: 'Theater',
    pay_rate: '$700/wk',
    location: 'Philadelphia, PA',
    submission_deadline: '2026-10-20'
  },

  // Las Vegas, NV
  {
    title: 'Immersive Hotel Show Cast',
    role_type: 'Lead',
    production_type: 'Live Show',
    pay_rate: '$1,500/wk',
    location: 'Las Vegas, NV',
    submission_deadline: '2026-11-01'
  },

  // Houston, TX
  {
    title: 'Hospitality National Spot',
    role_type: 'Commercial',
    production_type: 'Commercial',
    pay_rate: '$900/day',
    location: 'Houston, TX',
    submission_deadline: '2026-10-05'
  }
];

// 3. Seed Database
const insertStmt = db.prepare(`
  INSERT INTO acting_gigs (title, role_type, production_type, pay_rate, location, submission_deadline)
  VALUES (@title, @role_type, @production_type, @pay_rate, @location, @submission_deadline)
`);

const seedDatabase = db.transaction((gigs) => {
  db.prepare('DELETE FROM acting_gigs').run(); // Clear existing
  for (const gig of gigs) insertStmt.run(gig);
});

seedDatabase(mockGigs);
console.log(`Successfully seeded ${mockGigs.length} acting gigs across LA, NYC, Atlanta, Philly, Vegas, and Houston.`);
