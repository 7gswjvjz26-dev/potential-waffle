import express from 'express';
import cors from 'cors';
import { initDb, all } from './db.js';
import { BIRTH_YEARS } from './birthYears.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

await initDb();

// Build WHERE clause — supports tour, category, surface, year range, tournament, player
function buildWhere(query) {
  const parts = [];
  const params = [];
  const { tour, category, surface, year_from, year_to, player, tournament } = query;
  if (tour && tour !== 'Both') { parts.push('tour = ?'); params.push(tour); }
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
    const { tour, category, surface, year_from, year_to } = req.query;
    const parts = [];
    const params = [];
    if (tour && tour !== 'Both') { parts.push('tour = ?'); params.push(tour); }
    if (category) { parts.push('category = ?'); params.push(category); }
    if (surface) { parts.push('surface = ?'); params.push(surface); }
    if (year_from) { parts.push('year >= ?'); params.push(Number(year_from)); }
    if (year_to) { parts.push('year <= ?'); params.push(Number(year_to)); }
    const where = parts.length ? 'WHERE ' + parts.join(' AND ') : '';

    // Dynamically label the non-GS column based on tour
    const nonSlamCat = (!tour || tour === 'Both') ? "category != 'Grand Slam'" :
      tour === 'WTA' ? "category IN ('WTA 1000','WTA 500')" : "category = 'Masters 1000'";

    const wins = await all(`
      SELECT winner AS player, winner_nationality AS nationality, tour,
             COUNT(*) AS wins,
             SUM(CASE WHEN category='Grand Slam' THEN 1 ELSE 0 END) AS slam_wins,
             SUM(CASE WHEN ${nonSlamCat} THEN 1 ELSE 0 END) AS tour_wins
      FROM tournaments ${where}
      GROUP BY winner ORDER BY wins DESC LIMIT 40
    `, params);

    const rus = await all(`
      SELECT runner_up AS player, runner_up_nationality AS nationality, tour,
             COUNT(*) AS runner_ups,
             SUM(CASE WHEN category='Grand Slam' THEN 1 ELSE 0 END) AS slam_ru,
             SUM(CASE WHEN ${nonSlamCat} THEN 1 ELSE 0 END) AS tour_ru
      FROM tournaments ${where}
      GROUP BY runner_up ORDER BY runner_ups DESC LIMIT 40
    `, params);

    const map = new Map();
    for (const r of wins) {
      map.set(r.player, { player: r.player, nationality: r.nationality, tour: r.tour, wins: r.wins, slam_wins: r.slam_wins, tour_wins: r.tour_wins, runner_ups: 0, slam_ru: 0, tour_ru: 0 });
    }
    for (const r of rus) {
      if (map.has(r.player)) {
        const e = map.get(r.player);
        e.runner_ups = r.runner_ups; e.slam_ru = r.slam_ru; e.tour_ru = r.tour_ru;
      } else {
        map.set(r.player, { player: r.player, nationality: r.nationality, tour: r.tour, wins: 0, slam_wins: 0, tour_wins: 0, runner_ups: r.runner_ups, slam_ru: r.slam_ru, tour_ru: r.tour_ru });
      }
    }

    const results = [...map.values()]
      .map(r => ({ ...r, finals: r.wins + r.runner_ups }))
      .sort((a, b) => b.wins - a.wins || b.runner_ups - a.runner_ups)
      .slice(0, 30);

    res.json(results);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/player/:name
app.get('/api/player/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const wins = await all('SELECT * FROM tournaments WHERE winner = ? ORDER BY year, name', [name]);
    const runner_ups = await all('SELECT * FROM tournaments WHERE runner_up = ? ORDER BY year, name', [name]);
    const birth_year = BIRTH_YEARS[name] ?? null;

    // Build age-based stats if birth year is known
    let byAge = [];
    if (birth_year) {
      const ageMap = {};
      for (const t of wins) {
        const age = t.year - birth_year;
        if (!ageMap[age]) ageMap[age] = { age, wins: 0, runner_ups: 0 };
        ageMap[age].wins++;
      }
      for (const t of runner_ups) {
        const age = t.year - birth_year;
        if (!ageMap[age]) ageMap[age] = { age, wins: 0, runner_ups: 0 };
        ageMap[age].runner_ups++;
      }
      // Fill gaps and add cumulative titles
      const ages = Object.values(ageMap).sort((a, b) => a.age - b.age);
      const minAge = ages[0]?.age ?? 0;
      const maxAge = ages[ages.length - 1]?.age ?? 0;
      let cumulative = 0;
      for (let age = minAge; age <= maxAge; age++) {
        const entry = ageMap[age] ?? { age, wins: 0, runner_ups: 0 };
        cumulative += entry.wins;
        byAge.push({ ...entry, cumulative });
      }
    }

    res.json({ wins, runner_ups, birth_year, byAge });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/meta — respects tour filter so tournament list stays relevant
app.get('/api/meta', async (req, res) => {
  try {
    const { tour } = req.query;
    const tourWhere = (tour && tour !== 'Both') ? `WHERE tour = '${tour.replace(/'/g, "''")}'` : '';
    const years = (await all('SELECT DISTINCT year FROM tournaments ORDER BY year')).map(r => r.year);
    const tournaments = (await all(`SELECT DISTINCT name FROM tournaments ${tourWhere} ORDER BY name`)).map(r => r.name);
    const players = (await all(`
      SELECT DISTINCT player FROM (
        SELECT winner AS player FROM tournaments ${tourWhere}
        UNION SELECT runner_up FROM tournaments ${tourWhere}
      ) ORDER BY player
    `)).map(r => r.player);
    res.json({ years, tournaments, players });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/timeline
app.get('/api/timeline', async (req, res) => {
  try {
    const { player = '', category, tour } = req.query;
    const params = [player, player, player, player];
    let sql = `
      SELECT year,
        SUM(CASE WHEN winner=? THEN 1 ELSE 0 END) AS wins,
        SUM(CASE WHEN runner_up=? THEN 1 ELSE 0 END) AS runner_ups
      FROM tournaments
      WHERE (winner=? OR runner_up=?)
    `;
    if (category) { sql += ' AND category=?'; params.push(category); }
    if (tour && tour !== 'Both') { sql += ' AND tour=?'; params.push(tour); }
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
