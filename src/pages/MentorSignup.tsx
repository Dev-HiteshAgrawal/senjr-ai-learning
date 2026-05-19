import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function MentorSignup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: 'Rahul Sharma',
    email: 'mentor@email.com',
    phone: '',
    password: '',
    confirmPassword: '',
    heardAbout: '',
    ageConfirm: false,
    guidelinesAgree: false,
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

  const canContinue = form.ageConfirm && form.guidelinesAgree && form.password === form.confirmPassword && form.password.length >= 6

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canContinue) navigate('/mentor-verify')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Become a Mentor</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-card-orange" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}></span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>Share your knowledge. Earn money.</p>
                <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>Build your profile.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="senjr-input-group">
              <label className="senjr-input-label">Full Name</label>
              <input className="senjr-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Email</label>
              <input className="senjr-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Phone Number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="senjr-input" style={{ width: 70, textAlign: 'center' }} value="+91" readOnly />
                <input className="senjr-input" type="tel" placeholder="Enter mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ flex: 1 }} />
                <button type="button" className="senjr-btn senjr-btn-outline senjr-btn-sm" style={{ whiteSpace: 'nowrap' }}>Send OTP</button>
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="senjr-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <button type="button" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i < passwordStrength
                      ? (passwordStrength <= 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)')
                      : 'var(--senjr-border)'
                  }} />
                ))}
                <span style={{ fontSize: 12, color: passwordStrength <= 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)', marginLeft: 8 }}>
                  {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 2 ? 'Medium' : 'Strong'}
                </span>
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Confirm Password</label>
              <input className="senjr-input" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">How did you hear about us?</label>
              <select className="senjr-input" value={form.heardAbout} onChange={(e) => setForm({ ...form, heardAbout: e.target.value })}>
                <option value="">Select an option</option>
                <option>Social Media</option>
                <option>Friend Referral</option>
                <option>College Campus</option>
                <option>Google Search</option>
                <option>Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12, fontSize: 14, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.ageConfirm}
                  onChange={(e) => setForm({ ...form, ageConfirm: e.target.checked })}
                  style={{ marginTop: 2, accentColor: 'var(--senjr-orange)' }}
                />
                I confirm I am 18+ years old
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.guidelinesAgree}
                  onChange={(e) => setForm({ ...form, guidelinesAgree: e.target.checked })}
                  style={{ marginTop: 2, accentColor: 'var(--senjr-orange)' }}
                />
                I agree to <a href="#" style={{ color: 'var(--senjr-orange)', textDecoration: 'underline' }}>Mentor Guidelines</a>
              </label>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-orange" disabled={!canContinue} style={{ opacity: canContinue ? 1 : 0.5, marginBottom: 16 }}>
              Continue
            </button>

            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--senjr-text-muted)' }}>
              Already registered?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/auth') }} style={{ color: 'var(--senjr-orange)', fontWeight: 600 }}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
