import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'tennis.db');

const raw = new sqlite3.Database(DB_PATH);

// Promisify the core methods
const run = (sql, params = []) => new Promise((res, rej) =>
  raw.run(sql, params, function(err) { err ? rej(err) : res(this); })
);
const all = (sql, params = []) => new Promise((res, rej) =>
  raw.all(sql, params, (err, rows) => err ? rej(err) : res(rows))
);
const exec = (sql) => new Promise((res, rej) =>
  raw.exec(sql, err => err ? rej(err) : res())
);

export async function initDb() {
  await exec(`
    CREATE TABLE IF NOT EXISTS tournaments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      surface TEXT NOT NULL,
      tour TEXT NOT NULL DEFAULT 'ATP',
      winner TEXT NOT NULL,
      runner_up TEXT NOT NULL,
      winner_nationality TEXT,
      runner_up_nationality TEXT,
      score TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_year ON tournaments(year);
    CREATE INDEX IF NOT EXISTS idx_category ON tournaments(category);
    CREATE INDEX IF NOT EXISTS idx_tour ON tournaments(tour);
    CREATE INDEX IF NOT EXISTS idx_winner ON tournaments(winner);
    CREATE INDEX IF NOT EXISTS idx_runner_up ON tournaments(runner_up);
  `);
}

export { run, all, exec };
