import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, ShieldCheck, Mail, Lock, User } from 'lucide-react'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'student' | 'mentor'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signup') {
      if (role === 'student') {
        navigate('/student-signup')
      } else {
        navigate('/mentor-signup')
      }
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="senjr-app" style={{
      background: 'linear-gradient(180deg, var(--senjr-green-bg) 0%, var(--senjr-orange-bg) 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'var(--senjr-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '4px 4px 0 var(--senjr-text)'
          }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back' : 'Join Senjr'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>
            {mode === 'login' ? 'Sign in to continue learning' : 'Create your account'}
          </p>
        </div>

        <div className="senjr-card" style={{ width: '100%', maxWidth: 400 }}>
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button
                type="button"
                style={{
                  flex: 1, padding: '12px 0',
                  borderRadius: 10, fontSize: 14, fontWeight: 600,
                  border: role === 'student' ? '2px solid var(--senjr-green)' : '2px solid var(--senjr-border)',
                  background: role === 'student' ? 'var(--senjr-green)' : 'var(--senjr-bg-card)',
                  color: role === 'student' ? 'white' : 'var(--senjr-text)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}
                onClick={() => setRole('student')}
              >
                <GraduationCap size={16} /> Student
              </button>
              <button
                type="button"
                style={{
                  flex: 1, padding: '12px 0',
                  borderRadius: 10, fontSize: 14, fontWeight: 600,
                  border: role === 'mentor' ? '2px solid var(--senjr-orange)' : '2px solid var(--senjr-border)',
                  background: role === 'mentor' ? 'var(--senjr-orange)' : 'var(--senjr-bg-card)',
                  color: role === 'mentor' ? 'white' : 'var(--senjr-text)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}
                onClick={() => setRole('mentor')}
              >
                <ShieldCheck size={16} /> Mentor
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="senjr-input-group">
                <label className="senjr-input-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="senjr-input"
                    style={{ paddingLeft: 40 }}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <User size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
                </div>
              </div>
            )}

            <div className="senjr-input-group">
              <label className="senjr-input-label">Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="senjr-input"
                  type="email"
                  style={{ paddingLeft: 40 }}
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="senjr-input"
                  type="password"
                  style={{ paddingLeft: 40 }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Lock size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} />
              </div>
            </div>

            <button
              type="submit"
              className={`senjr-btn ${role === 'mentor' ? 'senjr-btn-orange' : 'senjr-btn-green'}`}
              style={{ marginBottom: 16 }}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>
              {mode === 'login' ? (
                <>Don't have an account?{' '}
                  <button type="button" onClick={() => setMode('signup')} style={{ color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                    Sign up
                  </button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')} style={{ color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
          <button
            className="senjr-btn senjr-btn-outline senjr-btn-sm"
            style={{ width: 'auto', padding: '10px 20px' }}
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
