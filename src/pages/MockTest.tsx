import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, Flag, AlertTriangle, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react'

const questions = [
  { id: 1, text: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0, topic: 'Calculus' },
  { id: 2, text: 'Which of the following is a prime number?', options: ['21', '23', '25', '27'], correct: 1, topic: 'Number Theory' },
  { id: 3, text: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, topic: 'Chemistry' },
  { id: 4, text: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1, topic: 'Physics' },
  { id: 5, text: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correct: 2, topic: 'Environmental Science' },
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
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 60 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: 'var(--senjr-orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <BarChart3 size={36} style={{ color: 'var(--senjr-orange)' }} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Weekly Mock Test</h2>
            <p style={{ color: 'var(--senjr-text-muted)', marginBottom: 16 }}>Topic: Mathematics, Physics & Chemistry</p>
            <div className="senjr-card" style={{ border: '1px solid var(--senjr-border)', marginBottom: 20, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Questions</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{questions.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Duration</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>60 min</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Marking</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>+4, -1</span>
              </div>
            </div>
            <button className="senjr-btn" style={{ background: 'var(--senjr-orange)', color: 'white', width: '100%' }} onClick={() => setStarted(true)}>Start Test</button>
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
          <div className="senjr-content" style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: percentage >= 70 ? 'var(--senjr-green-light)' : 'var(--senjr-orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: percentage >= 70 ? 'var(--senjr-green)' : 'var(--senjr-orange)' }}>{percentage}%</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              {percentage >= 80 ? 'Outstanding!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing'}
            </h2>
            <p style={{ color: 'var(--senjr-text-muted)', marginBottom: 24 }}>{correctCount}/{questions.length} correct answers</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <div className="senjr-card" style={{ flex: 1, textAlign: 'center', border: '1px solid var(--senjr-green-light)' }}>
                <CheckCircle size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 4px' }} />
                <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--senjr-green)' }}>{correctCount}</p>
                <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>Correct</p>
              </div>
              <div className="senjr-card" style={{ flex: 1, textAlign: 'center', border: '1px solid #FCA5A5' }}>
                <AlertTriangle size={20} style={{ color: '#EF4444', margin: '0 auto 4px' }} />
                <p style={{ fontSize: 22, fontWeight: 800, color: '#EF4444' }}>{questions.length - correctCount}</p>
                <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>Incorrect</p>
              </div>
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8, textAlign: 'left' }}>Review Questions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions.map((q, i) => (
                <div key={q.id} className="senjr-card" style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--senjr-border)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, background: answers[i] === q.correct ? 'var(--senjr-green-light)' : '#FEE2E2', color: answers[i] === q.correct ? 'var(--senjr-green)' : '#EF4444' }}>
                    {answers[i] === q.correct ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Question {i + 1}</p>
                    <p style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>{q.topic}</p>
                  </div>
                  <span className="senjr-badge" style={{ background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)' }}>{q.correct === answers[i] ? 'Correct' : 'Wrong'}</span>
                </div>
              ))}
            </div>

            <button className="senjr-btn" style={{ background: 'var(--senjr-green)', color: 'white', marginTop: 20 }} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
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
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title" style={{ fontSize: 14 }}>Mock Test</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: 'var(--senjr-orange)' }}>
          <Clock size={14} /> {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            {questions.map((_, i) => (
              <div key={i} onClick={() => setCurrentQ(i)} style={{ flex: 1, height: 4, borderRadius: 2, background: flagged.includes(i) ? 'var(--senjr-orange)' : answers[i] !== undefined ? 'var(--senjr-green)' : 'var(--senjr-border)', cursor: 'pointer', opacity: currentQ === i ? 1 : 0.6 }} />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Question {currentQ + 1} of {questions.length}</span>
            <span className="senjr-badge" style={{ background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)' }}>{q.topic}</span>
          </div>

          <div className="senjr-card" style={{ marginBottom: 20, padding: 20 }}>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, lineHeight: 1.5 }}>{q.text}</p>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => selectAnswer(i)}
                style={{ display: 'block', width: '100%', padding: '14px 16px', marginBottom: 10, borderRadius: 12, textAlign: 'left', fontSize: 14, background: answers[currentQ] === i ? 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' : 'var(--senjr-bg)', color: 'var(--senjr-text)', border: answers[currentQ] === i ? '1.5px solid var(--senjr-green)' : '1.5px solid var(--senjr-border)', cursor: 'pointer', transition: 'all 0.15s' }}>
                <span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: '50%', textAlign: 'center', lineHeight: '22px', fontSize: 12, fontWeight: 700, marginRight: 12, background: answers[currentQ] === i ? 'var(--senjr-green)' : 'var(--senjr-border)', color: answers[currentQ] === i ? 'white' : 'var(--senjr-text-muted)' }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 8, background: 'transparent', border: '1px solid var(--senjr-border)', color: currentQ === 0 ? 'var(--senjr-text-light)' : 'var(--senjr-text)', cursor: currentQ === 0 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={toggleFlag} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, background: flagged.includes(currentQ) ? '#FEF3C7' : 'transparent', border: `1px solid ${flagged.includes(currentQ) ? '#F59E0B' : 'var(--senjr-border)'}`, color: flagged.includes(currentQ) ? '#D97706' : 'var(--senjr-text)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              <Flag size={14} /> {flagged.includes(currentQ) ? 'Flagged' : 'Flag'}
            </button>
            <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 8, background: 'transparent', border: '1px solid var(--senjr-border)', color: currentQ === questions.length - 1 ? 'var(--senjr-text-light)' : 'var(--senjr-text)', cursor: currentQ === questions.length - 1 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}>
              Next <ChevronRight size={16} />
            </button>
          </div>

          <button className="senjr-btn" style={{ background: 'var(--senjr-orange)', color: 'white', opacity: answeredCount === questions.length ? 1 : 0.6 }} onClick={submitTest} disabled={answeredCount < questions.length}>
            Submit Test ({answeredCount}/{questions.length} answered)
          </button>
        </div>
      </div>
    </div>
  )
}
