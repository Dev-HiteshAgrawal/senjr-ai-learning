import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function StudentSignup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (value: string) => {
    setForm({ ...form, password: value })
    let strength = 0
    if (value.length >= 6) strength++
    if (value.length >= 8) strength++
    if (/[A-Z]/.test(value)) strength++
    if (/[0-9]/.test(value)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return
    sessionStorage.setItem('signupName', form.name)
    sessionStorage.setItem('signupEmail', form.email)
    sessionStorage.setItem('signupPassword', form.password)
    sessionStorage.setItem('signupPhone', form.phone)
    navigate('/student-education')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">CREATE ACCOUNT</span>
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
          <form onSubmit={handleSubmit}>
            <div className="senjr-input-group">
              <label className="senjr-input-label">Full Name</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><User size={18} /></span>
                <input
                  className="senjr-input"
                  placeholder="Hitesh Agrawal"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Email</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><Mail size={18} /></span>
                <input
                  className="senjr-input"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Phone Number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="senjr-input"
                  style={{ width: 70, textAlign: 'center' }}
                  value="+91"
                  readOnly
                />
                <input
                  className="senjr-input"
                  type="tel"
                  placeholder="98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  style={{ flex: 1 }}
                />
                <button type="button" className="senjr-btn senjr-btn-outline senjr-btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  Send OTP
                </button>
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Password</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><Lock size={18} /></span>
                <input
                  className="senjr-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: i < passwordStrength
                      ? (passwordStrength <= 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)')
                      : 'var(--senjr-border)'
                  }} />
                ))}
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Confirm Password</label>
              <div className="senjr-input-icon">
                <span className="senjr-input-icon-inner"><Lock size={18} /></span>
                <input
                  className="senjr-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <a href="#" style={{ fontSize: 14, color: 'var(--senjr-text)', textDecoration: 'underline' }}>
                Have a referral code?
              </a>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-green" style={{ marginBottom: 16 }}>
              Continue
            </button>

            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--senjr-text-muted)' }}>
              Already have account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/auth') }} style={{ color: 'var(--senjr-green)', fontWeight: 600 }}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
