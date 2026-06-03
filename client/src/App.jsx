import { useState } from 'react';
import Filters from './components/Filters.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import TournamentTable from './components/TournamentTable.jsx';
import PlayerModal from './components/PlayerModal.jsx';
import SurfaceChart from './components/SurfaceChart.jsx';
import TimelineChart from './components/TimelineChart.jsx';
import { useApi } from './hooks/useApi.js';

export default function App() {
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

  const { data: meta } = useApi('/api/meta', []);

  const updateFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const filterParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== null))
  ).toString();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🎾</span>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Tennis Titles Dashboard</h1>
            <p className="text-xs text-slate-400">Grand Slams & Masters 1000 · 2000–2024</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Filters filters={filters} onChange={updateFilter} meta={meta} />

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-0">
          {[
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'surface', label: 'By Surface' },
            { id: 'results', label: 'All Results' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'leaderboard' && (
          <Leaderboard filterParams={filterParams} onSelectPlayer={setSelectedPlayer} />
        )}
        {activeTab === 'timeline' && (
          <TimelineChart filterParams={filterParams} meta={meta} />
        )}
        {activeTab === 'surface' && (
          <SurfaceChart filterParams={filterParams} />
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
