import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Share2, Copy, Trophy, AlertCircle, Loader2 } from 'lucide-react'
import { useAuthActions } from '../hooks/useAuth'
import { createMentorProfile } from '../services/firestore'

export default function MentorSuccess() {
  const navigate = useNavigate()
  const { signupWithEmail, loading: authLoading } = useAuthActions()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const createAccount = async () => {
      const email = sessionStorage.getItem('signupEmail')
      const password = sessionStorage.getItem('signupPassword')
      const name = sessionStorage.getItem('signupName')
      const phone = sessionStorage.getItem('signupPhone')
      const heardAbout = sessionStorage.getItem('signupHeardAbout')
      const verification = JSON.parse(sessionStorage.getItem('signupVerification') || '{}')

      if (!email || !password || !name) {
        return
      }

      setIsSubmitting(true)
      try {
        const result = await signupWithEmail(email, password, name, 'mentor')
        if (result.success) {
          await createMentorProfile(email, {
            email,
            name,
            phone: phone || undefined,
            heardAbout: heardAbout || undefined,
            portfolio: verification.idType ? {
              education: verification.idType,
            } : undefined,
          })

          sessionStorage.removeItem('signupEmail')
          sessionStorage.removeItem('signupPassword')
          sessionStorage.removeItem('signupName')
          sessionStorage.removeItem('signupRole')
          sessionStorage.removeItem('signupPhone')
          sessionStorage.removeItem('signupHeardAbout')
          sessionStorage.removeItem('signupVerification')
        } else {
          setError(result.error || 'Failed to create account')
        }
      } catch {
        setError('An unexpected error occurred')
      } finally {
        setIsSubmitting(false)
      }
    }

    createAccount()
  }, [signupWithEmail])

  const getErrorMessage = (errorMsg: string) => {
    if (errorMsg.includes('auth/email-already-in-use')) return 'An account with this email already exists'
    if (errorMsg.includes('auth/weak-password')) return 'Password should be at least 6 characters'
    if (errorMsg.includes('Firebase not configured')) return 'Authentication system not configured. Please contact support.'
    return errorMsg
  }

  return (
    <div className="senjr-app" style={{
      background: 'linear-gradient(180deg, #F0FDF4 0%, #FFF7ED 50%, #F0FDF4 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
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
            fontSize: 14,
            maxWidth: 400
          }}>
            <AlertCircle size={18} />
            <span>{getErrorMessage(error)}</span>
          </div>
        )}

        {isSubmitting || authLoading ? (
          <>
            <Loader2 size={48} style={{ color: 'var(--senjr-orange)', animation: 'spin 1s linear infinite', marginBottom: 24 }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Creating your account...
            </h2>
            <p style={{ fontSize: 15, color: 'var(--senjr-text-muted)' }}>
              Please wait while we set up your mentor profile
            </p>
          </>
        ) : (
          <>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'var(--senjr-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
              boxShadow: '6px 6px 0 rgba(0,0,0,0.15)'
            }}>
              <Trophy size={48} style={{ color: 'white' }} />
            </div>

            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
              Congratulations!
            </h1>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Application submitted - pending review
            </h2>

            <p style={{ fontSize: 15, color: 'var(--senjr-text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
              Your application is under review by our team.<br />
              You'll be notified once approved (usually within 24-48 hours).
            </p>

            <div className="senjr-card" style={{ width: '100%', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>Your profile link:</p>
                  <p style={{ fontSize: 14, fontWeight: 600, fontFamily: 'monospace' }}>senjr.com/mentor/@userna...</p>
                </div>
                <button className="senjr-btn-icon" style={{ width: 44, height: 44 }}>
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <button className="senjr-btn senjr-btn-orange" style={{ marginBottom: 12 }}>
              <Share2 size={18} /> Share
            </button>

            <button className="senjr-btn senjr-btn-outline" onClick={() => navigate('/mentor-hub')}>
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}
