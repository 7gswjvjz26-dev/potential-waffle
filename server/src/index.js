import express from 'express';
import cors from 'cors';
import { initDb, all } from './db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

await initDb();

// Helper to build WHERE clause from query params
function buildWhere(query) {
  const parts = [];
  const params = [];
  const { category, surface, year_from, year_to, player, tournament } = query;
  if (category) { parts.push('category = ?'); params.push(category); }
  if (surface) { parts.push('surface = ?'); params.push(surface); }
  if (year_from) { parts.push('year >= ?'); params.push(Number(year_from)); }
  if (year_to) { parts.push('year <= ?'); params.push(Number(year_to)); }
  if (tournament) { parts.push('name = ?'); params.push(tournament); }
  if (player) { parts.push('(winner LIKE ? OR runner_up LIKE ?)'); params.push(`%${player}%`, `%${player}%`); }
  return { where: parts.length ? 'WHERE ' + parts.join(' AND ') : '', params };
}

// GET /api/tournaments
app.get('/api/tournaments', async (req, res) => {
  try {
    const { where, params } = buildWhere(req.query);
    const rows = await all(`SELECT * FROM tournaments ${where} ORDER BY year, category DESC, name`, params);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { category, surface, year_from, year_to } = req.query;
    const parts = [];
    const params = [];
    if (category) { parts.push('category = ?'); params.push(category); }
    if (surface) { parts.push('surface = ?'); params.push(surface); }
    if (year_from) { parts.push('year >= ?'); params.push(Number(year_from)); }
    if (year_to) { parts.push('year <= ?'); params.push(Number(year_to)); }
    const where = parts.length ? 'WHERE ' + parts.join(' AND ') : '';

    const wins = await all(`
      SELECT winner AS player, winner_nationality AS nationality,
             COUNT(*) AS wins,
             SUM(CASE WHEN category='Grand Slam' THEN 1 ELSE 0 END) AS slam_wins,
             SUM(CASE WHEN category='Masters 1000' THEN 1 ELSE 0 END) AS masters_wins
      FROM tournaments ${where}
      GROUP BY winner ORDER BY wins DESC LIMIT 30
    `, params);

    const rus = await all(`
      SELECT runner_up AS player, runner_up_nationality AS nationality,
             COUNT(*) AS runner_ups,
             SUM(CASE WHEN category='Grand Slam' THEN 1 ELSE 0 END) AS slam_ru,
             SUM(CASE WHEN category='Masters 1000' THEN 1 ELSE 0 END) AS masters_ru
      FROM tournaments ${where}
      GROUP BY runner_up ORDER BY runner_ups DESC LIMIT 30
    `, params);

    const map = new Map();
    for (const r of wins) {
      map.set(r.player, { player: r.player, nationality: r.nationality, wins: r.wins, slam_wins: r.slam_wins, masters_wins: r.masters_wins, runner_ups: 0, slam_ru: 0, masters_ru: 0 });
    }
    for (const r of rus) {
      if (map.has(r.player)) {
        const e = map.get(r.player);
        e.runner_ups = r.runner_ups; e.slam_ru = r.slam_ru; e.masters_ru = r.masters_ru;
      } else {
        map.set(r.player, { player: r.player, nationality: r.nationality, wins: 0, slam_wins: 0, masters_wins: 0, runner_ups: r.runner_ups, slam_ru: r.slam_ru, masters_ru: r.masters_ru });
      }
    }

    const results = [...map.values()]
      .map(r => ({ ...r, finals: r.wins + r.runner_ups }))
      .sort((a, b) => b.wins - a.wins || b.runner_ups - a.runner_ups)
      .slice(0, 25);

    res.json(results);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/player/:name
app.get('/api/player/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const wins = await all('SELECT * FROM tournaments WHERE winner = ? ORDER BY year, name', [name]);
    const runner_ups = await all('SELECT * FROM tournaments WHERE runner_up = ? ORDER BY year, name', [name]);
    res.json({ wins, runner_ups });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/meta
app.get('/api/meta', async (req, res) => {
  try {
    const years = (await all('SELECT DISTINCT year FROM tournaments ORDER BY year')).map(r => r.year);
    const tournaments = (await all('SELECT DISTINCT name FROM tournaments ORDER BY name')).map(r => r.name);
    const players = (await all(`
      SELECT DISTINCT player FROM (
        SELECT winner AS player FROM tournaments
        UNION SELECT runner_up FROM tournaments
      ) ORDER BY player
    `)).map(r => r.player);
    res.json({ years, tournaments, players });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/timeline
app.get('/api/timeline', async (req, res) => {
  try {
    const { player = '', category } = req.query;
    const params = [player, player];
    let sql = `
      SELECT year,
        SUM(CASE WHEN winner=? THEN 1 ELSE 0 END) AS wins,
        SUM(CASE WHEN runner_up=? THEN 1 ELSE 0 END) AS runner_ups
      FROM tournaments
      WHERE (winner=? OR runner_up=?)
    `;
    params.push(player, player);
    if (category) { sql += ' AND category=?'; params.push(category); }
    sql += ' GROUP BY year ORDER BY year';
    res.json(await all(sql, params));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Serve built client in production
const clientDist = join(__dirname, '..', '..', 'client', 'dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(join(clientDist, 'index.html')));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Tennis API running on port ${PORT}`));
