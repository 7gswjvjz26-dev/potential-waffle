import { useState, useCallback } from 'react'

const STORAGE_KEY = 'gl11plus_progress_v1'

const defaultState = () => ({
  phase: 1,
  monthInPhase: 1,
  streak: { current: 0, longest: 0, lastDate: null },
  totalSessions: 0,
  totalMinutes: 0,
  topicScores: {},     // { [topicId]: { correct, total, sessions } }
  questionHistory: {}, // { [questionId]: { correct, seen } }
  sessionLog: [],      // [{ date, subject, topic, correct, total, minutes }]
})

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function useProgress() {
  const [state, setState] = useState(load)

  const update = useCallback((updater) => {
    setState(prev => {
      const next = updater(prev)
      save(next)
      return next
    })
  }, [])

  const recordSession = useCallback(({ subject, topicId, questions, answers, durationMinutes }) => {
    const today = todayStr()
    let correct = 0
    const qHistory = {}
    questions.forEach((q, i) => {
      const isCorrect = answers[i] === q.answer
      if (isCorrect) correct++
      qHistory[q.id] = { correct: isCorrect ? 1 : 0, seen: 1 }
    })

    update(prev => {
      // Update streak
      let streak = { ...prev.streak }
      if (streak.lastDate === today) {
        // already studied today — no change
      } else if (streak.lastDate === new Date(Date.now() - 86400000).toISOString().slice(0, 10)) {
        streak = { ...streak, current: streak.current + 1, longest: Math.max(streak.longest, streak.current + 1), lastDate: today }
      } else {
        streak = { ...streak, current: 1, lastDate: today }
      }

      // Update topic scores
      const key = `${subject}-${topicId}`
      const existing = prev.topicScores[key] || { correct: 0, total: 0, sessions: 0 }
      const topicScores = {
        ...prev.topicScores,
        [key]: {
          correct: existing.correct + correct,
          total: existing.total + questions.length,
          sessions: existing.sessions + 1,
        },
      }

      // Update question history
      const questionHistory = { ...prev.questionHistory }
      Object.entries(qHistory).forEach(([id, data]) => {
        const ex = questionHistory[id] || { correct: 0, seen: 0 }
        questionHistory[id] = { correct: ex.correct + data.correct, seen: ex.seen + 1 }
      })

      return {
        ...prev,
        streak,
        topicScores,
        questionHistory,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + (durationMinutes || 0),
        sessionLog: [
          ...prev.sessionLog.slice(-99),
          { date: today, subject, topic: topicId, correct, total: questions.length, minutes: durationMinutes || 0 },
        ],
      }
    })
  }, [update])

  const setPhase = useCallback((phase) => {
    update(prev => ({ ...prev, phase: Math.max(1, Math.min(4, phase)) }))
  }, [update])

  const setMonthInPhase = useCallback((m) => {
    update(prev => ({ ...prev, monthInPhase: Math.max(1, Math.min(3, m)) }))
  }, [update])

  const getTopicAccuracy = useCallback((subject, topicId) => {
    const key = `${subject}-${topicId}`
    const data = state.topicScores[key]
    if (!data || data.total === 0) return null
    return Math.round((data.correct / data.total) * 100)
  }, [state.topicScores])

  const studiedToday = state.streak.lastDate === todayStr()

  const resetAll = useCallback(() => {
    const fresh = defaultState()
    save(fresh)
    setState(fresh)
  }, [])

  return {
    ...state,
    studiedToday,
    recordSession,
    setPhase,
    setMonthInPhase,
    getTopicAccuracy,
    resetAll,
  }
}
