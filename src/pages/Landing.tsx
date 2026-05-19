import { useNavigate } from 'react-router-dom'
import { Home, GraduationCap, BookOpen, Trophy, User } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="senjr-app">
      <header className="senjr-header">
        <div className="senjr-brand">
          <span className="senjr-brand-logo">SENJR</span>
        </div>
        <button className="senjr-header-action senjr-btn-outline senjr-btn-sm" onClick={() => navigate('/auth')}>
          Login
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>
              Learn from <span style={{ color: 'var(--senjr-orange)', textDecoration: 'underline', textDecorationColor: 'var(--senjr-green)' }}>Seniors.</span>
            </h1>
            <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Not Teachers.
            </h1>

            <div className="senjr-card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
                padding: 24,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>👨‍🎓👩‍</div>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Real advice from seniors who cleared it</p>
              </div>
            </div>

            <button
              className="senjr-btn senjr-btn-green"
              style={{ marginBottom: 12 }}
              onClick={() => navigate('/student-signup')}
            >
              Start Learning Free
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
              <div style={{ display: 'flex' }}>
                {['🧑', '', '🧔'].map((e, i) => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--senjr-green-light)',
                    border: '2px solid white',
                    marginLeft: i > 0 ? -8 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14
                  }}>{e}</div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>500+ students joined</span>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h2 className="senjr-section-title">
              <span style={{ color: 'var(--senjr-orange)' }}>★</span> Popular Lessons
            </h2>

            <div className="senjr-card-flat">
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                position: 'relative'
              }}>
                <div style={{ fontSize: 40, textAlign: 'center' }}>💻📚</div>
                <span className="senjr-badge senjr-badge-orange" style={{ position: 'absolute', top: 8, right: 8 }}>
                  #1
                </span>
                <span className="senjr-badge senjr-badge-green" style={{ position: 'absolute', bottom: 8, left: 8 }}>
                  45 mins
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Mastering DSA for FAANG</h3>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>By Rahul S., IIT Delhi '24</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="senjr-chip senjr-btn-sm" style={{ fontSize: 12, padding: '4px 12px', cursor: 'default' }}>Algorithms</span>
                <span className="senjr-chip senjr-btn-sm" style={{ fontSize: 12, padding: '4px 12px', cursor: 'default' }}>Interview</span>
              </div>
            </div>

            <div className="senjr-card-flat">
              <div style={{
                background: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)',
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                marginBottom: 12,
                position: 'relative'
              }}>
                <div style={{ fontSize: 40 }}></div>
                <span className="senjr-badge senjr-badge-green" style={{ position: 'absolute', top: 8, right: 8 }}>
                  New
                </span>
                <span className="senjr-badge senjr-badge-orange" style={{ position: 'absolute', bottom: 8, left: 8 }}>
                  1.5 hrs
                </span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>UI/UX Basics for Devs</h3>
              <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>By Priya M., NID '23</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/')}>
          <Home size={20} />
          Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/courses')}>
          <GraduationCap size={20} />
          Courses
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/my-learning')}>
          <BookOpen size={20} />
          My Learning
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/profile')}>
          <User size={20} />
          Profile
        </button>
      </nav>
    </div>
  )
}
