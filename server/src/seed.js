import { initDb, run, all } from './db.js';
import { TOURNAMENTS } from './data.js';

await initDb();
await run('DELETE FROM tournaments');

// Filter cancelled tournaments and deduplicate
const seen = new Set();
const valid = TOURNAMENTS.filter(t => {
  if (t.winner.startsWith('N/A')) return false;
  const key = `${t.year}-${t.name}-${t.category}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

for (const t of valid) {
  await run(
    `INSERT INTO tournaments (year, name, category, surface, winner, runner_up, winner_nationality, runner_up_nationality, score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [t.year, t.name, t.category, t.surface, t.winner, t.runner_up, t.winner_nationality ?? '', t.runner_up_nationality ?? '', t.score ?? null]
  );
}

console.log(`Seeded ${valid.length} tournament records.`);
process.exit(0);
