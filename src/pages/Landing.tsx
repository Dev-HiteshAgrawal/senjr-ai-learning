import { useNavigate } from 'react-router-dom'
import { Home, GraduationCap, BookOpen, User, Star, Users, Trophy, Sparkles, ArrowRight, ChevronRight, TrendingUp, Shield, MessageSquare, Search, Rocket, Laptop, Palette } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Landing() {
  const navigate = useNavigate()
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: Users, title: 'Learn from Seniors', desc: 'Real guidance from those who have already cracked it', color: 'var(--senjr-green)' },
    { icon: Sparkles, title: 'AI Tutor 24/7', desc: 'Get instant doubt-solving anytime, anywhere', color: 'var(--senjr-orange)' },
    { icon: Trophy, title: 'Mock Tests', desc: 'Practice with real exam patterns & analytics', color: '#3B82F6' },
    { icon: Shield, title: 'Vetted Mentors', desc: 'Verified seniors with proven expertise', color: '#8B5CF6' },
  ]

  const howItWorks = [
    { step: '1', title: 'Sign up free', desc: 'Create your account in 30 seconds', icon: User },
    { step: '2', title: 'Find your mentor', desc: 'Choose from verified senior mentors', icon: Search },
    { step: '3', title: 'Learn & grow', desc: '1:1 sessions, AI help, mock tests', icon: TrendingUp },
  ]

  const stats = [
    { value: '500+', label: 'Students', color: 'var(--senjr-green)' },
    { value: '50+', label: 'Mentors', color: 'var(--senjr-orange)' },
    { value: '4.8', label: 'Avg Rating', color: '#3B82F6' },
    { value: 'High', label: 'Satisfaction', color: '#8B5CF6' },
  ]

  const popularLessons = [
    {
      title: 'Mastering DSA for FAANG',
      mentor: 'Rahul S., IIT Delhi \'24',
      duration: '45 mins',
      tags: ['Algorithms', 'Interview'],
      rating: 4.9,
      students: 234,
      badge: '#1',
      icon: <Laptop size={36} style={{ color: 'white' }} />,
      color: '#1a1a2e',
    },
    {
      title: 'UP Police Complete Prep',
      mentor: 'Amit K., UP Cleared',
      duration: '30 days',
      tags: ['GK', 'Reasoning'],
      rating: 4.8,
      students: 567,
      badge: 'Popular',
      icon: <Shield size={36} style={{ color: 'white' }} />,
      color: '#065F46',
    },
    {
      title: 'UI/UX Basics for Devs',
      mentor: 'Priya M., NID \'23',
      duration: '1.5 hrs',
      tags: ['Design', 'Portfolio'],
      rating: 4.7,
      students: 156,
      badge: 'New',
      icon: <Palette size={36} style={{ color: 'white' }} />,
      color: '#BE123C',
    },
  ]

  return (
    <div className="senjr-app">
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: 'var(--senjr-bg-card)',
        borderBottom: '1px solid var(--senjr-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>SENJR</span>
        </div>
        <button
          onClick={() => navigate('/auth')}
          style={{
            padding: '8px 20px', borderRadius: 'var(--senjr-radius-full)',
            background: 'var(--senjr-green)', color: 'white',
            fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Login
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-content">

          <div className="senjr-fade-in" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', borderRadius: 'var(--senjr-radius-full)',
                background: 'var(--senjr-green-light)', color: 'var(--senjr-green-dark)',
                fontSize: 12, fontWeight: 600,
              }}>
                <Sparkles size={12} /> India's #1 Peer Learning Platform
              </span>
            </div>

            <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
              Learn from{' '}
              <span className="senjr-gradient-text">Seniors.</span>
            </h1>
            <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
              Not Teachers.
            </h1>
            <p style={{ fontSize: 15, color: 'var(--senjr-text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
              Real guidance from seniors who've actually cleared the exams and landed the jobs you're aiming for.
            </p>

            <div style={{
              background: 'linear-gradient(135deg, var(--senjr-green-lighter) 0%, var(--senjr-orange-lighter) 100%)',
              borderRadius: 'var(--senjr-radius-lg)', padding: 24, marginBottom: 20,
              border: '1px solid var(--senjr-border)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--senjr-black)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <MessageSquare size={20} style={{ color: 'var(--senjr-green)' }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, fontStyle: 'italic', textAlign: 'center' }}>
                "Maine khud yeh exams clear kiye hain - ab main aapki madad kar sakta hoon. Real guidance, real results."
              </p>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', textAlign: 'center' }}>
                - Rahul, IIT Delhi '24
              </p>
            </div>

            <button
              className="senjr-btn senjr-btn-green"
              style={{ marginBottom: 10, boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
              onClick={() => navigate('/student-signup')}
            >
              Start Learning Free <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button
                className="senjr-btn senjr-btn-sm"
                style={{ flex: 1, fontSize: 13, border: '1.5px solid var(--senjr-border)', background: 'var(--senjr-bg-card)', borderRadius: 'var(--senjr-radius)' }}
                onClick={() => navigate('/mentor-signup')}
              >
                Become a Mentor
              </button>
              <button
                className="senjr-btn senjr-btn-sm"
                style={{ flex: 1, fontSize: 13, border: '1.5px solid var(--senjr-border)', background: 'var(--senjr-bg-card)', borderRadius: 'var(--senjr-radius)' }}
                onClick={() => navigate('/auth')}
              >
                Sign In
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div className="senjr-avatar-group">
                {['P', 'A', 'R', 'K'].map((initial, i) => (
                  <div key={i} className="senjr-avatar" style={{
                    width: 32, height: 32, fontSize: 12,
                    background: i % 2 === 0 ? 'var(--senjr-green)' : 'var(--senjr-orange)',
                    color: 'white', border: '2px solid white',
                  }}>
                    {initial}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--senjr-text-muted)' }}>
                <strong style={{ color: 'var(--senjr-text)' }}>500+</strong> students joined
              </span>
            </div>
          </div>

          <div id="how-it-works" data-observe className="senjr-card" style={{
            overflow: 'hidden', padding: 20, marginBottom: 28,
            background: 'var(--senjr-black)', color: 'white', border: 'none',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: 'center' }}>
              How It <span style={{ color: 'var(--senjr-green)' }}>Works</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {howItWorks.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: i === 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 800, flexShrink: 0,
                    }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: '#94A3B8' }}>{item.desc}</p>
                    </div>
                    {i < howItWorks.length - 1 && (
                      <ArrowRight size={18} style={{ color: '#334155' }} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div id="stats" data-observe className="senjr-card" style={{
            overflow: 'hidden', padding: 0, marginBottom: 28,
          }}>
            <div className="senjr-grid-2" style={{ gap: 0 }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: '20px 16px', textAlign: 'center',
                  borderRight: i % 2 === 0 ? '1px solid var(--senjr-border)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--senjr-border)' : 'none',
                }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 2 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="features" data-observe className={`${visibleSections['features'] ? 'senjr-fade-in' : ''}`} style={{ marginBottom: 28 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              Why Students <span className="senjr-gradient-text">Love</span> Senjr
            </h2>
            <div className="senjr-grid-2">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="senjr-card-flat" style={{
                    padding: 16, marginBottom: 0,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${f.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                      <Icon size={20} style={{ color: f.color }} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)' }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div id="lessons" data-observe className={`${visibleSections['lessons'] ? 'senjr-slide-up' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 18, marginBottom: 0 }}>
                Popular <span className="senjr-gradient-text">Lessons</span>
              </h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>

            {popularLessons.map((lesson, i) => (
              <div key={i} className="senjr-card-flat" style={{
                marginBottom: 16, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }} onClick={() => navigate('/auth')}>
                <div style={{
                  background: lesson.color,
                  borderRadius: 10, padding: 20, marginBottom: 12,
                  position: 'relative', minHeight: 80,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {lesson.icon}
                  <span style={{
                    position: 'absolute', top: 8, right: 8,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 8px', borderRadius: 'var(--senjr-radius-full)',
                    background: 'var(--senjr-orange-light)', color: 'var(--senjr-orange-dark)',
                    fontSize: 11, fontWeight: 600,
                  }}>
                    {lesson.badge}
                  </span>
                  <span style={{
                    position: 'absolute', bottom: 8, left: 8,
                    padding: '3px 8px', borderRadius: 'var(--senjr-radius-full)',
                    background: 'rgba(255,255,255,0.2)', color: 'white',
                    fontSize: 11, fontWeight: 500,
                  }}>
                    {lesson.duration}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lesson.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 8 }}>
                  By {lesson.mentor}
                </p>
                <div className="senjr-flex-between">
                  <div style={{ display: 'flex', gap: 6 }}>
                    {lesson.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: 'var(--senjr-radius-full)',
                        background: 'var(--senjr-bg)', color: 'var(--senjr-text-muted)',
                        fontSize: 11, fontWeight: 500, border: '1px solid var(--senjr-border)',
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

          <div id="cta" data-observe className={`${visibleSections['cta'] ? 'senjr-pop' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-card" style={{
              overflow: 'hidden', padding: 0,
              background: 'linear-gradient(135deg, var(--senjr-black) 0%, #1E293B 100%)',
              border: 'none',
            }}>
              <div style={{ padding: 28, textAlign: 'center' }}>
                <Rocket size={48} style={{ color: 'var(--senjr-orange)', margin: '0 auto 12px' }} />
                <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  Apni preparation ko next level le jao
                </p>
                <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                  Join 500+ students preparing together with senior mentors
                </p>
                <button
                  className="senjr-btn senjr-btn-orange"
                  style={{ width: 'auto', padding: '12px 28px', margin: '0 auto', boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }}
                  onClick={() => navigate('/student-signup')}
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid var(--senjr-border)' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--senjr-green)', marginBottom: 12, letterSpacing: '-0.5px' }}>SENJR</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Terms</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Privacy</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Support</a>
            </div>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>
              &copy; 2026 Senjr EdTech. Made in India
            </p>
          </div>
        </div>
      </div>

      <nav className="senjr-bottom-nav">
        <button className="senjr-nav-item senjr-nav-item-active" onClick={() => navigate('/')}>
          <Home size={20} /> Home
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <GraduationCap size={20} /> Courses
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <BookOpen size={20} /> My Learning
        </button>
        <button className="senjr-nav-item" onClick={() => navigate('/auth')}>
          <User size={20} /> Profile
        </button>
      </nav>
    </div>
  )
}
