import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, ShieldCheck, Mail, Lock, User, AlertCircle, Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, isConfigured, db } from '../firebase/config'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'student' | 'mentor'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!isConfigured || !auth || !db) {
        setError('Firebase is not configured. Please contact support.')
        return
      }

      if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
        const userData = userDoc.data()
        const userRole = (userData?.role as 'student' | 'mentor' | 'pending_mentor' | 'admin') || 'student'

        if (userRole === 'admin') { navigate('/admin') }
        else if (userRole === 'mentor') { navigate('/dashboard/mentor') }
        else if (userRole === 'pending_mentor') { navigate('/mentor/apply') }
        else { navigate('/dashboard/student') }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const initialRole = role === 'mentor' ? 'pending_mentor' : role
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name || email.split('@')[0],
          role: initialRole,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        navigate(role === 'mentor' ? '/mentor-signup' : '/student-signup')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      if (errorMessage.includes('auth/email-already-in-use')) { setError('This email is already registered. Please sign in.') }
      else if (errorMessage.includes('auth/invalid-email')) { setError('Please enter a valid email address.') }
      else if (errorMessage.includes('auth/weak-password')) { setError('Password should be at least 6 characters.') }
      else if (errorMessage.includes('auth/invalid-credential') || errorMessage.includes('auth/wrong-password')) { setError('Invalid email or password.') }
      else if (errorMessage.includes('auth/network-request-failed')) { setError('Network error. Please check your connection.') }
      else { setError('Authentication failed. Please try again.') }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="senjr-app">
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--senjr-green-bg) 0%, var(--senjr-orange-bg) 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', position: 'relative',
      }}>
        <button
          style={{
            position: 'absolute', top: 16, left: 16,
            width: 36, height: 36, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--senjr-bg-card)', border: '1.5px solid var(--senjr-border)',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="senjr-fade-in" style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back!' : 'Join Senjr'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>
            {mode === 'login' ? 'Continue your learning journey' : 'Start learning from seniors'}
          </p>
          {!isConfigured && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, marginTop: 12, color: '#ca8a04', fontSize: 13 }}>
              <AlertCircle size={16} /> <span>Firebase config missing. Contact support.</span>
            </div>
          )}
        </div>

        <div className="senjr-card" style={{
          width: '100%', maxWidth: 400,
        }}>
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button type="button"
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  border: role === 'student' ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)',
                  background: role === 'student' ? 'var(--senjr-green)' : 'var(--senjr-bg-card)',
                  color: role === 'student' ? 'white' : 'var(--senjr-text)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s ease',
                }}
                onClick={() => { setRole('student'); setError('') }}
              >
                <GraduationCap size={16} /> Student
              </button>
              <button type="button"
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  border: role === 'mentor' ? '2px solid var(--senjr-orange)' : '2px solid var(--senjr-border)',
                  background: role === 'mentor' ? 'var(--senjr-orange)' : 'var(--senjr-bg-card)',
                  color: role === 'mentor' ? 'white' : 'var(--senjr-text)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all 0.15s ease',
                }}
                onClick={() => { setRole('mentor'); setError('') }}
              >
                <ShieldCheck size={16} /> Mentor
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid var(--senjr-border)' }}>
                <button type="button"
                  style={{
                    flex: 1, padding: '10px 0', fontSize: 14, fontWeight: 600,
                    background: 'var(--senjr-green)', color: 'white', border: 'none', cursor: 'pointer',
                  }}
                  onClick={() => { setRole('student'); setError('') }}
                >
                  Student
                </button>
                <button type="button"
                  style={{
                    flex: 1, padding: '10px 0', fontSize: 14, fontWeight: 600,
                    background: role === 'mentor' ? 'var(--senjr-orange)' : 'var(--senjr-bg-card)',
                    color: role === 'mentor' ? 'white' : 'var(--senjr-text)', border: 'none', cursor: 'pointer',
                  }}
                  onClick={() => { setRole('mentor'); setError('') }}
                >
                  Mentor
                </button>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8,
              marginBottom: 16, color: '#ef4444', fontSize: 13,
            }}>
              <AlertCircle size={16} /> <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="senjr-input-group">
                <label className="senjr-input-label">Full Name</label>
                <div className="senjr-input-icon">
                  <span className="senjr-input-icon-inner"><User size={18} /></span>
                  <input className="senjr-input" style={{ paddingLeft: 40 }} placeholder="Apna naam likhein" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
            )}

            <div className="senjr-input-group">
              <label className="senjr-input-label">Email</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><Mail size={18} /></span>
                <input className="senjr-input" type="email" style={{ paddingLeft: 40 }} placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Password</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><Lock size={18} /></span>
                <input className="senjr-input" type="password" style={{ paddingLeft: 40 }} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
            </div>

            <button type="submit" className={`senjr-btn ${role === 'mentor' ? 'senjr-btn-orange' : 'senjr-btn-green'}`}
              style={{ marginBottom: 12, opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="senjr-divider-text" style={{ marginBottom: 12 }}>
            <span>{mode === 'login' ? 'New here?' : 'Already registered?'}</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{
                color: role === 'mentor' ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, display: 'flex', alignItems: 'center', gap: 4, margin: '0 auto',
              }}>
              {mode === 'login' ? 'Create a new account' : 'Sign in instead'} <Sparkles size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
