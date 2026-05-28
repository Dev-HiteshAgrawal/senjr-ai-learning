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
    { icon: Trophy, title: 'Mock Tests', desc: 'Practice with real exam patterns & analytics', color: 'var(--senjr-blue)' },
    { icon: Shield, title: 'Vetted Mentors', desc: 'Verified seniors with proven expertise', color: 'var(--senjr-purple)' },
  ]

  const howItWorks = [
    { step: '01', title: 'Sign up free', desc: 'Create your account in under 30 seconds', icon: User },
    { step: '02', title: 'Find your mentor', desc: 'Browse verified senior mentors in your field', icon: Search },
    { step: '03', title: 'Learn & grow', desc: '1:1 sessions, AI help, mock tests & more', icon: TrendingUp },
  ]

  const stats = [
    { value: '500+', label: 'Active Students', color: 'var(--senjr-green)' },
    { value: '50+', label: 'Verified Mentors', color: 'var(--senjr-orange)' },
    { value: '4.8', label: 'Average Rating', color: 'var(--senjr-blue)' },
    { value: '95%', label: 'Satisfaction Rate', color: 'var(--senjr-purple)' },
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
        padding: '14px 16px', background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--senjr-border)', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
          }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>S</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>
            SEN<span className="senjr-gradient-text-green">JR</span>
          </span>
        </div>
        <button
          onClick={() => navigate('/auth')}
          className="senjr-btn-premium"
          style={{ width: 'auto', padding: '8px 22px', fontSize: 14, borderRadius: 50 }}
        >
          Login
        </button>
      </header>

      <div className="senjr-page">
        <div className="senjr-hero-gradient" style={{ padding: '32px 16px 16px', marginBottom: 0 }}>
          <div className="senjr-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <span className="senjr-badge-premium">
                <Sparkles size={12} /> India's #1 Peer Learning Platform
              </span>
            </div>

            <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.08, marginBottom: 12, letterSpacing: '-1px' }}>
              Learn from{' '}
              <span className="senjr-gradient-text">Seniors.</span>
              <br />
              Not Teachers.
            </h1>
            <p style={{ fontSize: 16, color: 'var(--senjr-text-secondary)', lineHeight: 1.6, marginBottom: 22, maxWidth: 320 }}>
              Real guidance from seniors who've actually cleared the exams and landed the jobs you're aiming for.
            </p>

            <div className="senjr-premium-card" style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              marginBottom: 22, padding: 22,
            }}>
              <div className="senjr-icon-circle" style={{
                margin: '0 auto 12px',
                background: 'var(--senjr-black)',
                width: 48, height: 48,
              }}>
                <MessageSquare size={20} style={{ color: 'var(--senjr-green)' }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6, color: 'var(--senjr-text-secondary)' }}>
                "Maine khud yeh exams clear kiye hain — ab main aapki madad kar sakta hoon. Real guidance, real results."
              </p>
              <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', textAlign: 'center', fontWeight: 500 }}>
                — Rahul, IIT Delhi '24
              </p>
            </div>

            <button
              className="senjr-btn-premium"
              style={{ marginBottom: 10, fontSize: 16, padding: '14px 28px' }}
              onClick={() => navigate('/student-signup')}
            >
              Start Learning Free <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
              <button
                style={{
                  flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600,
                  border: '1.5px solid var(--senjr-border-dark)',
                  background: 'var(--senjr-bg-card)', borderRadius: 'var(--senjr-radius)',
                  cursor: 'pointer', transition: 'all var(--senjr-transition-fast)',
                  color: 'var(--senjr-text)',
                }}
                onClick={() => navigate('/mentor-signup')}
              >
                Become a Mentor
              </button>
              <button
                style={{
                  flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600,
                  border: '1.5px solid var(--senjr-border-dark)',
                  background: 'var(--senjr-bg-card)', borderRadius: 'var(--senjr-radius)',
                  cursor: 'pointer', transition: 'all var(--senjr-transition-fast)',
                  color: 'var(--senjr-text)',
                }}
                onClick={() => navigate('/auth')}
              >
                Sign In
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div className="senjr-avatar-group">
                {['P', 'A', 'R', 'K'].map((initial, i) => (
                  <div key={i} className="senjr-avatar" style={{
                    width: 34, height: 34, fontSize: 13,
                    background: i % 2 === 0 ? 'var(--senjr-green)' : 'var(--senjr-orange)',
                    color: 'white', border: '2px solid white',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
        </div>

        <div className="senjr-content" style={{ paddingTop: 0 }}>

          <div id="stats" data-observe style={{ marginBottom: 28 }}>
            <div className="senjr-premium-card" style={{ overflow: 'hidden', padding: 0, marginBottom: 0 }}>
              <div className="senjr-grid-2" style={{ gap: 0 }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{
                    padding: '22px 16px', textAlign: 'center',
                    borderRight: i % 2 === 0 ? '1px solid var(--senjr-border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--senjr-border)' : 'none',
                  }}>
                    <p style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 2, letterSpacing: '-1px' }}>
                      {s.value}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="how-it-works" data-observe className="senjr-premium-card" style={{
            padding: 24, marginBottom: 28,
            background: 'var(--senjr-black)', color: 'white', border: 'none',
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 22, textAlign: 'center', letterSpacing: '-0.5px' }}>
              How It <span style={{ color: 'var(--senjr-green)' }}>Works</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {howItWorks.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.step} className="senjr-hover-lift" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: i === 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, flexShrink: 0,
                      boxShadow: `0 4px 12px ${i === 1 ? 'rgba(249,115,22,0.3)' : 'rgba(16,185,129,0.3)'}`,
                    }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: i === 1 ? 'var(--senjr-orange)' : 'var(--senjr-green)', opacity: 0.7 }}>{item.step}</span>
                        <p style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</p>
                      </div>
                      <p style={{ fontSize: 13, color: '#94A3B8' }}>{item.desc}</p>
                    </div>
                    {i < howItWorks.length - 1 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.3 }}>
                        <div style={{ width: 2, height: 20, background: 'currentColor', borderRadius: 1 }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div id="features" data-observe className={`${visibleSections['features'] ? 'senjr-fade-in' : ''}`} style={{ marginBottom: 28 }}>
            <h2 className="senjr-section-title" style={{ fontSize: 20, marginBottom: 16, letterSpacing: '-0.3px' }}>
              Why Students <span className="senjr-gradient-text">Love</span> Senjr
            </h2>
            <div className="senjr-grid-2">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="senjr-premium-card" style={{
                    padding: 18, marginBottom: 0,
                    animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
                  }}>
                    <div className="senjr-icon-circle" style={{
                      background: `${f.color}15`,
                      marginBottom: 10,
                    }}>
                      <Icon size={22} style={{ color: f.color }} />
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{f.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div id="lessons" data-observe className={`${visibleSections['lessons'] ? 'senjr-slide-up' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-flex-between" style={{ marginBottom: 16 }}>
              <h2 className="senjr-section-title" style={{ fontSize: 20, marginBottom: 0, letterSpacing: '-0.3px' }}>
                Popular <span className="senjr-gradient-text">Lessons</span>
              </h2>
              <button style={{ fontSize: 13, color: 'var(--senjr-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                View All <ChevronRight size={14} />
              </button>
            </div>

            {popularLessons.map((lesson, i) => (
              <div key={i} className="senjr-premium-card" style={{
                marginBottom: 16, cursor: 'pointer', padding: 0, overflow: 'hidden',
                animation: `fadeIn 0.4s ease ${i * 0.12}s both`,
              }} onClick={() => navigate('/auth')}>
                <div style={{
                  background: lesson.color,
                  padding: 24, position: 'relative', minHeight: 90,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {lesson.icon}
                  <span className="senjr-tag-orange-premium" style={{
                    position: 'absolute', top: 10, right: 10,
                  }}>
                    {lesson.badge}
                  </span>
                  <span style={{
                    position: 'absolute', bottom: 10, left: 10,
                    padding: '3px 10px', borderRadius: 'var(--senjr-radius-full)',
                    background: 'rgba(255,255,255,0.2)', color: 'white',
                    fontSize: 11, fontWeight: 600, backdropFilter: 'blur(4px)',
                  }}>
                    {lesson.duration}
                  </span>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lesson.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--senjr-text-muted)', marginBottom: 10 }}>
                    By {lesson.mentor}
                  </p>
                  <div className="senjr-flex-between">
                    <div style={{ display: 'flex', gap: 6 }}>
                      {lesson.tags.map((tag) => (
                        <span key={tag} className="senjr-tag-green-premium" style={{ fontSize: 10 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={14} style={{ color: 'var(--senjr-orange)', fill: 'var(--senjr-orange)' }} />
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{lesson.rating}</span>
                      <span style={{ fontSize: 11, color: 'var(--senjr-text-muted)' }}>({lesson.students})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="cta" data-observe className={`${visibleSections['cta'] ? 'senjr-pop' : ''}`} style={{ marginBottom: 28 }}>
            <div className="senjr-premium-card" style={{
              overflow: 'hidden', padding: 0,
              background: 'linear-gradient(135deg, var(--senjr-black) 0%, #1E293B 100%)',
              border: 'none',
            }}>
              <div style={{ padding: 32, textAlign: 'center' }}>
                <div className="senjr-icon-circle" style={{
                  margin: '0 auto 14px',
                  background: 'rgba(249,115,22,0.15)',
                  width: 56, height: 56,
                }}>
                  <Rocket size={28} style={{ color: 'var(--senjr-orange)' }} />
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6, letterSpacing: '-0.3px' }}>
                  Apni preparation ko next level le jao
                </p>
                <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20, lineHeight: 1.5 }}>
                  Join 500+ students preparing together with senior mentors who've been where you are.
                </p>
                <button
                  className="senjr-btn-premium"
                  style={{
                    width: 'auto', padding: '12px 32px', margin: '0 auto',
                    background: 'linear-gradient(135deg, var(--senjr-orange), var(--senjr-orange-dark))',
                    boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
                    borderRadius: 50,
                  }}
                  onClick={() => navigate('/student-signup')}
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '28px 0 24px', borderTop: '1px solid var(--senjr-border)' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--senjr-green), var(--senjr-green-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>S</span>
            </div>
            <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, letterSpacing: '-0.5px' }}>
              SEN<span className="senjr-gradient-text-green">JR</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 14 }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Terms</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Privacy</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>Support</a>
              <a href="#" style={{ fontSize: 13, color: 'var(--senjr-text-muted)', fontWeight: 500 }}>FAQs</a>
            </div>
            <p style={{ fontSize: 12, color: 'var(--senjr-text-light)' }}>
              &copy; 2026 Senjr EdTech. Made in India with &hearts;
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
