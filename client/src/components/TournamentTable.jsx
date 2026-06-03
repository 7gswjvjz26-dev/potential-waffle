import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import { FLAG_MAP } from './flags.js';

const SURFACE_COLOR = {
  Hard: 'bg-blue-900/50 text-blue-300',
  Clay: 'bg-orange-900/50 text-orange-300',
  Grass: 'bg-green-900/50 text-green-300',
  'Hard (i)': 'bg-violet-900/50 text-violet-300',
};

export default function TournamentTable({ filterParams, onSelectPlayer }) {
  const [sortCol, setSortCol] = useState('year');
  const [sortDir, setSortDir] = useState('asc');
  const { data, loading } = useApi(`/api/tournaments?${filterParams}`, [filterParams]);

  if (loading) return <div className="card animate-pulse h-64 bg-slate-800" />;
  if (!data?.length) return <div className="card text-center py-12 text-slate-500">No results match your filters.</div>;

  const sort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const sorted = [...data].sort((a, b) => {
    const v = sortDir === 'asc' ? 1 : -1;
    if (sortCol === 'year') return (a.year - b.year) * v;
    return String(a[sortCol]).localeCompare(String(b[sortCol])) * v;
  });

  const Th = ({ col, label }) => (
    <th
      onClick={() => sort(col)}
      className="px-4 py-3 text-left cursor-pointer hover:text-white transition-colors select-none"
    >
      {label} {sortCol === col ? (sortDir === 'asc' ? '↑' : '↓') : ''}
    </th>
  );

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <Th col="year" label="Year" />
              <Th col="name" label="Tournament" />
              <th className="px-4 py-3 text-left">Cat.</th>
              <Th col="surface" label="Surface" />
              <Th col="winner" label="Winner" />
              <Th col="runner_up" label="Runner-up" />
              <th className="px-4 py-3 text-left hidden lg:table-cell">Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => (
              <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-2.5 font-mono text-slate-400">{row.year}</td>
                <td className="px-4 py-2.5 font-medium text-white">{row.name}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    row.category === 'Grand Slam'
                      ? 'bg-yellow-900/50 text-yellow-300'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {row.category === 'Grand Slam' ? 'GS' : 'M1K'}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${SURFACE_COLOR[row.surface] ?? 'bg-slate-700 text-slate-300'}`}>
                    {row.surface}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onSelectPlayer(row.winner)} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                    {FLAG_MAP[row.winner_nationality] ?? ''} {row.winner}
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onSelectPlayer(row.runner_up)} className="text-amber-400 hover:text-amber-300 transition-colors">
                    {FLAG_MAP[row.runner_up_nationality] ?? ''} {row.runner_up}
                  </button>
                </td>
                <td className="px-4 py-2.5 text-slate-500 font-mono text-xs hidden lg:table-cell">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 text-xs text-slate-500 border-t border-slate-800">
        {sorted.length} result{sorted.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
