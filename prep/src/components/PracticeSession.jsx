import { useState, useEffect, useRef } from 'react'
import { mathsQuestions } from '../data/maths.js'
import { englishQuestions } from '../data/english.js'
import { verbalQuestions } from '../data/verbal.js'
import { nvrQuestions } from '../data/nonverbal.js'
import { SUBJECTS, TOPICS, getQuestionsPerSession } from '../data/curriculum.js'
import Question from './Question.jsx'

const ALL_QUESTIONS = {
  maths: mathsQuestions,
  english: englishQuestions,
  verbal: verbalQuestions,
  nvr: nvrQuestions,
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions(subject, phase, topicId, count, questionHistory) {
  const pool = ALL_QUESTIONS[subject] || []
  let filtered = pool.filter(q => q.phase <= phase && q.topic === topicId)
  if (!filtered.length) filtered = pool.filter(q => q.phase <= phase)
  if (!filtered.length) filtered = pool

  // Split into unseen and seen
  const unseen = filtered.filter(q => !(questionHistory[q.id]?.seen > 0))
  const seen = filtered.filter(q => questionHistory[q.id]?.seen > 0)

  // Sort seen by accuracy ascending (worst first) so review targets weakest material
  seen.sort((a, b) => {
    const ha = questionHistory[a.id]
    const hb = questionHistory[b.id]
    return (ha.correct / ha.seen) - (hb.correct / hb.seen)
  })

  // Fill from unseen first; only dip into seen when unseen pool runs dry
  const candidates = [...shuffle(unseen), ...seen]
  return candidates.slice(0, count)
}

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function PracticeSession({ session, questionHistory = {}, onFinish, onExit }) {
  const { subject, phase, topicId } = session
  const sub = SUBJECTS[subject]
  const topics = TOPICS[subject][phase] || []
  const topicName = topics.find(t => t.id === topicId)?.name || topicId

  const qCount = getQuestionsPerSession(phase)
  const [questions] = useState(() => pickQuestions(subject, phase, topicId, qCount, questionHistory))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState([])
  const [elapsed, setElapsed] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000)
    return () => clearInterval(id)
  }, [])

  const q = questions[current]

  const handleSelect = (i) => {
    if (revealed) return
    setSelected(i)
  }

  const handleReveal = () => {
    if (selected === null) return
    setRevealed(true)
  }

  const handleNext = () => {
    const newAnswers = [...answers, selected]
    if (current + 1 >= questions.length) {
      onFinish({
        session,
        questions,
        answers: newAnswers,
        durationMinutes: Math.round(elapsed / 60),
      })
    } else {
      setAnswers(newAnswers)
      setCurrent(c => c + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (!q) {
    return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-500">No questions available for this topic yet.</div>
  }

  const progress = ((current) / questions.length) * 100

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      {/* Session header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: sub.color }}>
            {sub.icon}
          </div>
          <div>
            <div className="text-xs text-slate-500">{sub.name}</div>
            <div className="text-sm font-semibold text-slate-700">{topicName}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{formatTime(elapsed)}</span>
          <button onClick={onExit} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-200 rounded-full mb-6">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: sub.color }}
        />
      </div>

      {/* Question counter */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-slate-500">Question {current + 1} of {questions.length}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500">
          Difficulty {q.difficulty}/5
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-5">
        <Question
          question={q}
          selected={selected}
          onSelect={handleSelect}
          revealed={revealed}
        />
      </div>

      {/* Action buttons */}
      {!revealed ? (
        <button
          onClick={handleReveal}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            selected === null
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'text-white hover:opacity-90 active:scale-[0.98]'
          }`}
          style={selected !== null ? { background: sub.color } : {}}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: sub.color }}
        >
          {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </main>
  )
}
