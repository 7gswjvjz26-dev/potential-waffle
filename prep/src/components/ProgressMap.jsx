import { SUBJECTS, TOPICS, PHASES } from '../data/curriculum.js'

const SUBJECT_ORDER = ['maths', 'english', 'verbal', 'nvr']

export default function ProgressMap({ progress, onBack }) {
  const totalSessions = progress.totalSessions
  const totalMinutes = progress.totalMinutes

  const overallBySubject = SUBJECT_ORDER.map(subjectId => {
    let correct = 0, total = 0
    ;[1, 2, 3, 4].forEach(ph => {
      const topics = TOPICS[subjectId][ph] || []
      topics.forEach(t => {
        const d = progress.topicScores[`${subjectId}-${t.id}`]
        if (d) { correct += d.correct; total += d.total }
      })
    })
    return { subjectId, correct, total, pct: total === 0 ? 0 : Math.round((correct / total) * 100) }
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-700 text-lg">←</button>
        <h2 className="font-bold text-lg text-slate-800">Progress</h2>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl font-black text-slate-800">{totalSessions}</div>
          <div className="text-xs text-slate-500 mt-0.5">Sessions</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl font-black text-slate-800">{totalMinutes}</div>
          <div className="text-xs text-slate-500 mt-0.5">Minutes</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl font-black text-orange-500">🔥{progress.streak.current}</div>
          <div className="text-xs text-slate-500 mt-0.5">Day streak</div>
        </div>
      </div>

      {/* Accuracy by subject */}
      <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Accuracy by Subject</h3>
      <div className="space-y-3 mb-8">
        {overallBySubject.map(({ subjectId, pct, total }) => {
          const sub = SUBJECTS[subjectId]
          return (
            <div key={subjectId} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700 text-sm">{sub.name}</span>
                <span className="text-sm font-bold" style={{ color: sub.color }}>
                  {total === 0 ? '—' : `${pct}%`}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: sub.color }} />
              </div>
              <div className="text-xs text-slate-400 mt-1">{total} questions answered</div>
            </div>
          )
        })}
      </div>

      {/* Phase breakdown */}
      <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Phase Breakdown</h3>
      <div className="space-y-2">
        {PHASES.map(ph => {
          const isCurrentPhase = ph.id === progress.phase
          let correct = 0, total = 0
          SUBJECT_ORDER.forEach(subjectId => {
            const topics = TOPICS[subjectId][ph.id] || []
            topics.forEach(t => {
              const d = progress.topicScores[`${subjectId}-${t.id}`]
              if (d) { correct += d.correct; total += d.total }
            })
          })
          const pct = total === 0 ? 0 : Math.round((correct / total) * 100)
          return (
            <div key={ph.id} className={`rounded-xl border p-4 ${isCurrentPhase ? 'border-2' : 'border-slate-200 bg-white'}`}
              style={isCurrentPhase ? { borderColor: ph.color, background: `${ph.color}10` } : {}}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm" style={{ color: isCurrentPhase ? ph.color : '#334155' }}>Phase {ph.id}: {ph.name}</span>
                  {isCurrentPhase && <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded text-white" style={{ background: ph.color }}>Current</span>}
                  <div className="text-xs text-slate-500 mt-0.5">Months {ph.months} · {ph.dailyMinutes[0]}–{ph.dailyMinutes[1]} min/day</div>
                </div>
                <span className="text-sm font-bold text-slate-600">{total === 0 ? '—' : `${pct}%`}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Danger zone */}
      <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200">
        <div className="text-sm font-semibold text-slate-600 mb-2">Reset Progress</div>
        <button
          onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) progress.resetAll() }}
          className="text-xs text-red-500 hover:text-red-700 underline"
        >
          Clear all data and start fresh
        </button>
      </div>
    </main>
  )
}
