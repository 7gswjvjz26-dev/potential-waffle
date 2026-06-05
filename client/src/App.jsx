import { useState } from 'react';
import Filters from './components/Filters.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import TournamentTable from './components/TournamentTable.jsx';
import PlayerModal from './components/PlayerModal.jsx';
import SurfaceChart from './components/SurfaceChart.jsx';
import TimelineChart from './components/TimelineChart.jsx';
import { useApi } from './hooks/useApi.js';

export default function App() {
  const [tour, setTour] = useState('ATP');
  const [filters, setFilters] = useState({
    category: '',
    surface: '',
    year_from: 2000,
    year_to: 2024,
    player: '',
    tournament: '',
  });
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const { data: meta } = useApi(`/api/meta?tour=${tour}`, [tour]);

  const updateFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const filterParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries({ tour, ...filters }).filter(([, v]) => v !== '' && v !== null)
    )
  ).toString();

  // Category options depend on tour
  const categoryOptions =
    tour === 'WTA'
      ? ['Grand Slam', 'WTA 1000', 'WTA 500']
      : tour === 'ATP'
      ? ['Grand Slam', 'Masters 1000']
      : ['Grand Slam', 'Masters 1000', 'WTA 1000', 'WTA 500'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎾</span>
            <div>
              <h1 className="text-lg font-bold font-display text-white leading-tight">Tennis Titles Dashboard</h1>
              <p className="text-xs text-slate-400">Grand Slams & Tour Titles · 2000–2024</p>
            </div>
          </div>

          {/* Tour toggle — prominent near header */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1">
            {[
              { id: 'ATP', label: '♂ Men (ATP)' },
              { id: 'Both', label: '⚥ Both' },
              { id: 'WTA', label: '♀ Women (WTA)' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setTour(t.id);
                  setFilters(f => ({ ...f, category: '', tournament: '', player: '' }));
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  tour === t.id
                    ? t.id === 'WTA'
                      ? 'bg-pink-600 text-white shadow'
                      : t.id === 'ATP'
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Filters
          filters={filters}
          onChange={updateFilter}
          meta={meta}
          tour={tour}
          categoryOptions={categoryOptions}
        />

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-800">
          {[
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'surface', label: 'By Category' },
            { id: 'results', label: 'All Results' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium font-display border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'leaderboard' && (
          <Leaderboard filterParams={filterParams} onSelectPlayer={setSelectedPlayer} tour={tour} />
        )}
        {activeTab === 'timeline' && (
          <TimelineChart filterParams={filterParams} meta={meta} tour={tour} />
        )}
        {activeTab === 'surface' && (
          <SurfaceChart filterParams={filterParams} tour={tour} />
        )}
        {activeTab === 'results' && (
          <TournamentTable filterParams={filterParams} onSelectPlayer={setSelectedPlayer} />
        )}
      </div>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  );
}
