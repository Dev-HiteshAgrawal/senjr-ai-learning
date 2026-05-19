import { useNavigate } from 'react-router-dom'
import { Home, Calendar, DollarSign, Video, User, Star, Bell, BarChart3 } from 'lucide-react'

export default function MentorHub() {
  const navigate = useNavigate()

  const earnings = [350, 500, 300, 700, 900, 400, 600]
  const maxEarning = Math.max(...earnings)

  const schedule = [
    { initials: 'HA', name: 'Hitesh A.', time: '9:00 AM', subject: 'BBA Economics', status: 'upcoming' as const },
    { initials: 'MS', name: 'Megha S.', time: '11:30 AM', subject: 'BCom Maths', status: 'completed' as const },
  ]

  const reviews = [
    { stars: 5, text: '"Best mentor ever! Explains complex concepts with ease."', author: '— Hitesh, BBA 2nd Year' },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <span style={{ fontSize: 20, cursor: 'pointer' }}>☰</span>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Mentor Hub</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--senjr-green)' }}>2,450</span>
          <Bell size={20} style={{ color: 'white' }} />
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14 }}>R</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              Welcome back, Rahul! 
            </h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>You have 3 sessions today</p>
          </div>

          <div className="senjr-grid-3" style={{ marginBottom: 20 }}>
            <div className="senjr-stat-card">
              <span className="senjr-stat-value" style={{ fontSize: 20 }}>12</span>
              <span className="senjr-stat-label">Sessions</span>
            </div>
            <div className="senjr-stat-card">
              <span className="senjr-stat-value" style={{ fontSize: 20 }}>8</span>
              <span className="senjr-stat-label">Students</span>
            </div>
            <div className="senjr-stat-card">
              <span className="senjr-stat-value" style={{ fontSize: 20 }}>4.8</span>
              <span className="senjr-stat-label">Rating ⭐</span>
            </div>
          </div>

          <div className="senjr-card-green" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>💰 Earnings This Month</span>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600 }} onClick={() => navigate('/earnings')}>
                View →
              </button>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>₹2,450</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60, marginBottom: 12 }}>
              {earnings.map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${(h / maxEarning) * 100}%`,
                  background: i === 4 ? 'var(--senjr-green)' : 'var(--senjr-green-light)',
                  borderRadius: 4,
                  minHeight: 8
                }} />
              ))}
            </div>
            <button className="senjr-btn senjr-btn-outline senjr-btn-sm" style={{ fontSize: 13 }}>
              Withdraw to UPI
            </button>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}> Today's Schedule</h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600 }} onClick={() => navigate('/availability')}>
                View Calendar →
              </button>
            </div>

            {schedule.map((s) => (
              <div key={s.name} className="senjr-card-flat" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                borderLeft: s.status === 'upcoming' ? '3px solid var(--senjr-green)' : '3px solid var(--senjr-border)',
                marginBottom: 8
              }}>
                <div className="senjr-avatar" style={{
                  width: 40, height: 40, fontSize: 14,
                  background: s.status === 'upcoming' ? 'var(--senjr-green-light)' : 'var(--senjr-bg)',
                  color: s.status === 'upcoming' ? 'var(--senjr-green-dark)' : 'var(--senjr-text-muted)'
                }}>
                  {s.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{s.time} • {s.subject}</p>
                </div>
                <span className={`senjr-badge ${s.status === 'upcoming' ? 'senjr-badge-green' : 'senjr-badge-orange'}`}>
                  {s.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
                <button
                  className="senjr-btn senjr-btn-sm"
                  style={{
                    padding: '6px 16px',
                    background: s.status === 'upcoming' ? 'var(--senjr-green)' : 'transparent',
                    color: s.status === 'upcoming' ? 'white' : 'var(--senjr-text-muted)',
                    fontSize: 13,
                    fontWeight: 600,
                    border: s.status === 'upcoming' ? 'none' : '1px solid var(--senjr-border)',
                  }}
                >
                  {s.status === 'upcoming' ? 'Start' : 'Review'}
                </button>
              </div>
            ))}
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
            <button className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate('/availability')}>
              <Calendar size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Set Availability</span>
            </button>
            <button className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate('/mentor-profile')}>
              <User size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>My Profile</span>
            </button>
            <button className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, cursor: 'pointer', marginBottom: 0 }}>
              <Star size={20} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>View Reviews</span>
            </button>
            <button className="senjr-card-flat" style={{ textAlign: 'center', padding: 16, cursor: 'pointer', marginBottom: 0 }}>
              <BarChart3 size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Analytics</span>
            </button>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 24 }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>⭐ Recent Reviews</h3>
            {reviews.map((r, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ color: 'var(--senjr-orange)', marginBottom: 4 }}>{'★'.repeat(r.stars)}</div>
                <p style={{ fontSize: 14, fontStyle: 'italic', marginBottom: 4 }}>{r.text}</p>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', textAlign: 'right' }}>{r.author}</p>
              </div>
            ))}
            <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600 }}>
              View All Reviews →
            </button>
          </div>

          <div className="senjr-card-flat">
            <h3 className="senjr-section-title" style={{ fontSize: 16 }}>Performance Insights</h3>
            <div className="senjr-grid-2">
              <div>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Avg Response</p>
                <p style={{ fontSize: 18, fontWeight: 700 }}>2 hrs</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Completion Rate</p>
                <p style={{ fontSize: 18, fontWeight: 700 }}>95%</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Repeat Students</p>
                <p style={{ fontSize: 18, fontWeight: 700 }}>60%</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>Total Earnings</p>
                <p style={{ fontSize: 18, fontWeight: 700 }}>₹12,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/mentor-hub')}>
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/availability')}>
          <Calendar size={20} />
          Schedule
        </button>
        <button className="senjr-nav-item" style={{ position: 'relative', top: -8 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--senjr-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16,185,129,0.4)'
          }}>
            <Video size={24} />
          </div>
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/earnings')}>
          <DollarSign size={20} />
          Earnings
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/mentor-profile')}>
          <User size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
