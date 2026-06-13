import { SUBJECTS, TOPICS } from '../data/curriculum.js'

export default function ScoreCard({ results, onContinue, onRetry }) {
  const { session, questions, answers, durationMinutes } = results
  const { subject, topicId, phase } = session
  const sub = SUBJECTS[subject]
  const topics = TOPICS[subject][phase] || []
  const topicName = topics.find(t => t.id === topicId)?.name || topicId

  const correct = answers.filter((a, i) => a === questions[i].answer).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)

  const grade = pct >= 90 ? { label: 'Excellent', color: '#10B981', bg: '#ECFDF5' }
    : pct >= 75 ? { label: 'Good',      color: '#3B82F6', bg: '#EFF6FF' }
    : pct >= 60 ? { label: 'Okay',      color: '#F59E0B', bg: '#FFFBEB' }
    :             { label: 'Keep going', color: '#EF4444', bg: '#FEF2F2' }

  const missed = questions.filter((q, i) => answers[i] !== q.answer)

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Score summary */}
      <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: grade.bg, border: `2px solid ${grade.color}20` }}>
        <div className="text-5xl font-black mb-1" style={{ color: grade.color }}>{pct}%</div>
        <div className="text-lg font-bold mb-1" style={{ color: grade.color }}>{grade.label}</div>
        <div className="text-sm text-slate-500">{correct} correct out of {total}</div>
        <div className="text-xs text-slate-400 mt-1">{durationMinutes} min · {sub.name} · {topicName}</div>
      </div>

      {/* Review missed questions */}
      {missed.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">Review Missed Questions</h3>
          <div className="space-y-3">
            {missed.map((q, idx) => {
              const yourAnswer = answers[questions.indexOf(q)]
              const isNVR = q.subject === 'nvr' && q.nvrType !== 'text'
              return (
                <div key={q.id} className="bg-white rounded-xl border border-red-100 p-4">
                  <div className="text-sm text-slate-700 mb-2 font-medium">{q.question}</div>
                  {!isNVR && q.options && (
                    <div className="text-xs text-slate-500 mb-2">
                      Your answer: <span className="text-red-600 font-semibold">{q.options[yourAnswer] ?? '(none)'}</span>
                      {' · '}
                      Correct: <span className="text-green-700 font-semibold">{q.options[q.answer]}</span>
                    </div>
                  )}
                  {isNVR && (
                    <div className="text-xs text-slate-500 mb-2">
                      Your answer: <span className="text-red-600 font-semibold">{['A','B','C','D','E'][yourAnswer] ?? '(none)'}</span>
                      {' · '}
                      Correct: <span className="text-green-700 font-semibold">{['A','B','C','D','E'][q.answer]}</span>
                    </div>
                  )}
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">{q.explanation}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all"
          style={{ borderColor: sub.color, color: sub.color }}
        >
          Try Again
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
          style={{ background: sub.color }}
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )
}
