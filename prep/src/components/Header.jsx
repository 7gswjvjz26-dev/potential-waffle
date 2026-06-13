import { PHASES } from '../data/curriculum.js'

export default function Header({ progress, onHome }) {
  const phase = PHASES[progress.phase - 1]

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={onHome}
          className="font-bold text-lg text-slate-800 hover:text-indigo-600 transition-colors"
        >
          GL 11+ Prep
        </button>

        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="font-semibold" style={{ color: phase.color }}>Phase {progress.phase}</span>
            <span className="text-slate-400">·</span>
            <span>{phase.name}</span>
          </div>

          {progress.streak.current > 0 && (
            <div className="flex items-center gap-1 text-orange-500 font-semibold">
              <span>🔥</span>
              <span>{progress.streak.current}</span>
            </div>
          )}

          <div className="text-slate-500">
            <span className="font-semibold text-slate-700">{progress.totalSessions}</span> sessions
          </div>
        </div>
      </div>
    </header>
  )
}
