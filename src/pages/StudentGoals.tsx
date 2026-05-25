import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, ArrowRight, Star, Brain, BookOpen, Code, PenTool, BarChart3, Globe, Loader2 } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { AuthContext } from '../contexts/AuthContext'

const goals = [
  { id: 'exams', label: 'Exam Preparation', icon: <Target size={20} />, desc: 'JEE, NEET, GATE, UPSC, etc.' },
  { id: 'skills', label: 'Skill Building', icon: <Brain size={20} />, desc: 'Coding, AI, Data Science, etc.' },
  { id: 'academic', label: 'Academic Help', icon: <BookOpen size={20} />, desc: 'School / College subjects' },
  { id: 'coding', label: 'Coding & DSA', icon: <Code size={20} />, desc: 'Interview preparation' },
  { id: 'creative', label: 'Creative Skills', icon: <PenTool size={20} />, desc: 'Writing, Design, etc.' },
  { id: 'career', label: 'Career Guidance', icon: <BarChart3 size={20} />, desc: 'Internships, Jobs, Mentorship' },
  { id: 'language', label: 'Languages', icon: <Globe size={20} />, desc: 'English, Foreign Languages' },
  { id: 'other', label: 'Other', icon: <Star size={20} />, desc: 'Something else' },
]

const weaknesses = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Programming', 'English', 'Logical Reasoning', 'Data Interpretation']

export default function StudentGoals() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedWeaknesses, setSelectedWeaknesses] = useState<string[]>([])
  const [targetExam, setTargetExam] = useState('')
  const [saving, setSaving] = useState(false)

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }

  const toggleWeakness = (w: string) => {
    setSelectedWeaknesses(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w])
  }

  const handleContinue = async () => {
    if (selectedGoals.length === 0 || !user?.uid || !db) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'students', user.uid), {
        goals: selectedGoals,
        targetExams: targetExam ? [targetExam] : [],
        weakSubjects: selectedWeaknesses,
        updatedAt: new Date().toISOString(),
      }, { merge: true })
      navigate('/onboarding/student/profile')
    } catch {
      navigate('/onboarding/student/profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 2 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 3/4</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div className="senjr-pop" style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--senjr-orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--senjr-orange)', border: '2px solid var(--senjr-orange-dark)' }}>
            <Target size={28} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.3px' }}>Your Goals</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 24 }}>What do you want to achieve on Senjr?</p>

          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--senjr-green)' }} />Select your learning goals
          </p>
          <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
            {goals.map((goal) => (
              <button key={goal.id} onClick={() => toggleGoal(goal.id)}
                style={{ padding: 16, borderRadius: 12, textAlign: 'center', background: selectedGoals.includes(goal.id) ? 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' : 'white', border: selectedGoals.includes(goal.id) ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)', cursor: 'pointer', transition: 'all 0.15s', boxShadow: selectedGoals.includes(goal.id) ? '2px 2px 0 var(--senjr-green-dark)' : 'none' }}>
                <div style={{ color: selectedGoals.includes(goal.id) ? 'var(--senjr-green)' : 'var(--senjr-text-muted)', marginBottom: 6 }}>{goal.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{goal.label}</p>
                <p style={{ fontSize: 10, color: 'var(--senjr-text-muted)' }}>{goal.desc}</p>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--senjr-orange)' }} />Topics you find difficult
          </p>
          <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
            {weaknesses.map((w) => (
              <button key={w}
                style={{
                  padding: '8px 16px', borderRadius: 'var(--senjr-radius-full)', fontSize: 13, fontWeight: 500,
                  background: selectedWeaknesses.includes(w) ? 'var(--senjr-green)' : 'white',
                  color: selectedWeaknesses.includes(w) ? 'white' : 'var(--senjr-text-secondary)',
                  border: selectedWeaknesses.includes(w) ? '2px solid var(--senjr-green-dark)' : '2px solid var(--senjr-border)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: selectedWeaknesses.includes(w) ? '2px 2px 0 var(--senjr-green-dark)' : 'none',
                }}
                onClick={() => toggleWeakness(w)}>{w}</button>
            ))}
          </div>

          {selectedGoals.includes('exams') && (
            <div className="senjr-input-group" style={{ marginBottom: 24 }}>
              <label className="senjr-input-label">Target Exam</label>
              <input className="senjr-input" placeholder="E.g. JEE Advanced 2025" value={targetExam} onChange={(e) => setTargetExam(e.target.value)} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="senjr-btn" style={{ background: 'transparent', color: 'var(--senjr-text)', border: '2px solid var(--senjr-border)', width: 'auto' }} onClick={() => navigate('/onboarding/student/education')}>Back</button>
            <button className="senjr-btn" style={{ background: selectedGoals.length > 0 && !saving ? 'var(--senjr-green)' : 'var(--senjr-border)', color: selectedGoals.length > 0 && !saving ? 'white' : 'var(--senjr-text-muted)', flex: 1, boxShadow: selectedGoals.length > 0 && !saving ? '3px 3px 0 var(--senjr-green-dark)' : 'none' }} disabled={selectedGoals.length === 0 || saving} onClick={handleContinue}>
              {saving ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <>Continue <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
