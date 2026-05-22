import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, GraduationCap, Briefcase, Globe, Star, Check } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'

const roleOptions = [
  { id: 'experienced', label: 'Experienced Professional', icon: <Briefcase size={24} />, desc: '5+ years in industry' },
  { id: 'academic', label: 'Academic / Professor', icon: <GraduationCap size={24} />, desc: 'Teaching at university/college' },
  { id: 'senior', label: 'Senior Expert', icon: <Star size={24} />, desc: '10+ years domain expertise' },
  { id: 'freelancer', label: 'Freelance Expert', icon: <Globe size={24} />, desc: 'Independent professional' },
]

export default function MentorSignup() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [selectedRole, setSelectedRole] = useState('')
  const [name, setName] = useState('')

  const handleContinue = async () => {
    if (!selectedRole || !name.trim() || !auth?.user) return
    try {
      const { doc, setDoc } = await import('firebase/firestore')
      const { db } = await import('../firebase/config')
      if (db) {
        await setDoc(doc(db, 'mentors', auth.user.uid), {
          uid: auth.user.uid,
          name: name.trim(),
          email: auth.user.email || '',
          category: selectedRole,
          verificationStatus: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, { merge: true })
      }
    } catch {}
    navigate('/onboarding/mentor/verify')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 1 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 1/5</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--senjr-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--senjr-green)' }}>
            <GraduationCap size={28} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Become a Mentor</h2>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 24 }}>Share your knowledge and earn while mentoring</p>

          <div className="senjr-input-group" style={{ marginBottom: 20 }}>
            <label className="senjr-input-label">Full Name *</label>
            <input className="senjr-input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Which best describes you?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {roleOptions.map((role) => (
              <button key={role.id} onClick={() => setSelectedRole(role.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12, background: selectedRole === role.id ? 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' : 'var(--senjr-bg)', border: selectedRole === role.id ? '1.5px solid var(--senjr-green)' : '1px solid var(--senjr-border)', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ color: selectedRole === role.id ? 'var(--senjr-green)' : 'var(--senjr-text-muted)' }}>{role.icon}</div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{role.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{role.desc}</p>
                </div>
                {selectedRole === role.id && <Check size={20} style={{ color: 'var(--senjr-green)' }} />}
              </button>
            ))}
          </div>

          <button className="senjr-btn" style={{ background: selectedRole && name.trim() ? 'var(--senjr-green)' : 'var(--senjr-border)', color: selectedRole && name.trim() ? 'white' : 'var(--senjr-text-muted)' }} disabled={!selectedRole || !name.trim()} onClick={handleContinue}>
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
