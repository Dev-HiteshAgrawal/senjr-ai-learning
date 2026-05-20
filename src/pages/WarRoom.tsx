import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, GraduationCap, TrendingUp, Users, CheckCircle, Home, BookOpen, User, Lightbulb } from 'lucide-react'

export default function WarRoom() {
  const navigate = useNavigate()

  const rooms = [
    {
      title: 'UP Police Constable',
      price: 299,
      originalPrice: 599,
      badge: 'Most Popular',
      features: [
        '4 Live Sessions + Daily WhatsApp',
        'Mock Tests & PyQ Analysis',
      ],
      mentor: 'Rahul Sir (UP Police Cleared)',
      icon: 'trophy',
    },
    {
      title: 'SSC CGL',
      price: 299,
      originalPrice: 599,
      badge: null,
      features: [
        '4 Live Sessions + Daily WhatsApp',
        'Comprehensive Mock Series',
      ],
      mentor: 'Senior CGL Officer',
      icon: 'graduation',
    },
    {
      title: 'BBA Entrance',
      price: 199,
      originalPrice: 399,
      badge: null,
      features: [
        '4 Live Sessions + Daily WhatsApp',
        'Interview Prep & Aptitude Tests',
      ],
      mentor: 'IIM Alumni Mentor',
      icon: 'trending',
    },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Intensive Courses</span>
        <button className="senjr-btn-icon">
          <Users size={18} />
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Exam Prep Intensive</h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)' }}>30-day intensive prep with verified seniors</p>
          </div>

          {rooms.map((room, i) => (
            <div className="senjr-card-flat" key={i} style={{ background: 'white', marginBottom: 16, position: 'relative' }}>
              {room.badge && (
                <span className="senjr-badge senjr-badge-orange" style={{ position: 'absolute', top: 12, right: 12 }}>
                  {room.badge}
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: i === 0 ? 'var(--senjr-green-bg)' : i === 1 ? 'var(--senjr-orange-bg)' : '#FEF2F2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {room.icon === 'trophy' && <Trophy size={24} style={{ color: 'var(--senjr-green)' }} />}
                  {room.icon === 'graduation' && <GraduationCap size={24} style={{ color: 'var(--senjr-orange)' }} />}
                  {room.icon === 'trending' && <TrendingUp size={24} style={{ color: '#EF4444' }} />}
                </div>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 700 }}>{room.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)' }}>₹{room.price}</span>
                    <span style={{ fontSize: 14, color: 'var(--senjr-text-light)', textDecoration: 'line-through' }}>₹{room.originalPrice}</span>
                  </div>
                </div>
              </div>

              {room.features.map((feature, fi) => (
                <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CheckCircle size={16} style={{ color: 'var(--senjr-green)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--senjr-text)' }}>{feature}</span>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                <Users size={14} style={{ color: 'var(--senjr-text-muted)' }} />
                <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Mentor: {room.mentor}</span>
              </div>

              <button className="senjr-btn senjr-btn-green" style={{ fontSize: 14 }} onClick={() => navigate('/mock-test')}>
                Take Mock Test
              </button>
            </div>
          ))}

          <div className="senjr-card-flat" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Lightbulb size={20} style={{ color: '#F59E0B', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Not sure which exam?</p>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>Talk to our AI Career Advisor</p>
                <button onClick={() => navigate('/ai-tutor')} style={{
                  padding: '8px 20px', borderRadius: 20,
                  background: 'var(--senjr-black)', color: 'white',
                  fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer'
                }}>Consult AI Tutor</button>
              </div>
            </div>
          </div>

          <div className="senjr-card" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)',
              padding: 24, textAlign: 'center', position: 'relative'
            }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
              <p style={{ fontSize: 13, color: '#94A3B8' }}>Join 500+ students preparing together</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item" onClick={() => navigate('/')}>
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}>
          <BookOpen size={20} />
          Courses
        </button>
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/intensive')}>
          <Trophy size={20} />
          Intensive
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/profile')}>
          <User size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
