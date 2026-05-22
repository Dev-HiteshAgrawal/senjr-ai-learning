import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Plus, X, Loader2 } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'

const expertiseOptions = [
  'Machine Learning', 'Deep Learning', 'Python', 'JavaScript', 'React', 'Node.js',
  'Data Science', 'DSA', 'System Design', 'Web Development', 'Mobile Development',
  'AI', 'NLP', 'Computer Vision', 'Cloud Computing', 'DevOps', 'Blockchain',
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'French',
  'JEE Preparation', 'NEET Preparation', 'GATE Preparation', 'UPSC Preparation',
  'Communication Skills', 'Interview Prep', 'Career Guidance', 'Resume Review',
]

export default function MentorProfile() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [hourlyRate, setHourlyRate] = useState(300)
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) setSkills(prev => [...prev, skill])
    setSkillInput('')
  }

  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill))

  const handleComplete = async () => {
    if (skills.length === 0 || !bio.trim()) return
    setLoading(true)
    try {
      const { doc, setDoc } = await import('firebase/firestore')
      const { db, auth: firebaseAuth } = await import('../firebase/config')
      if (db && firebaseAuth?.currentUser) {
        await setDoc(doc(db, 'mentors', firebaseAuth.currentUser.uid), {
          uid: firebaseAuth.currentUser.uid,
          name: user?.displayName || firebaseAuth.currentUser.displayName || 'Mentor',
          email: firebaseAuth.currentUser.email || '',
          skills,
          hourlyRate,
          bio: bio.trim(),
          verificationStatus: 'pending',
          sessionsCompleted: 0,
          rating: 0,
          createdAt: new Date().toISOString(),
        })
        await setDoc(doc(db, 'users', firebaseAuth.currentUser.uid), {
          displayName: user?.displayName || firebaseAuth.currentUser.displayName || 'Mentor',
          role: 'pending_mentor',
          onboardingCompleted: true,
        }, { merge: true })
      }
      if (auth?.refreshUserRole) { await auth.refreshUserRole() }
    } catch (err) { console.error('Profile setup error:', err) }
    finally { setLoading(false); navigate('/onboarding/mentor/success') }
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 4 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 4/5</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'white', margin: '0 auto 16px' }}>
            {user?.displayName?.charAt(0) || 'M'}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Mentor Profile</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', textAlign: 'center', marginBottom: 32 }}>Set up your mentor profile to start accepting students</p>

          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Your Expertise</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {skills.map((s) => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 20, background: 'var(--senjr-green-light)', color: 'var(--senjr-green-dark)', fontSize: 12, fontWeight: 600 }}>
                {s} <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--senjr-green-dark)', display: 'flex' }}><X size={12} /></button>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input className="senjr-input" style={{ flex: 1 }} placeholder="Search or type expertise..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)} />
            <button onClick={() => addSkill(skillInput)} style={{ padding: '10px 14px', borderRadius: 8, background: skillInput ? 'var(--senjr-green)' : 'var(--senjr-border)', color: 'white', border: 'none', cursor: skillInput ? 'pointer' : 'default' }}><Plus size={18} /></button>
          </div>

          {expertiseOptions.filter(e => !skills.includes(e) && e.toLowerCase().includes(skillInput.toLowerCase())).slice(0, 8).map((opt) => (
            <button key={opt} onClick={() => addSkill(opt)} style={{ padding: '6px 12px', borderRadius: 16, background: 'var(--senjr-bg)', border: '1px solid var(--senjr-border)', cursor: 'pointer', fontSize: 12, margin: '0 4px 6px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Plus size={10} /> {opt}
            </button>
          ))}

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Hourly Rate (₹)</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="range" min="50" max="2000" step="50" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} style={{ flex: 1 }} />
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--senjr-green)' }}>₹{hourlyRate}</span>
            </div>
          </div>

          <div className="senjr-input-group" style={{ marginBottom: 32 }}>
            <label className="senjr-input-label">Bio</label>
            <textarea className="senjr-input" rows={4} placeholder="Describe your experience, teaching style, and what students can expect..." value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <button className="senjr-btn" style={{ background: skills.length > 0 && bio.trim() ? 'var(--senjr-green)' : 'var(--senjr-border)', color: skills.length > 0 && bio.trim() ? 'white' : 'var(--senjr-text-muted)' }} disabled={skills.length === 0 || !bio.trim() || loading} onClick={handleComplete}>
            {loading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <>Complete Profile <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
