import { initDb, run, all } from './db.js';
import { TOURNAMENTS } from './data.js';

// Women's data may not exist yet during initial setup
let WTA_TOURNAMENTS = [];
try {
  const wta = await import('./data-women.js');
  WTA_TOURNAMENTS = wta.WTA_TOURNAMENTS;
} catch {
  console.warn('data-women.js not found, seeding ATP only');
}

await initDb();
await run('DELETE FROM tournaments');

function dedup(arr, tourDefault) {
  const seen = new Set();
  return arr.filter(t => {
    if (!t.winner || t.winner.startsWith('N/A')) return false;
    const key = `${tourDefault}-${t.year}-${t.name}-${t.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(t => ({ ...t, tour: t.tour ?? tourDefault }));
}

const atp = dedup(TOURNAMENTS, 'ATP');
const wta = dedup(WTA_TOURNAMENTS, 'WTA');
const all_records = [...atp, ...wta];

for (const t of all_records) {
  await run(
    `INSERT INTO tournaments (year, name, category, surface, tour, winner, runner_up, winner_nationality, runner_up_nationality, score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [t.year, t.name, t.category, t.surface, t.tour, t.winner, t.runner_up,
     t.winner_nationality ?? '', t.runner_up_nationality ?? '', t.score ?? null]
  );
}

console.log(`Seeded ${atp.length} ATP + ${wta.length} WTA = ${all_records.length} total records.`);
process.exit(0);
