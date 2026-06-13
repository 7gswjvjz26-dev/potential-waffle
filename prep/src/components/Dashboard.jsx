import { SUBJECTS, TOPICS, PHASES, getQuestionsPerSession } from '../data/curriculum.js'

const SUBJECT_ORDER = ['maths', 'english', 'verbal', 'nvr']

export default function Dashboard({ progress, onStartPractice, onViewProgress, onViewTopics }) {
  const phase = progress.phase
  const phaseData = PHASES[phase - 1]
  const qPerSession = getQuestionsPerSession(phase, progress.monthInPhase)

  const getAccuracy = (subject) => {
    const topics = TOPICS[subject][phase] || []
    let totalCorrect = 0, totalQ = 0
    topics.forEach(t => {
      const key = `${subject}-${t.id}`
      const d = progress.topicScores[key]
      if (d) { totalCorrect += d.correct; totalQ += d.total }
    })
    return totalQ === 0 ? null : Math.round((totalCorrect / totalQ) * 100)
  }

  const startSubject = (subjectId) => {
    const topics = TOPICS[subjectId][phase] || []
    if (!topics.length) return
    const topicId = topics[Math.floor(Math.random() * topics.length)].id
    onStartPractice({ subject: subjectId, phase, topicId })
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Phase banner */}
      <div className="rounded-xl p-5 mb-8 text-white" style={{ background: phaseData.color }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm opacity-80 mb-1">Phase {phase} · Months {phaseData.months}</div>
            <h1 className="text-2xl font-bold">{phaseData.name}</h1>
            <p className="text-sm opacity-90 mt-1">{phaseData.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{qPerSession}</div>
            <div className="text-sm opacity-80">questions/session</div>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm">
            {phaseData.dailyMinutes[0]}–{phaseData.dailyMinutes[1]} min/day
          </div>
          {progress.streak.current > 0 && (
            <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm">
              🔥 {progress.streak.current} day streak
            </div>
          )}
          {progress.studiedToday && (
            <div className="bg-white/30 rounded-lg px-3 py-1.5 text-sm font-semibold">
              ✓ Studied today
            </div>
          )}
        </div>
      </div>

      {/* Subject cards */}
      <h2 className="text-lg font-bold text-slate-700 mb-4">Choose a subject</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {SUBJECT_ORDER.map(subjectId => {
          const sub = SUBJECTS[subjectId]
          const accuracy = getAccuracy(subjectId)
          const topics = TOPICS[subjectId][phase] || []

          return (
            <button
              key={subjectId}
              onClick={() => startSubject(subjectId)}
              className="rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              style={{ background: sub.bg, border: `2px solid ${sub.border}` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: sub.color }}
                >
                  {sub.icon}
                </div>
                {accuracy !== null && (
                  <div className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: accuracy >= 80 ? '#DCFCE7' : accuracy >= 60 ? '#FEF9C3' : '#FEE2E2',
                             color: accuracy >= 80 ? '#166534' : accuracy >= 60 ? '#713F12' : '#991B1B' }}>
                    {accuracy}%
                  </div>
                )}
              </div>
              <div className="font-bold text-slate-800 mb-0.5">{sub.name}</div>
              <div className="text-xs text-slate-500">{topics.length} topics in this phase</div>
            </button>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <button
          onClick={onViewTopics}
          className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        >
          Browse Topics
        </button>
        <button
          onClick={onViewProgress}
          className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        >
          View Progress
        </button>
      </div>

      {/* Phase selector */}
      <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200">
        <div className="text-sm font-semibold text-slate-600 mb-3">Change Phase</div>
        <div className="grid grid-cols-4 gap-2">
          {PHASES.map(p => (
            <button
              key={p.id}
              onClick={() => progress.setPhase(p.id)}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                progress.phase === p.id
                  ? 'text-white'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
              style={progress.phase === p.id ? { background: p.color } : {}}
            >
              <div>Phase {p.id}</div>
              <div className="font-normal opacity-80">{p.name}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
