import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Camera, CheckCircle, MessageSquare, Link2 } from 'lucide-react'

export default function StudentProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: 'senjr_student',
    bio: '',
    linkedin: '',
    whatsapp: true,
  })
  const [usernameValid, setUsernameValid] = useState(true)

  const handleUsernameChange = (value: string) => {
    setForm({ ...form, username: value })
    setUsernameValid(value.length >= 3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Complete Profile</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot senjr-step-dot-active" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>
            Step 4 of 4
          </p>

          <div className="senjr-card-green" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--senjr-green)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Star size={22} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>Complete profile to earn +50 XP!</p>
                <span className="senjr-badge senjr-badge-orange"> Level 1 Newcomer</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 100, height: 100, borderRadius: 16,
                border: '2px dashed var(--senjr-text)',
                background: 'var(--senjr-bg)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', cursor: 'pointer', gap: 4
              }}>
                <Camera size={28} style={{ color: 'var(--senjr-text-muted)' }} />
                <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Tap to upload</span>
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="senjr-input"
                  placeholder="@senjr_student"
                  value={form.username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  style={{ paddingLeft: 32, ...(usernameValid ? { borderColor: 'var(--senjr-green)' } : {}) }}
                />
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)', fontSize: 16 }}>@</span>
                {usernameValid && (
                  <CheckCircle size={20} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-green)' }} />
                )}
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Bio</label>
              <textarea
                className="senjr-input"
                rows={3}
                placeholder="Tell the community a bit about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                maxLength={200}
              />
              <p style={{ textAlign: 'right', fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 4 }}>
                {form.bio.length}/200
              </p>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">
                <Link2 size={14} style={{ display: 'inline', marginRight: 4 }} />
                LinkedIn <span style={{ fontWeight: 400, color: 'var(--senjr-text-muted)' }}>(Optional)</span>
              </label>
              <input
                className="senjr-input"
                placeholder="linkedin.com/in/username"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              />
            </div>

            <div className="senjr-card-flat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare size={18} style={{ color: 'var(--senjr-green)' }} />
                <span style={{ fontSize: 14, fontWeight: 500 }}>Use same number for WhatsApp</span>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, whatsapp: !form.whatsapp })}
                style={{
                  width: 48, height: 28, borderRadius: 14,
                  background: form.whatsapp ? 'var(--senjr-green)' : 'var(--senjr-border)',
                  position: 'relative', transition: 'background 0.2s', border: 'none', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: 3,
                  left: form.whatsapp ? 23 : 3,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-green">
              Complete Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
