import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, CheckCircle, MapPin, ChevronRight, Home, BookOpen, Trophy, User, Award, Star, Clock, TrendingUp, Settings, LogOut } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'

export default function UserProfile() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const displayName = user?.displayName || 'User'
  const userInitial = displayName.charAt(0).toUpperCase()

  const journey = { level: 4, levelName: 'Scholar', sessions: 12, hours: 45, xp: 450, xpMax: 600 }

  const achievements = [
    { icon: Trophy, label: 'First Session', desc: 'Completed your first session', unlocked: true, color: 'var(--senjr-green)' },
    { icon: Star, label: '5 Star Review', desc: 'Received a 5-star review', unlocked: true, color: 'var(--senjr-orange)' },
    { icon: Clock, label: '10 Hours', desc: 'Spent 10+ hours learning', unlocked: true, color: 'var(--senjr-blue)' },
    { icon: TrendingUp, label: 'Streak Master', desc: '7-day learning streak', unlocked: false, color: 'var(--senjr-text-light)' },
    { icon: Award, label: 'Top 10', desc: 'Reached top 10 leaderboard', unlocked: false, color: 'var(--senjr-text-light)' },
    { icon: BookOpen, label: 'Bookworm', desc: 'Completed 5 courses', unlocked: false, color: 'var(--senjr-text-light)' },
  ]

  const recentActivity = [
    { type: 'session', title: 'UP Police Prep with Rahul Sir', time: 'Today, 4:00 PM', icon: Clock, color: 'var(--senjr-green)' },
    { type: 'achievement', title: 'Unlocked: First Session', time: '2 days ago', icon: Trophy, color: 'var(--senjr-orange)' },
    { type: 'test', title: 'Scored 72% in UP Police Set 10', time: '5 days ago', icon: Star, color: 'var(--senjr-blue)' },
  ]

  const handleSignOut = async () => {
    if (auth?.signOut) await auth.signOut()
    navigate('/auth')
  }

  const menuItems = [
    { icon: User, label: 'Edit Profile', route: '/student-profile' },
    { icon: BookOpen, label: 'My Learning', route: '/my-learning' },
    { icon: Trophy, label: 'Achievements', route: '/achievements' },
    { icon: Settings, label: 'Settings', route: '/settings' },
    { icon: LogOut, label: 'Sign Out', danger: true, action: handleSignOut },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>
        <button className="senjr-header-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <span className="senjr-header-title">My Profile</span>
        <button className="senjr-btn-icon" style={{ border: '1.5px solid var(--senjr-border)' }}><Share2 size={18} /></button>
      </header>
      <div className="senjr-page">
        <div style={{ background: 'linear-gradient(160deg, var(--senjr-black) 0%, #1E293B 100%)', padding: '32px 16px 48px', textAlign: 'center' }}>
          <div className="senjr-avatar senjr-avatar-xl senjr-fade-in" style={{
            margin: '0 auto 16px', border: '4px solid white',
            background: 'linear-gradient(135deg, var(--senjr-green-light), var(--senjr-orange-light))',
            fontSize: 48,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}>{userInitial}</div>
        </div>
        <div className="senjr-content" style={{ marginTop: -28 }}>
          <div className="senjr-premium-card senjr-fade-in" style={{ textAlign: 'center', marginBottom: 22 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              {displayName} <CheckCircle size={18} style={{ display: 'inline', color: 'var(--senjr-green)', verticalAlign: 'middle' }} />
            </h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>
              @{displayName.toLowerCase().replace(/\s+/g, '_')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span className="senjr-badge-premium">Student</span>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} /> India
              </span>
            </div>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--senjr-text-muted)' }}>"Learning from the best mentors."</p>
          </div>

          <div className="senjr-premium-card" style={{ marginBottom: 22, background: 'var(--senjr-green-lightest)', border: '1px solid var(--senjr-green-light)' }}>
            <div className="senjr-flex-between" style={{ marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 0 }}>My Journey</h2>
              <button className="senjr-btn-icon" style={{ width: 32, height: 32, border: '1.5px solid var(--senjr-green-dark)' }}><Share2 size={14} /></button>
            </div>
            <div className="senjr-grid-3" style={{ marginBottom: 16 }}>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <Trophy size={22} style={{ color: 'var(--senjr-green-dark)', margin: '0 auto 6px' }} />
                <span className="senjr-stat-value" style={{ fontSize: 16, color: 'var(--senjr-green-dark)' }}>Level {journey.level}</span>
                <span className="senjr-stat-label">{journey.levelName}</span>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <span className="senjr-stat-value" style={{ fontSize: 16 }}>{journey.sessions}</span>
                <span className="senjr-stat-label">Sessions</span>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <span className="senjr-stat-value" style={{ fontSize: 16, color: 'var(--senjr-orange-dark)' }}>{journey.hours}</span>
                <span className="senjr-stat-label">Hours</span>
              </div>
            </div>
            <div>
              <div className="senjr-flex-between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-green-dark)' }}>EXPERIENCE</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{journey.xp} / {journey.xpMax} XP</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(journey.xp / journey.xpMax) * 100}%`, height: '100%', background: 'var(--senjr-green-dark)', borderRadius: 4 }} />
              </div>
            </div>
          </div>

          <div className="senjr-fade-in" style={{ marginBottom: 22 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 14 }}>Achievements</h2>
            <div className="senjr-grid-3" style={{ gap: 10 }}>
              {achievements.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className="senjr-premium-card" style={{
                    textAlign: 'center', padding: '16px 8px', marginBottom: 0,
                    opacity: a.unlocked ? 1 : 0.5,
                    background: a.unlocked ? 'var(--senjr-bg-card)' : 'var(--senjr-bg)',
                    border: a.unlocked ? '1px solid var(--senjr-border)' : '1px dashed var(--senjr-border)',
                  }}>
                    <div className="senjr-icon-circle" style={{
                      margin: '0 auto 8px',
                      width: 42, height: 42,
                      background: a.unlocked ? `${a.color}20` : 'var(--senjr-border)',
                      border: a.unlocked ? `2px solid ${a.color}` : '2px solid transparent',
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

          <div className="senjr-fade-in" style={{ marginBottom: 22 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 14 }}>Recent Activity</h2>
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} className="senjr-list-item" style={{ marginBottom: 8, cursor: 'default' }}>
                  <div className="senjr-icon-circle" style={{ width: 40, height: 40, background: `${activity.color}15` }}>
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
            <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 14 }}>Settings</h2>
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <button key={i} className="senjr-list-item" style={{ marginBottom: 8, width: '100%' }}
                  onClick={() => item.action ? item.action() : navigate(item.route)}>
                  <Icon size={18} style={{ color: item.danger ? '#EF4444' : 'var(--senjr-text-muted)' }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: item.danger ? '#EF4444' : 'var(--senjr-text)' }}>{item.label}</span>
                  <ChevronRight size={16} style={{ color: 'var(--senjr-text-muted)' }} />
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item" onClick={() => navigate('/dashboard')}><Home size={20} /> Home</button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}><BookOpen size={20} /> Learn</button>
        <button className="senjr-nav-item" onClick={() => navigate('/achievements')}><Trophy size={20} /> Achievements</button>
        <button className="senjr-nav-item senjr-nav-item-orange" onClick={() => navigate('/profile')}><User size={20} /> Profile</button>
      </nav>
    </div>
  )
}
