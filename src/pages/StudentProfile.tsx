import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, ArrowRight, Camera, Loader2 } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { AuthContext } from '../contexts/AuthContext'

export default function StudentProfile() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const [name, setName] = useState(user?.displayName || '')
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const handleComplete = async () => {
    if (!name.trim() || !user?.uid || !db) return
    setLoading(true)
    try {
      await setDoc(doc(db, 'students', user.uid), {
        displayName: name.trim(),
        bio: bio.trim(),
        city: city.trim(),
        updatedAt: new Date().toISOString(),
      }, { merge: true })
      await setDoc(doc(db, 'users', user.uid), {
        displayName: name.trim(),
        bio: bio.trim(),
        city: city.trim(),
        onboardingCompleted: true,
      }, { merge: true })
      if (auth?.refreshUserRole) await auth.refreshUserRole()
    } catch (err) { console.error('Profile update error:', err) }
    finally { setLoading(false); navigate('/dashboard/student') }
  }

  return (
    <div className="senjr-app" style={{ background: 'linear-gradient(180deg, var(--senjr-green-bg) 0%, var(--senjr-bg) 100%)' }}>
      <header className="senjr-header">
        <div />
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i < 3 ? 'var(--senjr-green)' : 'var(--senjr-border)' }} />)}
        </div>
        <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Step 4/4</span>
      </header>

      <div className="senjr-page">
        <div className="senjr-content" style={{ paddingTop: 20 }}>
          <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto 20px' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--senjr-bg)', border: '3px dashed var(--senjr-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <User size={36} style={{ color: 'var(--senjr-text-muted)' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 30, height: 30, borderRadius: '50%', background: 'var(--senjr-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '2px solid white', boxShadow: '2px 2px 0 var(--senjr-green-dark)' }}>
              <Camera size={14} />
            </div>
          </div>

          <div className="senjr-card-neo" style={{ textAlign: 'center', padding: 16, marginBottom: 24, background: 'linear-gradient(135deg, #ECFDF5, #FFF7ED)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.3px' }}>Almost Done!</h2>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>Set up your profile to get started</p>
          </div>

          <div className="senjr-input-group" style={{ marginBottom: 16 }}>
            <label className="senjr-input-label">Full Name</label>
            <input className="senjr-input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} style={{ border: '2px solid var(--senjr-border)' }} />
          </div>

          <div className="senjr-input-group" style={{ marginBottom: 16 }}>
            <label className="senjr-input-label">Short Bio</label>
            <textarea className="senjr-input" rows={3} placeholder="E.g. IIT aspirant passionate about physics and math" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <div className="senjr-input-group" style={{ marginBottom: 32 }}>
            <label className="senjr-input-label">City</label>
            <input className="senjr-input" placeholder="Your city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <button className="senjr-btn senjr-btn-green" style={{ boxShadow: name.trim() && !loading ? '3px 3px 0 var(--senjr-green-dark)' : 'none', opacity: !name.trim() || loading ? 0.6 : 1 }} disabled={!name.trim() || loading} onClick={handleComplete}>
            {loading ? <><Loader2 size={18} className="animate-spin" /> Setting up...</> : <>Complete Setup <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
