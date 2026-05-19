import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Search, ChevronDown } from 'lucide-react'

export default function StudentEducation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    level: '',
    college: 'ITM College Aligarh',
    university: 'AKTU',
    city: '',
    state: 'Uttar Pradesh',
    year: '1st',
    graduationYear: '2026',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/student-goals')
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Education Details</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot senjr-step-dot-active" />
        <div className="senjr-step-dot" />
        <div className="senjr-step-dot" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <form onSubmit={handleSubmit}>
            <div className="senjr-input-group">
              <label className="senjr-input-label">Education Level</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="senjr-input"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  required
                >
                  <option value="">Select Level</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Graduate</option>
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">College Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="senjr-input"
                  style={{ borderColor: 'var(--senjr-green)', background: 'var(--senjr-green-bg)' }}
                  value={form.college}
                  onChange={(e) => setForm({ ...form, college: e.target.value })}
                />
                <CheckCircle size={20} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-green)' }} />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">University</label>
              <input
                className="senjr-input"
                style={{ borderStyle: 'dashed', background: 'var(--senjr-bg)' }}
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
              />
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">City</label>
              <div style={{ position: 'relative' }}>
                <span className="senjr-input-icon-inner" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)' }}>
                  <Search size={18} />
                </span>
                <input
                  className="senjr-input"
                  style={{ paddingLeft: 44 }}
                  placeholder="Search city..."
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--senjr-text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">State</label>
              <input
                className="senjr-input"
                style={{ borderStyle: 'dashed', background: 'var(--senjr-bg)' }}
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Year of Study</label>
              <div className="senjr-chip-group">
                {['1st', '2nd', '3rd', 'Final'].map((y) => (
                  <button
                    key={y}
                    type="button"
                    className={`senjr-chip ${form.year === y ? 'senjr-chip-active' : ''}`}
                    onClick={() => setForm({ ...form, year: y })}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Graduation Year</label>
              <input
                className="senjr-input"
                type="number"
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
              />
            </div>

            <button type="submit" className="senjr-btn senjr-btn-green" style={{ marginTop: 24 }}>
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
