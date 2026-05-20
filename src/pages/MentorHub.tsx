import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Calendar, DollarSign, Video, User, Star, Bell, Loader2, TrendingUp, Users, Clock } from 'lucide-react'
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
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const bookings = await getMentorBookings(user.uid)
        setSessions(bookings)

        const pending = bookings.filter(b => b.status === 'pending')
        setPendingRequests(pending)
      } catch (err) {
        console.error('Error fetching bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleConfirm = async (sessionId: string) => {
    setProcessingId(sessionId)
    try {
      await confirmBooking(sessionId)
      setSessions(prev =>
        prev.map(s => s.id === sessionId ? { ...s, status: 'confirmed' } : s)
      )
      setPendingRequests(prev => prev.filter(s => s.id !== sessionId))
    } catch (err) {
      console.error('Error confirming booking:', err)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (sessionId: string) => {
    setProcessingId(sessionId)
    try {
      await rejectBooking(sessionId)
      setSessions(prev =>
        prev.map(s => s.id === sessionId ? { ...s, status: 'cancelled' } : s)
      )
      setPendingRequests(prev => prev.filter(s => s.id !== sessionId))
    } catch (err) {
      console.error('Error rejecting booking:', err)
    } finally {
      setProcessingId(null)
    }
  }

  const todaySessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date === today && s.status === 'confirmed'
  })

  const upcomingSessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date >= today && s.status === 'confirmed'
  }).slice(0, 5)

  const totalEarnings = sessions
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.price, 0)

  const earnings = [350, 500, 300, 700, 900, 400, 600]
  const maxEarning = Math.max(...earnings)
  const totalStudents = new Set(sessions.map(s => s.studentId)).size

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <span style={{ fontSize: 20, cursor: 'pointer' }}>☰</span>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Mentor Hub</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--senjr-green)' }}>₹{totalEarnings.toLocaleString()}</span>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Bell size={20} style={{ color: 'white' }} />
            {pendingRequests.length > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--senjr-orange)', color: 'white',
                fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
              }}>{pendingRequests.length}</span>
            )}
          </button>
          <div className="senjr-avatar" style={{ width: 32, height: 32, fontSize: 14, background: 'var(--senjr-green)', color: 'white' }}>
            {user?.displayName?.charAt(0) || 'M'}
          </div>
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
                  <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 12 }}>
                    New Booking Requests ({pendingRequests.length})
                  </h2>
                  {pendingRequests.map((session) => (
                    <div key={session.id} className="senjr-card" style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div className="senjr-avatar" style={{ width: 44, height: 44, background: 'var(--senjr-orange-light)', color: 'var(--senjr-orange-dark)' }}>
                          {session.studentName.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 600 }}>{session.studentName}</p>
                          <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>
                            {session.date} • {session.time} • {session.duration} min
                          </p>
                        </div>
                        <span className="senjr-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>Pending</span>
                      </div>
                      <p style={{ fontSize: 13, marginBottom: 12, color: 'var(--senjr-text-muted)' }}>
                        <strong>Topic:</strong> {session.topic}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => handleConfirm(session.id)}
                          disabled={processingId === session.id}
                          className="senjr-btn senjr-btn-green senjr-ripple"
                          style={{ flex: 1, padding: '10px 12px', fontSize: 13 }}
                        >
                          {processingId === session.id ? <Loader2 size={14} className="animate-spin" /> : 'Confirm'}
                        </button>
                        <button
                          onClick={() => handleReject(session.id)}
                          disabled={processingId === session.id}
                          className="senjr-btn senjr-btn-outline"
                          style={{ flex: 1, padding: '10px 12px', fontSize: 13, borderColor: 'var(--senjr-text-light)', color: 'var(--senjr-text-muted)' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="senjr-fade-in" style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                  Welcome back, {user?.displayName?.split(' ')[0] || 'Mentor'}!
                </h1>
                <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>
                  {todaySessions.length > 0
                    ? `You have ${todaySessions.length} session${todaySessions.length > 1 ? 's' : ''} today`
                    : 'No sessions scheduled for today'}
                </p>
              </div>

              <div className="senjr-grid-3" style={{ marginBottom: 20 }}>
                <div className="senjr-stat-card senjr-fade-in" style={{ background: 'var(--senjr-green-bg)', border: '1px solid var(--senjr-green-light)' }}>
                  <Calendar size={18} style={{ color: 'var(--senjr-green)', margin: '0 auto 4px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 20, color: 'var(--senjr-green)' }}>{sessions.length}</span>
                  <span className="senjr-stat-label">Sessions</span>
                </div>
                <div className="senjr-stat-card senjr-fade-in" style={{ background: 'var(--senjr-orange-bg)', border: '1px solid var(--senjr-orange-light)' }}>
                  <Users size={18} style={{ color: 'var(--senjr-orange)', margin: '0 auto 4px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 20, color: 'var(--senjr-orange)' }}>{totalStudents}</span>
                  <span className="senjr-stat-label">Students</span>
                </div>
                <div className="senjr-stat-card senjr-fade-in" style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}>
                  <Star size={18} style={{ color: '#D97706', margin: '0 auto 4px' }} />
                  <span className="senjr-stat-value" style={{ fontSize: 20, color: '#D97706' }}>4.8</span>
                  <span className="senjr-stat-label">Rating</span>
                </div>
              </div>

              <div className="senjr-card-green senjr-fade-in" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Total Earnings</span>
                  <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600 }} onClick={() => navigate('/earnings')}>
                    View →
                  </button>
                </div>
                <p style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>₹{totalEarnings.toLocaleString()}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60, marginBottom: 14 }}>
                  {earnings.map((h, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: `${(h / maxEarning) * 100}%`,
                      background: i === 4 ? 'var(--senjr-green)' : 'var(--senjr-green-light)',
                      borderRadius: 4,
                      minHeight: 8,
                      transition: 'height 0.3s ease',
                    }} />
                  ))}
                </div>
                <button className="senjr-btn senjr-btn-outline senjr-btn-sm senjr-ripple" style={{ fontSize: 13 }}>
                  Withdraw to UPI
                </button>
              </div>

              {upcomingSessions.length > 0 && (
                <div className="senjr-fade-in" style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h2 className="senjr-section-title" style={{ fontSize: 16, marginBottom: 0 }}>Upcoming Sessions</h2>
                    <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600 }} onClick={() => navigate('/availability')}>
                      View Calendar →
                    </button>
                  </div>

                  {upcomingSessions.map((s) => (
                    <div key={s.id} className="senjr-card-flat senjr-ripple" style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      borderLeft: '3px solid var(--senjr-green)',
                      marginBottom: 8,
                      cursor: 'pointer',
                    }}>
                      <div className="senjr-avatar" style={{
                        width: 44, height: 44, fontSize: 14,
                        background: 'var(--senjr-green-light)',
                        color: 'var(--senjr-green-dark)'
                      }}>
                        {s.studentName.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{s.studentName}</p>
                        <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{s.date} • {s.time}</p>
                        <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{s.topic}</p>
                      </div>
                      {s.meetingLink ? (
                        <a
                          href={s.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="senjr-btn senjr-btn-sm senjr-ripple"
                          style={{ padding: '6px 14px', fontSize: 12 }}
                        >
                          Join
                        </a>
                      ) : (
                        <Clock size={16} style={{ color: 'var(--senjr-text-muted)' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="senjr-grid-2" style={{ marginBottom: 24 }}>
                <button className="senjr-card-flat senjr-ripple" style={{ textAlign: 'center', padding: 18, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate('/availability')}>
                  <Calendar size={22} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Set Availability</span>
                </button>
                <button className="senjr-card-flat senjr-ripple" style={{ textAlign: 'center', padding: 18, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate('/mentor-profile')}>
                  <User size={22} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>My Profile</span>
                </button>
                <button className="senjr-card-flat senjr-ripple" style={{ textAlign: 'center', padding: 18, cursor: 'pointer', marginBottom: 0 }}>
                  <Star size={22} style={{ color: 'var(--senjr-orange)', margin: '0 auto 8px' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>View Reviews</span>
                </button>
                <button className="senjr-card-flat senjr-ripple" style={{ textAlign: 'center', padding: 18, cursor: 'pointer', marginBottom: 0 }}>
                  <TrendingUp size={22} style={{ color: 'var(--senjr-green)', margin: '0 auto 8px' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Analytics</span>
                </button>
              </div>

              {sessions.length === 0 && (
                <div className="senjr-card-flat senjr-fade-in" style={{ textAlign: 'center', padding: 40, marginBottom: 24 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'var(--senjr-green-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <Users size={28} style={{ color: 'var(--senjr-green)' }} />
                  </div>
                  <p style={{ color: 'var(--senjr-text-muted)', fontSize: 14, marginBottom: 4 }}>
                    No bookings yet. Share your profile to get students!
                  </p>
                  <button className="senjr-btn senjr-btn-green senjr-ripple" style={{ marginTop: 12 }} onClick={() => navigate('/mentor-profile')}>
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
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/availability')}>
          <Calendar size={20} />
          Schedule
        </button>
        <button className="senjr-nav-item" style={{ position: 'relative', top: -8 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
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
