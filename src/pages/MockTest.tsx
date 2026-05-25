import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, Flag, AlertTriangle, ChevronLeft, ChevronRight, BarChart3, Zap, Brain, Target } from 'lucide-react'

const questions = [
  { id: 1, text: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0, topic: 'Calculus', difficulty: 'medium' },
  { id: 2, text: 'Which of the following is a prime number?', options: ['21', '23', '25', '27'], correct: 1, topic: 'Number Theory', difficulty: 'easy' },
  { id: 3, text: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, topic: 'Chemistry', difficulty: 'easy' },
  { id: 4, text: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1, topic: 'Physics', difficulty: 'easy' },
  { id: 5, text: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correct: 2, topic: 'Environmental Science', difficulty: 'medium' },
]

export default function MockTest() {
  const navigate = useNavigate()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [flagged, setFlagged] = useState<number[]>([])
  const [timeLeft] = useState(3600)
  const [submitted, setSubmitted] = useState(false)
  const [started, setStarted] = useState(false)

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]; newAnswers[currentQ] = optionIndex; setAnswers(newAnswers)
  }

  const toggleFlag = () => {
    setFlagged((prev) => prev.includes(currentQ) ? prev.filter((f) => f !== currentQ) : [...prev, currentQ])
  }

  const submitTest = () => { setSubmitted(true) }

  const correctCount = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0

  if (!started) {
    return (
      <div className="senjr-app">
        <header className="senjr-header">
          <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
          <span className="senjr-header-title">Mock Test</span>
          <div />
        </header>
        <div className="senjr-page">
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 40 }}>
            <div className="senjr-pop" style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, var(--senjr-orange), #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '4px 4px 0 #C2410C' }}>
              <BarChart3 size={40} style={{ color: 'white' }} />
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' }}>Weekly Mock Test</h2>
            <p style={{ color: 'var(--senjr-text-muted)', marginBottom: 24, fontSize: 14 }}>Mathematics, Physics & Chemistry</p>
            <div className="senjr-card-neo-orange" style={{ textAlign: 'left', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Zap size={16} style={{ color: 'var(--senjr-orange-dark)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-orange-dark)' }}>Test Overview</span>
              </div>
              <div className="senjr-divider" style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}><Brain size={14} style={{ display: 'inline', marginRight: 4 }} />Questions</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{questions.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}><Clock size={14} style={{ display: 'inline', marginRight: 4 }} />Duration</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>60 min</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}><Target size={14} style={{ display: 'inline', marginRight: 4 }} />Marking</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--senjr-orange)' }}>+4, -1</span>
              </div>
            </div>
            <button className="senjr-btn senjr-btn-orange" style={{ boxShadow: '3px 3px 0 var(--senjr-orange-dark)' }} onClick={() => setStarted(true)}>Start Test</button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    const percentage = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="senjr-app">
        <header className="senjr-header">
          <button className="senjr-header-back" onClick={() => navigate('/dashboard')}><ArrowLeft size={18} /></button>
          <span className="senjr-header-title">Results</span>
          <div />
        </header>
        <div className="senjr-page">
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 30 }}>
            <div className="senjr-pop" style={{
              width: 110, height: 110, borderRadius: '50%',
              background: percentage >= 70 ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' : 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
              border: `4px solid ${percentage >= 70 ? 'var(--senjr-green)' : 'var(--senjr-orange)'}`,
              boxShadow: `4px 4px 0 ${percentage >= 70 ? 'var(--senjr-green-dark)' : 'var(--senjr-orange-dark)'}`,
            }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: percentage >= 70 ? 'var(--senjr-green)' : 'var(--senjr-orange)' }}>{percentage}%</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.3px' }}>
              {percentage >= 80 ? 'Outstanding!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing'}
            </h2>
            <p style={{ color: 'var(--senjr-text-muted)', marginBottom: 24, fontSize: 14 }}>{correctCount}/{questions.length} correct answers</p>

            <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
              <div className="senjr-card-neo-green" style={{ textAlign: 'center', padding: 16, marginBottom: 0 }}>
                <CheckCircle size={22} style={{ color: 'var(--senjr-green)', margin: '0 auto 6px' }} />
                <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--senjr-green)' }}>{correctCount}</p>
                <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>Correct</p>
              </div>
              <div className="senjr-card-neo" style={{ textAlign: 'center', padding: 16, marginBottom: 0, borderColor: '#EF4444', boxShadow: '2px 2px 0 #EF4444' }}>
                <AlertTriangle size={22} style={{ color: '#EF4444', margin: '0 auto 6px' }} />
                <p style={{ fontSize: 26, fontWeight: 800, color: '#EF4444' }}>{questions.length - correctCount}</p>
                <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>Incorrect</p>
              </div>
            </div>

            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-text)', marginBottom: 10, textAlign: 'left' }}>Review Questions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {questions.map((q, i) => (
                <div key={q.id} className="senjr-card-neo-sm" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderColor: answers[i] === q.correct ? 'var(--senjr-green)' : '#EF4444' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
                    background: answers[i] === q.correct ? 'var(--senjr-green-light)' : '#FEE2E2',
                    color: answers[i] === q.correct ? 'var(--senjr-green)' : '#EF4444',
                    flexShrink: 0,
                  }}>
                    {answers[i] === q.correct ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>Question {i + 1}</p>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{q.topic}</p>
                  </div>
                  <span className="senjr-tag" style={{
                    background: answers[i] === q.correct ? 'var(--senjr-green-light)' : '#FEE2E2',
                    color: answers[i] === q.correct ? 'var(--senjr-green-dark)' : '#DC2626',
                    fontWeight: 600,
                  }}>{answers[i] === q.correct ? 'Correct' : 'Wrong'}</span>
                </div>
              ))}
            </div>

            <button className="senjr-btn senjr-btn-green" style={{ boxShadow: '3px 3px 0 var(--senjr-green-dark)' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  const answeredCount = answers.filter((a) => a !== undefined).length
  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ borderBottom: '2px solid var(--senjr-border)' }}>
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title" style={{ fontSize: 14 }}>Mock Test</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--senjr-radius-full)', background: 'var(--senjr-orange-lighter)', border: '1.5px solid var(--senjr-orange)' }}>
          <Clock size={14} style={{ color: 'var(--senjr-orange)' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-orange)', fontVariantNumeric: 'tabular-nums' }}>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
            {questions.map((_, i) => (
              <div key={i} onClick={() => setCurrentQ(i)}
                style={{
                  flex: 1, height: 6, borderRadius: 3,
                  background: flagged.includes(i) ? 'var(--senjr-orange)' : answers[i] !== undefined ? 'var(--senjr-green)' : 'var(--senjr-border)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: currentQ === i ? '0 0 0 2px white, 0 0 0 4px var(--senjr-green)' : 'none',
                }} />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text)' }}>Q{currentQ + 1}</span>
              <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>of {questions.length}</span>
            </div>
            <span className="senjr-tag" style={{ background: q.difficulty === 'hard' ? '#FEF2F2' : q.difficulty === 'medium' ? '#FFFBEB' : '#F0FDF4', color: q.difficulty === 'hard' ? '#EF4444' : q.difficulty === 'medium' ? '#D97706' : '#059669', fontWeight: 600, fontSize: 11 }}>
              {q.topic} &middot; {q.difficulty}
            </span>
          </div>

          <div className="senjr-card-neo" style={{ marginBottom: 20, padding: 20 }}>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, lineHeight: 1.6, color: 'var(--senjr-text)' }}>{q.text}</p>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => selectAnswer(i)}
                style={{
                  display: 'flex', alignItems: 'center', width: '100%', padding: '14px 16px',
                  marginBottom: 10, borderRadius: 12, textAlign: 'left', fontSize: 14,
                  background: answers[currentQ] === i ? 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' : 'white',
                  color: 'var(--senjr-text)',
                  border: answers[currentQ] === i ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: answers[currentQ] === i ? '2px 2px 0 var(--senjr-green)' : 'none',
                }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: '50%', fontSize: 13, fontWeight: 700,
                  marginRight: 14, flexShrink: 0,
                  background: answers[currentQ] === i ? 'var(--senjr-green)' : 'var(--senjr-bg)',
                  color: answers[currentQ] === i ? 'white' : 'var(--senjr-text-muted)',
                  border: answers[currentQ] === i ? 'none' : '1.5px solid var(--senjr-border)',
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '10px 18px',
                borderRadius: 8, background: 'white', border: '2px solid var(--senjr-border)',
                color: currentQ === 0 ? 'var(--senjr-text-light)' : 'var(--senjr-text)',
                cursor: currentQ === 0 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600,
                opacity: currentQ === 0 ? 0.5 : 1,
              }}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={toggleFlag}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
                borderRadius: 8,
                background: flagged.includes(currentQ) ? '#FEF3C7' : 'white',
                border: `2px solid ${flagged.includes(currentQ) ? '#F59E0B' : 'var(--senjr-border)'}`,
                color: flagged.includes(currentQ) ? '#D97706' : 'var(--senjr-text)',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
              }}>
              <Flag size={14} /> {flagged.includes(currentQ) ? 'Flagged' : 'Flag'}
            </button>
            <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '10px 18px',
                borderRadius: 8, background: 'white', border: '2px solid var(--senjr-border)',
                color: currentQ === questions.length - 1 ? 'var(--senjr-text-light)' : 'var(--senjr-text)',
                cursor: currentQ === questions.length - 1 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600,
                opacity: currentQ === questions.length - 1 ? 0.5 : 1,
              }}>
              Next <ChevronRight size={16} />
            </button>
          </div>

          <button className="senjr-btn senjr-btn-orange" style={{ boxShadow: answeredCount === questions.length ? '3px 3px 0 var(--senjr-orange-dark)' : 'none', opacity: answeredCount === questions.length ? 1 : 0.6 }} onClick={submitTest} disabled={answeredCount < questions.length}>
            Submit Test ({answeredCount}/{questions.length} answered)
          </button>
        </div>
      </div>
    </div>
  )
}
