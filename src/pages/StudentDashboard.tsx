import { useNavigate } from 'react-router-dom'
import { Users, Trophy, BookOpen, Target, BarChart3, Search } from 'lucide-react'

export default function StudentDashboard() {
  const navigate = useNavigate()

  const streakDays = [
    { day: 'M', done: true },
    { day: 'T', done: true },
    { day: 'W', done: false },
    { day: 'T', done: true },
    { day: 'F', done: true },
    { day: 'S', done: true },
    { day: 'S', done: false },
  ]

  const quickActions = [
    { icon: Search, label: 'Find Mentor', color: '#FFF7ED', iconColor: 'var(--senjr-orange)', route: '/book-session' },
    { icon: BookOpen, label: 'My Courses', color: '#EFF6FF', iconColor: '#3B82F6', route: '/my-learning' },
    { icon: Trophy, label: 'War Room', color: '#FEF2F2', iconColor: '#EF4444', route: '/war-room' },
    { icon: Target, label: 'AI Tutor', color: '#F0FDF4', iconColor: 'var(--senjr-green)', route: '/ai-tutor' },
  ]

  const progress = [
    { subject: 'Maths', percent: 75, color: 'var(--senjr-green)' },
    { subject: 'Reasoning', percent: 45, color: 'var(--senjr-orange)' },
  ]

  const leaderboard = [
    { name: 'Priya S.', xp: 520, avatar: '', rank: 1 },
    { name: 'You', xp: 450, avatar: '', rank: 2, isYou: true },
    { name: 'Amit K.', xp: 410, avatar: '', rank: 3 },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>☰</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--senjr-green)' }}>EduPulse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18, position: 'relative' }}>
            🔔
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--senjr-orange)', color: 'white',
              fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>3</span>
          </span>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14 }}>H</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              Good morning, Hitesh! 👋
            </h1>
            <span className="senjr-badge senjr-badge-green">Level 3 Scholar</span>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Current XP</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>450 / 800 XP</span>
            </div>
            <div className="senjr-progress-bar">
              <div className="senjr-progress-fill" style={{ width: '56%' }} />
            </div>
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
            {quickActions.map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.label}
                  className="senjr-card-flat"
                  style={{
                    textAlign: 'center',
                    padding: 20,
                    cursor: 'pointer',
                    marginBottom: 0,
                    background: a.color,
                    border: '1px solid var(--senjr-border)',
                  }}
                  onClick={() => navigate(a.route)}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px',
                    boxShadow: 'var(--senjr-shadow-sm)'
                  }}>
                    <Icon size={20} style={{ color: a.iconColor }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</span>
                </button>
              )
            })}
          </div>

          <div className="senjr-card-orange" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>UP Police Prep with Rahul Sir</h3>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
               Today, 4:00 PM <span style={{ color: 'var(--senjr-orange)', fontWeight: 600 }}>Starts in 2h 15m</span>
            </p>
            <button className="senjr-btn senjr-btn-orange" style={{ padding: '10px 0' }}>
              Join Now
            </button>
          </div>

          <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>My Progress</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto' }}>
            {progress.map((p) => (
              <div key={p.subject} className="senjr-card-flat" style={{
                minWidth: 120, textAlign: 'center', padding: 16, marginBottom: 0
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  border: `6px solid ${p.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                  background: 'white'
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{p.percent}%</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.subject}</span>
              </div>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ background: 'var(--senjr-orange-bg)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>
               7 Day Streak!
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {streakDays.map((d, i) => (
                <div key={d.day} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', display: 'block', marginBottom: 4 }}>{d.day}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: d.done
                      ? (i === 5 ? 'var(--senjr-orange)' : 'var(--senjr-green-light)')
                      : 'var(--senjr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: 14
                  }}>
                    {d.done ? (i === 5 ? '' : '✓') : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 24 }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 16 }}>Leaderboard</h3>
            {leaderboard.map((l) => (
              <div key={l.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 8,
                background: l.isYou ? 'var(--senjr-green-bg)' : 'transparent',
                border: l.isYou ? '1px solid var(--senjr-green-light)' : 'none',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, width: 24, color: l.rank === 1 ? 'var(--senjr-orange)' : 'var(--senjr-text-muted)' }}>
                  {l.rank}
                </span>
                <span style={{ fontSize: 24 }}>{l.avatar || (l.isYou ? '' : '')}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: l.isYou ? 700 : 500 }}>{l.name}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--senjr-green)' }}>{l.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/dashboard')}>
          <BarChart3 size={20} />
          Dashboard
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}>
          <BookOpen size={20} />
          Courses
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/community')}>
          <Users size={20} />
          Community
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/profile')}>
          <Target size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
