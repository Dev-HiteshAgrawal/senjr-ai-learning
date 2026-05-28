import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Calendar, DollarSign, Video, User, Star, Bell, Loader2, TrendingUp, Users, Clock, Check, Sun, ArrowRight } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import { getMentorBookings, confirmBooking, rejectBooking, type Session } from '../services/sessions'

export default function MentorHub() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null

  const [sessions, setSessions] = useState<Session[]>([])
  const [pendingRequests, setPendingRequests] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!user) { setLoading(false); return }
      try {
        const bookings = await getMentorBookings(user.uid)
        setSessions(bookings)
        setPendingRequests(bookings.filter(b => b.status === 'pending'))
      } catch (err) { console.error('Error fetching bookings:', err) }
      finally { setLoading(false) }
    }
    fetchData()
  }, [user])

  const handleConfirm = async (sessionId: string) => {
    setProcessingId(sessionId)
    try {
      await confirmBooking(sessionId)
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'confirmed' } : s))
      setPendingRequests(prev => prev.filter(s => s.id !== sessionId))
    } catch (err) { console.error('Error confirming booking:', err) }
    finally { setProcessingId(null) }
  }

  const handleReject = async (sessionId: string) => {
    setProcessingId(sessionId)
    try {
      await rejectBooking(sessionId)
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'cancelled' } : s))
      setPendingRequests(prev => prev.filter(s => s.id !== sessionId))
    } catch (err) { console.error('Error rejecting booking:', err) }
    finally { setProcessingId(null) }
  }

  const todaySessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date === today && s.status === 'confirmed'
  })

  const upcomingSessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date >= today && s.status === 'confirmed'
  }).slice(0, 5)

  const totalEarnings = sessions.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.price, 0)
  const earnings = [350, 500, 300, 700, 900, 400, 600]
  const maxEarning = Math.max(...earnings)
  const totalStudents = new Set(sessions.map(s => s.studentId)).size

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--senjr-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
            SEN<span className="senjr-gradient-text-green">JR</span>
          </span>
          <span className="senjr-badge-premium">Mentor</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--senjr-green)' }}>&#8377;{totalEarnings.toLocaleString()}</span>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Bell size={20} style={{ color: 'var(--senjr-text)' }} />
            {pendingRequests.length > 0 && (
              <span style={{
                position: 'absolute', top: -3, right: -3,
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--senjr-orange)', color: 'white', fontSize: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>{pendingRequests.length}</span>
            )}
          </button>
          <div className="senjr-avatar" style={{
            width: 34, height: 34, fontSize: 15,
            background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
            color: 'white', boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
          }}>{user?.displayName?.charAt(0) || 'M'}</div>
        </div>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <Loader2 size={36} className="animate-spin" style={{ color: 'var(--senjr-green)', marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>Loading your dashboard...</p>
            </div>
          ) : (
            <>
              {pendingRequests.length > 0 && (
                <div className="senjr-fade-in" style={{ marginBottom: 24 }}>
                  <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 14, color: 'var(--senjr-orange)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--senjr-orange)', animation: 'pulse 2s infinite' }} />
                    New Booking Requests ({pendingRequests.length})
                  </h2>
                  {pendingRequests.map((session) => (
                    <div key={session.id} className="senjr-premium-card" style={{
                      background: 'linear-gradient(135deg, var(--senjr-orange-lighter), var(--senjr-orange-lightest))',
                      border: '1px solid var(--senjr-orange-light)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                        <div className="senjr-avatar" style={{
                          width: 48, height: 48,
                          background: 'linear-gradient(135deg, var(--senjr-orange-light), var(--senjr-orange))',
                          color: 'white',
                          boxShadow: '0 2px 8px rgba(249,115,22,0.2)',
                        }}>{session.studentName.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 15, fontWeight: 600 }}>{session.studentName}</p>
                          <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{session.date} &middot; {session.time} &middot; {session.duration} min</p>
                        </div>
                        <span className="senjr-tag-orange-premium">Pending</span>
                      </div>
                      <p style={{ fontSize: 13, marginBottom: 14, color: 'var(--senjr-text-muted)' }}>
                        <strong style={{ color: 'var(--senjr-text)' }}>Topic:</strong> {session.topic}
                      </p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleConfirm(session.id)} disabled={processingId === session.id}
                          className="senjr-btn-premium" style={{ flex: 1, fontSize: 14, padding: '10px 0', borderRadius: 'var(--senjr-radius)' }}>
                          {processingId === session.id ? <Loader2 size={14} className="animate-spin" /> : <><Check size={16} /> Confirm</>}
                        </button>
                        <button onClick={() => handleReject(session.id)} disabled={processingId === session.id}
                          style={{
                            flex: 1, padding: '10px 0', borderRadius: 'var(--senjr-radius)', fontSize: 14, fontWeight: 600,
                            background: 'white', color: '#EF4444', border: '1.5px solid #FCA5A5', cursor: 'pointer',
                          }}>
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="senjr-slide-up" style={{ marginBottom: 22 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.3px' }}>
                  <Sun size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6, color: 'var(--senjr-orange)' }} />
                  Welcome back, {user?.displayName?.split(' ')[0] || 'Mentor'}!
                </h1>
                <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>
                  {todaySessions.length > 0 ? `You have ${todaySessions.length} session${todaySessions.length > 1 ? 's' : ''} today` : 'No sessions scheduled for today'}
                </p>
              </div>

              <div className="senjr-stats-grid" style={{ marginBottom: 22, gap: 12 }}>
                <div className="senjr-premium-card" style={{ textAlign: 'center', padding: '16px 10px', marginBottom: 0, background: 'var(--senjr-green-lightest)', border: '1px solid var(--senjr-green-light)' }}>
                  <Calendar size={20} style={{ color: 'var(--senjr-green)', margin: '0 auto 6px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 22, color: 'var(--senjr-green)' }}>{sessions.length}</span>
                  <span className="senjr-stat-label">Sessions</span>
                </div>
                <div className="senjr-premium-card" style={{ textAlign: 'center', padding: '16px 10px', marginBottom: 0, background: 'var(--senjr-orange-lightest)', border: '1px solid var(--senjr-orange-light)' }}>
                  <Users size={20} style={{ color: 'var(--senjr-orange)', margin: '0 auto 6px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 22, color: 'var(--senjr-orange)' }}>{totalStudents}</span>
                  <span className="senjr-stat-label">Students</span>
                </div>
                <div className="senjr-premium-card" style={{ textAlign: 'center', padding: '16px 10px', marginBottom: 0 }}>
                  <Star size={20} style={{ color: '#D97706', margin: '0 auto 6px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 22, color: '#D97706' }}>4.8</span>
                  <span className="senjr-stat-label">Rating</span>
                </div>
              </div>

              <div className="senjr-premium-card" style={{ marginBottom: 24, background: 'var(--senjr-green-lightest)', border: '1px solid var(--senjr-green-light)' }}>
                <div className="senjr-flex-between" style={{ marginBottom: 14 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>Total Earnings</span>
                  <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/earnings')}>
                    View Details <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </button>
                </div>
                <p style={{ fontSize: 30, fontWeight: 800, marginBottom: 16 }}>&#8377;{totalEarnings.toLocaleString()}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 64, marginBottom: 16 }}>
                  {earnings.map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${(h / maxEarning) * 100}%`,
                      background: i === 4 ? 'var(--senjr-green)' : 'var(--senjr-green-light)',
                      borderRadius: 4, minHeight: 8, transition: 'height 0.3s ease',
                    }} />
                  ))}
                </div>
                <button className="senjr-btn-premium" style={{ background: 'var(--senjr-bg-card)', color: 'var(--senjr-text)', border: '1.5px solid var(--senjr-border-dark)', boxShadow: 'none', fontSize: 14, padding: '10px 0' }}>
                  Withdraw to UPI
                </button>
              </div>

              {upcomingSessions.length > 0 && (
                <div className="senjr-fade-in" style={{ marginBottom: 24 }}>
                  <div className="senjr-flex-between" style={{ marginBottom: 14 }}>
                    <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>Upcoming Sessions</h2>
                    <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/availability')}>
                      View Calendar <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </button>
                  </div>
                  {upcomingSessions.map((s) => (
                    <div key={s.id} className="senjr-premium-card" style={{
                      display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, padding: 14,
                      borderLeft: '4px solid var(--senjr-green)',
                    }}>
                      <div className="senjr-avatar" style={{
                        width: 44, height: 44, fontSize: 16,
                        background: 'var(--senjr-green-light)', color: 'var(--senjr-green-dark)',
                      }}>{s.studentName.charAt(0)}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{s.studentName}</p>
                        <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{s.date} &middot; {s.time}</p>
                        <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{s.topic}</p>
                      </div>
                      {s.meetingLink ? (
                        <a href={s.meetingLink} target="_blank" rel="noopener noreferrer" className="senjr-btn-premium" style={{ padding: '8px 16px', fontSize: 13, width: 'auto', borderRadius: 'var(--senjr-radius)' }}>Join</a>
                      ) : (
                        <Clock size={16} style={{ color: 'var(--senjr-text-muted)' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
                <button className="senjr-premium-card" style={{ textAlign: 'center', padding: 20, cursor: 'pointer', marginBottom: 0, background: 'var(--senjr-green-lightest)' }} onClick={() => navigate('/availability')}>
                  <Calendar size={24} style={{ color: 'var(--senjr-green)', margin: '0 auto 10px' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Set Availability</span>
                </button>
                <button className="senjr-premium-card" style={{ textAlign: 'center', padding: 20, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate('/mentor-profile')}>
                  <User size={24} style={{ color: 'var(--senjr-green)', margin: '0 auto 10px' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>My Profile</span>
                </button>
                <button className="senjr-premium-card" style={{ textAlign: 'center', padding: 20, cursor: 'pointer', marginBottom: 0, background: 'var(--senjr-orange-lightest)' }}>
                  <Star size={24} style={{ color: 'var(--senjr-orange)', margin: '0 auto 10px' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>View Reviews</span>
                </button>
                <button className="senjr-premium-card" style={{ textAlign: 'center', padding: 20, cursor: 'pointer', marginBottom: 0, background: 'var(--senjr-green-lightest)' }}>
                  <TrendingUp size={24} style={{ color: 'var(--senjr-green)', margin: '0 auto 10px' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Analytics</span>
                </button>
              </div>

              {sessions.length === 0 && (
                <div className="senjr-premium-card" style={{ textAlign: 'center', padding: 44, marginBottom: 100 }}>
                  <div className="senjr-icon-circle" style={{ margin: '0 auto 16px', width: 72, height: 72, background: 'var(--senjr-green-lighter)' }}>
                    <Users size={32} style={{ color: 'var(--senjr-green)' }} />
                  </div>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 14, marginBottom: 6 }}>No bookings yet.</p>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 13, marginBottom: 18 }}>Share your profile to get students!</p>
                  <button className="senjr-btn-premium" style={{ width: 'auto', padding: '10px 24px', fontSize: 13, borderRadius: 50 }} onClick={() => navigate('/mentor-profile')}>
                    View My Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/mentor-hub')}>
          <Home size={20} /> Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/availability')}>
          <Calendar size={20} /> Schedule
        </button>
        <button className="senjr-nav-item" style={{ position: 'relative', top: -8 }} onClick={() => navigate('/live-session')}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
            <Video size={24} />
          </div>
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/earnings')}>
          <DollarSign size={20} /> Earnings
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/mentor-profile')}>
          <User size={20} /> Profile
        </button>
      </nav>
    </div>
  )
}
