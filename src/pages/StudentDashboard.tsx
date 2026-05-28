import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, BookOpen, Target, BarChart3, Search, Bell, Sparkles, Clock, TrendingUp, Flame, ChevronRight, Zap, GraduationCap, Star, Check, Sun, ArrowRight } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'

const FIFTEEN_MIN = 15 * 60 * 1000

export default function StudentDashboard() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null
  const displayName = user?.displayName?.split(' ')[0] || 'Student'
  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }
  const [now, setNow] = useState(Date.now)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const quickActions = [
    { icon: Search, label: 'Find Mentor', color: '#FFF7ED', iconColor: 'var(--senjr-orange)', route: '/book-session' },
    { icon: BookOpen, label: 'My Courses', color: '#EFF6FF', iconColor: '#3B82F6', route: '/my-learning' },
    { icon: Trophy, label: 'Mock Tests', color: '#FEF2F2', iconColor: '#EF4444', route: '/mock-test' },
    { icon: Sparkles, label: 'AI Tutor', color: '#F0FDF4', iconColor: 'var(--senjr-green)', route: '/ai-tutor' },
  ]

  const sessionStart = new Date(now + 5 * 60 * 1000)
  const joinWindowStart = new Date(sessionStart.getTime() - FIFTEEN_MIN)
  const canJoin = now >= joinWindowStart.getTime()
  const isLive = now >= sessionStart.getTime()
  const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000)
  const isOver = now >= sessionEnd.getTime()
  const diffMs = sessionStart.getTime() - now
  const countdownMin = Math.floor(diffMs / 60000)
  const countdownSec = Math.floor((diffMs % 60000) / 1000)

  const todaySession = {
    title: 'UP Police Prep with Rahul Sir',
    time: sessionStart.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    displayTime: sessionStart.toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }),
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

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--senjr-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
            SEN<span style={{ color: 'var(--senjr-green)' }}>JR</span>
          </span>
          <span className="senjr-badge senjr-badge-green" style={{
            fontSize: 11, padding: '3px 10px',
            boxShadow: '0 2px 6px rgba(16,185,129,0.2)',
          }}>Student</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => {}}>
            <Bell size={20} style={{ color: 'var(--senjr-text)' }} />
            <span style={{
              position: 'absolute', top: -3, right: -3, width: 18, height: 18,
              background: 'var(--senjr-orange)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: 'white', fontWeight: 700,
              border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>3</span>
          </button>
          <div className="senjr-avatar" style={{
            width: 34, height: 34, fontSize: 14,
            background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
            color: 'white', boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
          }}>{displayName.charAt(0)}</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div className="senjr-slide-up" style={{ marginBottom: 22 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px' }}>
              <Sun size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6, color: 'var(--senjr-orange)' }} />
              {getGreeting()}, {displayName}!
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="senjr-badge-premium">
                <GraduationCap size={12} /> Level 3 Scholar
              </span>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>450 / 800 XP</span>
            </div>
          </div>

          <div className="senjr-premium-card" style={{
            background: 'linear-gradient(135deg, var(--senjr-green-lighter), var(--senjr-green-lightest))',
            border: '1px solid var(--senjr-green-light)',
          }}>
            <div className="senjr-flex-between" style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--senjr-green-dark)', fontWeight: 600 }}>
                <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Current XP
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--senjr-green-dark)' }}>450 / 800</span>
            </div>
            <div className="senjr-progress-bar" style={{ background: 'rgba(255,255,255,0.6)', height: 8 }}>
              <div className="senjr-progress-fill" style={{ width: '56%' }} />
            </div>
          </div>

          <div className="senjr-grid-2" style={{ marginBottom: 22 }}>
            {quickActions.map((a, i) => {
              const Icon = a.icon
              return (
                <button key={a.label} className="senjr-premium-card" style={{
                  textAlign: 'center', padding: 18, cursor: 'pointer', marginBottom: 0,
                  background: a.color, border: '1px solid var(--senjr-border)',
                  animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                }} onClick={() => navigate(a.route)}>
                  <div className="senjr-icon-circle" style={{
                    margin: '0 auto 10px',
                    background: 'rgba(255,255,255,0.9)',
                    width: 48, height: 48,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                    <Icon size={22} style={{ color: a.iconColor }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</span>
                </button>
              )
            })}
          </div>

          <div className="senjr-premium-card" style={{
            background: 'linear-gradient(135deg, var(--senjr-orange-lighter), var(--senjr-orange-lightest))',
            border: '1px solid var(--senjr-orange-light)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="senjr-flex-between" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="senjr-icon-circle" style={{
                    width: 36, height: 36,
                    background: 'rgba(249,115,22,0.15)',
                  }}>
                    <Clock size={16} style={{ color: 'var(--senjr-orange)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--senjr-orange-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {isOver ? 'Completed' : isLive ? 'Live Now' : 'Upcoming Session'}
                    </span>
                  </div>
                </div>
                {!isOver && !isLive && (
                  <span className="senjr-tag-orange-premium">
                    {canJoin ? 'Join window open' : `${countdownMin}m ${countdownSec}s`}
                  </span>
                )}
                {isLive && !isOver && (
                  <span style={{
                    padding: '4px 12px', borderRadius: 'var(--senjr-radius-full)',
                    background: '#FEE2E2', color: '#DC2626',
                    fontSize: 11, fontWeight: 700,
                    animation: 'pulse 2s infinite',
                  }}>
                    In Progress
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{todaySession.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 16 }}>
                {todaySession.displayTime} &bull; {todaySession.topic}
              </p>
              {isOver ? (
                <button className="senjr-btn" style={{ padding: '10px 0', background: 'var(--senjr-border)', color: 'var(--senjr-text-muted)', cursor: 'not-allowed' }} disabled>
                  Session Completed
                </button>
              ) : canJoin ? (
                <button className="senjr-btn-premium" style={{ padding: '10px 0', background: 'linear-gradient(135deg, var(--senjr-orange), var(--senjr-orange-dark))', boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }} onClick={() => navigate('/live-session')}>
                  {isLive ? 'Join Now' : 'Join Early'} <ArrowRight size={16} style={{ display: 'none' }} />
                </button>
              ) : (
                <button className="senjr-btn" style={{ padding: '10px 0', background: 'var(--senjr-border)', color: 'var(--senjr-text-muted)', cursor: 'not-allowed' }} disabled>
                  Join available {countdownMin}m before
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 14 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 17, marginBottom: 0 }}>My Progress</h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }} className="senjr-scrollbar-hide">
              {progress.map((p) => (
                <div key={p.subject} className="senjr-premium-card" style={{
                  minWidth: 130, textAlign: 'center', padding: 18, marginBottom: 0,
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    border: `5px solid ${p.color}`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px', background: 'white',
                    boxShadow: `0 2px 8px ${p.color}20`,
                  }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{p.percent}%</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: 8 }}>
                    <TrendingUp size={12} style={{ color: 'var(--senjr-green)' }} />
                    <span style={{ fontSize: 11, color: 'var(--senjr-green)', fontWeight: 600 }}>{p.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-premium-card" style={{ marginBottom: 22 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="senjr-icon-circle" style={{ width: 36, height: 36, background: 'var(--senjr-orange-lighter)' }}>
                  <Zap size={16} style={{ color: 'var(--senjr-orange)' }} />
                </div>
                <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>Topics to Practice</h3>
              </div>
              <button className="senjr-btn-premium" style={{ padding: '8px 18px', fontSize: 13, width: 'auto', borderRadius: 50 }} onClick={() => navigate('/ai-tutor')}>
                Practice All
              </button>
            </div>
            {weakTopics.map((t, i) => (
              <div key={t.topic} className="senjr-list-item" style={{
                marginBottom: i < weakTopics.length - 1 ? 8 : 0,
                background: i === 0 ? 'var(--senjr-orange-lightest)' : 'var(--senjr-bg)',
                border: i === 0 ? '1px solid var(--senjr-orange-light)' : '1px solid var(--senjr-border)',
                cursor: 'default',
              }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t.topic}</span>
                  <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)', marginLeft: 8 }}>{t.subject}</span>
                </div>
                <button className="senjr-btn-premium" style={{
                  padding: '6px 16px', fontSize: 12, width: 'auto', borderRadius: 50,
                  background: t.priority === 'high' ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                  boxShadow: 'none',
                }} onClick={() => navigate('/ai-tutor')}>
                  Practice
                </button>
              </div>
            ))}
          </div>

          <div className="senjr-premium-card" style={{
            background: 'linear-gradient(135deg, var(--senjr-orange-lighter), var(--senjr-orange-lightest))',
            border: '1px solid var(--senjr-orange-light)',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, textAlign: 'center', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Flame size={18} style={{ color: 'var(--senjr-orange)' }} />
              7 Day Streak!
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {streakDays.map((d, i) => (
                <div key={d.day} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>{d.day}</span>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: d.done ? (i === 5 ? 'var(--senjr-orange)' : 'var(--senjr-green)') : 'var(--senjr-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: d.done ? 'white' : 'transparent',
                    margin: '0 auto',
                    boxShadow: d.done ? `0 2px 8px ${i === 5 ? 'rgba(249,115,22,0.3)' : 'rgba(16,185,129,0.3)'}` : 'none',
                    transition: 'all 0.2s ease',
                  }}>
                    {d.done ? <Check size={16} /> : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="senjr-premium-card" style={{ marginBottom: 22 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 14 }}>
              <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>Recommended Mentors</h3>
              <ChevronRight size={18} style={{ color: 'var(--senjr-text-muted)' }} />
            </div>
            {recommendedMentors.map((m) => (
              <button key={m.name} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px', borderRadius: 'var(--senjr-radius)',
                marginBottom: 8, width: '100%', textAlign: 'left',
                background: 'var(--senjr-bg-card)',
                border: '1px solid var(--senjr-border)',
                cursor: 'pointer', transition: 'all var(--senjr-transition-fast)',
              }} onClick={() => navigate('/mentor-portfolio')}>
                <div style={{ position: 'relative' }}>
                  <div className="senjr-avatar" style={{
                    width: 48, height: 48, fontSize: 18,
                    background: 'linear-gradient(135deg, var(--senjr-green-light), var(--senjr-orange-light))',
                    color: 'var(--senjr-green-dark)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>
                    {m.avatar}
                  </div>
                  {m.online && <span className="senjr-status-dot senjr-status-dot-online" style={{ position: 'absolute', bottom: 1, right: 1, border: '2px solid white', width: 12, height: 12 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {m.expertise} <Star size={10} style={{ color: 'var(--senjr-orange)' }} /> {m.rating}
                  </p>
                </div>
                <span className="senjr-tag-green-premium" style={{ fontSize: 12 }}>&#8377;{m.price}/hr</span>
              </button>
            ))}
          </div>

          <div className="senjr-premium-card" style={{ marginBottom: 22 }}>
            <h3 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 14 }}>Leaderboard</h3>
            {leaderboard.map((l) => (
              <div key={l.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 'var(--senjr-radius)',
                marginBottom: 10,
                background: l.isYou ? 'var(--senjr-green-lightest)' : 'var(--senjr-bg-card)',
                border: l.isYou ? '1.5px solid var(--senjr-green)' : '1px solid var(--senjr-border)',
                boxShadow: l.isYou ? '0 2px 8px rgba(16,185,129,0.1)' : 'none',
              }}>
                <span style={{
                  fontSize: 15, fontWeight: 800, width: 28,
                  color: l.rank === 1 ? 'var(--senjr-orange)' : l.rank === 2 ? 'var(--senjr-text)' : 'var(--senjr-text-muted)',
                }}>
                  {l.rank}
                </span>
                <div className="senjr-avatar" style={{
                  width: 36, height: 36, fontSize: 14,
                  background: l.isYou ? 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))' : 'var(--senjr-bg)',
                  color: l.isYou ? 'white' : 'var(--senjr-text-muted)',
                  boxShadow: l.isYou ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                }}>
                  {l.avatar}
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: l.isYou ? 700 : 500 }}>{l.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--senjr-green)' }}>{l.xp} XP</span>
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
