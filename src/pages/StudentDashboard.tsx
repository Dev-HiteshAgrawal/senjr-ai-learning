import { useNavigate } from 'react-router-dom'
import { Users, Trophy, BookOpen, Target, BarChart3, Search, Bell, Sparkles, Clock, TrendingUp, Flame } from 'lucide-react'

export default function StudentDashboard() {
  const navigate = useNavigate()

  const quickActions = [
    { icon: Search, label: 'Find Mentor', color: '#FFF7ED', iconColor: 'var(--senjr-orange)', route: '/book-session' },
    { icon: BookOpen, label: 'My Courses', color: '#EFF6FF', iconColor: '#3B82F6', route: '/my-learning' },
    { icon: Trophy, label: 'Mock Tests', color: '#FEF2F2', iconColor: '#EF4444', route: '/mock-test' },
    { icon: Sparkles, label: 'AI Tutor', color: '#F0FDF4', iconColor: 'var(--senjr-green)', route: '/ai-tutor' },
  ]

  const todaySession = {
    title: 'UP Police Prep with Rahul Sir',
    time: 'Today, 4:00 PM',
    countdown: 'Starts in 2h 15m',
    topic: 'Reasoning & GK Strategy',
  }

  const progress = [
    { subject: 'Maths', percent: 75, color: 'var(--senjr-green)', trend: '+5%' },
    { subject: 'Reasoning', percent: 45, color: 'var(--senjr-orange)', trend: '+12%' },
    { subject: 'GK', percent: 60, color: '#3B82F6', trend: '+3%' },
  ]

  const weakTopics = [
    { topic: 'Trigonometry', subject: 'Maths', priority: 'high' },
    { topic: 'Blood Relations', subject: 'Reasoning', priority: 'medium' },
    { topic: 'Current Affairs', subject: 'GK', priority: 'low' },
  ]

  const leaderboard = [
    { name: 'Priya S.', xp: 520, avatar: 'P', rank: 1 },
    { name: 'You', xp: 450, avatar: 'H', rank: 2, isYou: true },
    { name: 'Amit K.', xp: 410, avatar: 'A', rank: 3 },
  ]

  const recommendedMentors = [
    { name: 'Rahul Sir', expertise: 'UP Police', rating: 4.8, price: 200, avatar: 'R' },
    { name: 'Neha Ma\'am', expertise: 'Maths', rating: 4.9, price: 250, avatar: 'N' },
  ]

  const streakDays = [
    { day: 'M', done: true },
    { day: 'T', done: true },
    { day: 'W', done: false },
    { day: 'T', done: true },
    { day: 'F', done: true },
    { day: 'S', done: true },
    { day: 'S', done: false },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>☰</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)', letterSpacing: '-0.5px' }}>SENJR</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => {}}>
            <Bell size={20} style={{ color: 'white' }} />
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--senjr-orange)', color: 'white',
              fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
            }}>3</span>
          </button>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: 'var(--senjr-green)', color: 'white', border: '2px solid white' }}>H</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              Good morning, Hitesh! 👋
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="senjr-badge senjr-badge-green">Level 3 Scholar</span>
              <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>450 / 800 XP</span>
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, background: 'var(--senjr-green-bg)', borderColor: 'var(--senjr-green-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--senjr-green-dark)', fontWeight: 600 }}>Current XP</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-green-dark)' }}>450 / 800 XP</span>
            </div>
            <div className="senjr-progress-bar" style={{ background: 'white' }}>
              <div className="senjr-progress-fill" style={{ width: '56%' }} />
            </div>
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 20 }}>
            {quickActions.map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.label}
                  className="senjr-card-flat"
                  style={{
                    textAlign: 'center',
                    padding: 16,
                    cursor: 'pointer',
                    marginBottom: 0,
                    background: a.color,
                    border: '2px solid var(--senjr-text)',
                    boxShadow: '2px 2px 0 var(--senjr-text)',
                  }}
                  onClick={() => navigate(a.route)}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px',
                    border: '2px solid var(--senjr-text)',
                  }}>
                    <Icon size={18} style={{ color: a.iconColor }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</span>
                </button>
              )
            })}
          </div>

          <div className="senjr-card-orange" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Clock size={16} style={{ color: 'var(--senjr-orange)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-orange-dark)' }}>UPCOMING SESSION</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{todaySession.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 4 }}>
              {todaySession.time} • {todaySession.topic}
            </p>
            <p style={{ fontSize: 14, color: 'var(--senjr-orange)', fontWeight: 700, marginBottom: 12 }}>
              {todaySession.countdown}
            </p>
            <button className="senjr-btn senjr-btn-orange" style={{ padding: '10px 0' }} onClick={() => navigate('/live-session')}>
              Join Now
            </button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>My Progress</h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                View All →
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {progress.map((p) => (
                <div key={p.subject} className="senjr-card-flat" style={{
                  minWidth: 110, textAlign: 'center', padding: 14, marginBottom: 0,
                  border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    border: `5px solid ${p.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px',
                    background: 'white',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{p.percent}%</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{p.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginTop: 4 }}>
                    <TrendingUp size={12} style={{ color: 'var(--senjr-green)' }} />
                    <span style={{ fontSize: 11, color: 'var(--senjr-green)', fontWeight: 600 }}>{p.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Target size={16} style={{ color: 'var(--senjr-orange)' }} />
              <h3 className="senjr-section-title" style={{ fontSize: 15, marginBottom: 0 }}>Weak Topics to Practice</h3>
            </div>
            {weakTopics.map((t, i) => (
              <div key={t.topic} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: i < weakTopics.length - 1 ? 8 : 0,
                background: i === 0 ? 'var(--senjr-orange-bg)' : 'var(--senjr-bg)',
                border: i === 0 ? '1px solid var(--senjr-orange-light)' : '1px solid var(--senjr-border)',
              }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t.topic}</span>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginLeft: 8 }}>{t.subject}</span>
                </div>
                <button
                  className="senjr-btn senjr-btn-sm"
                  style={{
                    padding: '4px 12px',
                    background: t.priority === 'high' ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 600,
                    border: 'none',
                  }}
                  onClick={() => navigate('/ai-tutor')}
                >
                  Practice
                </button>
              </div>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ background: 'var(--senjr-orange-bg)', marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>
              <Flame size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: 'var(--senjr-orange)' }} />
              7 Day Streak!
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {streakDays.map((d, i) => (
                <div key={d.day} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', display: 'block', marginBottom: 4, fontWeight: 500 }}>{d.day}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: d.done
                      ? (i === 5 ? 'var(--senjr-orange)' : 'var(--senjr-green)')
                      : 'var(--senjr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: 14,
                    color: d.done ? 'white' : 'transparent',
                    border: d.done ? '2px solid var(--senjr-text)' : 'none',
                  }}>
                    {d.done ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Recommended Mentors</h3>
            {recommendedMentors.map((m) => (
              <button
                key={m.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px',
                  borderRadius: 10,
                  marginBottom: 8,
                  background: 'var(--senjr-bg)',
                  border: '1px solid var(--senjr-border)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
                onClick={() => navigate('/mentor-portfolio')}
              >
                <div className="senjr-avatar" style={{ width: 40, height: 40, fontSize: 16, background: 'var(--senjr-green-light)', color: 'var(--senjr-green-dark)' }}>
                  {m.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{m.expertise} •  {m.rating}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-green)' }}>₹{m.price}/hr</span>
              </button>
            ))}
          </div>

          <div className="senjr-card-flat" style={{ marginBottom: 20, border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)' }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Leaderboard</h3>
            {leaderboard.map((l) => (
              <div key={l.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                marginBottom: 8,
                background: l.isYou ? 'var(--senjr-green-bg)' : 'transparent',
                border: l.isYou ? '2px solid var(--senjr-green)' : '1px solid var(--senjr-border)',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, width: 24, color: l.rank === 1 ? 'var(--senjr-orange)' : 'var(--senjr-text-muted)' }}>
                  {l.rank}
                </span>
                <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: l.isYou ? 'var(--senjr-green)' : 'var(--senjr-bg)', color: l.isYou ? 'white' : 'var(--senjr-text-muted)' }}>
                  {l.avatar}
                </div>
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
