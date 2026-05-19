import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, CheckCircle, MapPin, MessageSquare, UserPlus, ChevronDown, Home, BookOpen, Trophy, User } from 'lucide-react'

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

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <button className="senjr-header-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <span className="senjr-header-title">Hitesh's Profile</span>
        <button className="senjr-btn-icon">
          <Share2 size={18} />
        </button>
      </header>

      <div className="senjr-page">
        <div style={{
          background: 'linear-gradient(180deg, var(--senjr-black) 0%, #2D2D44 100%)',
          padding: '24px 16px 40px',
          textAlign: 'center'
        }}>
          <div className="senjr-avatar senjr-avatar-xl" style={{
            margin: '0 auto 16px',
            border: '4px solid white',
            background: 'linear-gradient(135deg, var(--senjr-green-light) 0%, #BBF7D0 100%)',
            fontSize: 48
          }}>
            👨‍
          </div>
        </div>

        <div className="senjr-content" style={{ marginTop: -20 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              Hitesh Agrawal <CheckCircle size={18} style={{ display: 'inline', color: 'var(--senjr-green)', verticalAlign: 'middle' }} />
            </h1>
            <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>@hitesh_agrawal</p>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>BBA 2nd Year | ITM College Aligarh</p>
            <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 12 }}>
              <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Aligarh, UP 🇮🇳
            </p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--senjr-text-muted)' }}>
              "Aspiring UP Police officer. Learning from the best mentors. 🔥"
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <button className="senjr-btn senjr-btn-outline" style={{ flex: 1, padding: '10px 0' }}>
              <MessageSquare size={16} /> Message
            </button>
            <button className="senjr-btn senjr-btn-green" style={{ flex: 1, padding: '10px 0' }}>
              <UserPlus size={16} /> Follow
            </button>
            <button className="senjr-btn-icon">
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="senjr-card-green">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 0 }}>
                📊 My Journey
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
