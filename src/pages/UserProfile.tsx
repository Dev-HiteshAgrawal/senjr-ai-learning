import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, CheckCircle, MapPin, ChevronRight, Home, BookOpen, Trophy, User, Award, Star, Clock, TrendingUp, Settings, LogOut } from 'lucide-react'

export default function UserProfile() {
  const navigate = useNavigate()

  const journey = {
    level: 4,
    levelName: 'Scholar',
    sessions: 12,
    hours: 45,
    xp: 450,
    xpMax: 600,
  }

  const achievements = [
    { icon: Trophy, label: 'First Session', desc: 'Completed your first session', unlocked: true, color: 'var(--senjr-green)' },
    { icon: Star, label: '5 Star Review', desc: 'Received a 5-star review', unlocked: true, color: 'var(--senjr-orange)' },
    { icon: Clock, label: '10 Hours', desc: 'Spent 10+ hours learning', unlocked: true, color: '#3B82F6' },
    { icon: TrendingUp, label: 'Streak Master', desc: '7-day learning streak', unlocked: false, color: 'var(--senjr-text-light)' },
    { icon: Award, label: 'Top 10', desc: 'Reached top 10 leaderboard', unlocked: false, color: 'var(--senjr-text-light)' },
    { icon: BookOpen, label: 'Bookworm', desc: 'Completed 5 courses', unlocked: false, color: 'var(--senjr-text-light)' },
  ]

  const recentActivity = [
    { type: 'session', title: 'UP Police Prep with Rahul Sir', time: 'Today, 4:00 PM', icon: Clock, color: 'var(--senjr-green)' },
    { type: 'achievement', title: 'Unlocked: First Session', time: '2 days ago', icon: Trophy, color: 'var(--senjr-orange)' },
    { type: 'test', title: 'Scored 72% in UP Police Set 10', time: '5 days ago', icon: Star, color: '#3B82F6' },
  ]

  const menuItems = [
    { icon: User, label: 'Edit Profile', route: '/student-profile' },
    { icon: BookOpen, label: 'My Learning', route: '/my-learning' },
    { icon: Trophy, label: 'Achievements', route: '/achievements' },
    { icon: Settings, label: 'Settings', route: '/settings' },
    { icon: LogOut, label: 'Sign Out', route: '/auth', danger: true },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">My Profile</span>
        <button className="senjr-btn-icon">
          <Share2 size={18} />
        </button>
      </header>

      <div className="senjr-page">
        <div style={{
          background: 'linear-gradient(180deg, var(--senjr-black) 0%, #2D2D44 100%)',
          padding: '28px 16px 44px',
          textAlign: 'center'
        }}>
          <div className="senjr-avatar senjr-avatar-xl senjr-fade-in" style={{
            margin: '0 auto 16px',
            border: '4px solid white',
            background: 'linear-gradient(135deg, var(--senjr-green-light) 0%, #BBF7D0 100%)',
            fontSize: 48,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            H
          </div>
        </div>

        <div className="senjr-content" style={{ marginTop: -24 }}>
          <div className="senjr-card-flat senjr-fade-in" style={{ textAlign: 'center', marginBottom: 20, background: 'white' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              Hitesh Agrawal <CheckCircle size={18} style={{ display: 'inline', color: 'var(--senjr-green)', verticalAlign: 'middle' }} />
            </h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>@hitesh_agrawal</p>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>BBA 2nd Year | ITM College Aligarh</p>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
              <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} /> Aligarh, UP
            </p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--senjr-text-muted)' }}>
              "Aspiring UP Police officer. Learning from the best mentors. 🔥"
            </p>
          </div>

          <div className="senjr-card-green senjr-fade-in" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 0 }}>
                My Journey
              </h2>
              <button className="senjr-btn-icon" style={{ width: 32, height: 32 }}>
                <Share2 size={14} />
              </button>
            </div>

            <div className="senjr-grid-3" style={{ marginBottom: 16 }}>
              <div className="senjr-stat-card" style={{ background: 'var(--senjr-green-bg)' }}>
                <Trophy size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 4px' }} />
                <span className="senjr-stat-value" style={{ fontSize: 16, color: 'var(--senjr-green)' }}>Level {journey.level}</span>
                <span className="senjr-stat-label">{journey.levelName}</span>
              </div>
              <div className="senjr-stat-card">
                <span className="senjr-stat-value" style={{ fontSize: 16 }}>{journey.sessions}</span>
                <span className="senjr-stat-label">Sessions</span>
              </div>
              <div className="senjr-stat-card">
                <span className="senjr-stat-value" style={{ fontSize: 16, color: 'var(--senjr-orange)' }}>{journey.hours}</span>
                <span className="senjr-stat-label">Hours</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-text-muted)' }}>EXPERIENCE</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{journey.xp} / {journey.xpMax} XP</span>
              </div>
              <div className="senjr-progress-bar">
                <div className="senjr-progress-fill" style={{ width: `${(journey.xp / journey.xpMax) * 100}%`, background: 'var(--senjr-green-dark)' }} />
              </div>
            </div>
          </div>

          <div className="senjr-fade-in" style={{ marginBottom: 20 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Achievements</h2>
            <div className="senjr-grid-3" style={{ gap: 10 }}>
              {achievements.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '14px 8px',
                    borderRadius: 12,
                    background: a.unlocked ? 'white' : 'var(--senjr-bg)',
                    border: a.unlocked ? '2px solid var(--senjr-border)' : '1px dashed var(--senjr-border)',
                    opacity: a.unlocked ? 1 : 0.6,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: a.unlocked ? `${a.color}20` : 'var(--senjr-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 6px',
                    }}>
                      <Icon size={18} style={{ color: a.unlocked ? a.color : 'var(--senjr-text-light)' }} />
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>{a.label}</p>
                    <p style={{ fontSize: 9, color: 'var(--senjr-text-muted)' }}>{a.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="senjr-fade-in" style={{ marginBottom: 20 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Recent Activity</h2>
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} className="senjr-card-flat" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 8,
                  border: '1px solid var(--senjr-border)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${activity.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: activity.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{activity.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{activity.time}</p>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--senjr-text-muted)' }} />
                </div>
              )
            })}
          </div>

          <div className="senjr-fade-in" style={{ marginBottom: 100 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Settings</h2>
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={i}
                  className="senjr-card-flat senjr-ripple"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: 8,
                    border: '1px solid var(--senjr-border)',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(item.route)}
                >
                  <Icon size={18} style={{ color: item.danger ? '#EF4444' : 'var(--senjr-text-muted)' }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: item.danger ? '#EF4444' : 'var(--senjr-text)' }}>
                    {item.label}
                  </span>
                  <ChevronRight size={16} style={{ color: 'var(--senjr-text-muted)' }} />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item" onClick={() => navigate('/dashboard')}>
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}>
          <BookOpen size={20} />
          Learn
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/achievements')}>
          <Trophy size={20} />
          Achievements
        </button>
        <button className="senjr-nav-item senjr-nav-item-orange" onClick={() => navigate('/profile')}>
          <User size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
