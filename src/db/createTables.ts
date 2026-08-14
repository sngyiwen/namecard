// Single source of truth for table structure, matching src/db/schema.ts.
// Run against any SQLite connection (expo-sqlite in the app, better-sqlite3 in tests).
export const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS name_card (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  telegram_handle TEXT NOT NULL DEFAULT '',
  x_handle TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS encounters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person_name TEXT NOT NULL,
  place TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  consent INTEGER NOT NULL,
  selfie_uri TEXT,
  created_at INTEGER NOT NULL
);
`;
