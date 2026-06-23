import { useState } from 'react'
import { useProgress } from './hooks/useProgress.js'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import TopicList from './components/TopicList.jsx'
import PracticeSession from './components/PracticeSession.jsx'
import ScoreCard from './components/ScoreCard.jsx'
import ProgressMap from './components/ProgressMap.jsx'

export default function App() {
  const [view, setView] = useState('dashboard')
  const [session, setSession] = useState(null)
  const [lastResults, setLastResults] = useState(null)
  const progress = useProgress()

  const startPractice = (sessionConfig) => {
    setSession(sessionConfig)
    setView('practice')
  }

  const finishSession = (results) => {
    progress.recordSession({
      subject: results.session.subject,
      topicId: results.session.topicId,
      questions: results.questions,
      answers: results.answers,
      durationMinutes: results.durationMinutes,
    })
    setLastResults(results)
    setView('results')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {view !== 'practice' && (
        <Header progress={progress} onHome={() => setView('dashboard')} />
      )}

      {view === 'dashboard' && (
        <Dashboard
          progress={progress}
          onStartPractice={startPractice}
          onViewTopics={() => setView('topics')}
          onViewProgress={() => setView('progress')}
        />
      )}

      {view === 'topics' && (
        <TopicList
          progress={progress}
          onStartPractice={startPractice}
          onBack={() => setView('dashboard')}
        />
      )}

      {view === 'practice' && session && (
        <PracticeSession
          session={session}
          questionHistory={progress.questionHistory}
          onFinish={finishSession}
          onExit={() => setView('dashboard')}
        />
      )}

      {view === 'results' && lastResults && (
        <ScoreCard
          results={lastResults}
          onContinue={() => setView('dashboard')}
          onRetry={() => startPractice(lastResults.session)}
        />
      )}

      {view === 'progress' && (
        <ProgressMap
          progress={progress}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  )
}
