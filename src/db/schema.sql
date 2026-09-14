CREATE TABLE IF NOT EXISTS acting_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  role_type TEXT CHECK(role_type IN ('Lead', 'Supporting', 'Background', 'Voiceover')),
  production_type TEXT CHECK(production_type IN ('Film', 'TV', 'Theater', 'Commercial')),
  pay_rate TEXT NOT NULL,
  location TEXT NOT NULL,
  submission_deadline DATE NOT NULL,
  status TEXT DEFAULT 'Open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data
INSERT INTO acting_jobs (title, role_type, production_type, pay_rate, location, submission_deadline)
VALUES
  ('Indie Feature - "Echoes"', 'Lead', 'Film', '$350/day', 'New York, NY', '2026-10-15'),
  ('National Commercial Spot', 'Supporting', 'Commercial', '$1,200/flat', 'Remote / Self-Tape', '2026-09-30'),
  ('Off-Broadway Drama', 'Lead', 'Theater', '$600/wk', 'Chicago, IL', '2026-10-01');
