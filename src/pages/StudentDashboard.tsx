import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, BookOpen, Target, BarChart3, Search, Bell, Sparkles, Clock, TrendingUp, Flame, ChevronRight, Zap, GraduationCap, Star, Check, Sun } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const displayName = user?.displayName?.split(' ')[0] || 'Student'

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
    { name: 'Rahul Sir', expertise: 'UP Police', rating: 4.8, price: 200, avatar: 'R', online: true },
    { name: 'Neha Ma\'am', expertise: 'Maths', rating: 4.9, price: 250, avatar: 'N', online: false },
  ]

  const streakDays = [
    { day: 'M', done: true }, { day: 'T', done: true }, { day: 'W', done: false },
    { day: 'T', done: true }, { day: 'F', done: true }, { day: 'S', done: true }, { day: 'S', done: false },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--senjr-green)', letterSpacing: '-0.5px' }}>SENJR</span>
          <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>| Student</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => {}}>
            <Bell size={20} style={{ color: 'white' }} />
            <span className="senjr-status-dot senjr-status-dot-online" style={{
              position: 'absolute', top: -2, right: -2, width: 16, height: 16,
              background: 'var(--senjr-orange)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 10,
            }}>3</span>
          </button>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: 'var(--senjr-green)', color: 'white', border: '2px solid white' }}>{displayName.charAt(0)}</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-slide-up" style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
              <Sun size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: 'var(--senjr-orange)' }} />{getGreeting()}, {displayName}!
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="senjr-tag senjr-tag-green">
                <GraduationCap size={12} /> Level 3 Scholar
              </span>
              <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>450 / 800 XP</span>
            </div>
          </div>

          <div className="senjr-card-neo-green senjr-scale-in" style={{ marginBottom: 20 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--senjr-green-dark)', fontWeight: 600 }}>
                <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Current XP
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-green-dark)' }}>450 / 800</span>
            </div>
            <div className="senjr-progress-bar" style={{ background: 'white' }}>
              <div className="senjr-progress-fill" style={{ width: '56%' }} />
            </div>
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 20 }}>
            {quickActions.map((a, i) => {
              const Icon = a.icon
              return (
                <button key={a.label} className="senjr-card-flat senjr-ripple" style={{
                  textAlign: 'center', padding: 16, cursor: 'pointer', marginBottom: 0,
                  background: a.color, border: '2px solid var(--senjr-text)',
                  boxShadow: '2px 2px 0 var(--senjr-text)',
                  animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                }} onClick={() => navigate(a.route)}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px', border: '2px solid var(--senjr-text)',
                  }}>
                    <Icon size={20} style={{ color: a.iconColor }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</span>
                </button>
              )
            })}
          </div>

          <div className="senjr-card-neo-orange senjr-slide-up" style={{ marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="senjr-flex-between" style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} style={{ color: 'var(--senjr-orange)' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--senjr-orange-dark)' }}>UPCOMING SESSION</span>
                </div>
                <span className="senjr-tag senjr-tag-orange" style={{ fontSize: 11 }}>{todaySession.countdown}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{todaySession.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 14 }}>
                {todaySession.time} • {todaySession.topic}
              </p>
              <button className="senjr-btn senjr-btn-orange senjr-ripple" style={{ padding: '10px 0', boxShadow: '2px 2px 0 var(--senjr-orange-dark)' }} onClick={() => navigate('/live-session')}>
                Join Now
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 12 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>My Progress</h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                View All <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="senjr-scrollbar-hide">
              {progress.map((p) => (
                <div key={p.subject} className="senjr-card-flat" style={{
                  minWidth: 120, textAlign: 'center', padding: 16, marginBottom: 0,
                  border: '2px solid var(--senjr-text)', boxShadow: '2px 2px 0 var(--senjr-text)',
                }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: '50%',
                    border: `5px solid ${p.color}`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px', background: 'white',
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{p.percent}%</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginTop: 6 }}>
                    <TrendingUp size={12} style={{ color: 'var(--senjr-green)' }} />
                    <span style={{ fontSize: 11, color: 'var(--senjr-green)', fontWeight: 600 }}>{p.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-neo senjr-slide-up" style={{ marginBottom: 20 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={16} style={{ color: 'var(--senjr-orange)' }} />
                <h3 className="senjr-section-title" style={{ fontSize: 15, marginBottom: 0 }}>Topics to Practice</h3>
              </div>
              <button className="senjr-btn senjr-btn-sm" style={{ padding: '4px 12px', fontSize: 11, width: 'auto', background: 'var(--senjr-green)', color: 'white', border: '2px solid var(--senjr-green-dark)', boxShadow: '2px 2px 0 var(--senjr-text)' }} onClick={() => navigate('/ai-tutor')}>
                Practice All
              </button>
            </div>
            {weakTopics.map((t, i) => (
              <div key={t.topic} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px', borderRadius: 10,
                marginBottom: i < weakTopics.length - 1 ? 8 : 0,
                background: i === 0 ? 'var(--senjr-orange-bg)' : 'var(--senjr-bg)',
                border: i === 0 ? '1px solid var(--senjr-orange-light)' : '1px solid var(--senjr-border)',
              }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t.topic}</span>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginLeft: 8 }}>{t.subject}</span>
                </div>
                <button className="senjr-btn senjr-btn-sm" style={{
                  padding: '6px 14px',
                  background: t.priority === 'high' ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                  color: 'white', fontSize: 12, fontWeight: 600, border: '2px solid transparent',
                  boxShadow: t.priority === 'high' ? '2px 2px 0 var(--senjr-orange-dark)' : '2px 2px 0 var(--senjr-green-dark)',
                }} onClick={() => navigate('/ai-tutor')}>
                  Practice
                </button>
              </div>
            ))}
          </div>

          <div className="senjr-card-neo" style={{ background: 'var(--senjr-orange-bg)', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, textAlign: 'center', marginBottom: 14 }}>
              <Flame size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: 'var(--senjr-orange)' }} />
              7 Day Streak!
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {streakDays.map((d, i) => (
                <div key={d.day} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', display: 'block', marginBottom: 4, fontWeight: 500 }}>{d.day}</span>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: d.done ? (i === 5 ? 'var(--senjr-orange)' : 'var(--senjr-green)') : 'var(--senjr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 14,
                    color: d.done ? 'white' : 'transparent',
                    border: d.done ? '2px solid var(--senjr-text)' : 'none',
                    transition: 'all 0.2s ease',
                  }}>
                    {d.done ? <Check size={14} /> : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-card-neo senjr-slide-up" style={{ marginBottom: 20 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 12 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>Recommended Mentors</h3>
              <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
            </div>
            {recommendedMentors.map((m) => (
              <button key={m.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px', borderRadius: 10, marginBottom: 8,
                background: 'var(--senjr-bg)', border: '1px solid var(--senjr-border)',
                cursor: 'pointer', width: '100%', textAlign: 'left',
                transition: 'all 0.15s ease',
              }} onClick={() => navigate('/mentor-portfolio')}>
                <div style={{ position: 'relative' }}>
                  <div className="senjr-avatar" style={{ width: 44, height: 44, fontSize: 16, background: 'var(--senjr-green-light)', color: 'var(--senjr-green-dark)' }}>
                    {m.avatar}
                  </div>
                  {m.online && <span className="senjr-status-dot senjr-status-dot-online" style={{ position: 'absolute', bottom: 0, right: 0, border: '2px solid white' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{m.expertise} · <Star size={10} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--senjr-orange)' }} /> {m.rating}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-green)' }}>₹{m.price}/hr</span>
              </button>
            ))}
          </div>

          <div className="senjr-card-neo senjr-slide-up" style={{ marginBottom: 20 }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>Leaderboard</h3>
            {leaderboard.map((l) => (
              <div key={l.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8, marginBottom: 8,
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
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/dashboard/student')}>
          <BarChart3 size={20} /> Dashboard
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/mock-test')}>
          <BookOpen size={20} /> Tests
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/ai-tutor')}>
          <Sparkles size={20} /> AI Tutor
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/profile')}>
          <Target size={20} /> Profile
        </button>
      </nav>
    </div>
  )
}
