import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell
} from 'recharts';
import { useApi } from '../hooks/useApi.js';

const SURFACE_COLORS = {
  Hard: '#4A90D9',
  Clay: '#C2714F',
  Grass: '#4CAF50',
  'Hard (i)': '#7B68EE',
};

export default function SurfaceChart({ filterParams }) {
  const { data: raw, loading } = useApi(`/api/leaderboard?${filterParams}`, [filterParams]);

  if (loading) return <div className="card animate-pulse h-96 bg-slate-800" />;
  if (!raw?.length) return <div className="card text-center py-12 text-slate-500">No data.</div>;

  const top10 = raw.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Wins bar chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Titles — Grand Slam vs Masters 1000</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={top10} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis dataKey="player" type="category" tick={{ fill: '#e2e8f0', fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              <Bar dataKey="slam_wins" name="Grand Slam" stackId="a" fill="#F59E0B" radius={[0,0,0,0]} />
              <Bar dataKey="masters_wins" name="Masters 1000" stackId="a" fill="#10B981" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Runner-up bar chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Runner-ups — Grand Slam vs Masters 1000</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={top10} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis dataKey="player" type="category" tick={{ fill: '#e2e8f0', fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              <Bar dataKey="slam_ru" name="Grand Slam RU" stackId="a" fill="#F59E0B" fillOpacity={0.5} radius={[0,0,0,0]} />
              <Bar dataKey="masters_ru" name="Masters 1000 RU" stackId="a" fill="#10B981" fillOpacity={0.5} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Finals win rate */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Finals Win Rate (top 15 by finals played)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={raw.filter(p => p.finals >= 3).sort((a,b) => b.finals - a.finals).slice(0,15).map(p => ({
              ...p,
              winRate: p.finals > 0 ? Math.round((p.wins / p.finals) * 100) : 0,
            }))}
            margin={{ left: 10, right: 20, top: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="player" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-35} textAnchor="end" height={70} />
            <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              formatter={(val) => [`${val}%`, 'Win Rate']}
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="winRate" name="Win Rate" radius={[4,4,0,0]}>
              {raw.filter(p => p.finals >= 3).sort((a,b) => b.finals - a.finals).slice(0,15).map((p, i) => (
                <Cell key={p.player} fill={`hsl(${160 - i * 8}, 70%, 45%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
