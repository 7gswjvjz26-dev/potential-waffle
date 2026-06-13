import { SUBJECTS, TOPICS } from '../data/curriculum.js'

const SUBJECT_ORDER = ['maths', 'english', 'verbal', 'nvr']

export default function TopicList({ progress, onStartPractice, onBack }) {
  const phase = progress.phase

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-700 transition-colors text-lg">←</button>
        <h2 className="font-bold text-lg text-slate-800">All Topics — Phase {phase}</h2>
      </div>

      <div className="space-y-6">
        {SUBJECT_ORDER.map(subjectId => {
          const sub = SUBJECTS[subjectId]
          const topics = TOPICS[subjectId][phase] || []

          return (
            <div key={subjectId}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: sub.color }}>
                  {sub.icon}
                </div>
                <h3 className="font-bold text-slate-700">{sub.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {topics.map(topic => {
                  const key = `${subjectId}-${topic.id}`
                  const score = progress.topicScores[key]
                  const acc = score && score.total > 0 ? Math.round((score.correct / score.total) * 100) : null

                  return (
                    <button
                      key={topic.id}
                      onClick={() => onStartPractice({ subject: subjectId, phase, topicId: topic.id })}
                      className="text-left p-3 rounded-xl border-2 bg-white transition-all hover:shadow-sm hover:border-slate-400 active:scale-[0.98]"
                      style={{ borderColor: sub.border }}
                    >
                      <div className="font-semibold text-slate-800 text-sm mb-0.5">{topic.name}</div>
                      <div className="text-xs text-slate-400 mb-2 leading-tight">{topic.desc}</div>
                      {acc !== null ? (
                        <div className="text-xs font-bold px-2 py-0.5 rounded-full inline-block"
                          style={{
                            background: acc >= 80 ? '#DCFCE7' : acc >= 60 ? '#FEF9C3' : '#FEE2E2',
                            color: acc >= 80 ? '#166534' : acc >= 60 ? '#713F12' : '#991B1B'
                          }}>
                          {acc}% · {score.sessions} session{score.sessions !== 1 ? 's' : ''}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-300">Not started</div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
