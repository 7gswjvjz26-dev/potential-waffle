import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import { FLAG_MAP } from './flags.js';

const MEDAL = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ filterParams, onSelectPlayer }) {
  const [view, setView] = useState('wins');
  const { data, loading } = useApi(`/api/leaderboard?${filterParams}`, [filterParams]);

  if (loading) return <Skeleton />;
  if (!data?.length) return <Empty />;

  const sorted = [...data].sort((a, b) =>
    view === 'wins' ? b.wins - a.wins || b.runner_ups - a.runner_ups
    : view === 'finals' ? b.finals - a.finals
    : b.runner_ups - a.runner_ups
  );

  return (
    <div className="space-y-4">
      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {sorted.slice(0, 3).map((p, i) => (
          <button
            key={p.player}
            onClick={() => onSelectPlayer(p.player)}
            className="card hover:border-emerald-600 transition-colors text-center cursor-pointer group"
          >
            <div className="text-3xl mb-1">{MEDAL[i]}</div>
            <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {FLAG_MAP[p.nationality] ?? ''} {p.player}
            </div>
            <div className="mt-2 flex justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{p.wins}</div>
                <div className="text-xs text-slate-500">Titles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">{p.runner_ups}</div>
                <div className="text-xs text-slate-500">Runner-ups</div>
              </div>
            </div>
            <div className="mt-2 flex justify-center gap-2 text-xs text-slate-500">
              <span>{p.slam_wins} GS</span>
              <span>·</span>
              <span>{p.masters_wins} M1000</span>
            </div>
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-slate-500">Sort by:</span>
        {[['wins', 'Titles'], ['runner_ups', 'Runner-ups'], ['finals', 'Finals']].map(([val, label]) => (
          <button key={val} onClick={() => setView(val)} className={`btn text-xs ${view === val ? 'btn-active' : 'btn-inactive'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Full table */}
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left w-8">#</th>
              <th className="px-4 py-3 text-left">Player</th>
              <th className="px-4 py-3 text-center">Titles</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">GS Wins</th>
              <th className="px-4 py-3 text-center hidden sm:table-cell">M1000 Wins</th>
              <th className="px-4 py-3 text-center">Runner-ups</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">GS RU</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">M1000 RU</th>
              <th className="px-4 py-3 text-center">Finals</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr
                key={p.player}
                onClick={() => onSelectPlayer(p.player)}
                className="border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{i + 1}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-white">
                    {FLAG_MAP[p.nationality] ?? ''} {p.player}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-emerald-400">{p.wins}</span>
                </td>
                <td className="px-4 py-3 text-center text-slate-300 hidden sm:table-cell">{p.slam_wins}</td>
                <td className="px-4 py-3 text-center text-slate-300 hidden sm:table-cell">{p.masters_wins}</td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-amber-400">{p.runner_ups}</span>
                </td>
                <td className="px-4 py-3 text-center text-slate-300 hidden md:table-cell">{p.slam_ru}</td>
                <td className="px-4 py-3 text-center text-slate-300 hidden md:table-cell">{p.masters_ru}</td>
                <td className="px-4 py-3 text-center">
                  <span className="text-slate-200 font-semibold">{p.finals}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-3 gap-3">
        {[0,1,2].map(i => <div key={i} className="card h-32 bg-slate-800" />)}
      </div>
      <div className="card h-64 bg-slate-800" />
    </div>
  );
}

function Empty() {
  return (
    <div className="card text-center py-16 text-slate-500">
      <div className="text-4xl mb-3">🎾</div>
      <p>No results match your filters.</p>
    </div>
  );
}
