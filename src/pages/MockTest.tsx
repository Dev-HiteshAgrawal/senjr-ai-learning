import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, TrendingUp, AlertCircle, Home, BookOpen, User, Target, ChevronRight } from 'lucide-react'

export default function MockTest() {
  const navigate = useNavigate()
  const [view, setView] = useState<'select' | 'test' | 'result'>('select')
  const [selectedExam, setSelectedExam] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(3600)
  const [testStarted, setTestStarted] = useState(false)

  const exams = [
    {
      id: 'up-police',
      name: 'UP Police Constable',
      questions: 25,
      duration: '60 min',
      difficulty: 'Medium',
      icon: 'shield',
      color: 'var(--senjr-green)',
      bg: 'var(--senjr-green-bg)',
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL Tier 1',
      questions: 25,
      duration: '60 min',
      difficulty: 'Hard',
      icon: 'trophy',
      color: 'var(--senjr-orange)',
      bg: 'var(--senjr-orange-bg)',
    },
    {
      id: 'jee-maths',
      name: 'JEE Maths Topic Test',
      questions: 15,
      duration: '30 min',
      difficulty: 'Hard',
      icon: 'target',
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      id: 'bba-entrance',
      name: 'BBA Entrance Mock',
      questions: 20,
      duration: '45 min',
      difficulty: 'Easy',
      icon: 'book',
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
  ]

  const sampleQuestions = [
    {
      id: 1,
      question: 'If the ratio of two numbers is 3:5 and their sum is 48, what is the larger number?',
      options: ['20', '25', '30', '35'],
      correct: 2,
      subject: 'Maths',
      explanation: 'Ratio 3:5 means parts = 3x + 5x = 8x = 48, so x = 6. Larger number = 5x = 30.',
    },
    {
      id: 2,
      question: 'Which article of the Indian Constitution deals with the Right to Equality?',
      options: ['Article 14-18', 'Article 19-22', 'Article 23-24', 'Article 25-28'],
      correct: 0,
      subject: 'GK',
      explanation: 'Articles 14-18 deal with Right to Equality including equality before law, prohibition of discrimination, etc.',
    },
    {
      id: 3,
      question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '46'],
      correct: 1,
      subject: 'Reasoning',
      explanation: 'Differences: 4, 6, 8, 10, 12. So next = 30 + 12 = 42.',
    },
    {
      id: 4,
      question: 'The capital of Uttar Pradesh is:',
      options: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
      correct: 0,
      subject: 'GK',
      explanation: 'Lucknow is the capital of Uttar Pradesh.',
    },
    {
      id: 5,
      question: 'If x² - 5x + 6 = 0, what are the roots?',
      options: ['2, 3', '1, 6', '-2, -3', '-1, -6'],
      correct: 0,
      subject: 'Maths',
      explanation: 'x² - 5x + 6 = (x-2)(x-3) = 0, so roots are 2 and 3.',
    },
  ]

  const previousAttempts = [
    { exam: 'UP Police Set 10', score: '18/25', percent: 72, date: '2 days ago' },
    { exam: 'UP Police Set 9', score: '15/25', percent: 60, date: '5 days ago' },
    { exam: 'SSC CGL Mock 3', score: '20/25', percent: 80, date: '1 week ago' },
  ]

  useEffect(() => {
    if (view === 'test' && testStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setView('result')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [view, testStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleStartTest = (examId: string) => {
    setSelectedExam(examId)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(3600)
    setTestStarted(true)
    setView('test')
  }

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex })
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setView('result')
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getScore = () => {
    let correct = 0
    sampleQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++
    })
    return correct
  }

  const score = getScore()
  const totalQuestions = sampleQuestions.length
  const percentage = Math.round((score / totalQuestions) * 100)

  if (view === 'result') {
    return (
      <div className="senjr-app">
        <header className="senjr-header">
          <button className="senjr-header-back" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
          </button>
          <span className="senjr-header-title">Test Result</span>
          <div style={{ width: 36 }} />
        </header>

        <div className="senjr-page">
          <div className="senjr-content">
            <div style={{
              background: percentage >= 70 ? 'var(--senjr-green-bg)' : percentage >= 50 ? 'var(--senjr-orange-bg)' : '#FEF2F2',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              marginBottom: 20,
              border: '2px solid var(--senjr-text)',
              boxShadow: '3px 3px 0 var(--senjr-text)',
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: percentage >= 70 ? 'var(--senjr-green)' : percentage >= 50 ? 'var(--senjr-orange)' : '#EF4444',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                border: '3px solid var(--senjr-text)',
              }}>
                <Trophy size={36} style={{ color: 'white' }} />
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
                {percentage >= 70 ? 'Great Job! ' : percentage >= 50 ? 'Good Effort! ' : 'Keep Practicing! '}
              </h1>
              <p style={{ fontSize: 16, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>
                You scored {score}/{totalQuestions}
              </p>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                border: `8px solid ${percentage >= 70 ? 'var(--senjr-green)' : percentage >= 50 ? 'var(--senjr-orange)' : '#EF4444'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                background: 'white',
              }}>
                <span style={{ fontSize: 32, fontWeight: 800 }}>{percentage}%</span>
              </div>
            </div>

            <div className="senjr-grid-2" style={{ marginBottom: 20 }}>
              <div className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, marginBottom: 0, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
                <CheckCircle size={24} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
                <span className="senjr-stat-value" style={{ fontSize: 24, color: 'var(--senjr-green)' }}>{score}</span>
                <span className="senjr-stat-label">Correct</span>
              </div>
              <div className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, marginBottom: 0, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
                <XCircle size={24} style={{ color: '#EF4444', margin: '0 auto 8px' }} />
                <span className="senjr-stat-value" style={{ fontSize: 24, color: '#EF4444' }}>{totalQuestions - score}</span>
                <span className="senjr-stat-label">Wrong</span>
              </div>
            </div>

            <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
              <h3 className="senjr-section-title" style={{ fontSize: 16 }}>Question Review</h3>
              {sampleQuestions.map((q, i) => {
                const isCorrect = answers[i] === q.correct
                return (
                  <div key={i} style={{
                    padding: '12px',
                    borderRadius: 10,
                    marginBottom: i < sampleQuestions.length - 1 ? 8 : 0,
                    background: isCorrect ? 'var(--senjr-green-bg)' : '#FEF2F2',
                    border: `1px solid ${isCorrect ? 'var(--senjr-green-light)' : '#FECACA'}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      {isCorrect ? (
                        <CheckCircle size={16} style={{ color: 'var(--senjr-green)' }} />
                      ) : (
                        <XCircle size={16} style={{ color: '#EF4444' }} />
                      )}
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Q{i + 1}: {q.subject}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>{q.question}</p>
                    {!isCorrect && (
                      <p style={{ fontSize: 12, color: 'var(--senjr-green-dark)', fontWeight: 500 }}>
                        Correct: {q.options[q.correct]}
                      </p>
                    )}
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 4 }}>
                      {q.explanation}
                    </p>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="senjr-btn senjr-btn-outline" onClick={() => navigate('/dashboard')}>
                <Home size={18} /> Dashboard
              </button>
              <button className="senjr-btn senjr-btn-green" onClick={() => handleStartTest(selectedExam)}>
                <TrendingUp size={18} /> Retry Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'test') {
    const question = sampleQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

    return (
      <div className="senjr-app">
        <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
          <button className="senjr-header-back" style={{ borderColor: '#334155', color: 'white' }} onClick={() => setView('select')}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={16} style={{ color: timeLeft < 300 ? '#EF4444' : 'var(--senjr-green)' }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: timeLeft < 300 ? '#EF4444' : 'white' }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button style={{ color: 'var(--senjr-orange)', fontWeight: 600, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setView('result')}>
            Submit
          </button>
        </header>

        <div className="senjr-page">
          <div className="senjr-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="senjr-badge senjr-badge-green">{question.subject}</span>
            </div>

            <div className="senjr-progress-bar" style={{ marginBottom: 20 }}>
              <div className="senjr-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="senjr-card" style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>{question.question}</h2>
            </div>

            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '14px 16px',
                  marginBottom: 10,
                  borderRadius: 12,
                  border: answers[currentQuestion] === i ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-text)',
                  background: answers[currentQuestion] === i ? 'var(--senjr-green-bg)' : 'white',
                  cursor: 'pointer',
                  boxShadow: answers[currentQuestion] === i ? '2px 2px 0 var(--senjr-green)' : '2px 2px 0 var(--senjr-text)',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: `2px solid ${answers[currentQuestion] === i ? 'var(--senjr-green)' : 'var(--senjr-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: answers[currentQuestion] === i ? 'var(--senjr-green)' : 'white',
                  color: answers[currentQuestion] === i ? 'white' : 'var(--senjr-text-muted)',
                  fontSize: 13, fontWeight: 600,
                }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{opt}</span>
              </button>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                className="senjr-btn senjr-btn-outline"
                style={{ flex: 1 }}
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="senjr-btn senjr-btn-green"
                style={{ flex: 1 }}
                onClick={handleNext}
              >
                {currentQuestion === sampleQuestions.length - 1 ? 'Submit' : 'Next'} <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>Question Navigator</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sampleQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestion(i)}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      border: '2px solid var(--senjr-text)',
                      background: i === currentQuestion ? 'var(--senjr-green)' : answers[i] !== undefined ? 'var(--senjr-green-bg)' : 'white',
                      color: i === currentQuestion ? 'white' : 'var(--senjr-text)',
                      fontSize: 13, fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: i === currentQuestion ? 'none' : '2px 2px 0 var(--senjr-text)',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Mock Tests</span>
        <button className="senjr-btn-icon">
          <Target size={18} />
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Practice Tests</h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>Simulate real exam conditions</p>
          </div>

          <div className="senjr-card-green" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Trophy size={24} style={{ color: 'var(--senjr-green)' }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Your Best Score</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--senjr-green-dark)' }}>80%</p>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>SSC CGL Mock 3 • 1 week ago</p>
              </div>
            </div>
          </div>

          <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Available Tests</h2>
          {exams.map((exam) => (
            <button
              key={exam.id}
              className="senjr-card-flat"
              style={{
                width: '100%',
                textAlign: 'left',
                marginBottom: 12,
                cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
                background: exam.bg,
              }}
              onClick={() => handleStartTest(exam.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--senjr-border)',
                }}>
                  {exam.icon === 'shield' && <AlertCircle size={24} style={{ color: exam.color }} />}
                  {exam.icon === 'trophy' && <Trophy size={24} style={{ color: exam.color }} />}
                  {exam.icon === 'target' && <Target size={24} style={{ color: exam.color }} />}
                  {exam.icon === 'book' && <BookOpen size={24} style={{ color: exam.color }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{exam.name}</h3>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{exam.questions} Questions</span>
                    <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{exam.duration}</span>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: exam.difficulty === 'Easy' ? 'var(--senjr-green)' : exam.difficulty === 'Medium' ? 'var(--senjr-orange)' : '#EF4444',
                    }}>{exam.difficulty}</span>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--senjr-text-muted)' }} />
              </div>
            </button>
          ))}

          <h2 className="senjr-section-title" style={{ fontSize: 16, marginTop: 24, marginBottom: 12 }}>Previous Attempts</h2>
          {previousAttempts.map((attempt, i) => (
            <div key={i} className="senjr-card-flat" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 8,
              border: '1px solid var(--senjr-border)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: attempt.percent >= 70 ? 'var(--senjr-green-bg)' : attempt.percent >= 50 ? 'var(--senjr-orange-bg)' : '#FEF2F2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: attempt.percent >= 70 ? 'var(--senjr-green)' : attempt.percent >= 50 ? 'var(--senjr-orange)' : '#EF4444' }}>
                  {attempt.percent}%
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{attempt.exam}</p>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{attempt.score} • {attempt.date}</p>
              </div>
              <button
                className="senjr-btn senjr-btn-sm"
                style={{
                  padding: '6px 12px',
                  background: 'var(--senjr-green)',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600,
                  border: 'none',
                }}
                onClick={() => handleStartTest('up-police')}
              >
                Retry
              </button>
            </div>
          ))}
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item" onClick={() => navigate('/dashboard')}>
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}>
          <BookOpen size={20} />
          Learn
        </button>
        <button className="senjr-nav-item senjr-nav-item-active">
          <Target size={20} />
          Tests
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/profile')}>
          <User size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
