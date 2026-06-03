const SURFACES = ['Hard', 'Clay', 'Grass', 'Hard (i)'];
const CATEGORIES = ['Grand Slam', 'Masters 1000'];

export default function Filters({ filters, onChange, meta }) {
  const years = [];
  for (let y = 2000; y <= 2024; y++) years.push(y);

  return (
    <div className="card">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-medium">Category</label>
          <div className="flex gap-1">
            <button
              onClick={() => onChange('category', '')}
              className={`btn ${!filters.category ? 'btn-active' : 'btn-inactive'}`}
            >
              All
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => onChange('category', filters.category === c ? '' : c)}
                className={`btn ${filters.category === c ? 'btn-active' : 'btn-inactive'}`}
              >
                {c === 'Grand Slam' ? 'Grand Slams' : 'Masters 1000'}
              </button>
            ))}
          </div>
        </div>

        {/* Surface */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-medium">Surface</label>
          <div className="flex gap-1">
            <button
              onClick={() => onChange('surface', '')}
              className={`btn ${!filters.surface ? 'btn-active' : 'btn-inactive'}`}
            >
              All
            </button>
            {SURFACES.map(s => {
              const colors = {
                Hard: 'bg-blue-600',
                Clay: 'bg-orange-600',
                Grass: 'bg-green-600',
                'Hard (i)': 'bg-violet-600',
              };
              return (
                <button
                  key={s}
                  onClick={() => onChange('surface', filters.surface === s ? '' : s)}
                  className={`btn ${filters.surface === s ? colors[s] + ' text-white' : 'btn-inactive'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-medium">Year Range</label>
          <div className="flex items-center gap-2">
            <select
              className="select"
              value={filters.year_from}
              onChange={e => onChange('year_from', Number(e.target.value))}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="text-slate-500 text-sm">to</span>
            <select
              className="select"
              value={filters.year_to}
              onChange={e => onChange('year_to', Number(e.target.value))}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Tournament */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-medium">Tournament</label>
          <select
            className="select"
            value={filters.tournament}
            onChange={e => onChange('tournament', e.target.value)}
          >
            <option value="">All Tournaments</option>
            {(meta?.tournaments || []).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Player search */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-medium">Player</label>
          <input
            type="text"
            placeholder="Search player..."
            className="select w-40"
            value={filters.player}
            onChange={e => onChange('player', e.target.value)}
          />
        </div>

        {/* Reset */}
        {(filters.category || filters.surface || filters.player || filters.tournament || filters.year_from !== 2000 || filters.year_to !== 2024) && (
          <button
            onClick={() => {
              onChange('category', '');
              onChange('surface', '');
              onChange('player', '');
              onChange('tournament', '');
              onChange('year_from', 2000);
              onChange('year_to', 2024);
            }}
            className="btn text-slate-400 hover:text-red-400 self-end"
          >
            ✕ Reset
          </button>
        )}
      </div>
    </div>
  );
}
