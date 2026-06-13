import NVRShape from './NVRShape.jsx'

const LABELS = ['A', 'B', 'C', 'D', 'E']

function NVRQuestionView({ question, selected, onSelect, revealed }) {
  const { nvrType } = question

  if (nvrType === 'odd_one_out') {
    const shapes = question.shapes || []
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-4">{question.question}</p>
        <div className="flex gap-3 flex-wrap mb-6">
          {shapes.map((shape, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <NVRShape shape={shape} pixelSize={60} />
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (nvrType === 'series') {
    const sequence = question.sequence || []
    const options = question.options || []
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-3">{question.question}</p>
        <div className="flex items-center gap-2 flex-wrap mb-5 p-3 bg-slate-50 rounded-xl">
          {sequence.map((shape, i) => (
            <div key={i} className="flex items-center gap-2">
              <NVRShape shape={shape} pixelSize={56} />
              {i < sequence.length - 1 && <span className="text-slate-300 text-xl">→</span>}
            </div>
          ))}
          <span className="text-slate-300 text-xl">→</span>
          <div className="w-14 h-14 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center text-slate-400 font-bold text-lg">?</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {options.map((shape, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <NVRShape shape={shape} pixelSize={52} />
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (nvrType === 'matrix_2x2') {
    const grid = question.grid || []
    const options = question.options || []
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-4">{question.question}</p>
        <div className="inline-grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl mb-5">
          {grid.map((shape, i) => (
            <div key={i} className="w-16 h-16 border-2 border-slate-300 rounded-lg bg-white flex items-center justify-center">
              {shape ? <NVRShape shape={shape} pixelSize={52} /> : <span className="text-2xl font-bold text-slate-400">?</span>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {options.map((shape, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <NVRShape shape={shape} pixelSize={52} />
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (nvrType === 'matrix_3x3') {
    const grid = question.grid || []
    const options = question.options || []
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-4">{question.question}</p>
        <div className="inline-grid grid-cols-3 gap-1.5 p-3 bg-slate-50 rounded-xl mb-5">
          {grid.map((shape, i) => (
            <div key={i} className="w-14 h-14 border-2 border-slate-300 rounded-lg bg-white flex items-center justify-center">
              {shape ? <NVRShape shape={shape} pixelSize={48} /> : <span className="text-2xl font-bold text-slate-400">?</span>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {options.map((shape, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <NVRShape shape={shape} pixelSize={48} />
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (nvrType === 'analogy') {
    const [a, b] = question.analogyPairs || []
    const options = question.options || []
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-4">{question.question}</p>
        <div className="flex items-center gap-3 mb-5 p-3 bg-slate-50 rounded-xl flex-wrap">
          <NVRShape shape={a} pixelSize={60} />
          <span className="text-slate-400 font-bold text-lg">is to</span>
          <NVRShape shape={b} pixelSize={60} />
          <span className="text-slate-400 font-bold text-lg">as</span>
          <NVRShape shape={question.source} pixelSize={60} />
          <span className="text-slate-400 font-bold text-lg">is to</span>
          <div className="w-14 h-14 border-2 border-dashed border-slate-400 rounded-lg flex items-center justify-center text-slate-400 font-bold text-lg">?</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {options.map((shape, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <NVRShape shape={shape} pixelSize={52} />
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (nvrType === 'code') {
    const examples = question.codeExamples || []
    const options = question.options || []
    const isShapeOptions = typeof options[0] !== 'string'
    return (
      <div>
        <p className="text-base font-semibold text-slate-700 mb-4">{question.question}</p>
        <div className="flex gap-4 mb-5 flex-wrap">
          {examples.map((ex, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              {ex.shape && <NVRShape shape={ex.shape} pixelSize={44} />}
              <span className="font-mono font-bold text-slate-700">{ex.code}</span>
            </div>
          ))}
        </div>
        {question.target && (
          <div className="flex items-center gap-2 mb-4">
            <NVRShape shape={question.target} pixelSize={52} />
            <span className="text-slate-500">= ?</span>
          </div>
        )}
        <div className="grid grid-cols-4 gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 transition-all ${
                revealed
                  ? i === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selected === i
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200 bg-white opacity-50'
                  : selected === i
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              {isShapeOptions ? <NVRShape shape={opt} pixelSize={44} /> : <span className="font-mono font-bold text-slate-700">{opt}</span>}
              <span className="text-xs font-semibold text-slate-500">{LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Fallback to text MCQ
  return null
}

export default function Question({ question, selected, onSelect, revealed }) {
  const isNVR = question.subject === 'nvr' && question.nvrType !== 'text'

  if (isNVR) {
    return (
      <div>
        <NVRQuestionView question={question} selected={selected} onSelect={onSelect} revealed={revealed} />
        {revealed && (
          <div className={`mt-5 p-4 rounded-xl text-sm ${selected === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className={`font-bold mb-1 ${selected === question.answer ? 'text-green-700' : 'text-red-700'}`}>
              {selected === question.answer ? '✓ Correct!' : `✗ The answer is ${LABELS[question.answer]}`}
            </div>
            <div className="text-slate-600">{question.explanation}</div>
          </div>
        )}
      </div>
    )
  }

  // Text MCQ
  const options = question.options || []
  return (
    <div>
      <p className="text-base font-semibold text-slate-800 mb-5 leading-relaxed whitespace-pre-line">{question.question}</p>
      <div className="flex flex-col gap-2.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm ${
              revealed
                ? i === question.answer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : selected === i
                    ? 'border-red-400 bg-red-50 text-red-800'
                    : 'border-slate-200 bg-white text-slate-500'
                : selected === i
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold mr-2">{LABELS[i]}.</span>
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <div className={`mt-5 p-4 rounded-xl text-sm ${selected === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className={`font-bold mb-1 ${selected === question.answer ? 'text-green-700' : 'text-red-700'}`}>
            {selected === question.answer ? '✓ Correct!' : `✗ The answer is ${LABELS[question.answer]}: ${options[question.answer]}`}
          </div>
          <div className="text-slate-600">{question.explanation}</div>
        </div>
      )}
    </div>
  )
}
