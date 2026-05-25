import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, User, Loader2 } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { AuthContext } from '../contexts/AuthContext'

export default function StudentSignup() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const [name, setName] = useState(user?.displayName || '')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !user?.uid || !db) return
    setSaving(true)
    try {
      await setDoc(doc(db, 'students', user.uid), {
        uid: user.uid,
        email: user.email || '',
        displayName: name.trim(),
        phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      await setDoc(doc(db, 'users', user.uid), {
        displayName: name.trim(),
        phone,
      }, { merge: true })
      navigate('/onboarding/student/education')
    } catch {
      navigate('/onboarding/student/education')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="senjr-app" style={{ background: 'linear-gradient(180deg, var(--senjr-green-bg) 0%, var(--senjr-bg) 100%)' }}>
      <header className="senjr-header" style={{ background: 'transparent', border: 'none' }}>
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title" style={{ fontWeight: 700 }}>Create Account</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-card-neo-green" style={{ marginBottom: 20, textAlign: 'center', padding: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Apni journey shuru karein!</p>
            <p style={{ fontSize: 13, color: 'var(--senjr-green-dark)' }}>Apna profile complete karein</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="senjr-input-group">
              <label className="senjr-input-label">Full Name</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><User size={18} /></span>
                <input className="senjr-input" style={{ paddingLeft: 40 }} placeholder="Hitesh Agrawal" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Phone Number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ padding: '11px 14px', borderRadius: 'var(--senjr-radius)', border: '1.5px solid var(--senjr-border)', background: 'var(--senjr-bg)', fontSize: 15, fontWeight: 600, color: 'var(--senjr-text-muted)', width: 80, textAlign: 'center' }}>+91</div>
                <input className="senjr-input" type="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ flex: 1 }} />
              </div>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-green" style={{ marginBottom: 16, boxShadow: '3px 3px 0 var(--senjr-green-dark)' }} disabled={!name.trim() || saving}>
              {saving ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <>Continue <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
