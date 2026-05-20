import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Camera, CheckCircle, MessageSquare, Link2, AlertCircle, Loader2 } from 'lucide-react'
import { useAuthActions } from '../hooks/useAuth'
import { createStudentProfile } from '../services/firestore'

export default function StudentProfile() {
  const navigate = useNavigate()
  const { signupWithEmail, loading: authLoading } = useAuthActions()
  const [form, setForm] = useState({
    username: 'senjr_student',
    bio: '',
    linkedin: '',
    whatsapp: true,
  })
  const [usernameValid, setUsernameValid] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if we have signup data in sessionStorage
    const email = sessionStorage.getItem('signupEmail')
    const password = sessionStorage.getItem('signupPassword')
    if (!email || !password) {
      // No signup data - redirect to auth
      navigate('/auth')
    }
  }, [navigate])

  const handleUsernameChange = (value: string) => {
    setForm({ ...form, username: value })
    setUsernameValid(value.length >= 3)
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const email = sessionStorage.getItem('signupEmail')
    const password = sessionStorage.getItem('signupPassword')
    const name = sessionStorage.getItem('signupName')

    if (!email || !password || !name) {
      setError('Missing signup information. Please try again.')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await signupWithEmail(email, password, name, 'student')

      if (result.success) {
        const education = JSON.parse(sessionStorage.getItem('signupEducation') || '{}')
        const goals = JSON.parse(sessionStorage.getItem('signupGoals') || '{}')
        const phone = sessionStorage.getItem('signupPhone')

        await createStudentProfile(email, {
          email,
          name,
          phone: phone || undefined,
          education: education.level ? education : undefined,
          goals: goals.goal,
          targetExams: goals.exams,
          weakSubjects: goals.weakSubjects,
          strongSubjects: goals.strongSubjects,
          language: goals.language,
          learningPreferences: goals.studyHours ? { studyHours: goals.studyHours } : undefined,
        })

        sessionStorage.removeItem('signupEmail')
        sessionStorage.removeItem('signupPassword')
        sessionStorage.removeItem('signupName')
        sessionStorage.removeItem('signupRole')
        sessionStorage.removeItem('signupPhone')
        sessionStorage.removeItem('signupEducation')
        sessionStorage.removeItem('signupGoals')

        navigate('/dashboard')
      } else {
        setError(result.error || 'Failed to create account. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getErrorMessage = (errorMsg: string) => {
    if (errorMsg.includes('auth/email-already-in-use')) {
      return 'An account with this email already exists'
    }
    if (errorMsg.includes('auth/weak-password')) {
      return 'Password should be at least 6 characters'
    }
    if (errorMsg.includes('Firebase not configured')) {
      return 'Authentication system not configured. Please contact support.'
    }
    return errorMsg
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

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 8,
              marginBottom: 16,
              color: '#ef4444',
              fontSize: 14
            }}>
              <AlertCircle size={18} />
              <span>{getErrorMessage(error)}</span>
            </div>
          )}

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

            <button
              type="submit"
              className="senjr-btn senjr-btn-green"
              disabled={isSubmitting || authLoading}
              style={{ opacity: isSubmitting || authLoading ? 0.7 : 1 }}
            >
              {isSubmitting || authLoading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Creating account...
                </>
              ) : (
                'Complete Signup'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
