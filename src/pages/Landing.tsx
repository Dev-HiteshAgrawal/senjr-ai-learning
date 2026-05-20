import { useNavigate } from 'react-router-dom'
import { Home, GraduationCap, BookOpen, User, Star, Users, Trophy, Sparkles } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  const popularLessons = [
    {
      title: 'Mastering DSA for FAANG',
      mentor: 'Rahul S., IIT Delhi \'24',
      duration: '45 mins',
      tags: ['Algorithms', 'Interview'],
      rating: 4.9,
      students: 234,
      badge: '#1',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
    },
    {
      title: 'UI/UX Basics for Devs',
      mentor: 'Priya M., NID \'23',
      duration: '1.5 hrs',
      tags: ['Design', 'Portfolio'],
      rating: 4.7,
      students: 156,
      badge: 'New',
      gradient: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)',
    },
    {
      title: 'UP Police Complete Prep',
      mentor: 'Amit K., UP Police Cleared',
      duration: '30 days',
      tags: ['GK', 'Reasoning'],
      rating: 4.8,
      students: 567,
      badge: 'Popular',
      gradient: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
    },
  ]

  const features = [
    { icon: Users, title: 'Learn from Seniors', desc: 'Real advice from those who cleared it' },
    { icon: Sparkles, title: 'AI Tutor 24/7', desc: 'Get instant help with your doubts' },
    { icon: Trophy, title: 'Mock Tests', desc: 'Practice with real exam patterns' },
    { icon: GraduationCap, title: 'Vetted Mentors', desc: 'Application-based mentors with verified expertise' },
  ]

  return (
    <div className="senjr-app">
      <header className="senjr-header" style={{ background: 'var(--senjr-black)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--senjr-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--senjr-green-dark)',
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>SENJR</span>
        </div>
        <button
          className="senjr-btn senjr-btn-outline senjr-btn-sm"
          style={{
            width: 'auto',
            padding: '8px 20px',
            borderColor: 'white',
            color: 'white',
            background: 'transparent',
          }}
          onClick={() => navigate('/auth')}
        >
          Login
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, marginBottom: 8 }}>
              Learn from{' '}
              <span style={{
                color: 'var(--senjr-orange)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--senjr-green)',
                textDecorationThickness: '3px',
              }}>Seniors.</span>
            </h1>
            <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
              Not Teachers.
            </h1>

            <div className="senjr-card" style={{
              overflow: 'hidden',
              padding: 0,
              marginBottom: 20,
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #FFF7ED 100%)',
                padding: 28,
                textAlign: 'center',
              }}>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%',
                  background: 'white',
                  margin: '0 auto 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '3px solid var(--senjr-text)',
                  boxShadow: '4px 4px 0 var(--senjr-text)',
                }}>
                  <span style={{ fontSize: 56 }}>👨‍🎓</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>
                  Real advice from seniors who cleared it
                </p>
              </div>
            </div>

            <button
              className="senjr-btn senjr-btn-green"
              style={{ marginBottom: 12 }}
              onClick={() => navigate('/student-signup')}
            >
              Start Learning Free
            </button>

            <button
              className="senjr-btn senjr-btn-outline senjr-btn-sm"
              style={{ marginBottom: 20, width: '100%' }}
              onClick={() => navigate('/mentor-signup')}
            >
              Become a Mentor
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ display: 'flex' }}>
                {['', '', '🧔'].map((e, i) => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--senjr-green-light)',
                    border: '2px solid white',
                    marginLeft: i > 0 ? -8 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14,
                  }}>{e}</div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>500+ students joined</span>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              <Star size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Why Senjr?
            </h2>
            <div className="senjr-grid-2">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="senjr-card-flat" style={{
                    padding: 16,
                    marginBottom: 0,
                    border: '2px solid var(--senjr-text)',
                    boxShadow: '2px 2px 0 var(--senjr-text)',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'var(--senjr-green-bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                      <Icon size={20} style={{ color: 'var(--senjr-green)' }} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              <Star size={18} style={{ display: 'inline', marginRight: 4, color: 'var(--senjr-orange)' }} />
              Popular Lessons
            </h2>

            {popularLessons.map((lesson, i) => (
              <div key={i} className="senjr-card-flat" style={{
                marginBottom: 16,
                cursor: 'pointer',
                border: '2px solid var(--senjr-text)',
                boxShadow: '2px 2px 0 var(--senjr-text)',
              }} onClick={() => navigate('/auth')}>
                <div style={{
                  background: lesson.gradient,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 12,
                  position: 'relative',
                  minHeight: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 36 }}>
                    {i === 0 ? '💻📚' : i === 1 ? '🎨' : ''}
                  </span>
                  <span className="senjr-badge senjr-badge-orange" style={{
                    position: 'absolute', top: 8, right: 8,
                  }}>
                    {lesson.badge}
                  </span>
                  <span className="senjr-badge senjr-badge-green" style={{
                    position: 'absolute', bottom: 8, left: 8,
                  }}>
                    {lesson.duration}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lesson.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>
                  By {lesson.mentor}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {lesson.tags.map((tag) => (
                      <span key={tag} className="senjr-chip senjr-btn-sm" style={{
                        fontSize: 11, padding: '4px 10px', cursor: 'default',
                        border: '1px solid var(--senjr-border)',
                        boxShadow: 'none',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} style={{ color: 'var(--senjr-orange)', fill: 'var(--senjr-orange)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{lesson.rating}</span>
                    <span style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>({lesson.students})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="senjr-card" style={{
            overflow: 'hidden',
            padding: 0,
            marginBottom: 28,
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--senjr-black) 0%, #2D2D44 100%)',
              padding: 28,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍👩‍💻</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                Join 500+ students preparing together
              </p>
              <p style={{ fontSize: 13, color: '#94A3B8' }}>
                Start your learning journey today
              </p>
              <button
                className="senjr-btn senjr-btn-green"
                style={{ marginTop: 16, width: 'auto', padding: '10px 24px' }}
                onClick={() => navigate('/student-signup')}
              >
                Get Started Free
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '20px 0', borderTop: '1px solid var(--senjr-border)' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)', marginBottom: 8 }}>SENJR</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 12 }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Terms</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Privacy</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>Support</a>
            </div>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>
              © 2026 Senjr EdTech. Made in India 🇮
            </p>
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
