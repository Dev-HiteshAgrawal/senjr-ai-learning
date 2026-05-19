import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'

export default function MentorProfile() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState<string[]>(['BBA', 'Economics', 'English'])
  const [languages, setLanguages] = useState<string[]>(['English', 'Hinglish'])
  const [experience, setExperience] = useState('Fresher')
  const [hourlyRate, setHourlyRate] = useState(250)
  const [bio, setBio] = useState('')
  const [teachingStyle, setTeachingStyle] = useState<string[]>(['Exam-focused', 'Doubt-solving'])
  const [availability, setAvailability] = useState({
    mon: { am: false, pm: true },
    tue: { am: false, pm: true },
    wed: { am: false, pm: true },
    thu: { am: true, pm: true },
    fri: { am: true, pm: true },
    sat: { am: true, pm: true },
    sun: { am: false, pm: false },
  })

  const toggleSubject = (s: string) => {
    if (subjects.includes(s)) setSubjects(subjects.filter((i) => i !== s))
    else setSubjects([...subjects, s])
  }

  const toggleLanguage = (l: string) => {
    if (languages.includes(l)) setLanguages(languages.filter((i) => i !== l))
    else setLanguages([...languages, l])
  }

  const toggleStyle = (s: string) => {
    if (teachingStyle.includes(s)) setTeachingStyle(teachingStyle.filter((i) => i !== s))
    else setTeachingStyle([...teachingStyle, s])
  }

  const allSubjects = ['BBA', 'Economics', 'English', 'BCom', 'Maths', 'Reasoning', 'GK', 'UP Police', 'SSC', 'Banking']
  const allLanguages = ['English', 'Hinglish', 'Hindi']
  const allExperiences = ['College Senior', 'Fresher', '1-2 Years', '3+ Years']
  const allStyles = ['Conceptual', 'Exam-focused', 'Practical', 'Doubt-solving']

  const completeness = 85

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/mentor-success')
  }

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Complete Your Profile</span>
        <div style={{ width: 36 }} />
      </header>

      <div className="senjr-step-indicator">
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot senjr-step-dot-orange" />
        <div className="senjr-step-dot senjr-step-dot-orange" />
      </div>

      <div className="senjr-page">
        <div className="senjr-content">
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>STEP 4 OF 4</p>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              border: '3px solid var(--senjr-orange)',
              background: 'var(--senjr-orange-bg)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto', cursor: 'pointer', gap: 2
            }}>
              <Camera size={24} style={{ color: 'var(--senjr-orange)' }} />
              <span style={{ fontSize: 10, color: 'var(--senjr-text-muted)' }}>Upload Photo</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 4 }}>Professional Photo</p>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>
              Subjects <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--senjr-orange)' }}>MULTI-SELECT</span>
            </h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allSubjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`senjr-chip ${subjects.includes(s) ? 'senjr-chip-orange' : ''}`}
                  onClick={() => toggleSubject(s)}
                  style={{ fontSize: 13, padding: '6px 14px' }}
                >
                  {s}
                </button>
              ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Languages</h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allLanguages.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`senjr-chip ${languages.includes(l) ? 'senjr-chip-orange' : ''}`}
                  onClick={() => toggleLanguage(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Experience</h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allExperiences.map((e) => (
                <button
                  key={e}
                  type="button"
                  className={`senjr-chip ${experience === e ? 'senjr-chip-orange' : ''}`}
                  onClick={() => setExperience(e)}
                >
                  {e}
                </button>
              ))}
            </div>

            <div className="senjr-card" style={{ marginBottom: 24 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 16, textAlign: 'center' }}>Hourly Rate</h3>
              <p style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, color: 'var(--senjr-text)', marginBottom: 12 }}>
                ₹{hourlyRate}
              </p>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--senjr-orange)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 4 }}>
                <span>₹50</span>
                <span>₹2000</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginTop: 8, textAlign: 'center' }}>
                 Suggested: ₹200 based on experience
              </p>
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Availability</h2>
            <div className="senjr-card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                {days.map((d) => (
                  <span key={d} style={{ width: 32, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>{d}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', width: 32 }}>AM</span>
                {dayKeys.map((d) => (
                  <button
                    key={`am-${d}`}
                    type="button"
                    onClick={() => setAvailability({ ...availability, [d]: { ...availability[d], am: !availability[d].am } })}
                    style={{
                      width: 32, height: 28, borderRadius: 6,
                      background: availability[d].am ? 'var(--senjr-orange)' : 'var(--senjr-bg)',
                      border: '1px solid var(--senjr-border)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', width: 32 }}>PM</span>
                {dayKeys.map((d) => (
                  <button
                    key={`pm-${d}`}
                    type="button"
                    onClick={() => setAvailability({ ...availability, [d]: { ...availability[d], pm: !availability[d].pm } })}
                    style={{
                      width: 32, height: 28, borderRadius: 6,
                      background: availability[d].pm ? 'var(--senjr-orange)' : 'var(--senjr-bg)',
                      border: '1px solid var(--senjr-border)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
              <button type="button" className="senjr-btn senjr-btn-outline senjr-btn-sm" style={{ marginTop: 12, fontSize: 12 }}>
                ⚡ Quick select: Weekdays 6-8 PM
              </button>
            </div>

            <div className="senjr-input-group">
              <label className="senjr-input-label">Bio</label>
              <textarea
                className="senjr-input"
                rows={3}
                placeholder="Tell students about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
              />
              <p style={{ textAlign: 'right', fontSize: 12, color: 'var(--senjr-text-muted)' }}>{bio.length}/300</p>
            </div>

            <h2 className="senjr-section-title" style={{ fontSize: 16 }}>Teaching Style</h2>
            <div className="senjr-chip-group" style={{ marginBottom: 24 }}>
              {allStyles.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`senjr-chip ${teachingStyle.includes(s) ? 'senjr-chip-orange' : ''}`}
                  onClick={() => toggleStyle(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Profile Completeness</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{completeness}%</span>
              </div>
              <div className="senjr-progress-bar">
                <div className="senjr-progress-fill senjr-progress-fill-orange" style={{ width: `${completeness}%` }} />
              </div>
              <div style={{ textAlign: 'right', marginTop: 4 }}>
                <span className="senjr-badge senjr-badge-green">+50 XP</span>
              </div>
            </div>

            <button type="submit" className="senjr-btn senjr-btn-orange">
               Go Live as Mentor!
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--senjr-text-muted)', marginTop: 8 }}>
              By going live, you agree to our terms
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
