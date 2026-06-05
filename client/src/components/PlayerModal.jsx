import { useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ComposedChart, Line, Legend
} from 'recharts';
import { useApi } from '../hooks/useApi.js';
import { FLAG_MAP } from './flags.js';

const SURFACE_COLOR = {
  Hard: '#4A90D9',
  Clay: '#C2714F',
  Grass: '#4CAF50',
  'Hard (i)': '#7B68EE',
};

export default function PlayerModal({ player, onClose }) {
  const { data, loading } = useApi(`/api/player/${encodeURIComponent(player)}`, [player]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const wins = data?.wins ?? [];
  const rus = data?.runner_ups ?? [];
  const byAge = data?.byAge ?? [];

  const slamWins = wins.filter(t => t.category === 'Grand Slam');
  const tourWins = wins.filter(t => t.category !== 'Grand Slam');
  const slamRU = rus.filter(t => t.category === 'Grand Slam');
  const tourRU = rus.filter(t => t.category !== 'Grand Slam');
  const isWTA = wins[0]?.tour === 'WTA' || rus[0]?.tour === 'WTA';
  const tourLabel = isWTA ? 'WTA 1000/500' : 'Masters 1000';

  // By surface wins
  const bySurface = {};
  for (const t of wins) {
    const s = t.surface.replace(' (i)', ' Indoor');
    bySurface[s] = (bySurface[s] || 0) + 1;
  }
  const surfaceData = Object.entries(bySurface).map(([s, v]) => ({ surface: s, wins: v }));

  // By tournament wins
  const byTournament = {};
  for (const t of wins) byTournament[t.name] = (byTournament[t.name] || 0) + 1;
  const tournData = Object.entries(byTournament).sort((a,b)=>b[1]-a[1]).map(([n,v])=>({ name: n, wins: v }));

  const nat = wins[0]?.winner_nationality ?? rus[0]?.runner_up_nationality ?? '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">
              {FLAG_MAP[nat] ?? ''} {player}
            </h2>
            <p className="text-sm text-slate-400">Career record since 2000</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 animate-pulse">Loading...</div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Stats summary */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'GS Titles', value: slamWins.length, color: 'text-yellow-400' },
                { label: `${tourLabel} Titles`, value: tourWins.length, color: 'text-emerald-400' },
                { label: 'GS Runner-ups', value: slamRU.length, color: 'text-yellow-300 opacity-70' },
                { label: `${tourLabel} RU`, value: tourRU.length, color: 'text-emerald-300 opacity-70' },
              ].map(s => (
                <div key={s.label} className="bg-slate-800 rounded-xl p-3 text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            {surfaceData.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Titles by Surface</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={surfaceData} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="surface" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                        itemStyle={{ color: '#94a3b8' }}
                      />
                      <Bar dataKey="wins" radius={[4,4,0,0]}>
                        {surfaceData.map(s => (
                          <Cell key={s.surface} fill={SURFACE_COLOR[s.surface.replace(' Indoor', ' (i)')] ?? '#64748b'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Titles by Tournament</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={tournData.slice(0,8)} layout="vertical" margin={{ left: 50 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 9 }} width={50} />
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                        itemStyle={{ color: '#94a3b8' }}
                      />
                      <Bar dataKey="wins" fill="#10B981" radius={[0,4,4,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Title list */}
            {wins.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">All Titles ({wins.length})</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {wins.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg hover:bg-slate-800">
                      <span className="text-slate-500 font-mono w-10 flex-shrink-0">{t.year}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        t.category === 'Grand Slam' ? 'bg-yellow-900/50 text-yellow-300'
                        : t.category === 'WTA 1000' ? 'bg-pink-900/50 text-pink-300'
                        : t.category === 'WTA 500' ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-slate-700 text-slate-300'
                      }`}>{t.category === 'Grand Slam' ? 'GS' : t.category === 'Masters 1000' ? 'M1K' : t.category === 'WTA 1000' ? 'W1K' : 'W500'}</span>
                      <span className="font-medium text-white">{t.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded ml-auto flex-shrink-0"
                        style={{ color: SURFACE_COLOR[t.surface] ?? '#94a3b8' }}>
                        {t.surface}
                      </span>
                      <span className="text-slate-400 text-xs hidden sm:block">def. {t.runner_up}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Runner-up list */}
            {rus.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">Runner-ups ({rus.length})</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {rus.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg hover:bg-slate-800">
                      <span className="text-slate-500 font-mono w-10 flex-shrink-0">{t.year}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        t.category === 'Grand Slam' ? 'bg-yellow-900/50 text-yellow-300'
                        : t.category === 'WTA 1000' ? 'bg-pink-900/50 text-pink-300'
                        : t.category === 'WTA 500' ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-slate-700 text-slate-300'
                      }`}>{t.category === 'Grand Slam' ? 'GS' : t.category === 'Masters 1000' ? 'M1K' : t.category === 'WTA 1000' ? 'W1K' : 'W500'}</span>
                      <span className="font-medium text-white">{t.name}</span>
                      <span className="text-slate-400 text-xs ml-auto hidden sm:block">lost to {t.winner}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wins & cumulative titles by age */}
            {byAge.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold font-display text-slate-400 uppercase mb-3">Titles by Age</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart data={byAge} margin={{ left: -10, right: 20, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="age" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: 'Age', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                      labelStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                      labelFormatter={v => `Age ${v}`}
                      itemStyle={{ color: '#94a3b8' }}
                    />
                    <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                    <Bar yAxisId="left" dataKey="wins" name="Wins" fill="#10B981" radius={[3,3,0,0]} />
                    <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Cumulative Titles" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3, fill: '#F59E0B' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
