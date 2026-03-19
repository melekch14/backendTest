CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_kyc (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  profile_photo TEXT,
  driver_license TEXT,
  identity_card TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);