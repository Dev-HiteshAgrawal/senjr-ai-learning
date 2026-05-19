import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Briefcase, GraduationCap, Wrench, TrendingDown, TrendingUp } from 'lucide-react'

export default function StudentGoals() {
  const navigate = useNavigate()
  const [goal, setGoal] = useState('Govt Job')
  const [exams, setExams] = useState<string[]>(['UP Police', 'SSC CGL'])
  const [weakSubjects, setWeakSubjects] = useState<string[]>(['Maths'])
  const [strongSubjects, setStrongSubjects] = useState<string[]>(['Science'])
  const [language, setLanguage] = useState('Hinglish')
  const [studyHours, setStudyHours] = useState('3-4h')

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/student-profile')
  }

  const goals = [
    { id: 'Govt Job', icon: Building2, label: 'Govt Job' },
    { id: 'Private Job', icon: Briefcase, label: 'Private Job' },
    { id: 'Higher Studies', icon: GraduationCap, label: 'Higher Studies' },
    { id: 'Skill Learning', icon: Wrench, label: 'Skill Learning' },
  ]

  const allExams = ['UP Police', 'SSC CGL', 'Banking', 'CAT', 'MAT', 'CUET']
  const allWeak = ['Maths', 'English', 'GK']
  const allStrong = ['Reasoning', 'Science']

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Your Goals</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <form onSubmit={handleSubmit}>
            <h2 className="senjr-section-title" style={{ fontSize: 18 }}>What is your primary goal?</h2>
            <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
              {goals.map((g) => {
                const Icon = g.icon
                return (
                  <button
                    key={g.id}
                    type="button"
                    className={`senjr-card-flat ${goal === g.id ? 'senjr-card-green' : ''}`}
                    style={{
                      textAlign: 'center',
                      padding: 16,
                      cursor: 'pointer',
                      marginBottom: 0,
                      border: goal === g.id ? '2px solid var(--senjr-green)' : undefined,
                    }}
                    onClick={() => setGoal(g.id)}
                  >
                    <Icon size={24} style={{ margin: '0 auto 8px', color: goal === g.id ? 'var(--senjr-green)' : 'var(--senjr-text-muted)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{g.label}</span>
                  </button>
                )
              })}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              Target Exams <span style={{ fontWeight: 400, fontSize: 13, color: 'var(--senjr-text-muted)' }}>(Select multiple)</span>
            </h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allExams.map((e) => (
                <button
                  key={e}
                  type="button"
                  className={`senjr-chip ${exams.includes(e) ? 'senjr-chip-active' : ''}`}
                  onClick={() => toggleItem(exams, setExams, e)}
                >
                  {e}
                </button>
                ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              <TrendingDown size={16} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Weak Subjects
            </h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allWeak.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`senjr-chip ${weakSubjects.includes(s) ? 'senjr-chip-orange' : ''}`}
                  onClick={() => toggleItem(weakSubjects, setWeakSubjects, s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              <TrendingUp size={16} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-green)' }} />
              Strong Subjects
            </h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allStrong.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`senjr-chip ${strongSubjects.includes(s) ? 'senjr-chip-active' : ''}`}
                  onClick={() => toggleItem(strongSubjects, setStrongSubjects, s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Preferred Language</h2>
            <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
              {['Hindi', 'English', 'Hinglish'].map((l) => (
                <button
                  key={l}
                  type="button"
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    fontSize: 14,
                    fontWeight: 600,
                    border: '2px solid var(--senjr-text)',
                    background: language === l ? 'var(--senjr-green)' : 'var(--senjr-bg-card)',
                    color: language === l ? 'white' : 'var(--senjr-text)',
                    cursor: 'pointer',
                    ...(l === 'Hindi' ? { borderRadius: '8px 0 0 8px' } : {}),
                    ...(l === 'Hinglish' ? { borderRadius: '0 8px 8px 0' } : {}),
                  }}
                  onClick={() => setLanguage(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Study Hours / Day</h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {['1-2h', '3-4h', '5-6h', '6h+'].map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`senjr-chip ${studyHours === h ? (h === '3-4h' ? 'senjr-chip-orange' : 'senjr-chip-active') : ''}`}
                  onClick={() => setStudyHours(h)}
                >
                  {h}
                </button>
              ))}
            </div>

            <button type="submit" className="senjr-btn senjr-btn-green">
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
