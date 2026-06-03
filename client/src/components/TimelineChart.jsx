import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { useApi } from '../hooks/useApi.js';

const PLAYER_COLORS = [
  '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#84CC16', '#06B6D4',
];

const TOP_PLAYERS = [
  'Novak Djokovic', 'Roger Federer', 'Rafael Nadal',
  'Andy Murray', 'Carlos Alcaraz', 'Daniil Medvedev',
  'Alexander Zverev', 'Jannik Sinner', 'Lleyton Hewitt',
  'Andre Agassi',
];

export default function TimelineChart({ meta }) {
  const [selected, setSelected] = useState(['Novak Djokovic', 'Roger Federer', 'Rafael Nadal']);
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('cumulative');

  // Fetch timeline for all selected players
  const queries = selected.map(p =>
    `/api/timeline?player=${encodeURIComponent(p)}${category ? `&category=${encodeURIComponent(category)}` : ''}`
  );

  const results = queries.map(q => useApi(q, [q]));
  const allLoaded = results.every(r => !r.loading);

  // Build combined year data
  const allYears = new Set();
  for (let y = 2000; y <= 2024; y++) allYears.add(y);

  const chartData = [...allYears].sort().map(year => {
    const point = { year };
    selected.forEach((p, i) => {
      const yearRow = results[i].data?.find(r => r.year === year);
      point[`${p}_wins`] = yearRow?.wins ?? 0;
      point[`${p}_ru`] = yearRow?.runner_ups ?? 0;
    });
    return point;
  });

  // Convert to cumulative
  if (mode === 'cumulative') {
    const cumulative = {};
    for (const point of chartData) {
      selected.forEach(p => {
        cumulative[p] = (cumulative[p] || 0) + point[`${p}_wins`];
        point[`${p}_wins`] = cumulative[p];
      });
    }
  }

  const togglePlayer = (p) => {
    setSelected(s => s.includes(p) ? s.filter(x => x !== p) : [...s, p]);
  };

  const availablePlayers = meta?.players || TOP_PLAYERS;
  const suggestedPlayers = TOP_PLAYERS.filter(p => availablePlayers.includes(p));

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="card">
        <div className="flex flex-wrap gap-4 items-start">
          <div>
            <div className="text-xs text-slate-400 mb-2">Quick select players</div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPlayers.map((p, i) => (
                <button
                  key={p}
                  onClick={() => togglePlayer(p)}
                  className={`btn text-xs ${selected.includes(p) ? 'text-white' : 'btn-inactive'}`}
                  style={selected.includes(p) ? { background: PLAYER_COLORS[suggestedPlayers.indexOf(p) % PLAYER_COLORS.length] } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-slate-400">Mode</div>
            <div className="flex gap-1">
              <button onClick={() => setMode('cumulative')} className={`btn text-xs ${mode==='cumulative' ? 'btn-active' : 'btn-inactive'}`}>Cumulative</button>
              <button onClick={() => setMode('yearly')} className={`btn text-xs ${mode==='yearly' ? 'btn-active' : 'btn-inactive'}`}>Per Year</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-slate-400">Category</div>
            <div className="flex gap-1">
              <button onClick={() => setCategory('')} className={`btn text-xs ${!category ? 'btn-active' : 'btn-inactive'}`}>All</button>
              <button onClick={() => setCategory('Grand Slam')} className={`btn text-xs ${category==='Grand Slam' ? 'btn-active' : 'btn-inactive'}`}>Grand Slams</button>
              <button onClick={() => setCategory('Masters 1000')} className={`btn text-xs ${category==='Masters 1000' ? 'btn-active' : 'btn-inactive'}`}>Masters 1000</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          {mode === 'cumulative' ? 'Cumulative Titles Over Time' : 'Titles Per Year'}
        </h3>
        {!allLoaded ? (
          <div className="h-80 flex items-center justify-center text-slate-500">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                itemStyle={{ color: '#94a3b8' }}
                formatter={(val, name) => [val, name.replace('_wins', '').replace(/_/g, ' ')]}
              />
              <Legend
                formatter={(val) => val.replace('_wins', '').replace(/_/g, ' ')}
                wrapperStyle={{ color: '#94a3b8', fontSize: 12 }}
              />
              {selected.map((p, i) => (
                <Line
                  key={p}
                  type="monotone"
                  dataKey={`${p}_wins`}
                  name={p}
                  stroke={PLAYER_COLORS[i % PLAYER_COLORS.length]}
                  strokeWidth={2.5}
                  dot={mode === 'yearly' ? { r: 4, fill: PLAYER_COLORS[i % PLAYER_COLORS.length] } : false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
